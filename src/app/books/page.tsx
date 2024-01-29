"use client";

import Image from "next/image";
import React from "react";

export default function Books() {
  return (
    <React.Fragment>
      <div className="flex h-[80%] w-1/2 flex-col gap-3">
        <ul>
          <li>
            <Image />
          </li>
        </ul>
      </div>
      <div className="flex h-[80%] w-1/2 flex-col gap-4"></div>
    </React.Fragment>
  );
}
