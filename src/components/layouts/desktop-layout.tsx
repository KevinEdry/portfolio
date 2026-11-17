import HeroTitle from "../hero-title/hero-title";
import Menu from "../menu/menu";
import NavigationArrow from "../navigation-arrow/navigation-arrow";
import PageNumber from "./page-number";
import PageReveal from "./page-reveal";
import SiteNavbar from "../navbar/site-navbar";
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
      <SiteNavbar />
      <div className="mx-auto flex w-full max-w-[1640px] flex-1 flex-col px-4 lg:min-h-0 lg:px-16 lg:pt-[88px]">
        <div className="sticky top-0 z-20 flex h-auto w-full shrink-0 flex-col gap-3 border-b border-border bg-white/55 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between">
            <HeroTitle />
            <ul className="flex shrink-0 gap-3">
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
          <div className="flex justify-center">
            <Menu />
          </div>
        </div>
        <main className="relative flex min-h-0 flex-1 overflow-x-clip lg:overflow-y-hidden">
          <PageReveal>{children}</PageReveal>
        </main>
      </div>
      <PageNumber />
      <div className="fixed bottom-10 right-6 z-20 hidden flex-col gap-2 lg:flex">
        <NavigationArrow direction="up" />
        <NavigationArrow direction="down" />
      </div>
    </div>
  );
}
