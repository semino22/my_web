const bgColor = localStorage.getItem('bgColor');
const fontColor = localStorage.getItem('fontColor');

document.body.style.backgroundColor = bgColor;
document.getElementById('info').style.color = fontColor;

// 단어 배열
const chunkArray = ["1-1", "1-2", "1-3"];
const chunkArray2 = ["2-1", "2-2", "2-3"];
const chunkArray3 = ["3-1", "3-2", "3-3"];

const moveCount = Number(localStorage.getItem('moveCount')) || 0;
document.getElementById('showCount').textContent = `이동 횟수: ${moveCount - 1}`;

// 순환 구조로 배열 선택
const arrays = [chunkArray, chunkArray2, chunkArray3];
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

function toggleVisibility() {
    if (showCount >= currentArray.length) {
        info.classList.remove('visible');
        info.classList.add('invisible');
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

// 첫 시작은 숨김 상태에서 시작
info.classList.remove('visible');
info.classList.add('invisible');
setTimeout(toggleVisibility, 0);