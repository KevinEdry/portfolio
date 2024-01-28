import React from "react";
import TintedImage from "~/ui/tinted-image/tinted-image";
import { format } from "date-fns";
import Link from "next/link";

export default function HeroArticle({
  title,
  publishedAt,
  image,
  link,
  readTime,
  summary,
}: {
  title: string;
  publishedAt: Date;
  image: string;
  link: string;
  readTime: number;
  summary: string;
}) {
  return (
    <Link href={link} target="_blank">
      <div className="flex w-[560px] flex-col  gap-3">
        <div className="h-full">
          <TintedImage
            alt="article image"
            src={image}
            width={560}
            height={334}
          />
        </div>
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <h5 className="text-sm font-thin">
            {format(publishedAt, "MMM dd, yyyy")}
          </h5>
        </div>
        <hr className="w-28 text-primary" />
        <p className="text-text-secondary text-lg font-light">{summary}</p>
        <h6 className="text-md text-text-secondary pt-5 font-bold">
          {`${Math.round(readTime / 60)} Minutes Read`}
        </h6>
      </div>
    </Link>
  );
}
