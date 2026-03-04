# Implementation Plan: Login System, ABC Letters, Admin Dashboard

## Phase 1: User Authentication System

### Changes Needed:
1. **Login Screen** (new default landing page)
   - Simple name input field
   - "Start Learning" button
   - Recently used accounts list for quick switch
   - No password (kid-friendly)

2. **Session Management**
   - Store current user in localStorage (`currentUser`)
   - Store recent users list
   - Auto-redirect to login if no user

3. **Header Updates**
   - Show current user name
   - Logout button
   - Switch user option

4. **Database Recognition**
   - Check if user exists in Supabase `users` table
   - Create user record on first login
   - Load user data on login

### Files to Modify:
- `index.html`: Add login screen section
- `app.js`: Add auth functions
- `styles.css`: Add login screen styles

---

## Phase 2: ABC Letters Overhaul

### Current State:
- Shows letter, 2-choice quiz
- TTS audio
- Basic correct/wrong sounds

### New Features:
1. **Visual Design**
   - Large Bulgarian letter display
   - Two choice buttons with English transliteration
   - Child-friendly picture for each letter (emoji-based)

2. **Audio System**
   - "Hear it" button for letter sound
   - Record button for user to practice pronunciation
   - Correct answer: happy sound + checkmark animation
   - Wrong answer: gentle sound + X animation

3. **Letter Data Enhancement**
   - Add picture/emoji for each letter
   - Example word starting with that letter

### Letter Pictures (emoji-based):
```
А - 🍎 Apple (ябълка)
Б - 🐻 Bear (Баба)
В - 🌊 Wave (вълна)
Г - 🍇 Grapes (грозде)
Д - 🏠 House (дом)
Е - 🦔 Hedgehog (еж)
Ж - 🐸 Frog (жаба)
З - ⭐ Star (звезда)
И - 🎮 Game (игра)
Й - 🥛 Yogurt (йогурт)
К - 🐱 Cat (котка)
Л - 🍋 Lemon (лимон)
М - 🐭 Mouse (мишка)
Н - 🌙 Night (нощ)
О - ☁️ Cloud (облак)
П - 🐦 Bird (птица)
Р - 🐟 Fish (риба)
С - ☀️ Sun (слънце)
Т - 🚂 Train (влак - but Т for "Toot toot")
У - 🦆 Duck (утка)
Ф - 🎆 Fireworks (фойерверк)
Х - 🍞 Bread (хляб)
Ц - 🌸 Flower (цвете)
Ч - ☂️ Umbrella (чадър)
Ш - 🎩 Hat (шапка)
Щ - 🦑 Squid (щука - pike)
Ъ - 🏔️ Mountain (връх)
Ь - (soft sign - no picture)
Ю - 🎠 Carousel (юлиански)
Я - 🍳 Egg (яйце)
```

---

## Phase 3: Admin Dashboard

### Admin User:
- Username: `admin` (detected automatically)
- Special privileges

### Admin Dashboard Features:
1. **User List**
   - All registered users
   - Click to see details

2. **User Stats**
   - Total Baba Points
   - Current/Best streak
   - Letters mastered
   - Words mastered
   - Last active date

3. **Activity History**
   - Recent quiz events
   - Milestones reached
   - TV time purchases

4. **Quick Actions**
   - Send message to user
   - View struggling words
   - Export user data

---

## Execution Order:
1. Phase 1: Login System (foundation)
2. Phase 2: ABC Letters (enhance learning)
3. Phase 3: Admin Dashboard (monitoring)
