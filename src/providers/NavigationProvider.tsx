import { type ReactNode, createContext, useState } from "react";

type NavigationDirection = "splash" | "up" | "down";

export const NavigationContext = createContext({
  direction: "splash",
  setAnimationDirection: (_current: string, _next: string) => {
    //No need because this is only the type.
  },
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [direction, setDirection] = useState<NavigationDirection>("splash");
  const routerArray = ["/about", "/projects", "/blog", "/contact"];

  function setAnimationDirection(current: string, next: string) {
    if (current === "/") setDirection("splash");
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

  return (
    <NavigationContext.Provider value={{ direction, setAnimationDirection }}>
      {children}
    </NavigationContext.Provider>
  );
}
