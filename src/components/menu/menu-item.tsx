"use client";

import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MenuItem(props: {
    name: string;
    route: string;
    active: boolean;
}) {

    const { name, route, active} = props;

  return (
    <li className="flex-1 flex gap-1 h-full cursor-pointer">
        <Link href={route} className={clsx("[writing-mode:vertical-rl] rotate-180 transition-all hover:font-bold", active ? "font-bold" : "")}>
            {name}
        </Link>

        {
            active ?
            <motion.div animate layoutId="underline" className="w-[2px] h-auto bg-primary"></motion.div>
            :
            <div className="mr-0.5"></div>
        }
    </li>
  );
}



