import { z } from "zod";
import ossDataJson from "~/content/oss.json";
import Link from "next/link";
import GitHubIcon from "~/public/icons/social/github.svg";
import WaveHeading from "~/components/text/wave-heading";
import ScrambleText from "~/components/text/scramble-text";
import RepoGrid from "~/components/oss/repo-grid";

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

export default function OSS() {
  const ossData = ossSchema.parse(ossDataJson);

  const projects: { project: Project; category: Category }[] = [
    ...ossData.author.map((project) => ({ project, category: "author" as const })),
    ...ossData.maintainer.map((project) => ({ project, category: "maintainer" as const })),
    ...ossData.contributor.map((project) => ({ project, category: "contributor" as const })),
  ];

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-hidden px-4 py-4 lg:gap-8 lg:px-0 lg:py-8">
      <div className="flex shrink-0 flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div className="flex flex-col gap-2">
          <ScrambleText
            text="Open source"
            className="text-sm uppercase tracking-[0.2em] text-text-secondary"
          />
          <WaveHeading
            text="Code in the wild"
            className="text-4xl font-black leading-none tracking-tight lg:text-6xl"
          />
        </div>
        <div className="flex flex-col gap-1.5 lg:items-end">
          <p className="max-w-md leading-6 text-text-secondary lg:text-right">
            Projects I author, maintain, or chip away at. Every row goes
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
      </div>

      <RepoGrid
        repos={projects.map(({ project, category }) => ({
          name: project.name,
          description: project.description,
          language: project.language,
          url: project.url,
          stars: project.stars,
          thumbnail: project.thumbnail,
          category,
        }))}
      />
    </div>
  );
}
