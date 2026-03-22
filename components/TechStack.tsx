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

  const inner = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: "22px 10px 16px",
        borderRadius: 16,
        border: `1px solid ${hovered ? skill.color + "55" : "rgba(255,255,255,0.07)"}`,
        background: hovered ? skill.color + "14" : "rgba(13,12,30,0.72)",
        backdropFilter: "blur(12px)",
        cursor: "pointer",
        userSelect: "none" as const,
        opacity: animate ? 1 : 0,
        transform: animate
          ? hovered ? "translateY(-6px) scale(1.06)" : "translateY(0) scale(1)"
          : "translateY(18px)",
        transition: `
          opacity 0.4s ease ${index * 35}ms,
          transform ${animate ? "0.28s cubic-bezier(0.34,1.56,0.64,1)" : `0.5s ease ${index * 35}ms`},
          border-color 0.2s ease,
          background 0.2s ease,
          box-shadow 0.2s ease
        `,
        boxShadow: hovered
          ? `0 12px 30px rgba(0,0,0,0.5), 0 0 0 1px ${skill.color}30`
          : "0 2px 8px rgba(0,0,0,0.3)",
        minHeight: 105,
      }}
    >
      {/* logo — devicons are already colored, NO filter needed */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 12,
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
          width={32}
          height={32}
          loading="lazy"
          style={{ objectFit: "contain", display: "block" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            const p = e.currentTarget.parentElement;
            if (p) {
              const s = document.createElement("span");
              s.textContent = skill.name.slice(0, 2).toUpperCase();
              Object.assign(s.style, { fontSize: "14px", fontWeight: "700", color: skill.color });
              p.appendChild(s);
            }
          }}
        />
      </div>

      {/* name */}
      <span
        style={{
          fontSize: "0.73rem",
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

  useEffect(() => {
    setMounted(true);
    const id = "dm-sans-ts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);


  return (
    <section
      ref={ref}
      style={{
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
        padding: "3rem 1.5rem",
        boxSizing: "border-box",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* heading */}
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 className="heading">
        My <span className="text-purple">Tech Stack</span>
      </h1>
      </div>

      {/* 6-col grid — 3 on mobile, 4 on tablet, 6 on desktop */}
      <div
        className="grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        style={{ display: "grid", gap: "0.75rem" }}
      >
        {SKILLS.map((skill, i) => (
          <Chip key={skill.name} skill={skill} index={i} animate={inView && mounted} />
        ))}
      </div>
    </section>
  );
}