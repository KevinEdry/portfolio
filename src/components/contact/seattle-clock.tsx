"use client";

import { useEffect, useState } from "react";

function seattleTime(): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Los_Angeles",
  }).format(new Date());
}

export default function SeattleClock({
  variant = "inline",
}: {
  variant?: "inline" | "display";
}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(seattleTime());
    const interval = setInterval(() => setTime(seattleTime()), 30_000);
    return () => clearInterval(interval);
  }, []);

  if (variant === "display") {
    return (
      <div className="flex flex-col items-center gap-3">
        <span className="whitespace-nowrap text-6xl font-black tabular-nums text-text/90 xl:text-7xl">
          {time ?? "––:––"}
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-text-muted">
          Seattle, WA · my local time
        </span>
        <span className="text-sm text-text-secondary">
          I usually reply within a day.
        </span>
      </div>
    );
  }

  if (time == null) {
    return <span>Based in Seattle, WA.</span>;
  }

  return <span>Based in Seattle, WA — it&apos;s {time} here right now.</span>;
}
