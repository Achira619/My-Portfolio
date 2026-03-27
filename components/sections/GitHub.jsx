"use client";

import { useState } from "react";
import useIntersection from "@/hooks/useIntersection";
import SectionLabel from "@/components/ui/SectionLabel";

// ─── CONFIG — change this to your real GitHub username ───────────────────────
const GITHUB_USERNAME = "Achira619";

// Contribution graph via ghchart.rshah.org (returns a coloured SVG — no auth needed)
// We use the phosphor-green hex that matches our design system.
const GRAPH_COLOR   = "00ff41";
const GRAPH_URL     = `https://ghchart.rshah.org/${GRAPH_COLOR}/${GITHUB_USERNAME}`;

// GitHub readme-stats cards (dark theme, matching our bg)
const STATS_URL     = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&title_color=00ff41&icon_color=00ff41&text_color=4a7a4a&border_color=00ff41&border_radius=4&bg_color=00000000&hide_border=false`;
const STREAK_URL    = `https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=transparent&ring=00ff41&fire=00cc33&currStreakLabel=00ff41&sideLabels=4a7a4a&dates=4a7a4a&border=00ff41&background=00000000&border_radius=4`;
const TOP_LANGS_URL = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&title_color=00ff41&text_color=4a7a4a&border_color=00ff41&border_radius=4&bg_color=00000000&langs_count=6`;

// ─────────────────────────────────────────────────────────────────────────────

function StatCard({ url, alt, delay }) {
  const [ref, visible] = useIntersection(0.1);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div
      ref={ref}
      className={`appear ${visible ? "visible" : ""}`}
      style={{
        transitionDelay: `${delay}s`,
        background: "rgba(2,8,2,0.9)",
        border: "1px solid var(--border)",
        borderRadius: 4,
        overflow: "hidden",
        transition: "border-color 0.28s, box-shadow 0.28s",
        minHeight: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border3)";
        e.currentTarget.style.boxShadow   = "var(--glow-sm)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow   = "none";
      }}
    >
      {/* Loading shimmer */}
      {!loaded && !errored && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, transparent, rgba(0,255,65,0.03), transparent)",
            animation: "shimmer 1.4s linear infinite",
          }}
        />
      )}

      {errored ? (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--muted)",
            padding: 20,
            textAlign: "center",
          }}
        >
          <span style={{ color: "var(--g3)" }}>fetch: </span>
          Unable to load — check network
        </div>
      ) : (
        <img
          src={url}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s ease",
            padding: "12px 14px",
          }}
        />
      )}
    </div>
  );
}

export default function GitHub() {
  const [headerRef, headerVisible] = useIntersection(0.2);
  const [graphRef, graphVisible]   = useIntersection(0.1);
  const [graphLoaded, setGraphLoaded] = useState(false);
  const [graphErrored, setGraphErrored] = useState(false);

  return (
    <section
      id="github"
      style={{
        padding: "110px clamp(16px,6vw,80px)",
        background: "rgba(0,0,0,0.25)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className={`appear ${headerVisible ? "visible" : ""}`}
          style={{ marginBottom: 52 }}
        >
          <SectionLabel>// GitHub Activity</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-disp)",
              fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Open Source &amp; Contributions
          </h2>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--muted)",
              marginTop: 8,
              letterSpacing: "0.06em",
            }}
          >
            <span style={{ color: "var(--g3)" }}>git log</span>
            {` --author="${GITHUB_USERNAME}" --all --oneline | wc -l`}
          </p>
        </div>

        {/* ── Profile link pill ── */}
        <div
          className={`appear ${headerVisible ? "visible" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            padding: "12px 18px",
            background: "rgba(0,255,65,0.04)",
            border: "1px solid var(--border2)",
            borderRadius: 4,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
            }}
          >
            <div
              style={{
                width: 30, height: 30,
                border: "1px solid var(--g)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--g)",
                fontSize: 14,
              }}
            >
              ⊙
            </div>
            <div>
              <div style={{ color: "var(--white)" }}>
                github.com/
                <span style={{ color: "var(--g)" }}>{GITHUB_USERNAME}</span>
              </div>
              <div style={{ color: "var(--muted)", fontSize: 10 }}>
                Public profile · contributions below
              </div>
            </div>
          </div>

          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-green"
            style={{ padding: "7px 18px", fontSize: 10 }}
          >
            git remote -v ↗
          </a>
        </div>

        {/* ── Contribution graph ── */}
        <div
          ref={graphRef}
          className={`appear ${graphVisible ? "visible" : ""}`}
          style={{
            background: "rgba(2,8,2,0.9)",
            border: "1px solid var(--border2)",
            borderRadius: 4,
            padding: "24px 20px 20px",
            marginBottom: 24,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Term-bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 18,
            }}
          >
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#28c840" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--muted)",
                marginLeft: 8,
              }}
            >
              contribution-graph — {GITHUB_USERNAME}
            </span>
          </div>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--muted)",
              marginBottom: 16,
              letterSpacing: "0.06em",
            }}
          >
            <span style={{ color: "var(--g3)" }}>root@achira-dev:~#</span>
            {" "}gh contrib --year=2024 --format=graph
          </div>

          {graphErrored ? (
            <div
              style={{
                padding: "32px",
                textAlign: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--muted)",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 10 }}>⊙</div>
              Unable to load contribution graph.
              <br />
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--g)", textDecoration: "none" }}
              >
                View on GitHub ↗
              </a>
            </div>
          ) : (
            <>
              {!graphLoaded && (
                <div
                  style={{
                    height: 128,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--muted)",
                  }}
                >
                  loading contributions...
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 12,
                      background: "var(--g)",
                      marginLeft: 6,
                      verticalAlign: "middle",
                      animation: "caret-blink 1s step-end infinite",
                    }}
                  />
                </div>
              )}
              <img
                src={GRAPH_URL}
                alt={`${GITHUB_USERNAME} GitHub contributions`}
                onLoad={() => setGraphLoaded(true)}
                onError={() => setGraphErrored(true)}
                style={{
                  width: "100%",
                  height: "auto",
                  display: graphLoaded ? "block" : "none",
                  borderRadius: 2,
                  // invert so the empty cells match our dark bg
                  filter: "brightness(10) contrast(1.1)",
                }}
              />
            </>
          )}

          <div
            style={{
              marginTop: 14,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--muted)",
            }}
          >
            <span>Less</span>
            {["rgba(0,255,65,0.1)","rgba(0,255,65,0.25)","rgba(0,255,65,0.45)","rgba(0,255,65,0.7)","var(--g)"].map(
              (c, i) => (
                <div
                  key={i}
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 2,
                    background: c,
                  }}
                />
              )
            )}
            <span>More</span>
          </div>
        </div>

        {/* ── Stats cards row ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          <StatCard url={STATS_URL}    alt="GitHub Stats"   delay={0}    />
          <StatCard url={STREAK_URL}   alt="GitHub Streak"  delay={0.1}  />
          <StatCard url={TOP_LANGS_URL} alt="Top Languages" delay={0.2}  />
        </div>

        {/* Note about stats */}
        <div
          className={`appear ${headerVisible ? "visible" : ""}`}
          style={{
            marginTop: 16,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--muted)",
            textAlign: "center",
            letterSpacing: "0.06em",
          }}
        >
          # Stats powered by github-readme-stats · ghchart.rshah.org
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
