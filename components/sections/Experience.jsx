"use client";

import useIntersection from "@/hooks/useIntersection";
import SectionLabel from "@/components/ui/SectionLabel";
import { experiences } from "@/data/experience";

function ExperienceCard({ exp, delay }) {
  const [ref, visible] = useIntersection(0.15);

  return (
    <div
      ref={ref}
      className={`appear ${visible ? "visible" : ""}`}
      style={{
        paddingLeft: 52,
        marginBottom: 36,
        position: "relative",
        transitionDelay: `${delay}s`,
      }}
    >
      {/* Dot */}
      <div
        className="timeline-dot"
        style={{ color: exp.color }}
      >
        <div className="timeline-inner" />
      </div>

      {/* Card */}
      <div
        className="card"
        style={{ padding: "22px 26px" }}
      >
        {/* systemctl unit header */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--muted)",
            marginBottom: 12,
            letterSpacing: "0.05em",
          }}
        >
          <span style={{ color: "var(--g3)" }}>●</span>
          {" "}{exp.service}
          {" — "}
          <span style={{ color: exp.color }}>{exp.title}</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 14,
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.14em",
                color: exp.color,
                display: "block",
                marginBottom: 3,
                textTransform: "uppercase",
              }}
            >
              {exp.type}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-disp)",
                fontSize: 17,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {exp.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              {exp.org}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--muted)",
            }}
          >
            <span style={{ color: "var(--g3)" }}>⏱</span>
            {exp.period}
          </div>
        </div>

        {/* Status line */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--muted)",
            marginBottom: 14,
            paddingLeft: 4,
          }}
        >
          {"   Loaded: loaded; enabled-runtime"}
          <br />
          {"   Active: "}
          <span style={{ color: "var(--g)", fontWeight: 600 }}>
            active (exited)
          </span>
          {" since " + exp.period}
        </div>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {exp.points.map((point) => (
            <li
              key={point}
              style={{ display: "flex", gap: 8, alignItems: "flex-start" }}
            >
              <span
                style={{
                  color: exp.color,
                  flexShrink: 0,
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                →
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--muted)",
                  lineHeight: 1.65,
                }}
              >
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  const [headerRef, headerVisible] = useIntersection(0.2);

  return (
    <section
      id="experience"
      style={{ padding: "110px clamp(16px,6vw,80px)" }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div
          ref={headerRef}
          className={`appear ${headerVisible ? "visible" : ""}`}
          style={{ marginBottom: 52 }}
        >
          <SectionLabel>{"// Experience & Activities"}</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-disp)",
              fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Milestones
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
            systemctl list-units --type=service --state=active
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          <div className="timeline-line" />
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
