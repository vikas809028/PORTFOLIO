/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: { quote: string; name: string; title: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      Array.from(scrollerRef.current.children).forEach((item) => {
        scrollerRef.current!.appendChild(item.cloneNode(true));
      });
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const dur = speed === "fast" ? "40s" : speed === "normal" ? "70s" : "110s";
      containerRef.current.style.setProperty("--animation-duration", dur);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-screen overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-5 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            style={{
              width: "calc(33vw - 1.5rem)",   /* exactly 3 visible at a time */
              minWidth: 320,                   /* floor on small screens */
              flexShrink: 0,
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.09)",
              background: "linear-gradient(145deg, rgba(4,7,29,1) 0%, rgba(10,12,32,1) 100%)",
              padding: "28px 30px",
            }}
          >
            <blockquote>
              {/* quote mark */}
              <div style={{
                fontSize: "3rem", lineHeight: 1, color: "#a78bfa",
                opacity: 0.45, marginBottom: 10, fontFamily: "Georgia, serif",
              }}>
                "
              </div>

              {/* quote text */}
              <p style={{
                fontSize: "0.97rem", lineHeight: 1.75,
                color: "#94a3b8", fontWeight: 400,
                display: "-webkit-box", WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical", overflow: "hidden",
                margin: 0,
              }}>
                {item.quote}
              </p>

              {/* author row */}
              <div style={{
                display: "flex", alignItems: "center", gap: 14,
                marginTop: 20, paddingTop: 16,
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}>
                <img
                  src="/ceo.jpeg"
                  alt={item.name}
                  style={{ width: 44, height: 44, borderRadius: "50%",
                    border: "2px solid rgba(167,139,250,0.4)", flexShrink: 0,
                    objectFit: "cover" }}
                />
                <div>
                  <p style={{ margin: 0, fontSize: "0.97rem", fontWeight: 700,
                    color: "#f1f5f9", lineHeight: 1.3 }}>
                    {item.name}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "#64748b",
                    fontWeight: 400, marginTop: 2 }}>
                    {item.title}
                  </p>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};