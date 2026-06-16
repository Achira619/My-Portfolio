"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "hero",           label: "hero"   },
  { id: "about",          label: "about"  },
  { id: "education",      label: "edu"    },
  { id: "skills",         label: "skills" },
  { id: "certifications", label: "certs"  },
  { id: "projects",       label: "proj"   },
  { id: "github",         label: "git"     },
  { id: "experience",     label: "exp"    },
  { id: "goals",          label: "goals"  },
  { id: "contact",        label: "contact"},
];

export default function StatusBar() {
  const [time, setTime]     = useState("");
  const [active, setActive] = useState("hero");

  // Live clock
  useEffect(() => {
    const fmt = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", { hour12: false }) +
          " UTC+" +
          String(-now.getTimezoneOffset() / 60).padStart(2, "0")
      );
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.3;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 150,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(12px, 4vw, 24px)",
          background: "rgba(5,10,5,0.92)",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(10px)",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.04em",
        }}
      >
        {/* Left — session tag */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <span
            style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--g)",
              boxShadow: "0 0 6px var(--g)",
              animation: "status-pulse 2s ease-in-out infinite",
            }}
          />
          <span style={{ color: "var(--g)" }}>[0]</span>
          <span style={{ color: "var(--muted)" }}>achira@portfolio</span>
        </div>

        {/* Center — tmux-style window list (status only, not clickable) */}
        <div
          className="statusbar-windows"
          style={{ display: "flex", gap: "clamp(8px, 1.4vw, 14px)" }}
        >
          {SECTIONS.map((s, i) => (
            <span
              key={s.id}
              style={{
                color: active === s.id ? "var(--g)" : "var(--muted2)",
                borderBottom: active === s.id ? "1px solid var(--g)" : "1px solid transparent",
                paddingBottom: 2,
              }}
            >
              {i}:{s.label}
            </span>
          ))}
        </div>

        {/* Right — clock */}
        <div style={{ color: "var(--muted)", flexShrink: 0 }}>{time}</div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .statusbar-windows { display: none !important; }
        }
      `}</style>
    </>
  );
}
