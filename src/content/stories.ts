import type { PhotoName } from "./photos.generated";

/**
 * Before & After 예시.
 * 실제 시술 사례가 아니다 — 라이선스 스톡 사진으로 "이런 변화"를 연출한 데모이며,
 * 전·후 사진이 같은 아이가 아닐 수 있다. 실제 운영 시 매장에서 촬영한 동일 반려견의
 * 전후 사진으로 교체한다. 화면에도 같은 안내를 표시한다.
 */
export type Story = {
  no: string;
  breed: string;
  style: string;
  note: string;
  before: { photo: PhotoName; alt: string; focus?: string };
  after: { photo: PhotoName; alt: string; focus?: string };
};

export const STORIES: Story[] = [
  {
    no: "01",
    breed: "Toy Poodle",
    style: "Teddy round cut",
    note: "자라서 눈을 덮던 얼굴 털을 둥글게 정리하고, 귀 라인은 길게 남겨 부드러운 인상으로.",
    before: { photo: "ba-poodle-before", alt: "얼굴 털이 길게 자라 곱슬하게 뻗친 흰 푸들", focus: "50% 35%" },
    after: { photo: "ba-poodle-after", alt: "얼굴을 둥글게 정리한 흰 푸들 정면", focus: "50% 45%" },
  },
  {
    no: "02",
    breed: "Yorkshire Terrier",
    style: "Top-knot & trim",
    note: "눈을 가리던 앞머리를 묶어 올리고, 볼 라인은 짧게 다듬어 얼굴이 보이도록.",
    before: { photo: "ba-yorkie-before", alt: "긴 털이 얼굴을 덮은 채 엎드린 요크셔테리어", focus: "50% 50%" },
    after: { photo: "ba-yorkie-after", alt: "앞머리를 묶어 올리고 얼굴을 다듬은 요크셔테리어", focus: "50% 30%" },
  },
  {
    no: "03",
    breed: "Maltese",
    style: "Bath & fluff dry",
    note: "엉킨 털을 풀고 목욕 후 천천히 말려, 가볍고 포근한 결로.",
    before: { photo: "ba-maltese-before", alt: "털이 부스스하게 뻗친 몰티즈", focus: "50% 30%" },
    after: { photo: "ba-maltese-after", alt: "목욕 후 수건을 두르고 샤워캡을 쓴 하얀 강아지", focus: "50% 35%" },
  },
];
