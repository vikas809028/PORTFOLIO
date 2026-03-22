import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import RecentProjects from "@/components/RecentProjects";
import Experience from "@/components/Experience";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import TechStack from "@/components/TechStack";
import Clients from "@/components/Clients";

// Lazy-load the heavy bento grid (has Globe — skips SSR)
const LazyGrid = dynamic(() => import("@/components/Grid"), { ssr: false });

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-1 overflow-clip">
      <div className="max-w-7xl w-full">

        {/* Always visible — anchors the page */}
        <FloatingNav navItems={navItems} />

        {/* 1. HOOK — First impression, name + tagline + CTA */}
        <Hero />

        {/* 2. WHO — Bento grid: personality, globe, email CTA */}
        {/* Client needs to know WHO you are before anything else  */}
        <LazyGrid />

        {/* 3. SKILLS — What you can actually do for them */}
        {/* Comes after personality, before proof */}
        <TechStack />

        {/* 4. EXPERIENCE — Credibility signal (IIT Kanpur, Govt project) */}
        {/* Establishes trust before showing project work */}
        <Experience />

        {/* 5. PROJECTS — Proof of work */}
        {/* Now client trusts you → show them what you've built */}
        <RecentProjects />

        <Clients />

        {/* 6. APPROACH — How you work with clients */}

        <Approach />

        {/* 7. FOOTER — Contact + social links */}
        <Footer />

      </div>
    </main>
  );
}