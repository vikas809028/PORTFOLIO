"use client";

import React, { useEffect, useState } from "react";
import { testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

const Clients = () => {
  const [speed, setSpeed] = useState<"fast" | "normal" | "slow">("slow");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSpeed("fast"); // 📱 mobile → faster = smoother
      } else {
        setSpeed("slow"); // 💻 desktop → keep slow
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="testimonials" className="py-20">
      <h1 className="heading">
        Kind words from{" "}
        <span className="text-purple">satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center mt-10">
        <div className="h-[22rem] flex flex-col items-center justify-center relative overflow-hidden w-full">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed={speed} // ✅ dynamic speed
          />
        </div>
      </div>
    </section>
  );
};

export default Clients;