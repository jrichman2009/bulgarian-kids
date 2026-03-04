# Bulgarian for Kids - Project Plan

## Overview

A gamified Bulgarian language learning app for children, featuring multi-user support, Baba Points currency, TV time rewards, and smart spaced repetition.

**Live URL**: https://bulgarian-kids.vercel.app

---

## Phase 1: Core Infrastructure (COMPLETED)

### User Login System
- [x] Name-based login (no password required)
- [x] Recent users list for quick switching
- [x] URL param support (?user=name) for direct access
- [x] User menu with switch/logout options

### Supabase Database Setup
- [x] PostgreSQL database via Supabase
- [x] Tables: users, words, activity, messages, letter_audio
- [x] Row-level security enabled
- [x] Real-time sync capabilities

### Multi-User Support
- [x] Separate progress per user (localStorage)
- [x] Shared word pool from 'default' user
- [x] User profile sync to cloud
- [x] Activity logging per user

---

## Phase 2: ABC Letters Module (COMPLETED)

### Core Functionality
- [x] 30 Bulgarian Cyrillic letters with data
- [x] Letter data stored in app.js (ALPHABET constant)
- [x] 2-choice quiz format
- [x] Progressive letter unlocking (start with 5, unlock more)
- [x] SRS-based mastery tracking (3 correct = mastered)

### Visual Feedback
- [x] Pictures and emoji for each letter
- [x] Example words with transliteration
- [x] Letter highlighting in example words
- [x] Auto-advance after answering (2 second countdown)
- [x] Correct/wrong feedback overlays

### Audio System
- [x] Admin can record audio for each letter
- [x] Audio stored in database (letter_audio table)
- [x] Fallback to TTS when no recording exists
- [x] Audio caching for performance

---

## Phase 3: Words Module (COMPLETED)

### Word Pool Architecture
- [x] Shared word pool from 'default' user in database
- [x] Words stored in database (words table, user_id='default')
- [x] Per-user progress tracked in localStorage
- [x] Custom audio recordings for each word

### Smart Pooling / Spaced Repetition
- [x] Active pool (5-8 words learning at a time)
- [x] Priority scoring (struggling words get more practice)
- [x] Gradual word introduction (1-2 new words per session)
- [x] Mastery requires 3 correct + >60% accuracy

### Quiz Features
- [x] 2-choice quiz format
- [x] Audio playback for words
- [x] Transliteration display
- [x] Mastery can be lost if wrong answer given

---

## Phase 4: Gamification (COMPLETED)

### Baba Points Currency
- [x] +1 point per correct answer
- [x] +3 bonus for mastery
- [x] +2 bonus for Test Me correct
- [x] Visual coin animation popup
- [x] Running total displayed with Baba icon

### TV Store Marketplace
- [x] Buy TV time with Baba Points (50/100/200 pts)
- [x] TV time voucher system for parent approval
- [x] Purchase history tracking
- [x] Balance display on home screen

### Stickers/Achievements
- [x] 8 achievement stickers
- [x] First Try, Letter Learner, Word Wizard
- [x] Hot Streak, Superstar, Baba's Helper
- [x] Bear's Friend, Champion
- [x] Unlock animations and sounds

### Daily Stars
- [x] 5 daily stars to fill
- [x] Each correct answer fills one star
- [x] Daily reset at midnight
- [x] Superstar sticker for completion

### Milestones
- [x] Celebrations at 5, 10, 25, 50, 75, 100 words mastered
- [x] Modal with confetti animation
- [x] Activity logging for milestones

---

## Phase 5: Communication (COMPLETED)

### Inbox for Messages
- [x] Receive messages from grandparents/parents
- [x] Voice message playback support
- [x] Mark as read functionality
- [x] Unread badge count on inbox icon
- [x] Time ago display

### Send Message Feature
- [x] Text message composition
- [x] Voice message recording
- [x] Quick message presets
- [x] Send to any user by name

### Parent/Admin View Progress
- [x] View any user's stats by name
- [x] Points, streaks, mastered counts
- [x] Word list display
- [x] Send encouragement option

---

## Phase 6: Admin Dashboard (COMPLETED)

### Admin User Detection
- [x] Admin mode for user 'admin'
- [x] Automatic redirect to dashboard
- [x] Admin-only UI elements

### View All Users Stats
- [x] List all registered users
- [x] Points, words mastered, best streak
- [x] Last active timestamp
- [x] Click to view detailed stats

### Activity History
- [x] Recent activity feed per user
- [x] Event icons (correct, wrong, mastered, etc.)
- [x] Activity timestamps
- [x] Filter by event type

### Send Encouragement
- [x] Direct message to any user
- [x] Quick access from user detail view
- [x] Voice or text messages

### Admin Letter Recording
- [x] Record audio for each letter (in ABC module)
- [x] 3-2-1 countdown before recording
- [x] Save to database
- [x] Preview before saving

---

## FUTURE PHASES

### Phase 7: Test Me Module Improvements
- [ ] Speech recognition feedback
- [ ] Automatic correct/wrong detection
- [ ] Pronunciation scoring
- [ ] Recording comparison playback

### Phase 8: More Gamification Features
- [ ] Weekly challenges
- [ ] Leaderboard (family members)
- [ ] Bonus point multipliers
- [ ] Special event rewards

### Phase 9: Parent Controls
- [ ] Pin-protected settings
- [ ] Time limits
- [ ] Content filtering by category
- [ ] Progress reports via email

### Phase 10: Content Expansion
- [ ] Sentences module
- [ ] Story mode
- [ ] More vocabulary categories
- [ ] Numbers and counting

---

## Technical Stack

| Component | Technology |
|-----------|------------|
| Frontend | Vanilla HTML/CSS/JS |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |
| Audio | Web Audio API, MediaRecorder |
| TTS | Web Speech API |
| PWA | Service Worker ready |

---

## File Structure

```
bulgarian-kids/
├── index.html          # Single page app UI
├── styles.css          # All styles
├── app.js              # All logic (~3400 lines)
├── baba.png            # Mascot image
├── supabase-setup.sql  # Database setup scripts
├── CLAUDE.md           # Quick reference for Claude
├── PROJECT_PLAN.md     # This file
├── TRACKER.md          # Component status tracker
├── README.md           # Project overview
└── docs/               # Additional documentation
```

---

## Commands

```bash
# Local development
python3 -m http.server 8080

# Deploy to production
npx vercel --prod --yes

# Test URLs
http://localhost:8080?user=julian
http://localhost:8080?user=admin
```
