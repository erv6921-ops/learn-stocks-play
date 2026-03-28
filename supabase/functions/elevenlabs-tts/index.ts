import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Simple retry with exponential backoff
async function fetchWithRetry(
  url: string, 
  options: RequestInit, 
  maxRetries = 3
): Promise<Response> {
  let lastError: Error | null = null
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options)
      
      // If rate limited, wait and retry
      if (response.status === 429) {
        // Make sure the connection can be reused.
        try {
          response.body?.cancel()
        } catch {
          // ignore
        }
        const waitTime = Math.pow(2, attempt) * 1000 + Math.random() * 1000
        console.log(`Rate limited, waiting ${waitTime}ms before retry ${attempt + 1}/${maxRetries}`)
        await new Promise(resolve => setTimeout(resolve, waitTime))
        continue
      }
      
      return response
    } catch (error) {
      lastError = error as Error
      const waitTime = Math.pow(2, attempt) * 1000
      console.log(`Request failed, waiting ${waitTime}ms before retry ${attempt + 1}/${maxRetries}`)
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
  }
  
  throw lastError || new Error('Max retries exceeded')
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { text, voiceId } = await req.json()
    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY')

    if (!ELEVENLABS_API_KEY) {
      throw new Error('ELEVENLABS_API_KEY not configured')
    }

    if (!text) {
      throw new Error('Text is required')
    }

    // Use "Charlie" - friendly, youthful voice great for educational content
    const selectedVoiceId = voiceId || 'IKne3meq5aSn9XLyUdCD'

    console.log('Generating TTS for text length:', text.length)

    const response = await fetchWithRetry(
      `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}?output_format=mp3_44100_128`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.35,        // Lower = more expressive/dynamic
            similarity_boost: 0.8,  // Keep voice consistent
            style: 0.65,            // Higher = more engaging delivery
            use_speaker_boost: true,
            speed: 1.0,             // Natural pace
          },
        }),
      },
      3 // max retries
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error:', errorText)

      const status = response.status

      // ElevenLabs may return a 401 with a body indicating quota_exceeded.
      // Surface this clearly to the client so it can gracefully disable TTS.
      const isQuotaExceeded = errorText.includes('quota_exceeded')

      // Preserve 429 so clients can back off. Use 402 for quota issues.
      // Otherwise use 502 to indicate provider failure.
      const httpStatus = status === 429 ? 429 : isQuotaExceeded ? 402 : 502

      return new Response(
        JSON.stringify({
          error: isQuotaExceeded ? 'quota_exceeded' : `ElevenLabs API error: ${status}`,
          details: errorText,
        }),
        {
          status: httpStatus,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const audioBuffer = await response.arrayBuffer()

    return new Response(audioBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('TTS Error:', error)
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
