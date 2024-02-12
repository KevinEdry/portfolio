"use client";

import MenuItem from "./menu-item";
import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

export default function Menu() {
  const route = usePathname();
  return (
    <nav className="flex h-full w-1/12 flex-col items-baseline justify-center pb-10">
      <motion.ul
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="flex h-fit flex-col items-center gap-14 align-baseline"
      >
        <LayoutGroup id="underline">
          <AnimatePresence mode="popLayout">
            <MenuItem
              key={`menu_0`}
              initial={{ x: -200, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.5,
                  delay: 0,
                },
              }}
              active={route === "/"}
              name="about"
              route="/"
            />
            <MenuItem
              key={`menu_1`}
              initial={{ x: -200, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.5,
                  delay: 0.1,
                },
              }}
              active={route === "/blog"}
              name="blog"
              route="/blog"
            />
            <MenuItem
              key={`menu_2`}
              initial={{ x: -200, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.5,
                  delay: 0.2,
                },
              }}
              active={route === "/books"}
              name="books"
              route="/books"
            />
            <MenuItem
              key={`menu_3`}
              initial={{ x: -200, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.5,
                  delay: 0.3,
                },
              }}
              active={route === "/contact"}
              name="contact"
              route="/contact"
            />
          </AnimatePresence>
        </LayoutGroup>
      </motion.ul>
    </nav>
  );
}
