const demoVideo = document.getElementById('demoVideo');
const studentVideoSetup = document.getElementById('studentVideoSetup');
const demoVideoFeedback = document.getElementById('demoVideoFeedback');
const studentVideoFeedback = document.getElementById('studentVideoFeedback');

const studentFile = document.getElementById('studentFile');

let offsetValue = 0;
let isPlayingSetup = false;
let isPlayingFeedback = false;
let syncInterval = null;
let studentVideoUrl = null;

// 학생 영상 파일 선택
studentFile.addEventListener('change', (e) => {
  if (e.target.files[0]) {
    const url = URL.createObjectURL(e.target.files[0]);
    studentVideoUrl = url;
    studentVideoSetup.src = url;
    studentVideoFeedback.src = url;
    studentVideoSetup.style.display = 'block';
    document.getElementById('studentEmpty').style.display = 'none';
  }
});

// 오프셋 조정 함수 (1초 단위 버튼용)
function adjustOffset(value) {
  offsetValue = value;
  document.getElementById('offsetDisplay').textContent = value + '초';
  
  // 모든 버튼에서 active 제거
  document.querySelectorAll('.sync-buttons button').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // 클릭한 버튼에 active 추가
  event.target.classList.add('active');
}

// 1단계 재생
function playSetup() {
  if (!studentVideoUrl) {
    alert('학생 영상을 업로드해주세요');
    return;
  }
  demoVideo.muted = true;
  studentVideoSetup.muted = false;
  
  demoVideo.play();
  studentVideoSetup.currentTime = Math.max(0, offsetValue);
  studentVideoSetup.play();
  isPlayingSetup = true;
}

// 1단계 일시정지
function pauseSetup() {
  demoVideo.pause();
  studentVideoSetup.pause();
  isPlayingSetup = false;
}

// 1단계 처음으로
function resetSetup() {
  demoVideo.currentTime = 0;
  studentVideoSetup.currentTime = Math.max(0, offsetValue);
  pauseSetup();
}

// 피드백 화면 속도 조절
function setSpeedFeedback(speed) {
  demoVideoFeedback.playbackRate = speed;
  studentVideoFeedback.playbackRate = speed;
  document.querySelectorAll('.speed-small .speed-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

// 피드백 화면 재생
function playBoth() {
  if (!studentVideoUrl) {
    alert('학생 영상을 준비해주세요');
    return;
  }
  demoVideoFeedback.muted = true;
  studentVideoFeedback.muted = false;
  
  demoVideoFeedback.play();
  studentVideoFeedback.currentTime = Math.max(0, offsetValue);
  studentVideoFeedback.play();
  
  isPlayingFeedback = true;
  document.getElementById('playBtnFeedback').disabled = true;
  document.getElementById('pauseBtnFeedback').disabled = false;

  clearInterval(syncInterval);
  syncInterval = setInterval(() => {
    const demoTime = demoVideoFeedback.currentTime;
    const studentTime = demoTime + offsetValue;
    studentVideoFeedback.currentTime = Math.max(0, studentTime);
    
    if (demoVideoFeedback.ended) {
      pauseBoth();
    }
  }, 100);
}

// 피드백 화면 일시정지
function pauseBoth() {
  demoVideoFeedback.pause();
  studentVideoFeedback.pause();
  isPlayingFeedback = false;
  document.getElementById('playBtnFeedback').disabled = false;
  document.getElementById('pauseBtnFeedback').disabled = true;
  clearInterval(syncInterval);
}

// 피드백 화면 초기화
function resetFeedback() {
  demoVideoFeedback.currentTime = 0;
  studentVideoFeedback.currentTime = Math.max(0, offsetValue);
  pauseBoth();
}

// 피드백 화면으로 전환
function switchToFeedback() {
  if (!studentVideoUrl) {
    alert('학생 영상을 업로드해주세요');
    return;
  }
  pauseSetup();
  document.getElementById('setupScreen').classList.remove('active');
  document.getElementById('feedbackScreen').classList.add('active');
  resetFeedback();
}

// 설정 화면으로 돌아가기
function switchToSetup() {
  pauseBoth();
  document.getElementById('feedbackScreen').classList.remove('active');
  document.getElementById('setupScreen').classList.add('active');
}

// 초기 상태
document.getElementById('pauseBtnFeedback').disabled = true;
