"use client";

import { useTransitionRouter } from "next-view-transitions";
import ExitIcon from "~/public/icons/exit.svg";

export default function ExitLink({ href }: { href: string }) {
  const router = useTransitionRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(href)}
      className="fixed right-14 top-10 h-fit w-fit cursor-pointer"
    >
      <ExitIcon />
    </button>
  );
}
