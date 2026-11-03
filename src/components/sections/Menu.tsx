import { useState } from "react";
import Folio from "../ui/Folio";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import { MENU, won } from "../../content/menu";
import styles from "./Menu.module.css";

/**
 * 03 — Grooming Menu
 * 카드 그리드 대신 레스토랑/잡지의 메뉴판(carte). 서비스명과 가격을 점선 리더로 잇고,
 * 왼쪽의 사진 한 장이 지금 보고 있는 항목에 맞춰 바뀐다.
 */
export default function Menu() {
  const [active, setActive] = useState(0);

  return (
    <section id="menu" className={styles.section} aria-labelledby="menu-title">
      <div className={styles.wrap}>
        <Folio no="03" title="Grooming menu" page="p. 08" tone="light" />

        <header className={styles.head}>
          <Reveal>
            <h2 id="menu-title" className={`display ${styles.title}`}>
              A little something
              <br />
              <em>for every pup.</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className={styles.headNote}>
            <p>
              모든 메뉴는 상담에서 시작합니다. 같은 이름의 메뉴라도 아이의 모질과 컨디션에 따라 과정이 달라질 수
              있어요.
            </p>
            <p className={styles.demo}>* 표시된 가격은 포트폴리오용 가상 예시입니다</p>
          </Reveal>
        </header>

        <div className={styles.body}>
          <div className={styles.stickyCol} aria-hidden="true">
            <div className={styles.sticky}>
              <div className={styles.stack}>
                {MENU.map((item, i) => (
                  <Photo
                    key={item.photo}
                    name={item.photo}
                    alt=""
                    ratio="4 / 5"
                    sizes="(min-width: 1024px) 26vw, 0px"
                    focus={item.focus}
                    className={`${styles.stackItem} ${i === active ? styles.stackActive : ""}`}
                  />
                ))}
              </div>
              <p className={`label ${styles.stackCaption}`}>
                <span>Pl. {MENU[active].no}</span>
                <span>{MENU[active].name}</span>
              </p>
            </div>
          </div>

          <ol className={styles.list}>
            {MENU.map((item, i) => (
              <li
                key={item.name}
                className={`${styles.item} ${i === active ? styles.itemActive : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <Reveal>
                  <div className={styles.row}>
                    <span className={styles.no}>{item.no}</span>
                    <h3 className={styles.name}>
                      <span className={styles.nameEn}>{item.name}</span>
                      <span className={styles.nameKo}>{item.ko}</span>
                    </h3>
                    <span className={styles.leader} aria-hidden="true" />
                    <span className={styles.from}>
                      {item.prices[0].from > 0 ? (
                        <>
                          <small>from</small> {won(item.prices[0].from)}
                          <span className={styles.star}>*</span>
                        </>
                      ) : (
                        <small>by consult</small>
                      )}
                    </span>
                  </div>

                  <div className={styles.detail}>
                    <Photo
                      name={item.photo}
                      alt={item.photoAlt}
                      ratio="4 / 5"
                      sizes="(max-width: 1023px) 34vw, 0px"
                      focus={item.focus}
                      className={styles.thumb}
                    />
                    <div>
                      <p className={styles.desc}>{item.description}</p>
                      <p className={styles.includes}>
                        {item.includes.map((inc, k) => (
                          <span key={inc}>
                            {inc}
                            {k < item.includes.length - 1 && <span aria-hidden="true"> · </span>}
                          </span>
                        ))}
                      </p>
                      <dl className={styles.prices}>
                        {item.prices.map((p) => (
                          <div key={p.size} className={styles.priceRow}>
                            <dt>{p.size}</dt>
                            <dd>{p.from > 0 ? `${won(p.from)}원~` : "상담 후 안내"}</dd>
                          </div>
                        ))}
                        <div className={styles.priceRow}>
                          <dt>소요 시간</dt>
                          <dd>{item.duration}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <p className={styles.footnote}>
          10kg 이상 중·대형견, 심한 엉킴(매트), 피부 질환이 있는 경우 상담 후 금액이 안내됩니다. 가격은 실제 판매
          금액이 아닌 예시입니다.
        </p>
      </div>
    </section>
  );
}
