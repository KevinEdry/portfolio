"use client";

import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";
import { useContext } from "react";
import { NavigationContext } from "~/providers/NavigationProvider";
import { usePathname } from "next/navigation";

export default function MenuItem(props: {
  name: string;
  route: string;
  active: boolean;
}) {
  const { setAnimationDirection } = useContext(NavigationContext);
  const { name, route, active } = props;
  const pathname = usePathname();

  return (
    <li className="flex h-full flex-1 cursor-pointer gap-1">
      <Link
        href={route}
        onClick={() => {
          setAnimationDirection(pathname, route);
        }}
        className={clsx("rotate-180 transition-all [writing-mode:vertical-rl] hover:font-bold",
          active ? "font-bold" : "",
        )}
      >{name}
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
}
