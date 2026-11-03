import Folio from "../ui/Folio";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import { NOTES } from "../../content/notes";
import styles from "./Reviews.module.css";

const RATIOS = ["3 / 4", "4 / 5", "1 / 1"];

/** 07 — Reviews: 카드 반복 대신 세 개의 인용문이 지그재그로 흐르는 지면 */
export default function Reviews() {
  return (
    <section id="notes" className={styles.section} aria-labelledby="notes-title">
      <div className={styles.wrap}>
        <Folio no="07" title="Notes" page="p. 24" />

        <div className={styles.head}>
          <Reveal>
            <h2 id="notes-title" className={`display ${styles.title}`}>
              Little notes from
              <br />
              <em>happy families.</em>
            </h2>
          </Reveal>
          <p className={styles.demo}>
            <span className="label">Sample notes</span> 포트폴리오용 가상 후기입니다
          </p>
        </div>

        <ol className={styles.list}>
          {NOTES.map((n, i) => (
            <li key={n.dog} className={`${styles.note} ${styles[`v${i}`]}`}>
              <Reveal className={styles.media}>
                <div className="zoom-frame">
                  <Photo name={n.photo} alt={n.alt} ratio={RATIOS[i]} sizes="(min-width: 1024px) 22vw, 45vw" focus={n.focus} />
                </div>
              </Reveal>
              <Reveal as="figure" className={styles.quoteBlock} delay={100}>
                <span className={styles.mark} aria-hidden="true">
                  “
                </span>
                <blockquote className={styles.quote}>
                  <p>{n.quote}</p>
                </blockquote>
                <figcaption className={styles.by}>
                  <span className={`display ${styles.dog}`}>
                    <em>{n.dog}</em>
                  </span>
                  <span className="label">
                    {n.breed} · {n.age}
                  </span>
                  <span className={`label ${styles.service}`}>{n.service}</span>
                </figcaption>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
