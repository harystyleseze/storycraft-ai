-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  story_content TEXT,
  video_url TEXT,
  status TEXT CHECK (status IN ('draft', 'processing', 'completed', 'error')) DEFAULT 'draft',
  user_id UUID NOT NULL
);

-- Create video_segments table
CREATE TABLE IF NOT EXISTS video_segments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  sequence_order INTEGER NOT NULL,
  content TEXT NOT NULL,
  video_url TEXT,
  duration DECIMAL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_video_segments_project_id ON video_segments(project_id);
CREATE INDEX IF NOT EXISTS idx_video_segments_sequence ON video_segments(project_id, sequence_order);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_segments ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your auth setup)
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view segments of own projects" ON video_segments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = video_segments.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert segments for own projects" ON video_segments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = video_segments.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update segments of own projects" ON video_segments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = video_segments.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete segments of own projects" ON video_segments
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = video_segments.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();