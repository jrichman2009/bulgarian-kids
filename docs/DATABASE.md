# Database (Supabase)

**Project URL**: https://wnjoiczniapfydbufhaq.supabase.co

## Tables

### `words`
User vocabulary with optional audio recordings.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key (timestamp-based) |
| user_id | text | User identifier from URL param |
| cyrillic | text | Bulgarian spelling |
| translit | text | English transliteration |
| meaning | text | English meaning (can include emoji) |
| category | text | Word category (default: 'custom') |
| audio | text | Base64-encoded audio recording |
| created_at | timestamp | Auto-generated |

### `users`
User profiles and cumulative stats (synced from app).

| Column | Type | Description |
|--------|------|-------------|
| user_id | text | Primary key |
| last_active | timestamp | Last activity |
| baba_points | integer | Total points |
| current_streak | integer | Current correct streak |
| best_streak | integer | All-time best streak |
| daily_progress | integer | Today's star progress (0-5) |
| stickers | jsonb | Array of earned sticker IDs |
| alphabet_mastered | integer | Count of mastered letters |
| vocab_mastered | integer | Count of mastered words |

### `activity`
Event log for analytics.

| Column | Type | Description |
|--------|------|-------------|
| id | bigserial | Primary key |
| user_id | text | User identifier |
| event | text | Event type |
| module | text | Module name |
| metadata | jsonb | Event-specific data |
| created_at | timestamp | Auto-generated |

**Event types**: `quiz_correct`, `quiz_wrong`, `word_mastered`, `letter_mastered`, `word_added`, `session_start`, `tv_purchase`, `tv_redeemed`, `milestone_reached`

### `messages`
Parent/grandparent to child messaging.

| Column | Type | Description |
|--------|------|-------------|
| id | bigserial | Primary key |
| from_user | text | Sender username |
| to_user | text | Recipient username |
| message | text | Text message |
| audio | text | Base64 voice message |
| read | boolean | Read status |
| created_at | timestamp | Auto-generated |

## Common Queries

### Check word counts per user
```sql
SELECT user_id, COUNT(*) as word_count
FROM words
GROUP BY user_id;
```

### Copy words from one user to another
```sql
INSERT INTO words (id, user_id, cyrillic, translit, meaning, category, audio, created_at)
SELECT
    (EXTRACT(EPOCH FROM NOW()) * 1000 + ROW_NUMBER() OVER())::BIGINT,
    'target_user',
    cyrillic, translit, meaning, category, audio, NOW()
FROM words
WHERE user_id = 'source_user'
AND cyrillic NOT IN (SELECT cyrillic FROM words WHERE user_id = 'target_user');
```

### View user activity
```sql
SELECT event, COUNT(*), MAX(created_at) as last_occurrence
FROM activity
WHERE user_id = 'julian'
GROUP BY event
ORDER BY last_occurrence DESC;
```

### Delete all data for a user
```sql
DELETE FROM words WHERE user_id = 'username';
DELETE FROM users WHERE user_id = 'username';
DELETE FROM activity WHERE user_id = 'username';
DELETE FROM messages WHERE from_user = 'username' OR to_user = 'username';
```

## Row Level Security

All tables have RLS enabled with permissive policies (public app):
```sql
CREATE POLICY "Allow all" ON table_name
FOR ALL USING (true) WITH CHECK (true);
```

## Backup

Export user data:
```sql
SELECT * FROM words WHERE user_id = 'julian';
```

The app also has an "Export Profile" button that downloads JSON.
