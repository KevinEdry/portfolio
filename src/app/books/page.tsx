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
import { InertiaPlugin } from "gsap/InertiaPlugin";
import WaveHeading from "~/components/text/wave-heading";
import ScrambleText from "~/components/text/scramble-text";

const bookSchema = z.array(
  z.object({
    cover: z.string(),
    title: z.string(),
    author: z.string(),
    description: z.string(),
    link: z.string(),
    shelf: z.string(),
    short: z.string(),
  }),
);

type Book = z.infer<typeof bookSchema>[number];

const CARD_GAP = 12;
const TAP_SLOP_PX = 6;

const BOOKS = bookSchema.parse(booksArrayJson);
const SHELVES = [...new Set(BOOKS.map((book) => book.shelf))];

export default function Books() {
  const [activeShelf, setActiveShelf] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openBook, setOpenBook] = useState<Book | null>(null);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const stepRef = useRef(0);
  const maxTravelRef = useRef(0);
  const pointerDownAt = useRef({ x: 0, y: 0 });

  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const visibleBooks =
    activeShelf == null
      ? BOOKS
      : BOOKS.filter((book) => book.shelf === activeShelf);
  const maxIndex = Math.max(0, visibleBooks.length - 1);

  // A tap can also arm Draggable's inertia tween for a pixel of movement —
  // kill anything else driving the track before a programmatic travel, or
  // the two tweens fight and the strip strands between slots.
  const settleTrack = useCallback(() => {
    const track = trackRef.current;
    if (track == null) return;
    draggableRef.current?.tween?.kill();
    gsap.killTweensOf(track);
  }, []);

  const travelToX = useCallback(
    (x: number, immediate = false) => {
      const track = trackRef.current;
      if (track == null) return;
      settleTrack();
      const clamped = Math.min(0, Math.max(-maxTravelRef.current, x));
      if (immediate || reduced()) {
        gsap.set(track, { x: clamped });
      } else {
        gsap.to(track, {
          x: clamped,
          duration: 0.6,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
      setActiveIndex(
        Math.min(
          Math.max(Math.round(-clamped / (stepRef.current || 1)), 0),
          maxIndex,
        ),
      );
    },
    [maxIndex, settleTrack],
  );

  const travelTo = useCallback(
    (index: number, immediate = false) => {
      travelToX(-index * stepRef.current, immediate);
    },
    [travelToX],
  );

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.min(Math.max(index, 0), maxIndex);
      travelTo(clamped);
    },
    [maxIndex, travelTo],
  );

  // Brings a card fully into view with the minimum travel: no movement if it
  // is already fully visible, otherwise just enough to clear the near edge.
  const ensureVisible = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (track == null || viewport == null) return;
      const step = stepRef.current || 1;
      const cardWidth = step - CARD_GAP;
      const currentX = Number(gsap.getProperty(track, "x"));
      const left = index * step + currentX;
      const right = left + cardWidth;
      if (left < 0) {
        travelToX(-index * step);
      } else if (right > viewport.clientWidth) {
        travelToX(viewport.clientWidth - cardWidth - index * step);
      }
    },
    [travelToX],
  );

  // Track geometry and drag mechanics: travel derives from card index and
  // step width; momentum flicks always land snapped on a card. The track
  // never travels past the last card (it stops when the tail is in view).
  useLayoutEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (track == null || viewport == null) return;

    gsap.registerPlugin(Draggable, InertiaPlugin);

    const measure = () => {
      const card = track.querySelector<HTMLElement>("[data-card]");
      if (card != null) {
        stepRef.current = card.offsetWidth + CARD_GAP;
      }
      const total = visibleBooks.length * stepRef.current - CARD_GAP;
      maxTravelRef.current = Math.max(0, total - viewport.clientWidth);
      const bounds = { minX: -maxTravelRef.current, maxX: 0 };
      draggableRef.current?.applyBounds(bounds);
      return bounds;
    };

    const bounds = measure();

    const snapToStep = (value: number) => {
      const step = stepRef.current || 1;
      const snapped = Math.round(value / step) * step;
      return Math.min(0, Math.max(-maxTravelRef.current, snapped));
    };

    const settleIndex = (x: number) => {
      const step = stepRef.current || 1;
      setActiveIndex(Math.min(Math.max(Math.round(-x / step), 0), maxIndex));
    };

    const [draggable] = Draggable.create(track, {
      type: "x",
      bounds,
      cursor: "grab",
      activeCursor: "grabbing",
      zIndexBoost: false,
      inertia: true,
      maxDuration: 0.8,
      snap: { x: snapToStep },
      onDragEnd() {
        settleIndex(this.endX ?? this.x);
      },
      onThrowComplete() {
        settleIndex(this.x);
      },
    });
    draggableRef.current = draggable ?? null;

    const onResize = () => {
      measure();
      const current = Number(gsap.getProperty(track, "x"));
      gsap.set(track, { x: snapToStep(current) });
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      draggable?.kill();
      draggableRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleBooks.length, maxIndex]);

  // Filter: departing cards drop away faster than arrivals settle.
  const applyShelf = useCallback(
    (shelf: string | null) => {
      if (shelf === activeShelf) return;
      const cards = trackRef.current?.querySelectorAll("[data-card]");
      const swap = () => {
        setActiveShelf(shelf);
        setActiveIndex(0);
        setOpenBook(null);
      };
      if (cards == null || cards.length === 0 || reduced()) {
        swap();
        return;
      }
      gsap.to(cards, {
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
        stagger: 0.012,
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
    if (reduced()) {
      gsap.set(cards, { autoAlpha: 1 });
      return;
    }
    gsap.fromTo(
      cards,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.5, ease: "power2.out", stagger: 0.045 },
    );
  }, [activeShelf, travelTo]);

  // The review card fades in over the clicked cover.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (panel == null || openBook == null) return;
    if (reduced()) {
      gsap.set(panel, { autoAlpha: 1 });
      return;
    }
    gsap.fromTo(
      panel,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.35, ease: "power2.out", delay: 0.1 },
    );
  }, [openBook]);

  useEffect(() => {
    if (openBook == null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenBook(null);
    };
    // Clicking anywhere outside the open review dismisses it; a click on
    // another card closes this one on pointerdown and opens that one on its
    // own pointerup.
    const onPointerDown = (event: PointerEvent) => {
      const panel = panelRef.current;
      if (
        panel != null &&
        event.target instanceof Node &&
        panel.contains(event.target)
      ) {
        return;
      }
      setOpenBook(null);
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openBook]);

  const openReview = (book: Book, index: number) => {
    if (openBook?.title === book.title) return;
    ensureVisible(index);
    setOpenBook(book);
  };

  return (
    <div className="bookshelf flex h-full w-full flex-col gap-5 overflow-hidden px-4 py-4 lg:gap-4 lg:px-0 lg:py-5">
      <div className="flex shrink-0 flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div className="flex flex-col gap-2">
          <ScrambleText
            text="The bookshelf"
            className="text-sm uppercase tracking-[0.2em] text-text-secondary"
          />
          <WaveHeading
            text="What shaped my thinking"
            className="text-4xl font-black leading-none tracking-tight lg:text-6xl [@media(max-height:760px)]:lg:text-5xl"
          />
        </div>
        <p className="max-w-md leading-6 text-text-secondary lg:text-right">
          The books I hand to engineers who want to lead. Pick one off the
          shelf for my honest take.
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row lg:items-start lg:gap-10">
        <aside className="flex shrink-0 flex-col gap-4 lg:h-[var(--bk-card-h)] lg:w-[180px] lg:justify-between lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
            <li>
              <button
                type="button"
                onClick={() => applyShelf(null)}
                className={clsx(
                  "cursor-pointer whitespace-nowrap rounded-full border px-4 py-1.5 text-[13px] transition-all duration-200",
                  activeShelf == null
                    ? "border-text font-semibold text-text"
                    : "border-border text-text-secondary hover:border-text/40 hover:text-text",
                )}
              >
                Everything
              </button>
            </li>
            {SHELVES.map((shelf) => (
              <li key={shelf}>
                <button
                  type="button"
                  onClick={() => applyShelf(shelf)}
                  className={clsx(
                    "cursor-pointer whitespace-nowrap rounded-full border px-4 py-1.5 text-[13px] capitalize transition-all duration-200",
                    activeShelf === shelf
                      ? "border-text font-semibold text-text"
                      : "border-border text-text-secondary hover:border-text/40 hover:text-text",
                  )}
                >
                  {shelf}
                </button>
              </li>
            ))}
          </ul>
          <div className="hidden flex-col gap-2.5 lg:flex">
            <span className="text-sm font-medium tabular-nums text-text-muted">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(visibleBooks.length).padStart(2, "0")}
            </span>
            <span className="h-1 w-full overflow-hidden rounded-full bg-border">
              <span
                className="block h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{
                  width: `${((activeIndex + 1) / Math.max(1, visibleBooks.length)) * 100}%`,
                }}
              />
            </span>
          </div>
        </aside>

        <div
          ref={viewportRef}
          className="min-h-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,black_0%,black_94%,transparent_100%)] lg:self-stretch"
        >
        <div
          ref={trackRef}
          className="flex h-full items-center will-change-transform lg:items-start"
          style={{ gap: `${CARD_GAP}px` }}
        >
          {visibleBooks.map((book, index) => (
            <div
              key={book.title}
              data-card
              onPointerDown={(event) => {
                pointerDownAt.current = { x: event.clientX, y: event.clientY };
              }}
              onPointerUp={(event) => {
                const dx = Math.abs(event.clientX - pointerDownAt.current.x);
                const dy = Math.abs(event.clientY - pointerDownAt.current.y);
                if (dx <= TAP_SLOP_PX && dy <= TAP_SLOP_PX) {
                  openReview(book, index);
                }
              }}
              className="group flex w-[300px] shrink-0 cursor-pointer select-none flex-col justify-between gap-3 rounded-2xl bg-white p-3 shadow-xl shadow-black/[0.07] transition-shadow duration-300 hover:shadow-black/[0.14] lg:h-[var(--bk-card-h)] lg:w-[var(--bk-card-w)] lg:rounded-[20px] lg:p-[18px] lg:shadow-none"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl lg:aspect-auto lg:h-[var(--bk-cover-h)] lg:w-[var(--bk-cover-w)]">
                <Image
                  src={book.cover}
                  alt={`${book.title} cover`}
                  fill
                  sizes="(min-width: 1024px) 380px, 300px"
                  draggable={false}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {openBook != null && openBook.title === book.title && (
                  <div
                    ref={panelRef}
                    className="absolute inset-0 z-10 flex flex-col gap-3 rounded-xl bg-white p-5 opacity-0"
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
                        className="shrink-0 cursor-pointer text-sm text-text/50 transition-colors duration-200 hover:text-primary"
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
                    <hr className="w-12 text-primary" />
                    <div className="min-h-0 flex-1">
                      <p className="text-[15px] leading-7 text-text-secondary">
                        {book.short}
                      </p>
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
              <div className="flex items-center justify-between gap-3 px-1 pb-1">
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-[15px] font-bold leading-snug">
                    {book.title}
                  </span>
                  <span className="truncate text-xs text-text-muted">
                    {book.author}
                  </span>
                </div>
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-text/60 transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-white"
                >
                  →
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
