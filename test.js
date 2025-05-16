const bgColor = localStorage.getItem('bgColor');
const fontColor = localStorage.getItem('fontColor');

document.body.style.backgroundColor = bgColor;
document.getElementById('info').style.color = fontColor;

// 단어 배열
const chunkArray = ["1-1", "1-2", "1-3"];
const chunkArray2 = ["2-1", "2-2", "2-3"];
const chunkArray3 = ["3-1", "3-2", "3-3"];
const chunkArray4 = ["4-1", "4-2", "4-3"];
const chunkArray5 = ["5-1", "5-2", "5-3"];
const chunkArray6 = ["6-1", "6-2", "6-3"];

const moveCount = Number(localStorage.getItem('moveCount')) || 0;
document.getElementById('showCount').textContent = `이동 횟수: ${moveCount - 1}`;

// 순환 구조로 배열 선택
const arrays = [chunkArray, chunkArray2, chunkArray3, chunkArray4, chunkArray5, chunkArray6];
const currentArray = arrays[(moveCount - 1) % arrays.length];

// 배열을 랜덤하게 섞는 함수
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let words = shuffle([...currentArray]);
let wordIndex = 0;
const info = document.getElementById('info');
const backBtn = document.getElementById('backBtn');
let showCount = 0;
let visible = false;

// 카운트다운 함수 추가
function startCountdown(count) {
    info.textContent = count;
    info.classList.remove('invisible');
    info.classList.add('visible');
    if (count > 1) {
        setTimeout(() => startCountdown(count - 1), 1000);
    } else {
        setTimeout(() => {
            info.classList.remove('visible');
            info.classList.add('invisible');
            setTimeout(toggleVisibility, 500); // 0.5초 후 퀴즈 시작
        }, 1000);
    }
}

function toggleVisibility() {
    if (showCount >= currentArray.length) {
        info.classList.remove('visible');
        info.classList.add('invisible');

        // 단어 퀴즈가 끝난 후 타이머 시작
        const timerDisplay = document.getElementById('timer');
        startTimer(300, timerDisplay); // 5분 = 300초
        backBtn.style.display = 'inline-block';
        return;
    }
    if (!visible) {
        // 보임 상태: 단어 표시
        info.textContent = words[wordIndex];
        info.classList.remove('invisible');
        info.classList.add('visible');
        wordIndex++;
        showCount++;
    } else {
        // 숨김 상태
        info.classList.remove('visible');
        info.classList.add('invisible');
    }
    visible = !visible;
    setTimeout(toggleVisibility, 3000);
}

// 5분(300초) 타이머 함수
function startTimer(duration, display) {
    let timer = duration;
    function updateTimer() {
        const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
        const seconds = String(timer % 60).padStart(2, '0');
        display.textContent = `${minutes}:${seconds}`;
        if (timer > 0) {
            timer--;
            setTimeout(updateTimer, 1000);
        }
    }
    updateTimer();
}

// 첫 시작은 카운트다운부터
info.classList.remove('visible');
info.classList.add('invisible');
startCountdown(5);