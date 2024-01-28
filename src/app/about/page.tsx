import Signature from "~/public/icons/signature.svg";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <React.Fragment>
      <div className="h-[80%] w-1/2">
        <Image
          width={552}
          height={630}
          src="/images/avatar.png"
          alt="avatar"
          className="rounded-lg"
        />
      </div>
      <div className="flex h-[80%] w-1/2 flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-black">Kevin Edry</h1>
          <hr className="w-40 text-primary" />
          <p className="text-text/40">Senior Engineering Manager</p>
        </div>

        <div className="flex h-full w-full flex-col gap-6 text-sm">
          <p>
            Hello! I’m Kevin, a seasoned Engineering Manager based in Seattle,
            WA. With an extensive background in software engineering, I
            specialize in leading and scaling high-performing engineering teams
            to build enterprise-level software. I have a strong knack for
            guiding teams through complex software development life cycles.
          </p>
          <p>
            I have been privileged to be a part of several accelerator programs
            that have significantly contributed to my professional growth. These
            include AWS Floor 28 Builder Space, Fusion LA, and Facebook for
            Startups. Participation in these programs has not only broadened my
            network and knowledge base but also sharpened my skills in various
            aspects of technology and business leadership.
          </p>
          <p>
            Driven by a commitment to innovation and leveraging the latest in
            technology to create efficient, automated systems, I am dedicated to
            contributing to a leading tech company. With my extensive management
            experience and a proven track record in the tech industry, I am
            poised to enhance any suite of platforms, particularly in the realm
            of enterprise SaaS models.
          </p>
        </div>
        <Signature className="h-72 pt-10" />
      </div>
    </React.Fragment>
  );
}
