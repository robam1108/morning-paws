import type { FormValues } from "./model";

export type SubmitResult = { kind: "sent" } | { kind: "demo" } | { kind: "error"; message: string };

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

/**
 * 예약 "신청" 전송.
 * - VITE_FORM_ENDPOINT 가 있으면 JSON 으로 POST 한다 (Formspree 등 폼 수집 서비스 호환).
 *   HTTP 2xx 일 때만 접수로 본다.
 * - 없으면 데모 모드: 아무것도 전송하지 않고, 화면에도 "전송되지 않았다"고 그대로 알린다.
 * 어느 경우에도 예약이 "확정"되었다고 안내하지 않는다.
 */
export async function submitRequest(values: FormValues): Promise<SubmitResult> {
  // 허니팟이 채워졌다면 봇으로 보고 조용히 데모 처리
  if (values.website) return { kind: "demo" };

  if (!ENDPOINT) {
    await new Promise((r) => setTimeout(r, 700));
    return { kind: "demo" };
  }

  const payload = {
    _subject: `[MORNING PAWS] 예약 신청 — ${values.dogName} (${values.breed})`,
    guardian: values.guardian,
    phone: values.phone,
    dogName: values.dogName,
    breed: values.breed,
    size: values.size,
    service: values.service,
    date: values.date,
    message: values.message,
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) return { kind: "error", message: `전송에 실패했어요 (HTTP ${res.status}). 잠시 후 다시 시도해 주세요.` };
    return { kind: "sent" };
  } catch {
    return { kind: "error", message: "네트워크 문제로 전송하지 못했어요. 입력하신 내용은 그대로 남아 있습니다." };
  } finally {
    clearTimeout(timer);
  }
}
