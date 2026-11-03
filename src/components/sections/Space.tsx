import Folio from "../ui/Folio";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import type { PhotoName } from "../../content/photos.generated";
import styles from "./Space.module.css";

type Plate = {
  photo: PhotoName;
  alt: string;
  ratio: string;
  sizes: string;
  focus?: string;
  no: string;
  caption: string;
  area: string;
};

const PLATES: Plate[] = [
  {
    photo: "space-bath",
    alt: "클로풋 욕조와 흑백 타일이 있는 밝은 목욕 공간, 욕조 안에 앉은 강아지가 거울에 비친다",
    ratio: "4 / 5",
    sizes: "(min-width: 1024px) 40vw, 100vw",
    focus: "45% 60%",
    no: "Pl. 1",
    caption: "The bath — 미지근한 물, 저자극 샴푸",
    area: "bath",
  },
  {
    photo: "space-room",
    alt: "자연광이 드는 크림색 벽의 방, 나무 바닥 위 의자에 수건이 개켜져 있다",
    ratio: "16 / 10",
    sizes: "(min-width: 1024px) 50vw, 100vw",
    focus: "55% 55%",
    no: "Pl. 2",
    caption: "Quiet room — 미용 전후 쉬어가는 방",
    area: "room",
  },
  {
    photo: "space-towels",
    alt: "창가 선반 위에 개켜진 올리브색과 흰색 수건, 작은 화분",
    ratio: "4 / 3",
    sizes: "(min-width: 1024px) 26vw, 70vw",
    focus: "50% 55%",
    no: "Pl. 3",
    caption: "Fresh linens, every visit",
    area: "towels",
  },
  {
    photo: "space-bench",
    alt: "나무 벤치 위에 놓인 화분과 머그컵이 있는 대기 공간의 한쪽",
    ratio: "3 / 4",
    sizes: "(min-width: 1024px) 22vw, 60vw",
    focus: "50% 55%",
    no: "Pl. 4",
    caption: "Waiting corner — 보호자 대기석",
    area: "bench",
  },
  {
    photo: "space-brush",
    alt: "크림색 배경 위의 천연모 나무 브러시",
    ratio: "4 / 5",
    sizes: "(min-width: 1024px) 16vw, 45vw",
    focus: "45% 60%",
    no: "Pl. 5",
    caption: "Natural bristle",
    area: "brush",
  },
  {
    photo: "space-bottle",
    alt: "아치 모양 오브제 앞에 놓인 갈색 유리 펌프 병",
    ratio: "4 / 5",
    sizes: "(min-width: 1024px) 18vw, 50vw",
    focus: "50% 50%",
    no: "Pl. 6",
    caption: "Gentle, fragrance-light care",
    area: "bottle",
  },
];

const NOTES = ["창이 큰 남향, 오전 자연광", "저소음 드라이어와 넓은 미용 테이블", "시술마다 테이블·도구 소독", "보호자 대기석과 미용 공간 분리"];

/** 05 — Our Space: 서로 다른 비율의 사진을 어긋나게 배치한 콜라주 */
export default function Space() {
  return (
    <section id="space" className={styles.section} aria-labelledby="space-title">
      <div className={styles.wrap}>
        <Folio no="05" title="Our space" page="p. 16" />

        <div className={styles.head}>
          <Reveal>
            <h2 id="space-title" className={`display ${styles.title}`}>
              A space
              <br />
              to feel <em>at ease.</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className={styles.intro}>
            <p className="lead">
              작은 소리에도 놀라는 아이들을 위해, 공간부터 조용하게 만들었습니다. 따뜻한 나무와 크림색 벽, 그리고
              창으로 드는 햇빛.
            </p>
          </Reveal>
        </div>

        <div className={styles.collage}>
          {PLATES.map((p, i) => (
            <Reveal key={p.photo} as="figure" className={`${styles.plate} ${styles[p.area]}`} delay={(i % 3) * 90}>
              <div className="zoom-frame">
                <Photo name={p.photo} alt={p.alt} ratio={p.ratio} sizes={p.sizes} focus={p.focus} />
              </div>
              <figcaption className={styles.caption}>
                <span className="label">{p.no}</span>
                <span>{p.caption}</span>
              </figcaption>
            </Reveal>
          ))}

          <Reveal className={styles.notes} delay={120}>
            <p className="label">Notes on the room</p>
            <ul>
              {NOTES.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <p className={styles.demo}>공간 사진은 브랜드 분위기를 보여주기 위한 라이선스 이미지이며, 실제 매장 사진이 아닙니다.</p>
      </div>
    </section>
  );
}
