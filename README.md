# 태권도 품새 경기 준비하기

태극 1장 시범 영상과 학생이 촬영한 영상을 나란히 놓고 동작을 비교하며 셀프 피드백을 할 수 있는 웹 앱입니다.

## 기능

✅ **2단계 구분 UI** - 설정 화면과 피드백 화면으로 명확하게 분리  
✅ **실시간 싱크 동기화** - 슬라이더로 오프셋 조정하여 정확한 싱크 맞추기  
✅ **설정 화면에서 미리 확인** - 피드백하기 전에 재생으로 싱크 검증  
✅ **전체화면 피드백 모드** - 가로로 꽉 차는 영상으로 본격 피드백  
✅ **음악 동기화** - 학생이 촬영한 영상의 음악을 기준으로 함  
✅ **속도 조절** - 0.5배~1.5배 속도로 느리게 또는 빠르게 재생  
✅ **모바일 최적화** - 스마트폰/태블릿에서 최적화  

## 사용 방법

### 앱 접속
1. **GitHub Pages URL 접속** (완성 후 QR코드 제공)
   - `https://suzinida.github.io/taekwondo-form-compare`

2. **학생 영상 업로드**
   - "📱 학생 영상 선택" 버튼 클릭
   - 친구가 촬영한 태극 1장 영상 업로드

3. **재생**
   - "▶ 재생" 버튼 클릭 → 시범 영상과 학생 영상이 함께 시작
   - 시범 영상은 음소거 (학생 영상의 음악 기준)

4. **싱크 조정** (필요 시)
   - 슬라이더로 ±5초 범위 내에서 오프셋 조정
   - 학생 영상이 뒤처지면 왼쪽으로 (음수)
   - 학생 영상이 앞서면 오른쪽으로 (양수)

5. **속도 조절** (필요 시)
   - 0.5배, 1배, 1.25배, 1.5배 중 선택
   - 느리게 재생하며 디테일한 부분 확인 가능

## 촬영 팁

✅ **싱크 맞추기 쉽게 하려면:**
- 친구가 녹화 버튼을 누르고 3초 대기
- 중앙 스피커에서 태극 1장 음악 시작
- 학생이 음악과 동시에 차렷 자세에서 춤 시작
- → 자동으로 거의 싱크가 맞춰집니다

❌ **피해야 할 것:**
- 학생 영상에 음악이 없는 경우 → 싱크 맞추기 어려움
- 처음부터 아무것도 안 보이는 상태에서 촬영 → 슬라이더로 조정 필요

## GitHub에 배포하는 방법

### 준비물
- GitHub 계정 (이미 있음: `suzinida`)
- Git 설치 (또는 GitHub Desktop 사용)

### 방법 1: 웹에서 직접 업로드 (가장 간단)

1. **GitHub 접속**
   - https://github.com/suzinida 로 로그인

2. **새 저장소 만들기**
   - 오른쪽 상단 `+` → `New repository`
   - 저장소 이름: `taekwondo-form-compare`
   - Public 선택 (학생들이 접속할 수 있도록)
   - "Create repository" 클릭

3. **파일 업로드**
   - "Add file" → "Upload files"
   - 다음 파일들을 선택해서 업로드:
     - `index.html`
     - `style.css`
     - `script.js`
     - `taegeuk_demo.mp4`

4. **GitHub Pages 설정**
   - 저장소 설정 (Settings) 클릭
   - 왼쪽 메뉴에서 "Pages" 클릭
   - Source: "Deploy from a branch" 선택
   - Branch: `main` 선택 후 저장
   - 몇 분 후 URL이 나타남: `https://suzinida.github.io/taekwondo-form-compare`

### 방법 2: 터미널로 업로드 (개발자용)

```bash
# 저장소 클론
git clone https://github.com/suzinida/taekwondo-form-compare.git
cd taekwondo-form-compare

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: 태극 1장 자세 비교 앱"

# 푸시
git push origin main
```

## QR코드 생성

완성 후 다음 중 하나로 QR코드 생성:
- Google Charts: https://chart.googleapis.com/chart?chs=300x300&chld=M|0&cht=qr&chl=YOUR_URL
- QR코드 생성기: https://qr-server.com/

예시:
```
https://qr-server.com/api/qrcode?size=300x300&data=https://suzinida.github.io/taekwondo-form-compare
```

## 기술 스택

- **HTML5**: 영상 재생
- **CSS3**: 반응형 디자인 (모바일 최적화)
- **JavaScript**: 영상 동기화 및 제어
- **GitHub Pages**: 무료 호스팅

## 저장소 구조

```
taekwondo-form-compare/
├── index.html           (메인 페이지)
├── style.css           (스타일시트)
├── script.js           (로직)
├── taegeuk_demo.mp4    (시범 영상)
└── README.md           (이 파일)
```

## 문제 해결

### Q: 영상이 재생되지 않음
- 브라우저 개발자 도구 (F12) → Console에서 오류 확인
- 파일명이 정확한지 확인 (taegeuk_demo.mp4)
- 모바일은 자동재생 정책으로 사용자 상호작용 필요 (재생 버튼 클릭)

### Q: 싱크가 계속 안 맞음
- 슬라이더로 오프셋 조정
- 0.5배 속도로 느리게 재생하며 정확히 조정

### Q: 학생 영상의 음악이 안 들림
- 학생 영상 파일에 음성 트랙이 있는지 확인
- 볼륨 설정 확인 (브라우저 음량 및 기기 음량)

## 라이선스

개인 교육용입니다.

## 문의

이 프로젝트는 유가중학교 체육 수업용으로 제작되었습니다.
