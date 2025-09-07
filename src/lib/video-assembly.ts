interface VideoSegment {
  id: string
  content: string
  sequence_order: number
  duration?: number
  video_url?: string
}

interface VideoAssemblyConfig {
  openaiApiKey?: string
  elevenlabsApiKey?: string
  videoQuality: 'low' | 'medium' | 'high'
  audioEnabled: boolean
  subtitlesEnabled: boolean
}

export class VideoAssemblyService {
  private config: VideoAssemblyConfig

  constructor(config: VideoAssemblyConfig) {
    this.config = config
  }

  async generateVideoFromStory(storyContent: string, projectId: string): Promise<string> {
    try {
      // Step 1: Break down story into segments
      const segments = this.breakDownStory(storyContent)
      
      // Step 2: Generate video for each segment
      const videoSegments = await Promise.all(
        segments.map((content, index) => 
          this.generateSegmentVideo(content, index, projectId)
        )
      )

      // Step 3: Combine all segments into final video
      const finalVideoUrl = await this.combineVideoSegments(videoSegments, projectId)
      
      return finalVideoUrl
    } catch (error) {
      console.error('Video generation failed:', error)
      throw new Error(`Video generation failed: ${error}`)
    }
  }

  private breakDownStory(storyContent: string): string[] {
    // Enhanced story breakdown with better sentence detection
    const sentences = storyContent
      .split(/[.!?]+/)
      .filter(s => s.trim().length > 10) // Filter out very short segments
      .map(s => s.trim())

    const segments: string[] = []
    let currentSegment = ''
    const maxSegmentLength = 150 // Optimal for video generation
    
    for (const sentence of sentences) {
      const combinedLength = currentSegment.length + sentence.length + 2
      
      if (combinedLength > maxSegmentLength && currentSegment) {
        segments.push(currentSegment.trim())
        currentSegment = sentence
      } else {
        currentSegment += (currentSegment ? '. ' : '') + sentence
      }
    }
    
    if (currentSegment.trim()) {
      segments.push(currentSegment.trim())
    }
    
    return segments
  }

  private async generateSegmentVideo(
    content: string, 
    index: number, 
    projectId: string
  ): Promise<VideoSegment> {
    // In a real implementation, this would:
    // 1. Generate images using AI (DALL-E, Midjourney, etc.)
    // 2. Generate voiceover using TTS (ElevenLabs, OpenAI TTS)
    // 3. Combine image + audio into video segment
    // 4. Apply transitions and effects
    
    // For now, return a placeholder
    return {
      id: `${projectId}-segment-${index}`,
      content,
      sequence_order: index,
      duration: this.estimateSegmentDuration(content),
      video_url: `placeholder-video-${index}.mp4`
    }
  }

  private estimateSegmentDuration(content: string): number {
    // Rough estimation: average reading speed is ~200 words per minute
    const wordCount = content.split(' ').length
    const baseReadingTime = (wordCount / 200) * 60 // seconds
    
    // Add buffer for visual processing and transitions
    const bufferTime = 2 // seconds
    
    return Math.max(3, Math.round(baseReadingTime + bufferTime))
  }

  private async combineVideoSegments(
    segments: VideoSegment[], 
    projectId: string
  ): Promise<string> {
    // In a real implementation, this would:
    // 1. Use FFmpeg or similar to combine video segments
    // 2. Add transitions between segments
    // 3. Apply consistent styling/branding
    // 4. Generate final video file
    // 5. Upload to CDN/storage
    
    return `final-video-${projectId}.mp4`
  }

  async generateVoiceover(text: string): Promise<string> {
    if (!this.config.elevenlabsApiKey) {
      throw new Error('ElevenLabs API key not configured')
    }

    // Implementation would use ElevenLabs API
    // For now, return placeholder
    return `voiceover-${Date.now()}.mp3`
  }

  async generateVisuals(prompt: string): Promise<string> {
    if (!this.config.openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Implementation would use DALL-E or similar
    // For now, return placeholder
    return `visual-${Date.now()}.png`
  }
}

export const defaultVideoAssemblyConfig: VideoAssemblyConfig = {
  videoQuality: 'medium',
  audioEnabled: true,
  subtitlesEnabled: true
}

export function createVideoAssemblyService(config?: Partial<VideoAssemblyConfig>) {
  return new VideoAssemblyService({
    ...defaultVideoAssemblyConfig,
    ...config,
    openaiApiKey: process.env.OPENAI_API_KEY,
    elevenlabsApiKey: process.env.ELEVENLABS_API_KEY
  })
}