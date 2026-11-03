/**
 * 브랜드·매장 정보.
 * MORNING PAWS 는 포트폴리오용 가상 브랜드다. 주소·연락처·영업 정보는 모두 예시이며
 * 실제 존재하는 장소나 번호가 아니다. 실제 업체에 적용할 때는 이 파일만 바꾸면 된다.
 */
export const SITE = {
  name: "MORNING PAWS",
  tagline: "A little care, a lot of love.",
  descriptionKo:
    "아이마다 다른 성격과 컨디션을 존중하는 부티크 펫 그루밍 스튜디오. 서두르지 않고, 한 마리씩 천천히 케어합니다.",
  city: "Seoul",
  established: "2026",
  /** 가상 정보임을 화면에도 함께 표기한다 */
  isDemo: true,
  address: {
    line1: "서울시 ○○구 아침길 12, 1층",
    line2: "(포트폴리오용 가상 주소)",
  },
  phone: "02-000-0000",
  kakao: "@morningpaws",
  instagram: "@morningpaws.studio",
  hours: [
    { day: "Tue — Fri", ko: "화–금", time: "10:00 — 19:00" },
    { day: "Sat — Sun", ko: "토–일", time: "10:00 — 17:00" },
  ],
  closed: { day: "Monday", ko: "매주 월요일 휴무" },
  lastBooking: "마지막 예약은 마감 2시간 전까지",
} as const;

export const NAV = [
  { id: "philosophy", label: "Philosophy", ko: "철학" },
  { id: "menu", label: "Menu", ko: "메뉴" },
  { id: "transformations", label: "Before & After", ko: "전후" },
  { id: "space", label: "Space", ko: "공간" },
  { id: "groomer", label: "Groomer", ko: "미용사" },
  { id: "notes", label: "Notes", ko: "후기" },
  { id: "location", label: "Visit", ko: "오시는 길" },
] as const;

export const BOOKING_ID = "reserve";
