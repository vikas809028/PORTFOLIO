/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";

function ProjectCard({ item }: { item: (typeof projects)[0] }) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: isMobile ? "100%" : 380,
        maxWidth: isMobile ? "100%" : 380,
        borderRadius: 20,
        border: `1px solid ${hovered ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.08)"}`,
        background:
          "linear-gradient(145deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
        overflow: "hidden",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        transform: hovered && !isMobile ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered && !isMobile
          ? "0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.15)"
          : "0 4px 24px rgba(0,0,0,0.35)",
        transition: "all 0.3s ease",
        margin: isMobile ? "0 auto" : 0,
      }}
    >
      {/* image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: isMobile ? 180 : 210,
          background: "#0d1030",
        }}
      >
        <Image
          src={item.img}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, 380px"
          style={{
            objectFit: "cover",
            objectPosition: "top center",
            borderRadius: "20px 20px 0 0",
          }}
        />
      </div>

      {/* content */}
      <div
        style={{
          padding: isMobile ? "16px 20px 20px" : "18px 24px 22px",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 8 : 10,
          flex: 1,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: isMobile ? "1rem" : "1.1rem",
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
            fontSize: isMobile ? "0.8rem" : "0.85rem",
            lineHeight: isMobile ? 1.6 : 1.65,
            color: "#64748b",
            display: "-webkit-box",
            WebkitLineClamp: isMobile ? 3 : 2,
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
            alignItems: "center",
            paddingTop: isMobile ? 12 : 14,
            marginTop: "auto",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 4 : 0 }}>
            {item.iconLists.map((icon, i) => (
              <div
                key={i}
                style={{
                  width: isMobile ? 28 : 30,
                  height: isMobile ? 28 : 30,
                  borderRadius: "50%",
                  background: "#080814",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: i === 0 ? 0 : -8,
                }}
              >
                <img src={icon} style={{ width: isMobile ? 12 : 13, height: isMobile ? 12 : 13 }} alt="" />
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
              fontSize: isMobile ? "0.75rem" : "0.8rem",
              color: hovered ? "#c4b5fd" : "#a78bfa",
              transition: "color 0.2s ease",
            }}
          >
            Live Site <FaLocationArrow size={isMobile ? 10 : 11} />
          </a>
        </div>
      </div>
    </div>
  );
}

const RecentProjects = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState({ active: false, startX: 0, scrollLeft: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return; // Disable drag on mobile
    const el = trackRef.current;
    if (!el) return;
    setDrag({ active: true, startX: e.pageX, scrollLeft: el.scrollLeft });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    if (!drag.active || !trackRef.current) return;
    trackRef.current.scrollLeft = drag.scrollLeft - (e.pageX - drag.startX);
  };

  const onDragEnd = () => setDrag((d) => ({ ...d, active: false }));

  return (
    <div className="py-10 px-4 md:px-0" id="projects">
      {/* Heading - centered on all devices */}
      <h1 className="heading text-center">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>

      <div style={{ position: "relative", marginTop: isMobile ? "2rem" : "4rem" }}>
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
            gap: isMobile ? "1rem" : "1.5rem",
            overflowX: isMobile ? "visible" : "auto",
            overflowY: "visible",
            paddingBottom: isMobile ? 0 : 20,
            paddingRight: isMobile ? 0 : 100,
            cursor: !isMobile && drag.active ? "grabbing" : !isMobile ? "grab" : "default",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "center" : "stretch",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          {projects.map((item) => (
            <ProjectCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Mobile styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .project-track {
            flex-direction: column !important;
            overflow-x: visible !important;
            padding-right: 0 !important;
            gap: 1.5rem !important;
          }

          .project-card {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
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