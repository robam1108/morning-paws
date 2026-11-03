import type { PhotoName } from "./photos.generated";

/**
 * 보호자 후기 — 포트폴리오용 가상 문구다. 실제 고객 후기가 아니며
 * 보호자 실명 대신 가상의 반려견 이름으로 표기한다.
 */
export type Note = {
  dog: string;
  breed: string;
  age: string;
  quote: string;
  service: string;
  photo: PhotoName;
  alt: string;
  focus?: string;
};

export const NOTES: Note[] = [
  {
    dog: "Bori",
    breed: "Toy Poodle",
    age: "4 y",
    quote: "미용만 다녀오면 며칠은 예민했는데, 여기서는 중간중간 쉬게 해줘서 그런지 돌아와서도 편하게 잠들었어요.",
    service: "Full Grooming",
    photo: "review-apricot",
    alt: "회색 배경 앞에서 카메라를 바라보는 살구색 푸들",
    focus: "50% 30%",
  },
  {
    dog: "Duboo",
    breed: "Poodle mix",
    age: "11 y",
    quote: "노견이라 미용을 망설였어요. 컨디션 기록을 하나하나 공유해 주셔서 처음으로 안심하고 맡겼습니다.",
    service: "Special Care",
    photo: "review-poodle",
    alt: "밝은 배경 앞에 얌전히 앉아 있는 흰 푸들",
    focus: "50% 40%",
  },
  {
    dog: "Kongi",
    breed: "Mixed, 7 mo",
    age: "first visit",
    quote: "첫 미용이라 걱정이 많았는데, 도구 냄새부터 천천히 맡게 해주셨대요. 사진 속 표정이 너무 의젓해서 웃었어요.",
    service: "Basic Grooming",
    photo: "review-pup",
    alt: "반다나를 두르고 의자 위에 선 갈색 강아지",
    focus: "50% 40%",
  },
];
