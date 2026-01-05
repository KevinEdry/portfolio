"use client";

import React, { useState, useEffect } from "react";
import Ticker from "~/components/books/ticker";
import { z } from "zod";
import booksArrayJson from "~/content/books.json";
import TickerItem from "~/components/books/ticker-item";
import { chunkify } from "~/utils/chunkify";
import { useHover } from "react-use";
import Image from "next/image";
import Button from "~/ui/button/button";
import Link from "next/link";

const bookSchema = z.array(
  z.object({
    cover: z.string(),
    title: z.string(),
    author: z.string(),
    description: z.string(),
    link: z.string(),
  }),
);

export default function Books() {
  const books = bookSchema.parse(booksArrayJson);
  const firstBook = books[0];

  if (firstBook == null) {
    throw new Error("Could not find the first book");
  }
  const [currentBook, changeCurrentBook] = useState(firstBook);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 1280) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const element = (hovered: boolean) => (
    <div className="gradient-mask-t-80-d absolute flex h-full w-fit gap-5 overflow-hidden">
      {chunkify(books, columns).map((booksArray, index) => (
        <Ticker
          direction={index === 1 ? "down" : "up"}
          key={`${columns}-${index}`}
          pause={hovered}
          duration={15}
        >
          {booksArray.map((book, idx) => (
            <TickerItem
              alt={`${book.title} Book Cover`}
              key={`${index}_${idx}`}
              index={idx}
              src={book.cover}
              onClick={() => {
                changeCurrentBook({ ...book });
              }}
            />
          ))}
        </Ticker>
      ))}
    </div>
  );
  const [tickers] = useHover(element);

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden lg:flex-row lg:gap-0">
      <div className="relative hidden h-full max-h-full min-h-full lg:block lg:w-4/12 xl:w-5/12">
        {tickers}
      </div>
      <div className="scrollbar-hidden items-left flex flex-1 flex-col justify-start gap-4 overflow-y-auto px-4 py-4 lg:w-8/12 lg:justify-center lg:px-0 lg:py-0 lg:pb-5 xl:w-7/12">
        <div className="flex w-full flex-col gap-5 lg:flex-row">
          <div className="flex w-fit shrink-0 flex-col gap-5">
            <Image
              src={currentBook.cover}
              alt={currentBook.title}
              width={200}
              height={336}
              className="w-32 lg:w-[200px]"
            />
            <Link href={currentBook.link} target="_blank">
              <Button type="outline">Amazon</Button>
            </Link>
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <h1 className="text-xl font-bold lg:text-2xl">{currentBook.title}</h1>
            <h4 className="font-light">{currentBook.author}</h4>
            <hr className="w-40 text-primary" />
            <p className="text-md whitespace-pre-line leading-6 text-text-secondary">
              {currentBook.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
