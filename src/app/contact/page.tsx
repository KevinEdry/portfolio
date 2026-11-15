import type { Metadata } from "next";
import CopyEmail from "~/components/contact/copy-email";
import SeattleClock from "~/components/contact/seattle-clock";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kevin Edry — engineering, leadership, or Seattle coffee.",
};

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kevinedry/" },
  { label: "GitHub", href: "https://github.com/KevinEdry" },
  { label: "Medium", href: "https://medium.com/@techg9" },
];

export default function Contact() {
  return (
    <div className="flex h-full w-full items-center px-4 lg:px-0">
      <div className="flex w-full max-w-3xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl font-black leading-none text-primary lg:text-8xl">
            Let&apos;s talk.
          </h1>
          <p className="pt-3 text-2xl font-bold leading-tight lg:text-4xl">
            Tell me what you&apos;re building.
          </p>
        </div>

        <p className="max-w-lg leading-7 text-text-secondary">
          Open to senior/staff roles, engineering-leadership conversations, and
          the occasional open-source rabbit hole. One email is all it takes:
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:me@kedry.dev"
            className="flex h-10 items-center rounded-md bg-primary px-8 font-bold text-background transition-colors duration-200 hover:bg-primary/90"
          >
            Email me
          </a>
          <CopyEmail email="me@kedry.dev" />
        </div>

        <ul className="flex flex-wrap items-center gap-6">
          {SOCIALS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium uppercase tracking-[0.14em] text-text/70 transition-colors duration-200 hover:text-primary"
              >
                {label} ↗
              </a>
            </li>
          ))}
        </ul>

        <p className="text-sm text-text-muted">
          <SeattleClock /> I usually reply within a day.
        </p>
      </div>
    </div>
  );
}
