"use client";

import MenuItem from "./menu-item";
import { usePathname } from 'next/navigation';
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";

const MotionMenuItem = motion(MenuItem);

export default function Menu() {
  const route = usePathname();
  return (
    <nav className="flex flex-col w-1/12 h-full justify-center pb-10">
      <ul className="flex flex-col items-center h-fit gap-14">
        <LayoutGroup id="underline">
            <MotionMenuItem initial={{x: -200, opacity: 0}} animate={{x:0, opacity:1}} active={route === "/about"} name="about" route="/about"/>
            <MotionMenuItem initial={{x: -200, opacity: 0}} animate={{x:0, opacity:1}} active={route === "/projects"} name="projects" route="/projects"/>
            <MotionMenuItem initial={{x: -200, opacity: 0}} animate={{x:0, opacity:1}} active={route === "/blog"} name="blog" route="/blog"/>
            <MotionMenuItem initial={{x: -200, opacity: 0}} animate={{x:0, opacity:1}} active={route === "/contact"} name="contact" route="/contact"/>
        </LayoutGroup>
      </ul>
  </nav>
  );
}

