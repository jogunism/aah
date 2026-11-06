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
- [x] 모바일 요약 바를 sticky로 변경(하단에 떠 있다가 가격 카드 자리에서 카드 윗부분으로 붙음, Ask·v 버튼은 카드에만)

## 8. QA·출시
- [x] 5개 언어 문구 점검, 사용하지 않는 번역 키 정리 여부 확인(사용자 승인 후)
- [x] SEO: h1, 구조화 데이터, llms.txt, hreflang 유지 확인
- [x] 모바일·접근성 점검
- [x] master 병합 → Amplify 배포 확인 (#109 성공, 2026-11-03 09:28, 라이브 200·가격·/plan·사이트맵 확인)
- [x] Search Console 사이트맵 재제출·/plan 색인 요청(사용자, 2026-11-03)

## 9. 영국 파운드(GBP) 추가
- [x] 통화 목록·기호를 `src/lib/currency.ts` 한 곳으로 모으고 GBP(£) 추가
- [x] 통화 선택기에 £, 서버 렌더링·`/api/prices`·`/api/schools`가 GBP 쿠키/쿼리 처리
- [x] 언어별 기본 통화는 그대로(EN=USD, 그 외 EUR)
- [x] tsc·eslint·빌드, 로컬에서 GBP 쿠키로 £ 표시 확인
- [x] aah.api 7차 배포 후 master 병합(709f18e) → Amplify 배포, 라이브 GBP 시작가 £700(단기)·£1,080(장기) 확인

## 10. API 토큰 숨김·호출 줄이기
- [x] 문의·구독·구독 해지를 Next 서버 라우트(`/api/contact`, `/api/subscribe`, `/api/unsubscribe`) 경유로 변경
- [x] 홈 렌더링마다 부르던 환율 갱신(`PUT /currency`)을 서버 인스턴스당 5분에 한 번으로 제한
- [x] tsc·eslint·빌드, `.next/static`에 토큰·API 주소 0건 확인
- [x] 로컬에서 세 라우트가 잘못된 입력에 400을 돌려주는지 확인(실제 메일 발송 없이)
- [x] aah.api 8차 배포 후 master 병합(efa2dd1) → Amplify 배포, 라이브 세 라우트 400, 홈 JS 청크 15개에 API 주소 0건
- [x] `JWT_SECRET` 교체, 새 토큰을 Amplify 환경 변수에 설정(2026-11-06 13:13 UTC, Amplify #122). 예전 토큰 403, 새 토큰 200, 라이브 가격·구독 라우트 정상

## 11. 페이지 정적 캐시(ISR) 전환
목표: 홈, `/plan`, `/programs/long`, `/programs/short`를 요청마다 렌더링하지 않고 1시간마다 다시 만드는 정적 페이지로 바꿔 CloudFront 캐시로 응답한다(봇 트래픽 비용 상한, 응답 속도).
- [x] 언어를 `headers()` 대신 props로 전달(Footer, Introduce, Universities, Process, Faq), `getLanguageFromHeaders` 제거
- [x] 서버 렌더링 통화는 언어 기본 통화로 고정(`cookies()` 제거)
- [x] 쿠키 통화가 기본과 다르면 맞는 가격을 불러올 때까지 가격 자리 표시(LivePrice, SchoolPrices, PlanBuilder)
- [x] `/plan`의 `program`, `school` 쿼리를 브라우저에서 읽고, 쿼리가 있으면 읽기 전까지 계산기 자리 표시
- [x] 네 페이지 `force-dynamic` 제거, `revalidate = 3600`
- [x] tsc·eslint·빌드(네 페이지가 ●), 로컬에서 통화 전환·plan 링크(직접·클라이언트 이동)·독일어 확인, plan HTML 크기는 운영과 같음(학교 데이터 중복 없음)
- [x] 배포(master f8ca3ad, Amplify #123). 네 페이지와 `/api/prices` 모두 캐시 Hit, 첫 바이트 0.15~0.48초 → 약 0.05초. 빌드 시간대 API Gateway 4XX·5XX 0건, Lambda throttle 0건(최대 동시 실행 25)

## 12. SEO·GEO 개선 (2026-11-06 재점검 후속)
목표: 프로그램 페이지가 검색 결과와 AI 답변에서 "한국 어학연수·기간·비자"로 잡히게 하고, Course 리치 결과 조건을 채운다.
- [x] 프로그램 페이지 검색용 title·description 키 추가(5개 언어), 메타데이터·OG·트위터에 적용
- [x] Course 구조화 데이터: offers(EUR 최저가, 가격 없으면 생략), 위치를 한국 전체로, courseWorkload를 수업 시간으로, provider 이름, 설명을 새 description으로
- [x] 홈 "Learn more" 링크에 화면에 안 보이는 프로그램 이름 추가
- [x] tsc·eslint·빌드, 로컬에서 5개 언어 메타·JSON-LD·Lighthouse SEO 확인(홈 SEO 92 → 100)
- [x] 색 대비 WCAG AA: 브랜드 빨강 #D8484D → #C73E43, 상담 박스 정보 칸 bg-white/12 → bg-black/10·글자 불투명, 문의 폼 회색·안내 문구 한 단계 진하게(홈·plan·long·de 접근성 100, 대비 실패 0)
- [x] 공유 이미지 1200×630 `og.jpg`(main.jpg 가운데를 1.91:1로 잘라 축소)
- [x] 서비스 지역에 GB, llms.txt 가격에 £ 추가
- [x] master 병합·배포(5aa2aaf, Amplify #124) 후 라이브 확인: 프로그램 10개 페이지 새 title·description·Course(offers·PT60H/PT200H·South Korea), og.jpg, GB, £, #c73e43, 홈 SEO 100·접근성 100
- [x] Bing Webmaster Tools는 이미 등록돼 있음(8월부터 데이터). 추천 항목 확인
- [x] 언어 없는 경로 리다이렉트 307 → 308(`/`와 `/en` 제목·설명 중복 지적)
- [x] IndexNow 키 파일·제출 스크립트 추가
- [x] 배포(10e3539, Amplify #125) 후 라이브 `/`·`/plan` 308, 키 파일 200, IndexNow 제출 202(20 URLs)
