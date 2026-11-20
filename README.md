# MORNING PAWS — Boutique Pet Grooming Studio

> A little care, a lot of love.

부티크 펫 그루밍 스튜디오를 위한 **원페이지 브랜드 사이트**입니다.
라이프스타일 매거진의 화보처럼 사진과 세리프 타이포그래피가 주인공이 되는 **에디토리얼 디자인**을 목표로 기획·디자인·개발까지 직접 진행했습니다.

> MORNING PAWS 는 포트폴리오용 **가상 브랜드**입니다. 매장 정보·가격·후기·미용사 프로필은 모두 예시이며, 화면에도 그렇게 표시합니다.

**🔗 Live Demo — https://morning-paws.vercel.app/**

---

## 한눈에 보기

| 항목 | 내용 |
| --- | --- |
| 유형 | 소상공인 브랜드 랜딩 페이지 (원페이지, 예약 신청 폼 포함) |
| 역할 | 기획 · 디자인 · 프론트엔드 개발 · 이미지 파이프라인 · 배포 (1인) |
| 스택 | React 19, TypeScript, Vite, CSS Modules |
| 도구 | sharp(이미지 변환), oxlint, Vercel |
| 대응 | 375px 모바일 ~ 1440px 데스크톱, 키보드 · 스크린리더 · 모션 축소 설정 |

UI 라이브러리 없이 CSS Modules 와 디자인 토큰만으로 레이아웃과 인터랙션을 구현했습니다.

---

## 디자인 방향

흔한 랜딩 페이지 문법(좌우 2단 히어로, 둥근 카드 그리드, 아이콘+제목+설명 반복)을 피하고, **잡지 한 권을 넘기는 경험**을 만드는 데 집중했습니다.

| 요소 | 일반적인 랜딩 페이지 | MORNING PAWS |
| --- | --- | --- |
| Hero | 텍스트 + 이미지 2단, 아래 스탯 띠 | 잡지 표지 — 거대한 세리프 헤드라인이 세로 사진 위에 걸침 |
| 타이포 | 굵은 한글 산세리프 헤드라인 | 얇은 영문 세리프 + 이탤릭 대비, 한글은 보조 |
| 컬러 | 포인트 컬러를 요소마다 사용 | Oat · Olive · Ink · Terracotta · Sand 5색, **섹션 단위로 면 전환** |
| 버튼 | 둥근 채움 버튼 + 아이콘 | 직각, 얇은 선, 대문자 레이블, 선으로 그린 화살표 |
| 내비 | 좌측 로고 / 우측 메뉴 | 가운데 제호(masthead), 메뉴 양쪽 분할, 1200px 미만은 전체 화면 목차 |
| 섹션 헤더 | eyebrow + 제목 반복 | 러닝 헤드(`02 — Philosophy …… p. 04`) + 섹션마다 다른 제목 정렬 |
| 콘텐츠 | 카드 그리드, FAQ 아코디언 | 점선 리더 메뉴판, 대비 화보, 콜라주, 편지, 지그재그 인용, 판권면 |
| 이미지 | 같은 비율의 둥근 카드 | 비율·크기·크롭을 매번 다르게, 화면 끝까지 붙거나 겹치는 배치 |

컬러 비율(Oat 45 / White 15 / Olive 20 / Ink 12 / 포인트 8)과 본문 대비(WCAG AA 4.5:1 이상)를 토큰 단계에서 정해 두고 그 안에서만 작업했습니다 — [`src/styles/tokens.css`](src/styles/tokens.css)

### 섹션 구성

| # | 섹션 | 배경 | 레이아웃 |
| --- | --- | --- | --- |
| 01 | Hero | Oat | 12단 그리드 위에 헤드라인을 겹친 표지 |
| 02 | Philosophy | White | 화면 끝까지 붙은 세로 사진 + 겹친 인셋, 큰 타이포 |
| 03 | Grooming Menu | Olive | 메뉴판. 고정된 사진이 보고 있는 항목에 맞춰 교체 |
| 04 | Before & After | Oat | 크기가 다른 대비 화보 + 사례 탭 |
| — | Interlude | 사진 | 전면 사진 위 인용 |
| 05 | Our Space | White | 서로 다른 비율의 사진 콜라주 + 메모 |
| 06 | Groomer's Note | Oat + Sand | 사진 위에 겹친 편지, 3단 판권면 |
| 07 | Reviews | White | 위치·크기가 매번 바뀌는 지그재그 인용 |
| 08 | Reservation | Ink | 밑줄 입력 폼, 예약 신청 흐름 |
| 09 | Location | Oat | 선으로 그린 일러스트 지도 + 정보 표 |
| — | Footer | Olive | 페이지 폭을 채우는 제호 |

---

## 구현 포인트

### 1. 이미지 파이프라인 — 사진이 많아도 빠르게

사진 26장이 디자인의 핵심이라 이미지 처리를 빌드 스크립트로 자동화했습니다. ([`scripts/build-images.mjs`](scripts/build-images.mjs))

- 원본을 내려받아 캐시하고, `sharp` 로 사진 크기별(360~2200px) **반응형 WebP** 를 생성
- 각 사진의 **원본 비율과 대표색**을 추출해 `photos.generated.ts` 로 기록 → 타입이 지정된 사진 이름(`PhotoName`)으로만 참조 가능
- 출처 목록 `CREDITS.md` 와 OG 이미지도 함께 생성

[`Photo`](src/components/ui/Photo.tsx) 컴포넌트는 이 메타데이터로 `aspect-ratio` 를 미리 잡고 대표색을 배경으로 깔아, 로딩 중에도 **레이아웃이 흔들리지 않고(CLS 방지) 빈 상자가 보이지 않습니다.** `srcset`/`sizes`, lazy loading, 히어로 이미지 preload + `fetchpriority` 를 적용했습니다.

### 2. 예약 신청 폼 — 실제 운영을 전제로 한 검증과 안내

([`src/components/reservation/`](src/components/reservation/))

- **검증**: 필수값, 전화번호 형식(입력 중 자동 하이픈, 서울 02 번호 대응), 내일~60일 이내 날짜, 정기 휴무일(월요일) 제외, 개인정보 동의
- **접근성**: 오류 시 첫 번째 오류 항목으로 포커스 이동, 오류 요약은 `role="alert"` 로 안내
- **전송**: 환경변수 `VITE_FORM_ENDPOINT` 에 Formspree 등 JSON 수집 엔드포인트를 넣으면 실제 전송. HTTP 2xx 일 때만 접수로 안내하고, 10초 타임아웃과 네트워크 오류 시 입력값을 보존
- **데모 모드**: 엔드포인트가 없으면 아무것도 전송하지 않고 “전송되지 않았다”고 화면에 그대로 표시
- 스팸 방지 허니팟 필드, 어떤 경우에도 “예약 확정”이 아닌 “예약 신청”으로 안내
- 검증 로직(`model.ts`) · 전송(`submit.ts`) · UI(`Reservation.tsx`)를 분리

### 3. 인터랙션과 접근성

- 헤드라인 줄별 등장, 표지 사진 settle, 메뉴 사진 크로스페이드, 링크 밑줄 애니메이션
- 스크롤 진입 등장 효과는 페이지 전체에서 **IntersectionObserver 하나를 공유**하고, 한 번 등장하면 관찰 해제 ([`Reveal`](src/components/ui/Reveal.tsx))
- 사진 hover 확대는 hover 가능한 기기에서만 적용
- Before & After 사례 전환은 `tablist` / `tab` / `tabpanel` 패턴, 키보드 화살표로 이동
- 모바일 전체 화면 목차: 포커스 트랩, `Esc` 로 닫기 후 토글 버튼으로 포커스 복귀, 배경 스크롤 잠금
- 모바일 하단 예약 바: 표지를 지난 뒤 나타나고 예약 섹션에서는 숨김
- `prefers-reduced-motion` 설정 시 모든 모션 정지

### 4. 유지보수를 고려한 구조

매장 정보·메뉴·사례·후기는 컴포넌트와 분리된 데이터 파일에 있어, **실제 업체에 적용할 때 `src/content/` 만 수정**하면 됩니다.

```
src/
  content/              브랜드·메뉴·사례·후기 데이터 (site.ts 에 매장 정보 집중)
    photos.generated.ts   images:build 가 생성하는 사진 비율·대표색
  components/
    layout/             Masthead(목차 포함), Footer, MobileBookBar
    sections/           섹션별 컴포넌트 + CSS Module
    reservation/        예약 폼 (model 검증 · submit 전송 · Field)
    ui/                 Photo(반응형 webp), Reveal(스크롤 등장), Folio(러닝 헤드)
  styles/tokens.css     컬러·타입·간격·모션 디자인 토큰
scripts/build-images.mjs  이미지 변환 · 메타데이터 · 크레딧 생성
```

폰트(Cormorant Garamond, DM Sans, Pretendard Variable)는 모두 npm 패키지로 **셀프 호스팅**해 외부 폰트 CDN 의존이 없습니다.

---

## 품질 점검

- 375 · 390 · 768 · 1024 · 1440px 에서 가로 스크롤 없음, 모든 이미지 로드 확인
- 프로덕션 빌드 콘솔 오류 없음, 웹폰트 3종 로드 확인
- `tsc -b` 타입 체크 + oxlint 통과
- 텍스트 대비 WCAG AA(4.5:1) 기준으로 색 토큰 설계

---

## 실행 방법

```bash
npm install
npm run dev            # 개발 서버 (http://localhost:5173)
npm run build          # 타입 체크 + 프로덕션 빌드
npm run preview        # 빌드 결과 미리보기
npm run lint           # oxlint
npm run images:build   # 사진 다운로드(캐시) → WebP 변환, OG 이미지, CREDITS.md 생성
```

예약 폼을 실제로 전송하려면 `.env.example` 을 복사해 `.env` 를 만들고 엔드포인트를 입력합니다.

```bash
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

---

## 콘텐츠 고지

- 브랜드, 주소, 전화번호, SNS, 미용사 이름·경력, 고객 후기, 가격은 모두 **가상 예시**입니다.
- 사진은 Unsplash License / Pexels License 무료 사진입니다. 출처는 [`CREDITS.md`](CREDITS.md) 와 사이트 푸터에 있습니다.
- **Before & After 사진은 같은 강아지의 실제 전후 사진이 아닙니다.** 라이선스가 확인된 사진 중 동일 반려견의 전후 사진을 찾을 수 없어, 같은 견종의 사진을 짝지어 연출했고 해당 섹션에도 이 사실을 명시했습니다. 실제 운영 시에는 매장에서 직접 촬영한 사진으로 교체합니다 (`src/content/stories.ts`).
- 지도는 실제 위치를 특정하지 않는 일러스트입니다. 실제 운영 시 카카오맵/네이버 지도 임베드로 교체합니다.
