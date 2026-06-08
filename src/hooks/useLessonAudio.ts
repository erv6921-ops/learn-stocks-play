import { useState, useRef, useCallback, useEffect } from "react"
import { lessonNarrations } from "@/data/lessonNarrations"

interface UseLessonAudioOptions {
  lessonId: string
  onError?: (error: string) => void
}

interface UseLessonAudioReturn {
  isLoading: boolean
  isPlaying: boolean
  audioReady: boolean
  audioRef: React.RefObject<HTMLAudioElement>
  ensureLoaded: () => Promise<void>
  playAudio: () => Promise<void>
  pauseAudio: () => void
  toggleAudio: () => Promise<void>
  syncWithVideo: (videoElement: HTMLVideoElement) => () => void
  error: string | null
  usingFallback: boolean
}

// Global cache to prevent duplicate requests across component remounts
const audioCache = new Map<string, string>()
const pendingRequests = new Map<string, Promise<string>>()

class TtsError extends Error {
  code?: string
  constructor(message: string, code?: string) {
    super(message)
    this.name = "TtsError"
    this.code = code
  }
}

// If the provider is out of quota, use browser TTS fallback
let useBrowserTtsFallback = false

// Get English voice for browser TTS
function getEnglishVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices()
  // Prefer US English voices
  const preferredVoice = voices.find(v => 
    v.lang === 'en-US' && (v.name.includes('Google') || v.name.includes('Microsoft') || v.localService === false)
  )
  if (preferredVoice) return preferredVoice
  
  // Fall back to any English voice
  const englishVoice = voices.find(v => v.lang.startsWith('en'))
  if (englishVoice) return englishVoice
  
  // Use default
  return voices[0] || null
}

export function useLessonAudio({ lessonId, onError }: UseLessonAudioOptions): UseLessonAudioReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(useBrowserTtsFallback)
  const audioRef = useRef<HTMLAudioElement>(null)
  const mountedRef = useRef(true)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Browser TTS fallback functions
  const speakWithBrowserTts = useCallback((text: string, startFrom = 0) => {
    if (!('speechSynthesis' in window)) {
      console.warn("Browser doesn't support speech synthesis")
      return false
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.95
    utterance.pitch = 1
    utterance.volume = 1

    const voice = getEnglishVoice()
    if (voice) {
      utterance.voice = voice
    }

    utterance.onstart = () => {
      if (mountedRef.current) {
        setIsPlaying(true)
      }
    }

    utterance.onend = () => {
      if (mountedRef.current) {
        setIsPlaying(false)
      }
    }

    utterance.onerror = (event) => {
      console.error("Browser TTS error:", event)
      if (mountedRef.current) {
        setIsPlaying(false)
      }
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
    return true
  }, [])

  const pauseBrowserTts = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause()
      setIsPlaying(false)
    }
  }, [])

  const resumeBrowserTts = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume()
      setIsPlaying(true)
    }
  }, [])

  const stopBrowserTts = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }, [])

  const loadAudio = useCallback(async () => {
    const narration = lessonNarrations[lessonId]
    if (!narration) {
      console.warn(`No narration found for lesson: ${lessonId}`)
      return
    }

    // If already using browser fallback, mark as ready
    if (useBrowserTtsFallback) {
      if (mountedRef.current) {
        setUsingFallback(true)
        setAudioReady(true)
      }
      return
    }

    // Check cache first
    if (audioCache.has(lessonId)) {
      const cachedUrl = audioCache.get(lessonId)!
      if (audioRef.current) {
        audioRef.current.src = cachedUrl
        audioRef.current.load()
        if (mountedRef.current) {
          setAudioReady(true)
        }
      }
      return
    }

    // If already fetching, wait for that request
    if (pendingRequests.has(lessonId)) {
      try {
        const audioUrl = await pendingRequests.get(lessonId)!
        if (audioRef.current && mountedRef.current) {
          audioRef.current.src = audioUrl
          audioRef.current.load()
          setAudioReady(true)
        }
      } catch {
        // Error handled by original request
      }
      return
    }

    if (mountedRef.current) {
      setIsLoading(true)
      setError(null)
    }

    // Create the request promise
    const requestPromise = (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ 
            text: narration,
            voiceId: "nPczCjzI2devNBz1zQrb"
          }),
        }
      )

      if (!response.ok) {
        const payloadText = await response.text()
        const contentType = response.headers.get("content-type") || ""

        let code: string | undefined
        let details = payloadText

        if (contentType.includes("application/json")) {
          try {
            const parsed = JSON.parse(payloadText) as { error?: string; details?: string }
            code = parsed.error
            details = parsed.details || payloadText
          } catch {
            // ignore parse failures
          }
        }

        // Normalize provider states - include 401/502 as service unavailable
        if (!code && response.status === 402) code = "quota_exceeded"
        if (!code && response.status === 429) code = "rate_limited"
        if (!code && response.status === 401) code = "service_unavailable"
        if (!code && response.status === 502) code = "service_unavailable"
        if (!code && payloadText.includes("quota_exceeded")) code = "quota_exceeded"
        if (!code && payloadText.includes("detected_unusual_activity")) code = "service_unavailable"

        throw new TtsError(
          `TTS request failed: ${code ?? response.status}`,
          code
        )
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      
      // Store in cache
      audioCache.set(lessonId, audioUrl)
      
      return audioUrl
    })()

    pendingRequests.set(lessonId, requestPromise)

    try {
      const audioUrl = await requestPromise

      if (audioRef.current && mountedRef.current) {
        audioRef.current.src = audioUrl
        audioRef.current.load()
        setAudioReady(true)
      }
    } catch (err) {
      const ttsErr = err instanceof TtsError ? err : null

      // If quota exceeded, rate limited, or service unavailable, switch to browser TTS
      if (ttsErr?.code === "quota_exceeded" || ttsErr?.code === "rate_limited" || ttsErr?.code === "service_unavailable") {
        useBrowserTtsFallback = true
        if (mountedRef.current) {
          setUsingFallback(true)
          setAudioReady(true)
          console.log("Switching to browser TTS fallback")
        }
        return // Don't treat this as an error, we have a fallback
      }

      const errorMessage = err instanceof Error ? err.message : "Failed to load audio"

      if (mountedRef.current) {
        setError(errorMessage)
        onError?.(errorMessage)
      }
      console.error("Audio loading error:", err)
    } finally {
      pendingRequests.delete(lessonId)
      if (mountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [lessonId, onError])

  const playAudio = useCallback(async () => {
    const narration = lessonNarrations[lessonId]
    
    if (!audioReady) {
      await loadAudio()
    }
    
    // Use browser TTS if in fallback mode
    if (useBrowserTtsFallback || usingFallback) {
      if (narration) {
        // Check if speech synthesis is paused
        if (window.speechSynthesis.paused) {
          resumeBrowserTts()
        } else {
          speakWithBrowserTts(narration)
        }
      }
      return
    }

    // Use ElevenLabs audio
    if (audioRef.current && audioCache.has(lessonId)) {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (err) {
        console.error("Playback error:", err)
      }
    }
  }, [audioReady, loadAudio, lessonId, usingFallback, speakWithBrowserTts, resumeBrowserTts])

  const pauseAudio = useCallback(() => {
    if (useBrowserTtsFallback || usingFallback) {
      pauseBrowserTts()
      return
    }

    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [usingFallback, pauseBrowserTts])

  const toggleAudio = useCallback(async () => {
    if (isPlaying) {
      pauseAudio()
    } else {
      await playAudio()
    }
  }, [isPlaying, playAudio, pauseAudio])

  const syncWithVideo = useCallback((videoElement: HTMLVideoElement) => {
    videoRef.current = videoElement
    const narration = lessonNarrations[lessonId]

    const handleVideoPlay = () => {
      if (useBrowserTtsFallback || usingFallback) {
        if (narration) {
          // Check if speech synthesis is paused
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume()
          } else if (!window.speechSynthesis.speaking) {
            speakWithBrowserTts(narration)
          }
        }
        setIsPlaying(true)
        return
      }

      if (audioRef.current && audioCache.has(lessonId)) {
        audioRef.current.currentTime = videoElement.currentTime
        audioRef.current.play().catch(console.error)
        setIsPlaying(true)
      }
    }

    const handleVideoPause = () => {
      if (useBrowserTtsFallback || usingFallback) {
        window.speechSynthesis.pause()
        setIsPlaying(false)
        return
      }

      if (audioRef.current) {
        audioRef.current.pause()
        setIsPlaying(false)
      }
    }

    const handleVideoSeeked = () => {
      if (useBrowserTtsFallback || usingFallback) {
        // Browser TTS doesn't support seeking, restart from beginning on seek
        return
      }

      if (audioRef.current) {
        audioRef.current.currentTime = videoElement.currentTime
      }
    }

    const handleVideoEnded = () => {
      if (useBrowserTtsFallback || usingFallback) {
        window.speechSynthesis.cancel()
        setIsPlaying(false)
        return
      }

      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        setIsPlaying(false)
      }
    }

    videoElement.addEventListener("play", handleVideoPlay)
    videoElement.addEventListener("pause", handleVideoPause)
    videoElement.addEventListener("seeked", handleVideoSeeked)
    videoElement.addEventListener("ended", handleVideoEnded)

    return () => {
      videoElement.removeEventListener("play", handleVideoPlay)
      videoElement.removeEventListener("pause", handleVideoPause)
      videoElement.removeEventListener("seeked", handleVideoSeeked)
      videoElement.removeEventListener("ended", handleVideoEnded)
    }
  }, [lessonId, usingFallback, speakWithBrowserTts])

  // Load voices on mount (needed for some browsers)
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Voices may not be loaded immediately
      window.speechSynthesis.getVoices()
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices()
      }
    }
  }, [])

  // Track mount status and cleanup
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      // Stop any ongoing browser TTS when unmounting
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Handle audio element events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  return {
    isLoading,
    isPlaying,
    audioReady,
    audioRef,
    ensureLoaded: loadAudio,
    playAudio,
    pauseAudio,
    toggleAudio,
    syncWithVideo,
    error,
    usingFallback
  }
}
