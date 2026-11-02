# Context Notes

작업 중 내린 결정과 그 이유를 기록한다. 최신 항목을 아래에 추가한다.

## 사이트 리뉴얼 (`renewal` 브랜치)

- **브랜치 작업, 마지막에 병합**: Amplify는 master만 자동 배포한다(브랜치 자동 빌드 꺼짐). 리뉴얼 중간 상태가 운영에 섞이지 않도록 `renewal`에서 작업하고 QA 후 병합한다.
- **로컬 확인 포트 3100**: 같은 머신의 Docker 서비스가 4000, 8080, 8443, 5432를 쓴다. 겹치지 않게 `next start -p 3100`을 쓴다.
- **로컬 `.env.local`은 운영 API를 바라봄**: 화면을 실제 데이터로 확인하기 위함. 문의/구독 폼은 실제 메일이 발송되므로 로컬에서 제출하지 않는다.
- **API 호출 최소화**: Lambda 동시 실행 한도가 10이라(증가 신청 중) 빌드·캡처 시 요청이 몰리면 throttling → 500이 나고 운영에도 영향이 간다. 서버 컴포넌트는 `src/api/server.ts`의 React `cache` 래퍼로 한 요청당 1회만 호출한다.
- **헤더 문구는 서버에서 번역**: 메뉴가 HTML에 포함되어 검색엔진·AI 크롤러가 읽을 수 있게 하기 위함. 메뉴 열기/닫기만 클라이언트 컴포넌트(HeaderNav).
- **가격은 서버 렌더링 + 클라이언트 갱신**: 크롤러가 시작가를 읽을 수 있도록 언어 기본 통화(EN=USD, 그 외 EUR)로 서버에서 그리고, 방문자가 통화를 바꾸면 LivePrice가 다시 가져온다. API는 `currency` 쿠키로 통화를 정하므로 서버 요청에는 Cookie 헤더를 직접 넣는다.
- **단기 프로그램 문구**: 목업의 "from 3 weeks"는 어학원 1–2주 과정과 맞지 않아 "short holiday courses / 1–3 weeks"로 표현했다.
- **학생 후기 대신 인스타그램**: 실제 후기 자료가 없어 가짜 후기를 만들지 않는다. 인스타그램 섹션은 사용자 요청으로 반드시 유지한다.
- **히어로 이미지**: 현재는 캠퍼스 사진(`/assets/image5.jpg`). 학생이 나오는 사진이 생기면 `Hero.tsx`의 `HERO_IMAGE`만 바꾸면 된다.
- **기존 Programes/ProgramesButton 삭제**: 새 Programs 섹션으로 대체되어 사용처가 없어졌다(이번 변경으로 생긴 고아 파일). 기존 PROGRAMS_* 번역 키는 다른 곳에서 쓰일 수 있어 8단계에서 확인 후 정리한다.
- **수업료 섹션 대체**: 기존 수업료 섹션의 최소~최대 가격은 비교표 "가격" 행으로 옮기고, 포함 항목은 제목+설명 카드로 바꿨다. 사용자가 숨긴 "여행자 보험"은 포함 항목에서도 뺐다. 단, 소개("We are") 문단에는 아직 보험 언급이 남아 있다(5단계에서 확인).
- **가격 숫자 표기**: 이탈리아어·스페인어 로캘은 4자리 숫자에 천 단위 구분자를 넣지 않는다(€1700). CLDR 규칙에 따른 정상 동작.
- **같은 브랜치에서 다른 세션이 동시에 작업 중**: 두 세션이 git index를 공유해서, 한쪽이 stage한 변경이 다른 쪽 커밋에 섞일 수 있다(실제로 Tuition.tsx 삭제가 비교표 커밋 eabe133에 들어감). 커밋 직전에 `git status`로 staged 목록을 확인하고, 내 파일만 경로를 지정해 커밋한다.
- **ParallaxProvider는 남김**: 장식 사진 컴포넌트(parallaxImage)는 삭제했지만 `layoutClientWrapper.tsx`의 ParallaxProvider와 react-scroll-parallax 의존성은 기존 코드라 그대로 두었다. 이제 쓰는 곳이 없으므로 정리 여부는 사용자 확인 후 결정.
- **로컬 인스타그램 확인**: Instagram 섹션은 `NEXT_PUBLIC_BEHOLD_FEED_ID`가 없으면 렌더링되지 않는다. 로컬 `.env.local`에 운영과 같은 피드 ID를 넣어 확인한다.
- **화면 캡처의 빈 로고/사진**: next/image 지연 로딩 때문에 전체 페이지 캡처에서 아래쪽 이미지가 비어 보일 수 있다. 실제 이미지 응답(200)으로 확인한다.
- **모바일 세로 flex에서 `flex-1` 금지**: flex-col 안의 input에 flex-1을 주면 높이가 0으로 줄어든다. `sm:flex-1`로 가로 배치일 때만 적용한다.
- **새 학교 추가(aah-a1 세션, feature/new-schools)**: API 응답 형태는 그대로이고 데이터만 늘어난다. kookmin(대학), sungkyunkwan(대학), sangmyung(대학), tla(language_school) 추가, 엠블럼은 `public/assets/emblem/{id}.png`. kookmin은 pricing이 `{ long: null, short: null }`이고 priceShort/priceLong이 0 → 대학 목록에는 나오고 계산기·플랜 빌더 대상에서는 빠져야 한다(기존 offersProgram 로직 유지). 성균관대·TLA는 기간 단위가 month(2·4개월, 1·2개월), 상명대는 semester. 머지 후 장기 최저가가 1,700 → 1,400 정도로 내려간다.
- **USD/EUR 가격 규칙(사용자 정정)**: "같은 숫자"가 아니라 "환율을 고려한 같은 가치"가 맞다. EUR은 EUR_JPY, USD는 USD_JPY로 각각 환산하므로 EUR 숫자가 USD보다 낮다(예: $900 ≈ €770대). 현재 API(tuition.service.ts)는 두 통화 모두 USD_JPY로 환산해 같은 숫자를 주므로 수정이 필요하고, 해당 파일 작업 중인 aah-a1 세션에 수정 요청을 전달했다. 프론트는 통화별로 API를 다시 부르므로 API만 바뀌면 된다.
- **API 통화별 환산 반영(aah-a1, aah.api feature/new-schools a52dff0, master 머지 전)**: `/university/list`, `/university/prices`가 `currency` 쿠키에 따라 USD_JPY 또는 EUR_JPY로 환산한다. 쿠키가 없거나 다른 값이면 USD. 올림 규칙은 통화별로 동일. 확인 값(당시 환율): USD 단기 900–2300·장기 1700–4500, EUR 단기 800–2100·장기 1500–4000.
- **통화 쿠키 전달 경로**: 운영에서는 쿠키 도메인이 `aah.education`이라 `api.aah.education` 요청에도 함께 전송된다(same-site). 로컬(localhost)에서는 브라우저가 API 도메인으로 쿠키를 보내지 않아 클라이언트 통화 전환 시 USD 숫자가 나온다. 서버 렌더링은 Cookie 헤더를 직접 넣으므로 로컬에서도 언어 기본 통화로 정상 표시된다.
- **보험 문구 제거**: 여행자 보험은 학생 각자가 준비한다(사용자 확인). 소개 7번 항목과 진행 절차 5단계에서 보험 언급을 5개 언어 모두 뺐다. 쓰이지 않게 된 `TUITION_WHATS_INCLUDE_ELEMENT_5` 키는 8단계에서 정리.
- **프로그램 링크는 항상 상세 페이지로(사용자 결정)**: 홈에서 모달로 열리던 인터셉트 라우트(`[lang]/@modal`)를 없앴다. 상세 페이지가 Apple 제품 페이지처럼 독립 페이지 역할을 한다.
- **기존 죽은 코드**: `src/components/modal/ProgramDetails*.tsx`는 이번 작업 전부터 사용처가 없었다. 지침상 삭제하지 않고 남겨둠(정리 여부는 사용자 확인).
- **`.next/dev` 잔여 타입 파일**: `next dev`가 만든 `.next/dev/types`가 tsconfig include에 걸려 삭제된 라우트를 참조하면 빌드가 실패한다. dev 서버가 없을 때 `.next/dev`를 지우고 다시 빌드한다.
- **상세 페이지 핵심 스펙**: 대학 어학당 열의 표 값(기간·레벨·수업 시간·인원·비자)을 그대로 쓴다. 새 문구를 만들지 않기 위함.
- **시작가 범위(확인 필요)**: `/university/prices`는 대학만 집계한다(어학원 제외, API 설계). 그래서 단기 "Ab €900"과 학교 목록의 어학원 €600·€700이 다르게 보인다. 어학원을 시작가에 포함할지 사용자 확인 대기.

## 7단계 플랜 빌더 (`/plan`)
- master 병합(9df66af)으로 새 학교 엠블럼(국민대·성균관대·상명대·TLA)이 들어왔다. 운영 API는 통화별 환산으로 바뀌어 EUR이 USD보다 낮게 나온다(예: 단기 $900 / €800, 장기 $1,400 / €1,300).
- 계산기 모달(`modal/TuitionCalculation.tsx`)은 `git mv`로 `plan/PlanBuilder.tsx`로 옮겨 다시 썼다. 이력이 이어지게 해서 a1이 master에서 계산기를 고쳐도 병합할 때 이름 변경으로 추적되게 하려는 것이다.
- 가격 로직(offersProgram, pricing 우선·legacy 대체, 기간·기숙사 분해, 문의 문구)과 GA 이벤트는 그대로 유지했다. 진입 추적은 `trackTuitionCalculationOpen('plan_page')`, 닫기 추적은 쓸 곳이 없어 삭제했다.
- 첫 화면은 서버에서 `getSchools(currency)`로 렌더한다. 클라이언트는 통화가 바뀔 때만 다시 불러온다(Lambda 호출 최소화).
- 쿼리 `program`, `school`로 초기 선택한다. 학교가 그 프로그램을 제공하지 않으면 무시한다. 프로그램을 바꿀 때 학교가 다른 프로그램도 제공하면 선택을 유지한다(모달은 항상 초기화했다).
- 견적 문의는 같은 페이지에 넣은 Contactus로 prefill을 보내고, 폼이 스스로 스크롤한다.
- 학교 선택은 드롭다운 대신 카드 목록으로 바꿨다(페이지라서 공간이 충분하다). 단계 번호는 기간 옵션이 1개면 숙소가 3번이 된다.
- 프로그램 카드 설명은 새 키 대신 기존 `TILE_SHORT_SUB/TILE_LONG_SUB`를 재사용했다. 새 키는 PLAN_META_TITLE, PLAN_TITLE, PLAN_LEAD 세 개다.
