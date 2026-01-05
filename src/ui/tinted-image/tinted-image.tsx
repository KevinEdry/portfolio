"use client";

import { useHover } from "react-use";
import Image from "next/image";
import clsx from "clsx";

export default function TintedImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  link?: string;
}) {
  const wrapper = () => (
    <div className="bg-image/40 hover:bg-image/0 absolute z-10 h-full w-full cursor-pointer rounded-md transition-all"></div>
  );
  const [hoverable, hovered] = useHover(wrapper);

  return (
    <div
      className="relative"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {hoverable}
      <Image
        className={clsx(
          "rounded-md object-cover transition-all",
          hovered
            ? "filter-none"
            : "contrast-125 grayscale saturate-200 filter",
        )}
        alt={alt}
        src={src}
        fill
      />
    </div>
  );
}
