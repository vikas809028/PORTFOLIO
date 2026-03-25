/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { workExperience } from "@/data";

/* ---------- HOOK ---------- */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ---------- CARD ---------- */
function Card({
  card,
  hovered,
  setHovered,
  inView,
  index,
  slideFrom,
}: any) {
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      style={{
        width: "100%",
        maxWidth: 600,
        padding: "clamp(18px,4vw,28px) clamp(18px,5vw,32px)",
        borderRadius: 18,
        border: `1px solid ${
          hovered ? "rgba(139,92,246,0.45)" : "rgba(255,255,255,0.06)"
        }`,
        background: hovered
          ? "rgba(18,20,42,0.95)"
          : "rgba(12,14,32,0.75)",
        backdropFilter: "blur(14px)",
        boxShadow: hovered
          ? "0 10px 36px rgba(0,0,0,0.55)"
          : "0 2px 14px rgba(0,0,0,0.35)",
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateX(0)"
          : slideFrom === "left"
          ? "translateX(-32px)"
          : "translateX(32px)",
        transition: `all 0.5s ease ${index * 100}ms`,
      }}
    >
      {/* TOP */}
      <div style={{ display: "flex", gap: 16 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 12,
            background: "rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={card.thumbnail}
            alt={card.companyname}
            style={{ width: 32 }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: 0,
              fontSize: "clamp(1rem,2.5vw,1.25rem)",
              color: "#f1f5f9",
            }}
          >
            {card.title}
          </h3>

          <p style={{ margin: "4px 0", color: "#64748b" }}>
            {card.companyname}
          </p>

          <span
            style={{
              fontSize: "0.75rem",
              color: "#a78bfa",
            }}
          >
            {card.time}
          </span>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.05)",
          margin: "14px 0",
        }}
      />

      <p
        style={{
          fontSize: "clamp(0.85rem,2.3vw,0.95rem)",
          color: "#94a3b8",
          lineHeight: 1.6,
        }}
      >
        {card.desc}
      </p>
    </div>
  );
}

/* ---------- TIMELINE CARD ---------- */
function TimelineCard({ card, index, isLast }: any) {
  const { ref, inView } = useInView(0.15);
  const [hovered, setHovered] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="grid md:grid-cols-[1fr_48px_1fr] grid-cols-[32px_1fr]"
      style={{ alignItems: "flex-start" }}
    >
      {/* LEFT */}
      <div
        style={{
          padding: "0 clamp(10px,3vw,28px) 40px 0",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {isLeft && (
          <Card
            card={card}
            hovered={hovered}
            setHovered={setHovered}
            inView={inView}
            index={index}
            slideFrom="left"
          />
        )}
      </div>

      {/* CENTER */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#7c3aed,#6366f1)",
          }}
        />

        {!isLast && (
          <div
            style={{
              width: 2,
              flex: 1,
              minHeight: 80,
              background: "rgba(124,58,237,0.3)",
            }}
          />
        )}
      </div>

      {/* RIGHT */}
      <div
        style={{
          padding: "0 0 40px clamp(10px,3vw,28px)",
        }}
      >
        {!isLeft && (
          <Card
            card={card}
            hovered={hovered}
            setHovered={setHovered}
            inView={inView}
            index={index}
            slideFrom="right"
          />
        )}
      </div>
    </div>
  );
}

/* ---------- MOBILE ---------- */
function MobileTimeline() {
  return (
    <div
      className="md:hidden"
      style={{
        maxWidth: 520,
        margin: "0 auto",
        padding: "0 clamp(12px,4vw,20px)",
      }}
    >
      {workExperience.map((card, i) => {
        const isLast = i === workExperience.length - 1;

        return (
          <div key={card.id} style={{ display: "flex" }}>
            <div style={{ width: 28 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#7c3aed",
                }}
              />
              {!isLast && (
                <div
                  style={{
                    width: 2,
                    height: 60,
                    background: "#7c3aed",
                  }}
                />
              )}
            </div>

            <div style={{ flex: 1, marginLeft: 12, paddingBottom: 24 }}>
              <Card
                card={card}
                hovered={false}
                setHovered={() => {}}
                inView={true}
                index={i}
                slideFrom="left"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- MAIN ---------- */
export default function Experience() {
  useEffect(() => {
    const id = "dm-sans-exp";
    if (document.getElementById(id)) return;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap";

    document.head.appendChild(link);
  }, []);

  return (
    <div className="py-20 w-full" style={{ overflowX: "hidden" }}>
       <h1 className="heading mb-16">
        My <span className="text-purple">Work Experience</span>
      </h1>

      {/* Desktop */}
      <div
        className="hidden md:block"
        style={{
          maxWidth: 1200,
          margin: "3rem auto",
          padding: "0 2rem",
        }}
      >
        {workExperience.map((card, i) => (
          <TimelineCard
            key={card.id}
            card={card}
            index={i}
            isLast={i === workExperience.length - 1}
          />
        ))}
      </div>

      {/* Mobile */}
      <MobileTimeline />
    </div>
  );
}