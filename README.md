# Bulgarian for Kids

A gamified Bulgarian language learning app for children, featuring Baba Points, TV time rewards, and smart spaced repetition.

**Live**: https://bulgarian-kids.vercel.app

## Quick Start

```bash
# Local development
python3 -m http.server 8080
# Open http://localhost:8080

# Deploy
npx vercel --prod --yes
```

## Users

Access different profiles via URL:
- https://bulgarian-kids.vercel.app?user=julian
- https://bulgarian-kids.vercel.app?user=jeff
- https://bulgarian-kids.vercel.app (default user)

## Features

| Module | Description |
|--------|-------------|
| **ABC Letters** | Learn 30 Cyrillic letters with audio |
| **Words** | Vocabulary with smart spaced repetition |
| **Test Me** | Speaking practice with self-grading |
| **TV Store** | Spend points on TV time rewards |

## Gamification

- **Baba Points**: Earn by learning, spend on TV time
- **Milestones**: Celebrations at 5, 10, 25, 50, 100 words
- **Stickers**: 8 achievement badges
- **Daily Stars**: Complete 5 cards per day

## Documentation

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Quick reference (loaded by Claude) |
| `docs/ARCHITECTURE.md` | Technical details |
| `docs/DATABASE.md` | Supabase schema & queries |
| `docs/FEATURES.md` | All features explained |
| `docs/GAMIFICATION.md` | Points & rewards system |

## Tech Stack

- Vanilla HTML/CSS/JS (no framework)
- Supabase (PostgreSQL)
- Vercel (hosting)
- Web Audio API (sound effects)
- MediaRecorder API (voice recording)

## File Structure

```
bulgarian-kids/
├── index.html          # Single page app
├── styles.css          # All styles
├── app.js              # All logic
├── baba.png            # Mascot image
├── supabase-setup.sql  # Database scripts
└── docs/               # Documentation
```
