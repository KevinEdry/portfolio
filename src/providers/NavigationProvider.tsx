"use client";

import { type ReactNode, createContext, useState, useEffect, useRef, useCallback } from "react";
import { useDebounce, useMouseWheel } from "react-use";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";

type NavigationDirection = "fade" | "up" | "down" | "left" | "right";

interface NavigationContextType {
  direction: NavigationDirection;
  navigateTo: (path: string, current: string) => void;
}

const defaultContext: NavigationContextType = {
  direction: "fade",
  navigateTo: () => {},
};

export const NavigationContext = createContext<NavigationContextType>(defaultContext);

function setDocumentDirection(dir: NavigationDirection) {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.transitionDirection = dir;
  }
}

const SWIPE_THRESHOLD = 50;

export function NavigationProvider({ children }: { children: ReactNode }) {
  const router = useTransitionRouter();
  const pathname = usePathname();

  const [direction, setDirection] = useState<NavigationDirection>("fade");
  const [isMobile, setIsMobile] = useState(false);
  const routerArray = ["/", "/blog", "/books", "/oss", "/contact"];

  const mouseWheel = useMouseWheel();
  const [mouseWheelYDelta, updateMouseWheelYDelta] = useState<number>(mouseWheel);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const hasMoved = useRef<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setDocumentDirection(direction);
  }, [direction]);

  function navigateWithTransition(path: string, dir: NavigationDirection) {
    setDocumentDirection(dir);
    setDirection(dir);
    window.scrollTo(0, 0);
    router.push(path);
  }

  function getDirection(current: string, next: string): NavigationDirection {
    const regex = /\/blog\/./g;
    if (regex.test(next) || regex.test(current)) {
      return "fade";
    }

    const nextPathIndex = routerArray.findIndex((path) => path === next);
    const currentPathIndex = routerArray.findIndex((path) => path === current);

    if (nextPathIndex === -1 || currentPathIndex === -1) {
      return "fade";
    }

    if (isMobile) {
      return currentPathIndex < nextPathIndex ? "left" : "right";
    }
    return currentPathIndex < nextPathIndex ? "down" : "up";
  }

  function navigateTo(path: string, current: string) {
    const dir = getDirection(current, path);
    navigateWithTransition(path, dir);
  }

  useDebounce(
    () => {
      if (!isMobile && routerArray.includes(pathname)) {
        if (mouseWheel > mouseWheelYDelta) {
          navigateWithTransition(getNextPath(pathname), "down");
        } else if (mouseWheel < mouseWheelYDelta) {
          navigateWithTransition(getPrevPath(pathname), "up");
        }
        updateMouseWheelYDelta(mouseWheel);
      }
    },
    100,
    [mouseWheel, isMobile],
  );

  const handleSwipe = useCallback(() => {
    if (!hasMoved.current) return;

    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) < SWIPE_THRESHOLD) return;
    if (!routerArray.includes(pathname)) return;

    if (swipeDistance > 0) {
      navigateWithTransition(getNextPath(pathname), "left");
    } else {
      navigateWithTransition(getPrevPath(pathname), "right");
    }
  }, [pathname]);

  useEffect(() => {
    if (!isMobile) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0]?.clientX ?? 0;
      touchEndX.current = e.touches[0]?.clientX ?? 0;
      hasMoved.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0]?.clientX ?? 0;
      hasMoved.current = true;
    };

    const handleTouchEnd = () => {
      handleSwipe();
      hasMoved.current = false;
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile, handleSwipe]);

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
    <NavigationContext.Provider value={{ direction, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}
