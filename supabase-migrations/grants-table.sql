-- Create grants table for aBotSpot board portal
-- Run this in Supabase SQL Editor

-- Create grants table
CREATE TABLE IF NOT EXISTS grants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  amount NUMERIC,
  focus_area TEXT NOT NULL CHECK (focus_area IN ('AI Education', 'Community Development', 'Local Resilience', 'Technology', 'Environment')),
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'In Review', 'Approved', 'Rejected', 'Awarded', 'Completed')),
  org_name TEXT,
  org_url TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  deadline DATE,
  awarded_date DATE,
  notes TEXT,
  documents JSONB,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_grants_created_at ON grants(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_grants_status ON grants(status);
CREATE INDEX IF NOT EXISTS idx_grants_focus_area ON grants(focus_area);
CREATE INDEX IF NOT EXISTS idx_grants_name ON grants(name);
CREATE INDEX IF NOT EXISTS idx_grants_user_id ON grants(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE grants ENABLE ROW LEVEL SECURITY;

-- Create policy for board members to see all grants
CREATE POLICY "Board members can view all grants"
  ON grants FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM board_members));

CREATE POLICY "Board members can insert grants"
  ON grants FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (SELECT user_id FROM board_members));

CREATE POLICY "Board members can update grants"
  ON grants FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM board_members));

CREATE POLICY "Board members can delete grants"
  ON grants FOR DELETE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM board_members));

-- Insert sample data
INSERT INTO grants (name, description, amount, focus_area, status, org_name) VALUES
  ('OpenAI Partnership', 'Partnership with OpenAI for AI education platform', 50000, 'AI Education', 'New', 'OpenAI', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
  ('Google.org Grant', 'Google.org grant for community development', 25000, 'Community Development', 'In Review', 'Google.org', 'https://google.org', 'grants@google.org', NULL, NULL, NULL, NULL, NULL, NULL),
  ('Microsoft Education', 'Microsoft education grant for local resilience', 100000, 'Local Resilience', 'New', 'Microsoft', 'https://microsoft.com', 'education@microsoft.com', NULL, NULL, NULL, NULL, NULL, NULL);
