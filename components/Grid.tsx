/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import Lottie from "react-lottie";
import { BackgroundGradientAnimation } from "./ui/GradientBg";
import GridGlobe from "./ui/GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "./ui/MagicButton";

/*
  Layout:
  ┌──────────────────────┬───────────────────┐
  │                      │   Globe  (tall)   │
  │   About me  (tall)   ├───────────────────┤
  │                      │   Education       │  ← extra card
  ├──────────────────────┤                   │
  │  InterviewPrep(short)├───────────────────┤
  ├──────────────────────┤   Email (compact) │
  │   Skills strip       │                   │
  └──────────────────────┴───────────────────┘

  Implemented as:
  Left col  (col 1): About=3fr, InterviewPrep=1fr
  Right col (col 2): Globe=1fr, Education=1fr, Email=1fr  (all equal thirds)
*/

const baseCard: React.CSSProperties = {
  borderRadius: 22,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "linear-gradient(145deg,rgba(4,7,29,1) 0%,rgba(10,12,32,1) 100%)",
  overflow: "hidden",
  position: "relative",
  display: "flex",
  flexDirection: "column",
};

export default function Grid() {
  const [copied, setCopied] = useState(false);
  const lottieOpts = {
    loop: copied, autoplay: copied, animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };
  const handleCopy = () => {
    navigator.clipboard.writeText("vikastiwari809028@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <section id="about" className="py-8">
      <div
        style={{
          display: "grid",
          /* left col wider, right col narrower */
          gridTemplateColumns: "1.15fr 0.85fr",
          /* left: About big + InterviewPrep small | right: Globe + Education + Email equal */
          gridTemplateRows: "3fr 1.2fr",
          gap: "1.1rem",
          minHeight: 640,
        }}
        className="w-full grid-cols-1 sm:!grid-cols-[1.15fr_0.85fr]"
      >

        {/* ══════════════════════════════════
            TOP-LEFT  About me  (tall)
        ══════════════════════════════════ */}
        <div style={{ ...baseCard, gridColumn: "1/2", gridRow: "1/2" }}>
          <img src="/b1.svg" alt="" aria-hidden
            style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:0.04 }} />

          <div className="relative z-10 flex flex-col h-full p-7 lg:p-10 gap-6">
            {/* label */}
            <span className="text-[13px] font-bold tracking-[0.25em] uppercase text-purple">
              About me
            </span>

            {/* headline */}
            <h2 style={{ margin:0, fontSize:"clamp(2.1rem,3.6vw,3rem)", fontWeight:800,
              color:"#ffffff", letterSpacing:"-0.03em", lineHeight:1.2 }}>
              I Turn ideas into{" "}
              <span style={{ color:"#a78bfa" }}>scalable software</span>
            </h2>

            {/* paragraphs — brighter text */}
            <div className="flex flex-col gap-3 flex-1">
              <p style={{ margin:0, fontSize:"1.1rem", lineHeight:1.8, color:"#b8c4d0", fontWeight:400 }}>
                Software Developer at{" "}
                <strong style={{ color:"#e2e8f0", fontWeight:700 }}>Prutor.ai (IIT Kanpur)</strong>{" "}
                working on <strong style={{ color:"#e2e8f0", fontWeight:700 }}>SATHEE</strong> — a{" "}
                <strong style={{ color:"#e2e8f0", fontWeight:700 }}>Government of India</strong> platform
                serving lakhs of students. I own the backend, CI/CD pipelines, and infrastructure.
              </p>
              <p style={{ margin:0, fontSize:"1.1rem", lineHeight:1.8, color:"#b8c4d0", fontWeight:400 }}>
                Specializing in{" "}
                <strong style={{ color:"#e2e8f0", fontWeight:700 }}>MERN stack</strong>,{" "}
                <strong style={{ color:"#e2e8f0", fontWeight:700 }}>Docker</strong>, and{" "}
                <strong style={{ color:"#e2e8f0", fontWeight:700 }}>Jenkins CI/CD</strong> — building
                systems that are fast, maintainable, and always ship on time.
              </p>
            </div>

            {/* stat chips — more vivid */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.07]">
              {[
                { label: "1+ yr",           sub: "Full-time dev",     accent: "#a78bfa" },
                { label: "IIT Kanpur",       sub: "Incubated startup", accent: "#38bdf8" },
                { label: "Govt of India",    sub: "SATHEE project",    accent: "#34d399" },
                { label: "⭐ Star Performer",sub: "Softpro India",     accent: "#fbbf24" },
              ].map((s) => (
                <div key={s.label}
                  style={{ display:"flex", flexDirection:"column", padding:"10px 15px",
                    borderRadius:12, background:"rgba(255,255,255,0.04)",
                    border:`1px solid ${s.accent}30` }}>
                  <span style={{ color:s.accent, fontSize:"0.9rem", fontWeight:700 }}>{s.label}</span>
                  <span style={{ color:"#64748b", fontSize:"0.75rem" }}>{s.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            BOTTOM-LEFT  InterviewPrep  (short)
        ══════════════════════════════════ */}
        <div style={{ ...baseCard, gridColumn:"1/2", gridRow:"2/3" }}>
          <img src="/b5.svg" alt="" aria-hidden
            style={{ position:"absolute",right:0,bottom:0,height:"100%",opacity:0.05,objectFit:"cover" }} />
          <div className="relative z-10 flex flex-row items-center h-full px-7 lg:px-9 gap-6">
            {/* left: text */}
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span style={{ fontSize:"0.8rem", fontWeight:700, letterSpacing:"0.18em",
                  textTransform:"uppercase", color:"#34d399" }}>Currently building</span>
              </div>
              <p style={{ margin:0, fontSize:"1.5rem", fontWeight:800, color:"#f1f5f9", letterSpacing:"-0.02em" }}>
                InterviewPrep
              </p>
              <p style={{ margin:0, fontSize:"0.97rem", color:"#64748b", lineHeight:1.6 }}>
                Real-time AI interviewer with instant feedback & performance tracking.
              </p>
            </div>
            {/* right: tech tags */}
            <div className="hidden md:flex flex-wrap gap-1.5 max-w-[160px]">
              {["ReactJs","Node.js","OpenAI","WebSockets"].map((t) => (
                <span key={t} style={{ fontSize:"0.82rem", padding:"5px 12px", borderRadius:6,
                  fontWeight:600, color:"#a78bfa",
                  background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.2)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            RIGHT COL — 3 equal rows
        ══════════════════════════════════ */}
        <div style={{
          gridColumn:"2/3", gridRow:"1/3",
          display:"grid", gridTemplateRows:"1fr 1fr 0.6fr", gap:"1.1rem",
        }}>

          {/* Globe */}
          <div style={baseCard}>
            <div className="relative z-10 flex flex-col h-full p-5 lg:p-6">
              <span style={{ fontSize:"0.8rem", fontWeight:700, letterSpacing:"0.2em",
                textTransform:"uppercase", color:"#38bdf8", marginBottom:4 }}>Availability</span>
              <p style={{ margin:"0 0 2px", fontSize:"1.5rem", fontWeight:800, color:"#f1f5f9" }}>
                Flexible with time zones Communications
              </p>
              <p style={{ margin:0, fontSize:"1rem", color:"#475569", marginBottom:8 }}>
                India · Remote worldwide
              </p>
              <div className="flex-1 relative min-h-[120px] hidden md:block">
                <GridGlobe />
              </div>
            </div>
          </div>

          {/* Education */}
          <div style={baseCard}>
            <div className="relative z-10 flex flex-col h-full p-5 lg:p-6 gap-3">
              <span style={{ fontSize:"0.8rem", fontWeight:700, letterSpacing:"0.2em",
                textTransform:"uppercase", color:"#fbbf24" }}>Education</span>
              <p style={{ margin:0, fontSize:"1.2rem", fontWeight:700, color:"#f1f5f9", letterSpacing:"-0.01em" }}>
                B.Tech Computer Science
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  { icon:"🎓", text:"ITS Engineering College, AKTU", accent:"#e2e8f0" },
                  { icon:"📅", text:"2021 – 2025 · CGPA 8.68",      accent:"#fbbf24" },
                  { icon:"📍", text:"Greater Noida, Uttar Pradesh", accent:"#94a3b8" },
                ].map((r,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:"1.1rem" }}>{r.icon}</span>
                    <span style={{ fontSize:"0.95rem", color:r.accent, fontWeight: i===1 ? 600 : 400 }}>{r.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Email CTA — compact */}
          <div style={{ ...baseCard, overflow:"hidden" }}>
            <BackgroundGradientAnimation>
              <div className="absolute z-[5] inset-0 pointer-events-none" />
            </BackgroundGradientAnimation>
            <div className="relative z-10 flex flex-row items-center justify-between h-full px-5 lg:px-6 gap-4">
              <div>
                <p style={{ margin:"0 0 2px", fontSize:"1.5rem", fontWeight:700, color:"#f1f5f9" }}>
                  Start a project together?
                </p>
                <p style={{ margin:0, fontSize:"1.1rem", color:"#475569" }}>
                  vikastiwari809028@gmail.com
                </p>
              </div>
              <div className="relative flex-shrink-0">
                <div className="absolute -bottom-4 -right-2 pointer-events-none opacity-60">
                  <Lottie options={lottieOpts} height={100} width={160} />
                </div>
                <button
                  onClick={handleCopy}
                  style={{
                    display:"inline-flex", alignItems:"center", gap:6,
                    padding:"8px 16px", borderRadius:999, cursor:"pointer",
                    background: copied ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.08)",
                    border:`1px solid ${copied ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.15)"}`,
                    color: copied ? "#c4b5fd" : "#e2e8f0",
                    fontSize:"0.88rem", fontWeight:600,
                    transition:"all 0.2s ease", position:"relative", zIndex:10,
                  }}
                >
                  <IoCopyOutline size={13} />
                  {copied ? "Copied!" : "Copy email"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}