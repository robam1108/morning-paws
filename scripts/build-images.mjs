// 사진 원본을 내려받아(assets-source/, 캐시) public/images/ 에 반응형 webp 로 변환하고
// 각 사진의 비율 정보를 src/content/photos.generated.ts 로 기록한다.
//
//   npm run images:build
//
// 모든 사진은 Unsplash License 또는 Pexels License(상업적 사용 가능, 출처 표기 의무 없음)
// 사진이다. 출처 링크는 CREDITS.md 에 함께 생성된다.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "assets-source");
const OUT_DIR = path.join(ROOT, "public/images");

const L = [640, 1080, 1600, 2200]; // 화면을 크게 차지하는 사진
const M = [480, 800, 1200]; // 중간 크기
const S = [360, 640]; // 작은 썸네일

/** name, provider, id(다운로드 키), page(출처 페이지), widths */
const PHOTOS = [
  ["hero-bichon", "pexels", "13723455/pexels-photo-13723455.jpeg", "https://www.pexels.com/photo/13723455/", L],
  ["hero-plate", "pexels", "38858505/pexels-photo-38858505.jpeg", "https://www.pexels.com/photo/38858505/", M],
  ["care-brushing", "pexels", "8498858/pexels-photo-8498858.jpeg", "https://www.pexels.com/photo/8498858/", L],
  ["care-blanket", "unsplash", "photo-1675430426271-d74b542f21e4", "https://unsplash.com/photos/C1k32M4ii2k", M],
  ["menu-bath", "unsplash", "photo-1647002380358-fc70ed2f04e0", "https://unsplash.com/photos/ldIghI2FIA0", M],
  ["menu-scissor", "unsplash", "photo-1719464454959-9cf304ef4774", "https://unsplash.com/photos/LpK2xddrElI", M],
  ["menu-spa", "pexels", "19021958/pexels-photo-19021958.jpeg", "https://www.pexels.com/photo/19021958/", M],
  ["menu-gentle", "unsplash", "photo-1787813583412-48f6101e92e3", "https://unsplash.com/photos/t-NQ59k3Luk", M],
  ["ba-poodle-before", "unsplash", "photo-1629098937081-973871586213", "https://unsplash.com/photos/-07ActS1iew", M],
  ["ba-poodle-after", "unsplash", "photo-1771858594034-4239c978c9cb", "https://unsplash.com/photos/XiRsX7an0lk", M],
  ["ba-yorkie-before", "pexels", "57420/yorkshire-terrier-dog-small-dog-57420.jpeg", "https://www.pexels.com/photo/57420/", M],
  ["ba-yorkie-after", "unsplash", "photo-1749397947099-b183475bd5a4", "https://unsplash.com/photos/icqKgX8rYMc", M],
  ["ba-maltese-before", "pexels", "26201100/pexels-photo-26201100.jpeg", "https://www.pexels.com/photo/26201100/", M],
  ["ba-maltese-after", "unsplash", "photo-1733964659477-35534815c626", "https://unsplash.com/photos/SpAdugxTZVQ", M],
  ["interlude-maltese", "unsplash", "photo-1700684072190-23b8b87900cc", "https://unsplash.com/photos/ugutiarJXz4", L],
  ["space-bath", "pexels", "8343349/pexels-photo-8343349.jpeg", "https://www.pexels.com/photo/8343349/", L],
  ["space-room", "unsplash", "photo-1721272225279-c6612d3be01b", "https://unsplash.com/photos/yigi6Y7v2x8", M],
  ["space-bench", "unsplash", "photo-1654124803743-edd84b769425", "https://unsplash.com/photos/abrdwsiUEQA", M],
  ["space-towels", "unsplash", "photo-1574421233376-06f2ccf017f7", "https://unsplash.com/photos/BB3dR-N5Npg", M],
  ["space-brush", "unsplash", "photo-1626897844961-c15509dde465", "https://unsplash.com/photos/T_s8QZvS2Cw", S.concat(1000)],
  ["space-bottle", "pexels", "8167172/pexels-photo-8167172.jpeg", "https://www.pexels.com/photo/8167172/", M],
  ["groomer", "unsplash", "photo-1528846104175-4fd300ee59da", "https://unsplash.com/photos/dHIRbh9En6I", L],
  ["review-apricot", "unsplash", "photo-1652342516868-50eac8c9af0d", "https://unsplash.com/photos/rkEJ0JuevBg", M],
  ["review-poodle", "unsplash", "photo-1513189643435-49f97650b367", "https://unsplash.com/photos/DqRXz74Qj6s", M],
  ["review-pup", "unsplash", "photo-1782235813253-4aef49032fb8", "https://unsplash.com/photos/4Bbp8XtBDbQ", M],
  ["visit-linen", "unsplash", "photo-1524404794194-16bae22718c0", "https://unsplash.com/photos/4byBtNuIyIg", M],
];

const downloadUrl = (provider, id) =>
  provider === "unsplash"
    ? `https://images.unsplash.com/${id}?w=2400&q=90&fm=jpg`
    : `https://images.pexels.com/photos/${id}?auto=compress&cs=tinysrgb&w=2400`;

await fs.mkdir(SRC_DIR, { recursive: true });
await fs.mkdir(OUT_DIR, { recursive: true });

const meta = {};
for (const [name, provider, id, page, widths] of PHOTOS) {
  const raw = path.join(SRC_DIR, `${name}.jpg`);
  try {
    await fs.access(raw);
  } catch {
    const res = await fetch(downloadUrl(provider, id));
    if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
    await fs.writeFile(raw, Buffer.from(await res.arrayBuffer()));
  }

  const img = sharp(raw).rotate();
  const { width, height } = await img.metadata();
  const usable = widths.filter((w) => w <= width);
  if (usable.length === 0) usable.push(width);
  for (const w of usable) {
    await sharp(raw).rotate().resize({ width: w }).webp({ quality: 74 }).toFile(path.join(OUT_DIR, `${name}-${w}.webp`));
  }
  // 아주 작은 블러 플레이스홀더(배경색) — 로딩 중 레이아웃은 aspect-ratio 로 고정된다.
  const { dominant } = await sharp(raw).stats();
  meta[name] = {
    w: width,
    h: height,
    widths: usable,
    tone: `rgb(${dominant.r} ${dominant.g} ${dominant.b})`,
    provider,
    page,
  };
  console.log("✓", name, `${width}x${height}`, usable.join(","));
}

// OG 이미지 (1200×630) — 표지 사진을 가로로 크롭
await sharp(path.join(SRC_DIR, "hero-bichon.jpg"))
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 82 })
  .toFile(path.join(ROOT, "public/og-image.jpg"));

const ts = `// 자동 생성 파일 — scripts/build-images.mjs 가 만든다. 직접 수정하지 말 것.
export const PHOTO_META = ${JSON.stringify(meta, null, 2)} as const;

export type PhotoName = keyof typeof PHOTO_META;
`;
await fs.writeFile(path.join(ROOT, "src/content/photos.generated.ts"), ts);

const credits = `# Photo credits

모든 사진은 아래 출처의 무료 라이선스 사진입니다. 포트폴리오용 가상 브랜드 MORNING PAWS 의
분위기 연출용이며, 실제 매장·실제 고객·실제 시술 사례가 아닙니다.

- Unsplash License: https://unsplash.com/license
- Pexels License: https://www.pexels.com/license/

| 파일 | 출처 |
| --- | --- |
${Object.entries(meta)
  .map(([n, m]) => `| ${n} | ${m.page} |`)
  .join("\n")}
`;
await fs.writeFile(path.join(ROOT, "CREDITS.md"), credits);
console.log("done");
