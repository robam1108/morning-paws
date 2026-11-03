# MORNING PAWS — Boutique Pet Grooming Studio

> A little care, a lot of love.

부티크 펫 그루밍 스튜디오를 위한 원페이지 브랜드 사이트 (포트폴리오용 **가상 브랜드**).
라이프스타일 매거진의 화보처럼 사진과 세리프 타이포그래피가 주인공이 되는 편집 디자인을 목표로 했습니다.

## 실행

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # 타입 체크 + 프로덕션 빌드
npm run preview        # 빌드 결과 확인
npm run lint           # oxlint
npm run images:build   # 사진 원본 다운로드(캐시) → public/images/*.webp, OG 이미지, CREDITS.md 생성
```

스택: React 19 + TypeScript + Vite, CSS Modules (추가 UI 라이브러리 없음).
폰트: Cormorant Garamond(영문 디스플레이) · DM Sans(영문 라벨) · Pretendard Variable(한글 본문) — 모두 npm 패키지로 셀프 호스팅.

## 기존 포트폴리오와의 차별화

비교 대상: 청소업체(`gakkeut-renewal`), 영어학원(`upgrade-english`). 두 사이트 모두 실제 배포본과 로컬 코드를 확인했습니다.

| 요소 | 기존 두 사이트의 공통 패턴 | MORNING PAWS |
| --- | --- | --- |
| Hero | 왼쪽 텍스트 + 오른쪽 이미지 2단, 아래 3칸 스탯 띠 | 잡지 표지: 거대한 세리프 헤드라인이 세로 사진 위로 걸침, 플레이트 사진·세로 캡션 |
| 헤드라인 | 굵은 한글 산세리프(부산단디고딕, A2z) | 얇은 영문 세리프 + 이탤릭 대비, 한글은 보조 |
| 컬러 | 포레스트 그린/아이보리, 오렌지/틸/크림 | Oat · Olive · Ink · Terracotta · Sand, 섹션 단위 면 전환 |
| 버튼 | 둥근 모서리 채움 버튼 + 화살표 아이콘 | 직각, 얇은 선, 대문자 레이블, 선으로 그린 화살표 |
| 내비 | 왼쪽 로고 / 오른쪽 메뉴 + 진한 CTA | 가운데 제호(masthead), 메뉴 양쪽 분할, 1200px 미만은 전체 화면 목차 |
| 섹션 헤더 | 중앙 또는 좌측 eyebrow + 한글 제목 반복 | 러닝 헤드(“02 — Philosophy …… p. 04”) + 섹션마다 다른 제목 정렬 |
| 콘텐츠 | 카드 그리드, 아이콘+제목+설명 반복, FAQ 아코디언 | 메뉴판(점선 리더), 대비 화보, 콜라주, 편지, 지그재그 인용, 판권면 |
| 이미지 | 둥근 모서리 카드 안의 동일 비율 사진 | 비율·크기·크롭을 매번 다르게, 화면 끝까지 붙거나 겹치는 배치 |

## 섹션 구성

| # | 섹션 | 배경 | 레이아웃 |
| --- | --- | --- | --- |
| 01 | Hero | Oat | 12단 위에 헤드라인을 겹친 표지 |
| 02 | Philosophy | White | 왼쪽 화면 끝까지 붙은 세로 사진 + 겹친 인셋, 오른쪽 큰 타이포 |
| 03 | Grooming Menu | Olive | 메뉴판. 왼쪽 고정 사진이 보고 있는 항목에 맞춰 교체 |
| 04 | Before & After | Oat | 크기·높이가 다른 대비 화보 + 타이포 사례 탭 |
| — | Interlude | 사진 | 전면 사진 위 인용 |
| 05 | Our Space | White | 서로 다른 비율의 콜라주 + 메모 |
| 06 | Groomer's Note | Oat + Sand | 사진 위에 겹친 편지, 3단 판권면 |
| 07 | Reviews | White | 위치·크기가 매번 바뀌는 지그재그 인용 |
| 08 | Reservation | Ink | 밑줄 입력 폼, 예약 “신청” 흐름 |
| 09 | Location | Oat | 선으로 그린 일러스트 지도 + 정보 표 |
| — | Footer | Olive | 페이지 폭을 채우는 제호 |

## 구조

```
src/
  content/            브랜드·메뉴·사례·후기 데이터 (site.ts 만 바꾸면 매장 정보 교체)
    photos.generated.ts   images:build 가 생성하는 사진 비율·대표색
  components/
    layout/           Masthead(목차 포함), Footer, MobileBookBar
    sections/         섹션별 컴포넌트 + CSS Module
    reservation/      예약 폼(model 검증 · submit 전송 · Field)
    ui/               Photo(반응형 webp), Reveal(스크롤 등장), Folio(러닝 헤드)
  styles/tokens.css   컬러·타입·간격·모션 토큰
scripts/build-images.mjs
```

## 예약 신청 폼

- `.env` 에 `VITE_FORM_ENDPOINT` (Formspree 등 JSON POST 수집 엔드포인트)를 넣으면 실제로 전송합니다. HTTP 2xx 일 때만 “접수”로 안내합니다.
- 엔드포인트가 없으면 **데모 모드**: 아무것도 전송하지 않고 화면에 “전송되지 않았다”고 그대로 표시합니다.
- 어떤 경우에도 “예약 확정”이라 하지 않고 “예약 신청”으로 안내합니다.
- 검증: 필수값, 전화번호 형식(자동 하이픈), 내일~60일 이내, 월요일(휴무) 제외, 개인정보 동의. 오류 시 첫 항목으로 포커스, 오류 요약은 `role="alert"`.
- 스팸 방지 허니팟 필드 포함.

## 인터랙션

헤드라인 줄별 등장, 표지 사진 settle, 스크롤 진입 등장(관찰자 1개 공유), 사진 미세 확대(hover 기기만), 링크 밑줄 애니메이션, 버튼 색 전환, 메뉴 사진 크로스페이드, Before & After 사례 전환(키보드 화살표 지원), 모바일 목차(포커스 트랩·Esc·스크롤 잠금), 모바일 하단 예약 바(표지 이후 표시, 예약 섹션에서 숨김). `prefers-reduced-motion` 에서는 모두 정지합니다.

## 정직성 메모 (포트폴리오용 가상 콘텐츠)

- 브랜드, 주소, 전화번호, 카카오 채널, SNS, 미용사 이름·경력·자격, 고객 후기, 가격은 모두 **가상 예시**이며 화면에도 그렇게 표시합니다.
- 사진은 Unsplash License / Pexels License 스톡 사진입니다(`CREDITS.md`, 푸터 “Photo credits”).
- **Before & After 사진은 같은 강아지의 실제 전후 사진이 아닙니다.** 라이선스가 확인된 무료 사진 중 동일 반려견의 전후 사진을 찾지 못해, 같은 견종의 “자란 털 / 정돈된 스타일” 사진을 짝지어 연출했고 섹션 안에 이 사실을 명시했습니다. 실제 운영 시 매장에서 촬영한 동일 반려견의 사진으로 교체하세요 (`src/content/stories.ts`).
- 지도는 실제 위치를 특정하지 않는 일러스트입니다. 실제 운영 시 카카오맵/네이버 지도 임베드로 교체합니다.

## 점검한 환경

375 · 390 · 768 · 1024 · 1440px — 가로 스크롤 없음, 모든 이미지 로드, 프로덕션 빌드 콘솔 오류 없음, 세 가지 웹폰트 로드 확인.
