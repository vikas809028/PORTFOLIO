/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";

function ProjectCard({ item }: { item: (typeof projects)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 380,
        borderRadius: 20,
        border: `1px solid ${hovered ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.08)"}`,
        background: "linear-gradient(145deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
        overflow: "hidden",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.15)"
          : "0 4px 24px rgba(0,0,0,0.35)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* ── image container — overflow hidden on parent clips the zoom ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 210,
          background: "#0d1030",
          flexShrink: 0,
          /* NO overflow:hidden here — we clip via the rounded corners of the parent card */
          /* The line artifact was caused by a <img bg.png> bottom edge showing — removed it */
        }}
      >
        {/* project screenshot — z-index only, no sibling img below */}
        <Image
          src={item.img}
          alt={item.title}
          fill
          sizes="380px"
          style={{
            objectFit: "cover",
            objectPosition: "top center",
           
         
            borderRadius: "20px",   /* match card top radius */
          }}
        />

        
      </div>

      {/* ── content ── */}
      <div
        style={{
          padding: "18px 24px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#f1f5f9",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.title}
        </h3>

        <p
          style={{
            margin: 0,
            fontSize: "0.85rem",
            lineHeight: 1.65,
            color: "#64748b",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}
        >
          {item.des}
        </p>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 14,
            marginTop: "auto",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* stacked tech icons */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {item.iconLists.map((icon, i) => (
              <div
                key={i}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "#080814",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: i === 0 ? 0 : -8,
                  zIndex: item.iconLists.length - i,
                  position: "relative",
                }}
              >
                <img src={icon} alt="" style={{ width: 13, height: 13, objectFit: "contain" }} />
              </div>
            ))}
          </div>

          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              fontSize: "0.8rem",
              fontWeight: 600,
              color: hovered ? "#c4b5fd" : "#a78bfa",
              textDecoration: "none",
              transition: "color 0.2s ease",
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            Live Site <FaLocationArrow size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}

const RecentProjects = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState({ active: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const id = "dm-sans-proj";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    setDrag({ active: true, startX: e.pageX, scrollLeft: el.scrollLeft });
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.active || !trackRef.current) return;
    trackRef.current.scrollLeft = drag.scrollLeft - (e.pageX - drag.startX);
  };
  const onDragEnd = () => setDrag((d) => ({ ...d, active: false }));

  return (
    <div className="py-10" id="projects">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>

      {/* slider wrapper — only right fade, no left shadow */}
      <div style={{ position: "relative", marginTop: "4rem" }}>

        {/* right fade — subtle peek hint */}
        <div
          style={{
            position: "absolute",
            right: 0, top: 0, bottom: 16,
            width: 100,
            zIndex: 10,
            marginTop: 8,
            pointerEvents: "none",
            background: "linear-gradient(to left, rgba(2,4,18,0.95) 0%, transparent 100%)",
          }}
        />

        {/* track */}
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          className="hide-scrollbar"
          style={{
            display: "flex",
            gap: "1.5rem",            /* proper spacing between cards */
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            paddingBottom: 20,        /* room for card shadow */
            paddingTop: 8,            /* room for card shadow top */
            paddingLeft: 4,
            paddingRight: 100,        /* last card peeks, matching fade width */
            cursor: drag.active ? "grabbing" : "grab",
            scrollbarWidth: "none",
            userSelect: "none",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties}
        >
          {projects.map((item) => (
            <div key={item.id} style={{ scrollSnapAlign: "start", flexShrink: 0 }}>
              <ProjectCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
};

export default RecentProjects;