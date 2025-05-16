window.onload = function () {
    document.getElementById('nextBtn').onclick = function (e) {
        e.preventDefault(); // 폼 제출 방지

        // 시험 전 지연시간값 로컬스토리지에 저장
        e.preventDefault();
        const timerValue = document.getElementById('timerSelect').value;
        localStorage.setItem('selectedTimer', timerValue);
        location.href = 'test.html';

        // 단어 사이 지연시간값 로컬스토리지에 저장
        e.preventDefault();
        const pauseTimeValue = document.getElementById('pauseTimeSelect').value;
        localStorage.setItem('selectedPauseTime', pauseTimeValue);
        location.href = 'test.html';

        const bgColor = document.querySelector('input[name="bgcolor"]:checked').value;
        const fontColor = document.querySelector('input[name="fontcolor"]:checked').value;

        localStorage.setItem('bgColor', bgColor);
        localStorage.setItem('fontColor', fontColor);

        // 카운트 증가
        let count = Number(localStorage.getItem('moveCount')) || 0;
        localStorage.setItem('moveCount', count + 1);

        location.href = `test.html`;
    };
}