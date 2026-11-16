"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { z } from "zod";
import booksArrayJson from "~/content/books.json";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import WaveHeading from "~/components/text/wave-heading";

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
const CARD_GAP = 24;
const TAP_SLOP_PX = 6;

const BOOKS = bookSchema.parse(booksArrayJson);
const SHELVES = [...new Set(BOOKS.map((book) => book.shelf))];

export default function Books() {
  const books = BOOKS;
  const shelves = SHELVES;

  const [activeShelf, setActiveShelf] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openBook, setOpenBook] = useState<Book | null>(null);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const stepRef = useRef(0);
  const pointerDownAt = useRef({ x: 0, y: 0 });
  const reducedMotion = useRef(false);

  const visibleBooks =
    activeShelf == null
      ? books
      : books.filter((book) => book.shelf === activeShelf);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const maxIndex = Math.max(0, visibleBooks.length - 1);

  const travelTo = useCallback((index: number, immediate = false) => {
    const track = trackRef.current;
    if (track == null) return;
    const x = -index * stepRef.current;
    if (immediate || reducedMotion.current) {
      gsap.set(track, { x });
    } else {
      gsap.to(track, { x, duration: 0.6, ease: "power3.out" });
    }
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.min(Math.max(index, 0), maxIndex);
      setActiveIndex(clamped);
      travelTo(clamped);
    },
    [maxIndex, travelTo],
  );

  // Track geometry and drag mechanics. Travel is always derived from card
  // index and step width, so resizes and filter changes can't misalign it.
  useLayoutEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (track == null || viewport == null) return;

    gsap.registerPlugin(Draggable);

    const measure = () => {
      const card = track.querySelector<HTMLElement>("[data-card]");
      if (card != null) {
        stepRef.current = card.offsetWidth + CARD_GAP;
      }
      const bounds = {
        minX: -Math.max(0, visibleBooks.length - 1) * stepRef.current,
        maxX: 0,
      };
      draggableRef.current?.applyBounds(bounds);
      return bounds;
    };

    const bounds = measure();

    const [draggable] = Draggable.create(track, {
      type: "x",
      bounds,
      cursor: "grab",
      activeCursor: "grabbing",
      zIndexBoost: false,
      onDragEnd() {
        const nearest = Math.round(-this.x / stepRef.current);
        const clamped = Math.min(
          Math.max(nearest, 0),
          Math.max(0, visibleBooks.length - 1),
        );
        setActiveIndex(clamped);
        gsap.to(track, {
          x: -clamped * stepRef.current,
          duration: 0.45,
          ease: "power3.out",
        });
      },
    });
    draggableRef.current = draggable ?? null;

    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      draggable?.kill();
      draggableRef.current = null;
    };
  }, [visibleBooks.length]);

  // Filter changes: departing cards leave faster than arriving ones settle —
  // the roster's asymmetric timing.
  const applyShelf = useCallback(
    (shelf: string | null) => {
      if (shelf === activeShelf) return;
      const track = trackRef.current;
      const cards = track?.querySelectorAll("[data-card]");
      const swap = () => {
        setActiveShelf(shelf);
        setActiveIndex(0);
        setOpenBook(null);
      };
      if (track == null || cards == null || reducedMotion.current) {
        swap();
        return;
      }
      gsap.to(cards, {
        autoAlpha: 0,
        y: 14,
        duration: 0.22,
        ease: "power2.in",
        stagger: 0.015,
        onComplete: swap,
      });
    },
    [activeShelf],
  );

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (track == null) return;
    travelTo(0, true);
    const cards = track.querySelectorAll("[data-card]");
    if (reducedMotion.current) {
      gsap.set(cards, { autoAlpha: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      cards,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.55, ease: "power2.out", stagger: 0.05 },
    );
  }, [activeShelf, travelTo]);

  // Opening a review first brings the card to the front of the track, then
  // fades the panel in beside it — the selected cover stays visible as the
  // "photo" while the other cards sit muted underneath the panel.
  const openReview = useCallback(
    (book: Book, index: number) => {
      if (openBook?.title === book.title) return;
      goTo(index);
      setOpenBook(book);
    },
    [goTo, openBook],
  );

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (panel == null || openBook == null) return;
    gsap.fromTo(
      panel,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.35, ease: "power2.out", delay: 0.15 },
    );
  }, [openBook]);

  useEffect(() => {
    if (openBook == null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenBook(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openBook]);

  const onRosterKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-hidden px-4 py-4 lg:flex-row lg:gap-12 lg:px-0 lg:py-0">
      <div className="flex shrink-0 flex-col gap-4 lg:w-1/3 lg:pt-14">
        <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">
          The bookshelf
        </p>
        <WaveHeading
          text="What shaped my thinking"
          className="text-3xl font-black leading-tight lg:text-5xl"
        />
        <hr className="w-40 text-primary" />
        <p className="max-w-sm leading-7 text-text-secondary">
          The books I hand to engineers who want to lead. Drag through the
          shelf, pick one for my honest take.
        </p>
        <ul className="flex flex-wrap gap-2 pt-2 lg:flex-col lg:gap-3">
          <li>
            <button
              type="button"
              onClick={() => applyShelf(null)}
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
                onClick={() => applyShelf(shelf)}
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

      <div className="relative min-h-0 flex-1 lg:py-8">
        <div
          ref={viewportRef}
          role="region"
          aria-label="Bookshelf slider"
          tabIndex={0}
          onKeyDown={onRosterKeyDown}
          className="flex h-full items-center overflow-hidden outline-none focus-visible:ring-1 focus-visible:ring-primary/60"
        >
          <div
            ref={trackRef}
            className="flex items-start will-change-transform"
            style={{ gap: `${CARD_GAP}px` }}
          >
            {visibleBooks.map((book, index) => (
              <div
                key={book.title}
                data-card
                onPointerDown={(event) => {
                  pointerDownAt.current = {
                    x: event.clientX,
                    y: event.clientY,
                  };
                }}
                onPointerUp={(event) => {
                  const dx = Math.abs(event.clientX - pointerDownAt.current.x);
                  const dy = Math.abs(event.clientY - pointerDownAt.current.y);
                  if (dx <= TAP_SLOP_PX && dy <= TAP_SLOP_PX) {
                    openReview(book, index);
                  }
                }}
                className="group w-60 shrink-0 cursor-pointer select-none lg:w-72"
              >
                <div
                  className={clsx(
                    "relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg shadow-black/40 transition-all duration-300",
                    index === activeIndex
                      ? openBook == null && "group-hover:-translate-y-1"
                      : "brightness-90 saturate-[0.55] group-hover:brightness-100 group-hover:saturate-100",
                  )}
                >
                  <Image
                    src={book.cover}
                    alt={`${book.title} cover`}
                    fill
                    sizes="288px"
                    draggable={false}
                    className="object-cover"
                  />
                  {openBook != null && openBook.title === book.title && (
                    <div
                      ref={panelRef}
                      className="glass-strong absolute inset-0 z-10 flex flex-col gap-3 rounded-lg p-5 opacity-0"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-[11px] uppercase tracking-[0.18em] text-primary">
                          {book.shelf}
                        </span>
                        <button
                          type="button"
                          aria-label="Close book details"
                          onClick={(event) => {
                            event.stopPropagation();
                            setOpenBook(null);
                          }}
                          className="shrink-0 cursor-pointer text-xs text-text/60 transition-colors duration-200 hover:text-primary"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h2 className="text-base font-bold leading-snug">
                          {book.title}
                        </h2>
                        <span className="text-xs text-text-muted">
                          {book.author}
                        </span>
                      </div>
                      <hr className="w-16 text-primary" />
                      <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto">
                        {book.description === REVIEW_STUB ? (
                          <p className="text-sm italic leading-6 text-text-muted">
                            My take on this one is still in the drafts. The
                            short version: it earned its spot on the shelf.
                          </p>
                        ) : (
                          <p className="whitespace-pre-line text-sm leading-6 text-text-secondary">
                            {book.description}
                          </p>
                        )}
                      </div>
                      <Link
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="text-sm font-bold text-primary transition-colors duration-200 hover:text-primary/80"
                      >
                        View on Amazon →
                      </Link>
                    </div>
                  )}
                </div>
                <div className="flex flex-col pt-2">
                  <span className="truncate text-sm font-bold transition-colors duration-200 group-hover:text-primary">
                    {book.title}
                  </span>
                  <span className="truncate text-xs text-text-muted">
                    {book.author}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
