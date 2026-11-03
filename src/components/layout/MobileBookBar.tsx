import { useEffect, useState } from "react";
import { BOOKING_ID } from "../../content/site";
import styles from "./MobileBookBar.module.css";

/**
 * 모바일 전용 하단 예약 바. 표지(hero)를 지나면 나타나고,
 * 예약 섹션이 화면에 들어오면 겹치지 않도록 숨는다.
 */
export default function MobileBookBar() {
  const [pastHero, setPastHero] = useState(false);
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const form = document.getElementById(BOOKING_ID);
    if (!hero || !form || !("IntersectionObserver" in window)) return;

    const heroIo = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { threshold: 0.05 });
    const formIo = new IntersectionObserver(([e]) => setAtForm(e.isIntersecting), { threshold: 0 });
    heroIo.observe(hero);
    formIo.observe(form);
    return () => {
      heroIo.disconnect();
      formIo.disconnect();
    };
  }, []);

  const visible = pastHero && !atForm;

  return (
    <div className={`${styles.bar} ${visible ? styles.visible : ""}`} aria-hidden={!visible}>
      <span className={styles.text}>
        <span className="label">By appointment</span>
        <span>화–일 10:00 오픈</span>
      </span>
      <a href={`#${BOOKING_ID}`} className={`btn ${styles.btn}`} tabIndex={visible ? 0 : -1}>
        Request a visit
      </a>
    </div>
  );
}
