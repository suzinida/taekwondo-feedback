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
  
  // 재생 중이면 즉시 동기화
  if (isPlayingSetup) {
    studentVideoSetup.currentTime = Math.max(0, demoVideo.currentTime + offsetValue);
  }
}

// 1단계 재생
function playSetup() {
  if (!studentVideoUrl) {
    alert('학생 영상을 업로드해주세요');
    return;
  }
  
  demoVideo.muted = true;
  studentVideoSetup.muted = false;
  
  // 초기 동기화
  demoVideo.currentTime = 0;
  studentVideoSetup.currentTime = Math.max(0, offsetValue);
  
  // 재생
  demoVideo.play().catch(e => console.log('재생 오류'));
  studentVideoSetup.play().catch(e => console.log('재생 오류'));
  
  isPlayingSetup = true;
  startSyncSetup();
}

// 동기화 시작 (렉 방지: 200ms 주기)
function startSyncSetup() {
  clearInterval(syncInterval);
  syncInterval = setInterval(() => {
    if (isPlayingSetup && !demoVideo.paused && !studentVideoSetup.paused) {
      const demoTime = demoVideo.currentTime;
      const targetTime = demoTime + offsetValue;
      const diff = Math.abs(studentVideoSetup.currentTime - targetTime);
      
      // 차이가 0.5초 이상이면 동기화
      if (diff > 0.5) {
        studentVideoSetup.currentTime = Math.max(0, targetTime);
      }
      
      if (demoVideo.ended) {
        pauseSetup();
      }
    }
  }, 200);
}

// 1단계 일시정지
function pauseSetup() {
  demoVideo.pause();
  studentVideoSetup.pause();
  isPlayingSetup = false;
  clearInterval(syncInterval);
}

// 1단계 정지 (처음부터)
function stopSetup() {
  demoVideo.pause();
  studentVideoSetup.pause();
  demoVideo.currentTime = 0;
  studentVideoSetup.currentTime = Math.max(0, offsetValue);
  isPlayingSetup = false;
  clearInterval(syncInterval);
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
  
  // 초기 동기화
  demoVideoFeedback.currentTime = 0;
  studentVideoFeedback.currentTime = Math.max(0, offsetValue);
  
  // 재생
  demoVideoFeedback.play().catch(e => console.log('재생 오류'));
  studentVideoFeedback.play().catch(e => console.log('재생 오류'));
  
  isPlayingFeedback = true;
  document.getElementById('playBtnFeedback').disabled = true;
  document.getElementById('pauseBtnFeedback').disabled = false;
  startSyncFeedback();
}

// 피드백 동기화 시작 (렉 방지: 200ms 주기)
function startSyncFeedback() {
  clearInterval(syncInterval);
  syncInterval = setInterval(() => {
    if (isPlayingFeedback && !demoVideoFeedback.paused && !studentVideoFeedback.paused) {
      const demoTime = demoVideoFeedback.currentTime;
      const targetTime = demoTime + offsetValue;
      const diff = Math.abs(studentVideoFeedback.currentTime - targetTime);
      
      // 차이가 0.5초 이상이면 동기화
      if (diff > 0.5) {
        studentVideoFeedback.currentTime = Math.max(0, targetTime);
      }
      
      if (demoVideoFeedback.ended) {
        pauseBoth();
      }
    }
  }, 200);
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

// 전체화면 토글 (모바일 최적화)
function toggleFullscreen() {
  const videoContainer = document.querySelector('.video-container-feedback');
  
  if (!document.fullscreenElement) {
    if (videoContainer.requestFullscreen) {
      videoContainer.requestFullscreen().catch(err => {
        // 모바일에서 실패 시 alert
        alert('전체화면이 지원되지 않습니다');
      });
    } else if (videoContainer.webkitRequestFullscreen) {
      // Safari 대응
      videoContainer.webkitRequestFullscreen();
    } else {
      alert('전체화면이 지원되지 않습니다');
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
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
