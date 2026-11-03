import { useRef, useState, type KeyboardEvent } from "react";
import Folio from "../ui/Folio";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import { STORIES } from "../../content/stories";
import styles from "./Transformations.module.css";

/**
 * 04 — Before & After: 잡지의 대비 화보(diptych)처럼 전·후 사진을 크기와 높이를 달리해 나란히 놓고,
 * 타이포그래피로 된 사례 목차로 넘겨 본다.
 */
export default function Transformations() {
  const [index, setIndex] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const story = STORIES[index];

  // 탭 목록 화살표 키 이동 (WAI-ARIA tabs 패턴)
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (index + dir + STORIES.length) % STORIES.length;
    setIndex(next);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[next]?.focus();
  };

  return (
    <section id="transformations" className={styles.section} aria-labelledby="ba-title">
      <div className={styles.wrap}>
        <Folio no="04" title="Before & After" page="p. 12" />

        <div className={styles.head}>
          <Reveal>
            <h2 id="ba-title" className={`display ${styles.title}`}>
              Little
              <br />
              <em>transformations.</em>
            </h2>
          </Reveal>
        </div>

        <div className={styles.layout}>
          <Reveal className={styles.stage}>
            <div className={styles.diptych} key={story.no} role="tabpanel" id="ba-panel" aria-labelledby={`ba-tab-${story.no}`}>
              <figure className={styles.before}>
                <Photo name={story.before.photo} alt={`Before — ${story.before.alt}`} ratio="3 / 4" sizes="(min-width: 1024px) 24vw, 44vw" focus={story.before.focus} />
                <figcaption className="label">Before</figcaption>
              </figure>
              <figure className={styles.after}>
                <Photo name={story.after.photo} alt={`After — ${story.after.alt}`} ratio="4 / 5" sizes="(min-width: 1024px) 32vw, 56vw" focus={story.after.focus} />
                <figcaption className="label">After</figcaption>
              </figure>
            </div>
          </Reveal>

          <div className={styles.side}>
            <div className={styles.caseNo} aria-hidden="true">
              <span className="display">{story.no}</span>
              <span className={styles.caseOf}>/ 0{STORIES.length}</span>
            </div>

            <div className={styles.caseText} key={story.no}>
              <p className="label">{story.breed}</p>
              <p className={`display ${styles.style}`}>
                <em>{story.style}</em>
              </p>
              <p className={styles.note}>{story.note}</p>
            </div>

            <div className={styles.tabs} role="tablist" aria-label="전후 사례 선택" ref={tabsRef} onKeyDown={onKeyDown}>
              {STORIES.map((s, i) => (
                <button
                  key={s.no}
                  id={`ba-tab-${s.no}`}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-controls="ba-panel"
                  tabIndex={i === index ? 0 : -1}
                  className={styles.tab}
                  onClick={() => setIndex(i)}
                >
                  <span className={styles.tabNo}>Case {s.no}</span>
                  <span className={styles.tabName}>{s.breed}</span>
                  <span className={styles.tabStyle}>{s.style}</span>
                </button>
              ))}
            </div>

            <p className={styles.disclaimer}>
              <span className="label">Portfolio note</span>
              실제 시술 사례가 아닌, 라이선스 스톡 사진으로 연출한 예시입니다. 전·후 사진은 같은 아이가 아닐 수
              있으며, 실제 운영 시 매장에서 촬영한 동일 반려견의 사진으로 교체됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
