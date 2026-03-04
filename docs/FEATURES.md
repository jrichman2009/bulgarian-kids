# Features

## Learning Modules

### 1. ABC Letters
Learn the 30 Bulgarian Cyrillic letters.

- **Format**: 2-choice quiz (pick the phonetic sound)
- **Flip card**: Shows letter, sound, pronunciation hint
- **Audio**: TTS plays after answer (English phonetic fallback)
- **Progression**: Start with 5 letters, unlock more as mastered
- **Mastery**: 3 correct answers in a row

### 2. Words
Learn vocabulary with smart spaced repetition.

- **Format**: 2-choice quiz (pick the English meaning)
- **Smart pooling**: 5-8 active words + review of mastered
- **Selection**: 70% active pool, 30% review pool
- **Mastery**: 3 correct + >60% accuracy
- **Auto-progression**: Master 1 word → introduce 1 new word

### 3. Test Me
Speaking practice with self-assessment.

- **Format**: See English → record yourself saying Bulgarian
- **Flow**: Tap to record → Stop → Hear correct answer → Self-grade
- **Points**: 2 points for correct self-assessment
- **Audio**: Plays recorded pronunciation or TTS

## Word Management

### Add Word
- Enter transliteration → auto-converts to Cyrillic
- Record audio pronunciation (optional)
- 3-2-1 countdown before recording

### Admin Panel (📝)
- View all words
- Edit word details
- Re-record audio
- Delete words

## Communication

### Inbox (💌)
- Receive messages from parents/grandparents
- Voice message playback
- Unread badge indicator

### Send Message
- Text or voice message
- Quick message presets
- Send to any username

### View Progress (👀)
- Check another user's progress
- See struggling words
- Send encouragement

## Settings

- **Export Profile**: Download JSON backup
- **Copy Default → User**: Migrate profiles
- **Start Over**: Reset all progress

## TV Store

Spend Baba Points on TV time:

| Cost | TV Time |
|------|---------|
| 50 pts | 15 minutes |
| 100 pts | 30 minutes |
| 200 pts | 60 minutes (Best Deal!) |

**Redeem flow**:
1. Kid taps "Use My TV Time"
2. Voucher shows with timestamp
3. Parent approves
4. TV minutes cleared

## Audio Features

### Recording
- Microphone permission request first
- 3-2-1 countdown
- Stored as base64 in database
- Playback button after recording

### TTS
- Bulgarian voice if available
- English transliteration fallback (iOS)
- Slower rate for clarity (0.6x)

### Sound Effects
- Correct: Happy ascending tone
- Wrong: Descending tone
- Coin: High ping (Baba Points)
- Level up: Fanfare
