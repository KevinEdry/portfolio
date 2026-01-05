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

export default function MenuItem({ name, route, active, animationIndex }: MenuItemProps) {
  const { navigateTo } = useContext(NavigationContext);
  const pathname = usePathname();

  return (
    <li
      className="animate-slide-in-from-left flex h-full flex-1 cursor-pointer flex-col gap-1 opacity-0 lg:flex-row"
      style={{ animationDelay: `${animationIndex * 0.1}s` }}
    >
      <a
        href={route}
        onClick={(e) => {
          e.preventDefault();
          navigateTo(route, pathname);
        }}
        className={clsx(
          "transition-all hover:font-bold lg:rotate-180 lg:[writing-mode:vertical-rl]",
          active ? "font-bold" : "",
        )}
      >
        {name}
      </a>

      {active ? (
        <div
          className="menu-underline h-[2px] w-auto bg-primary lg:h-auto lg:w-[2px]"
        />
      ) : (
        <div className="mb-0.5 lg:mb-0 lg:mr-0.5" />
      )}
    </li>
  );
}
