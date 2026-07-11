# 아키텍처 개요

## 시스템 구조

```
[Browser SPA — Vite + Vue 3]
  ├─ Splash / Guide / Game Phase
  ├─ CardGrid + CardModal (풀스크린 질문)
  └─ SettingsModal (라이트/딥 모드)
        ↓
[Composables]
  ├─ useGame      — 게임 상태·페이즈·카드 클릭
  ├─ useTimer     — 타이머 시작/일시정지/종료
  └─ useCardShuffle — Fisher-Yates + CSS 애니메이션
        ↓
[Data]
  └─ questions.ts / cardData.ts — JSON 텍스트 카드
```

## 게임 플로우

```
splash → guide → playing
                    ├─ 타이머 설정 & 재생
                    ├─ 카드 클릭 → flip → modal
                    ├─ modal 닫기 → completed 표시
                    ├─ 16장 완료 → game end modal
                    └─ 설정 → 모드 변경 / 셔플
```

## 컴포넌트 계층

```
App.vue
├── SplashScreen
├── GuideScreen
├── GameHeader (타이머·컨트롤·언어)
├── CardGrid
├── CardModal
├── SettingsModal
├── GameEndModal
└── ShopModal (타이머 종료 알림)
```

## 원본 vs 포트폴리오

| 레이어 | 원본 | 포트폴리오 |
|--------|------|-----------|
| View | Vue 2 + jQuery DOM | Vue 3 SFC + Tailwind |
| State | Options API data | Composition API composables |
| 카드 콘텐츠 | 상품 PNG | JSON + CSS |
| UI 에셋 | PNG 아이콘 | 텍스트·이모지 |
| Deploy | 회사 서버 | Vercel SPA |

## 주요 기술 결정

1. **Composables 분리** — 타이머·셔플·게임 로직을 독립 모듈로 분리해 테스트·유지보수 용이
2. **서버 없는 SPA** — 백엔드 없이 전체 게임 UX를 브라우저에서 동작
3. **TypeScript** — Card, GameMode, MessageSet 등 도메인 타입 명시
