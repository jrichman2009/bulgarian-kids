# Gamification System

Designed for a 5-year-old: simple, encouraging, no punishment.

## Baba Points

The core currency, represented by grandma (Baba) icon.

### Earning Points
| Action | Points |
|--------|--------|
| Correct answer | +1 |
| Master a word | +3 |
| Master a letter | +3 |
| Earn a sticker | +5 to +100 |
| Add new word | +1 |
| Test Me correct | +2 |

### Spending Points
| Item | Cost |
|------|------|
| 15 min TV | 50 pts |
| 30 min TV | 100 pts |
| 60 min TV | 200 pts |

## Stars System

Visual progress indicator (replaces complex XP/levels).

| Stars | Points Required |
|-------|-----------------|
| ☆☆☆ | 0-4 |
| ⭐☆☆ | 5-14 |
| ⭐⭐☆ | 15-29 |
| ⭐⭐⭐ | 30+ |

Star level-up triggers celebration modal.

## Daily Stars

Simple daily goal: complete 5 cards.

```
☆ ☆ ☆ ☆ ☆  →  Play 5 cards  →  ⭐ ⭐ ⭐ ⭐ ⭐
```

Resets at midnight. Encourages daily practice without pressure.

## Streaks

### Current Streak
Consecutive correct answers. Resets on wrong answer.
Displayed as 🔥 number.

### Best Streak
All-time record. Never resets.

### Day Streak
Consecutive days played. Not prominently displayed (avoid anxiety).

## Stickers (Achievements)

Kid-friendly achievements with Baba Point rewards.

| Sticker | Trigger | Points |
|---------|---------|--------|
| 🎯 First Try! | First correct answer | +5 |
| 🔤 Letter Learner | Master 5 letters | +20 |
| 📚 Word Wizard | Master 5 words | +20 |
| 🔥 Hot Streak! | 5 correct in a row | +15 |
| ⭐ Superstar | Complete daily stars | +25 |
| 💜 Baba's Helper | Earn 100 total points | +50 |
| 🐻 Bear's Friend | Play 3 days | +30 |
| 🏆 Champion! | Master 10 letters | +100 |

## Milestones

Big celebrations for word mastery progress.

| Words | Title | Message |
|-------|-------|---------|
| 5 | First Steps! | You learned 5 words! Keep going! |
| 10 | Double Digits! | 10 words! You're amazing! |
| 25 | Word Champion! | 25 words! Baba is SO proud! |
| 50 | Super Learner! | 50 words! You're incredible! |
| 75 | Word Wizard! | 75 words! Almost to 100! |
| 100 | LEGENDARY! | 100 WORDS! You're a Bulgarian star! |

Full-screen modal with confetti animation.

## Celebrations

### Correct Answer
Quick overlay: "Bravo! 🎉" (0.8s)

### Word Mastered
Toast message: "Word mastered!" + 3 pts popup

### Sticker Unlock
Toast with icon and name, sound effect

### Level Up (Star)
Modal: "AMAZING! You got a new star! Baba is so proud!"

### Milestone
Full modal with count, confetti, and personalized message

## Design Principles

1. **No punishment** - Wrong answers just reset streak, no lost points
2. **Frequent rewards** - Something positive every correct answer
3. **Big celebrations** - Milestones feel special
4. **Tangible rewards** - TV time connects learning to real benefit
5. **Simple numbers** - No complex XP calculations
6. **Visual progress** - Stars and progress bars, not numbers
