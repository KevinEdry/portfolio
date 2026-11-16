"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import {
  NavigationContext,
  getAdjacentRoute,
} from "~/providers/NavigationProvider";
import ArrowIcon from "~/public/icons/arrow.svg";

const ROUTE_LABELS: Record<string, string> = {
  "/": "about",
  "/blog": "blog",
  "/books": "books",
  "/oss": "oss",
  "/contact": "contact",
};

export default function NavigationArrow(props: { direction: "up" | "down" }) {
  const pathname = usePathname();
  const { direction } = props;
  const { navigateTo } = useContext(NavigationContext);

  const target = getAdjacentRoute(pathname, direction === "down" ? 1 : -1);
  const label = target != null ? ROUTE_LABELS[target] : null;

  return (
    <button
      type="button"
      disabled={target == null}
      aria-label={label != null ? `Go to ${label}` : "No more pages"}
      onClick={() => {
        if (target != null) {
          navigateTo(target, pathname);
        }
      }}
      className={clsx(
        "group flex h-10 items-center justify-end gap-2 pr-3 transition-colors duration-200",
        target == null
          ? "cursor-default opacity-25"
          : "cursor-pointer text-text/60 hover:text-primary",
      )}
    >
      {label != null && (
        <span className="text-xs uppercase tracking-[0.18em] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {label}
        </span>
      )}
      <span
        className={clsx(
          "glass flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors duration-200 group-hover:bg-white/10",
          direction === "down" && "rotate-180",
        )}
      >
        <ArrowIcon />
      </span>
    </button>
  );
}
