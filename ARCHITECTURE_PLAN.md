# Bulgarian Kids - Shared Word Library & Levels Architecture

## Current Problems
1. Audio recordings duplicated per user
2. No shared word database - each user starts from scratch
3. No structured progression/levels
4. Custom words aren't shared with family

---

## Proposed Architecture

### Core Concept
- **Shared Word Library**: Central database of Bulgarian words with audio
- **User Progress**: Track which words each user has unlocked and learned
- **Level System**: Progressive unlock based on mastery

---

## Database Schema

### 1. `word_library` - Shared words (replaces per-user words)
```sql
CREATE TABLE word_library (
    id BIGSERIAL PRIMARY KEY,
    cyrillic TEXT NOT NULL,
    translit TEXT NOT NULL,
    meaning TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    level INTEGER DEFAULT 1,          -- 1-5 difficulty
    audio TEXT,                        -- Base64 audio (shared!)
    audio_by TEXT,                     -- Who recorded it
    created_at TIMESTAMP DEFAULT NOW(),
    approved BOOLEAN DEFAULT true      -- For moderation if needed
);

-- Categories: greetings, family, food, animals, colors, numbers, verbs, phrases, custom
-- Levels: 1=basic, 2=beginner, 3=intermediate, 4=advanced, 5=fluent
```

### 2. `user_progress` - Per-user word tracking
```sql
CREATE TABLE user_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    word_id BIGINT REFERENCES word_library(id),
    unlocked_at TIMESTAMP DEFAULT NOW(),
    correct INTEGER DEFAULT 0,
    wrong INTEGER DEFAULT 0,
    mastered BOOLEAN DEFAULT false,
    last_seen TIMESTAMP,
    UNIQUE(user_id, word_id)
);
```

### 3. `users` - User profiles (enhanced)
```sql
CREATE TABLE users (
    user_id TEXT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW(),
    last_active TIMESTAMP DEFAULT NOW(),

    -- Progression
    current_level INTEGER DEFAULT 1,
    total_xp INTEGER DEFAULT 0,
    words_unlocked INTEGER DEFAULT 0,
    words_mastered INTEGER DEFAULT 0,

    -- Streaks & engagement
    current_streak INTEGER DEFAULT 0,
    best_streak INTEGER DEFAULT 0,
    daily_progress INTEGER DEFAULT 0,
    last_play_date TEXT,

    -- Achievements
    stickers JSONB DEFAULT '[]'::jsonb,

    -- Alphabet (unchanged)
    alphabet_mastered INTEGER DEFAULT 0,
    alphabet_introduced INTEGER DEFAULT 0
);
```

### 4. `activity` - Event logging (unchanged)
```sql
CREATE TABLE activity (
    id BIGSERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    event TEXT NOT NULL,
    module TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Level System

### Level Thresholds
| Level | Name | Words Available | XP Required | Unlock Criteria |
|-------|------|-----------------|-------------|-----------------|
| 1 | Beginner | 10 starter words | 0 | Default |
| 2 | Explorer | +15 words (25 total) | 50 XP | Master 5 words |
| 3 | Learner | +20 words (45 total) | 150 XP | Master 15 words |
| 4 | Speaker | +25 words (70 total) | 350 XP | Master 30 words |
| 5 | Fluent | +30 words (100 total) | 600 XP | Master 50 words |

### XP Rewards
| Action | XP |
|--------|-----|
| Correct answer | 10 |
| Streak bonus (5+) | +5 |
| Word mastered | 25 |
| Level up | 50 |
| Daily goal complete | 30 |

### Word Difficulty by Level
- **Level 1**: да, не, здравей, мама, тате, вода, хляб...
- **Level 2**: Common phrases, numbers 1-10, colors
- **Level 3**: Verbs, family members, food items
- **Level 4**: Complex phrases, emotions, activities
- **Level 5**: Idioms, advanced vocabulary, full sentences

---

## App Flow Changes

### Home Screen
```
┌─────────────────────────────┐
│  🐻 Julian's Bulgarian!     │
│                             │
│  ⭐ Level 2 - Explorer      │
│  [████████░░] 120/150 XP    │
│                             │
│  📚 Words: 18/25 unlocked   │
│  ✓ Mastered: 8              │
│                             │
│  [🔤 Letters] [📖 Words]    │
│  [🎤 Test Me] [➕ Add Word] │
│                             │
│  Next unlock: 2 more words! │
└─────────────────────────────┘
```

### Word Quiz Flow
1. User opens Words module
2. App fetches user's unlocked words from `user_progress`
3. Prioritizes unmastered words (spaced repetition)
4. On correct: update `user_progress`, add XP
5. On mastery: check if level up triggered

### Adding New Words
1. User records a new word
2. Word goes into `word_library` with `audio_by = user_id`
3. Word is auto-unlocked for that user
4. Family members can see/use the word (shared audio!)
5. Optional: Admin approval for public library

---

## Migration Plan

### Phase 1: Create new tables
1. Create `word_library` table
2. Create `user_progress` table
3. Migrate existing `words` → `word_library`
4. Create `user_progress` entries for existing users

### Phase 2: Seed starter words
1. Add 50-100 curated Bulgarian words with levels
2. Record audio for starter words (or use TTS initially)
3. Categorize by difficulty and topic

### Phase 3: Update app logic
1. Change word loading to use `word_library` + `user_progress`
2. Add level display and XP tracking
3. Implement unlock logic
4. Update "Add Word" to contribute to shared library

### Phase 4: Family sharing
1. Words added by any family member appear for all
2. Audio recordings shared automatically
3. Optional: "Family" category for custom words

---

## API Changes

### Load user's words
```javascript
// Old: SELECT * FROM words WHERE user_id = ?
// New:
SELECT wl.*, up.correct, up.wrong, up.mastered
FROM word_library wl
JOIN user_progress up ON wl.id = up.word_id
WHERE up.user_id = ? AND wl.level <= user.current_level
```

### Add new word
```javascript
// 1. Insert into word_library
INSERT INTO word_library (cyrillic, translit, meaning, audio, audio_by, level)
VALUES (?, ?, ?, ?, ?, 1);

// 2. Auto-unlock for user
INSERT INTO user_progress (user_id, word_id)
VALUES (?, lastInsertId);

// 3. Optionally unlock for family
INSERT INTO user_progress (user_id, word_id)
SELECT family_member, lastInsertId FROM user_family WHERE user_id = ?;
```

### Check level up
```javascript
async function checkLevelUp(userId) {
    const user = await getUser(userId);
    const thresholds = [
        { level: 2, xp: 50, mastered: 5 },
        { level: 3, xp: 150, mastered: 15 },
        { level: 4, xp: 350, mastered: 30 },
        { level: 5, xp: 600, mastered: 50 },
    ];

    for (const t of thresholds) {
        if (user.current_level < t.level &&
            user.total_xp >= t.xp &&
            user.words_mastered >= t.mastered) {
            await levelUp(userId, t.level);
            return t.level;
        }
    }
    return null;
}
```

---

## Starter Word List (Level 1)

| Bulgarian | Translit | Meaning | Category |
|-----------|----------|---------|----------|
| да | da | yes | basics |
| не | ne | no | basics |
| здравей | zdravey | hello | greetings |
| чао | chao | bye | greetings |
| мама | mama | mom | family |
| тате | tate | dad | family |
| баба | baba | grandma | family |
| дядо | dyado | grandpa | family |
| вода | voda | water | food |
| хляб | hlyab | bread | food |

---

## Benefits

1. **No duplicate audio** - Record once, use everywhere
2. **Family sharing** - Kids and grandparents share vocabulary
3. **Structured progression** - Clear goals and unlocks
4. **Motivation** - Levels, XP, visible progress
5. **Quality content** - Curated starter words with proper audio
6. **Scalable** - Easy to add more words/levels later

---

## Questions to Decide

1. Should custom words be auto-shared with family or opt-in?
2. Should there be a "Family" group concept or just share everything?
3. How many starter words per level?
4. Should TTS be used as fallback or require human audio?
5. Moderation: approve custom words before they go public?

---

## Next Steps

1. [ ] Decide on questions above
2. [ ] Create new database tables
3. [ ] Migrate existing words to word_library
4. [ ] Seed 50 starter words (levels 1-2)
5. [ ] Update app.js for new architecture
6. [ ] Add level/XP display to UI
7. [ ] Test with Julian's account
