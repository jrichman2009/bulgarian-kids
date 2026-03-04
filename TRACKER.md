# Bulgarian Kids - Component Tracker

## Components Overview

| # | Component | Status | Priority | Notes |
|---|-----------|--------|----------|-------|
| 1 | **Home Screen** | ? | - | Dashboard, Baba Points, daily stars |
| 2 | **ABC Letters** | ? | - | 30 Cyrillic letters, 2-choice quiz |
| 3 | **Words** | ? | - | Smart pooling, spaced repetition |
| 4 | **Test Me** | ? | - | Speaking practice, self-grading |
| 5 | **TV Store** | ? | - | Buy/redeem TV time with points |
| 6 | **Add Word** | ? | - | Transliteration, audio recording |
| 7 | **Admin Panel** | ? | - | Edit/delete words |
| 8 | **Inbox** | ? | - | Receive messages |
| 9 | **Send Message** | ? | - | Voice/text messages |
| 10 | **View Progress** | ? | - | Parent dashboard |
| 11 | **Settings** | ? | - | Export, reset, migrate |
| 12 | **Stickers** | ? | - | Achievement badges |

**Status Legend**: ✅ Working | ⚠️ Issues | ❌ Broken | ? Needs Testing

---

## Component Details

### 1. Home Screen
**Files**: `index.html:33-141`, `app.js:231-294`
**Functions**: `updateHomeScreen()`, `updateTvTimeDisplay()`, `updateStickerPreview()`

Elements:
- [ ] Mascot welcome message
- [ ] Baba Points display
- [ ] Star level (0-3 stars)
- [ ] Current streak display
- [ ] Daily stars (0-5)
- [ ] ABC Letters card + progress
- [ ] Words card + progress
- [ ] Test Me card + progress
- [ ] TV Store card
- [ ] Add Word button
- [ ] Send Message button
- [ ] View Progress button
- [ ] Sticker collection preview

---

### 2. ABC Letters
**Files**: `index.html:144-177`, `app.js:522-661`
**Functions**: `setupAlphabetQuestion()`, `checkAlphabetAnswer()`, `goToNextLetter()`

Elements:
- [ ] Progress bar
- [ ] Flashcard display (letter)
- [ ] 2-choice buttons (phonetic sounds)
- [ ] Flip card animation
- [ ] Audio playback (TTS)
- [ ] Correct/wrong feedback
- [ ] Next button
- [ ] Mastery tracking (3 correct in a row)

---

### 3. Words (Vocab Module)
**Files**: `index.html:179-209`, `app.js:663-897`
**Functions**: `initVocabModule()`, `setupVocabQuestion()`, `checkVocabAnswer()`

Elements:
- [ ] Empty state (no words)
- [ ] Progress bar
- [ ] Word card (Cyrillic + transliteration)
- [ ] 2-choice buttons (English meanings)
- [ ] Audio playback
- [ ] Smart pooling (active pool + review pool)
- [ ] Mastery tracking (3 correct, >60% accuracy)
- [ ] Milestone celebrations (5, 10, 25, 50, 75, 100)

---

### 4. Test Me
**Files**: `index.html:212-288`, `app.js:899-1122`
**Functions**: `initTestMeModule()`, `setupTestMeQuestion()`, `toggleTestMeRecording()`

Elements:
- [ ] English prompt display
- [ ] Record button + countdown
- [ ] Recording indicator
- [ ] Playback of user's recording
- [ ] Correct answer reveal
- [ ] Self-grading buttons (Got it! / Practice More)
- [ ] Points for correct (+2)

---

### 5. TV Store
**Files**: `index.html:398-472`, `app.js:1187-1325`
**Functions**: `openTvStore()`, `buyTvTime()`, `redeemTvTime()`, `closeVoucher()`

Elements:
- [ ] Points balance display
- [ ] TV minutes balance display
- [ ] Buy buttons (50→15min, 100→30min, 200→60min)
- [ ] Insufficient points handling
- [ ] Redeem button
- [ ] Voucher modal for parent approval
- [ ] Purchase history logging

---

### 6. Add Word
**Files**: `index.html:588-634`, `app.js:1326-1500`
**Functions**: `openAddWord()`, `saveNewWord()`, `toggleRecording()`

Elements:
- [ ] Transliteration input
- [ ] Auto-convert to Cyrillic
- [ ] English meaning input
- [ ] Record audio button
- [ ] 3-2-1 countdown
- [ ] Playback recorded audio
- [ ] Save to Supabase
- [ ] Duplicate word detection

---

### 7. Admin Panel (Manage Words)
**Files**: `index.html:524-540`, `app.js:1636-1850`
**Functions**: `openAdmin()`, `loadAdminWords()`, `editWord()`, `deleteWord()`

Elements:
- [ ] Word list display
- [ ] Edit word modal
- [ ] Re-record audio
- [ ] Delete word confirmation
- [ ] Save changes to Supabase

---

### 8. Inbox
**Files**: `index.html:320-331`, `app.js:2270-2360`
**Functions**: `openInbox()`, `loadMessages()`, `playMessageAudio()`

Elements:
- [ ] Unread badge count
- [ ] Message list display
- [ ] Voice message playback
- [ ] Mark as read
- [ ] Empty state

---

### 9. Send Message
**Files**: `index.html:334-373`, `app.js:2363-2492`
**Functions**: `openSendMessage()`, `submitMessage()`, `toggleVoiceMsgRecording()`

Elements:
- [ ] Recipient input
- [ ] Voice message recording
- [ ] Text message input
- [ ] Quick message presets
- [ ] Send to Supabase
- [ ] Success/error feedback

---

### 10. View Progress (Parent Dashboard)
**Files**: `index.html:376-395`, `app.js:2495-2600`
**Functions**: `openAdminView()`, `loadAdminData()`

Elements:
- [ ] User search input
- [ ] Stats display (points, streaks, mastered)
- [ ] Word list with accuracy
- [ ] Struggling words highlight
- [ ] Send encouragement button

---

### 11. Settings
**Files**: `index.html:291-318`, `app.js:1124-1160`
**Functions**: `openSettings()`, `exportProfile()`, `resetProgress()`, `migrateDefaultTo()`

Elements:
- [ ] Current user display
- [ ] Export profile (JSON download)
- [ ] Copy default → user
- [ ] Reset progress confirmation

---

### 12. Stickers (Achievements)
**Files**: `index.html:474-483`, `app.js:367-386, 1133-1147`
**Functions**: `checkSticker()`, `showStickerUnlock()`, `openAchievements()`

Stickers:
- [ ] First Try (first correct)
- [ ] Letter Learner (5 letters)
- [ ] Word Wizard (5 words)
- [ ] Hot Streak (5 in a row)
- [ ] Superstar (daily stars complete)
- [ ] Baba's Helper (100 total points)
- [ ] Bear's Friend (3 days played)
- [ ] Champion (10 letters)

---

## Known Issues

1. **Multi-user words**: Words not auto-copied to new users (SQL needed)
2. **TBD**: Add issues as discovered during testing

---

## Testing Checklist

For each component, test:
- [ ] Basic functionality works
- [ ] Data persists (localStorage + Supabase)
- [ ] Works on mobile (touch, responsive)
- [ ] Audio works (TTS + recording)
- [ ] Error states handled gracefully
- [ ] Multi-user isolation (different ?user= params)

---

## Quick Commands

```bash
# Local testing
python3 -m http.server 8080

# Deploy
npx vercel --prod --yes

# Test URLs
# http://localhost:8080?user=julian
# http://localhost:8080?user=jeff
# http://localhost:8080
```
