import HeroTitle from "../hero-title/hero-title";
import Menu from "../menu/menu";
import NavigationArrow from "../navigation-arrow/navigation-arrow";
import Social from "../social/motion-social";

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto flex min-h-screen flex-col bg-cover px-4 font-roboto text-text lg:h-screen lg:max-h-full lg:flex-row lg:px-8">
      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-10 flex h-auto w-full shrink-0 flex-col gap-3 bg-background/95 py-4 backdrop-blur-sm lg:static lg:h-1/6 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:bg-transparent lg:py-0 lg:backdrop-blur-none">
          <div className="flex items-center justify-between">
            <HeroTitle />
            <ul className="flex shrink-0 gap-3 lg:hidden">
              <Social
                key={`social_mobile_0`}
                animationDelay={0}
                platform="linkedin"
                link="https://www.linkedin.com/in/kevinedry/"
                small
              />
              <Social
                key={`social_mobile_1`}
                animationDelay={0.1}
                platform="github"
                link="https://github.com/KevinEdry"
                small
              />
              <Social
                key={`social_mobile_2`}
                animationDelay={0.2}
                platform="medium"
                link="https://medium.com/@techg9"
                small
              />
              <Social
                key={`social_mobile_3`}
                animationDelay={0.3}
                platform="twitter"
                link="https://twitter.com/KevinEdry"
                small
              />
            </ul>
          </div>
          <div className="lg:hidden">
            <Menu />
          </div>
          <ul className="hidden gap-8 lg:flex">
            <Social
              key={`social_0`}
              animationDelay={0}
              platform="linkedin"
              link="https://www.linkedin.com/in/kevinedry/"
            />
            <Social
              key={`social_1`}
              animationDelay={0.1}
              platform="github"
              link="https://github.com/KevinEdry"
            />
            <Social
              key={`social_2`}
              animationDelay={0.2}
              platform="medium"
              link="https://medium.com/@techg9"
            />
            <Social
              key={`social_3`}
              animationDelay={0.3}
              platform="twitter"
              link="https://twitter.com/KevinEdry"
            />
          </ul>
        </div>
        <div className="flex flex-1 flex-col lg:flex-row lg:gap-8 lg:overflow-hidden">
          <div className="hidden lg:flex">
            <Menu />
          </div>
          {children}
        </div>
        <div className="absolute bottom-32 right-0 z-0 hidden flex-col lg:flex">
          <NavigationArrow direction="up" />
          <NavigationArrow direction="down" />
        </div>
      </div>
    </div>
  );
}
