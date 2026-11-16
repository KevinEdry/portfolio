"use client";

import { useContext } from "react";
import { usePathname } from "next/navigation";
import { NavigationContext } from "~/providers/NavigationProvider";
import ExitIcon from "~/public/icons/exit.svg";

export default function ExitLink({ href }: { href: string }) {
  const { navigateTo } = useContext(NavigationContext);
  const pathname = usePathname();

  return (
    <button
      type="button"
      aria-label="Back to blog"
      onClick={() => navigateTo(href, pathname)}
      className="group fixed right-6 top-6 z-10 flex h-fit w-fit cursor-pointer items-center gap-2 text-text/60 transition-colors duration-200 hover:text-primary lg:right-14 lg:top-10"
    >
      <span className="text-xs uppercase tracking-[0.18em] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        back to blog
      </span>
      <ExitIcon />
    </button>
  );
}
