import Folio from "../ui/Folio";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import styles from "./GroomerNote.module.css";

/**
 * 06 — Groomer's Note
 * 프로필 카드가 아니라, 미용사가 보호자에게 쓰는 짧은 편지 형식.
 * 인물·경력은 포트폴리오용 가상 정보이며 사진은 스톡 이미지다.
 */
const COLOPHON = [
  {
    term: "Speciality",
    items: ["소형견 시저 컷 · 얼굴 라인", "노령견 · 예민한 아이 분할 미용", "첫 미용 퍼피 적응 케어"],
  },
  {
    term: "Background",
    items: ["반려동물 미용 경력 9년 (예시)", "애견미용 관련 자격 보유 (예시)", "반려견 행동 이해 교육 수료 (예시)"],
  },
  {
    term: "Promise",
    items: ["시술 전 컨디션 상담", "진행 중 사진·메모 공유", "무리하지 않으면 멈춘다"],
  },
];

export default function GroomerNote() {
  return (
    <section id="groomer" className={styles.section} aria-labelledby="groomer-title">
      <div className={styles.wrap}>
        <Folio no="06" title="Groomer's note" page="p. 20" />
      </div>

      <div className={styles.spread}>
        <div className={styles.block} aria-hidden="true" />
        <Reveal className={`zoom-frame ${styles.photo}`}>
          <Photo
            name="groomer"
            alt="따뜻한 조명 아래 미용 테이블 위의 하얀 스피츠를 빗질하는 미용사"
            ratio="3 / 2"
            sizes="(min-width: 1024px) 64vw, 100vw"
            focus="55% 45%"
          />
        </Reveal>
        <p className={`label ${styles.photoCaption}`}>Fig. 6 — Head groomer at the table (stock image)</p>

        <Reveal className={styles.letter} delay={120}>
          <h2 id="groomer-title" className={`display ${styles.title}`}>
            Gentle hands,
            <br />
            <em>thoughtful care.</em>
          </h2>
          <div className={styles.body}>
            <p>
              처음 만난 날, 저는 가위보다 손바닥을 먼저 내밉니다. 냄새를 맡고, 꼬리가 조금 풀리고, 테이블 위에서
              숨이 고르게 바뀌는 순간까지 기다려요.
            </p>
            <p>
              예쁜 컷은 그다음입니다. 오늘 이 아이가 편안했는지, 집에 돌아가서도 그 기분이 이어지는지 — 그게
              제가 매일 아침 확인하는 기준이에요.
            </p>
          </div>
          <p className={styles.sign}>
            <span className="display">
              <em>Haneul</em>
            </span>
            <span className="label">Head groomer · 가상 인물</span>
          </p>
        </Reveal>
      </div>

      <div className={styles.wrap}>
        <dl className={styles.colophon}>
          {COLOPHON.map((c, i) => (
            <Reveal key={c.term} className={styles.col} delay={i * 90}>
              <dt className="label">{c.term}</dt>
              {c.items.map((it) => (
                <dd key={it}>{it}</dd>
              ))}
            </Reveal>
          ))}
        </dl>
        <p className={styles.demo}>미용사 이름·경력·자격은 포트폴리오용 예시이며 실제 인물이나 실제 자격을 주장하지 않습니다.</p>
      </div>
    </section>
  );
}
