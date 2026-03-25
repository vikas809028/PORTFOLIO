"use client";
import React, { useState, useEffect, useRef } from "react";

type Skill = {
  name: string;
  image: string;
  href?: string;
  color: string;
};

const SKILLS: Skill[] = [
  { name: "React",       color: "#61DAFB", href: "https://reactjs.org/",                        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js",     color: "#ffffff", href: "https://nextjs.org/",                          image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript",  color: "#3178C6", href: "https://typescriptlang.org/",                  image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript",  color: "#F7DF1E", href: "https://developer.mozilla.org/",               image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Tailwind",    color: "#06B6D4", href: "https://tailwindcss.com/",                     image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "HTML5",       color: "#E34F26", href: "https://developer.mozilla.org/docs/Web/HTML",  image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "Node.js",     color: "#5FA04E", href: "https://nodejs.org/",                          image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express",     color: "#ffffff", href: "https://expressjs.com/",                       image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "MongoDB",     color: "#47A248", href: "https://www.mongodb.com/",                     image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Redis",       color: "#FF4438", href: "https://redis.io/",                            image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Java",        color: "#ED8B00", href: "https://www.java.com/",                        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Docker",      color: "#2496ED", href: "https://www.docker.com/",                      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Jenkins",     color: "#D24939", href: "https://www.jenkins.io/",                      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
  { name: "Linux",       color: "#FCC624", href: "https://www.linux.org/",                       image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Git",         color: "#F05032", href: "https://git-scm.com/",                         image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub",      color: "#ffffff", href: "https://github.com/",                          image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Postman",     color: "#FF6C37", href: "https://www.postman.com/",                     image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
  { name: "VS Code",     color: "#007ACC", href: "https://code.visualstudio.com/",               image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
];

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Chip({ skill, index, animate }: { skill: Skill; index: number; animate: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const inner = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // Mobile styles only - desktop unchanged
        gap: isMobile ? 6 : 10,
        padding: isMobile ? "12px 6px 10px" : "22px 10px 16px",
        borderRadius: isMobile ? 12 : 16,
        border: `1px solid ${hovered ? skill.color + "55" : "rgba(255,255,255,0.07)"}`,
        background: hovered ? skill.color + "14" : "rgba(13,12,30,0.72)",
        backdropFilter: "blur(12px)",
        cursor: "pointer",
        userSelect: "none" as const,
        opacity: animate ? 1 : 0,
        transform: animate
          ? hovered 
            ? (isMobile ? "translateY(-3px) scale(1.03)" : "translateY(-6px) scale(1.06)")
            : "translateY(0) scale(1)"
          : (isMobile ? "translateY(12px)" : "translateY(18px)"),
        transition: isMobile
          ? `
            opacity 0.3s ease ${index * 25}ms,
            transform ${animate ? "0.22s cubic-bezier(0.34,1.56,0.64,1)" : `0.4s ease ${index * 25}ms`},
            border-color 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease
          `
          : `
            opacity 0.4s ease ${index * 35}ms,
            transform ${animate ? "0.28s cubic-bezier(0.34,1.56,0.64,1)" : `0.5s ease ${index * 35}ms`},
            border-color 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease
          `,
        boxShadow: hovered
          ? isMobile
            ? `0 6px 15px rgba(0,0,0,0.4), 0 0 0 1px ${skill.color}30`
            : `0 12px 30px rgba(0,0,0,0.5), 0 0 0 1px ${skill.color}30`
          : isMobile
            ? "0 1px 4px rgba(0,0,0,0.2)"
            : "0 2px 8px rgba(0,0,0,0.3)",
        minHeight: isMobile ? 80 : 105,
      }}
    >
      {/* logo container */}
      <div
        style={{
          width: isMobile ? 36 : 52,
          height: isMobile ? 36 : 52,
          borderRadius: isMobile ? 10 : 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: hovered ? skill.color + "20" : "rgba(255,255,255,0.05)",
          transition: "background 0.2s ease",
          flexShrink: 0,
        }}
      >
        <img
          src={skill.image}
          alt={skill.name}
          width={isMobile ? 22 : 32}
          height={isMobile ? 22 : 32}
          loading="lazy"
          style={{ objectFit: "contain", display: "block" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            const p = e.currentTarget.parentElement;
            if (p) {
              const s = document.createElement("span");
              s.textContent = skill.name.slice(0, 2).toUpperCase();
              Object.assign(s.style, { 
                fontSize: isMobile ? "10px" : "14px", 
                fontWeight: "700", 
                color: skill.color 
              });
              p.appendChild(s);
            }
          }}
        />
      </div>

      {/* name */}
      <span
        style={{
          fontSize: isMobile ? "0.65rem" : "0.73rem",
          fontWeight: 600,
          color: hovered ? "#e2e8f0" : "#64748b",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          textAlign: "center",
          lineHeight: 1.2,
          transition: "color 0.18s ease",
          whiteSpace: "nowrap",
        }}
      >
        {skill.name}
      </span>
    </div>
  );

  if (skill.href) {
    return (
      <a href={skill.href} target="_blank" rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        {inner}
      </a>
    );
  }
  return <div>{inner}</div>;
}

export default function TechStack() {
  const { ref, inView } = useInView();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = "dm-sans-ts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
        padding: isMobile ? "2rem 1rem" : "3rem 1.5rem",
        boxSizing: "border-box",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* heading */}
      <div style={{ marginBottom: isMobile ? "1.5rem" : "1.75rem" }}>
        <h1 className="heading">
          My <span className="text-purple">Tech Stack</span>
        </h1>
      </div>

      {/* grid - mobile gets tighter gap and 3 columns */}
      <div
        className="grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        style={{ 
          display: "grid", 
          gap: isMobile ? "0.5rem" : "0.75rem",
          gridTemplateColumns: isMobile ? "repeat(3, minmax(0, 1fr))" : undefined
        }}
      >
        {SKILLS.map((skill, i) => (
          <Chip key={skill.name} skill={skill} index={i} animate={inView && mounted} />
        ))}
      </div>
    </section>
  );
}