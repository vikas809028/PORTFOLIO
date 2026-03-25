/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";
import Lottie from "react-lottie";
import { BackgroundGradientAnimation } from "./ui/GradientBg";
import GridGlobe from "./ui/GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "./ui/MagicButton";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const lottieOpts = {
    loop: copied, 
    autoplay: copied, 
    animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText("vikastiwari809028@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <section id="about" className={isMobile ? "py-4" : "py-8"}>
      <div className={`
        w-full
        flex flex-col gap-4
        lg:grid lg:gap-[1.1rem]
        lg:[grid-template-columns:1.15fr_0.85fr]
        lg:[grid-template-rows:3fr_1.2fr]
        lg:min-h-[640px]
      `}>
        {/* About me (tall left card) */}
        <div
          className="lg:[grid-column:1/2] lg:[grid-row:1/2]"
          style={baseCard}
        >
          <img src="/b1.svg" alt="" aria-hidden
            style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:0.04 }} />

          <div className={`
            relative z-10 flex flex-col h-full 
            ${isMobile ? "p-4 gap-3" : "p-6 sm:p-7 lg:p-10 gap-5 lg:gap-6"}
          `}>
            <span className={`
              font-bold tracking-[0.25em] uppercase text-purple
              ${isMobile ? "text-[11px]" : "text-[13px]"}
            `}>
              About me
            </span>

            <h2 style={{
              margin:0,
              fontSize: isMobile ? "clamp(1.5rem, 6vw, 1.75rem)" : "clamp(1.75rem,5vw,3rem)",
              fontWeight:800,
              color:"#ffffff",
              letterSpacing:"-0.03em",
              lineHeight:1.2,
            }}>
              I Turn ideas into{" "}
              <span style={{ color:"#a78bfa" }}>scalable software</span>
            </h2>

            <div className={`flex flex-col ${isMobile ? "gap-2" : "gap-3"} flex-1`}>
              <p style={{ 
                margin:0, 
                fontSize: isMobile ? "0.85rem" : "1.05rem", 
                lineHeight: isMobile ? 1.6 : 1.8, 
                color:"#b8c4d0", 
                fontWeight:400 
              }}>
                Software Developer at{" "}
                <strong style={{ color:"#e2e8f0", fontWeight:700 }}>Prutor.ai (IIT Kanpur)</strong>{" "}
                working on <strong style={{ color:"#e2e8f0", fontWeight:700 }}>SATHEE</strong> — a{" "}
                <strong style={{ color:"#e2e8f0", fontWeight:700 }}>Government of India</strong> platform
                serving lakhs of students. I own the backend, CI/CD pipelines, and infrastructure.
              </p>
              <p style={{ 
                margin:0, 
                fontSize: isMobile ? "0.85rem" : "1.05rem", 
                lineHeight: isMobile ? 1.6 : 1.8, 
                color:"#b8c4d0", 
                fontWeight:400 
              }}>
                Specializing in{" "}
                <strong style={{ color:"#e2e8f0", fontWeight:700 }}>MERN stack</strong>,{" "}
                <strong style={{ color:"#e2e8f0", fontWeight:700 }}>Docker</strong>, and{" "}
                <strong style={{ color:"#e2e8f0", fontWeight:700 }}>Jenkins CI/CD</strong> — building
                systems that are fast, maintainable, and always ship on time.
              </p>
            </div>

            {/* stat chips — responsive sizing */}
            <div className={`grid grid-cols-2 sm:flex sm:flex-wrap ${isMobile ? "gap-1.5 pt-3" : "gap-2 pt-4"} border-t border-white/[0.07]`}>
              {[
                { label: "1+ yr",           sub: "Full-time dev",     accent: "#a78bfa" },
                { label: "IIT Kanpur",       sub: "Incubated startup", accent: "#38bdf8" },
                { label: "Govt of India",    sub: "SATHEE project",    accent: "#34d399" },
                { label: "⭐ Star Performer",sub: "Softpro India",     accent: "#fbbf24" },
              ].map((s) => (
                <div key={s.label}
                  style={{
                    display:"flex", 
                    flexDirection:"column", 
                    padding: isMobile ? "6px 10px" : "10px 15px",
                    borderRadius: isMobile ? 10 : 12, 
                    background:"rgba(255,255,255,0.04)",
                    border:`1px solid ${s.accent}30`,
                  }}>
                  <span style={{ 
                    color:s.accent, 
                    fontSize: isMobile ? "0.75rem" : "0.9rem", 
                    fontWeight:700 
                  }}>{s.label}</span>
                  <span style={{ 
                    color:"#64748b", 
                    fontSize: isMobile ? "0.65rem" : "0.75rem" 
                  }}>{s.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COL cards */}
        <div className={`
          flex flex-col ${isMobile ? "gap-3" : "gap-4"}
          lg:[grid-column:2/3] lg:[grid-row:1/3]
          lg:grid lg:[grid-template-rows:1fr_1fr_0.6fr] lg:gap-[1.1rem]
        `}>
          {/* Globe */}
          <div style={baseCard}>
            <div className={`relative z-10 flex flex-col h-full ${isMobile ? "p-3" : "p-5 lg:p-6"}`}>
              <span style={{
                fontSize: isMobile ? "0.7rem" : "0.8rem", 
                fontWeight:700, 
                letterSpacing:"0.2em",
                textTransform:"uppercase", 
                color:"#38bdf8", 
                marginBottom: isMobile ? 2 : 4,
              }}>Availability</span>
              <p style={{ 
                margin:"0 0 2px", 
                fontSize: isMobile ? "1.1rem" : "1.4rem", 
                fontWeight:800, 
                color:"#f1f5f9" 
              }}>
                Flexible with time zones Communications
              </p>
              <p style={{ 
                margin:0, 
                fontSize: isMobile ? "0.85rem" : "1rem", 
                color:"#475569", 
                marginBottom: isMobile ? 4 : 8 
              }}>
                India · Remote worldwide
              </p>
              <div className={`flex-1 relative ${isMobile ? "min-h-[100px]" : "min-h-[140px] sm:min-h-[160px] lg:min-h-[120px]"}`}>
                <GridGlobe />
              </div>
            </div>
          </div>

          {/* Education */}
          <div style={baseCard}>
            <div className={`relative z-10 flex flex-col h-full ${isMobile ? "p-3 gap-2" : "p-5 lg:p-6 gap-3"}`}>
              <span style={{
                fontSize: isMobile ? "0.7rem" : "0.8rem", 
                fontWeight:700, 
                letterSpacing:"0.2em",
                textTransform:"uppercase", 
                color:"#fbbf24",
              }}>Education</span>
              <p style={{ 
                margin:0, 
                fontSize: isMobile ? "1rem" : "1.2rem", 
                fontWeight:700, 
                color:"#f1f5f9", 
                letterSpacing:"-0.01em" 
              }}>
                B.Tech Computer Science
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap: isMobile ? 6 : 10 }}>
                {[
                  { icon:"🎓", text:"ITS Engineering College, AKTU", accent:"#e2e8f0" },
                  { icon:"📅", text:"2021 – 2025 · CGPA 8.68",      accent:"#fbbf24" },
                  { icon:"📍", text:"Greater Noida, Uttar Pradesh", accent:"#94a3b8" },
                ].map((r,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap: isMobile ? 6 : 8 }}>
                    <span style={{ fontSize: isMobile ? "0.9rem" : "1.1rem" }}>{r.icon}</span>
                    <span style={{ 
                      fontSize: isMobile ? "0.8rem" : "0.95rem", 
                      color:r.accent, 
                      fontWeight: i===1 ? 600 : 400 
                    }}>{r.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Email CTA */}
          <div style={{ ...baseCard, overflow:"hidden" }}>
            <BackgroundGradientAnimation>
              <div className="absolute z-[5] inset-0 pointer-events-none" />
            </BackgroundGradientAnimation>
            <div className={`relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between h-full ${isMobile ? "p-3 gap-2" : "p-5 lg:px-6 gap-4"}`}>
              <div>
                <p style={{ 
                  margin:"0 0 2px", 
                  fontSize: isMobile ? "1rem" : "1.3rem", 
                  fontWeight:700, 
                  color:"#f1f5f9" 
                }}>
                  Start a project together?
                </p>
                <p style={{ 
                  margin:0, 
                  fontSize: isMobile ? "0.75rem" : "0.95rem", 
                  color:"#475569", 
                  wordBreak:"break-all" 
                }}>
                  vikastiwari809028@gmail.com
                </p>
              </div>
              <div className="relative flex-shrink-0 self-start sm:self-auto">
                <div className="absolute -bottom-4 -right-2 pointer-events-none opacity-60">
                  <Lottie options={lottieOpts} height={isMobile ? 70 : 100} width={isMobile ? 110 : 160} />
                </div>
                <button
                  onClick={handleCopy}
                  style={{
                    display:"inline-flex", 
                    alignItems:"center", 
                    gap: isMobile ? 4 : 6,
                    padding: isMobile ? "6px 12px" : "8px 16px", 
                    borderRadius:999, 
                    cursor:"pointer",
                    background: copied ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.08)",
                    border:`1px solid ${copied ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.15)"}`,
                    color: copied ? "#c4b5fd" : "#e2e8f0",
                    fontSize: isMobile ? "0.75rem" : "0.88rem", 
                    fontWeight:600,
                    transition:"all 0.2s ease", 
                    position:"relative", 
                    zIndex:10,
                  }}
                >
                  <IoCopyOutline size={isMobile ? 11 : 13} />
                  {copied ? "Copied!" : "Copy email"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* InterviewPrep (bottom-left card) */}
        <div
          className="lg:[grid-column:1/2] lg:[grid-row:2/3]"
          style={baseCard}
        >
          <img src="/b5.svg" alt="" aria-hidden
            style={{ position:"absolute",right:0,bottom:0,height:"100%",opacity:0.05,objectFit:"cover" }} />
          <div className={`relative z-10 flex flex-col sm:flex-row sm:items-center h-full ${isMobile ? "px-4 py-3 gap-2" : "px-6 py-5 lg:px-9 gap-4"}`}>
            <div className={`flex flex-col ${isMobile ? "gap-1" : "gap-2"} flex-1`}>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span style={{
                  fontSize: isMobile ? "0.65rem" : "0.8rem", 
                  fontWeight:700, 
                  letterSpacing:"0.18em",
                  textTransform:"uppercase", 
                  color:"#34d399",
                }}>Currently building</span>
              </div>
              <p style={{ 
                margin:0, 
                fontSize: isMobile ? "1.1rem" : "1.4rem", 
                fontWeight:800, 
                color:"#f1f5f9", 
                letterSpacing:"-0.02em" 
              }}>
                InterviewPrep
              </p>
              <p style={{ 
                margin:0, 
                fontSize: isMobile ? "0.75rem" : "0.97rem", 
                color:"#64748b", 
                lineHeight: isMobile ? 1.4 : 1.6 
              }}>
                Real-time AI interviewer with instant feedback & performance tracking.
              </p>
            </div>
            <div className={`flex flex-wrap gap-1.5 ${isMobile ? "max-w-[140px]" : "sm:max-w-[160px]"}`}>
              {["ReactJs","Node.js","OpenAI","WebSockets"].map((t) => (
                <span key={t} style={{
                  fontSize: isMobile ? "0.65rem" : "0.82rem", 
                  padding: isMobile ? "3px 8px" : "5px 12px", 
                  borderRadius:6,
                  fontWeight:600, 
                  color:"#a78bfa",
                  background:"rgba(124,58,237,0.1)", 
                  border:"1px solid rgba(124,58,237,0.2)",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}