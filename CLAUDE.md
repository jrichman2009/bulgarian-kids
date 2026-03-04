# Bulgarian Kids - Claude Quick Reference

**Live URL**: https://bulgarian-kids.vercel.app
**Deploy**: `npx vercel --prod --yes`

## Project Structure
```
bulgarian-kids/
├── index.html      # All UI (single page app)
├── styles.css      # All styles
├── app.js          # All logic (~3400 lines)
├── baba.png        # Grandma mascot
├── CLAUDE.md       # This file (always loaded)
├── PROJECT_PLAN.md # Project phases and roadmap
├── TRACKER.md      # Component status tracker
├── docs/
│   ├── ARCHITECTURE.md   # Technical details
│   ├── DATABASE.md       # Supabase schema & queries
│   ├── FEATURES.md       # Feature documentation
│   └── GAMIFICATION.md   # Points, rewards, milestones
└── supabase-setup.sql    # Database setup scripts
```

## Current Architecture

### Data Storage

| Data Type | Storage Location | Notes |
|-----------|-----------------|-------|
| **Alphabet Letters** | `app.js` (ALPHABET constant) | 30 letters with pictures, sounds, example words |
| **Letter Audio** | Database (letter_audio table) | Admin-recorded audio for each letter |
| **Words** | Database (words table, user_id='default') | Shared word pool with custom audio |
| **User Progress** | localStorage (`bulgarianKids_{username}`) | Per-user mastery, streaks, points |
| **User Profile** | Database (users table) | Synced stats for admin viewing |
| **Activity** | Database (activity table) | Event logging for analytics |
| **Messages** | Database (messages table) | Parent-child communication |

### User System
- Login: Name-based (no password)
- Admin: user 'admin' gets admin dashboard
- Multi-user: Each user has separate localStorage progress
- Word pool: All users share words from 'default' user

## Key Concepts

| Concept | Description |
|---------|-------------|
| **Baba Points** | Currency earned by correct answers (1 pt) and mastery (3 pts) |
| **TV Store** | Spend points to buy TV time (50/100/200 pts) |
| **Smart Pooling** | Active pool (5-8 words learning) + priority scoring |
| **Milestones** | Celebrations at 5, 10, 25, 50, 75, 100 words mastered |
| **Letter SRS** | Spaced repetition for letters (3 correct = mastered) |

## Common Tasks

### Add a feature
1. HTML in `index.html` (modals, sections)
2. CSS in `styles.css`
3. JS in `app.js` (state, functions)
4. Update version: `?v=YYYYMMDD` in HTML

### Database changes
1. Update `supabase-setup.sql`
2. Run SQL in Supabase dashboard
3. Update `app.js` if schema changed

### Debug
- Check browser console for errors
- User data in localStorage: `bulgarianKids_{username}`
- Supabase dashboard for database issues

## Do NOT
- Create separate module files (keep single-file architecture)
- Add complex navigation (5-year-old user)
- Remove audio recording feature
- Change the 2-choice quiz format

## Database Tables

| Table | Purpose |
|-------|---------|
| `users` | User profiles and cumulative stats |
| `words` | Vocabulary with audio (user_id='default' for shared pool) |
| `activity` | Event logging for analytics |
| `messages` | Parent-child messaging |
| `letter_audio` | Admin-recorded audio for alphabet letters |

## Key Functions

### App Initialization
- `initApp()` - Main entry point, handles login flow
- `loadWordsFromDatabase()` - Load shared word pool
- `loadLetterAudioFromDatabase()` - Load letter audio cache
- `loadUserProfile()` / `syncUserProfile()` - Cloud sync

### Modules
- `setupAlphabetQuestion()` - Letter quiz setup
- `setupVocabQuestion()` - Word quiz with smart pooling
- `setupTestMeQuestion()` - Speaking practice setup

### Admin
- `isAdmin()` - Check if current user is admin
- `openAdminDashboard()` - Admin user list and stats
- `toggleAdminLetterRecording()` - Record letter audio

## Read More
- `PROJECT_PLAN.md` - Complete project roadmap
- `TRACKER.md` - Component status tracker
- `docs/ARCHITECTURE.md` - Technical deep dive
- `docs/DATABASE.md` - Schema and queries
- `docs/FEATURES.md` - All features explained
- `docs/GAMIFICATION.md` - Points and rewards system
