"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [uptime, setUptime] = useState("0d 0h 0m 0s");

  // Fake "session uptime" counter starting from page load
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000);
      const d = Math.floor(s / 86400);
      const h = Math.floor((s % 86400) / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = s % 60;
      setUptime(
        `${d}d ${String(h).padStart(2, "0")}h ` +
        `${String(m).padStart(2, "0")}m ${String(sec).padStart(2, "0")}s`
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      style={{
        padding: "28px clamp(16px,5vw,56px)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Left */}
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)" }}>
        <span style={{ color: "var(--g)" }}>©</span> 2026 Achira Medagedara —{" "}
        <span style={{ color: "var(--muted)" }}>All rights reserved</span>
      </div>

      {/* Center — fake process info */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--muted)",
          display: "flex",
          gap: 20,
        }}
      >
        <span>
          <span style={{ color: "var(--g3)" }}>PID</span> 1 &nbsp;|&nbsp;
          <span style={{ color: "var(--g3)" }}>USER</span> achira &nbsp;|&nbsp;
          <span style={{ color: "var(--g3)" }}>SESSION</span>{" "}
          <span style={{ color: "var(--g)" }}>{uptime}</span>
        </span>
      </div>

      {/* Right */}
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)" }}>
        Built with{" "}
        <span style={{ color: "var(--g)" }}>Next.js</span> &amp;{" "}
        <span style={{ color: "var(--g)" }}>Tailwind</span>
        &nbsp;·&nbsp;
        <span style={{ color: "var(--g2)" }}>Designed for SRE</span>
      </div>
    </footer>
  );
}
