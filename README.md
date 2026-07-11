# bridge-card-portfolio

> 코로나19 비대면 시기, 회사에서 운영하던 **ZOOM 아이스브레이킹 카드 게임**을 포트폴리오용으로 재구성한 저장소입니다.  
> 원본은 회사 내부 서비스이며, 이 레포는 **프론트엔드 데모·기술 패턴 공개** 목적의 sanitized 버전입니다.

## Live Demo

**[https://bridge-card.vercel.app](https://bridge-card.vercel.app)**

## 데모 GIF

### 8초 — 핵심 플로우
스플래시 → 가이드 → 카드 플립 → 질문 모달 → 닫기

![8초 데모](./docs/gifs/demo-8s-optimized.gif)

### 15초 — 전체 플로우
카드 플레이 → 딥 모드 전환 → 셔플 애니메이션

![15초 데모](./docs/gifs/demo-15s-optimized.gif)

## 포함 내용

| 영역 | 설명 |
|------|------|
| 카드 게임 UI | 16장 질문 카드 플립 · 풀스크린 보기 (텍스트 JSON) |
| 게임 로직 | 라이트/딥 모드, 타이머, 정지 시 셔플, Fisher-Yates + CSS 애니메이션 |
| 카드 UX | 3D 플립, 선택 잠금, 슬롯 기반 셔플 (중앙 더미 → 순차 펼치기) |
| 다국어 | 한국어 / English |
| 서버 기능 | 리뷰 API → Mock Modal (서버 불필요) |

## 기술 스택

Vue 3 · TypeScript · Vite · Tailwind CSS · Composition API

## 사전 준비

- Node.js 18 이상 (20 LTS 권장)
- npm

```bash
node -v
npm -v
```

## 1. 저장소 받기

```bash
git clone https://github.com/asiject/bridge-card-portfolio.git
cd bridge-card-portfolio
```

## 2. 의존성 설치

```bash
npm install
```

## 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5173 접속

## 4. 프로덕션 빌드

```bash
npm run build
npm run preview
```

## 5. Vercel 배포

```bash
npx vercel login
npx vercel --prod
```

또는 Vercel 대시보드에서 이 저장소를 Import → Framework: **Vite**

## 6. GIF 재생성 (선택)

```bash
npm run build
npm run preview          # 터미널 1
npm run record:gifs      # 터미널 2
```

## 포트폴리오 문서

- [`docs/PROJECT_CARD.md`](./docs/PROJECT_CARD.md) — 이력서·면접용 요약
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — 아키텍처 개요
- [`docs/PORTFOLIO_NOTE.md`](./docs/PORTFOLIO_NOTE.md) — 공개·면접 가이드

## 디렉터리 구조

```
bridge-card-portfolio/
├── README.md
├── package.json
├── public/img/          # 카드 이미지
├── src/
│   ├── components/
│   ├── composables/
│   ├── data/
│   ├── types/
│   └── utils/
├── docs/
│   ├── gifs/
│   ├── PROJECT_CARD.md
│   ├── ARCHITECTURE.md
│   └── PORTFOLIO_NOTE.md
├── scripts/record-gifs.mjs
└── vercel.json
```

## 원본과의 차이

| 항목 | 원본 (회사 서비스) | 포트폴리오 버전 |
|------|-------------------|----------------|
| 프레임워크 | Vue 2 + jQuery | Vue 3 + TypeScript |
| 카드 콘텐츠 | 상품 PNG (저작권) | JSON 질문 + CSS 카드 UI |
| 스타일 | custom CSS | Tailwind CSS |
| 리뷰 기능 | REST API 연동 | Mock Modal |
| 배포 | 회사 서버 | Vercel |

## 라이선스

MIT (포트폴리오 샘플용)
