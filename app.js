// Bulgarian for Kids! - Learning with Baba Points 👵

// ============ Supabase Configuration ============
const SUPABASE_URL = 'https://wnjoiczniapfydbufhaq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_nfQ-5zgBDb3OUAsR38ZRLA_AHY0TQXg';

// ============ User Authentication ============
const ADMIN_USER = 'admin';
let CURRENT_USER = null;

function getStoredUser() {
    return localStorage.getItem('bulgarian_kids_current_user');
}

function setStoredUser(username) {
    localStorage.setItem('bulgarian_kids_current_user', username);
    CURRENT_USER = username;
}

function getRecentUsers() {
    const stored = localStorage.getItem('bulgarian_kids_recent_users');
    return stored ? JSON.parse(stored) : [];
}

function addRecentUser(username) {
    let recent = getRecentUsers();
    recent = recent.filter(u => u !== username);
    recent.unshift(username);
    recent = recent.slice(0, 5); // Keep only 5 recent users
    localStorage.setItem('bulgarian_kids_recent_users', JSON.stringify(recent));
}

function isAdmin() {
    return CURRENT_USER === ADMIN_USER;
}

let db = null;
function initSupabase() {
    try {
        if (window.supabase && window.supabase.createClient) {
            db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabase initialized');
            return true;
        }
    } catch (err) {
        console.error('Supabase init error:', err);
    }
    return false;
}

// ============ Alphabet with Pictures ============
const ALPHABET = [
    { letter: 'А а', soundBg: 'ааа', soundEn: 'ahh', phonetic: 'ah', hint: 'like "a" in "father"', picture: '🍎', word: 'ябълка', wordEn: 'apple', translit: 'yabulka' },
    { letter: 'Б б', soundBg: 'бъ', soundEn: 'buh', phonetic: 'b', hint: 'like "b" in "boy"', picture: '🐻', word: 'баба', wordEn: 'grandma', translit: 'baba' },
    { letter: 'В в', soundBg: 'въ', soundEn: 'vuh', phonetic: 'v', hint: 'like "v" in "van"', picture: '🌊', word: 'вълна', wordEn: 'wave', translit: 'vulna' },
    { letter: 'Г г', soundBg: 'гъ', soundEn: 'guh', phonetic: 'g', hint: 'like "g" in "go"', picture: '🍇', word: 'грозде', wordEn: 'grapes', translit: 'grozde' },
    { letter: 'Д д', soundBg: 'дъ', soundEn: 'duh', phonetic: 'd', hint: 'like "d" in "dog"', picture: '🏠', word: 'дом', wordEn: 'house', translit: 'dom' },
    { letter: 'Е е', soundBg: 'еее', soundEn: 'eh', phonetic: 'e', hint: 'like "e" in "bed"', picture: '🦔', word: 'еж', wordEn: 'hedgehog', translit: 'ezh' },
    { letter: 'Ж ж', soundBg: 'жъ', soundEn: 'zhuh', phonetic: 'zh', hint: 'like "s" in "measure"', picture: '🐸', word: 'жаба', wordEn: 'frog', translit: 'zhaba' },
    { letter: 'З з', soundBg: 'зъ', soundEn: 'zuh', phonetic: 'z', hint: 'like "z" in "zoo"', picture: '⭐', word: 'звезда', wordEn: 'star', translit: 'zvezda' },
    { letter: 'И и', soundBg: 'иии', soundEn: 'eee', phonetic: 'ee', hint: 'like "ee" in "see"', picture: '🎮', word: 'игра', wordEn: 'game', translit: 'igra' },
    { letter: 'Й й', soundBg: 'ий', soundEn: 'y', phonetic: 'y', hint: 'like "y" in "yes"', picture: '🥛', word: 'йогурт', wordEn: 'yogurt', translit: 'yogurt' },
    { letter: 'К к', soundBg: 'къ', soundEn: 'kuh', phonetic: 'k', hint: 'like "k" in "kite"', picture: '🐱', word: 'котка', wordEn: 'cat', translit: 'kotka' },
    { letter: 'Л л', soundBg: 'лъ', soundEn: 'luh', phonetic: 'l', hint: 'like "l" in "love"', picture: '🍋', word: 'лимон', wordEn: 'lemon', translit: 'limon' },
    { letter: 'М м', soundBg: 'мъ', soundEn: 'muh', phonetic: 'm', hint: 'like "m" in "mom"', picture: '🐭', word: 'мишка', wordEn: 'mouse', translit: 'mishka' },
    { letter: 'Н н', soundBg: 'нъ', soundEn: 'nuh', phonetic: 'n', hint: 'like "n" in "no"', picture: '🌙', word: 'нощ', wordEn: 'night', translit: 'nosht' },
    { letter: 'О о', soundBg: 'ооо', soundEn: 'oh', phonetic: 'o', hint: 'like "o" in "more"', picture: '☁️', word: 'облак', wordEn: 'cloud', translit: 'oblak' },
    { letter: 'П п', soundBg: 'пъ', soundEn: 'puh', phonetic: 'p', hint: 'like "p" in "pen"', picture: '🐦', word: 'птица', wordEn: 'bird', translit: 'ptitsa' },
    { letter: 'Р р', soundBg: 'ръ', soundEn: 'rruh', phonetic: 'r', hint: 'rolled "r"', picture: '🐟', word: 'риба', wordEn: 'fish', translit: 'riba' },
    { letter: 'С с', soundBg: 'съ', soundEn: 'suh', phonetic: 's', hint: 'like "s" in "sun"', picture: '☀️', word: 'слънце', wordEn: 'sun', translit: 'sluntse' },
    { letter: 'Т т', soundBg: 'тъ', soundEn: 'tuh', phonetic: 't', hint: 'like "t" in "top"', picture: '🚂', word: 'трен', wordEn: 'train', translit: 'tren' },
    { letter: 'У у', soundBg: 'ууу', soundEn: 'ooo', phonetic: 'oo', hint: 'like "oo" in "moon"', picture: '🦆', word: 'утка', wordEn: 'duck', translit: 'utka' },
    { letter: 'Ф ф', soundBg: 'фъ', soundEn: 'fuh', phonetic: 'f', hint: 'like "f" in "fun"', picture: '🎆', word: 'фойерверк', wordEn: 'fireworks', translit: 'foyerverk' },
    { letter: 'Х х', soundBg: 'хъ', soundEn: 'huh', phonetic: 'h', hint: 'like "h" in "house"', picture: '🍞', word: 'хляб', wordEn: 'bread', translit: 'hlyab' },
    { letter: 'Ц ц', soundBg: 'цъ', soundEn: 'tsuh', phonetic: 'ts', hint: 'like "ts" in "cats"', picture: '🌸', word: 'цвете', wordEn: 'flower', translit: 'tsvete' },
    { letter: 'Ч ч', soundBg: 'чъ', soundEn: 'chuh', phonetic: 'ch', hint: 'like "ch" in "cheese"', picture: '☂️', word: 'чадър', wordEn: 'umbrella', translit: 'chadur' },
    { letter: 'Ш ш', soundBg: 'шъ', soundEn: 'shuh', phonetic: 'sh', hint: 'like "sh" in "ship"', picture: '🎩', word: 'шапка', wordEn: 'hat', translit: 'shapka' },
    { letter: 'Щ щ', soundBg: 'щъ', soundEn: 'shtuh', phonetic: 'sht', hint: 'like "sht"', picture: '🦑', word: 'щука', wordEn: 'pike fish', translit: 'shtuka' },
    { letter: 'Ъ ъ', soundBg: 'ъъъ', soundEn: 'uh', phonetic: 'uh', hint: 'like "u" in "but"', picture: '🏔️', word: 'връх', wordEn: 'peak', translit: 'vruh' },
    { letter: 'Ь ь', soundBg: 'ер малък', soundEn: 'soft', phonetic: '(soft)', hint: 'makes letters soft', picture: '🧈', word: 'мек', wordEn: 'soft', translit: 'mek' },
    { letter: 'Ю ю', soundBg: 'юу', soundEn: 'yoo', phonetic: 'yu', hint: 'like "u" in "cute"', picture: '🎠', word: 'юла', wordEn: 'spinning top', translit: 'yula' },
    { letter: 'Я я', soundBg: 'яа', soundEn: 'yah', phonetic: 'ya', hint: 'like "ya" in "yard"', picture: '🍳', word: 'яйце', wordEn: 'egg', translit: 'yaytse' },
];


// ============ TV Time Rewards ============
const TV_REWARDS = [
    { points: 1, minutes: 1, label: '1 minute' },
    { points: 5, minutes: 5, label: '5 minutes' },
    { points: 10, minutes: 10, label: '10 minutes' },
    { points: 20, minutes: 20, label: '20 minutes' },
    { points: 30, minutes: 30, label: '30 min + 🍿 popcorn!' },
];

function calculateTvMinutes(points) {
    // 1 Baba Point = 1 minute of TV time
    return points;
}

function getNextTvGoal(points) {
    for (const reward of TV_REWARDS) {
        if (points < reward.points) {
            return reward;
        }
    }
    return null;
}

// ============ Stickers (Kid-Friendly Achievements) ============
const STICKERS = [
    { id: 'first_try', name: 'First Try!', icon: '🎯', points: 5 },
    { id: 'letter_5', name: 'Letter Learner', icon: '🔤', points: 20 },
    { id: 'word_5', name: 'Word Wizard', icon: '📚', points: 20 },
    { id: 'streak_5', name: 'Hot Streak!', icon: '🔥', points: 15 },
    { id: 'daily_star', name: 'Superstar', icon: '⭐', points: 25 },
    { id: 'baba_helper', name: "Baba's Helper", icon: '💜', points: 50 },
    { id: 'bear_friend', name: "Bear's Friend", icon: '🐻', points: 30 },
    { id: 'champion', name: 'Champion!', icon: '🏆', points: 100 },
];

// ============ Mascot Greetings ============
const GREETINGS = [
    "Hi friend! Let's learn Bulgarian!",
    "Здравей! Ready to play?",
    "Let's earn Baba Points!",
    "You're doing great!",
    "Baba would be so proud!",
];

// No fallback words - users must add words explicitly

// ============ State ============
const state = {
    currentModule: null,
    game: {
        babaPoints: 0,
        tvMinutesAvailable: 0, // Purchased but not yet redeemed
        stars: 0, // 0-3 stars based on points
        currentStreak: 0,
        bestStreak: 0,
        dailyProgress: 0, // 0-5 for the stars
        stickers: [],
        lastPlayDate: null,
        tvPurchases: [], // History of purchases
    },
    alphabet: {
        mastered: [],
        currentQuestion: null,
        choices: [],
        introduced: [],
        srs: {},
    },
    vocab: {
        words: [],
        mastered: [],
        currentQuestion: null,
        choices: [],
        activePool: [], // Currently learning (5-8 words)
        reviewPool: [], // Mastered words for review
    },
    testme: {
        currentWord: null,
        correctCount: 0,
        totalAttempts: 0,
    }
};

// ============ Local Storage ============
function getStorageKey() {
    return `bulgarianKids_${CURRENT_USER}`;
}

function saveState() {
    localStorage.setItem(getStorageKey(), JSON.stringify({
        game: state.game,
        alphabet: {
            mastered: state.alphabet.mastered,
            introduced: state.alphabet.introduced,
            srs: state.alphabet.srs,
        },
        vocab: {
            words: state.vocab.words,
            mastered: state.vocab.mastered,
        },
        testme: {
            correctCount: state.testme.correctCount,
            totalAttempts: state.testme.totalAttempts,
        }
    }));
}

function loadState() {
    const saved = localStorage.getItem(getStorageKey());
    if (saved) {
        const data = JSON.parse(saved);
        if (data.game) state.game = { ...state.game, ...data.game };
        if (data.alphabet) {
            state.alphabet.mastered = data.alphabet.mastered || [];
            state.alphabet.introduced = data.alphabet.introduced || [];
            state.alphabet.srs = data.alphabet.srs || {};
        }
        if (data.vocab) {
            state.vocab.words = data.vocab.words || [];
            state.vocab.mastered = data.vocab.mastered || [];
        }
        if (data.testme) {
            state.testme.correctCount = data.testme.correctCount || 0;
            state.testme.totalAttempts = data.testme.totalAttempts || 0;
        }
    }
    checkDailyReset();
    updateHomeScreen();
}

function checkDailyReset() {
    const today = new Date().toDateString();
    if (state.game.lastPlayDate !== today) {
        state.game.dailyProgress = 0;
        state.game.lastPlayDate = today;
        saveState();
    }
}

// ============ Navigation ============
function goHome() {
    // Always hide all module screens
    document.querySelectorAll('.module-screen').forEach(m => m.classList.add('hidden'));
    document.getElementById('backBtn').classList.add('hidden');

    // Show the home screen for all users (including admin)
    document.getElementById('homeScreen').classList.remove('hidden');
    const displayName = CURRENT_USER ? CURRENT_USER.charAt(0).toUpperCase() + CURRENT_USER.slice(1) : '';
    document.getElementById('appTitle').textContent = `${displayName}'s Bulgarian!`;
    document.getElementById('headerTitle').innerHTML = '<span class="mascot">🐻</span> <span id="appTitle">' + displayName + "'s Bulgarian!</span>";
    state.currentModule = null;
    updateHomeScreen();
}

function startModule(moduleName) {
    state.currentModule = moduleName;
    document.getElementById('homeScreen').classList.add('hidden');
    document.getElementById('backBtn').classList.remove('hidden');

    if (moduleName === 'alphabet') {
        document.getElementById('alphabetModule').classList.remove('hidden');
        document.getElementById('headerTitle').textContent = '🔤 ABC Letters';
        setupAlphabetQuestion();
    } else if (moduleName === 'vocab') {
        document.getElementById('vocabModule').classList.remove('hidden');
        document.getElementById('headerTitle').textContent = '🎨 Words';
        initVocabModule();
    } else if (moduleName === 'testme') {
        document.getElementById('testMeModule').classList.remove('hidden');
        document.getElementById('headerTitle').textContent = '🎤 Test Me!';
        initTestMeModule();
    }
}

function updateHomeScreen() {
    // Baba Points
    document.getElementById('babaPoints').textContent = state.game.babaPoints;

    // Stars (0-3)
    const stars = calculateStars();
    document.getElementById('star1').textContent = stars >= 1 ? '⭐' : '☆';
    document.getElementById('star2').textContent = stars >= 2 ? '⭐' : '☆';
    document.getElementById('star3').textContent = stars >= 3 ? '⭐' : '☆';

    // Streak
    document.getElementById('currentStreak').textContent = state.game.currentStreak;

    // Daily stars (0-5)
    for (let i = 1; i <= 5; i++) {
        const el = document.getElementById(`dailyStar${i}`);
        if (el) {
            el.textContent = state.game.dailyProgress >= i ? '⭐' : '☆';
            el.classList.toggle('filled', state.game.dailyProgress >= i);
        }
    }

    // Daily text
    const remaining = 5 - state.game.dailyProgress;
    document.getElementById('dailyText').textContent =
        remaining > 0 ? `${remaining} more to fill all stars!` : 'All stars filled! Great job!';

    // Alphabet progress
    document.getElementById('alphabetProgress').innerHTML =
        `<span>${state.alphabet.mastered.length} letters learned!</span>`;

    // Vocab progress
    const mastered = state.vocab.mastered.length;
    const total = state.vocab.words.length;
    const learning = state.vocab.words.filter(w => w.introduced && !state.vocab.mastered.includes(state.vocab.words.indexOf(w))).length;

    document.getElementById('vocabCount').textContent = mastered;

    const subprogress = document.getElementById('vocabSubprogress');
    if (subprogress) {
        if (total === 0) {
            subprogress.textContent = 'Add words to start!';
        } else if (learning > 0) {
            subprogress.textContent = `${learning} learning, ${total - mastered - learning} waiting`;
        } else {
            subprogress.textContent = `${total} total words`;
        }
    }

    // Test Me progress
    const testmeScoreEl = document.getElementById('testmeScore');
    if (testmeScoreEl) {
        testmeScoreEl.textContent = state.testme.correctCount;
    }

    // Mascot greeting
    const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    document.getElementById('mascotGreeting').textContent = greeting;

    // Sticker preview
    updateStickerPreview();

    // TV Time rewards
    updateTvTimeDisplay();
}

function updateTvTimeDisplay() {
    const points = state.game.babaPoints;
    const tvAvailable = state.game.tvMinutesAvailable || 0;

    // Update home screen TV store card
    const tvMinutesEl = document.getElementById('tvMinutesAvailable');
    const tvPointsEl = document.getElementById('tvPointsBalance');

    if (tvMinutesEl) tvMinutesEl.textContent = tvAvailable;
    if (tvPointsEl) tvPointsEl.textContent = points;
}

function calculateStars() {
    if (state.game.babaPoints >= 30) return 3;
    if (state.game.babaPoints >= 15) return 2;
    if (state.game.babaPoints >= 5) return 1;
    return 0;
}

function updateStickerPreview() {
    const container = document.getElementById('stickerPreview');
    container.innerHTML = STICKERS.slice(0, 6).map(s => {
        const earned = state.game.stickers.includes(s.id);
        return `<span class="sticker ${earned ? 'earned' : ''}">${s.icon}</span>`;
    }).join('');
}

// ============ Baba Points ============
function addBabaPoints(amount, reason) {
    state.game.babaPoints += amount;
    showBabaPointsPopup(amount);

    // Check for star level up
    const oldStars = calculateStars();
    saveState();
    const newStars = calculateStars();

    if (newStars > oldStars) {
        showStarLevelUp();
    }

    updateHomeScreen();
}

function showBabaPointsPopup(points) {
    const popup = document.createElement('div');
    popup.className = 'baba-popup';
    popup.innerHTML = `+${points} <img src="baba.png" class="baba-popup-img" alt="Baba">`;
    document.body.appendChild(popup);
    playSound('coin');
    setTimeout(() => popup.remove(), 1500);
}

function showStarLevelUp() {
    document.getElementById('levelUpModal').classList.remove('hidden');
    playSound('levelup');
}

function closeLevelUp() {
    document.getElementById('levelUpModal').classList.add('hidden');
}

function showCelebration(text) {
    const celebration = document.getElementById('correctCelebration');
    celebration.querySelector('.celebration-text').textContent = text;
    celebration.classList.remove('hidden');
    setTimeout(() => celebration.classList.add('hidden'), 800);
}

// ============ Stickers ============
function checkSticker(stickerId) {
    if (state.game.stickers.includes(stickerId)) return;

    state.game.stickers.push(stickerId);
    const sticker = STICKERS.find(s => s.id === stickerId);
    if (sticker) {
        addBabaPoints(sticker.points, 'Sticker!');
        showStickerUnlock(sticker);
    }
    saveState();
}

function showStickerUnlock(sticker) {
    const toast = document.createElement('div');
    toast.className = 'unlock-toast';
    toast.innerHTML = `New Sticker! ${sticker.icon} ${sticker.name}`;
    document.body.appendChild(toast);
    playSound('achievement');
    setTimeout(() => toast.remove(), 2500);
}

// ============ Milestone Celebrations ============
const MILESTONES = [
    { count: 5, title: 'First Steps!', message: 'You learned 5 words! Keep going!' },
    { count: 10, title: 'Double Digits!', message: '10 words! You\'re amazing!' },
    { count: 25, title: 'Word Champion!', message: '25 words! Baba is SO proud!' },
    { count: 50, title: 'Super Learner!', message: '50 words! You\'re incredible!' },
    { count: 75, title: 'Word Wizard!', message: '75 words! Almost to 100!' },
    { count: 100, title: 'LEGENDARY!', message: '100 WORDS! You\'re a Bulgarian star! 🌟' },
];

function checkMilestone(masteredCount) {
    const milestone = MILESTONES.find(m => m.count === masteredCount);
    if (milestone) {
        showMilestone(milestone);
    }
}

function showMilestone(milestone) {
    document.getElementById('milestoneTitle').textContent = milestone.title;
    document.getElementById('milestoneCount').textContent = milestone.count;
    document.getElementById('milestoneMessage').textContent = milestone.message;
    document.getElementById('milestoneModal').classList.remove('hidden');
    playSound('levelup');
    logActivity('milestone_reached', 'vocab', { count: milestone.count, title: milestone.title });
}

function closeMilestone() {
    document.getElementById('milestoneModal').classList.add('hidden');
}

// ============ Streaks ============
function incrementStreak() {
    state.game.currentStreak++;
    if (state.game.currentStreak > state.game.bestStreak) {
        state.game.bestStreak = state.game.currentStreak;
    }
    if (state.game.currentStreak === 5) checkSticker('streak_5');
}

function resetStreak() {
    state.game.currentStreak = 0;
}

function incrementDaily() {
    if (state.game.dailyProgress < 5) {
        state.game.dailyProgress++;
        if (state.game.dailyProgress === 5) {
            checkSticker('daily_star');
        }
    }
}

// ============ Sound Effects ============
function playSound(type) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.value = 0.1;

        if (type === 'correct') {
            osc.frequency.value = 523; // C5
            osc.start();
            osc.frequency.linearRampToValueAtTime(659, ctx.currentTime + 0.1); // E5
            osc.frequency.linearRampToValueAtTime(784, ctx.currentTime + 0.2); // G5
            osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'wrong') {
            osc.frequency.value = 200;
            osc.start();
            osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.2);
            osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'coin') {
            osc.frequency.value = 800;
            osc.start();
            osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.1);
            osc.stop(ctx.currentTime + 0.15);
        } else if (type === 'levelup' || type === 'achievement') {
            osc.frequency.value = 523;
            osc.start();
            osc.frequency.linearRampToValueAtTime(659, ctx.currentTime + 0.1);
            osc.frequency.linearRampToValueAtTime(784, ctx.currentTime + 0.2);
            osc.frequency.linearRampToValueAtTime(1047, ctx.currentTime + 0.3);
            osc.stop(ctx.currentTime + 0.4);
        }
    } catch (e) {}
}

// ============ TTS ============
let hasBulgarianVoice = false;
let voicesLoaded = false;

function checkBulgarianVoice() {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        voicesLoaded = true;
        hasBulgarianVoice = voices.some(v => v.lang.startsWith('bg'));
    }
}

if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = checkBulgarianVoice;
    checkBulgarianVoice();
    // iOS fix: try loading voices after a delay
    setTimeout(checkBulgarianVoice, 100);
    setTimeout(checkBulgarianVoice, 500);
}

function speak(text, lang = 'bg-BG') {
    if (!('speechSynthesis' in window)) {
        alert('Speech not supported');
        return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.6;
    window.speechSynthesis.speak(u);
}

function speakLetterWithHint(letter) {
    const text = letter.soundEn + '. ' + letter.hint;
    speak(text, 'en-US');
}

// ============ Alphabet Module ============
function initSRS(idx) {
    if (!state.alphabet.srs[idx]) {
        state.alphabet.srs[idx] = { box: 0, correct: 0, lastSeen: 0 };
    }
    return state.alphabet.srs[idx];
}

function setupAlphabetQuestion() {
    // Reset UI
    document.getElementById('nextLetterBtn').classList.add('hidden');
    document.getElementById('alphabetChoices').classList.remove('hidden');
    document.getElementById('answerFeedback').classList.add('hidden');
    document.getElementById('letterCardFront').style.display = 'block';

    // Hide admin section until after answer
    const adminSection = document.getElementById('adminRecordSection');
    if (adminSection) adminSection.classList.add('hidden');

    // Simple: Start with first 5 letters, unlock more as mastered
    if (state.alphabet.introduced.length === 0) {
        for (let i = 0; i < 5; i++) {
            state.alphabet.introduced.push(i);
            initSRS(i);
        }
    }

    // Pick a random introduced letter
    const available = state.alphabet.introduced;
    const questionIdx = available[Math.floor(Math.random() * available.length)];
    const letter = ALPHABET[questionIdx];

    // Generate 2 choices
    const choices = [{ idx: questionIdx, phonetic: letter.phonetic, correct: true }];
    const otherIndices = available.filter(i => i !== questionIdx);

    if (otherIndices.length > 0) {
        const wrongIdx = otherIndices[Math.floor(Math.random() * otherIndices.length)];
        choices.push({ idx: wrongIdx, phonetic: ALPHABET[wrongIdx].phonetic, correct: false });
    }

    // Shuffle
    if (Math.random() > 0.5 && choices.length > 1) {
        [choices[0], choices[1]] = [choices[1], choices[0]];
    }

    state.alphabet.currentQuestion = questionIdx;
    state.alphabet.choices = choices;

    // Update UI - only show the letter on front (no picture)
    document.getElementById('alphabetLetter').textContent = letter.letter;

    // Setup feedback display (shown after answer)
    document.getElementById('feedbackSound').textContent = letter.phonetic;
    document.getElementById('feedbackPicture').textContent = letter.picture || '📖';
    document.getElementById('feedbackTranslit').textContent = letter.translit || '';
    document.getElementById('feedbackWord').textContent = letter.word;

    const choicesContainer = document.getElementById('alphabetChoices');
    choicesContainer.innerHTML = choices.map((c, i) => `
        <button class="choice-btn-kids" onclick="selectAlphabetChoice(${i})">${c.phonetic}</button>
    `).join('');

    updateAlphabetProgress();
}

function selectAlphabetChoice(choiceIndex) {
    const choice = state.alphabet.choices[choiceIndex];
    const questionIdx = state.alphabet.currentQuestion;
    const letter = ALPHABET[questionIdx];
    const buttons = document.querySelectorAll('#alphabetChoices .choice-btn-kids');
    const srs = initSRS(questionIdx);
    const feedback = document.getElementById('answerFeedback');

    buttons.forEach(b => b.disabled = true);

    buttons.forEach((btn, i) => {
        if (state.alphabet.choices[i].correct) {
            btn.classList.add('correct');
        } else if (i === choiceIndex && !choice.correct) {
            btn.classList.add('wrong');
        }
    });

    // Setup feedback overlay
    feedback.classList.remove('correct', 'wrong');

    if (choice.correct) {
        srs.correct++;
        playSound('correct');
        feedback.classList.add('correct');
        document.getElementById('feedbackIcon').textContent = '✓';
        document.getElementById('feedbackText').textContent = 'Correct!';
        incrementStreak();
        incrementDaily();
        addBabaPoints(1, 'Correct!');
        logActivity('quiz_correct', 'alphabet', { letter: letter.letter, streak: state.game.currentStreak });

        // Check mastery
        if (srs.correct >= 3 && !state.alphabet.mastered.includes(questionIdx)) {
            state.alphabet.mastered.push(questionIdx);
            addBabaPoints(3, 'Mastered!');
            logActivity('letter_mastered', 'alphabet', { letter: letter.letter });

            // Unlock more letters
            if (state.alphabet.introduced.length < ALPHABET.length) {
                const newIdx = state.alphabet.introduced.length;
                state.alphabet.introduced.push(newIdx);
                initSRS(newIdx);
                showUnlockMessage(`New letter: ${ALPHABET[newIdx].letter}`);
            }

            // Check stickers
            if (state.alphabet.mastered.length === 1) checkSticker('first_try');
            if (state.alphabet.mastered.length >= 5) checkSticker('letter_5');
            if (state.alphabet.mastered.length >= 10) checkSticker('champion');
        }
    } else {
        feedback.classList.add('wrong');
        document.getElementById('feedbackIcon').textContent = '✗';
        document.getElementById('feedbackText').textContent = 'Try again!';
        srs.correct = 0;
        playSound('wrong');
        resetStreak();
        logActivity('quiz_wrong', 'alphabet', { letter: letter.letter });
    }

    srs.lastSeen = Date.now();
    saveState();
    syncUserProfile();

    // Show feedback overlay with picture and auto-play audio
    setTimeout(() => {
        feedback.classList.remove('hidden');
        document.getElementById('alphabetChoices').classList.add('hidden');

        // Auto-play letter audio (uses recorded audio if available, TTS otherwise)
        playLetterAudio(questionIdx, letter);

        // Show next button after delay
        setTimeout(() => {
            document.getElementById('nextLetterBtn').classList.remove('hidden');

            // Show admin section for admin users
            if (isAdmin()) {
                showAdminLetterRecording(questionIdx);
            }
        }, 1000);
    }, 500);
}

function goToNextLetter() {
    setupAlphabetQuestion();
}

function updateAlphabetProgress() {
    const mastered = state.alphabet.mastered.length;
    const introduced = state.alphabet.introduced.length;
    document.getElementById('alphabetMasteredCount').textContent =
        `${mastered} of ${introduced} learned!`;

    const progress = (mastered / 30) * 100;
    document.getElementById('alphabetProgressBar').style.width = `${progress}%`;
    document.getElementById('streakDisplay').textContent = `🔥 ${state.game.currentStreak}`;
}

// ============ Letter Audio (Admin Recording & Playback) ============
let letterAudioCache = {}; // Cache loaded letter audio from database
let adminLetterRecorder = null;
let adminLetterAudioChunks = [];
let adminLetterRecordedBase64 = null;
let adminLetterRecording = false;
let adminLetterStream = null;

// Load all letter audio from database on init
async function loadLetterAudioFromDatabase() {
    if (!db) return;

    try {
        const { data, error } = await db
            .from('letter_audio')
            .select('*');

        if (error) {
            console.error('Error loading letter audio:', error);
            return;
        }

        if (data && data.length > 0) {
            data.forEach(item => {
                letterAudioCache[item.letter_index] = item.audio;
            });
            console.log(`Loaded ${data.length} letter audio recordings`);
        }
    } catch (err) {
        console.error('Letter audio load error:', err);
    }
}

// Play letter audio - uses recorded audio if available, TTS otherwise
async function playLetterAudio(letterIndex, letter) {
    // Check if we have recorded audio in cache
    if (letterAudioCache[letterIndex]) {
        try {
            const audio = new Audio(letterAudioCache[letterIndex]);
            audio.play().catch(err => {
                console.error('Letter audio playback error:', err);
                speakLetterWithHint(letter);
            });
            return;
        } catch (err) {
            console.error('Letter audio error:', err);
        }
    }

    // Fall back to TTS
    speakLetterWithHint(letter);
}

// Show admin letter recording section
function showAdminLetterRecording(letterIndex) {
    const section = document.getElementById('adminRecordSection');
    if (!section) return;

    section.classList.remove('hidden');
    adminLetterRecordedBase64 = null;
    document.getElementById('adminLetterPlayback').classList.add('hidden');

    // Update status based on whether audio exists
    const statusEl = document.getElementById('adminAudioStatus');
    if (letterAudioCache[letterIndex]) {
        statusEl.textContent = '✅ Audio saved in database';
        statusEl.classList.add('has-audio');
        statusEl.classList.remove('error');
    } else {
        statusEl.textContent = 'No audio saved yet';
        statusEl.classList.remove('has-audio', 'error');
    }

    // Reset record button
    const btn = document.getElementById('adminLetterRecordBtn');
    if (btn) {
        btn.classList.remove('recording');
        document.getElementById('adminLetterRecordIcon').textContent = '🎤';
        document.getElementById('adminLetterRecordText').textContent = 'Record Audio';
    }
    document.getElementById('adminLetterRecordingIndicator').classList.add('hidden');
}

// Toggle admin letter recording with visual countdown (no sound to avoid recording it)
async function toggleAdminLetterRecording() {
    const btn = document.getElementById('adminLetterRecordBtn');
    const indicator = document.getElementById('adminLetterRecordingIndicator');
    const playback = document.getElementById('adminLetterPlayback');
    const countdownEl = document.getElementById('adminCountdown');
    const countdownNumber = document.getElementById('countdownNumber');

    if (adminLetterRecording) {
        // Stop recording
        if (adminLetterRecorder && adminLetterRecorder.state === 'recording') {
            adminLetterRecorder.stop();
        }
        adminLetterRecording = false;
        btn.classList.remove('recording');
        document.getElementById('adminLetterRecordIcon').textContent = '🎤';
        document.getElementById('adminLetterRecordText').textContent = 'Record Again';
        indicator.classList.add('hidden');
    } else {
        // Show visual countdown (no sound to avoid recording it)
        btn.disabled = true;
        countdownEl.classList.remove('hidden');

        // Countdown: 3... 2... 1... GO!
        const countdownSequence = ['3', '2', '1', 'GO!'];
        let i = 0;

        const countdownInterval = setInterval(() => {
            countdownNumber.textContent = countdownSequence[i];
            i++;

            if (i >= countdownSequence.length) {
                clearInterval(countdownInterval);
                countdownEl.classList.add('hidden');
                btn.disabled = false;
                // Start actual recording after countdown
                startAdminRecording(btn, indicator, playback);
            }
        }, 800);

        countdownNumber.textContent = countdownSequence[0];
    }
}

// Actually start the admin recording (called after countdown)
async function startAdminRecording(btn, indicator, playback) {
    try {
        adminLetterStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
        adminLetterRecorder = new MediaRecorder(adminLetterStream, { mimeType });
        adminLetterAudioChunks = [];

        adminLetterRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                adminLetterAudioChunks.push(e.data);
            }
        };

        adminLetterRecorder.onstop = () => {
            const blob = new Blob(adminLetterAudioChunks, { type: mimeType });
            const reader = new FileReader();
            reader.onloadend = () => {
                adminLetterRecordedBase64 = reader.result;
                playback.classList.remove('hidden');
            };
            reader.readAsDataURL(blob);

            if (adminLetterStream) {
                adminLetterStream.getTracks().forEach(t => t.stop());
                adminLetterStream = null;
            }
        };

        adminLetterRecorder.start();
        adminLetterRecording = true;
        btn.classList.add('recording');
        document.getElementById('adminLetterRecordIcon').textContent = '⏹️';
        document.getElementById('adminLetterRecordText').textContent = 'Stop Recording';
        indicator.classList.remove('hidden');
        playback.classList.add('hidden');
        // No sound here - would be recorded
    } catch (err) {
        console.error('Admin recording error:', err);
        alert('Could not access microphone');
    }
}

// Play admin letter recording preview
function playAdminLetterRecording() {
    if (adminLetterRecordedBase64) {
        const audio = new Audio(adminLetterRecordedBase64);
        audio.play().catch(err => console.error('Playback error:', err));
    }
}

// Save admin letter audio to database
async function saveAdminLetterAudio() {
    if (!adminLetterRecordedBase64) {
        showUnlockMessage('Record audio first!');
        return;
    }

    if (!db) {
        showUnlockMessage('Database not connected');
        return;
    }

    const letterIndex = state.alphabet.currentQuestion;
    const letter = ALPHABET[letterIndex];
    const statusEl = document.getElementById('adminAudioStatus');

    statusEl.textContent = 'Saving...';
    statusEl.classList.remove('has-audio', 'error');

    try {
        // Check if audio already exists for this letter
        const { data: existing } = await db
            .from('letter_audio')
            .select('id')
            .eq('letter_index', letterIndex)
            .single();

        if (existing) {
            // Update existing record
            const { error } = await db
                .from('letter_audio')
                .update({
                    audio: adminLetterRecordedBase64,
                    recorded_by: CURRENT_USER,
                    updated_at: new Date().toISOString()
                })
                .eq('letter_index', letterIndex);

            if (error) throw error;
        } else {
            // Insert new record
            const { error } = await db
                .from('letter_audio')
                .insert({
                    letter_index: letterIndex,
                    letter: letter.letter,
                    audio: adminLetterRecordedBase64,
                    recorded_by: CURRENT_USER
                });

            if (error) throw error;
        }

        // Update cache
        letterAudioCache[letterIndex] = adminLetterRecordedBase64;

        statusEl.textContent = '✅ Audio saved successfully!';
        statusEl.classList.add('has-audio');
        showUnlockMessage('Letter audio saved!');
        logActivity('letter_audio_saved', 'alphabet', { letter: letter.letter, letterIndex });

    } catch (err) {
        console.error('Error saving letter audio:', err);
        statusEl.textContent = 'Error saving audio';
        statusEl.classList.add('error');
        showUnlockMessage('Error saving audio');
    }
}

// Update speakCurrentLetter to use recorded audio
function speakCurrentLetter() {
    if (state.alphabet.currentQuestion !== null) {
        const letterIndex = state.alphabet.currentQuestion;
        const letter = ALPHABET[letterIndex];
        playLetterAudio(letterIndex, letter);
    }
}

// ============ Vocab Module ============
function initVocabModule() {
    console.log('initVocabModule: words count =', state.vocab.words.length);

    if (state.vocab.words.length < 2) {
        console.log('initVocabModule: showing empty state');
        document.getElementById('vocabEmpty').classList.remove('hidden');
        document.getElementById('vocabCardContainer').classList.add('hidden');
    } else {
        console.log('initVocabModule: showing quiz');
        document.getElementById('vocabEmpty').classList.add('hidden');
        document.getElementById('vocabCardContainer').classList.remove('hidden');

        // On each session start, introduce 1-2 new words if available
        introduceNewWords();

        setupVocabQuestion();
    }
}

function introduceNewWords() {
    // Ensure all words have tracking fields
    state.vocab.words.forEach(w => {
        if (w.introduced === undefined) w.introduced = false;
    });

    const notIntroduced = state.vocab.words.filter(w => !w.introduced);
    const introduced = state.vocab.words.filter(w => w.introduced);

    // Introduce 1-2 new words per session (if we have less than 8 active words)
    const maxActive = 8;
    const toIntroduce = Math.min(2, maxActive - introduced.length, notIntroduced.length);

    for (let i = 0; i < toIntroduce; i++) {
        // Pick a random new word to introduce (not always the same order)
        const randomIdx = Math.floor(Math.random() * notIntroduced.length);
        notIntroduced[randomIdx].introduced = true;
        notIntroduced.splice(randomIdx, 1);
    }

    if (toIntroduce > 0) {
        saveState();
    }
}


function setupVocabQuestion() {
    console.log('setupVocabQuestion: starting with', state.vocab.words.length, 'words');

    if (state.vocab.words.length < 2) {
        console.log('setupVocabQuestion: not enough words, returning');
        return;
    }

    // Ensure all words have tracking fields
    state.vocab.words.forEach(w => {
        if (w.correct === undefined) w.correct = 0;
        if (w.wrong === undefined) w.wrong = 0;
        if (w.lastSeen === undefined) w.lastSeen = 0;
        if (w.introduced === undefined) w.introduced = false;
    });

    // Get introduced words and new words
    let introduced = state.vocab.words.filter(w => w.introduced);
    const notIntroduced = state.vocab.words.filter(w => !w.introduced);

    // Always have at least 5 introduced words (or all if less than 5 total)
    while (introduced.length < 5 && notIntroduced.length > 0) {
        const newWord = notIntroduced.shift();
        newWord.introduced = true;
        introduced.push(newWord);
    }

    // Each session, maybe introduce 1-2 more words (10% chance per question)
    if (notIntroduced.length > 0 && Math.random() < 0.10) {
        const newWord = notIntroduced[0];
        newWord.introduced = true;
        introduced.push(newWord);
    }

    console.log('setupVocabQuestion: introduced count after while loop =', introduced.length);

    if (introduced.length < 2) {
        console.log('setupVocabQuestion: not enough introduced words, returning');
        return;
    }

    // Smart selection with spaced repetition
    // Calculate priority score for each word (higher = needs more practice)
    const scored = introduced.map((word, i) => {
        const originalIdx = state.vocab.words.indexOf(word);
        const correctRate = word.correct / Math.max(1, word.correct + word.wrong);
        const timeSinceLastSeen = Date.now() - (word.lastSeen || 0);
        const hoursSinceLastSeen = timeSinceLastSeen / (1000 * 60 * 60);

        // Priority formula:
        // - Low correct rate = high priority
        // - More wrong answers = high priority
        // - Not seen recently = medium priority
        // - Mastered words = low priority
        let priority = 0;

        if (state.vocab.mastered.includes(originalIdx)) {
            // Mastered: low priority, but still review occasionally
            priority = 1 + Math.min(hoursSinceLastSeen / 24, 5); // Max 6
        } else if (word.correct === 0 && word.wrong === 0) {
            // New word: high priority to learn it
            priority = 50;
        } else if (correctRate < 0.5) {
            // Struggling: highest priority
            priority = 100 + (word.wrong * 10);
        } else if (correctRate < 0.75) {
            // Learning: high priority
            priority = 30 + (word.wrong * 5);
        } else {
            // Doing well: medium priority, affected by time
            priority = 10 + Math.min(hoursSinceLastSeen, 20);
        }

        // Add randomness to prevent exact same order
        priority += Math.random() * 10;

        return { word, originalIdx, priority };
    });

    // Sort by priority (highest first) and pick from top candidates
    scored.sort((a, b) => b.priority - a.priority);

    // Pick from top 5 priority words (weighted random)
    const topCandidates = scored.slice(0, Math.min(5, scored.length));
    const totalPriority = topCandidates.reduce((sum, c) => sum + c.priority, 0);
    let random = Math.random() * totalPriority;

    let selected = topCandidates[0];
    for (const candidate of topCandidates) {
        random -= candidate.priority;
        if (random <= 0) {
            selected = candidate;
            break;
        }
    }

    const word = selected.word;
    const questionIdx = selected.originalIdx;

    // Mark as seen
    word.lastSeen = Date.now();

    // Build choices from OTHER introduced words
    const otherWords = introduced.filter(w => w !== word);
    console.log('setupVocabQuestion: otherWords count =', otherWords.length);

    const choices = [{ idx: questionIdx, meaning: word.meaning, correct: true }];

    if (otherWords.length > 0) {
        const wrongWord = otherWords[Math.floor(Math.random() * otherWords.length)];
        const wrongIdx = state.vocab.words.indexOf(wrongWord);
        choices.push({ idx: wrongIdx, meaning: wrongWord.meaning, correct: false });
    }

    console.log('setupVocabQuestion: choices =', choices.length, choices.map(c => c.meaning));

    // Shuffle choice order
    if (Math.random() > 0.5 && choices.length > 1) {
        [choices[0], choices[1]] = [choices[1], choices[0]];
    }

    state.vocab.currentQuestion = questionIdx;
    state.vocab.choices = choices;

    document.getElementById('vocabCyrillic').textContent = word.cyrillic;
    document.getElementById('vocabTranslit').textContent = word.translit;

    const choicesContainer = document.getElementById('vocabChoices');
    console.log('setupVocabQuestion: populating choices into', choicesContainer);
    choicesContainer.innerHTML = choices.map((c, i) => `
        <button class="choice-btn-kids" onclick="selectVocabChoice(${i})">${c.meaning}</button>
    `).join('');

    updateVocabProgress();
    saveState();
}

function selectVocabChoice(choiceIndex) {
    const choice = state.vocab.choices[choiceIndex];
    const questionIdx = state.vocab.currentQuestion;
    const word = state.vocab.words[questionIdx];
    const buttons = document.querySelectorAll('#vocabChoices .choice-btn-kids');

    buttons.forEach(b => b.disabled = true);

    buttons.forEach((btn, i) => {
        if (state.vocab.choices[i].correct) {
            btn.classList.add('correct');
        } else if (i === choiceIndex && !choice.correct) {
            btn.classList.add('wrong');
        }
    });

    if (choice.correct) {
        word.correct = (word.correct || 0) + 1;
        playSound('correct');
        showCelebration('Bravo! 🌟');
        incrementStreak();
        incrementDaily();
        addBabaPoints(1, 'Correct!');
        logActivity('quiz_correct', 'vocab', { word: word.cyrillic, meaning: word.meaning, streak: state.game.currentStreak });

        // Mastery requires 3 correct AND good accuracy (>60%)
        const accuracy = word.correct / Math.max(1, word.correct + (word.wrong || 0));
        if (word.correct >= 3 && accuracy >= 0.6 && !state.vocab.mastered.includes(questionIdx)) {
            state.vocab.mastered.push(questionIdx);
            addBabaPoints(3, 'Word mastered!');
            logActivity('word_mastered', 'vocab', { word: word.cyrillic, meaning: word.meaning });

            // Check for stickers and milestones
            const masteredCount = state.vocab.mastered.length;
            if (masteredCount >= 5) checkSticker('word_5');
            checkMilestone(masteredCount);
        }
    } else {
        word.wrong = (word.wrong || 0) + 1;
        playSound('wrong');
        resetStreak();
        logActivity('quiz_wrong', 'vocab', { word: word.cyrillic, meaning: word.meaning });

        // If they get a mastered word wrong, remove mastery
        const masteredIdx = state.vocab.mastered.indexOf(questionIdx);
        if (masteredIdx !== -1) {
            state.vocab.mastered.splice(masteredIdx, 1);
        }
    }

    saveState();
    syncUserProfile(); // Sync to cloud
    setTimeout(() => setupVocabQuestion(), 1200);
}

function updateVocabProgress() {
    const mastered = state.vocab.mastered.length;
    const total = state.vocab.words.length;
    document.getElementById('vocabMasteredCount').textContent = `${mastered} of ${total} learned!`;

    const progress = total > 0 ? (mastered / total) * 100 : 0;
    document.getElementById('vocabProgressBar').style.width = `${progress}%`;
    document.getElementById('vocabStreakDisplay').textContent = `🔥 ${state.game.currentStreak}`;
}

// ============ Test Me Module ============
// Uses same recording pattern as Add Word (proven to work on mobile)
let testMeRecorder = null;
let testMeAudioChunks = [];
let testMeRecordedBase64 = null;
let testMeMicStream = null;
let testMeIsRecording = false;

function initTestMeModule() {
    // Check if we have enough words
    if (state.vocab.words.length < 3) {
        document.getElementById('testmeEmpty').classList.remove('hidden');
        document.getElementById('testmeCardContainer').classList.add('hidden');
        return;
    }

    document.getElementById('testmeEmpty').classList.add('hidden');
    document.getElementById('testmeCardContainer').classList.remove('hidden');

    setupTestMeQuestion();
    updateTestMeProgress();
}

function setupTestMeQuestion() {
    // Reset UI
    document.getElementById('testmeAnswerSection').classList.add('hidden');
    document.getElementById('testmeNextBtn').classList.add('hidden');
    document.getElementById('testmeRecordBtn').classList.remove('recording', 'correct', 'wrong');
    document.getElementById('testmeRecordIcon').textContent = '🎤';
    document.getElementById('testmeRecordText').textContent = 'Tap & Speak';
    document.getElementById('testmeRecordingIndicator').classList.add('hidden');

    // Reset recording
    testMeRecordedBase64 = null;
    testMeIsRecording = false;
    const playbackEl = document.getElementById('testmeAudioPlayback');
    if (playbackEl) playbackEl.classList.add('hidden');

    // Hide self-check until recording done
    const selfCheck = document.querySelector('.testme-self-check');
    if (selfCheck) selfCheck.classList.add('hidden');

    // Pick a random word
    const availableWords = state.vocab.words.filter(w => w.meaning && w.cyrillic);
    if (availableWords.length === 0) {
        document.getElementById('testmeEmpty').classList.remove('hidden');
        document.getElementById('testmeCardContainer').classList.add('hidden');
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    state.testme.currentWord = availableWords[randomIndex];

    document.getElementById('testmeEnglish').textContent = state.testme.currentWord.meaning;
}

async function toggleTestMeRecording() {
    if (testMeIsRecording) {
        // Stop recording
        if (testMeRecorder && testMeRecorder.state === 'recording') {
            testMeRecorder.stop();
        }
        testMeIsRecording = false;

        const recordBtn = document.getElementById('testmeRecordBtn');
        recordBtn.classList.remove('recording');
        document.getElementById('testmeRecordIcon').textContent = '🎤';
        document.getElementById('testmeRecordText').textContent = 'Tap & Speak';
        document.getElementById('testmeRecordingIndicator').classList.add('hidden');
    } else {
        // Start recording - same pattern as Add Word
        try {
            testMeMicStream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Use supported MIME type (iOS needs mp4, others use webm)
            const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
            testMeRecorder = new MediaRecorder(testMeMicStream, { mimeType });
            testMeAudioChunks = [];

            testMeRecorder.ondataavailable = (event) => {
                testMeAudioChunks.push(event.data);
            };

            testMeRecorder.onstop = () => {
                const blobMimeType = testMeRecorder.mimeType || 'audio/mp4';
                const blob = new Blob(testMeAudioChunks, { type: blobMimeType });

                // Convert to base64 for playback
                const reader = new FileReader();
                reader.onloadend = () => {
                    testMeRecordedBase64 = reader.result;

                    // Show playback button
                    const playbackEl = document.getElementById('testmeAudioPlayback');
                    if (playbackEl) playbackEl.classList.remove('hidden');

                    // Show answer and self-check
                    revealTestMeAnswer();
                };
                reader.readAsDataURL(blob);

                // Stop mic
                if (testMeMicStream) {
                    testMeMicStream.getTracks().forEach(track => track.stop());
                    testMeMicStream = null;
                }
            };

            testMeRecorder.start();
            testMeIsRecording = true;

            const recordBtn = document.getElementById('testmeRecordBtn');
            recordBtn.classList.add('recording');
            document.getElementById('testmeRecordIcon').textContent = '⏹️';
            document.getElementById('testmeRecordText').textContent = 'Tap to Stop';
            document.getElementById('testmeRecordingIndicator').classList.remove('hidden');

            playSound('coin');

        } catch (err) {
            console.error('Mic error:', err);
            showUnlockMessage('Could not access microphone');
        }
    }
}

function playTestMeRecording() {
    if (testMeRecordedBase64) {
        const audio = new Audio(testMeRecordedBase64);
        audio.play().catch(err => console.error('Playback error:', err));
    }
}

function revealTestMeAnswer() {
    const word = state.testme.currentWord;
    if (!word) return;

    document.getElementById('testmeCorrectCyrillic').textContent = word.cyrillic;
    document.getElementById('testmeCorrectTranslit').textContent = word.translit;
    document.getElementById('testmeAnswerSection').classList.remove('hidden');

    // Show self-check buttons
    const selfCheck = document.querySelector('.testme-self-check');
    if (selfCheck) selfCheck.classList.remove('hidden');
}

function playCorrectAnswer() {
    const word = state.testme.currentWord;
    if (!word) return;

    if (word.audio) {
        const audio = new Audio(word.audio);
        audio.play().catch(err => console.error('Audio error:', err));
    } else {
        speak(word.cyrillic);
    }
}

function testMeCorrect() {
    // User got it right - award points!
    state.testme.correctCount++;
    state.testme.totalAttempts++;

    const recordBtn = document.getElementById('testmeRecordBtn');
    recordBtn.classList.add('correct');

    playSound('correct');
    showCelebration('Bravo! 🎉');
    addBabaPoints(2, 'Correct translation!');
    incrementStreak();
    incrementDaily();
    saveState();
    syncUserProfile();
    logActivity('quiz_correct', 'testme', { word: state.testme.currentWord?.cyrillic, streak: state.game.currentStreak });

    // Hide self-check, show next button
    const selfCheck = document.querySelector('.testme-self-check');
    if (selfCheck) selfCheck.classList.add('hidden');
    document.getElementById('testmeNextBtn').classList.remove('hidden');

    updateTestMeProgress();
}

function testMePractice() {
    // User needs more practice
    state.testme.totalAttempts++;

    const recordBtn = document.getElementById('testmeRecordBtn');
    recordBtn.classList.add('wrong');

    playSound('wrong');
    resetStreak();
    saveState();
    syncUserProfile();
    logActivity('quiz_wrong', 'testme', { word: state.testme.currentWord?.cyrillic });

    // Hide self-check, show next button
    const selfCheck = document.querySelector('.testme-self-check');
    if (selfCheck) selfCheck.classList.add('hidden');
    document.getElementById('testmeNextBtn').classList.remove('hidden');

    updateTestMeProgress();
}

function nextTestMeQuestion() {
    // Reset self-check visibility
    document.querySelector('.testme-self-check').classList.remove('hidden');

    setupTestMeQuestion();
    updateTestMeProgress();
}

function updateTestMeProgress() {
    const correct = state.testme.correctCount;
    const total = state.testme.totalAttempts;
    const progress = total > 0 ? (correct / Math.max(total, 10)) * 100 : 0;

    document.getElementById('testmeProgressBar').style.width = `${Math.min(progress, 100)}%`;
    document.getElementById('testmeMasteredCount').textContent = `${correct} correct!`;
    document.getElementById('testmeStreakDisplay').textContent = `🔥 ${state.game.currentStreak}`;
    document.getElementById('testmeScore').textContent = correct;
}

// ============ UI Helpers ============
function showUnlockMessage(msg) {
    const toast = document.createElement('div');
    toast.className = 'unlock-toast';
    toast.textContent = `🔓 ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

// ============ Settings ============
function openSettings() {
    document.getElementById('settingsCurrentUser').textContent = CURRENT_USER;
    document.getElementById('settingsModal').classList.remove('hidden');
}

function closeSettings() {
    document.getElementById('settingsModal').classList.add('hidden');
}

function openAchievements() {
    const list = document.getElementById('achievementsList');
    list.innerHTML = STICKERS.map(s => {
        const earned = state.game.stickers.includes(s.id);
        return `
            <div class="sticker-item ${earned ? '' : 'locked'}">
                <span class="sticker-icon">${s.icon}</span>
                <span class="sticker-name">${s.name}</span>
            </div>
        `;
    }).join('');
    document.getElementById('achievementsModal').classList.remove('hidden');
}

function closeAchievements() {
    document.getElementById('achievementsModal').classList.add('hidden');
}

function openRewardChart() {
    const points = state.game.babaPoints;
    const tvMinutes = calculateTvMinutes(points);

    document.getElementById('rewardTvMinutes').textContent = tvMinutes;
    document.getElementById('rewardBabaPoints').textContent = points;

    // Highlight achieved rows
    TV_REWARDS.forEach((reward, i) => {
        const row = document.getElementById(`row${reward.points}`);
        if (row) {
            row.classList.remove('achieved');
            if (points >= reward.points) {
                row.classList.add('achieved');
            }
        }
    });

    // Show next goal
    const nextGoal = getNextTvGoal(points);
    const nextGoalEl = document.getElementById('rewardNextGoal');
    if (nextGoal) {
        const needed = nextGoal.points - points;
        nextGoalEl.textContent = `${needed} more points for ${nextGoal.label}!`;
    } else {
        nextGoalEl.textContent = "🎉 You've unlocked all rewards! Amazing!";
    }

    document.getElementById('rewardChartModal').classList.remove('hidden');
}

function closeRewardChart() {
    document.getElementById('rewardChartModal').classList.add('hidden');
}

// ============ TV Store ============
function openTvStore() {
    updateTvStoreDisplay();
    document.getElementById('tvStoreModal').classList.remove('hidden');
}

function closeTvStore() {
    document.getElementById('tvStoreModal').classList.add('hidden');
}

function updateTvStoreDisplay() {
    const points = state.game.babaPoints;
    const tvAvailable = state.game.tvMinutesAvailable || 0;

    document.getElementById('storePointsBalance').textContent = points;
    document.getElementById('storeTvBalance').textContent = tvAvailable;

    // Update buy button states
    const items = [
        { id: 'buy50', cost: 50 },
        { id: 'buy100', cost: 100 },
        { id: 'buy200', cost: 200 }
    ];

    items.forEach(item => {
        const btn = document.getElementById(item.id);
        if (btn) {
            if (points >= item.cost) {
                btn.disabled = false;
                btn.textContent = 'Buy';
                btn.classList.remove('disabled');
            } else {
                btn.disabled = true;
                btn.textContent = `Need ${item.cost - points} more`;
                btn.classList.add('disabled');
            }
        }
    });

    // Show/hide redeem section
    const redeemSection = document.getElementById('redeemSection');
    if (redeemSection) {
        if (tvAvailable > 0) {
            redeemSection.classList.remove('hidden');
        } else {
            redeemSection.classList.add('hidden');
        }
    }
}

function buyTvTime(cost, minutes) {
    if (state.game.babaPoints < cost) {
        showUnlockMessage(`Need ${cost - state.game.babaPoints} more points!`);
        return;
    }

    // Deduct points and add TV time
    state.game.babaPoints -= cost;
    state.game.tvMinutesAvailable = (state.game.tvMinutesAvailable || 0) + minutes;

    // Record purchase
    const purchase = {
        timestamp: Date.now(),
        cost: cost,
        minutes: minutes
    };
    if (!state.game.tvPurchases) state.game.tvPurchases = [];
    state.game.tvPurchases.push(purchase);

    saveState();
    syncUserProfile();
    logActivity('tv_purchase', 'store', { cost, minutes });

    // Show celebration
    playSound('levelup');
    showUnlockMessage(`🎉 Bought ${minutes} min TV time!`);

    // Update displays
    updateTvStoreDisplay();
    updateHomeScreen();
}

function redeemTvTime() {
    const minutes = state.game.tvMinutesAvailable || 0;
    if (minutes <= 0) {
        showUnlockMessage('No TV time to use!');
        return;
    }

    // Show voucher to parent
    document.getElementById('voucherMinutes').textContent = minutes;
    document.getElementById('voucherUser').textContent = CURRENT_USER === 'default' ? 'Your child' : CURRENT_USER;
    document.getElementById('voucherTime').textContent = new Date().toLocaleString();
    document.getElementById('tvVoucherModal').classList.remove('hidden');

    playSound('achievement');
    logActivity('tv_redeem_shown', 'store', { minutes });
}

function closeVoucher() {
    // Clear the TV time (it's been approved)
    const minutes = state.game.tvMinutesAvailable || 0;
    state.game.tvMinutesAvailable = 0;
    saveState();
    syncUserProfile();
    logActivity('tv_redeemed', 'store', { minutes });

    document.getElementById('tvVoucherModal').classList.add('hidden');
    closeTvStore();
    updateHomeScreen();
    showUnlockMessage('Enjoy your TV time! 📺');
}

function resetProgress() {
    if (confirm('Start over? All progress will be lost!')) {
        localStorage.removeItem('bulgarianKids');
        location.reload();
    }
}

// Modal backdrop clicks
document.getElementById('settingsModal')?.addEventListener('click', e => {
    if (e.target.id === 'settingsModal') closeSettings();
});
document.getElementById('achievementsModal')?.addEventListener('click', e => {
    if (e.target.id === 'achievementsModal') closeAchievements();
});
document.getElementById('levelUpModal')?.addEventListener('click', e => {
    if (e.target.id === 'levelUpModal') closeLevelUp();
});
document.getElementById('rewardChartModal')?.addEventListener('click', e => {
    if (e.target.id === 'rewardChartModal') closeRewardChart();
});

// ============ Add New Word with Audio Recording ============
let mediaRecorder = null;
let audioChunks = [];
let recordedAudioBlob = null;
let recordedAudioBase64 = null;

function openAddWord() {
    document.getElementById('addWordModal').classList.remove('hidden');
    resetAddWordForm();
}

function closeAddWord() {
    document.getElementById('addWordModal').classList.add('hidden');
    stopRecordingCleanup();
    resetAddWordForm();
}

function resetAddWordForm() {
    document.getElementById('newWordCyrillic').value = '';
    document.getElementById('newWordTranslit').value = '';
    document.getElementById('newWordMeaning').value = '';
    recordedAudioBlob = null;
    recordedAudioBase64 = null;
    document.getElementById('audioPlayback').classList.add('hidden');
    document.getElementById('recordingIndicator').classList.add('hidden');
    const recordBtn = document.getElementById('recordBtn');
    recordBtn.classList.remove('recording');
    document.getElementById('recordIcon').textContent = '🎤';
    document.getElementById('recordText').textContent = 'Tap to Record';
}

let isCountingDown = false;
let countdownTimeout = null;
let micStream = null;

async function toggleRecording() {
    const recordBtn = document.getElementById('recordBtn');

    if (mediaRecorder && mediaRecorder.state === 'recording') {
        // Stop recording
        mediaRecorder.stop();
        recordBtn.classList.remove('recording');
        document.getElementById('recordIcon').textContent = '🎤';
        document.getElementById('recordText').textContent = 'Tap to Record';
        document.getElementById('recordingIndicator').classList.add('hidden');
    } else if (isCountingDown) {
        // Cancel countdown
        clearTimeout(countdownTimeout);
        isCountingDown = false;
        if (micStream) {
            micStream.getTracks().forEach(track => track.stop());
            micStream = null;
        }
        document.getElementById('recordIcon').textContent = '🎤';
        document.getElementById('recordText').textContent = 'Tap to Record';
    } else {
        // Request permission FIRST, before countdown
        document.getElementById('recordIcon').textContent = '...';
        document.getElementById('recordText').textContent = 'Requesting mic...';
        document.getElementById('audioPlayback').classList.add('hidden');

        try {
            micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // Permission granted, now start countdown
            isCountingDown = true;
            await doCountdown();
        } catch (err) {
            alert('Could not access microphone. Please allow microphone access.');
            console.error('Microphone error:', err);
            document.getElementById('recordIcon').textContent = '🎤';
            document.getElementById('recordText').textContent = 'Tap to Record';
        }
    }
}

async function doCountdown() {
    const recordBtn = document.getElementById('recordBtn');

    for (let i = 3; i >= 1; i--) {
        if (!isCountingDown) return; // cancelled
        document.getElementById('recordIcon').textContent = i;
        document.getElementById('recordText').textContent = 'Get ready...';
        playCountdownBeep();
        await new Promise(resolve => {
            countdownTimeout = setTimeout(resolve, 800);
        });
    }

    if (!isCountingDown) return; // cancelled

    // Show GO! briefly (no sound - it would get recorded)
    document.getElementById('recordIcon').textContent = 'GO!';
    document.getElementById('recordText').textContent = 'Speak now!';
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!isCountingDown) return; // cancelled
    isCountingDown = false;

    // Now start recording with already-granted stream
    try {
        // Use supported MIME type (iOS needs mp4, others use webm)
        const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
        mediaRecorder = new MediaRecorder(micStream, { mimeType });
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            recordedAudioBlob = new Blob(audioChunks, { type: mimeType });

            // Convert to base64 for storage
            const reader = new FileReader();
            reader.onloadend = () => {
                recordedAudioBase64 = reader.result;
                document.getElementById('audioPlayback').classList.remove('hidden');
                console.log('Audio recorded, base64 length:', recordedAudioBase64.length);
            };
            reader.readAsDataURL(recordedAudioBlob);

            // Stop all tracks
            micStream.getTracks().forEach(track => track.stop());
            micStream = null;
        };

        mediaRecorder.start();
        recordBtn.classList.add('recording');
        document.getElementById('recordIcon').textContent = '⏹️';
        document.getElementById('recordText').textContent = 'Tap to Stop';
        document.getElementById('recordingIndicator').classList.remove('hidden');

    } catch (err) {
        console.error('Recording error:', err);
        alert('Recording error: ' + err.message);
        if (micStream) {
            micStream.getTracks().forEach(track => track.stop());
            micStream = null;
        }
    }
}

function playCountdownBeep() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.value = 0.15;
        osc.frequency.value = 440;
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
}

function stopRecordingCleanup() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
    if (micStream) {
        micStream.getTracks().forEach(track => track.stop());
        micStream = null;
    }
    mediaRecorder = null;
    audioChunks = [];
    isCountingDown = false;
    clearTimeout(countdownTimeout);
}

function playRecordedAudio() {
    // Use base64 data URL for better mobile compatibility
    if (recordedAudioBase64) {
        try {
            const audio = new Audio(recordedAudioBase64);
            audio.play().catch(err => console.error('Audio play error:', err));
        } catch (err) {
            console.error('Audio error:', err);
        }
    } else if (recordedAudioBlob) {
        try {
            const audio = new Audio(URL.createObjectURL(recordedAudioBlob));
            audio.play().catch(err => console.error('Audio play error:', err));
        } catch (err) {
            console.error('Audio error:', err);
        }
    }
}

function deleteRecording() {
    recordedAudioBlob = null;
    recordedAudioBase64 = null;
    document.getElementById('audioPlayback').classList.add('hidden');
}

async function saveNewWord() {
    const cyrillic = document.getElementById('newWordCyrillic').value.trim();
    const translit = document.getElementById('newWordTranslit').value.trim();
    const meaning = document.getElementById('newWordMeaning').value.trim();

    if (!cyrillic || !translit || !meaning) {
        alert('Please fill in all fields!');
        return;
    }

    // Check for duplicates
    const exists = state.vocab.words.some(w => w.cyrillic === cyrillic);
    if (exists) {
        alert('This word already exists!');
        return;
    }

    const newWord = {
        id: Date.now(),
        cyrillic,
        translit,
        meaning,
        category: 'custom',
        correct: 0,
        audio: recordedAudioBase64 || null,
        isCustom: true
    };

    state.vocab.words.push(newWord);
    saveState();

    // Save to database
    await saveWordToDatabase(newWord);
    logActivity('word_added', 'vocab', { word: cyrillic, meaning: meaning, hasAudio: !!recordedAudioBase64 });
    syncUserProfile();

    closeAddWord();
    showUnlockMessage(`Added "${cyrillic}"!`);
    addBabaPoints(1, 'New word added!');
    updateHomeScreen();
}

// Override speak function for custom words with audio
function speakCurrentWord() {
    if (state.vocab.currentQuestion === null) return;

    const word = state.vocab.words[state.vocab.currentQuestion];
    if (word.audio) {
        const audio = new Audio(word.audio);
        audio.play();
    } else {
        // Use English transliteration since iOS doesn't have Bulgarian voices
        speak(word.translit, 'en-US');
    }
}

// Add modal close handlers
document.getElementById('addWordModal')?.addEventListener('click', e => {
    if (e.target.id === 'addWordModal') closeAddWord();
});
document.getElementById('adminModal')?.addEventListener('click', e => {
    if (e.target.id === 'adminModal') closeAdmin();
});
document.getElementById('editWordModal')?.addEventListener('click', e => {
    if (e.target.id === 'editWordModal') closeEditWord();
});

// ============ Transliteration to Cyrillic ============
const TRANSLIT_MAP = {
    'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д', 'e': 'е',
    'zh': 'ж', 'z': 'з', 'i': 'и', 'y': 'й', 'k': 'к', 'l': 'л',
    'm': 'м', 'n': 'н', 'o': 'о', 'p': 'п', 'r': 'р', 's': 'с',
    't': 'т', 'u': 'у', 'f': 'ф', 'h': 'х', 'ts': 'ц', 'ch': 'ч',
    'sh': 'ш', 'sht': 'щ', 'yu': 'ю', 'ya': 'я', 'yo': 'ьо',
    'j': 'дж', 'x': 'кс', 'w': 'в', 'q': 'к'
};

function translitToCyrillic(text) {
    let result = '';
    let i = 0;
    text = text.toLowerCase();

    while (i < text.length) {
        // Check for 3-letter combinations first
        if (i + 2 < text.length && TRANSLIT_MAP[text.substring(i, i + 3)]) {
            result += TRANSLIT_MAP[text.substring(i, i + 3)];
            i += 3;
        }
        // Then 2-letter combinations
        else if (i + 1 < text.length && TRANSLIT_MAP[text.substring(i, i + 2)]) {
            result += TRANSLIT_MAP[text.substring(i, i + 2)];
            i += 2;
        }
        // Then single letters
        else if (TRANSLIT_MAP[text[i]]) {
            result += TRANSLIT_MAP[text[i]];
            i++;
        }
        // Keep spaces and other characters
        else {
            result += text[i];
            i++;
        }
    }
    return result;
}

function autoConvertNewWord() {
    const translit = document.getElementById('newWordTranslit').value;
    document.getElementById('newWordCyrillic').value = translitToCyrillic(translit);
}

function autoConvertToCyrillic() {
    const translit = document.getElementById('editWordTranslit').value;
    document.getElementById('editWordCyrillic').value = translitToCyrillic(translit);
}

// ============ Admin Section ============
let editingWordId = null;
let editingWordAudio = null;

function openAdmin() {
    renderWordsList();
    document.getElementById('adminModal').classList.remove('hidden');
}

function closeAdmin() {
    document.getElementById('adminModal').classList.add('hidden');
}

function renderWordsList() {
    const container = document.getElementById('wordsList');
    const noWordsMsg = document.getElementById('noWordsMsg');

    if (state.vocab.words.length === 0) {
        container.innerHTML = '';
        noWordsMsg.classList.remove('hidden');
        return;
    }

    noWordsMsg.classList.add('hidden');
    container.innerHTML = state.vocab.words.map(word => `
        <div class="word-item-admin" onclick="editWord(${word.id})">
            <div class="word-item-info">
                <div class="word-item-cyrillic">${word.cyrillic}</div>
                <div class="word-item-translit">${word.translit}</div>
                <div class="word-item-meaning">${word.meaning}</div>
            </div>
            <div class="word-item-audio">${word.audio ? '🔊' : '🔇'}</div>
        </div>
    `).join('');
}

function editWord(wordId) {
    const word = state.vocab.words.find(w => w.id === wordId);
    if (!word) return;

    editingWordId = wordId;
    editingWordAudio = word.audio;

    document.getElementById('editWordId').value = wordId;
    document.getElementById('editWordCyrillic').value = word.cyrillic;
    document.getElementById('editWordTranslit').value = word.translit;
    document.getElementById('editWordMeaning').value = word.meaning;

    const audioStatus = document.getElementById('editAudioStatus');
    const playBtn = document.getElementById('playEditAudioBtn');

    if (word.audio) {
        audioStatus.textContent = '✅ Has audio recording';
        audioStatus.classList.add('has-audio');
        playBtn.style.display = 'block';
    } else {
        audioStatus.textContent = 'No audio recording';
        audioStatus.classList.remove('has-audio');
        playBtn.style.display = 'none';
    }

    document.getElementById('editWordModal').classList.remove('hidden');
}

function closeEditWord() {
    document.getElementById('editWordModal').classList.add('hidden');
    editingWordId = null;
    editingWordAudio = null;
}

function playEditAudio() {
    if (editingWordAudio) {
        const audio = new Audio(editingWordAudio);
        audio.play();
    }
}

function reRecordAudio() {
    closeEditWord();
    closeAdmin();
    openAddWord();
    // Pre-fill with existing word data
    const word = state.vocab.words.find(w => w.id === editingWordId);
    if (word) {
        document.getElementById('newWordCyrillic').value = word.cyrillic;
        document.getElementById('newWordTranslit').value = word.translit;
        document.getElementById('newWordMeaning').value = word.meaning;
    }
}

async function saveEditedWord() {
    const wordId = editingWordId;
    const cyrillic = document.getElementById('editWordCyrillic').value.trim();
    const translit = document.getElementById('editWordTranslit').value.trim();
    const meaning = document.getElementById('editWordMeaning').value.trim();

    if (!cyrillic || !translit || !meaning) {
        alert('Please fill in all fields!');
        return;
    }

    // Update local state
    const wordIndex = state.vocab.words.findIndex(w => w.id === wordId);
    if (wordIndex === -1) return;

    state.vocab.words[wordIndex] = {
        ...state.vocab.words[wordIndex],
        cyrillic,
        translit,
        meaning
    };

    saveState();

    // Update database
    if (db) {
        try {
            const { error } = await db
                .from('words')
                .update({
                    cyrillic,
                    translit,
                    meaning
                })
                .eq('id', wordId)
                .eq('user_id', CURRENT_USER);

            if (error) {
                console.error('Error updating word:', error);
                alert('Error saving: ' + error.message);
            }
        } catch (err) {
            console.error('Database error:', err);
        }
    }

    closeEditWord();
    renderWordsList();
    updateHomeScreen();
    showUnlockMessage('Word updated!');
}

async function deleteWord() {
    if (!confirm('Delete this word?')) return;

    const wordId = editingWordId;

    // Remove from local state
    state.vocab.words = state.vocab.words.filter(w => w.id !== wordId);
    state.vocab.mastered = state.vocab.mastered.filter(id => id !== wordId);
    saveState();

    // Remove from database
    await deleteWordFromDatabase(wordId);

    closeEditWord();
    renderWordsList();
    updateHomeScreen();
    showUnlockMessage('Word deleted');
}

// ============ Database Functions (Supabase) ============
async function loadWordsFromDatabase() {
    // If no database, leave words array empty - user must add words manually
    if (!db) {
        console.log('No database connection - words must be added manually');
        return;
    }

    try {
        const { data, error } = await db
            .from('words')
            .select('*')
            .eq('user_id', CURRENT_USER)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error loading words:', error);
            // Leave words empty on error - user can add words manually
            return;
        }

        if (data && data.length > 0) {
            const dbWords = data.map(w => ({
                id: w.id,
                cyrillic: w.cyrillic,
                translit: w.translit,
                meaning: w.meaning,
                category: w.category || 'custom',
                level: w.level || 1, // Words 1 or Words 2
                correct: 0,
                audio: w.audio,
                isCustom: true
            }));

            state.vocab.words = dbWords;
            saveState();
            updateHomeScreen();
        } else {
            // No words for this user - try to copy from 'default' user (who added words manually)
            await copyStarterWords();
        }
    } catch (err) {
        console.error('Database error:', err);
        // Leave words empty on error - user can add words manually
    }
}

// Copy starter words from 'default' user to current user
// Only copies words that were manually added by someone to the 'default' user
async function copyStarterWords() {
    // Can't copy if no database or if we're the default user
    if (!db || CURRENT_USER === 'default') {
        console.log('No words to copy - user must add words manually');
        return;
    }

    try {
        console.log('Checking for starter words to copy for new user:', CURRENT_USER);

        // Get default words (these should only exist if someone manually added them)
        const { data: defaultWords, error } = await db
            .from('words')
            .select('*')
            .eq('user_id', 'default')
            .order('created_at', { ascending: true });

        if (error || !defaultWords || defaultWords.length === 0) {
            console.log('No default words to copy - user must add words manually');
            return;
        }

        // Copy each word with new ID for this user
        const copiedWords = [];
        for (let i = 0; i < defaultWords.length; i++) {
            const w = defaultWords[i];
            const newId = Date.now() + i;

            const newWord = {
                id: newId,
                user_id: CURRENT_USER,
                cyrillic: w.cyrillic,
                translit: w.translit,
                meaning: w.meaning,
                category: w.category || 'custom',
                level: w.level || 1,
                audio: w.audio
            };

            const { error: insertError } = await db.from('words').insert(newWord);
            if (!insertError) {
                copiedWords.push({
                    id: newId,
                    cyrillic: w.cyrillic,
                    translit: w.translit,
                    meaning: w.meaning,
                    category: w.category || 'custom',
                    level: w.level || 1,
                    correct: 0,
                    audio: w.audio,
                    isCustom: false
                });
            }

            // Small delay to ensure unique IDs
            await new Promise(r => setTimeout(r, 10));
        }

        if (copiedWords.length > 0) {
            state.vocab.words = copiedWords;
            saveState();
            updateHomeScreen();
            console.log(`Copied ${copiedWords.length} starter words`);
            showUnlockMessage(`Welcome! ${copiedWords.length} words ready to learn!`);
        }
        // If no words were copied, that's fine - user can add words manually
    } catch (err) {
        console.error('Error copying starter words:', err);
        // Leave words empty - user can add words manually
    }
}

async function saveWordToDatabase(word) {
    if (!db) return;

    try {
        const { error } = await db
            .from('words')
            .insert({
                id: word.id,
                user_id: CURRENT_USER,
                cyrillic: word.cyrillic,
                translit: word.translit,
                meaning: word.meaning,
                category: word.category || 'custom',
                audio: word.audio
            });

        if (error) {
            console.error('Error saving word:', error);
        }
    } catch (err) {
        console.error('Database error:', err);
    }
}

async function deleteWordFromDatabase(wordId) {
    if (!db) return;

    try {
        const { error } = await db
            .from('words')
            .delete()
            .eq('id', wordId)
            .eq('user_id', CURRENT_USER);

        if (error) {
            console.error('Error deleting word:', error);
        }
    } catch (err) {
        console.error('Database error:', err);
    }
}

// ============ User Profile & Activity Tracking ============

// Sync user profile to Supabase
async function syncUserProfile() {
    if (!db) return;

    try {
        const profileData = {
            user_id: CURRENT_USER,
            last_active: new Date().toISOString(),
            baba_points: state.game.babaPoints,
            current_streak: state.game.currentStreak,
            best_streak: state.game.bestStreak,
            daily_progress: state.game.dailyProgress,
            last_play_date: state.game.lastPlayDate,
            stickers: state.game.stickers,
            alphabet_mastered: state.alphabet.mastered.length,
            alphabet_introduced: state.alphabet.introduced.length,
            vocab_mastered: state.vocab.mastered.length,
            testme_correct: state.testme.correctCount,
            testme_total: state.testme.totalAttempts
        };

        const { error } = await db
            .from('users')
            .upsert(profileData, { onConflict: 'user_id' });

        if (error) {
            console.error('Error syncing profile:', error);
        }
    } catch (err) {
        console.error('Profile sync error:', err);
    }
}

// Load user profile from Supabase
async function loadUserProfile() {
    if (!db) return false;

    try {
        const { data, error } = await db
            .from('users')
            .select('*')
            .eq('user_id', CURRENT_USER)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = not found
            console.error('Error loading profile:', error);
            return false;
        }

        if (data) {
            // Merge cloud data with local state
            state.game.babaPoints = data.baba_points || state.game.babaPoints;
            state.game.bestStreak = Math.max(data.best_streak || 0, state.game.bestStreak);
            state.game.stickers = data.stickers || state.game.stickers;
            saveState();
            return true;
        }
        return false;
    } catch (err) {
        console.error('Profile load error:', err);
        return false;
    }
}

// Log activity event
async function logActivity(event, module = null, metadata = {}) {
    if (!db) return;

    try {
        const { error } = await db
            .from('activity')
            .insert({
                user_id: CURRENT_USER,
                event: event,
                module: module,
                metadata: metadata
            });

        if (error) {
            console.error('Error logging activity:', error);
        }
    } catch (err) {
        console.error('Activity log error:', err);
    }
}

// Migrate profile from one user to another
async function migrateProfile(fromUser, toUser) {
    if (!db) {
        alert('Database not connected');
        return false;
    }

    let wordsCopied = 0;
    let errors = [];

    // 1. Copy words from fromUser to toUser
    try {
        const { data: words, error: wordsError } = await db
            .from('words')
            .select('*')
            .eq('user_id', fromUser);

        if (wordsError) {
            console.error('Error fetching words:', wordsError);
            errors.push('Could not fetch words: ' + wordsError.message);
        } else if (words && words.length > 0) {
            // Insert words with new user_id (new IDs to avoid conflicts)
            for (const word of words) {
                const newId = Date.now() + Math.floor(Math.random() * 10000);
                const { error: insertError } = await db.from('words').insert({
                    id: newId,
                    user_id: toUser,
                    cyrillic: word.cyrillic,
                    translit: word.translit,
                    meaning: word.meaning,
                    category: word.category,
                    audio: word.audio
                });
                if (insertError) {
                    console.error('Error inserting word:', insertError);
                } else {
                    wordsCopied++;
                }
                // Small delay to ensure unique IDs
                await new Promise(r => setTimeout(r, 20));
            }
            console.log(`Copied ${wordsCopied} words`);
        }
    } catch (err) {
        console.error('Words migration error:', err);
        errors.push('Words error: ' + err.message);
    }

    // 2. Copy user profile (skip if table doesn't exist)
    try {
        const { data: profile, error: profileError } = await db
            .from('users')
            .select('*')
            .eq('user_id', fromUser)
            .single();

        if (!profileError && profile) {
            await db.from('users').upsert({
                ...profile,
                user_id: toUser,
                created_at: new Date().toISOString()
            }, { onConflict: 'user_id' });
            console.log('Copied user profile');
        } else if (profileError && profileError.code !== 'PGRST116' && profileError.code !== 'PGRST205') {
            console.log('Profile table may not exist yet, skipping');
        }
    } catch (err) {
        console.log('Profile copy skipped (table may not exist):', err.message);
    }

    // 3. Copy localStorage (this always works)
    try {
        const fromData = localStorage.getItem(`bulgarianKids_${fromUser}`);
        if (fromData) {
            localStorage.setItem(`bulgarianKids_${toUser}`, fromData);
            console.log('Copied localStorage');
        }
    } catch (err) {
        console.error('localStorage error:', err);
        errors.push('localStorage error: ' + err.message);
    }

    // Success if we copied words or localStorage
    if (wordsCopied > 0 || localStorage.getItem(`bulgarianKids_${toUser}`)) {
        return true;
    }

    if (errors.length > 0) {
        alert('Migration issues:\n' + errors.join('\n'));
    }
    return false;
}

// Export current profile as JSON (for backup/transfer)
function exportProfile() {
    const data = {
        user: CURRENT_USER,
        exportedAt: new Date().toISOString(),
        localStorage: JSON.parse(localStorage.getItem(getStorageKey()) || '{}'),
        words: state.vocab.words
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulgarian-kids-${CURRENT_USER}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showUnlockMessage('Profile exported!');
}

// Admin: migrate default to another user
async function migrateDefaultTo(targetUser) {
    if (!targetUser) {
        targetUser = prompt('Enter username to migrate default profile to:');
    }
    if (!targetUser) return;

    targetUser = targetUser.trim().toLowerCase();

    if (!confirm(`Migrate all data from "default" to "${targetUser}"?\n\nThis will copy:\n- All words\n- Progress & points\n- Achievements`)) {
        return;
    }

    showUnlockMessage('Migrating...');

    const success = await migrateProfile('default', targetUser);

    if (success) {
        showUnlockMessage(`Migrated to ${targetUser}!`);
        alert(`Success! Profile migrated to "${targetUser}".\n\nTo use it, go to:\nbulgarian-kids.vercel.app?user=${targetUser}`);
    } else {
        alert('Migration failed. Check console for errors.');
    }
}

// ============ Messaging System ============
let unreadMessages = 0;

async function loadMessages() {
    if (!db) return [];

    try {
        const { data, error } = await db
            .from('messages')
            .select('*')
            .eq('to_user', CURRENT_USER)
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) {
            console.error('Error loading messages:', error);
            return [];
        }

        return data || [];
    } catch (err) {
        console.error('Database error:', err);
        return [];
    }
}

async function sendMessage(toUser, messageText, audioData = null) {
    if (!db) {
        showUnlockMessage('Database not connected');
        return false;
    }

    try {
        const { error } = await db
            .from('messages')
            .insert({
                from_user: CURRENT_USER,
                to_user: toUser,
                message: messageText || '',
                audio: audioData,
                read: false,
                created_at: new Date().toISOString()
            });

        if (error) {
            console.error('Error sending message:', error);
            showUnlockMessage('Could not send message');
            return false;
        }

        showUnlockMessage('Message sent! 💌');
        return true;
    } catch (err) {
        console.error('Database error:', err);
        return false;
    }
}

async function markMessageRead(messageId) {
    if (!db) return;

    try {
        await db
            .from('messages')
            .update({ read: true })
            .eq('id', messageId);
    } catch (err) {
        console.error('Error marking message read:', err);
    }
}

async function checkUnreadMessages() {
    if (!db) return;

    try {
        const { data, error } = await db
            .from('messages')
            .select('id')
            .eq('to_user', CURRENT_USER)
            .eq('read', false);

        if (!error && data) {
            unreadMessages = data.length;
            updateInboxBadge();
        }
    } catch (err) {
        console.error('Error checking messages:', err);
    }
}

function updateInboxBadge() {
    const badge = document.getElementById('inboxBadge');
    if (badge) {
        if (unreadMessages > 0) {
            badge.textContent = unreadMessages;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

function openInbox() {
    document.getElementById('inboxModal').classList.remove('hidden');
    renderInbox();
}

function closeInbox() {
    document.getElementById('inboxModal').classList.add('hidden');
}

async function renderInbox() {
    const container = document.getElementById('inboxMessages');
    container.innerHTML = '<div class="loading">Loading messages...</div>';

    const messages = await loadMessages();

    if (messages.length === 0) {
        container.innerHTML = `
            <div class="empty-inbox">
                <div class="empty-icon">📭</div>
                <p>No messages yet!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = messages.map(msg => {
        const date = new Date(msg.created_at);
        const timeAgo = getTimeAgo(date);
        const isUnread = !msg.read;

        // Mark as read when displayed
        if (isUnread) {
            markMessageRead(msg.id);
        }

        const hasAudio = msg.audio && msg.audio.length > 0;
        const hasText = msg.message && msg.message.length > 0;

        return `
            <div class="message-item ${isUnread ? 'unread' : ''}">
                <div class="message-header">
                    <span class="message-from">From: ${msg.from_user}</span>
                    <span class="message-time">${timeAgo}</span>
                </div>
                ${hasAudio ? `
                    <div class="message-audio">
                        <button class="btn-kids play-voice-btn" onclick="playVoiceMessage('${msg.id}')">
                            🔊 Play Voice Message
                        </button>
                        <audio id="audio-${msg.id}" src="${msg.audio}" style="display:none;"></audio>
                    </div>
                ` : ''}
                ${hasText ? `<div class="message-body">${escapeHtml(msg.message)}</div>` : ''}
            </div>
        `;
    }).join('');

    // Reset unread count
    unreadMessages = 0;
    updateInboxBadge();
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

    return date.toLocaleDateString();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function playVoiceMessage(msgId) {
    const audio = document.getElementById(`audio-${msgId}`);
    if (audio) {
        audio.play().catch(err => console.error('Audio play error:', err));
    }
}

// Voice message recording
let voiceMsgRecorder = null;
let voiceMsgChunks = [];
let voiceMsgAudio = null;
let voiceMsgStream = null;
let voiceMsgRecording = false;

function openSendMessage() {
    document.getElementById('sendMessageModal').classList.remove('hidden');
    resetVoiceRecording();
}

function closeSendMessage() {
    document.getElementById('sendMessageModal').classList.add('hidden');
    document.getElementById('messageText').value = '';
    document.getElementById('messageRecipient').value = '';
    resetVoiceRecording();
}

function resetVoiceRecording() {
    voiceMsgAudio = null;
    voiceMsgRecording = false;
    const playbackEl = document.getElementById('voiceMsgPlayback');
    if (playbackEl) playbackEl.classList.add('hidden');
    const recordBtn = document.getElementById('voiceMsgRecordBtn');
    if (recordBtn) {
        recordBtn.classList.remove('recording');
        recordBtn.innerHTML = '🎤 Record Voice Message';
    }
}

async function toggleVoiceMsgRecording() {
    const recordBtn = document.getElementById('voiceMsgRecordBtn');

    if (voiceMsgRecording) {
        // Stop recording
        if (voiceMsgRecorder && voiceMsgRecorder.state === 'recording') {
            voiceMsgRecorder.stop();
        }
        voiceMsgRecording = false;
        recordBtn.classList.remove('recording');
        recordBtn.innerHTML = '🎤 Record Again';
    } else {
        // Start recording
        try {
            voiceMsgStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
            voiceMsgRecorder = new MediaRecorder(voiceMsgStream, { mimeType });
            voiceMsgChunks = [];

            voiceMsgRecorder.ondataavailable = (e) => voiceMsgChunks.push(e.data);

            voiceMsgRecorder.onstop = () => {
                const blob = new Blob(voiceMsgChunks, { type: mimeType });
                const reader = new FileReader();
                reader.onloadend = () => {
                    voiceMsgAudio = reader.result;
                    document.getElementById('voiceMsgPlayback').classList.remove('hidden');
                };
                reader.readAsDataURL(blob);

                if (voiceMsgStream) {
                    voiceMsgStream.getTracks().forEach(t => t.stop());
                    voiceMsgStream = null;
                }
            };

            voiceMsgRecorder.start();
            voiceMsgRecording = true;
            recordBtn.classList.add('recording');
            recordBtn.innerHTML = '⏹️ Stop Recording';
            playSound('coin');
        } catch (err) {
            console.error('Mic error:', err);
            showUnlockMessage('Could not access microphone');
        }
    }
}

function playVoiceMsgPreview() {
    if (voiceMsgAudio) {
        const audio = new Audio(voiceMsgAudio);
        audio.play().catch(err => console.error('Playback error:', err));
    }
}

async function submitMessage() {
    const recipient = document.getElementById('messageRecipient').value.trim().toLowerCase();
    const message = document.getElementById('messageText').value.trim();

    if (!recipient) {
        showUnlockMessage('Enter a recipient name');
        return;
    }

    if (!message && !voiceMsgAudio) {
        showUnlockMessage('Enter a message or record voice');
        return;
    }

    const success = await sendMessage(recipient, message, voiceMsgAudio);
    if (success) {
        closeSendMessage();
    }
}

// Quick message buttons for grandparents
async function sendQuickMessage(toUser, message) {
    await sendMessage(toUser, message);
}

// ============ Admin View (for baba/grandparents) ============
async function loadUserProgress(userId) {
    if (!db) return null;

    try {
        // Load user's words
        const { data: words, error: wordsError } = await db
            .from('words')
            .select('*')
            .eq('user_id', userId);

        if (wordsError) {
            console.error('Error loading user words:', wordsError);
            return null;
        }

        return {
            words: words || [],
            totalWords: (words || []).length,
            masteredWords: (words || []).filter(w => w.correct >= 3).length,
            strugglingWords: (words || []).filter(w => (w.wrong || 0) > (w.correct || 0)).slice(0, 5)
        };
    } catch (err) {
        console.error('Error:', err);
        return null;
    }
}

function openAdminView() {
    document.getElementById('adminViewModal').classList.remove('hidden');
    loadAdminData();
}

function closeAdminView() {
    document.getElementById('adminViewModal').classList.add('hidden');
}

async function loadAdminData() {
    const container = document.getElementById('adminViewContent');
    const targetUser = document.getElementById('adminTargetUser')?.value?.trim().toLowerCase();

    if (!targetUser) {
        container.innerHTML = '<p>Enter a user name above to see their progress.</p>';
        return;
    }

    container.innerHTML = '<div class="loading">Loading progress...</div>';

    const progress = await loadUserProgress(targetUser);

    if (!progress) {
        container.innerHTML = '<p>Could not load data for this user.</p>';
        return;
    }

    const strugglingHtml = progress.strugglingWords.length > 0
        ? progress.strugglingWords.map(w => `
            <div class="struggling-word">
                <span class="word-cyrillic">${w.cyrillic}</span>
                <span class="word-meaning">${w.meaning}</span>
                <span class="word-stats">✓${w.correct || 0} ✗${w.wrong || 0}</span>
            </div>
        `).join('')
        : '<p>No struggling words! 🎉</p>';

    container.innerHTML = `
        <div class="admin-stats">
            <div class="stat-card">
                <div class="stat-value">${progress.totalWords}</div>
                <div class="stat-label">Total Words</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${progress.masteredWords}</div>
                <div class="stat-label">Mastered</div>
            </div>
        </div>
        <h3>Needs Practice:</h3>
        <div class="struggling-list">
            ${strugglingHtml}
        </div>
        <button class="btn-kids primary-kids" onclick="openSendMessageTo('${targetUser}')">
            💌 Send Encouragement
        </button>
    `;
}

function openSendMessageTo(user) {
    closeAdminView();
    openSendMessage();
    document.getElementById('messageRecipient').value = user;
}

// ============ Init ============
// iOS audio unlock - enables audio playback after first touch
let audioUnlocked = false;
function unlockAudio() {
    if (audioUnlocked) return;
    audioUnlocked = true;

    // Unlock Web Audio API
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
        ctx.resume();
    } catch (e) {}

    // Unlock speechSynthesis
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('');
        utterance.volume = 0;
        speechSynthesis.speak(utterance);
    }

    document.removeEventListener('touchstart', unlockAudio);
    document.removeEventListener('click', unlockAudio);
}

document.addEventListener('touchstart', unlockAudio, { once: true });
document.addEventListener('click', unlockAudio, { once: true });

document.addEventListener('DOMContentLoaded', async () => {
    initSupabase();

    // Check if user is already logged in
    const storedUser = getStoredUser();
    if (storedUser) {
        CURRENT_USER = storedUser;
        await initializeApp();
    } else {
        // Show login screen
        showLoginScreen();
    }
});

// ============ Login System ============
function showLoginScreen() {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('mainHeader').classList.add('hidden');
    document.getElementById('homeScreen').classList.add('hidden');

    // Populate recent users
    const recentUsers = getRecentUsers();
    const recentSection = document.getElementById('recentUsersSection');
    const recentList = document.getElementById('recentUsersList');

    if (recentUsers.length > 0) {
        recentSection.classList.remove('hidden');
        recentList.innerHTML = recentUsers.map(user =>
            `<button class="recent-user-btn" onclick="loginAs('${user}')">${user}</button>`
        ).join('');
    } else {
        recentSection.classList.add('hidden');
    }

    // Focus input
    setTimeout(() => {
        document.getElementById('loginNameInput').focus();
    }, 100);

    // Handle enter key
    document.getElementById('loginNameInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
}

async function handleLogin() {
    const nameInput = document.getElementById('loginNameInput');
    const name = nameInput.value.trim().toLowerCase();

    if (!name) {
        nameInput.classList.add('error');
        nameInput.placeholder = 'Please enter a name!';
        setTimeout(() => {
            nameInput.classList.remove('error');
            nameInput.placeholder = 'Type your name...';
        }, 2000);
        return;
    }

    await loginAs(name);
}

async function loginAs(username) {
    CURRENT_USER = username;
    setStoredUser(username);
    addRecentUser(username);

    // Create or update user in database
    if (db) {
        try {
            const { data: existing } = await db.from('users').select('*').eq('user_id', username).single();
            if (!existing) {
                // Create new user
                await db.from('users').insert({
                    user_id: username,
                    baba_points: 0,
                    current_streak: 0,
                    best_streak: 0,
                    daily_progress: 0,
                    stickers: [],
                    alphabet_mastered: 0,
                    vocab_mastered: 0,
                    last_active: new Date().toISOString()
                });
            }
        } catch (err) {
            console.log('User check error:', err);
        }
    }

    await initializeApp();
}

async function initializeApp() {
    try {
        // Hide login, show app
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('mainHeader').classList.remove('hidden');
        document.getElementById('homeScreen').classList.remove('hidden');

        // Update header with user name
        const displayName = CURRENT_USER.charAt(0).toUpperCase() + CURRENT_USER.slice(1);
        document.getElementById('appTitle').textContent = `${displayName}'s Bulgarian!`;
        document.getElementById('headerUserName').textContent = displayName;

        loadState();

        if (db) {
            await loadWordsFromDatabase();
            await loadUserProfile();
            await loadLetterAudioFromDatabase();
            await checkUnreadMessages();
            logActivity('session_start', null, { user: CURRENT_USER });
            syncUserProfile();
        }

        updateHomeScreen();

        // If admin user, show admin dashboard option
        if (isAdmin()) {
            showAdminMode();
        }
    } catch (err) {
        console.error('Init error:', err);
        loadState();
    }
}

function showUserMenu() {
    const dropdown = document.getElementById('userMenuDropdown');
    dropdown.classList.toggle('hidden');

    // Close on click outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!e.target.closest('.header-user') && !e.target.closest('.user-menu-dropdown')) {
                dropdown.classList.add('hidden');
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 10);
}

function switchUser() {
    document.getElementById('userMenuDropdown').classList.add('hidden');
    localStorage.removeItem('bulgarian_kids_current_user');
    CURRENT_USER = null;
    showLoginScreen();
}

function handleLogout() {
    document.getElementById('userMenuDropdown').classList.add('hidden');
    localStorage.removeItem('bulgarian_kids_current_user');
    CURRENT_USER = null;
    showLoginScreen();
}

function showAdminMode() {
    // Replace normal home screen cards with admin dashboard
    console.log('Admin mode enabled');

    // Show admin-specific UI
    document.getElementById('appTitle').textContent = 'Admin Dashboard';

    // Redirect to admin dashboard
    setTimeout(() => {
        openAdminDashboard();
    }, 100);
}

// ============ Admin Dashboard ============
async function openAdminDashboard() {
    document.getElementById('homeScreen').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    document.getElementById('backBtn').classList.remove('hidden');
    document.getElementById('headerTitle').innerHTML = '<span class="mascot">📊</span> Admin Dashboard';

    await loadAdminDashboard();
}

async function loadAdminDashboard() {
    const container = document.getElementById('adminUserList');
    container.innerHTML = '<div class="loading">Loading users...</div>';

    if (!db) {
        container.innerHTML = '<p>Database not connected</p>';
        return;
    }

    try {
        // Get all users
        const { data: users, error } = await db
            .from('users')
            .select('*')
            .order('last_active', { ascending: false });

        if (error) throw error;

        if (!users || users.length === 0) {
            container.innerHTML = '<p>No users found</p>';
            return;
        }

        container.innerHTML = users
            .filter(u => u.user_id !== 'admin') // Don't show admin user
            .map(user => `
                <div class="admin-user-card" onclick="showUserDetail('${user.user_id}')">
                    <div class="user-card-info">
                        <div class="user-avatar">${user.user_id.charAt(0).toUpperCase()}</div>
                        <div>
                            <div class="user-card-name">${user.user_id}</div>
                            <div class="user-card-stats">
                                ${user.baba_points || 0} pts • ${user.vocab_mastered || 0} words • 🔥${user.best_streak || 0}
                            </div>
                        </div>
                    </div>
                    <div class="user-card-arrow">→</div>
                </div>
            `).join('');
    } catch (err) {
        console.error('Error loading users:', err);
        container.innerHTML = '<p>Error loading users</p>';
    }
}

async function showUserDetail(userId) {
    document.getElementById('adminUserList').classList.add('hidden');
    document.getElementById('adminUserDetail').classList.remove('hidden');
    document.getElementById('detailUserName').textContent = userId;

    const statsContainer = document.getElementById('detailStats');
    const wordsContainer = document.getElementById('detailWordsList');
    const activityContainer = document.getElementById('detailActivityList');

    statsContainer.innerHTML = '<div class="loading">Loading...</div>';

    if (!db) return;

    try {
        // Load user profile
        const { data: user } = await db.from('users').select('*').eq('user_id', userId).single();

        // Load user words
        const { data: words } = await db.from('words').select('*').eq('user_id', userId);

        // Load recent activity
        const { data: activity } = await db
            .from('activity')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(20);

        // Display stats
        if (user) {
            statsContainer.innerHTML = `
                <div class="detail-stat-card">
                    <div class="detail-stat-value">${user.baba_points || 0}</div>
                    <div class="detail-stat-label">Baba Points</div>
                </div>
                <div class="detail-stat-card">
                    <div class="detail-stat-value">${user.vocab_mastered || 0}</div>
                    <div class="detail-stat-label">Words Mastered</div>
                </div>
                <div class="detail-stat-card">
                    <div class="detail-stat-value">${user.alphabet_mastered || 0}</div>
                    <div class="detail-stat-label">Letters Learned</div>
                </div>
                <div class="detail-stat-card">
                    <div class="detail-stat-value">🔥 ${user.best_streak || 0}</div>
                    <div class="detail-stat-label">Best Streak</div>
                </div>
            `;
        }

        // Display words
        if (words && words.length > 0) {
            wordsContainer.innerHTML = words.map(w => `
                <span class="detail-word-chip ${w.mastered ? 'mastered' : ''}">${w.cyrillic}</span>
            `).join('');
        } else {
            wordsContainer.innerHTML = '<p>No words yet</p>';
        }

        // Display activity
        if (activity && activity.length > 0) {
            const activityIcons = {
                'quiz_correct': '✅',
                'quiz_wrong': '❌',
                'word_mastered': '⭐',
                'letter_mastered': '🔤',
                'session_start': '🚀',
                'tv_purchase': '📺',
                'milestone_reached': '🏆'
            };

            activityContainer.innerHTML = activity.slice(0, 10).map(a => {
                const time = new Date(a.created_at).toLocaleDateString();
                return `
                    <div class="activity-item">
                        <span class="activity-icon">${activityIcons[a.event] || '📝'}</span>
                        <span class="activity-text">${a.event.replace('_', ' ')}</span>
                        <span class="activity-time">${time}</span>
                    </div>
                `;
            }).join('');
        } else {
            activityContainer.innerHTML = '<p>No activity yet</p>';
        }

        // Store current user for messaging
        window.adminViewingUser = userId;

    } catch (err) {
        console.error('Error loading user detail:', err);
        statsContainer.innerHTML = '<p>Error loading data</p>';
    }
}

function closeUserDetail() {
    document.getElementById('adminUserDetail').classList.add('hidden');
    document.getElementById('adminUserList').classList.remove('hidden');
}

function sendMessageToUser() {
    if (window.adminViewingUser) {
        closeAdminDashboard();
        openSendMessage();
        document.getElementById('messageRecipient').value = window.adminViewingUser;
    }
}

function closeAdminDashboard() {
    document.getElementById('adminDashboard').classList.add('hidden');
    document.getElementById('adminUserDetail').classList.add('hidden');
    document.getElementById('adminUserList').classList.remove('hidden');
    goHome();
}
