# Bulgarian Kids - Claude Quick Reference

**Live URL**: https://bulgarian-kids.vercel.app
**Deploy**: `npx vercel --prod --yes`

## Project Structure
```
bulgarian-kids/
├── index.html      # All UI (single page app)
├── styles.css      # All styles
├── app.js          # All logic (~2400 lines)
├── baba.png        # Grandma mascot
├── CLAUDE.md       # This file (always loaded)
├── docs/
│   ├── ARCHITECTURE.md   # Technical details
│   ├── DATABASE.md       # Supabase schema & queries
│   ├── FEATURES.md       # Feature documentation
│   └── GAMIFICATION.md   # Points, rewards, milestones
└── supabase-setup.sql    # Database setup scripts
```

## Key Concepts

| Concept | Description |
|---------|-------------|
| **Baba Points** | Currency earned by correct answers (1 pt) and mastery (3 pts) |
| **TV Store** | Spend points to buy TV time (50→15min, 100→30min, 200→60min) |
| **Smart Pooling** | Active pool (5-8 words learning) + Review pool (mastered words) |
| **Milestones** | Celebrations at 5, 10, 25, 50, 75, 100 words mastered |
| **Multi-user** | URL param `?user=name` for separate profiles |

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

## Read More
- `docs/ARCHITECTURE.md` - Technical deep dive
- `docs/DATABASE.md` - Schema and queries
- `docs/FEATURES.md` - All features explained
- `docs/GAMIFICATION.md` - Points and rewards system
