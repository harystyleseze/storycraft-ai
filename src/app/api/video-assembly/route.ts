import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, storyContent } = body

    if (!projectId || !storyContent) {
      return NextResponse.json({ 
        error: 'Project ID and story content required' 
      }, { status: 400 })
    }

    // Update project status to processing
    await supabase
      .from('projects')
      .update({ 
        status: 'processing',
        story_content: storyContent 
      })
      .eq('id', projectId)

    // Here you would typically:
    // 1. Break down the story into segments
    // 2. Generate video for each segment
    // 3. Combine segments into final video
    // For now, we'll simulate this process

    const segments = breakDownStory(storyContent)
    
    // Create video segments in database
    const { data: videoSegments, error } = await supabase
      .from('video_segments')
      .insert(
        segments.map((content, index) => ({
          project_id: projectId,
          sequence_order: index,
          content,
          duration: null, // Will be populated after video generation
          video_url: null // Will be populated after video generation
        }))
      )
      .select()

    if (error) {
      await supabase
        .from('projects')
        .update({ status: 'error' })
        .eq('id', projectId)
      
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // In a real implementation, you would start the video generation process here
    // For now, we'll just return the segments
    return NextResponse.json({ 
      message: 'Video assembly started',
      segments: videoSegments 
    })

  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function breakDownStory(storyContent: string): string[] {
  // Simple story breakdown - in reality, you'd use AI for this
  const sentences = storyContent.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const segments: string[] = []
  
  let currentSegment = ''
  const maxSegmentLength = 200 // characters
  
  for (const sentence of sentences) {
    if (currentSegment.length + sentence.length > maxSegmentLength && currentSegment) {
      segments.push(currentSegment.trim())
      currentSegment = sentence.trim()
    } else {
      currentSegment += (currentSegment ? '. ' : '') + sentence.trim()
    }
  }
  
  if (currentSegment) {
    segments.push(currentSegment.trim())
  }
  
  return segments
}