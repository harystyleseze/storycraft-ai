export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
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