import { NAV, SITE } from "../../content/site";
import { PHOTO_META } from "../../content/photos.generated";
import styles from "./Footer.module.css";

const YEAR = new Date().getFullYear();

export default function Footer() {
  const credits = Object.entries(PHOTO_META);

  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.cols}>
          <div className={styles.about}>
            <p className={`display ${styles.tagline}`}>
              <em>{SITE.tagline}</em>
            </p>
            <p className={styles.desc}>{SITE.descriptionKo}</p>
          </div>

          <div>
            <p className="label">Contact</p>
            <ul className={styles.list}>
              <li>{SITE.address.line1}</li>
              <li>{SITE.phone} (예시)</li>
              <li>Kakao {SITE.kakao} (예시)</li>
            </ul>
          </div>

          <div>
            <p className="label">Hours</p>
            <ul className={styles.list}>
              {SITE.hours.map((h) => (
                <li key={h.day}>
                  {h.ko} {h.time}
                </li>
              ))}
              <li>{SITE.closed.ko}</li>
            </ul>
          </div>

          <div>
            <p className="label">Index</p>
            <ul className={styles.list}>
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className={styles.link}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label">Social</p>
            <ul className={styles.list}>
              <li>Instagram {SITE.instagram}</li>
              <li>Blog — morning notes</li>
              <li className={styles.small}>SNS 계정은 예시이며 연결되지 않습니다</li>
            </ul>
          </div>
        </div>

        <p className={styles.wordmark} aria-hidden="true">
          Morning <em>Paws</em>
        </p>

        <div className={styles.bottom}>
          <p>© {YEAR} MORNING PAWS — Portfolio concept. 가상 브랜드이며 실제 영업하는 매장이 아닙니다.</p>
          <details className={styles.credits}>
            <summary>Photo credits</summary>
            <p>Unsplash License · Pexels License 사진을 사용했습니다. 실제 매장·고객·시술 사진이 아닙니다.</p>
            <ul>
              {credits.map(([name, m]) => (
                <li key={name}>
                  <a href={m.page} target="_blank" rel="noreferrer noopener" className={styles.link}>
                    {name}
                  </a>
                  <span> · {m.provider}</span>
                </li>
              ))}
            </ul>
          </details>
          <a href="#top" className={`label ${styles.top}`}>
            Back to cover ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
