import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import styles from "./Interlude.module.css";

/** 섹션 사이의 전면 사진 페이지 — 화보의 한 장처럼 숨을 고르는 구간 */
export default function Interlude() {
  return (
    <section className={styles.band} aria-label="Interlude">
      <Photo
        name="interlude-maltese"
        alt="햇살이 드는 침구 위에 편안하게 엎드린 크림색 몰티즈"
        ratio="auto"
        sizes="100vw"
        focus="62% 55%"
        className={styles.photo}
      />
      <div className={styles.scrim} aria-hidden="true" />
      <Reveal className={styles.quote}>
        <p className="label">Interlude — p. 15</p>
        <blockquote>
          <p className="display">
            Slow is our
            <br />
            <em>favourite</em> speed.
          </p>
        </blockquote>
        <p className={styles.ko}>미용이 끝난 뒤에도 편히 잠들 수 있도록.</p>
      </Reveal>
    </section>
  );
}
