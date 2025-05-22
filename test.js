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
const chunkArray1 = [
    "스페인", "오르간", "파스타", "세탁기", "색연필", 
    "낙동강", "강아지", "요리사", "설레임", "소나기", 
    "도서관", "민들레", "나이키", "손석구"
];
const chunkArray2 = [
    "프랑스", "피아노", "짜장면", "건조기", "테이프", 
    "압록강", "고양이", "변호사", "서운함", "화창함", 
    "놀이터", "고사리", "데상트", "고윤정"
];
const chunkArray3 = [
    "러시아", "탬버린", "불고기", "탈수기", "지우개", 
    "두만강", "다람쥐", "간호사", "뿌듯함", "비바람", 
    "운동장", "도라지", "산리오", "조정석"
];
const chunkArray4 = [
    "라오스", "리코더", "잡곡밥", "라디오", "형광펜", 
    "임진강", "얼룩말", "경찰관", "후련함", "눈보라", 
    "백화점", "미나리", "테슬라", "황정민"
];
const chunkArray5 = [
    "모로코", "비올라", "감자탕", "전화기", "싸인펜", 
    "대동강", "두더지", "소방관", "민망함", "장마철", 
    "영화관", "취나물", "아식스", "박정민"
];
const chunkArray6 = [
    "이집트", "플루트", "닭고기", "냉장고", "계산기", 
    "섬진강", "돌고래", "회계사", "초조함", "안개비", 
    "사무실", "개나리", "이마트", "전지현"
];
const chunkArray7 = [
    "이라크", "트럼펫", "갈비탕", "청소기", "메모장", 
    "청천강", "햄스터", "통역사", "억울함", "부슬비", 
    "경찰서", "시금치", "네이버", "한지민"
];
const chunkArray8 = [
    "캐나다", "마림바", "도루묵", "선풍기", "화이트", 
    "밀양강", "고라니", "승무원", "행복함", "무지개", 
    "우체국", "치커리", "이디야", "차은우"
];
const chunkArray9 = [
    "그리스", "실로폰", "칼국수", "믹서기", "펀치기", 
    "백두산", "까마귀", "무용수", "질투심", "싸락눈", 
    "대합실", "산마늘", "카카오", "조인성"
];
const chunkArray10 = [
    "멕시코", "색소폰", "초콜릿", "가습기", "책갈피", 
    "천마산", "두루미", "작곡가", "괴로움", "이슬비", 
    "체육관", "땅두릅", "크록스", "카리나"
];
const chunkArray11 = [
    "브라질", "팀파니", "사이다", "정수기", "수정펜", 
    "북한산", "멧돼지", "수의사", "우울감", "여우비", 
    "주차장", "산철쭉", "무신사", "노홍철"
];
const chunkArray12 = [
    "베트남", "가야금", "아구찜", "온풍기", "텀블러", 
    "한라산", "족제비", "파일럿", "짜증남", "눈보라", 
    "편의점", "대나무", "세스코", "아이유"
];
const chunkArray13 = [
    "덴마크", "심벌즈", "돈까스", "스탠드", "문서함", 
    "금강산", "너구리", "마술사", "감격감", "무더위", 
    "전시장", "토끼풀", "다이소", "박보검"
];
const chunkArray14 = [
    "알제리", "오보에", "볶음밥", "키보드", "일정표", 
    "봉화산", "갈매기", "정비사", "분노감", "일교차", 
    "박물관", "엉겅퀴", "유튜브", "유재석"
];
const chunkArray15 = [
    "미얀마", "피콜로", "회덮밥", "모니터", "책가방", 
    "지리산", "코끼리", "매니저", "안도감", "열대야", 
    "관광지", "무궁화", "조말론", "마동석"
];
const chunkArray16 = [
    "튀니지", "태평소", "케이크", "컴퓨터", "사물함", 
    "팔각산", "원숭이", "건축가", "두려움", "난기류", 
    "아파트", "씀바귀", "어도비", "문가영"
];
const chunkArray17 = [
    "남수단", "베이스", "컵라면", "이어폰", "파쇄기", 
    "아차산", "호랑이", "공무원", "공허함", "악천후", 
    "강의실", "강낭콩", "이케아", "구교환"
];
const chunkArray18 = [
    "라오스", "핸드벨", "버블티", "카메라", "파티션", 
    "청계천", "앵무새", "소설가", "귀여움", "혹한기", 
    "교무실", "고구마", "아마존", "변우석"
];

const moveCount = Number(localStorage.getItem('moveCount')) || 0;
document.getElementById('showCount').textContent = `이동 횟수: ${moveCount - 1}`;

// 순환 구조로 배열 선택
const arrays = [
    chunkArray1, chunkArray2, chunkArray3, chunkArray4, 
    chunkArray5, chunkArray6, chunkArray7, chunkArray8,
    chunkArray9, chunkArray10, chunkArray11, chunkArray12, 
    chunkArray13, chunkArray14, chunkArray15, chunkArray16,
    chunkArray17, chunkArray18
];
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