"use client";
import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useContext, forwardRef } from "react";
import { NavigationContext } from "~/providers/NavigationProvider";
import { usePathname } from "next/navigation";

const MenuItem = forwardRef<
  HTMLLIElement,
  {
    name: string;
    route: string;
    active: boolean;
  }
>((props, ref) => {
  const { setAnimationDirection } = useContext(NavigationContext);
  const { name, route, active } = props;
  const pathname = usePathname();

  return (
    <li ref={ref} className="flex h-full flex-1 cursor-pointer gap-1 opacity-0">
      <Link
        href={route}
        onClick={() => {
          setAnimationDirection(pathname, route);
        }}
        className={clsx(
          "rotate-180 transition-all [writing-mode:vertical-rl] hover:font-bold",
          active ? "font-bold" : "",
        )}
      >
        {name}
      </Link>

      {active ? (
        <motion.div
          animate
          layoutId="underline"
          className="h-auto w-[2px] bg-primary"
        ></motion.div>
      ) : (
        <div className="mr-0.5"></div>
      )}
    </li>
  );
});

MenuItem.displayName = "MenuItem";

export default motion(MenuItem);
