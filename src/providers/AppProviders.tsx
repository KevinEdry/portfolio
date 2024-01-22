"use client";

import { type ReactNode } from "react";
import { NavigationProvider } from "./NavigationProvider";

export function AppProviders({ children }: { children: ReactNode; }) {
  return (
    <NavigationProvider>
        {children}
    </NavigationProvider>
  );
}