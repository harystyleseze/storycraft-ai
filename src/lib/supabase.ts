import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          story_content: string | null
          video_url: string | null
          status: 'draft' | 'processing' | 'completed' | 'error'
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          story_content?: string | null
          video_url?: string | null
          status?: 'draft' | 'processing' | 'completed' | 'error'
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          story_content?: string | null
          video_url?: string | null
          status?: 'draft' | 'processing' | 'completed' | 'error'
          user_id?: string
        }
      }
      video_segments: {
        Row: {
          id: string
          created_at: string
          project_id: string
          sequence_order: number
          content: string
          video_url: string | null
          duration: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          project_id: string
          sequence_order: number
          content: string
          video_url?: string | null
          duration?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          project_id?: string
          sequence_order?: number
          content?: string
          video_url?: string | null
          duration?: number | null
        }
      }
    }
  }
}