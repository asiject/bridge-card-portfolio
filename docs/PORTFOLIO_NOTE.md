# 포트폴리오 사용 가이드

## 이 레포를 GitHub에 올릴 때

1. **새 저장소** `bridge-card-portfolio` (회사 원본 `cccvlmcia/bridge-card`와 분리)
2. `portfolio/sanitized-repo/` 내용만 push
3. README 상단에 포트폴리오·sanitized 안내 유지
4. 회사 API URL, 내부 서버 주소는 절대 커밋하지 않기

## 이력서·포트폴리오에 링크하는 방법

```
온라인 브릿지 카드 (ZOOM 아이스브레이킹 도구)
→ 데모: https://bridge-card-portfolio.vercel.app
→ 코드: github.com/asiject/bridge-card-portfolio
```

## 면접에서 설명할 때

1. **배경**: 코로나 ZOOM 비대면, 신규 만남 아이스브레이킹 필요
2. **역할**: 웹 카드 게임 UI, 게임 로직, 리뷰 API 연동, 유튜브 가이드
3. **포트폴리오**: Vue 3 + TS로 리팩토링, API는 Mock으로 대체해 데모 공개
4. **라이브**: `npm run dev` 또는 Vercel 배포 URL로 시연

## 채용 담당자가 볼 포인트

- [ ] Vue Composition API composables 설계
- [ ] 게임 상태(덱·타이머·모드) 관리
- [ ] CSS transition 기반 카드 애니메이션
- [ ] 접근성(키보드·ARIA)
- [ ] 레거시(Vue2+jQuery) → 현대 스택 마이그레이션 경험

## 원본 저장소와의 관계

| 저장소 | 용도 |
|--------|------|
| `cccvlmcia/bridge-card` | 회사 원본 (비공개 운영) |
| `asiject/bridge-card-portfolio` | 포트폴리오 공개용 |

## 다음 단계 (선택)

- [ ] Vercel 배포 URL README에 반영
- [ ] GitHub Actions CI (build)
- [ ] Lighthouse 성능 스크린샷 추가
