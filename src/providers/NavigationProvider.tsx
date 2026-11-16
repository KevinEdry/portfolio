"use client";

import {
  type ReactNode,
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";

export type NavigationDirection = "fade" | "up" | "down" | "left" | "right";

export const ROUTES = ["/", "/blog", "/books", "/oss", "/contact"] as const;

interface NavigationContextType {
  direction: NavigationDirection;
  navigateTo: (path: string, current: string) => void;
}

const defaultContext: NavigationContextType = {
  direction: "fade",
  navigateTo: () => {},
};

export const NavigationContext =
  createContext<NavigationContextType>(defaultContext);

// Returns the neighboring main route, or null at either end — the sequence
// deliberately does not wrap so a full scroll-through ends on /contact.
export function getAdjacentRoute(current: string, step: 1 | -1): string | null {
  const index = ROUTES.findIndex((route) => route === current);
  if (index === -1) {
    return null;
  }
  return ROUTES[index + step] ?? null;
}

// Wheel events inside a container that can scroll belong to that container,
// even at its edges — reading must never trigger a route change.
function isInsideScrollable(target: EventTarget | null): boolean {
  let element = target instanceof Element ? target : null;
  while (element != null && element !== document.documentElement) {
    if (element instanceof HTMLElement) {
      const { overflowY } = window.getComputedStyle(element);
      if (
        (overflowY === "auto" || overflowY === "scroll") &&
        element.scrollHeight > element.clientHeight
      ) {
        return true;
      }
    }
    element = element.parentElement;
  }
  return false;
}

const WHEEL_THRESHOLD = 100;
const WHEEL_IDLE_RESET_MS = 300;
const NAVIGATION_COOLDOWN_MS = 700;
const SWIPE_THRESHOLD = 50;

export function NavigationProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [direction, setDirection] = useState<NavigationDirection>("fade");
  const [isMobile, setIsMobile] = useState(false);

  const wheelDelta = useRef(0);
  const lastWheelAt = useRef(0);
  const lockedUntil = useRef(0);

  const touchStart = useRef({ x: 0, y: 0 });
  const touchEnd = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navigateWithTransition = useCallback(
    (path: string, dir: NavigationDirection) => {
      lockedUntil.current = Date.now() + NAVIGATION_COOLDOWN_MS;
      wheelDelta.current = 0;
      setDirection(dir);
      router.push(path);
    },
    [router],
  );

  const getDirection = useCallback(
    (current: string, next: string): NavigationDirection => {
      const regex = /\/blog\/./;
      if (regex.test(next) || regex.test(current)) {
        return "fade";
      }

      const nextPathIndex = ROUTES.findIndex((path) => path === next);
      const currentPathIndex = ROUTES.findIndex((path) => path === current);

      if (nextPathIndex === -1 || currentPathIndex === -1) {
        return "fade";
      }

      if (isMobile) {
        return currentPathIndex < nextPathIndex ? "left" : "right";
      }
      return currentPathIndex < nextPathIndex ? "down" : "up";
    },
    [isMobile],
  );

  const navigateTo = useCallback(
    (path: string, current: string) => {
      navigateWithTransition(path, getDirection(current, path));
    },
    [navigateWithTransition, getDirection],
  );

  const stepTo = useCallback(
    (step: 1 | -1, dir: NavigationDirection) => {
      const next = getAdjacentRoute(pathname, step);
      if (next != null) {
        navigateWithTransition(next, dir);
      }
    },
    [pathname, navigateWithTransition],
  );

  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (event: WheelEvent) => {
      if (!ROUTES.some((route) => route === pathname)) return;
      if (isInsideScrollable(event.target)) return;

      const now = Date.now();
      if (now < lockedUntil.current) {
        wheelDelta.current = 0;
        return;
      }
      if (now - lastWheelAt.current > WHEEL_IDLE_RESET_MS) {
        wheelDelta.current = 0;
      }
      lastWheelAt.current = now;
      wheelDelta.current += event.deltaY;

      if (Math.abs(wheelDelta.current) < WHEEL_THRESHOLD) return;

      const step = wheelDelta.current > 0 ? 1 : -1;
      stepTo(step, step === 1 ? "down" : "up");
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isMobile, pathname, stepTo]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!ROUTES.some((route) => route === pathname)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (Date.now() < lockedUntil.current) return;

      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        stepTo(1, isMobile ? "left" : "down");
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        stepTo(-1, isMobile ? "right" : "up");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pathname, isMobile, stepTo]);

  const handleSwipe = useCallback(() => {
    if (!hasMoved.current) return;
    if (!ROUTES.some((route) => route === pathname)) return;

    const deltaX = touchStart.current.x - touchEnd.current.x;
    const deltaY = touchStart.current.y - touchEnd.current.y;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (Math.abs(deltaX) < Math.abs(deltaY) * 1.5) return;
    if (Date.now() < lockedUntil.current) return;

    if (deltaX > 0) {
      stepTo(1, "left");
    } else {
      stepTo(-1, "right");
    }
  }, [pathname, stepTo]);

  useEffect(() => {
    if (!isMobile) return;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      touchStart.current = { x: touch?.clientX ?? 0, y: touch?.clientY ?? 0 };
      touchEnd.current = touchStart.current;
      hasMoved.current = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      touchEnd.current = { x: touch?.clientX ?? 0, y: touch?.clientY ?? 0 };
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

  return (
    <NavigationContext.Provider value={{ direction, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}
