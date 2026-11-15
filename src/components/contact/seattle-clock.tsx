"use client";

import { useEffect, useState } from "react";

function seattleTime(): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Los_Angeles",
  }).format(new Date());
}

export default function SeattleClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(seattleTime());
    const interval = setInterval(() => setTime(seattleTime()), 30_000);
    return () => clearInterval(interval);
  }, []);

  if (time == null) {
    return <span>Based in Seattle, WA.</span>;
  }

  return (
    <span>
      Based in Seattle, WA — it&apos;s {time} here right now.
    </span>
  );
}
