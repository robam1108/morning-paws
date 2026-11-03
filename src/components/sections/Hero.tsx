import Photo from "../ui/Photo";
import { BOOKING_ID, SITE } from "../../content/site";
import styles from "./Hero.module.css";

/**
 * 01 — Hero
 * 좌우 2단이 아니라, 거대한 세리프 헤드라인이 세로 사진 위로 걸쳐 흐르는 표지(cover) 구성.
 * 마지막 줄 "every day." 가 사진 위에 겹쳐 텍스트와 이미지가 한 장면이 된다.
 */
export default function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.topline}>
        <span className="label">Vol. 01 — The Morning Issue</span>
        <span className={`label ${styles.toplineRight}`}>
          Boutique pet grooming · {SITE.city} · Est. {SITE.established}
        </span>
      </div>

      <div className={styles.stage}>
        <h1 id="hero-title" className={`display ${styles.headline}`}>
          <span className={styles.line}>
            <span className={styles.l1}>Good hair</span>
          </span>
          <span className={styles.line}>
            <span className={styles.l2}>day,</span>
          </span>
          <span className={styles.line}>
            <span className={styles.l3}>
              <em>every</em> day.
            </span>
          </span>
        </h1>

        <figure className={styles.cover}>
          <Photo
            name="hero-bichon"
            alt="밝은 스튜디오에서 둥근 의자 위에 앉아 웃고 있는 하얀 비숑 프리제"
            ratio="auto"
            sizes="(min-width: 1024px) 42vw, (min-width: 768px) 52vw, 100vw"
            focus="50% 30%"
            priority
            className={styles.coverFrame}
            imgClassName={styles.coverImg}
          />
          <figcaption className={`label ${styles.coverCaption}`}>
            <span>Cover</span>
            <span>Bichon frisé, after a slow bath</span>
          </figcaption>
        </figure>

        <figure className={styles.plate}>
          <Photo
            name="hero-plate"
            alt="흰 배경 위에 엎드려 위를 올려다보는 작은 크림색 강아지"
            ratio="3 / 4"
            sizes="(min-width: 1024px) 15vw, 0px"
            focus="55% 60%"
            className={styles.plateFrame}
          />
          <figcaption className={styles.plateCaption}>
            <span className="label">Fig. 1</span> 기다리는 시간도 편안하게.
          </figcaption>
        </figure>

        <div className={styles.copy}>
          <p className={`display ${styles.tagline}`}>
            <em>{SITE.tagline}</em>
          </p>
          <p className={styles.ko}>
            예쁜 모습보다 편안한 시간이 먼저니까.
            <br />
            우리 아이에게 가장 다정한 미용 시간을 선물합니다.
          </p>
          <div className={styles.actions}>
            <a href={`#${BOOKING_ID}`} className="btn">
              예약 신청하기 <span className="btn__arrow" aria-hidden="true" />
            </a>
            <a href="#menu" className={`ink-link ${styles.secondary}`}>
              그루밍 메뉴 보기
            </a>
          </div>
        </div>

        <p className={`label ${styles.vertical}`} aria-hidden="true">
          A little care, a lot of love — p. 01
        </p>
      </div>

      <div className={styles.foot} aria-hidden="true">
        <span className="label">By appointment only</span>
        <span className={styles.footRule} />
        <span className="label">One pup at a time</span>
        <span className={styles.footRule} />
        <span className={`label ${styles.scroll}`}>Scroll</span>
      </div>
    </section>
  );
}
