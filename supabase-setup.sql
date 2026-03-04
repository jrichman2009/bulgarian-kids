-- Bulgarian Kids: Database Setup
-- Run this in Supabase SQL Editor

-- Add level column to words table (if not exists)
-- Level 1 = Words 1, Level 2 = Words 2
ALTER TABLE words ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1;

-- Users table: profile and cumulative stats
CREATE TABLE users (
    user_id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    baba_points INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    best_streak INTEGER DEFAULT 0,
    daily_progress INTEGER DEFAULT 0,
    last_play_date TEXT,
    stickers JSONB DEFAULT '[]'::jsonb,
    alphabet_mastered INTEGER DEFAULT 0,
    alphabet_introduced INTEGER DEFAULT 0,
    vocab_mastered INTEGER DEFAULT 0,
    testme_correct INTEGER DEFAULT 0,
    testme_total INTEGER DEFAULT 0
);

-- Activity table: event log for analytics
CREATE TABLE activity (
    id BIGSERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    event TEXT NOT NULL,
    module TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster activity queries
CREATE INDEX activity_user_id_idx ON activity(user_id);
CREATE INDEX activity_created_at_idx ON activity(created_at);
CREATE INDEX activity_event_idx ON activity(event);

-- Enable RLS but allow all access (public app)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all activity" ON activity FOR ALL USING (true) WITH CHECK (true);

-- Messages table: for baba/parent <-> child communication
CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY,
    from_user TEXT NOT NULL,
    to_user TEXT NOT NULL,
    message TEXT,
    audio TEXT,  -- base64 encoded audio
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster message queries
CREATE INDEX messages_to_user_idx ON messages(to_user);
CREATE INDEX messages_from_user_idx ON messages(from_user);
CREATE INDEX messages_created_at_idx ON messages(created_at);

-- Enable RLS but allow all access
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all messages" ON messages FOR ALL USING (true) WITH CHECK (true);

-- View to see user activity summary
CREATE VIEW user_activity_summary AS
SELECT
    user_id,
    COUNT(*) as total_events,
    COUNT(*) FILTER (WHERE event = 'quiz_correct') as correct_answers,
    COUNT(*) FILTER (WHERE event = 'quiz_wrong') as wrong_answers,
    COUNT(*) FILTER (WHERE event = 'word_added') as words_added,
    COUNT(*) FILTER (WHERE event = 'session_start') as sessions,
    MIN(created_at) as first_activity,
    MAX(created_at) as last_activity
FROM activity
GROUP BY user_id;
