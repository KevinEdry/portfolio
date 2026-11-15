"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${email} to clipboard`}
      className="group flex h-10 cursor-pointer items-center gap-3 rounded-md border border-border bg-surface/50 px-5 transition-colors duration-200 hover:border-primary"
    >
      <span className="font-medium transition-colors duration-200 group-hover:text-primary">
        {email}
      </span>
      <span
        aria-live="polite"
        className="text-xs uppercase tracking-[0.14em] text-text-muted"
      >
        {copied ? "copied ✓" : "copy"}
      </span>
    </button>
  );
}
