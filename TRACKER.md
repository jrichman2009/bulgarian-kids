# Bulgarian Kids - Component Tracker

## Components Overview

| # | Component | Status | Notes |
|---|-----------|--------|-------|
| 1 | **Login Screen** | ✅ Working | Name-based login, recent users |
| 2 | **Home Screen** | ✅ Working | Dashboard, Baba Points, daily stars |
| 3 | **ABC Letters** | ✅ Working | 30 Cyrillic letters, 2-choice quiz, admin audio recording |
| 4 | **Words** | ✅ Working | Smart pooling, spaced repetition, shared word pool |
| 5 | **Test Me** | ✅ Working | Speaking practice, self-grading |
| 6 | **TV Store** | ✅ Working | Buy/redeem TV time with points |
| 7 | **Add Word** | ✅ Working | Transliteration, audio recording, saves to database |
| 8 | **Admin Panel** | ✅ Working | Edit/delete words |
| 9 | **Inbox** | ✅ Working | Receive messages, voice playback |
| 10 | **Send Message** | ✅ Working | Voice/text messages to any user |
| 11 | **View Progress** | ✅ Working | Parent dashboard by user name |
| 12 | **Settings** | ✅ Working | Export, reset, migrate |
| 13 | **Stickers** | ✅ Working | 8 achievement badges |
| 14 | **Admin Dashboard** | ✅ Working | All users view, activity history |
| 15 | **Letter Audio** | ✅ Working | Admin recording, database storage |

**Status Legend**: ✅ Working | ⚠️ Issues | ❌ Broken

---

## Component Details

### 1. Login Screen
**Files**: `index.html:18-44`, `app.js:3030-3090`
**Functions**: `showLoginScreen()`, `handleLogin()`, `populateRecentUsers()`

Features:
- [x] Name input field
- [x] Recent users quick select
- [x] Mascot and branding
- [x] Session persistence

---

### 2. Home Screen
**Files**: `index.html:76-185`, `app.js:259-350`
**Functions**: `updateHomeScreen()`, `updateTvTimeDisplay()`, `updateStickerPreview()`

Elements:
- [x] Mascot welcome message
- [x] Baba Points display with icon
- [x] Star level (0-3 stars based on points)
- [x] Current streak display
- [x] Daily stars (0-5)
- [x] ABC Letters card + progress
- [x] Words card + progress
- [x] Test Me card + progress
- [x] TV Store card with balance
- [x] Add Word button
- [x] Send Message button
- [x] View Progress button
- [x] Sticker collection preview

---

### 3. ABC Letters
**Files**: `index.html:187-251`, `app.js:542-820`
**Functions**: `setupAlphabetQuestion()`, `selectAlphabetChoice()`, `goToNextLetter()`

Features:
- [x] Progress bar
- [x] Letter card display
- [x] 2-choice phonetic sound buttons
- [x] Answer feedback overlay (picture, word)
- [x] Letter highlighting in example words
- [x] Audio playback (recorded or TTS)
- [x] Auto-advance countdown (2 seconds)
- [x] SRS mastery tracking (3 correct = mastered)
- [x] Admin audio recording section (admin only)

---

### 4. Words (Vocab Module)
**Files**: `index.html:253-283`, `app.js:1078-1325`
**Functions**: `initVocabModule()`, `setupVocabQuestion()`, `selectVocabChoice()`

Features:
- [x] Empty state (no words added yet)
- [x] Progress bar
- [x] Word card (Cyrillic + transliteration)
- [x] 2-choice buttons (English meanings)
- [x] Audio playback button
- [x] Smart pooling (active pool + priority scoring)
- [x] Spaced repetition algorithm
- [x] Mastery tracking (3 correct, >60% accuracy)
- [x] Milestone celebrations (5, 10, 25, 50, 75, 100)
- [x] Mastery can be lost on wrong answer

---

### 5. Test Me
**Files**: `index.html:285-362`, `app.js:1326-1520`
**Functions**: `initTestMeModule()`, `setupTestMeQuestion()`, `toggleTestMeRecording()`

Features:
- [x] English prompt display
- [x] Record button with visual feedback
- [x] Recording indicator
- [x] Playback of user's recording
- [x] Correct answer reveal (Cyrillic + translit)
- [x] Self-grading buttons (Got it! / Practice More)
- [x] Points for correct (+2)

---

### 6. TV Store
**Files**: `index.html:471-546`, `app.js:1580-1700`
**Functions**: `openTvStore()`, `buyTvTime()`, `redeemTvTime()`, `closeVoucher()`

Features:
- [x] Points balance display
- [x] TV minutes balance display
- [x] Buy buttons (50 pts/15min, 100 pts/30min, 200 pts/60min)
- [x] Insufficient points handling
- [x] Redeem button
- [x] Voucher modal for parent approval
- [x] Purchase logging to activity

---

### 7. Add Word
**Files**: `index.html:662-708`, `app.js:1900-2070`
**Functions**: `openAddWord()`, `saveNewWord()`, `toggleRecording()`

Features:
- [x] Transliteration input
- [x] Auto-convert to Cyrillic
- [x] English meaning input
- [x] Record audio button
- [x] Recording indicator
- [x] Playback recorded audio
- [x] Save to Supabase (default user)
- [x] Duplicate word detection

---

### 8. Admin Panel (Manage Words)
**Files**: `index.html:598-660`, `app.js:2071-2225`
**Functions**: `openAdmin()`, `renderWordsList()`, `editWord()`, `deleteWord()`

Features:
- [x] Word list display
- [x] Edit word modal
- [x] Re-record audio option
- [x] Delete word confirmation
- [x] Save changes to Supabase

---

### 9. Inbox
**Files**: `index.html:394-405`, `app.js:2567-2750`
**Functions**: `openInbox()`, `renderInbox()`, `markMessageRead()`

Features:
- [x] Unread badge count on header icon
- [x] Message list display
- [x] Voice message playback
- [x] Mark as read on view
- [x] Time ago display
- [x] Empty state

---

### 10. Send Message
**Files**: `index.html:407-447`, `app.js:2750-2850`
**Functions**: `openSendMessage()`, `submitMessage()`, `toggleVoiceMsgRecording()`

Features:
- [x] Recipient input
- [x] Voice message recording
- [x] Text message input
- [x] Quick message presets
- [x] Send to Supabase
- [x] Success feedback

---

### 11. View Progress (Parent Dashboard)
**Files**: `index.html:449-469`, `app.js:2894-2960`
**Functions**: `openAdminView()`, `loadAdminData()`

Features:
- [x] User search input
- [x] Stats display (points, streaks, mastered)
- [x] Send encouragement button

---

### 12. Settings
**Files**: `index.html:364-392`, `app.js:1560-1580`
**Functions**: `openSettings()`, `exportProfile()`, `resetProgress()`, `migrateDefaultTo()`

Features:
- [x] Current user display
- [x] Export profile (JSON download)
- [x] Copy default to other user
- [x] Reset progress confirmation

---

### 13. Stickers (Achievements)
**Files**: `index.html:548-557`, `app.js:109-119, 394-414`
**Functions**: `checkSticker()`, `showStickerUnlock()`, `openAchievements()`

Stickers (8 total):
- [x] First Try (first correct answer)
- [x] Letter Learner (5 letters mastered)
- [x] Word Wizard (5 words mastered)
- [x] Hot Streak (5 in a row)
- [x] Superstar (daily stars complete)
- [x] Baba's Helper (100 total points)
- [x] Bear's Friend (3 days played)
- [x] Champion (10 letters mastered)

---

### 14. Admin Dashboard
**Files**: `index.html:711-752`, `app.js:3149-3330`
**Functions**: `openAdminDashboard()`, `loadAdminDashboard()`, `showUserDetail()`

Features:
- [x] Auto-redirect for admin user
- [x] All users list with stats
- [x] User detail view (click to expand)
- [x] Points, words, letters, streak display
- [x] Words list per user
- [x] Activity history per user
- [x] Send message to user

---

### 15. Letter Audio (Admin Recording)
**Files**: `index.html:224-246`, `app.js:822-1067`
**Functions**: `toggleAdminLetterRecording()`, `saveAdminLetterAudio()`, `playLetterAudio()`

Features:
- [x] Admin-only visibility in ABC module
- [x] 3-2-1 visual countdown
- [x] Recording with indicator
- [x] Preview playback
- [x] Save to database (letter_audio table)
- [x] Audio caching for performance
- [x] Status indicator (saved/not saved)

---

## Database Tables Status

| Table | Status | Purpose |
|-------|--------|---------|
| `users` | ✅ Working | User profiles, cumulative stats |
| `words` | ✅ Working | Vocabulary with audio |
| `activity` | ✅ Working | Event logging |
| `messages` | ✅ Working | Parent-child messaging |
| `letter_audio` | ✅ Working | Admin-recorded letter audio |

---

## Known Issues

None currently tracked.

---

## Testing Checklist

For each component, test:
- [x] Basic functionality works
- [x] Data persists (localStorage + Supabase)
- [x] Works on mobile (touch, responsive)
- [x] Audio works (TTS + recording)
- [x] Error states handled gracefully
- [x] Multi-user isolation

---

## Quick Commands

```bash
# Local testing
python3 -m http.server 8080

# Deploy
npx vercel --prod --yes

# Test URLs
http://localhost:8080?user=julian
http://localhost:8080?user=jeff
http://localhost:8080?user=admin  # Admin dashboard
http://localhost:8080             # Login screen
```
