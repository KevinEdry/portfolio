import type { Metadata } from "next";
import CopyEmail from "~/components/contact/copy-email";
import SeattleClock from "~/components/contact/seattle-clock";
import WaveHeading from "~/components/text/wave-heading";

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
    <div className="flex h-full w-full items-center justify-center px-4 lg:px-0">
      <div className="flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <WaveHeading
            text="Let's talk."
            fill="#E8820C"
            accent="#1A1D29"
            className="text-6xl font-black leading-none tracking-tight lg:text-9xl"
          />
          <p className="pt-3 text-2xl font-bold leading-tight lg:text-4xl">
            Tell me what you&apos;re building.
          </p>
        </div>

        <p className="max-w-xl leading-7 text-text-secondary">
          Always up for conversations about products, engineering leadership,
          and the occasional open-source rabbit hole. One email is all it
          takes:
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:me@kedry.dev"
            className="flex h-11 items-center rounded-full bg-primary px-8 font-bold text-background shadow-lg shadow-primary/25 transition-colors duration-200 hover:bg-primary/90"
          >
            Email me
          </a>
          <CopyEmail email="me@kedry.dev" />
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-6">
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

        <div className="flex flex-col items-center gap-1.5">
          <p className="max-w-xl text-sm leading-6 text-text-secondary">
            Visiting Seattle? I also run{" "}
            <a
              href="https://seattlerooftops.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-text underline decoration-primary underline-offset-4 hover:text-primary"
            >
              seattlerooftops.com
            </a>{" "}
            — the city&apos;s rooftop bars, reviewed by locals.
          </p>
          <p className="text-sm text-text-muted">
            <SeattleClock /> I usually reply within a day.
          </p>
        </div>
      </div>
    </div>
  );
}
