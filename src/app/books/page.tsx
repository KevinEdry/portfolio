"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import booksArrayJson from "~/content/books.json";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const bookSchema = z.array(
  z.object({
    cover: z.string(),
    title: z.string(),
    author: z.string(),
    description: z.string(),
    link: z.string(),
    shelf: z.string(),
  }),
);

type Book = z.infer<typeof bookSchema>[number];

const REVIEW_STUB = "Writing in progress";

export default function Books() {
  const books = bookSchema.parse(booksArrayJson);
  const shelves = [...new Set(books.map((book) => book.shelf))];

  const [activeShelf, setActiveShelf] = useState<string | null>(null);
  const [openBook, setOpenBook] = useState<Book | null>(null);

  const visibleBooks =
    activeShelf == null
      ? books
      : books.filter((book) => book.shelf === activeShelf);

  useEffect(() => {
    if (openBook == null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenBook(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openBook]);

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-hidden px-4 py-4 lg:flex-row lg:gap-12 lg:px-0 lg:py-0">
      <div className="flex shrink-0 flex-col gap-4 lg:w-1/3 lg:pt-14">
        <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">
          The bookshelf
        </p>
        <h1 className="text-3xl font-black leading-tight lg:text-5xl">
          What shaped
          <br />
          my thinking
        </h1>
        <hr className="w-40 text-primary" />
        <p className="max-w-sm leading-7 text-text-secondary">
          The books I hand to engineers who want to lead. Pick one off the
          shelf for my honest take.
        </p>
        <ul className="flex flex-wrap gap-2 pt-2 lg:flex-col lg:gap-3">
          <li>
            <button
              type="button"
              onClick={() => setActiveShelf(null)}
              className={clsx(
                "cursor-pointer text-sm uppercase tracking-[0.14em] transition-colors duration-200",
                activeShelf == null
                  ? "font-bold text-primary"
                  : "text-text/60 hover:text-text",
              )}
            >
              all shelves · {books.length}
            </button>
          </li>
          {shelves.map((shelf) => (
            <li key={shelf}>
              <button
                type="button"
                onClick={() => setActiveShelf(shelf)}
                className={clsx(
                  "cursor-pointer text-sm uppercase tracking-[0.14em] transition-colors duration-200",
                  activeShelf === shelf
                    ? "font-bold text-primary"
                    : "text-text/60 hover:text-text",
                )}
              >
                {shelf} · {books.filter((book) => book.shelf === shelf).length}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="scrollbar-hidden scroll-fade-y flex-1 overflow-y-auto pb-16 lg:py-14">
        <ul className="grid grid-cols-3 gap-x-5 gap-y-8 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
          {visibleBooks.map((book) => (
            <li key={book.title}>
              <button
                type="button"
                onClick={() => setOpenBook(book)}
                className="group flex w-full cursor-pointer flex-col gap-2 text-left"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md shadow-lg shadow-black/40 transition-transform duration-200 group-hover:-translate-y-1">
                  <Image
                    src={book.cover}
                    alt={`${book.title} cover`}
                    fill
                    sizes="(min-width: 1024px) 15vw, 30vw"
                    className="object-cover brightness-95 transition-all duration-200 group-hover:brightness-110"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="truncate text-sm font-bold transition-colors duration-200 group-hover:text-primary">
                    {book.title}
                  </span>
                  <span className="truncate text-xs text-text-muted">
                    {book.author}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {openBook != null && (
        <div className="fixed inset-0 z-40">
          <button
            type="button"
            aria-label="Close book details"
            onClick={() => setOpenBook(null)}
            className="absolute inset-0 h-full w-full cursor-pointer bg-black/50 backdrop-blur-[2px]"
          />
          <aside className="animate-drawer-in absolute right-0 top-0 flex h-full w-full flex-col gap-5 overflow-y-auto border-l border-border bg-surface p-6 sm:max-w-[460px] lg:p-10">
            <button
              type="button"
              aria-label="Close book details"
              onClick={() => setOpenBook(null)}
              className="flex w-fit cursor-pointer items-center gap-2 text-xs uppercase tracking-[0.18em] text-text/60 transition-colors duration-200 hover:text-primary"
            >
              ← back to the shelf
            </button>
            <div className="flex items-end gap-5">
              <Image
                src={openBook.cover}
                alt={`${openBook.title} cover`}
                width={120}
                height={180}
                className="w-24 rounded-md shadow-lg shadow-black/40 lg:w-[120px]"
              />
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.18em] text-primary">
                  {openBook.shelf}
                </span>
                <h2 className="text-xl font-bold leading-tight lg:text-2xl">
                  {openBook.title}
                </h2>
                <span className="text-sm text-text-secondary">
                  {openBook.author}
                </span>
              </div>
            </div>
            <hr className="w-40 text-primary" />
            {openBook.description === REVIEW_STUB ? (
              <p className="italic leading-7 text-text-muted">
                My take on this one is still in the drafts. The short version:
                it earned its spot on the shelf.
              </p>
            ) : (
              <p className="whitespace-pre-line leading-7 text-text-secondary">
                {openBook.description}
              </p>
            )}
            <Link
              href={openBook.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-fit shrink-0 items-center rounded-md border border-primary px-8 font-bold text-primary transition-colors duration-200 hover:bg-primary/10"
            >
              View on Amazon →
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
