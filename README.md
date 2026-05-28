
📌 본 프로젝트는 **Fork & Pull Request(PR)** 기반 협업 방식으로 진행됩니다.  
각자 독립된 환경에서 안전하게 개발한 뒤 최종적으로 합치는 방식입니다.

---

# 🛠 1. GitHub 협업 개념 (필독)

원본을 직접 수정하지 않고 **개인 작업 공간 → 검토 → 병합** 순서로 진행합니다.

### 🍴 Fork
원본 레포지토리를 **내 GitHub 계정으로 복사**합니다.

✔ 내 공간이므로 자유롭게 수정 가능  
❌ 원본 프로젝트에는 영향 없음

---

### 💻 Clone
Fork한 레포지토리를 **내 컴퓨터(VS Code)** 로 다운로드합니다.

---

### 🌱 Branch
기능별로 만드는 **개인 작업 공간(전용 차선)** 입니다.

예시:
```bash
feature/map
feature/menu
feature/login
```

---

### 🔀 Pull Request (PR)

개발 완료 후

> "내가 만든 기능을 원본 프로젝트에 합쳐주세요"

라고 요청하는 과정입니다.

---

# 📂 2. 프로젝트 구조

```text
web-app-3/
└── web-project/
    ├── backend/              # Spring Boot 서버
    │
    └── frontend/             # React 프로젝트
        └── src/              # ⭐ 프론트 작업 공간
            ├── App.jsx
            └── index.js
```

---

# 🚀 3. 개발 시작하기

## STEP 1. 프로젝트 가져오기

### ① 레포지토리 Fork

GitHub 우측 상단 **Fork** 버튼 클릭

↓

본인 계정으로 복사

---

### ② 내 컴퓨터로 Clone

VS Code 실행 → 터미널 열기

```bash
# 내 Fork 레포지토리 다운로드
git clone 복사한_포크_레포지토리_URL

# 프로젝트 이동
cd web-app-3

# 프론트엔드 이동
cd web-project/frontend

# 라이브러리 설치
npm install
```

---

# 🧑‍💻 4. 기능 개발하기

## STEP 2. 브랜치 생성

```bash
git checkout -b 본인 깃허브 아이디/기능명
```

예시

```bash
git checkout -b kbx1498/map
git checkout -b kbx1498/menu
```

---

## STEP 3. 프로젝트 실행

```bash
npm start
```

브라우저 실행 후 개발 시작

---

### 📌 작업 규칙

`src/` 폴더 내부에서 작업 진행

예시

```text
src/
├── pages/
├── components/
├── map/
├── menu/
└── App.jsx
```

담당 기능에 맞게 `.jsx` 파일 생성 후 개발 진행

---

# 📤 5. 작업 제출하기

개발 완료 후 아래 순서대로 실행

### 변경 파일 추가

```bash
git add .
```

### 커밋 생성

```bash
git commit -m "Feat: 담당 기능 구현"
```

예시

```bash
git commit -m "Feat: 지도 화면 구현"
```

---

### GitHub 업로드

```bash
git push origin 본인 깃허브 아이디/기능명
```

예시

```bash
git push origin kbx1498/map
```

---

# 🔀 6. Pull Request 제출

GitHub 내 **Fork 레포지토리** 이동

↓

상단

🟢 **Compare & pull request**

클릭

↓

작업 내용 간단 작성

↓

✅ **Create pull request**

---

---

# 🔄 7. 최신 코드 동기화하기 (Sync Fork)

다른 팀원이 작업한 코드가 `main` 브랜치에 합쳐졌다면,  
내 Fork 레포지토리와 로컬 프로젝트도 최신 상태로 업데이트해야 합니다.

---

## 📌 GitHub 웹에서 Sync Fork 하기

본인 Fork 레포지토리 접속

↓

상단의

🔄 **Sync fork**

버튼 클릭

↓

✅ **Update branch**

클릭

---

## 📌 로컬 프로젝트 최신화

VS Code 터미널에서 실행

```bash
# main 브랜치 이동
git checkout main

# 최신 코드 가져오기
git pull origin main
```

---

# 🌱 8. 새로운 작업 시작 전 필수 과정

새 기능 개발 전에는 항상 최신 코드를 먼저 받아와야 합니다.

```bash
git checkout main
git pull origin main
```

이후 새로운 브랜치 생성

```bash
git checkout -b 본인아이디/새기능명
```

예시

```bash
git checkout -b seokhyun/login
```

---

# ⚠️ 9. Pull Request 이후 주의사항

PR(Pull Request)을 보냈다고 바로 끝난 것이 아닙니다.

---

## ✅ PR 승인 전까지 해야 할 일

- 팀원의 리뷰 확인
- 충돌(conflict) 발생 여부 체크
- 수정 요청 시 다시 커밋 후 push

---

## 📌 수정 후 다시 업로드하는 방법

```bash
git add .
git commit -m "Fix: 리뷰 반영"
git push origin 본인아이디/기능명
```

⚠️ 같은 브랜치에 push 하면 PR에 자동 반영됩니다.

---

# 🚨 10. 충돌(Conflict) 발생 시

여러 명이 같은 파일을 수정하면 충돌이 발생할 수 있습니다.

당황하지 말고:

1. 팀원에게 먼저 공유
2. 최신 main 코드 pull
3. 충돌 부분 수정
4. 다시 commit & push

순서로 해결하면 됩니다.

---

# 📌 최종 협업 흐름 요약

```text
Fork
 ↓
Clone
 ↓
Branch 생성
 ↓
기능 개발
 ↓
Commit
 ↓
Push
 ↓
Pull Request 생성
 ↓
코드 리뷰
 ↓
Merge
 ↓
Sync Fork
 ↓
다음 기능 개발
```

---

# 📌 협업 규칙

- `main` 직접 수정 금지
- 반드시 Branch 생성 후 작업
- 작업 완료 시 PR 제출
- 충돌 발생 시 팀원과 먼저 공유
- 커밋 메시지는 의미 있게 작성

예시

```text
Feat: 메뉴 기능 추가
Fix: 지도 오류 수정
Refactor: 컴포넌트 구조 개선
Docs: README 수정
```

---
