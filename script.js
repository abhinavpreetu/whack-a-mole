window.score = 0;
window.streak = 0;
window.level = 'easy';

const levelArr = [
    ['easy', 1200],
    ['medium', 800],
    ['hard', 500],
];
const levelMap = new Map(levelArr);

const dirtArr = document.querySelectorAll('.dirt');
const scoreTab = document.querySelector('#score');
const streakTab = document.querySelector('#streak');

function getRandomDirt() {
    const randomNumber = Math.floor(Math.random() * 9);
    return randomNumber;
}

function showMole(dirt) {
    dirt.classList.add('show');
    setTimeout(() => {
        dirt.classList.remove('show');
    }, levelMap.get(window.level));
}

function pickDirt() {
    const dirtIndex = getRandomDirt();
    showMole(dirtArr[dirtIndex]);
}

function whackedIt(event) {
    const { score, streak } = window;
    window.score = streak > 2 ? score + 2 : score + 1;
    scoreTab.innerHTML = window.score;
}

function startGame({ target }) {
    const { classList } = document.querySelector('.playground');
    const finScoreContainer = document.querySelector('.final-score');
    const levelSelector = document.querySelector('.diff-level');
    addClass(target.classList, 'hide');
    addClass(finScoreContainer.classList, 'hide');
    addClass(levelSelector.classList, 'hide');
    removeClass(classList, 'hide');
    const interval = window.setInterval(() => pickDirt(dirtArr), 3000);
    window.setTimeout(() => {
        endGame({
            button: target.classList,
            playground: classList,
            finalScore: finScoreContainer.classList,
            levelSelector: levelSelector.classList,
            interval
        });
    }, 60000);
}

function endGame({ button, playground, finalScore, levelSelector, interval }) {
    window.clearInterval(interval);
    addClass(playground, 'hide');
    removeClass(button, 'hide');
    removeClass(finalScore, 'hide');
    removeClass(levelSelector, 'hide');
    const finScore = document.querySelector('#finalScore');
    const highScoreEl = document.querySelector('#highScore');
    finScore.innerHTML = window.score;
    const highScore = sessionStorage.getItem('highscore') || 0;
    if (highScore >=0 && score > highScore) {
        highScoreEl.innerHTML = score;
        sessionStorage.setItem('highscore', score);
    } else {
        highScoreEl.innerHTML = highScore;
    }
    window.score = 0;
    window.streak = 0;
    window.level = 'easy';
    scoreTab.innerHTML = window.score;
    streakTab.innerHTML = window.streak;
}

function dirtClickHandler(event) {
    if (event.target.className === 'mole') {
        window.streak++;
        whackedIt();
        streakTab.innerHTML = window.streak; 
    } else {
        window.streak = 0;
        streakTab.innerHTML = window.streak;
    }
}

function setDifficulty({ target }) {
    window.level = target.value;
}

// helper functions

addClass = (classList, classname) => {
    if (!classList.contains(classname)) {
        classList.add(classname);
    }
}

removeClass = (classList, classname) => {
    if (classList.contains(classname)) {
        classList.remove(classname);
    }
}