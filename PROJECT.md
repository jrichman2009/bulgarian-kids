# Bulgarian Kids - Project Summary

## Overview
A kid-friendly Bulgarian language learning app for 5-year-olds with Baba Points rewards and TV time marketplace.

**Live**: https://bulgarian-kids.vercel.app
**Deploy**: `npx vercel --prod --yes`

## Users
- `?user=julian` - Julian's profile
- `?user=jeff` - Jeff's profile
- No param - Default user

## Current Features (March 2025)

### Learning
- **ABC Letters**: 30 Cyrillic letters with audio
- **Words**: Smart spaced repetition (active pool + review)
- **Test Me**: Speaking practice with self-grading

### Gamification
- **Baba Points**: Currency for TV time
- **TV Store**: Buy 15/30/60 min packages
- **Milestones**: Celebrations at 5, 10, 25, 50, 75, 100 words
- **Stickers**: 8 achievement badges
- **Daily Stars**: 5 cards/day goal

### Communication
- **Inbox**: Receive messages from parents
- **Send Message**: Voice or text
- **View Progress**: Parent dashboard

## Documentation

See `docs/` folder for detailed documentation:
- `ARCHITECTURE.md` - Technical details
- `DATABASE.md` - Supabase schema & SQL
- `FEATURES.md` - All features
- `GAMIFICATION.md` - Points & rewards

See `CLAUDE.md` for quick reference.

## Key Design Decisions

1. **Single Words module** - No "Words 1, Words 2" levels
2. **Smart pooling** - System manages word introduction
3. **No punishment** - Wrong answers don't lose points
4. **TV time as reward** - Tangible real-world benefit
5. **Simple UI** - Big buttons, minimal navigation

## Database Tables
- `words` - Vocabulary per user
- `users` - Profile stats
- `activity` - Event log
- `messages` - Parent-child messaging

## Tech Stack
- Vanilla HTML/CSS/JS
- Supabase (PostgreSQL)
- Vercel (static hosting)
- Web Audio API
- MediaRecorder API
