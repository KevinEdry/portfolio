"use client";

import React from "react";
import TintedImage from "~/ui/tinted-image/tinted-image";
import { motion } from "framer-motion";
import { useMeasure } from "react-use";

export default function Books() {
  const [ref, { height }] = useMeasure();

  return (
    <React.Fragment>
      <div className="relative h-full max-h-full min-h-full w-1/2">
        <div
          ref={ref}
          className="gradient-mask-t-80-d absolute flex h-full w-full gap-5 overflow-hidden"
        >
          <motion.ul
            animate={{ y: -height }}
            transition={{
              duration: 15,
              ease: "linear",
              repeat: Infinity,
              repeatType: "mirror",
            }}
            initial={{ y: 0 }}
            className="flex flex-col gap-10"
          >
            <li>
              <TintedImage
                src={"/images/books/20 Principle.png"}
                alt="80/20 Principle book cover"
                height={253}
                width={158}
              />
            </li>
            <li>
              <TintedImage
                src={"/images/books/Multipliers.png"}
                alt="Multipliers book cover"
                height={253}
                width={158}
              />
            </li>
            <li>
              <TintedImage
                src={"/images/books/The Mythical Man Month.png"}
                alt="The Mythical Man Month book cover"
                height={253}
                width={158}
              />
            </li>
          </motion.ul>
          <motion.ul
            animate={{ y: height }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            initial={{ y: 0 }}
            className="flex flex-col gap-10"
          >
            <li>
              <TintedImage
                src={"/images/books/Peopleware.png"}
                alt="Peopleware book cover"
                height={253}
                width={158}
              />
            </li>
            <li>
              <TintedImage
                src={"/images/books/Procrastinate on Purpose.png"}
                alt="Procrastinate on Purpose book cover"
                height={253}
                width={158}
              />
            </li>
            <li>
              <TintedImage
                src={"/images/books/The Lean Startup.png"}
                alt="The Lean Startup book cover"
                height={253}
                width={158}
              />
            </li>
          </motion.ul>
          <motion.ul
            animate={{ y: -height }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
            initial={{ y: 0 }}
            className="flex flex-col gap-10"
          >
            <li>
              <TintedImage
                src={"/images/books/Staff Engineer.png"}
                alt="Staff Engineer book cover"
                height={253}
                width={158}
              />
            </li>
            <li>
              <TintedImage
                src={"/images/books/Clean Code.png"}
                alt="Clean Code book cover"
                height={253}
                width={158}
              />
            </li>
            <li>
              <TintedImage
                src={"/images/books/Atomic Habits.png"}
                alt="Atomic Habits book cover"
                height={253}
                width={158}
              />
            </li>
            <li>
              <TintedImage
                src={"/images/books/The Pragmatic Programmer.png"}
                alt="The Pragmatic Programmer book cover"
                height={253}
                width={158}
              />
            </li>
          </motion.ul>
        </div>
      </div>
      <div className="flex w-1/2 flex-col gap-4"></div>
    </React.Fragment>
  );
}
