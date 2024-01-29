"use client";

import React from "react";
import Ticker from "~/components/books/ticker";
import { z } from "zod";
import booksArrayJson from "~/content/books.json";
import TickerItem from "~/components/books/ticker-item";
import { chunkify } from "~/utils/chunkify";

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

  return (
    <React.Fragment>
      <div className="relative h-full max-h-full min-h-full w-1/2">
        <div className="gradient-mask-t-80-d absolute flex h-full w-full gap-5 overflow-hidden">
          {chunkify(books, 3).map((booksArray, index) => (
            <Ticker
              direction={index === 1 ? "down" : "up"}
              key={index}
              duration={15}
            >
              {booksArray.map((book, idx) => (
                <TickerItem
                  alt={`${book.title} Book Cover`}
                  key={`${index}_${idx}`}
                  index={idx}
                  src={book.cover}
                />
              ))}
            </Ticker>
          ))}
        </div>
      </div>
      <div className="flex w-1/2 flex-col gap-4"></div>
    </React.Fragment>
  );
}
