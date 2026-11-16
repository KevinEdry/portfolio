import HeroTitle from "../hero-title/hero-title";
import Menu from "../menu/menu";
import NavigationArrow from "../navigation-arrow/navigation-arrow";
import PageReveal from "./page-reveal";
import Social from "../social/motion-social";

const SOCIAL_LINKS = [
  { platform: "linkedin", link: "https://www.linkedin.com/in/kevinedry/" },
  { platform: "github", link: "https://github.com/KevinEdry" },
  { platform: "medium", link: "https://medium.com/@techg9" },
  { platform: "twitter", link: "https://twitter.com/KevinEdry" },
] as const;

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col text-text lg:h-screen">
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 lg:min-h-0 lg:px-20">
        <div className="sticky top-0 z-10 flex h-auto w-full shrink-0 flex-col gap-3 border-b border-white/10 bg-background/50 py-4 backdrop-blur-xl lg:static lg:h-1/6 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:border-none lg:bg-transparent lg:py-0 lg:backdrop-blur-none">
          <div className="flex items-center justify-between">
            <HeroTitle />
            <ul className="flex shrink-0 gap-3 lg:hidden">
              {SOCIAL_LINKS.map(({ platform, link }, index) => (
                <Social
                  key={platform}
                  animationDelay={index * 0.1}
                  platform={platform}
                  link={link}
                  small
                />
              ))}
            </ul>
          </div>
          <div className="lg:hidden">
            <Menu />
          </div>
          <ul className="hidden gap-8 lg:flex">
            {SOCIAL_LINKS.map(({ platform, link }, index) => (
              <Social
                key={platform}
                animationDelay={index * 0.1}
                platform={platform}
                link={link}
              />
            ))}
          </ul>
        </div>
        <main className="relative flex min-h-0 flex-1 overflow-x-clip lg:overflow-y-hidden">
          <PageReveal>{children}</PageReveal>
        </main>
      </div>
      <div className="fixed left-6 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
        <Menu />
      </div>
      <div className="fixed bottom-10 right-6 z-20 hidden flex-col gap-2 lg:flex">
        <NavigationArrow direction="up" />
        <NavigationArrow direction="down" />
      </div>
    </div>
  );
}
