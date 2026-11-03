import Folio from "../ui/Folio";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import styles from "./Philosophy.module.css";

const PACE = [
  { no: "i.", title: "첫 10분은 인사하는 시간", body: "도구 냄새를 맡고, 공간을 둘러보고, 손에 익숙해질 때까지 기다립니다." },
  { no: "ii.", title: "한 번에 한 아이만", body: "같은 시간에 여러 마리를 받지 않습니다. 짖는 소리 없는 조용한 테이블에서." },
  { no: "iii.", title: "쉬고 싶다면, 쉬어갑니다", body: "힘들어하는 신호가 보이면 멈추고, 물을 마시고, 다시 시작합니다." },
];

/** 02 — Philosophy: 화면 왼쪽 끝까지 붙은 세로 사진 + 반대편의 큰 타이포그래피 */
export default function Philosophy() {
  return (
    <section id="philosophy" className={styles.section} aria-labelledby="philosophy-title">
      <div className={styles.folioWrap}>
        <Folio no="02" title="Philosophy" page="p. 04" />
      </div>

      <div className={styles.grid}>
        <div className={styles.media}>
          <Reveal className={`zoom-frame ${styles.mainFrame}`}>
            <Photo
              name="care-brushing"
              alt="나무 바닥에 편하게 엎드린 강아지의 털을 슬리커 브러시로 천천히 빗어주는 손"
              ratio="3 / 4"
              sizes="(min-width: 1024px) 44vw, 100vw"
              focus="50% 60%"
            />
          </Reveal>
          <Reveal className={styles.inset} delay={150}>
            <Photo
              name="care-blanket"
              alt="담요를 덮은 작은 흰 강아지를 품에 안고 빗질하는 모습"
              ratio="5 / 4"
              sizes="(min-width: 1024px) 20vw, 50vw"
              focus="55% 45%"
            />
            <p className={`label ${styles.insetCaption}`}>Fig. 2 — Brushing, slowly</p>
          </Reveal>
        </div>

        <div className={styles.text}>
          <Reveal>
            <h2 id="philosophy-title" className={`display ${styles.title}`}>
              More than grooming,
              <br />
              <em>a moment</em> of care.
            </h2>
          </Reveal>

          <Reveal delay={100} className={styles.intro}>
            <p className="lead">
              아이마다 다른 성격과 컨디션을 이해하고,
              <br />
              서두르지 않고 천천히 케어합니다.
            </p>
            <p className={styles.body}>
              반려동물에게 미용은 외모를 가꾸는 시간이기 전에, 낯선 공간에서 몸을 맡기는 시간입니다. MORNING
              PAWS 는 오늘의 기분과 몸 상태를 먼저 살피고, 그 아이의 속도에 맞춰 손을 움직입니다.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <dl className={styles.pace}>
              <dt className="label">Our pace</dt>
              {PACE.map((p) => (
                <dd key={p.no} className={styles.paceRow}>
                  <span className={styles.paceNo}>{p.no}</span>
                  <span>
                    <strong className={styles.paceTitle}>{p.title}</strong>
                    <span className={styles.paceBody}>{p.body}</span>
                  </span>
                </dd>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
