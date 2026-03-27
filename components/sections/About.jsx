"use client";

import useIntersection from "@/hooks/useIntersection";
import SectionLabel from "@/components/ui/SectionLabel";
import Terminal from "@/components/ui/Terminal";
import Tag from "@/components/ui/Tag";

const TAGS = ["IIT Sri Lanka", "SRE Focused", "Self-Learner", "Builder", "Linux User"];

const FACTS = [
  { label: "Hostname",  value: "achira-dev.local"          },
  { label: "OS",        value: "AchiraOS 1.0 (Stable)"     },
  { label: "Shell",     value: "/bin/bash 5.2.21"          },
  { label: "Uptime",    value: "20y (still going)"         },
  { label: "Load avg",  value: "high — learning 24/7"      },
];

export default function About() {
  const [ref, visible] = useIntersection(0.15);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "110px clamp(16px,6vw,80px)",
        background: "rgba(0,0,0,0.25)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 72,
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* ── Left: copy ── */}
          <div className={`appear ${visible ? "visible" : ""}`}>
            <SectionLabel>// About Me</SectionLabel>

            <h2
              style={{
                fontFamily: "var(--font-disp)",
                fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 28,
              }}
            >
              Engineering{" "}
              <span style={{ color: "var(--g)" }}>Reliability</span>
              <br />
              <span style={{ color: "var(--muted)" }}>from the</span>{" "}
              <span style={{ color: "var(--cyan)" }}>Ground Up</span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--muted)",
                lineHeight: 1.95,
                marginBottom: 18,
              }}
            >
              I&apos;m a Computer Science undergraduate at IIT Sri Lanka, deeply
              passionate about Site Reliability Engineering and DevOps. I don&apos;t
              just write code — I build systems that{" "}
              <span style={{ color: "var(--white)" }}>stay up</span>.
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--muted)",
                lineHeight: 1.95,
                marginBottom: 18,
              }}
            >
              My focus sits at the intersection of development and operations —
              automating infrastructure, optimising database performance, and
              designing for resilience at scale. Reliability is a feature, not
              an afterthought.
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--muted)",
                lineHeight: 1.95,
                marginBottom: 32,
              }}
            >
              Through building Corpovinculo and participating in Agile workshops,
              I&apos;ve developed real-world understanding of full system lifecycles.
              I actively study Linux internals, Docker, and cloud-native patterns
              to close the gap between learning and doing.
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {TAGS.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            {/* /proc/self/status table */}
            <div
              style={{
                background: "rgba(0,255,65,0.03)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                padding: "16px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--g)",
                  letterSpacing: "0.12em",
                  marginBottom: 12,
                }}
              >
                cat /proc/self/status
              </div>
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  style={{
                    display: "flex",
                    gap: 12,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    lineHeight: 1.9,
                  }}
                >
                  <span
                    style={{
                      color: "var(--g3)",
                      minWidth: 90,
                    }}
                  >
                    {f.label}:
                  </span>
                  <span style={{ color: "var(--white)" }}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: terminal ── */}
          <div
            className={`appear ${visible ? "visible" : ""}`}
            style={{ transitionDelay: "0.18s" }}
          >
            <Terminal />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
