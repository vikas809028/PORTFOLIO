/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { workExperience } from "@/data";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setInView(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Card({
  card,
  hovered,
  setHovered,
  inView,
  index,
  slideFrom,
}: {
  card: (typeof workExperience)[0];
  hovered: boolean;
  setHovered: (v: boolean) => void;
  inView: boolean;
  index: number;
  slideFrom: "left" | "right";
}) {
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        maxWidth: 600,
        padding: "28px 32px",
        borderRadius: 18,
        border: `1px solid ${hovered ? "rgba(139,92,246,0.45)" : "rgba(255,255,255,0.06)"}`,
        background: hovered ? "rgba(18,20,42,0.95)" : "rgba(12,14,32,0.75)",
        backdropFilter: "blur(14px)",
        boxShadow: hovered
          ? "0 10px 36px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)"
          : "0 2px 14px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)",
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateX(0)"
          : slideFrom === "left"
          ? "translateX(-32px)"
          : "translateX(32px)",
        transition: `opacity 0.55s ease ${index * 120}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 120}ms, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease`,
        cursor: "default",
      }}
    >
      {/* top row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 14,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <img
            src={card.thumbnail}
            alt={card.companyname}
            style={{ width: 38, height: 38, objectFit: "contain", opacity: 0.85 }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#f1f5f9",
                letterSpacing: "-0.01em",
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              {card.title}
            </h3>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: "#a78bfa",
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.22)",
                borderRadius: 999,
                padding: "4px 12px",
                whiteSpace: "nowrap",
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              {card.time}
            </span>
          </div>
          <p
            style={{
              margin: "5px 0 0",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#64748b",
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}
          >
            {card.companyname}
          </p>
        </div>
      </div>

      {/* divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "16px 0" }} />

      {/* desc */}
      <p
        style={{
          margin: 0,
          fontSize: "0.975rem",
          lineHeight: 1.75,
          color: "#94a3b8",
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      >
        {card.desc}
      </p>
    </div>
  );
}

function TimelineCard({
  card,
  index,
  isLast,
}: {
  card: (typeof workExperience)[0];
  index: number;
  isLast: boolean;
}) {
  const { ref, inView } = useInView(0.15);
  const [hovered, setHovered] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 48px 1fr",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      {/* LEFT SLOT */}
      <div style={{ padding: "0 28px 56px 0", display: "flex", justifyContent: "flex-end" }}>
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

      {/* CENTER SPINE */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: hovered
              ? "linear-gradient(135deg,#a78bfa,#ec4899)"
              : "linear-gradient(135deg,#7c3aed,#6366f1)",
            boxShadow: hovered
              ? "0 0 18px rgba(167,139,250,0.75)"
              : "0 0 8px rgba(124,58,237,0.5)",
            marginTop: 10,
            flexShrink: 0,
            zIndex: 2,
            border: "2px solid rgba(139,92,246,0.35)",
            transition: "box-shadow 0.25s ease, background 0.25s ease",
          }}
        />
        {!isLast && (
          <div
            style={{
              flex: 1,
              width: 2,
              minHeight: 80,
              marginTop: 6,
              background:
                "linear-gradient(to bottom,rgba(124,58,237,0.5),rgba(124,58,237,0.06))",
              borderRadius: 2,
            }}
          />
        )}
      </div>

      {/* RIGHT SLOT */}
      <div style={{ padding: "0 0 56px 28px", display: "flex", justifyContent: "flex-start" }}>
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

/* Mobile: simple left-spine list */
function MobileTimeline() {
  return (
    <div className="md:hidden" style={{ maxWidth: 520, margin: "0 auto", padding: "0 1rem" }}>
      {workExperience.map((card, i) => {
        const isLast = i === workExperience.length - 1;
        return (
          <div key={card.id} style={{ display: "flex", gap: 0 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 32,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#7c3aed,#6366f1)",
                  boxShadow: "0 0 8px rgba(124,58,237,0.5)",
                  marginTop: 10,
                  flexShrink: 0,
                }}
              />
              {!isLast && (
                <div
                  style={{
                    flex: 1,
                    width: 2,
                    marginTop: 6,
                    background:
                      "linear-gradient(to bottom,rgba(124,58,237,0.4),rgba(124,58,237,0.05))",
                    borderRadius: 2,
                  }}
                />
              )}
            </div>
            <div style={{ flex: 1, marginLeft: 14, paddingBottom: isLast ? 0 : 28 }}>
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

const Experience = () => {
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
    <div className="py-20 w-full">
      <h1 className="heading">
        My <span className="text-purple">work experience</span>
      </h1>

      {/* Desktop alternating timeline */}
      <div
        className="hidden md:block"
        style={{ maxWidth: 1400, margin: "3rem auto 0", marginBottom : 0, padding: "0 2.5rem" }}
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

      {/* Mobile left-spine timeline */}
      <div style={{ marginTop: "2.5rem" }}>
        <MobileTimeline />
      </div>
    </div>
  );
};

export default Experience;