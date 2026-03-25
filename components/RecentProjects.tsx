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
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 380,
        borderRadius: 20,
        border: `1px solid ${hovered ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.08)"}`,
        background:
          "linear-gradient(145deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
        overflow: "hidden",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.15)"
          : "0 4px 24px rgba(0,0,0,0.35)",
        transition: "all 0.3s ease",
      }}
    >
      {/* image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 210,
          background: "#0d1030",
        }}
      >
        <Image
          src={item.img}
          alt={item.title}
          fill
          sizes="380px"
          style={{
            objectFit: "cover",
            objectPosition: "top center",
            borderRadius: "20px",
          }}
        />
      </div>

      {/* content */}
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
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.des}
        </p>

        {/* footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 14,
            marginTop: "auto",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex" }}>
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
                }}
              >
                <img src={icon} style={{ width: 13, height: 13 }} />
              </div>
            ))}
          </div>

          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.8rem",
              color: hovered ? "#c4b5fd" : "#a78bfa",
            }}
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

      <div style={{ position: "relative", marginTop: "4rem" }}>
        {/* track */}
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          className="project-track hide-scrollbar"
          style={{
            display: "flex",
            gap: "1.5rem",
            overflowX: "auto",
            paddingBottom: 20,
            paddingRight: 100,
            cursor: drag.active ? "grabbing" : "grab",
          }}
        >
          {projects.map((item) => (
            <ProjectCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* ✅ MOBILE FIX ONLY */}
      <style jsx>{`
        @media (max-width: 640px) {
          .project-track {
            flex-direction: column !important;
            overflow-x: hidden !important;
            padding-right: 0 !important;
            gap: 1rem !important;
          }

          .project-card {
            width: 100% !important;
            max-width: 100% !important;
          }

          /* 🔥 IMPORTANT: fix inner spacing overflow */
          .project-card {
            width: calc(100% - 10px) !important;
            margin: 0 auto;
          }
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RecentProjects;
