"use client";
import clsx from "clsx";
import { useContext } from "react";
import { NavigationContext } from "~/providers/NavigationProvider";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  name: string;
  route: string;
  active: boolean;
  animationIndex: number;
}

export default function MenuItem({
  name,
  route,
  active,
  animationIndex,
}: MenuItemProps) {
  const { navigateTo } = useContext(NavigationContext);
  const pathname = usePathname();

  return (
    <li
      className="animate-slide-in-from-left opacity-0"
      style={{ animationDelay: `${animationIndex * 0.08}s` }}
    >
      <a
        href={route}
        aria-current={active ? "page" : undefined}
        onClick={(e) => {
          e.preventDefault();
          navigateTo(route, pathname);
        }}
        className={clsx(
          "group flex items-center gap-2 text-[13px] uppercase tracking-[0.18em] transition-colors duration-200 lg:rotate-180 lg:flex-col lg:gap-2 lg:[writing-mode:vertical-rl]",
          active ? "font-bold text-primary" : "text-text/60 hover:text-text",
        )}
      >
        <span
          aria-hidden
          className={clsx(
            "hidden font-normal tracking-normal transition-colors duration-200 lg:inline",
            active ? "text-primary/80" : "text-text/35 group-hover:text-text/60",
          )}
        >
          0{animationIndex + 1}
        </span>
        {name}
        <span
          className={clsx(
            "hidden h-px w-5 bg-primary transition-all duration-200 lg:block lg:h-5 lg:w-px",
            active ? "opacity-100" : "opacity-0 group-hover:opacity-40",
          )}
        />
      </a>
    </li>
  );
}
