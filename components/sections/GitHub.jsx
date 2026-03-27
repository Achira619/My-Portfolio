"use client";

import { useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import useIntersection from "@/hooks/useIntersection";
import SectionLabel from "@/components/ui/SectionLabel";

const GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Achira619";

const STATS_URL     = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&title_color=00ff41&icon_color=00ff41&text_color=4a7a4a&border_color=00ff41&border_radius=4&bg_color=00000000`;
const STREAK_URL    = `https://streak-stats.demolab.com?user=${GITHUB_USERNAME}&theme=transparent&ring=00ff41&fire=00cc33&border=00ff41&background=00000000`;
const TOP_LANGS_URL = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&title_color=00ff41&text_color=4a7a4a&border_color=00ff41&bg_color=00000000`;

const CALENDAR_THEME = {
  light: ["#001a07", "#003311", "#006622", "#00aa33", "#00ff41"],
  dark: ["#001a07", "#003311", "#006622", "#00aa33", "#00ff41"],
};

function StatCard({ url, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        background: "rgba(2,8,2,0.9)",
        border: "1px solid var(--border)",
        borderRadius: 4,
        minHeight: 120,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          opacity: loaded ? 1 : 0,
          transition: "0.4s",
          padding: 12,
        }}
      />
    </div>
  );
}

export default function GitHub() {
  const [headerRef] = useIntersection(0.2);

  return (
    <section
      id="github"
      style={{
        padding: "110px clamp(16px,6vw,80px)",
        background: "rgba(0,0,0,0.25)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>

        {/* Header */}
        <div ref={headerRef}>
          <SectionLabel>{"// GitHub Activity"}</SectionLabel>
          <h2>Open Source & Contributions</h2>
        </div>

        {/* Profile */}
        <div style={{ marginBottom: 20 }}>
          github.com/<span style={{ color: "var(--g)" }}>{GITHUB_USERNAME}</span>
        </div>

        {/* GitHub calendar via react-github-calendar */}
        <div
          style={{
            background: "rgba(2,8,2,0.9)",
            border: "1px solid var(--border2)",
            borderRadius: 4,
            overflow: "hidden",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 14px",
              borderBottom: "1px solid var(--border)",
              background: "rgba(0,255,65,0.04)",
              fontSize: 10,
              fontFamily: "var(--font-mono)",
              color: "var(--muted)",
              letterSpacing: "0.06em",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
            <span style={{ marginLeft: 8 }}>contrib-monitor --user {GITHUB_USERNAME}</span>
          </div>

          <div
            style={{
              padding: "8px 14px 0",
              fontSize: 10,
              fontFamily: "var(--font-mono)",
              color: "var(--muted)",
              letterSpacing: "0.04em",
            }}
          >
            <span style={{ color: "var(--g3)" }}>$</span> git log --since=1.year --author={GITHUB_USERNAME} --oneline
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              overflowX: "auto",
              padding: "8px 14px 14px",
              background:
                "repeating-linear-gradient(0deg, rgba(0,255,65,0.02) 0, rgba(0,255,65,0.02) 1px, transparent 1px, transparent 26px), repeating-linear-gradient(90deg, rgba(0,255,65,0.02) 0, rgba(0,255,65,0.02) 1px, transparent 1px, transparent 26px)",
            }}
          >
            <div style={{ minWidth: "max-content" }}>
              <GitHubCalendar
                username={GITHUB_USERNAME}
                colorScheme="dark"
                theme={CALENDAR_THEME}
                fontSize={12}
                blockSize={11}
                blockMargin={4}
                showWeekdayLabels={false}
                showColorLegend={false}
                labels={{
                  totalCount: "{{count}} contributions in the last year",
                }}
                errorMessage="Failed to load GitHub contributions calendar"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          <StatCard url={STATS_URL} alt="GitHub stats" />
          <StatCard url={STREAK_URL} alt="GitHub streak stats" />
          <StatCard url={TOP_LANGS_URL} alt="Top GitHub languages" />
        </div>

      </div>
    </section>
  );
}
