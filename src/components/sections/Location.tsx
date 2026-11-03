import { useState } from "react";
import Folio from "../ui/Folio";
import Reveal from "../ui/Reveal";
import { BOOKING_ID, SITE } from "../../content/site";
import styles from "./Location.module.css";

/**
 * 09 — Location
 * 가상 브랜드이므로 실제 지도 API 대신, 위치를 특정하지 않는 일러스트 지도를 그린다.
 * 실제 운영 시 이 자리를 카카오맵/네이버 지도 임베드로 교체한다.
 */
export default function Location() {
  const [kakaoNote, setKakaoNote] = useState(false);

  return (
    <section id="location" className={styles.section} aria-labelledby="location-title">
      <div className={styles.wrap}>
        <Folio no="09" title="Location" page="p. 32" />

        <div className={styles.layout}>
          <Reveal className={styles.mapCol}>
            <figure className={styles.map}>
              <IllustratedMap />
              <figcaption className={`label ${styles.mapCaption}`}>
                <span>Map — illustration</span>
                <span>지도 예시 · 가상 위치</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className={styles.info}>
            <Reveal>
              <h2 id="location-title" className={`display ${styles.title}`}>
                Come say
                <br />
                <em>good morning.</em>
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <dl className={styles.table}>
                <div className={styles.row}>
                  <dt className="label">Address</dt>
                  <dd>
                    {SITE.address.line1}
                    <span className={styles.muted}>{SITE.address.line2}</span>
                  </dd>
                </div>
                <div className={styles.row}>
                  <dt className="label">Hours</dt>
                  <dd>
                    {SITE.hours.map((h) => (
                      <span key={h.day} className={styles.hour}>
                        <span>{h.ko}</span>
                        <span className={styles.time}>{h.time}</span>
                      </span>
                    ))}
                    <span className={styles.muted}>{SITE.lastBooking}</span>
                  </dd>
                </div>
                <div className={styles.row}>
                  <dt className="label">Closed</dt>
                  <dd>{SITE.closed.ko}</dd>
                </div>
                <div className={styles.row}>
                  <dt className="label">Call</dt>
                  <dd>
                    {SITE.phone} <span className={styles.muted}>(예시 번호 · 연결되지 않습니다)</span>
                  </dd>
                </div>
                <div className={styles.row}>
                  <dt className="label">Kakao</dt>
                  <dd>
                    <button
                      type="button"
                      className={`ink-link ${styles.kakao}`}
                      aria-expanded={kakaoNote}
                      aria-controls="kakao-note"
                      onClick={() => setKakaoNote((v) => !v)}
                    >
                      카카오톡 채널 {SITE.kakao} 상담
                    </button>
                    {kakaoNote && (
                      <span id="kakao-note" className={styles.muted} role="status">
                        포트폴리오 데모라 실제 채널은 없습니다. 실제 운영 시 채널 상담 링크가 연결됩니다.
                      </span>
                    )}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={160} className={styles.actions}>
              <a href={`#${BOOKING_ID}`} className="btn">
                예약 신청하기 <span className="btn__arrow" aria-hidden="true" />
              </a>
              <p className={styles.parking}>주차 1대 가능 · 방문 전 미리 말씀해 주세요 (예시)</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 선으로만 그린 동네 지도 — 실제 지형이 아니다 */
function IllustratedMap() {
  return (
    <svg viewBox="0 0 640 520" role="img" aria-label="매장 위치를 표시한 일러스트 지도 (가상 위치)" className={styles.svg}>
      <rect width="640" height="520" fill="var(--oat-deep)" />
      {/* 공원 */}
      <path d="M408 300 L560 284 L590 420 L430 446 Z" fill="var(--olive)" opacity="0.22" />
      <text x="470" y="372" className={styles.mapText}>
        Morning Park
      </text>
      {/* 개천 */}
      <path d="M-10 452 C120 410 220 470 330 438 S540 470 650 430" fill="none" stroke="var(--sand)" strokeWidth="18" />
      {/* 큰 길 */}
      <g stroke="var(--ink)" strokeOpacity="0.55" fill="none">
        <path d="M0 196 L640 150" strokeWidth="2" />
        <path d="M232 0 L278 520" strokeWidth="2" />
      </g>
      {/* 골목 */}
      <g stroke="var(--ink)" strokeOpacity="0.22" fill="none" strokeWidth="1">
        <path d="M0 96 L640 60" />
        <path d="M0 300 L400 270" />
        <path d="M0 380 L640 340" />
        <path d="M90 0 L120 520" />
        <path d="M380 0 L408 300" />
        <path d="M500 0 L520 284" />
        <path d="M150 196 L170 380" />
        <path d="M330 170 L344 360" />
      </g>
      <text x="40" y="186" className={styles.mapText}>
        Achim-gil
      </text>
      <text x="246" y="40" className={styles.mapText} transform="rotate(84 246 40)">
        Main st.
      </text>
      {/* 매장 표시 */}
      <g transform="translate(318 222)">
        <circle r="34" fill="var(--terracotta)" opacity="0.18" className={styles.pulse} />
        <circle r="9" fill="var(--terracotta)" />
        <line x1="0" y1="-9" x2="0" y2="-62" stroke="var(--ink)" strokeWidth="1" />
        <text x="8" y="-56" className={styles.mapPin}>
          MORNING PAWS
        </text>
        <text x="8" y="-40" className={styles.mapText}>
          12, ground floor
        </text>
      </g>
      {/* 방위 */}
      <g transform="translate(590 52)">
        <circle r="18" fill="none" stroke="var(--ink)" strokeOpacity="0.4" />
        <path d="M0 -12 L4 4 L0 1 L-4 4 Z" fill="var(--ink)" />
        <text x="-4" y="-24" className={styles.mapText}>
          N
        </text>
      </g>
    </svg>
  );
}
