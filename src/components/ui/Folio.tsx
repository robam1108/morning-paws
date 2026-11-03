import styles from "./Folio.module.css";

type Props = {
  no: string;
  title: string;
  /** 오른쪽 끝의 인쇄물식 쪽 표기 */
  page?: string;
  tone?: "ink" | "light";
};

/**
 * 잡지의 러닝 헤드처럼 섹션 맨 위에 걸리는 한 줄.
 * "02 — Philosophy ........................ p. 12"
 */
export default function Folio({ no, title, page, tone = "ink" }: Props) {
  return (
    <div className={`${styles.folio} ${tone === "light" ? styles.light : ""}`}>
      <span className="label">
        <span className={styles.no}>{no}</span>
        <span aria-hidden="true" className={styles.dash} />
        {title}
      </span>
      <span aria-hidden="true" className={styles.rule} />
      {page && (
        <span className={`label ${styles.page}`} aria-hidden="true">
          {page}
        </span>
      )}
    </div>
  );
}
