import React from "react";
import TintedImage from "~/ui/tinted-image/tinted-image";
import { format } from "date-fns";
import Link from "next/link";

export default function Article({
  title,
  publishedAt,
  link,
  image,
  summary,
}: {
  title: string;
  publishedAt: Date;
  link: string;
  image: string;
  summary: string;
}) {
  return (
    <Link href={link} target="_blank">
      <div className="flex">
        <div className="h-full">
          <TintedImage
            alt="article image"
            src={image}
            width={228}
            height={136}
          />
        </div>
        <div className="flex flex-col gap-2 pl-5">
          <h5 className="text-sm font-thin">
            {format(publishedAt, "MMM dd, yyyy")}
          </h5>
          <h2 className="text-xl font-bold">{title}</h2>
          <hr className="w-28 text-primary" />
          <p className="text-md text-text-secondary font-light">{summary}</p>
        </div>
      </div>
    </Link>
  );
}
