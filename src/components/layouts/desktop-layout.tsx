import Menu from "../menu/menu";
import NavigationArrow from "../navigation-arrow/navigation-arrow";
import PageNumber from "./page-number";
import PageReveal from "./page-reveal";
import SiteNavbar from "../navbar/site-navbar";

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col text-text lg:h-screen">
      <SiteNavbar />
      <div className="mx-auto flex w-full max-w-[1640px] flex-1 flex-col px-4 lg:min-h-0 lg:px-16 lg:pt-[88px]">
        <div className="sticky top-0 z-20 flex w-full shrink-0 items-center justify-between gap-2 py-3 lg:hidden">
          <span
            aria-hidden
            className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-black"
          >
            K
          </span>
          <Menu />
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
