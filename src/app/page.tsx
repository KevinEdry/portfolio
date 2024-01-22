"use client";

import React from 'react';
import Social from '~/components/social/social';
import HeroTitle from '~/components/hero-title/hero-title';
import Link from 'next/link';

import { motion } from 'framer-motion';


export default function Splash() {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col h-full items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-full'>
            <motion.div layoutId='hero' animate>
              <HeroTitle />
            </motion.div>
          </div>
          <hr className="text-primary w-40"/>
          <p className="text-text/40">Senior Engineering Manager</p>
          <Link href={"/about"} className='pt-5'>
            <button className='w-32 h-10 rounded-md font-bold bg-primary hover:bg-primary/90'>ENTER</button>
          </Link>
        </div>
      </div>
      <motion.ul className="flex gap-8 justify-center pb-10" initial={{opacity:0, y: "5rem"}} animate={{opacity:1, y: 0, transition: {
        staggerChildren: 0.5
      }}} exit={{
        opacity: 0,
        y: "-5rem",
      }}>
        <Social platform='linkedin' link='https://www.linkedin.com/in/kevinedry/' />
        <Social platform='github' link='https://github.com/KevinEdry' />
        <Social platform='medium' link='https://medium.com/@techg9' />
        <Social platform='twitter' link='https://twitter.com/KevinEdry' />
      </motion.ul>
    </div>
  );
}