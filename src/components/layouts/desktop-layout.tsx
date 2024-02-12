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
    <div className="container mx-auto hidden h-screen max-h-full flex-row bg-cover font-roboto text-text sm:flex">
      <div className="flex flex-1 flex-col">
        <div className="flex h-1/6 w-full items-center justify-between">
          <HeroTitle />
          <ul className="flex gap-8">
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
        <div className="flex flex-1">
          <Menu />
          {children}
        </div>
        <div className="absolute bottom-32 right-0 flex flex-col">
          <NavigationArrow direction="up" />
          <NavigationArrow direction="down" />
        </div>
      </div>
    </div>
  );
}
