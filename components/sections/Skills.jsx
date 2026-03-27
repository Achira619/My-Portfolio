"use client";

import useIntersection from "@/hooks/useIntersection";
import SectionLabel from "@/components/ui/SectionLabel";
import ProgressBar from "@/components/ui/ProgressBar";
import { skillCategories, conceptBadges } from "@/data/skills";

export default function Skills() {
  const [ref, visible] = useIntersection(0.1);

  return (
    <section
      id="skills"
      ref={ref}
      style={{ padding: "110px clamp(16px,6vw,80px)" }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div
          className={`appear ${visible ? "visible" : ""}`}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <SectionLabel center>{"// Technical Skills"}</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-disp)",
              fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: 10,
            }}
          >
            The Stack I Work With
          </h2>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--muted)",
              letterSpacing: "0.06em",
            }}
          >
            apt list --installed | grep achira-skills
          </p>
        </div>

        {/* ── htop-style header row ── */}
        <div
          className={`appear ${visible ? "visible" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
            marginBottom: 24,
            padding: "8px 16px",
            background: "rgba(0,255,65,0.04)",
            border: "1px solid var(--border)",
            borderRadius: 2,
          }}
        >
          {[
            { label: "CPU", val: "72%",  color: "var(--g)"    },
            { label: "MEM", val: "4.2G", color: "var(--cyan)" },
            { label: "Tasks", val: "10+", color: "var(--amber)" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                display: "flex",
                gap: 6,
              }}
            >
              <span style={{ color: "var(--g3)" }}>{s.label}:</span>
              <span style={{ color: s.color }}>{s.val}</span>
            </div>
          ))}
        </div>

        {/* ── Skill card grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
            marginBottom: 40,
          }}
        >
          {skillCategories.map((cat, ci) => (
            <div
              key={cat.id}
              className={`card appear ${visible ? "visible" : ""}`}
              style={{
                padding: "26px 22px",
                transitionDelay: `${ci * 0.08}s`,
              }}
            >
              {/* Card header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                  paddingBottom: 12,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    border: `1px solid ${cat.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: cat.color,
                    borderRadius: 2,
                    fontSize: 14,
                  }}
                >
                  {cat.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-disp)",
                      fontWeight: 700,
                      fontSize: 13,
                      color: cat.color,
                    }}
                  >
                    {cat.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      color: "var(--muted)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {cat.path}
                  </div>
                </div>
              </div>

              {cat.skills.map((skill) => (
                <ProgressBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  pkg={skill.pkg}
                  color={cat.color}
                  animate={visible}
                />
              ))}
            </div>
          ))}
        </div>

        {/* ── Concept badges ── */}
        <div
          className={`appear ${visible ? "visible" : ""}`}
          style={{ transitionDelay: "0.35s" }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--muted)",
              letterSpacing: "0.16em",
              marginBottom: 14,
              textAlign: "center",
            }}
          >
            dpkg -l | grep concepts
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 9,
              justifyContent: "center",
            }}
          >
            {conceptBadges.map((b) => (
              <span
                key={b.label}
                className="tag"
                style={{ fontSize: 11, padding: "5px 12px" }}
              >
                <span style={{ color: "var(--g3)", marginRight: 4 }}>ii</span>
                {b.label}
                <span
                  style={{
                    color: "var(--muted)",
                    marginLeft: 6,
                    fontSize: 9,
                  }}
                >
                  [{b.pkg}]
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
