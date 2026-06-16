"use client";

import Footer         from "@/components/layout/Footer";
import CommandPalette from "@/components/ui/CommandPalette";
import Hero           from "@/components/sections/Hero";
import About          from "@/components/sections/About";
import Education      from "@/components/sections/Education";
import Skills         from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Projects       from "@/components/sections/Projects";
import GitHub         from "@/components/sections/GitHub";
import Experience     from "@/components/sections/Experience";
import Goals          from "@/components/sections/Goals";
import Contact        from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Fixed atmospheric layers */}
      <div className="grid-bg" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />

      <div style={{ position: "relative", zIndex: 1 }}>
        <CommandPalette />
        <main>
          <Hero />
          <About />
          <Education />
          <Skills />
          <Certifications />
          <Projects />
          <GitHub />
          <Experience />
          <Goals />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
