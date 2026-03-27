"use client";

import useIntersection from "@/hooks/useIntersection";
import SectionLabel from "@/components/ui/SectionLabel";
import Tag from "@/components/ui/Tag";
import { education } from "@/data/education";

function StatusBadge({ status }) {
  const isActive = status === "active";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "2px 9px",
        background: isActive
          ? "rgba(0,255,65,0.07)"
          : "rgba(0,229,255,0.07)",
        border: `1px solid ${isActive ? "rgba(0,255,65,0.25)" : "rgba(0,229,255,0.25)"}`,
        borderRadius: 2,
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: "0.1em",
        color: isActive ? "var(--g)" : "var(--cyan)",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: isActive ? "var(--g)" : "var(--cyan)",
          ...(isActive && { animation: "status-pulse 2s ease-in-out infinite" }),
        }}
      />
      {isActive ? "Enrolled" : "Completed"}
    </span>
  );
}

function EduCard({ edu, delay }) {
  const [ref, visible] = useIntersection(0.1);

  return (
    <div
      ref={ref}
      className={`appear ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* fs path header */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--muted)",
          marginBottom: 12,
          letterSpacing: "0.05em",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ color: "var(--g3)" }}>drwxr-xr-x</span>
        <span style={{ color: edu.color }}>{edu.path}</span>
      </div>

      <div
        style={{
          background: "var(--surface)",
          border: `1px solid ${edu.status === "active" ? "rgba(0,255,65,0.2)" : "var(--border)"}`,
          borderRadius: 4,
          overflow: "hidden",
          backdropFilter: "blur(20px)",
          transition: "border-color 0.28s, box-shadow 0.28s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = edu.color;
          e.currentTarget.style.boxShadow = `0 0 20px ${edu.color}22`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor =
            edu.status === "active"
              ? "rgba(0,255,65,0.2)"
              : "var(--border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Coloured top bar */}
        <div
          style={{
            height: 3,
            background: `linear-gradient(90deg, ${edu.color}, transparent)`,
          }}
        />

        <div style={{ padding: "28px 28px 24px" }}>
          {/* Header row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: edu.color,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {edu.level}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-disp)",
                  fontSize: "clamp(16px,2vw,20px)",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.2,
                  marginBottom: 4,
                }}
              >
                {edu.institution}
              </h3>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--muted)",
                  marginBottom: 8,
                }}
              >
                {edu.affiliation}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--white)",
                  fontWeight: 500,
                }}
              >
                {edu.degree}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 8,
              }}
            >
              <StatusBadge status={edu.status} />
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--muted)",
                  letterSpacing: "0.06em",
                }}
              >
                ⏱ {edu.period}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--muted)",
                }}
              >
                📍 {edu.location}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
            className="edu-inner-grid"
          >
            {/* Highlights */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: "var(--muted)",
                  letterSpacing: "0.14em",
                  marginBottom: 10,
                }}
              >
                # HIGHLIGHTS
              </div>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 7,
                }}
              >
                {edu.highlights.map((h) => (
                  <li
                    key={h}
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        color: edu.color,
                        flexShrink: 0,
                        fontSize: 11,
                        marginTop: 1,
                      }}
                    >
                      →
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--muted)",
                        lineHeight: 1.55,
                      }}
                    >
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modules */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: "var(--muted)",
                  letterSpacing: "0.14em",
                  marginBottom: 10,
                }}
              >
                # MODULES
              </div>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
              >
                {edu.modules.map((m) => (
                  <Tag key={m} color={edu.color}>
                    {m}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  const [headerRef, headerVisible] = useIntersection(0.2);

  return (
    <section
      id="education"
      style={{
        padding: "110px clamp(16px,6vw,80px)",
        background: "rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Header */}
        <div
          ref={headerRef}
          className={`appear ${headerVisible ? "visible" : ""}`}
          style={{ marginBottom: 52 }}
        >
          <SectionLabel>// Education</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-disp)",
              fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Academic Background
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
            find /edu -type d -name "*.degree" | sort -r
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {education.map((edu, i) => (
            <EduCard key={edu.id} edu={edu} delay={i * 0.12} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .edu-inner-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
