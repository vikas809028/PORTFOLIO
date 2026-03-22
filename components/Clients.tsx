/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

const Clients = () => {
  return (
    <section id="testimonials" className="py-20">
      <h1 className="heading">
        Kind words from{" "}
        <span className="text-purple">satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center mt-10">
        {/* height just enough to show one row of cards comfortably */}
        <div className="h-[22rem] flex flex-col items-center justify-center relative overflow-hidden w-full">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
};

export default Clients;