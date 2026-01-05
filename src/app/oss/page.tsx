"use client";

import { useState } from "react";
import { z } from "zod";
import ossDataJson from "~/content/oss.json";
import Image from "next/image";
import Button from "~/ui/button/button";
import Link from "next/link";
import clsx from "clsx";
import AuthorIcon from "~/public/icons/oss/author.svg";
import MaintainerIcon from "~/public/icons/oss/maintainer.svg";
import ContributorIcon from "~/public/icons/oss/contributor.svg";
import GitHubIcon from "~/public/icons/social/github.svg";

const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  language: z.string(),
  url: z.string(),
  stars: z.number().optional(),
  thumbnail: z.string().optional(),
});

const ossSchema = z.object({
  author: z.array(projectSchema),
  maintainer: z.array(projectSchema),
  contributor: z.array(projectSchema),
});

type Project = z.infer<typeof projectSchema>;
type Category = "author" | "maintainer" | "contributor";
type SelectedItem = { category: Category; data: Project };

export default function OSS() {
  const ossData = ossSchema.parse(ossDataJson);
  const firstProject = ossData.author[0] ?? ossData.maintainer[0] ?? ossData.contributor[0];

  const [selected, setSelected] = useState<SelectedItem | null>(
    firstProject ? { category: "author", data: firstProject } : null
  );
  const [showDetail, setShowDetail] = useState(false);

  const categories: { key: Category; label: string; icon: React.ReactNode }[] = [
    { key: "author", label: "Author", icon: <AuthorIcon className="h-4 w-4" /> },
    { key: "maintainer", label: "Maintainer", icon: <MaintainerIcon className="h-4 w-4" /> },
    { key: "contributor", label: "Contributor", icon: <ContributorIcon className="h-4 w-4" /> },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-hidden lg:h-[80%] lg:gap-6">
      <div className="flex shrink-0 flex-col gap-2 px-4 pt-4 lg:px-0 lg:pb-4 lg:pt-0">
        <h1 className="text-2xl font-bold text-primary lg:text-3xl">Open Source</h1>
        <p className="max-w-xl text-sm text-text-secondary lg:text-base">
          I'm passionate about open source and love contributing to the community.
          Here are some projects I've created, maintain, or contributed to.
        </p>
        <Link
          href="https://github.com/KevinEdry"
          target="_blank"
          className="flex w-fit items-center gap-2 text-sm text-white hover:text-primary"
        >
          <GitHubIcon className="h-4 w-4" />
          View my GitHub profile
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-6 overflow-hidden px-4 lg:flex-row lg:gap-8 lg:px-0">
        <div className={clsx(
          "scrollbar-hidden flex flex-col gap-6 overflow-y-auto lg:w-5/12 lg:pr-4 lg:scroll-fade-bottom",
          showDetail ? "hidden lg:flex" : "scroll-fade-bottom flex-1"
        )}>
          {categories.map(
          ({ key, label, icon }) =>
            ossData[key].length > 0 && (
              <div key={key} className="flex flex-col gap-3">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                  {icon}
                  {label}
                </h3>
                <ul className="flex flex-col gap-2">
                  {ossData[key].map((project, index) => (
                    <li
                      key={`${key}-${index}`}
                      onClick={() => {
                        setSelected({ category: key, data: project });
                        setShowDetail(true);
                      }}
                      className={clsx(
                        "flex cursor-pointer flex-col gap-1 rounded-md px-3 py-2 transition-all hover:bg-white/10",
                        selected?.category === key && selected.data.name === project.name
                          ? "bg-white/10"
                          : ""
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{project.name}</span>
                        <span className="text-xs text-text-secondary">{project.language}</span>
                      </div>
                      <p className="line-clamp-2 text-sm text-text-secondary">
                        {project.description}
                      </p>
                      {project.stars !== undefined && (
                        <span className="text-xs text-text-secondary">
                          {project.stars} stars
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
        <div className={clsx(
          "scrollbar-hidden flex flex-col gap-4 overflow-y-auto lg:w-7/12",
          showDetail ? "flex-1" : "hidden lg:flex"
        )}>
          {selected ? (
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => setShowDetail(false)}
                className="flex w-fit items-center gap-1 text-sm text-text-secondary hover:text-white lg:hidden"
              >
                ← Back to projects
              </button>
              {selected.data.thumbnail && (
                <Image
                  src={selected.data.thumbnail}
                  alt={selected.data.name}
                  width={400}
                  height={200}
                  className="w-full rounded-lg object-cover lg:w-auto"
                />
              )}
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold lg:text-2xl">{selected.data.name}</h1>
                <p className="text-sm leading-6 text-text-secondary lg:text-base">{selected.data.description}</p>
                <div className="flex flex-wrap items-center gap-2 pt-2 text-sm text-text-secondary lg:gap-3">
                  <span className="flex items-center gap-1.5 rounded bg-primary/20 px-2 py-0.5 text-primary">
                    {categories.find((c) => c.key === selected.category)?.icon}
                    {selected.category}
                  </span>
                  <span>{selected.data.language}</span>
                  {selected.data.stars !== undefined && (
                    <>
                      <span>•</span>
                      <span>{selected.data.stars} stars</span>
                    </>
                  )}
                </div>
                <Link href={selected.data.url} target="_blank" className="pt-2">
                  <Button type="outline">View on GitHub</Button>
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-text-secondary">Select a project to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}
