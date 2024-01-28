"use client";

import clsx from "clsx";
import { useRouter, usePathname } from "next/navigation";
import { useContext } from "react";
import { NavigationContext } from "~/providers/NavigationProvider";
import ArrowIcon from "~/public/icons/arrow.svg";

export default function NavigationArrow(props: { direction: "up" | "down" }) {
  const router = useRouter();
  const pathname = usePathname();
  const { direction } = props;
  const { setAnimationDirection } = useContext(NavigationContext);

  const routerArray = ["/about", "/blog", "/books", "/contact"];

  const navigate = () => {
    const navigationDirection = direction === "down" ? 1 : -1;
    const currentRouteIndex = routerArray.findIndex(
      (currentRoute) => currentRoute === pathname,
    );
    if (currentRouteIndex === -1) {
      throw new Error("could not find next route");
    }

    const nextRouteIndex = currentRouteIndex + navigationDirection;
    const routeIndex =
      nextRouteIndex >= routerArray.length
        ? 0
        : nextRouteIndex < 0
          ? routerArray.length - 1
          : nextRouteIndex;
    const nextPathname = routerArray[routeIndex];

    if (nextPathname == null) {
      throw new Error("could not find next route");
    }
    setAnimationDirection(pathname, nextPathname);
    router.push(nextPathname);
  };

  return (
    <button
      type="button"
      className={clsx(
        "flex h-11 w-11 cursor-pointer items-center justify-center bg-primary hover:bg-primary/90",
        direction === "down" && "rotate-180",
      )}
      onClick={() => navigate()}
    >
      <ArrowIcon />
    </button>
  );
}
