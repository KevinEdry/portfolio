import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books",
  description:
    "The bookshelf that shaped how Kevin thinks about engineering and leadership, with honest takes on each.",
};

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
