"use client";

import MenuItem from "./menu-item";
import { usePathname } from 'next/navigation'

export default function Menu() {
  const route = usePathname();
  return (
    <ul className="flex flex-col items-center h-fit gap-14">
      <MenuItem active={route === "/"} name="about" route="/"/>
      <MenuItem active={route === "/projects"} name="projects" route="/projects"/>
      <MenuItem active={route === "/blog"} name="blog" route="/blog"/>
      <MenuItem active={route === "/contact"} name="contact" route="/contact"/>
    </ul>
  );
}

