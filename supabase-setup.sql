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

-- Letter audio table: stores admin-recorded audio for alphabet letters
CREATE TABLE IF NOT EXISTS letter_audio (
    id BIGSERIAL PRIMARY KEY,
    letter_index INTEGER NOT NULL UNIQUE,
    letter TEXT NOT NULL,
    audio TEXT NOT NULL,  -- base64 encoded audio
    recorded_by TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster letter audio lookups
CREATE INDEX IF NOT EXISTS letter_audio_letter_index_idx ON letter_audio(letter_index);

-- Enable RLS but allow all access (public app)
ALTER TABLE letter_audio ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all letter_audio" ON letter_audio FOR ALL USING (true) WITH CHECK (true);

-- Letters table: stores all Bulgarian alphabet letters with audio
CREATE TABLE IF NOT EXISTS letters (
    id SERIAL PRIMARY KEY,
    letter_index INTEGER NOT NULL UNIQUE,
    letter TEXT NOT NULL,
    sound_bg TEXT,
    sound_en TEXT,
    phonetic TEXT NOT NULL,
    hint TEXT,
    picture TEXT,
    word TEXT,
    word_en TEXT,
    translit TEXT,
    audio TEXT,  -- base64 encoded audio recording
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster letter lookups
CREATE INDEX IF NOT EXISTS letters_letter_index_idx ON letters(letter_index);

-- Enable RLS but allow all access (public app)
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all letters" ON letters FOR ALL USING (true) WITH CHECK (true);

-- Insert all 30 Bulgarian alphabet letters
INSERT INTO letters (letter_index, letter, sound_bg, sound_en, phonetic, hint, picture, word, word_en, translit) VALUES
(0, 'А а', 'ааа', 'ahh', 'ah', 'like "a" in "father"', '🍎', 'ябълка', 'apple', 'yabulka'),
(1, 'Б б', 'бъ', 'buh', 'b', 'like "b" in "boy"', '🐻', 'баба', 'grandma', 'baba'),
(2, 'В в', 'въ', 'vuh', 'v', 'like "v" in "van"', '🌊', 'вълна', 'wave', 'vulna'),
(3, 'Г г', 'гъ', 'guh', 'g', 'like "g" in "go"', '🍇', 'грозде', 'grapes', 'grozde'),
(4, 'Д д', 'дъ', 'duh', 'd', 'like "d" in "dog"', '🏠', 'дом', 'house', 'dom'),
(5, 'Е е', 'еее', 'eh', 'e', 'like "e" in "bed"', '🦔', 'еж', 'hedgehog', 'ezh'),
(6, 'Ж ж', 'жъ', 'zhuh', 'zh', 'like "s" in "measure"', '🐸', 'жаба', 'frog', 'zhaba'),
(7, 'З з', 'зъ', 'zuh', 'z', 'like "z" in "zoo"', '⭐', 'звезда', 'star', 'zvezda'),
(8, 'И и', 'иии', 'eee', 'ee', 'like "ee" in "see"', '🎮', 'игра', 'game', 'igra'),
(9, 'Й й', 'ий', 'y', 'y', 'like "y" in "yes"', '🥛', 'йогурт', 'yogurt', 'yogurt'),
(10, 'К к', 'къ', 'kuh', 'k', 'like "k" in "kite"', '🐱', 'котка', 'cat', 'kotka'),
(11, 'Л л', 'лъ', 'luh', 'l', 'like "l" in "love"', '🍋', 'лимон', 'lemon', 'limon'),
(12, 'М м', 'мъ', 'muh', 'm', 'like "m" in "mom"', '🐭', 'мишка', 'mouse', 'mishka'),
(13, 'Н н', 'нъ', 'nuh', 'n', 'like "n" in "no"', '🌙', 'нощ', 'night', 'nosht'),
(14, 'О о', 'ооо', 'oh', 'o', 'like "o" in "more"', '☁️', 'облак', 'cloud', 'oblak'),
(15, 'П п', 'пъ', 'puh', 'p', 'like "p" in "pen"', '🐦', 'птица', 'bird', 'ptitsa'),
(16, 'Р р', 'ръ', 'rruh', 'r', 'rolled "r"', '🐟', 'риба', 'fish', 'riba'),
(17, 'С с', 'съ', 'suh', 's', 'like "s" in "sun"', '☀️', 'слънце', 'sun', 'sluntse'),
(18, 'Т т', 'тъ', 'tuh', 't', 'like "t" in "top"', '🚂', 'трен', 'train', 'tren'),
(19, 'У у', 'ууу', 'ooo', 'oo', 'like "oo" in "moon"', '🦆', 'утка', 'duck', 'utka'),
(20, 'Ф ф', 'фъ', 'fuh', 'f', 'like "f" in "fun"', '🎆', 'фойерверк', 'fireworks', 'foyerverk'),
(21, 'Х х', 'хъ', 'huh', 'h', 'like "h" in "house"', '🍞', 'хляб', 'bread', 'hlyab'),
(22, 'Ц ц', 'цъ', 'tsuh', 'ts', 'like "ts" in "cats"', '🌸', 'цвете', 'flower', 'tsvete'),
(23, 'Ч ч', 'чъ', 'chuh', 'ch', 'like "ch" in "cheese"', '☂️', 'чадър', 'umbrella', 'chadur'),
(24, 'Ш ш', 'шъ', 'shuh', 'sh', 'like "sh" in "ship"', '🎩', 'шапка', 'hat', 'shapka'),
(25, 'Щ щ', 'щъ', 'shtuh', 'sht', 'like "sht"', '🦑', 'щука', 'pike fish', 'shtuka'),
(26, 'Ъ ъ', 'ъъъ', 'uh', 'uh', 'like "u" in "but"', '🏔️', 'връх', 'peak', 'vruh'),
(27, 'Ь ь', 'ер малък', 'soft', '(soft)', 'makes letters soft', '🧈', 'мек', 'soft', 'mek'),
(28, 'Ю ю', 'юу', 'yoo', 'yu', 'like "u" in "cute"', '🎠', 'юла', 'spinning top', 'yula'),
(29, 'Я я', 'яа', 'yah', 'ya', 'like "ya" in "yard"', '🍳', 'яйце', 'egg', 'yaytse')
ON CONFLICT (letter_index) DO UPDATE SET
    letter = EXCLUDED.letter,
    sound_bg = EXCLUDED.sound_bg,
    sound_en = EXCLUDED.sound_en,
    phonetic = EXCLUDED.phonetic,
    hint = EXCLUDED.hint,
    picture = EXCLUDED.picture,
    word = EXCLUDED.word,
    word_en = EXCLUDED.word_en,
    translit = EXCLUDED.translit,
    updated_at = NOW();
