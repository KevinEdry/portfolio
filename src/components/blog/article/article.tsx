"use client";

import React, { useContext } from "react";
import TintedImage from "~/ui/tinted-image/tinted-image";
import { format } from "date-fns";
import Link from "next/link";
import { NavigationContext } from "~/providers/NavigationProvider";

export default function Article({
  id,
  title,
  publishedAt,
  image,
  summary,
}: {
  id: string;
  title: string;
  publishedAt: Date;
  image: string;
  summary: string;
}) {
  const { navigateTo } = useContext(NavigationContext);
  return (
    <Link
      href={`/blog/${id}`}
      onClick={(e) => {
        e.preventDefault();
        navigateTo(`/blog/${id}`, "/blog");
      }}
    >
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
          <p className="text-md font-light text-text-secondary">{summary}</p>
        </div>
      </div>
    </Link>
  );
}
