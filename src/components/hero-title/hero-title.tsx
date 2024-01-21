import clsx from "clsx";
import type { ReactNode } from "react";

export default function HeroTitle(props: { children: ReactNode }) {
    const { children } = props;

    return (
        <h1 className={clsx("text-text font-roboto text-6xl font-black")}>
            {children}
        </h1>
    );
  }