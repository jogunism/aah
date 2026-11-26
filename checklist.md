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

## 12. 플랜 견적 공유

- [x] 공유 링크: `/{lang}/plan?program=&school=&period=&stay=` (stay = 선택한 기간의 기숙사 순번, 1부터. 없으면 숙소 별도)
- [x] `PlanBuilderFromQuery`가 period·stay를 읽어 선택 복원, 잘못된 값은 기본값(첫 기간, 숙소 별도)
- [x] `ShareMenu`: 링크 복사, WhatsApp, Facebook, X, 이메일, (지원 브라우저만) 기기 공유 시트
- [x] 데스크톱 합계 옆 "Share" 버튼, 모바일 하단 합계 바 가격 옆 아이콘 버튼(메뉴는 위로)
- [x] 5개 언어 SHARE_ 키, GA 이벤트 `plan_share`(method)
- [x] 로컬 확인: 링크로 선택 복원, 메뉴 링크 5종 값, 복사, 390px 모바일 바 넘침 수정(min-w-0)
- [x] tsc·eslint·next build
- [x] 모바일 아이콘을 가격 높이로 축소(누르는 영역 44px), 시트 지원 시 메뉴는 링크 복사·더보기만
- [x] 터치 기기는 버튼이 바로 기기 공유 시트를 엶(데스크톱은 메뉴)
- [x] master 배포(45adbda, Amplify #126 SUCCEED), 라이브 데스크톱: 링크로 선택 복원, 메뉴 링크 복사·더보기, 복사 링크 정확
- [ ] 실제 휴대폰에서 공유 시트 직행 확인
- [x] 선택을 주소창에 반영, 언어 변경 시 쿼리 유지(로컬: en→de→en, 통화 USD→EUR 변경 후에도 선택 유지)

## 13. 공유 링크 통화, 서강대 id

- [x] 쿼리·공유 링크에 `cur`, pre-paint에서 쿠키·data-cur 적용(로컬: cur=GBP 링크 → £ 표시, 복사 링크에 cur 포함)
- [x] `sogang.png` 추가, 예전 `school=seogagn` 링크 별칭(로컬: DB 변경 전에도 서강대 선택됨)
- [x] 배포(#129) → DB 키 교체(백업 후 복사·삭제, `id` 필드도 sogang) → API 배포 → 재빌드(#131) → 라이브: 예전 링크 열면 서강대 선택·주소 sogang으로 바뀜, 엠블럼 정상, cur=EUR 적용

## 14. SEO·GEO 점검 (2026-11-20, 학교 변경 후)
- [x] robots·sitemap(20개)·plan canonical(쿼리 제외)·구조화 데이터 라이브 확인
- [x] 화면·llms.txt에 성균관대·TLA·Seogang 표기 없음 확인
- [x] llms.txt에 학교 목록(영문·한글 이름, 프로그램별 시작가와 첫 옵션 기간) 추가
- [x] 가격 범위 문구를 "each university"로 수정(범위는 대학만 집계)
- [x] 배포 후 라이브 llms.txt 확인(Amplify #132). 페이지 본문은 그대로라 IndexNow 제출은 생략
- [ ] Search Console 색인 요청 9개 결과 확인(11-09 요청분)
- [x] 가격 없는 학교 숨김(API 5108290, 국민대 제외) 배포, Amplify #133 재빌드, 라이브 홈·프로그램·플랜·llms.txt에서 국민대 없음 확인, IndexNow 202(20개)

## 15. 공식 신청 폼(/apply) 1차 배포 — 신청·저장·확인 메일만

로그인·단계 화면(포털 `/my`)은 다음 배포(사용자 결정). 포털 작업은 `feature/apply-portal` 브랜치에 있다.

- [x] aah-e.net 약관·취소·개인정보 원문 수집, 일본 특화 조항을 뺀 한국어 초안(`docs/policy/`)
- [x] 취소 시 환불액 확정(장기 €380/340/310, 단기 €260/210/170, 수속 완료 후 없음), 변경 수수료 장기 €40·€70, 단기 €50·€90
- [x] `/{lang}/terms`, `/{lang}/privacy` 페이지(영어 원문 + 4개 언어 번역), 푸터 상시 링크
- [x] `/{lang}/apply` 폼(필수·선택, "정확하지 않아도 됨" 안내, 개인정보 동의), 완료 화면, noindex
- [x] API `POST /apply`(aah.api `feature/apply-form`): 저장, 신청자 확인 메일(5개 언어), 담당자 알림 — 로컬 13개 확인
- [x] 5개 언어 번역 병합, tsc·eslint·build, 로컬 확인(헤드리스 크롬으로 빈 제출 시 16개 필드 오류 → 입력·제출 → 완료 화면, 프록시 경유 저장, 5개 언어 페이지 200)
- [x] API 배포(aah.api d0d9d04, Lambda 2026-11-23 10:30 UTC) → 프론트 배포(b25f731, Amplify #135 SUCCEED) → 운영 확인: 15개 페이지 200, 푸터 링크, /apply noindex, 실제 신청 1건 저장·메일 발송(오류 로그 없음) → 테스트 신청·계정 삭제, 번호 카운터 초기화(첫 실제 신청 = AAH-26-0001)
- [ ] 확인 필요: contact@aah.education 받은편지함에 테스트 확인 메일·담당자 알림 2통이 왔는지(스팸함 포함)

## 16. 사용자 포털(/my) — 로그인부터 단계 화면까지 (브랜치 feature/portal, 배포 전)

- [x] 예전 포털 작업(feature/apply-portal)을 최신 master 위로 옮김(신청 폼 쪽은 master 것을 유지)
- [x] 첫 비밀번호: 서버가 만든 12자 임시 비밀번호(해시 저장)를 접수 메일로, 첫 로그인 때 변경 안내
- [x] 로그인 후 청구서 주소 국가 언어로 이동(전체 새로고침으로 화면 번역까지 전환)
- [x] 확인서 동의 시 화면에 보인 주의 사항 문장과 IP·브라우저를 API로 전달(동의 스냅샷)
- [x] 납부 단계 취소 환불액을 확인서 통화로 환산해 표시(약관과 같은 규칙)
- [x] 지원서 보기에 학기 수, 선택칸을 사이트 드롭다운으로(공관 국가·신청 전환)
- [x] MY_* 230개 키 5개 언어 번역
- [x] 로컬 API 흐름 테스트 47개 통과, 헤드리스 크롬으로 로그인·확인서 동의·납부·비자 서류 화면 확인, 빌드 통과
- [x] 납부 단계에 aah-3b 인보이스(동의 뒤 발행) 내려받기
- [x] 공관 지도(Google Maps 핀 ↔ 주소 카드 강조), 국가 드롭다운 사이트 언어 국가 우선
- [ ] Google Maps API 키(사용자 발급 필요)로 지도 실제 확인
- [ ] 운영 준비(사용자 확인 필요): S3 서류 버킷·CORS, `PORTAL_JWT_SECRET`, 실제 IBAN·은행·세금 번호, Lambda 권한
- [ ] 운영 배포(API → 프론트 순서)

## 17. 2단계 확인 항목·관리자 승인, 1단계 신청서 수정 (2026-11-23, 사용자 요청)
- [x] 확인서 회신에 일본 확인서 메일의 학생 확인 항목: 여권(만료일, 입국+6개월 경고)·질환 신고(필수 예/아니오)·거주국(장기, 비자 관할)·확인 체크(일정 변경, 서류·송금, 항공권 시기, 장기는 비자 뒤 한국 방문 금지·체류 한도)
- [x] Confirm 뒤 "확인 중"(agreed), 관리자 승인(approved) 뒤에만 3단계 열림. CLI `approve`(승인+인보이스), `return`(보완 요청, 이전 답 채워 다시 열기)
- [x] 관리자 알림에 확인 항목과 경고(여권 만료·여권 없음·질환·거주국 ≠ 청구지)
- [x] 1단계 신청서 수정(동의 전까지, 이메일 제외), 바뀐 항목 기록(`edits`)·관리자 알림
- [x] 5개 언어 문구, 로컬 e2e 66/66, 390·1280px 화면 확인
- [ ] 운영 배포(API → 프론트 순서)

## 18. 4·6단계 안내 정리 (2026-11-24, 사용자 요청, aah-e.net 흐름 참고)
- [x] 4단계(장기): 원본 서류를 한국 사무소로 우편 발송 안내 + 주소 + "서류 보냈어요" 버튼(API `POST /school/posted`, `school.postedAt`, 관리자 알림)
- [x] 5단계: 입학허가서는 학비 납부 후 약 2주, PDF 또는 우편으로 보낸다는 안내
- [x] 6단계: 심사 타임라인·"영사관 연락" 버튼·메모 칸 제거. 발급되면 알려 달라는 안내 + "비자 나왔어요" 버튼, 발급 뒤엔 "이제 한국으로" 안내
- [x] 5개 언어 문구, 안 쓰게 된 키 정리
- [x] API·프론트 tsc, 프론트 lint·build (로컬 e2e는 운영 DB를 바라봐서 안 돌림)
- [ ] 한국 사무소 주소·수신인 사용자 확인
- [ ] 운영 배포(API → 프론트 순서)

## 19. 숙소 단계와 완료 단계 (2026-11-24, 사용자 요청)
- [x] API: `housing { status: arranging | contracted, contractedAt }`(예전 신청은 없음 = arranging), CLI `housing <id> contracted|arranging`
- [x] 단계 순서: 장기 … 비자 → 숙소 → 완료(8단계), 단기 … 학교 → 숙소 → 완료(6단계). 단계 번호는 순서에서 계산
- [x] 숙소 화면: 계약은 우리가 대신, 보통 도착 약 2주 전에 정해짐, 계약 뒤 주소·입주 안내 메일 (aah-e.net stay·departure 페이지 참고)
- [x] 완료 화면: 감사·응원 메시지, 서울 사무소 주소(영문·한글)·전화 +82 2-702-2753·contact@aah.education
- [x] 5개 언어, tsc·lint·build, 단계 상태 계산 스크립트 확인(장기·단기, 숙소 필드 없음·계약 완료)
- [ ] 관리자 화면(/console)에 "집 계약 완료" 버튼 연결(관리자 화면 작업 세션 몫)
- [x] 운영 배포: 18·19 모두 반영(2026-11-24). API는 aah-bb 배포(a179abb)에 함께 포함, 프론트 49a31d6 Amplify #150 성공, 운영 번역 파일에서 새 문구 확인

## 20. 학교별 플랜 페이지 (SEO: 학교 이름 + 학비 검색)

목표: `/{lang}/plan/{학교id}`를 학교마다 색인되는 페이지로 만든다. 서버 HTML에 그 학교의 견적이 들어 있고, 제목·설명·h1·canonical이 학교마다 다르다. 프로그램·기간·숙소·통화는 지금처럼 쿼리로 두고 canonical은 학교 페이지로 모은다.

- [x] 라우트 `src/app/[lang]/plan/[school]/page.tsx`: 빌드 때 만들지 않고 첫 방문 때 생성 후 1시간 캐시(ISR, 빌드 중 API 500 때문), 모르는 id·가격 없는 학교는 `/{lang}/plan`으로 307
- [x] 서버 렌더링: PlanBuilder를 그 학교로 선택한 상태로 그림(장기 가격이 있으면 장기, 없으면 단기). 쿼리의 program·period·stay는 지금처럼 브라우저에서 덮어씀
- [x] 메타데이터: 학교 이름이 들어간 제목·설명(언어 기본 통화 시작가)·h1, canonical은 쿼리 없는 자기 주소, hreflang은 같은 학교의 5개 언어
- [x] 번역 키 5개 언어: `PLAN_SCHOOL_META_TITLE`, `PLAN_SCHOOL_META_DESC`, `PLAN_SCHOOL_TITLE`
- [x] 빌더 주소 동기화: 학교가 있으면 경로 `/plan/{id}`, 없으면 `/plan`. 학교를 바꾸면 그 학교 페이지로 이동(제목·h1이 같이 바뀌도록), 프로그램 등은 쿼리 유지
- [x] pre-paint 스크립트: `/plan/{id}` 경로도 플랜 페이지로 인식(통화 `cur`, 자리표시 처리)
- [x] 리다이렉트(proxy.ts): `/{lang}/plan?school=X&...` → `/{lang}/plan/X?...`(308). 학교 id 별칭(seogagn → sogang)도 적용
- [x] 내부 링크: SchoolPrices "Select", 공유 링크를 새 경로로
- [x] sitemap에 학교 URL 추가, llms.txt 학교 목록에 학교 페이지 링크
- [x] 검증(sitemap 115개, 캐시 MISS→HIT, 콘솔 오류 없음, 3100은 다른 서버가 써서 3101): tsc·eslint·next build, 로컬에서 curl로 학교 HTML에 이름·가격·canonical 확인, 예전 쿼리 링크 308 확인, 새로고침·언어 변경·학교 변경 시 선택 유지, 데스크톱 1440 / 모바일 390
- [x] 배포(Amplify #162 SUCCEED, API Lambda 갱신) 후 라이브 확인: 학교 페이지 200·제목·canonical·안내문, 예전 `?school=` 308, sitemap 115개, llms.txt 학교 링크, 새 엠블럼 200, IndexNow 200(115개)
- [x] 학교 id 공식 철자(ewha, swu), 이화여대 영문명 Ewha Womans University(운영 DB·API·엠블럼), seogagn 별칭 제거
- [x] h1 고정·학교 이름은 안내문에, 학교 변경 시 페이지 이동 없이 주소만 갱신(깜빡임 수정)
- [ ] Search Console: sitemap 재제출, 학교 URL 색인 요청(배포 전 404 상태에서 요청한 것은 다시 요청)
- [ ] 4~8주 뒤 GSC에서 학교 이름 + tuition 검색어 노출 확인
