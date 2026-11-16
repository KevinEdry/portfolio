import { z } from "zod";
import ossDataJson from "~/content/oss.json";
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

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  author: <AuthorIcon className="h-3.5 w-3.5" />,
  maintainer: <MaintainerIcon className="h-3.5 w-3.5" />,
  contributor: <ContributorIcon className="h-3.5 w-3.5" />,
};

function RoleChip({ category }: { category: Category }) {
  return (
    <span className="flex w-fit items-center gap-1.5 rounded-full border border-primary/40 px-2.5 py-0.5 text-xs uppercase tracking-[0.12em] text-primary">
      {CATEGORY_ICONS[category]}
      {category}
    </span>
  );
}

function ProjectCard({
  project,
  category,
  featured = false,
}: {
  project: Project;
  category: Category;
  featured?: boolean;
}) {
  return (
    <Link
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "group flex flex-col gap-3 rounded-lg border border-border bg-surface/80 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60",
        featured && "sm:col-span-2 lg:p-7",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={clsx(
            "font-bold leading-tight transition-colors duration-200 group-hover:text-primary",
            featured ? "text-xl lg:text-2xl" : "text-base",
          )}
        >
          {project.name}
        </span>
        <GitHubIcon className="h-5 w-5 shrink-0 opacity-50 transition-opacity duration-200 group-hover:opacity-100" />
      </div>
      <p
        className={clsx(
          "text-sm leading-6 text-text-secondary",
          featured ? "max-w-xl" : "line-clamp-2",
        )}
      >
        {project.description}
      </p>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-1 text-xs text-text-muted">
        <RoleChip category={category} />
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary/70" />
          {project.language}
        </span>
        {project.stars !== undefined && <span>★ {project.stars}</span>}
      </div>
    </Link>
  );
}

export default function OSS() {
  const ossData = ossSchema.parse(ossDataJson);

  const projects: { project: Project; category: Category }[] = [
    ...ossData.author.map((project) => ({ project, category: "author" as const })),
    ...ossData.maintainer.map((project) => ({ project, category: "maintainer" as const })),
    ...ossData.contributor.map((project) => ({ project, category: "contributor" as const })),
  ];

  const [featured, ...rest] = projects;

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-hidden px-4 py-4 lg:flex-row lg:gap-12 lg:px-0 lg:py-0">
      <div className="flex shrink-0 flex-col gap-4 lg:w-1/3 lg:pt-14">
        <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">
          Open source
        </p>
        <h1 className="text-3xl font-black leading-tight lg:text-5xl">
          Code in
          <br />
          the wild
        </h1>
        <hr className="w-40 text-primary" />
        <p className="max-w-sm leading-7 text-text-secondary">
          Projects I author, maintain, or chip away at. Every card goes
          straight to the repo.
        </p>
        <Link
          href="https://github.com/KevinEdry"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-2 text-sm font-medium text-text transition-colors duration-200 hover:text-primary"
        >
          <GitHubIcon className="h-4 w-4" />
          github.com/KevinEdry →
        </Link>
      </div>

      <div className="scrollbar-hidden scroll-fade-y flex-1 overflow-y-auto pb-16 lg:py-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featured != null && (
            <ProjectCard
              project={featured.project}
              category={featured.category}
              featured
            />
          )}
          {rest.map(({ project, category }) => (
            <ProjectCard
              key={project.name}
              project={project}
              category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
