// menu.html에서 배경색, 폰트색상 가져오기
const bgColor = localStorage.getItem('bgColor');
const fontColor = localStorage.getItem('fontColor');

// menu.html에서 단어 노출시간값 가져오기
const selectedVisibleMinRaw = localStorage.getItem('selectedVisibleTime');
const selectedVisibleMin = selectedVisibleMinRaw === null ? 0 : Number(selectedVisibleMinRaw);

// menu.html에서 단어사이 지연시간값 가져오기
const selectedPauseMinRaw = localStorage.getItem('selectedPauseTime');
const selectedPauseMin = selectedPauseMinRaw === null ? 0 : Number(selectedPauseMinRaw);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

async function toggleVisibility() {
    // 배경색과 폰트 색상 변경
    document.body.style.backgroundColor = bgColor;
    document.getElementById('info').style.color = fontColor;

    if (showCount >= currentArray.length) {
        info.classList.remove('visible');
        info.classList.add('invisible');

        await sleep(selectedPauseMin * 1000);

        if (bgColor == "white") {
                document.getElementById('info').style.color = "black";
            } else {
                document.body.style.backgroundColor = "white";
                document.getElementById('info').style.color = "black";
            }

        // menu.html에서 저장한 타이머 값 가져오기
        const selectedMinRaw = localStorage.getItem('selectedTimer');
        const selectedMin = selectedMinRaw === null ? 0 : Number(selectedMinRaw);

        if (selectedMin >= 0) {
            const timerDisplay = document.getElementById('timer');
            timerDisplay.style.display = 'block';
            startTimer(selectedMin * 60, timerDisplay);
        }
        return;
    }
    if (!visible) {
        // 보임 상태: 단어 표시
        info.textContent = words[wordIndex];
        info.classList.remove('invisible');
        info.classList.add('visible');
        wordIndex++;
        showCount++;
        visible = true;
        setTimeout(toggleVisibility, selectedVisibleMin * 1000);
    } else {
        // 숨김 상태
        info.classList.remove('visible');
        info.classList.add('invisible');
        visible = false;
        setTimeout(toggleVisibility, selectedPauseMin * 1000);
    }
}

// 시험 전 지연시간 타이머 함수
function startTimer(duration, display) {
    let timer = duration;
    function updateTimer() {
        // 타이머 시작 시 info를 숨김
        info.classList.remove('visible');
        info.classList.add('invisible');

        const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
        const seconds = String(timer % 60).padStart(2, '0');
        display.textContent = `${minutes}:${seconds}`;
        if (timer > 0) {
            timer--;
            setTimeout(updateTimer, 1000);
        } else {
            display.textContent = "00:00";
            // 타이머 종료 후 "작성 종료" 메시지 중앙에 표시
            

            info.textContent = "작성 종료";
            info.classList.remove('invisible');
            info.classList.add('visible');
            info.style.fontSize = "50px";
            info.style.textAlign = "center";

            backBtn.style.display = 'inline-block';
        }
    }
    updateTimer();
}

// 첫 시작은 카운트다운부터
info.classList.remove('visible');
info.classList.add('invisible');
startCountdown(5);