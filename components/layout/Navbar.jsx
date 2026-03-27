"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "about",    href: "#about"          },
  { label: "edu",      href: "#education"      },
  { label: "skills",   href: "#skills"         },
  { label: "certs",    href: "#certifications" },
  { label: "projects", href: "#projects"       },
  { label: "github",   href: "#github"         },
  { label: "goals",    href: "#goals"          },
  { label: "contact",  href: "#contact"        },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobile]   = useState(false);
  const [time, setTime]           = useState("");

  // Scroll detection
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Live clock — Linux top-bar feel
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

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMobile(false);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: 58,
          padding: "0 clamp(16px,5vw,56px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(5,10,5,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "all 0.35s ease",
        }}
      >
        {/* ── Logo ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 30, height: 30,
              border: "1px solid var(--g)",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11, fontWeight: 700,
                color: "var(--g)",
              }}
            >
              AM
            </span>
            <div
              style={{
                position: "absolute", inset: -5,
                border: "1px solid rgba(0,255,65,.2)",
                animation: "pulse-ring 2.5s ease-out infinite",
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11, color: "var(--g)",
                letterSpacing: "0.04em",
              }}
            >
              root@achira-dev
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9, color: "var(--muted)",
                letterSpacing: "0.06em",
              }}
            >
              {time}
            </div>
          </div>
        </div>

        {/* ── Desktop nav ── */}
        <div
          className="desktop-nav"
          style={{ display: "flex", alignItems: "center", gap: 28 }}
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: 11, letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                padding: "4px 0",
                position: "relative",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--g)";
                e.currentTarget.querySelector(".underline-bar").style.width = "100%";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.querySelector(".underline-bar").style.width = "0";
              }}
            >
              <span style={{ color: "var(--g3)", marginRight: 2 }}>~/</span>
              {l.label}
              <div
                className="underline-bar"
                style={{
                  position: "absolute", bottom: 0, left: 0,
                  height: 1, width: 0,
                  background: "var(--g)",
                  transition: "width 0.28s ease",
                }}
              />
            </button>
          ))}

          <button
            onClick={() => scrollTo("#contact")}
            className="btn btn-green"
            style={{ padding: "7px 16px", fontSize: 10 }}
          >
            $ hire --me
          </button>
        </div>

        {/* ── Mobile burger ── */}
        <button
          className="mobile-burger"
          onClick={() => setMobile(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "1px solid var(--border2)",
            color: "var(--g)",
            padding: "6px 8px",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
          }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 58, left: 0, right: 0,
            zIndex: 99,
            background: "rgba(5,10,5,0.98)",
            borderBottom: "1px solid var(--border)",
            backdropFilter: "blur(20px)",
            padding: "24px clamp(16px,5vw,56px)",
            display: "flex", flexDirection: "column", gap: 18,
          }}
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: 13, letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                textAlign: "left",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--g)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              <span style={{ color: "var(--g3)" }}>~/</span>{l.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav  { display: none !important; }
          .mobile-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
