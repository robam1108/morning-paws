import type { PhotoName } from "./photos.generated";

export type MenuItem = {
  no: string;
  name: string;
  ko: string;
  description: string;
  includes: string[];
  /** 체중 구간별 가상 가격 (원) */
  prices: { size: string; from: number }[];
  duration: string;
  photo: PhotoName;
  photoAlt: string;
  focus?: string;
};

/** 가격은 모두 포트폴리오용 예시 금액이다. */
export const MENU: MenuItem[] = [
  {
    no: "i.",
    name: "Basic Grooming",
    ko: "베이직 그루밍",
    description: "목욕과 드라이, 위생 미용까지. 가볍게 정돈하고 싶은 날을 위한 기본 케어입니다.",
    includes: ["저자극 샴푸 목욕", "핸드 드라이", "발바닥·위생 부위 정리", "발톱·귀 클리닝"],
    prices: [
      { size: "~5kg", from: 45000 },
      { size: "5–10kg", from: 60000 },
    ],
    duration: "약 90분",
    photo: "menu-bath",
    photoAlt: "욕조 가장자리에 수건을 걸치고 앉아 있는 강아지",
    focus: "50% 60%",
  },
  {
    no: "ii.",
    name: "Full Grooming",
    ko: "풀 그루밍",
    description: "상담으로 스타일을 정하고, 전체 컷과 얼굴 라인을 섬세하게 다듬습니다.",
    includes: ["스타일 상담", "베이직 그루밍 전 과정", "전체 클리핑 또는 시저 컷", "얼굴·귀 라인 디자인"],
    prices: [
      { size: "~5kg", from: 75000 },
      { size: "5–10kg", from: 95000 },
    ],
    duration: "약 2–3시간",
    photo: "menu-scissor",
    photoAlt: "미용 가위로 흰 강아지의 얼굴 털을 다듬는 손",
    focus: "35% 50%",
  },
  {
    no: "iii.",
    name: "Spa & Care",
    ko: "스파 & 케어",
    description: "피부와 모질 컨디션에 맞춘 머드·보습 팩과 마사지로 쉬어가는 시간입니다.",
    includes: ["피부·모질 체크", "머드 또는 보습 팩", "릴랙싱 마사지", "발바닥 보습"],
    prices: [
      { size: "~5kg", from: 35000 },
      { size: "5–10kg", from: 45000 },
    ],
    duration: "추가 약 40분",
    photo: "menu-spa",
    photoAlt: "욕조 옆에 놓인 반려견 전용 샴푸 병",
    focus: "45% 40%",
  },
  {
    no: "iv.",
    name: "Special Care",
    ko: "스페셜 케어",
    description: "노령견, 예민한 아이, 첫 미용을 앞둔 퍼피를 위해 시간을 넉넉히 비워둡니다.",
    includes: ["1:1 단독 예약", "쉬어가며 나누어 진행", "보호자 동반 상담", "컨디션 기록 공유"],
    prices: [{ size: "체중 무관", from: 0 }],
    duration: "아이에 맞춰 조율",
    photo: "menu-gentle",
    photoAlt: "담요 위에서 작은 흰 포메라니안을 부드럽게 빗질하는 사람",
    focus: "40% 50%",
  },
];

export const won = (n: number) => `${n.toLocaleString("ko-KR")}`;
