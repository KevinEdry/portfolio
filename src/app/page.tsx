import Signature from "~/public/icons/signature.svg";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div className="scrollbar-hidden flex h-full items-center justify-center overflow-y-auto px-4 py-4 lg:overflow-visible lg:px-0 lg:py-0">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="flex shrink-0 justify-center lg:w-2/5 lg:justify-start xl:w-1/2">
          <Image
            width={552}
            height={630}
            src="/images/avatar.png"
            alt="avatar"
            className="h-auto w-48 rounded-lg object-contain lg:max-h-full lg:w-auto"
          />
        </div>
        <div className="flex flex-col gap-4 lg:w-1/2">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-black lg:text-4xl">Kevin Edry</h1>
          <hr className="w-40 text-primary" />
          <p className="text-text/40">Senior Software Development Engineer</p>
        </div>

        <div className="flex w-full flex-col gap-6 text-sm">
          <p>
            Hello! I'm Kevin, an experienced Senior Software Development
            Engineer based in Seattle, WA. I have a proven track record in
            architecting and implementing innovative solutions across the full
            stack. I'm proficient in TypeScript, Python, and various frameworks,
            leading projects from conception to execution while ensuring robust
            system architecture and high performance.
          </p>
          <p>
            I have been privileged to participate in several accelerator
            programs like AWS Floor 28 Builder Space, Fusion LA, and Facebook
            for Startups. These experiences have expanded my network, sharpened
            my technical skills, and empowered me to contribute to a leading
            tech company with a strong understanding of business leadership.
          </p>
          <p>
            Driven by a commitment to innovation and leveraging the latest in
            technology to create efficient, automated systems, I am dedicated to
            contributing to a leading tech company. With my extensive technical
            experience and a proven track record in the tech industry, I am
            poised to enhance any suite of platforms, particularly in the realm
            of enterprise SaaS models.
          </p>
        </div>
        <Signature className="hidden h-72 pt-10 lg:block" />
        </div>
      </div>
    </div>
  );
}
