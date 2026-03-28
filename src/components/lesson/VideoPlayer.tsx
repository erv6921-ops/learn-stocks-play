import React, { useCallback, useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLessonAudio } from "@/hooks/useLessonAudio"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle,
  Loader2,
  SkipForward,
  SkipBack
} from "lucide-react"

interface VideoPlayerProps {
  lessonId: string
  videoPath?: string
  videoSegments?: string[]
  onVideoWatched: () => void
  videoWatched: boolean
}

export function VideoPlayer({ 
  lessonId, 
  videoPath, 
  videoSegments,
  onVideoWatched, 
  videoWatched 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const handleAudioError = useCallback((err: string) => {
    console.error("Audio error:", err)
  }, [])

  const { 
    isLoading: audioLoading, 
    audioRef,
    ensureLoaded,
    syncWithVideo,
    error: audioError,
    usingFallback
  } = useLessonAudio({ 
    lessonId,
    onError: handleAudioError,
  })

  // Determine if using segments or single video
  const hasSegments = videoSegments && videoSegments.length > 0
  const totalSegments = hasSegments ? videoSegments.length : 1
  const currentVideoSrc = hasSegments ? videoSegments[currentSegmentIndex] : videoPath

  // Calculate total duration (estimate 10 seconds per segment)
  useEffect(() => {
    if (hasSegments) {
      setTotalDuration(totalSegments * 10) // 10 seconds per segment
    }
  }, [hasSegments, totalSegments])

  // Sync audio with video when video element is available
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const cleanup = syncWithVideo(video)
      return cleanup
    }
  }, [syncWithVideo])

  // Handle segment ended - move to next segment
  const handleSegmentEnded = useCallback(() => {
    if (hasSegments && currentSegmentIndex < totalSegments - 1) {
      // Move to next segment
      setCurrentSegmentIndex(prev => prev + 1)
      // Auto-play next segment
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(console.error)
        }
      }, 100)
    } else {
      // Last segment finished
      setIsPlaying(false)
      if (!videoWatched) {
        onVideoWatched()
      }
    }
  }, [hasSegments, currentSegmentIndex, totalSegments, videoWatched, onVideoWatched])

  // When segment changes, update video source
  useEffect(() => {
    if (videoRef.current && currentVideoSrc) {
      const wasPlaying = isPlaying
      videoRef.current.src = currentVideoSrc
      videoRef.current.load()
      if (wasPlaying) {
        videoRef.current.play().catch(console.error)
      }
    }
  }, [currentSegmentIndex, currentVideoSrc])

  const togglePlay = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        // Load narration on first play
        await ensureLoaded()
        await videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current && audioRef.current) {
      videoRef.current.muted = !isMuted
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const segmentTime = videoRef.current.currentTime
      const overallTime = (currentSegmentIndex * 10) + segmentTime
      setCurrentTime(overallTime)
      
      // Calculate overall progress
      const progress = hasSegments 
        ? ((currentSegmentIndex * 10 + segmentTime) / totalDuration) * 100
        : (segmentTime / videoRef.current.duration) * 100
      
      setVideoProgress(progress)
      
      // Mark as watched at 80%
      if (progress >= 80 && !videoWatched) {
        onVideoWatched()
      }
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasSegments && videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = percent * videoRef.current.duration
    } else if (hasSegments) {
      // For segments, calculate which segment and position
      const rect = e.currentTarget.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      const targetTime = percent * totalDuration
      const targetSegment = Math.floor(targetTime / 10)
      const targetSegmentTime = targetTime % 10
      
      if (targetSegment !== currentSegmentIndex) {
        setCurrentSegmentIndex(targetSegment)
      }
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = targetSegmentTime
        }
      }, 100)
    }
  }

  const skipForward = () => {
    if (hasSegments && currentSegmentIndex < totalSegments - 1) {
      setCurrentSegmentIndex(prev => prev + 1)
    }
  }

  const skipBack = () => {
    if (hasSegments && currentSegmentIndex > 0) {
      setCurrentSegmentIndex(prev => prev - 1)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card variant="elevated" className="overflow-hidden">
      <div className="relative bg-black aspect-video">
        <video
          ref={videoRef}
          src={currentVideoSrc}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleSegmentEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          playsInline
          muted // Video is muted by default since narration provides audio
        />
        
        {/* Hidden audio element for narration */}
        <audio ref={audioRef} preload="auto" />
        
        {/* Loading overlay */}
        {audioLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="text-center text-white">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
              <p className="text-sm">Loading narration...</p>
            </div>
          </div>
        )}

        {/* Video Controls Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white"
            onClick={togglePlay}
            disabled={audioLoading}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </Button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div 
            className="h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${videoProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {hasSegments && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={skipBack}
                  disabled={currentSegmentIndex === 0}
                >
                  <SkipBack className="w-5 h-5" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={togglePlay}
                disabled={audioLoading}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>
              {hasSegments && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={skipForward}
                  disabled={currentSegmentIndex === totalSegments - 1}
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
              
              {/* Time display */}
              <span className="text-white/80 text-xs ml-2">
                {formatTime(currentTime)} / {formatTime(totalDuration || 120)}
              </span>

              {audioLoading && (
                <span className="text-white/70 text-xs flex items-center gap-1 ml-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Loading audio...
                </span>
              )}
              {audioError && !usingFallback && (
                <span className="text-red-400 text-xs ml-2">
                  Audio unavailable
                </span>
              )}
              {usingFallback && (
                <span className="text-yellow-400 text-xs ml-2">
                  Using browser voice
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {hasSegments && (
                <span className="text-white/60 text-xs">
                  Part {currentSegmentIndex + 1}/{totalSegments}
                </span>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={handleFullscreen}
              >
                <Maximize className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video watched indicator */}
      {videoWatched && (
        <div className="p-3 bg-success/10 border-t border-success/20">
          <p className="text-sm text-success flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Video watched - ready to take the quiz!
          </p>
        </div>
      )}
    </Card>
  )
}
