"use client";

import MenuItem from "./menu-item";
import { usePathname } from "next/navigation";

export default function Menu() {
  const route = usePathname();
  return (
    <nav className="flex w-full shrink-0 items-center justify-center py-2 lg:h-full lg:w-1/12 lg:flex-col lg:items-baseline lg:justify-center lg:py-0 lg:pb-10">
      <ul className="flex h-fit flex-row items-center gap-6 align-baseline lg:flex-col lg:gap-14">
        <MenuItem
          animationIndex={0}
          active={route === "/"}
          name="about"
          route="/"
        />
        <MenuItem
          animationIndex={1}
          active={route === "/blog"}
          name="blog"
          route="/blog"
        />
        <MenuItem
          animationIndex={2}
          active={route === "/books"}
          name="books"
          route="/books"
        />
        <MenuItem
          animationIndex={3}
          active={route === "/oss"}
          name="oss"
          route="/oss"
        />
        <MenuItem
          animationIndex={4}
          active={route === "/contact"}
          name="contact"
          route="/contact"
        />
      </ul>
    </nav>
  );
}
