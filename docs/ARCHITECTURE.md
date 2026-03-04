# Architecture

## Tech Stack
- **Frontend**: Vanilla HTML/CSS/JS (no framework)
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel (static)
- **Audio**: Web Audio API, MediaRecorder API, SpeechSynthesis

## Why Single-File Architecture?
- Target user is 5 years old - simplicity is key
- No build step needed
- Easy to deploy (just static files)
- Easy to debug (everything in one place)

## State Management

```javascript
const state = {
    currentModule: null,
    game: {
        babaPoints: 0,
        tvMinutesAvailable: 0,
        currentStreak: 0,
        bestStreak: 0,
        dailyProgress: 0,  // 0-5 stars
        stickers: [],
        lastPlayDate: null,
        tvPurchases: [],
    },
    alphabet: {
        mastered: [],
        introduced: [],
        srs: {},  // Spaced repetition data per letter
    },
    vocab: {
        words: [],
        mastered: [],
        activePool: [],
        reviewPool: [],
    },
    testme: {
        correctCount: 0,
        totalAttempts: 0,
    }
};
```

## Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Supabase   │────▶│  app.js     │────▶│  localStorage│
│  (cloud)    │     │  (state)    │     │  (offline)   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       │                   ▼
       │            ┌─────────────┐
       └───────────▶│  UI (DOM)   │
                    └─────────────┘
```

1. **On Load**:
   - Load from localStorage first (instant)
   - Then fetch from Supabase (sync cloud data)
   - Merge cloud data into local state

2. **On Save**:
   - Save to localStorage (instant)
   - Sync to Supabase (async, background)

## Smart Word Pooling

Instead of static "levels", words flow through pools:

```
┌─────────────────────────────────────────────────────┐
│                    ALL WORDS                        │
├─────────────────┬─────────────────┬────────────────┤
│   Not Introduced│   Active Pool   │  Review Pool   │
│   (waiting)     │   (learning)    │  (mastered)    │
│                 │   5-8 words     │                │
└────────┬────────┴────────┬────────┴───────┬────────┘
         │                 │                │
         │    introduce    │    master      │
         └────────────────▶│───────────────▶│
                           │                │
                           │◀───────────────│
                           │  review (30%)  │
```

**Quiz Selection Algorithm**:
- 70% from Active Pool (words being learned)
- 30% from Review Pool (spaced repetition)
- Priority scoring based on: accuracy, time since last seen, wrong count

## Multi-User System

Users identified by URL parameter:
```
https://bulgarian-kids.vercel.app?user=julian
https://bulgarian-kids.vercel.app?user=jeff
https://bulgarian-kids.vercel.app  → user="default"
```

Each user has:
- Separate localStorage key: `bulgarianKids_{username}`
- Separate database rows (filtered by `user_id`)
- Own progress, points, words

## Audio System

Three audio types:
1. **Recorded Audio**: Base64-encoded, stored in database
2. **TTS Fallback**: SpeechSynthesis API (English transliteration)
3. **Sound Effects**: Web Audio API (generated tones)

iOS requires audio unlock on first tap (silent audio trick).
