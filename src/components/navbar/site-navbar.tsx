"use client";

import { useContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { NavigationContext } from "~/providers/NavigationProvider";
import FloatingNavbar from "./floating-navbar";

const LINKS = [
  { label: "About", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Books", href: "/books" },
  { label: "OSS", href: "/oss" },
];

interface NavbarApi {
  dock: () => void;
  undock: () => void;
  refresh: () => void;
}

// The navbar sits wide open over the home hero and folds into its floating
// glass pill on every inner page — route depth plays the role scroll depth
// plays in the original component.
export default function SiteNavbar() {
  const pathname = usePathname();
  const { navigateTo } = useContext(NavigationContext);
  const apiRef = useRef<NavbarApi>(null);

  useEffect(() => {
    const api = apiRef.current;
    if (api == null) return;
    if (pathname === "/") {
      api.undock();
    } else {
      api.dock();
    }
  }, [pathname]);

  return (
    <FloatingNavbar
      ref={apiRef}
      mark="K"
      wordmark="Kevin Edry"
      links={LINKS}
      ctaLabel="Contact"
      ctaHref="/contact"
      currentPath={pathname}
      onNavigate={(href: string) => navigateTo(href, pathname)}
    />
  );
}
