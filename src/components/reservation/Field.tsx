import type { ReactNode } from "react";
import styles from "./Reservation.module.css";

type Props = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  wide?: boolean;
  children: (a11y: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
};

/** 라벨·도움말·오류 메시지 연결을 한 곳에서 처리하는 입력 래퍼 */
export default function Field({ id, label, hint, error, required, wide, children }: Props) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`${styles.field} ${wide ? styles.wide : ""} ${error ? styles.hasError : ""}`}>
      <label htmlFor={id} className={styles.fieldLabel}>
        {label}
        {required && (
          <span className={styles.req} aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy })}
      {hint && !error && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
