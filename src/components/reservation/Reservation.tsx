import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Folio from "../ui/Folio";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import Field from "./Field";
import { BOOKING_ID, SITE } from "../../content/site";
import {
  EMPTY,
  FIELD_ORDER,
  SERVICES,
  SIZES,
  formatPhone,
  maxDate,
  minDate,
  validateAll,
  validateField,
  type Errors,
  type FormValues,
} from "./model";
import { submitRequest, type SubmitResult } from "./submit";
import styles from "./Reservation.module.css";

const STEPS = [
  { no: "01", text: "예약 신청서 작성" },
  { no: "02", text: "매장에서 연락드려 상담" },
  { no: "03", text: "일정·금액 확인 후 예약 확정" },
];

/** 08 — Reservation: 예약 "신청" 폼. 제출만으로 예약이 확정되지 않는다는 점을 분명히 한다. */
export default function Reservation() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | SubmitResult["kind"]>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const update = (name: keyof FormValues, value: string | boolean) => {
    const next = { ...values, [name]: value };
    setValues(next);
    // 한 번 건드린 필드는 입력하는 동안 바로 다시 검사한다
    if (touched[name] || errors[name]) setErrors((e) => ({ ...e, [name]: validateField(name, next) }));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const key = name as keyof FormValues;
    if (type === "checkbox") return update(key, (e.target as HTMLInputElement).checked);
    update(key, key === "phone" ? formatPhone(value) : value);
  };

  const onBlur = (e: { target: { name: string } }) => {
    const key = e.target.name as keyof FormValues;
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((er) => ({ ...er, [key]: validateField(key, values) }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const all = validateAll(values);
    setErrors(all);
    const firstInvalid = FIELD_ORDER.find((k) => all[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus("sending");
    const result = await submitRequest(values);
    setStatus(result.kind);
    if (result.kind === "error") setErrorMsg(result.message);
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const done = status === "sent" || status === "demo";
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <section id={BOOKING_ID} className={styles.section} aria-labelledby="reserve-title">
      <div className={styles.wrap}>
        <Folio no="08" title="Reservation" page="p. 28" tone="light" />

        <div className={styles.layout}>
          <div className={styles.aside}>
            <Reveal>
              <h2 id="reserve-title" className={`display ${styles.title}`}>
                Let&rsquo;s make
                <br />
                <em>their day.</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className={styles.lead}>
                아이에 대해 조금만 알려주세요. 신청서를 확인한 뒤 매장에서 직접 연락드려 상담하고, 일정을
                확정합니다.
              </p>
              <ol className={styles.steps}>
                {STEPS.map((s) => (
                  <li key={s.no}>
                    <span className="label">{s.no}</span>
                    {s.text}
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={160} className={styles.asidePhoto}>
              <Photo
                name="visit-linen"
                alt="크림색과 테라코타 톤으로 차곡차곡 개켜진 린넨 타월"
                ratio="5 / 4"
                sizes="(min-width: 1024px) 26vw, 0px"
                focus="50% 55%"
              />
            </Reveal>
          </div>

          <div className={styles.formCol}>
            {done ? (
              <div ref={resultRef} tabIndex={-1} className={styles.result} role="status">
                <p className="label">{status === "demo" ? "Demo mode — not sent" : "Request received"}</p>
                <p className={`display ${styles.resultTitle}`}>
                  <em>Thank you, {values.dogName || "friend"}.</em>
                </p>
                {status === "demo" ? (
                  <p>
                    이 사이트는 포트폴리오용 데모입니다. <strong>신청 내용은 어디에도 전송되지 않았으며</strong>, 실제
                    예약도 생성되지 않았습니다. 실제 운영 시에는 이 단계에서 매장으로 신청서가 전달됩니다.
                  </p>
                ) : (
                  <p>
                    예약 <strong>신청</strong>이 접수되었습니다. 아직 확정된 예약은 아니에요. 영업시간 내에 매장에서{" "}
                    {values.phone} 으로 연락드려 일정과 금액을 안내해 드릴게요.
                  </p>
                )}
                <dl className={styles.summary}>
                  <div>
                    <dt>반려견</dt>
                    <dd>
                      {values.dogName} · {values.breed} · {values.size}
                    </dd>
                  </div>
                  <div>
                    <dt>희망 서비스</dt>
                    <dd>{values.service}</dd>
                  </div>
                  <div>
                    <dt>희망 날짜</dt>
                    <dd>{values.date}</dd>
                  </div>
                </dl>
                <button type="button" className="btn btn--light" onClick={reset}>
                  새로 작성하기
                </button>
              </div>
            ) : (
              <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate aria-describedby="form-note">
                <p id="form-note" className={styles.formNote}>
                  <span aria-hidden="true">*</span> 표시는 필수 항목입니다. 이 양식은 <strong>예약 신청</strong>이며,
                  매장의 연락을 받은 뒤 예약이 확정됩니다.
                </p>

                {errorCount > 0 && (
                  <p className={styles.errorSummary} role="alert">
                    확인이 필요한 항목이 {errorCount}개 있어요.
                  </p>
                )}

                <fieldset className={styles.group}>
                  <legend className="label">Guardian · 보호자</legend>
                  <Field id="f-guardian" label="보호자 이름" required error={errors.guardian}>
                    {(a) => (
                      <input {...a} name="guardian" type="text" autoComplete="name" value={values.guardian} onChange={onChange} onBlur={onBlur} />
                    )}
                  </Field>
                  <Field id="f-phone" label="연락처" required error={errors.phone} hint="예약 확정을 위해 연락드릴 번호">
                    {(a) => (
                      <input
                        {...a}
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        placeholder="010-0000-0000"
                        value={values.phone}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  </Field>
                </fieldset>

                <fieldset className={styles.group}>
                  <legend className="label">Pup · 반려견</legend>
                  <Field id="f-dog" label="반려견 이름" required error={errors.dogName}>
                    {(a) => <input {...a} name="dogName" type="text" value={values.dogName} onChange={onChange} onBlur={onBlur} />}
                  </Field>
                  <Field id="f-breed" label="견종" required error={errors.breed}>
                    {(a) => (
                      <input {...a} name="breed" type="text" placeholder="예) 비숑 프리제, 믹스" value={values.breed} onChange={onChange} onBlur={onBlur} />
                    )}
                  </Field>
                  <Field id="f-size" label="체중 / 크기" required error={errors.size}>
                    {(a) => (
                      <select {...a} name="size" value={values.size} onChange={onChange} onBlur={onBlur}>
                        <option value="">선택해 주세요</option>
                        {SIZES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    )}
                  </Field>
                  <Field id="f-service" label="희망 서비스" required error={errors.service}>
                    {(a) => (
                      <select {...a} name="service" value={values.service} onChange={onChange} onBlur={onBlur}>
                        <option value="">선택해 주세요</option>
                        {SERVICES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    )}
                  </Field>
                  <Field id="f-date" label="희망 날짜" required error={errors.date} hint="월요일 휴무 · 60일 이내" wide>
                    {(a) => (
                      <input {...a} name="date" type="date" min={minDate()} max={maxDate()} value={values.date} onChange={onChange} onBlur={onBlur} />
                    )}
                  </Field>
                  <Field id="f-message" label="요청사항" error={errors.message} hint="성격, 예민한 부위, 피부 상태, 원하는 스타일 등" wide>
                    {(a) => <textarea {...a} name="message" rows={4} maxLength={500} value={values.message} onChange={onChange} onBlur={onBlur} />}
                  </Field>
                </fieldset>

                {/* 허니팟: 화면과 보조기기에서 모두 숨긴다 */}
                <div className={styles.trap} aria-hidden="true">
                  <label>
                    Website
                    <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
                  </label>
                </div>

                <div className={`${styles.consent} ${errors.consent ? styles.hasError : ""}`}>
                  <label className={styles.check}>
                    <input
                      type="checkbox"
                      name="consent"
                      checked={values.consent}
                      onChange={onChange}
                      onBlur={onBlur}
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? "f-consent-error" : "f-consent-desc"}
                    />
                    <span className={styles.box} aria-hidden="true" />
                    <span>
                      개인정보 수집·이용에 동의합니다 <span className={styles.req}>*</span>
                    </span>
                  </label>
                  <p id="f-consent-desc" className={styles.hint}>
                    수집 항목: 이름, 연락처, 반려견 정보 · 목적: 예약 상담 · 보관: 상담 완료 후 3개월
                  </p>
                  {errors.consent && (
                    <p id="f-consent-error" className={styles.error}>
                      {errors.consent}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p ref={resultRef} tabIndex={-1} className={styles.errorSummary} role="alert">
                    {errorMsg}
                  </p>
                )}

                <div className={styles.submitRow}>
                  <button type="submit" className={`btn btn--light ${styles.submit}`} disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Request a visit"}
                    <span className="btn__arrow" aria-hidden="true" />
                  </button>
                  <p className={styles.submitNote}>
                    신청 후 영업시간 내 연락드립니다
                    <br />
                    {SITE.closed.ko}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
