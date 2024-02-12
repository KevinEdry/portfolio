"use client";

import { type ReactNode, createContext, useState } from "react";
import { useDebounce, useMouseWheel } from "react-use";
import { usePathname, useRouter } from "next/navigation";

type NavigationDirection = "fade" | "up" | "down";

export const NavigationContext = createContext({
  direction: "fade",
  setAnimationDirection: (_current: string, _next: string) => {
    //No need because this is only the type.
  },
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [direction, setDirection] = useState<NavigationDirection>("fade");
  const routerArray = ["/", "/blog", "/books", "/contact"];

  const mouseWheel = useMouseWheel();
  const [mouseWheelYDelta, updateMouseWheelYDelta] =
    useState<number>(mouseWheel);

  useDebounce(
    () => {
      if (routerArray.includes(pathname)) {
        if (mouseWheel > mouseWheelYDelta) {
          setDirection("down");
          router.push(getNextPath(pathname));
        } else if (mouseWheel < mouseWheelYDelta) {
          setDirection("up");
          router.push(getPrevPath(pathname));
        }
        updateMouseWheelYDelta(mouseWheel);
      }
    },
    100,
    [mouseWheel],
  );

  function setAnimationDirection(current: string, next: string) {
    const regex = /\/blog\/./g;

    if (regex.test(next) || regex.test(current)) {
      if (direction !== "fade") setDirection("fade");
      return;
    }

    const nextPathIndex = routerArray.findIndex((path) => path === next);
    const currentPathIndex = routerArray.findIndex((path) => path === current);

    if (nextPathIndex === -1 || currentPathIndex === -1) {
      throw new Error("could not find current or previous pathname index.");
    }

    if (currentPathIndex < nextPathIndex) {
      setDirection("down");
    } else {
      setDirection("up");
    }
  }

  function getNextPath(current: string): string {
    const currentPathIndex = routerArray.findIndex((path) => path === current);

    if (currentPathIndex === -1) {
      throw new Error("could not find current pathname index.");
    }

    const nextPathname =
      currentPathIndex + 1 >= routerArray.length
        ? routerArray[0]
        : routerArray[currentPathIndex + 1];

    if (nextPathname == null) {
      throw new Error("could not find next pathname");
    }

    return nextPathname;
  }

  function getPrevPath(current: string): string {
    const currentPathIndex = routerArray.findIndex((path) => path === current);

    if (currentPathIndex === -1) {
      throw new Error("could not find current pathname index.");
    }

    const nextPathname =
      currentPathIndex - 1 < 0
        ? routerArray[routerArray.length - 1]
        : routerArray[currentPathIndex - 1];

    if (nextPathname == null) {
      throw new Error("could not find next pathname");
    }

    return nextPathname;
  }

  return (
    <NavigationContext.Provider value={{ direction, setAnimationDirection }}>
      {children}
    </NavigationContext.Provider>
  );
}
