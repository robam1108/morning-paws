import type { CSSProperties } from "react";
import { PHOTO_META, type PhotoName } from "../../content/photos.generated";

type Props = {
  name: PhotoName;
  alt: string;
  /** 표시 비율. 생략하면 원본 비율. 예: "4 / 5" */
  ratio?: string;
  /** srcset 선택 기준 — 레이아웃에서 이 사진이 차지하는 폭 */
  sizes: string;
  /** object-position — 크롭을 디자인으로 쓴다 */
  focus?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
};

/**
 * 반응형 webp 사진. 비율을 미리 잡아 로딩 중 레이아웃이 흔들리지 않게 하고,
 * 사진의 대표색을 배경으로 깔아 빈 상자가 보이지 않게 한다.
 */
export default function Photo({ name, alt, ratio, sizes, focus, priority, className, imgClassName, style }: Props) {
  const meta = PHOTO_META[name];
  const widths = meta.widths as readonly number[];
  const largest = widths[widths.length - 1];
  const srcSet = widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(", ");

  return (
    <div
      className={className}
      style={{
        aspectRatio: ratio ?? `${meta.w} / ${meta.h}`,
        backgroundColor: meta.tone,
        overflow: "hidden",
        ...style,
      }}
    >
      <img
        src={`/images/${name}-${largest}.webp`}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={meta.w}
        height={meta.h}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={imgClassName}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: focus ?? "50% 50%" }}
      />
    </div>
  );
}
