import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Projects Kevin authors, maintains, and contributes to — including nestjs-trpc.",
};

export default function OssLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
