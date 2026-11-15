"use client";

import React, { useContext } from "react";
import TintedImage from "~/ui/tinted-image/tinted-image";
import { format } from "date-fns";
import Link from "next/link";
import { NavigationContext } from "~/providers/NavigationProvider";

export default function HeroArticle({
  id,
  title,
  publishedAt,
  image,
  readTime,
  summary,
}: {
  id: string;
  title: string;
  publishedAt: Date;
  image: string;
  readTime: number;
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
          <h5 className="text-sm text-text-muted">
            {format(publishedAt, "MMM dd, yyyy")}
          </h5>
        </div>
        <hr className="w-28 text-primary" />
        <p className="text-lg text-text-secondary">{summary}</p>
        <h6 className="text-md pt-5 font-bold text-text-muted">
          {`${readTime} min read`}
        </h6>
      </div>
    </Link>
  );
}
