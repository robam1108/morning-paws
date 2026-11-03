import { MENU } from "../../content/menu";

export type FormValues = {
  guardian: string;
  phone: string;
  dogName: string;
  breed: string;
  size: string;
  service: string;
  date: string;
  message: string;
  consent: boolean;
  /** 허니팟 — 사람에게는 보이지 않는다 */
  website: string;
};

export type Errors = Partial<Record<keyof FormValues, string>>;

export const EMPTY: FormValues = {
  guardian: "",
  phone: "",
  dogName: "",
  breed: "",
  size: "",
  service: "",
  date: "",
  message: "",
  consent: false,
  website: "",
};

export const SIZES = ["소형 · 5kg 미만", "소형 · 5–10kg", "중형 · 10–20kg", "대형 · 20kg 이상", "잘 모르겠어요"];

export const SERVICES = [...MENU.map((m) => `${m.name} · ${m.ko}`), "상담 후 결정"];

/** 오늘 기준 YYYY-MM-DD (로컬 시간) */
export function isoDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return isoDate(d);
}

export function maxDate() {
  const d = new Date();
  d.setDate(d.getDate() + 60);
  return isoDate(d);
}

const digits = (s: string) => s.replace(/\D/g, "");

/** 입력 중 하이픈 자동 정리 (010-1234-5678 / 02-123-4567 등) */
export function formatPhone(raw: string) {
  const d = digits(raw).slice(0, 11);
  if (d.startsWith("02")) {
    if (d.length <= 2) return d;
    if (d.length <= 5) return `${d.slice(0, 2)}-${d.slice(2)}`;
    if (d.length <= 9) return `${d.slice(0, 2)}-${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
    return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6, 10)}`;
  }
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
}

export function validateField(name: keyof FormValues, v: FormValues): string | undefined {
  switch (name) {
    case "guardian":
      return v.guardian.trim().length < 2 ? "보호자 성함을 2자 이상 입력해 주세요." : undefined;
    case "phone": {
      const d = digits(v.phone);
      if (!d) return "연락받으실 번호를 입력해 주세요.";
      return /^0\d{8,10}$/.test(d) ? undefined : "번호 형식을 확인해 주세요. 예) 010-1234-5678";
    }
    case "dogName":
      return v.dogName.trim() ? undefined : "아이의 이름을 알려주세요.";
    case "breed":
      return v.breed.trim() ? undefined : "견종을 입력해 주세요. 믹스라면 '믹스'라고 적어주셔도 돼요.";
    case "size":
      return v.size ? undefined : "체중 또는 크기를 선택해 주세요.";
    case "service":
      return v.service ? undefined : "희망 서비스를 선택해 주세요.";
    case "date": {
      if (!v.date) return "희망 날짜를 선택해 주세요.";
      if (v.date < minDate()) return "내일 이후의 날짜를 선택해 주세요.";
      if (v.date > maxDate()) return "예약 신청은 60일 이내 날짜만 가능합니다.";
      const day = new Date(`${v.date}T12:00:00`).getDay();
      if (day === 1) return "매주 월요일은 휴무입니다. 다른 날짜를 선택해 주세요.";
      return undefined;
    }
    case "message":
      return v.message.length > 500 ? "요청사항은 500자 이내로 적어주세요." : undefined;
    case "consent":
      return v.consent ? undefined : "개인정보 수집·이용에 동의해 주셔야 신청할 수 있어요.";
    default:
      return undefined;
  }
}

export const FIELD_ORDER: (keyof FormValues)[] = [
  "guardian",
  "phone",
  "dogName",
  "breed",
  "size",
  "service",
  "date",
  "message",
  "consent",
];

export function validateAll(v: FormValues): Errors {
  const errors: Errors = {};
  for (const name of FIELD_ORDER) {
    const e = validateField(name, v);
    if (e) errors[name] = e;
  }
  return errors;
}
