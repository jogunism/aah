# 사이트 리뉴얼 체크리스트

목표: 첫 화면에서 "무엇을·누구에게·얼마에" 파는지 보여주고, 상품 → 비교 → 신뢰 → 상담으로 이어지는 흐름으로 홈과 프로그램 페이지를 재구성한다 (Apple·Nike 판매 패턴 참고).
작업 브랜치: `renewal` (master 병합 전까지 운영 배포 없음). 결정 사항과 이유는 `context-notes.md`에 기록.

공통 검증(각 단계): `npx tsc --noEmit` 통과 → `npm run build` 성공 → 로컬(3100)에서 데스크톱 1440 / 모바일 390 화면 확인 → 5개 언어 문구 확인.

## 0. 기반
- [x] `renewal` 브랜치 생성
- [x] Inter 폰트, 색상 토큰(ink, muted, line, soft)
- [x] 공통 컴포넌트: Button/ButtonLink, Section/SectionHeading

## 1. 헤더
- [x] 섹션 메뉴 (Programs, Tuition, Universities, How it works, FAQ)
- [x] 상시 "Free consultation" 버튼
- [x] 모바일 햄버거 메뉴 (언어·통화 포함)
- [x] 모바일 하단 고정 CTA 바 (홈)
- [x] 쿠키 배너 축소 + 5개 언어 번역

## 2. 히어로
- [x] 한 줄 가치 + CTA 2개 + 신뢰 지표 바
- [x] 대학 수는 API 데이터로 표시
- [x] 기존 고추 배너 제거, 소개 슬로건을 h2로 변경 (h1은 히어로)

## 3. 상품
- [x] "What brings you to Korea?" 목적별 카드 4개
- [x] 단기/장기 타일 + API 시작가 (언어별 기본 통화, 통화 변경 시 갱신)

## 4. 결정 지원
- [x] 단기 vs 장기 비교표
- [x] "Everything taken care of" 포함 항목 (기존 수업료 섹션 대체)
- [x] 수업료 계산기 진입점 유지 (7단계 전까지)

## 5. 신뢰와 마무리
- [x] 소개("We are") 정리
- [x] 대학 로고 그리드
- [x] 진행 절차 타임라인
- [x] 인스타그램 섹션 유지 (필수)
- [x] FAQ 유지
- [x] 최종 CTA (상담 + 설명회 등록)
- [x] 문의 폼 스타일 정리
- [x] 장식용 패럴랙스 사진 제거
- [x] 푸터 (Instagram 링크 포함)

## 6. 프로그램 상세 (`/programs/short`, `/programs/long`)
- [x] 서브 메뉴 + 핵심 스펙 + 시기 + 학교별 가격 + 하단 고정 "Plan & apply"
- [x] 홈에서 열리는 모달(인터셉트 라우트) 처리 방식 결정

## 7. 플랜 빌더 (`/plan`)
- [x] 수업료 계산기 로직을 전체 페이지로 이전
- [x] 모바일 하단 고정 합계/버튼
- [x] 견적 → 문의 폼 연결
- [x] 사이트맵 추가

## 8. QA·출시
- [x] 5개 언어 문구 점검, 사용하지 않는 번역 키 정리 여부 확인(사용자 승인 후)
- [x] SEO: h1, 구조화 데이터, llms.txt, hreflang 유지 확인
- [x] 모바일·접근성 점검
- [x] master 병합 → Amplify 배포 확인 (#109 성공, 2026-11-03 09:28, 라이브 200·가격·/plan·사이트맵 확인)
- [ ] Search Console 사이트맵 재제출·/plan 색인 요청(사용자)
