"use client";
import clsx from "clsx";
import { useContext } from "react";
import { NavigationContext } from "~/providers/NavigationProvider";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  name: string;
  route: string;
  active: boolean;
}

export default function MenuItem({ name, route, active }: MenuItemProps) {
  const { navigateTo } = useContext(NavigationContext);
  const pathname = usePathname();

  return (
    <li className="relative">
      <a
        href={route}
        data-active={active ? "" : undefined}
        aria-current={active ? "page" : undefined}
        onClick={(e) => {
          e.preventDefault();
          navigateTo(route, pathname);
        }}
        className={clsx(
          "relative z-10 block rounded-full px-2 py-1.5 text-[11px] uppercase tracking-[0.1em] transition-colors duration-200 lg:px-4 lg:text-[12px] lg:tracking-[0.16em]",
          active
            ? "font-bold text-primary"
            : "text-text/60 hover:text-text",
        )}
      >
        {name}
      </a>
    </li>
  );
}
