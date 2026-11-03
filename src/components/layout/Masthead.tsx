import { useEffect, useRef, useState } from "react";
import { BOOKING_ID, NAV, SITE } from "../../content/site";
import styles from "./Masthead.module.css";

const LEFT = NAV.slice(0, 4);
const RIGHT = NAV.slice(4);

/**
 * 잡지의 제호(masthead)처럼 브랜드명을 가운데에 두고 메뉴를 양쪽으로 나눈다.
 * 1200px 미만에서는 "Index" 버튼 하나로 접고, 전체 화면 목차를 연다.
 */
export default function Masthead() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 목차가 열려 있는 동안: 배경 스크롤 잠금, Esc 로 닫기, 포커스를 패널 안에 둔다.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
    <header className={`${styles.bar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <nav className={styles.side} aria-label="주요 메뉴 (앞)">
          <button
            ref={toggleRef}
            type="button"
            className={`${styles.indexBtn} label`}
            aria-expanded={open}
            aria-controls="site-index"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.burger} aria-hidden="true">
              <span />
              <span />
            </span>
            {open ? "Close" : "Index"}
          </button>
          <ul className={styles.links}>
            {LEFT.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={styles.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#top" className={styles.brand} aria-label={`${SITE.name} 맨 위로`}>
          <span className={styles.wordmark}>
            Morning <em>Paws</em>
          </span>
          <span className={styles.sub}>Grooming studio — {SITE.city}</span>
        </a>

        <nav className={`${styles.side} ${styles.right}`} aria-label="주요 메뉴 (뒤)">
          <ul className={styles.links}>
            {RIGHT.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={styles.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={`#${BOOKING_ID}`} className={styles.cta}>
            <span className={styles.ctaLong}>Request a visit</span>
            <span className={styles.ctaShort}>Book</span>
          </a>
        </nav>
      </div>
    </header>

      {/* header 의 backdrop-filter 가 fixed 기준 박스를 바꾸므로 목차는 header 밖에 둔다 */}
      <div
        id="site-index"
        ref={panelRef}
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="사이트 목차"
        hidden={!open}
      >
        <div className={styles.panelHead}>
          <span className="label">Contents</span>
          <button type="button" className={`${styles.closeBtn} label`} onClick={close}>
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <ol className={styles.toc}>
          {NAV.map((item, i) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={close} className={styles.tocLink}>
                <span className={styles.tocNo}>{String(i + 2).padStart(2, "0")}</span>
                <span className={styles.tocLabel}>{item.label}</span>
                <span className={styles.tocKo}>{item.ko}</span>
              </a>
            </li>
          ))}
        </ol>
        <div className={styles.panelFoot}>
          <a href={`#${BOOKING_ID}`} onClick={close} className="btn btn--light">
            Request a visit <span className="btn__arrow" aria-hidden="true" />
          </a>
          <p className={styles.panelNote}>
            {SITE.hours[0].ko} {SITE.hours[0].time} · {SITE.closed.ko}
          </p>
        </div>
      </div>
    </>
  );
}
