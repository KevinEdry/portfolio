"use client";

import React, { useState } from "react";
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

  const element = (hovered: boolean) => (
    <div className="gradient-mask-t-80-d absolute flex h-full w-fit gap-5 overflow-hidden">
      {chunkify(books, 3).map((booksArray, index) => (
        <Ticker
          direction={index === 1 ? "down" : "up"}
          key={index}
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
    <React.Fragment>
      <div className="relative h-full max-h-full min-h-full w-5/12">
        {tickers}
      </div>
      <div className="items-left flex w-7/12 flex-col justify-center gap-4 pb-5">
        <div className="flex w-full gap-5">
          <div className="flex w-fit flex-col gap-5">
            <Image
              src={currentBook.cover}
              alt={currentBook.title}
              width={200}
              height={336}
            />
            <Link href={currentBook.link} target="_blank">
              <Button type="outline">Amazon</Button>
            </Link>
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <h1 className="text-2xl font-bold">{currentBook.title}</h1>
            <h4 className="font-light">{currentBook.author}</h4>
            <hr className="w-40 text-primary" />
            <p className="text-md whitespace-pre-line leading-6 text-text-secondary">
              {currentBook.description}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
