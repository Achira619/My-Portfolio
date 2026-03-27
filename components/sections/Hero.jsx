"use client";

import { useEffect, useState } from "react";
import useTyping from "@/hooks/useTyping";
import Button from "@/components/ui/Button";

const PHRASES = [
  "Aspiring SRE Engineer",
  "DevOps Enthusiast",
  "Cloud & Database Builder",
  "Linux Power User",
  "Systems Thinker",
];

const BOOT_LINES = [
  { text: "[    0.000000] Booting Linux kernel 6.8.0-sre-amd64...", color: "var(--muted)", delay: 0 },
  { text: "[    0.124582] ACPI: IRQ0 used by override.", color: "var(--muted)", delay: 200 },
  { text: "[    0.312841] Loading achira.ko module...", color: "var(--muted)", delay: 450 },
  { text: "[    0.500000] skills.service: OK", color: "var(--g)", delay: 700 },
  { text: "[    0.630021] devops.service: OK", color: "var(--g)", delay: 900 },
  { text: "[    0.782300] reliability.service: OK", color: "var(--g)", delay: 1100 },
  { text: "[    1.000000] System ready. Welcome, recruiter.", color: "var(--g)", delay: 1400 },
];

const STATS = [
  { val: "3+",  label: "years_coding" },
  { val: "1",   label: "featured_project" },
  { val: "10+", label: "technologies" },
  { val: "∞",   label: "drive_to_learn" },
];

export default function Hero() {
  const typed = useTyping(PHRASES, { typeSpeed: 60, deleteSpeed: 38, pause: 1900 });
  const [show, setShow]           = useState(false);
  const [bootShown, setBootShown] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    BOOT_LINES.forEach((_, i) => {
      const t = setTimeout(
        () => setBootShown((n) => Math.max(n, i + 1)),
        BOOT_LINES[i].delay + 600
      );
      return () => clearTimeout(t);
    });
  }, []);

  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px clamp(16px,6vw,80px) 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "20%", left: "50%",
          transform: "translateX(-50%)",
          width: 700, height: 400,
          background:
            "radial-gradient(ellipse, rgba(0,255,65,0.055) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <div style={{ maxWidth: 960, position: "relative", zIndex: 1, width: "100%" }}>

        {/* ── Boot log ── */}
        <div
          style={{
            marginBottom: 36,
            opacity: show ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          {BOOT_LINES.slice(0, bootShown).map((l, i) => (
            <div
              key={i}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: l.color,
                letterSpacing: "0.04em",
                lineHeight: 1.7,
                animation: "term-line 0.25s ease",
              }}
            >
              {l.text}
            </div>
          ))}
        </div>

        {/* ── Status badge ── */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 14px",
            background: "rgba(0,255,65,0.05)",
            border: "1px solid rgba(0,255,65,0.22)",
            borderRadius: 2,
            marginBottom: 28,
            opacity: show ? 1 : 0,
            animation: show ? "slide-up 0.6s 0.2s ease both" : "none",
          }}
        >
          <div className="status-dot" />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--g)",
              letterSpacing: "0.14em",
            }}
          >
            AVAILABLE FOR INTERNSHIPS 2025 / 2026
          </span>
        </div>

        {/* ── Name ── */}
        <h1
          style={{
            fontFamily: "var(--font-disp)",
            fontSize: "clamp(2.8rem,7vw,5.2rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#fff",
            marginBottom: 18,
            opacity: show ? 1 : 0,
            animation: show ? "slide-up 0.7s 0.4s ease both" : "none",
          }}
        >
          Achira
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, var(--g) 0%, #00cc33 50%, #00e5ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Medagedara
          </span>
        </h1>

        {/* ── Typing subtitle ── */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(11px,1.5vw,13px)",
            color: "var(--g)",
            letterSpacing: "0.06em",
            marginBottom: 22,
            minHeight: 22,
            opacity: show ? 1 : 0,
            animation: show ? "slide-up 0.7s 0.6s ease both" : "none",
          }}
        >
          <span style={{ color: "var(--muted)" }}>$ echo &quot;</span>
          {typed}
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 14,
              background: "var(--g)",
              verticalAlign: "middle",
              marginLeft: 2,
              animation: "caret-blink 1s step-end infinite",
            }}
          />
          <span style={{ color: "var(--muted)" }}>&quot;</span>
        </p>

        {/* ── Tagline ── */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(13px,1.6vw,15px)",
            color: "var(--muted)",
            maxWidth: 540,
            lineHeight: 1.75,
            marginBottom: 44,
            opacity: show ? 1 : 0,
            animation: show ? "slide-up 0.7s 0.8s ease both" : "none",
          }}
        >
          <span style={{ color: "var(--g3)" }}># </span>
          Building scalable, reliable, and efficient systems for the modern world.
        </p>

        {/* ── Buttons ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            opacity: show ? 1 : 0,
            animation: show ? "slide-up 0.7s 1s ease both" : "none",
          }}
        >
          <button
            className="btn btn-green"
            onClick={() => scrollTo("#projects")}
          >
            <span>./</span>view-projects.sh
          </button>
          <button
            className="btn btn-cyan"
            onClick={() => scrollTo("#contact")}
          >
            <span>ssh</span> contact@achira
          </button>
          <a className="btn btn-ghost" href="/resume.pdf" download>
            <span>curl</span> resume.pdf
          </a>
        </div>

        {/* ── Stats ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            marginTop: 60,
            paddingTop: 28,
            borderTop: "1px solid var(--border)",
            opacity: show ? 1 : 0,
            animation: show ? "slide-up 0.7s 1.2s ease both" : "none",
          }}
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: "var(--font-disp)",
                  fontSize: 28,
                  fontWeight: 800,
                  color: "var(--g)",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--muted)",
                  letterSpacing: "0.08em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          color: "var(--muted)",
          animation: "float 3s ease-in-out infinite",
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.18em",
          }}
        >
          SCROLL
        </span>
        <span style={{ fontSize: 14 }}>↓</span>
      </div>
    </section>
  );
}
