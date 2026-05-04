"use client";

import useIntersection from "@/hooks/useIntersection";
import SectionLabel from "@/components/ui/SectionLabel";
import Tag from "@/components/ui/Tag";
import { projects } from "@/data/projects";

function StatusPill({ status }) {
  const isRunning = status === "running";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "2px 9px",
        background: isRunning
          ? "rgba(0,255,65,0.08)"
          : "rgba(163, 8, 8, 0.93)",
        border: `1px solid ${isRunning ? "rgba(0,255,65,0.28)" : "rgba(198, 10, 10, 0.75)"}`,
        borderRadius: 2,
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: "0.1em",
        color: isRunning ? "var(--g)" : "var(--amber)",
      }}
    >
      <span
        style={{
          width: 5, height: 5,
          borderRadius: "50%",
          background: isRunning ? "var(--g)" : "var(--amber)",
          boxShadow: isRunning ? "0 0 5px var(--g)" : "0 0 5px var(--amber)",
        }}
      />
      {isRunning ? "ACTIVE (RUNNING)" : "INACTIVE (IN-PROGRESS)"}
    </span>
  );
}

function FeaturedProject({ project }) {
  const [ref, visible] = useIntersection(0.1);

  return (
    <div
      ref={ref}
      className={`appear ${visible ? "visible" : ""}`}
      style={{
        padding: "36px",
        background:
          "linear-gradient(135deg, rgba(0,255,65,0.04) 0%, rgba(0,229,255,0.02) 100%)",
        border: "1px solid rgba(0,255,65,0.22)",
        borderRadius: 4,
        marginBottom: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Corner glow */}
      <div
        style={{
          position: "absolute",
          top: 0, right: 0,
          width: 320, height: 260,
          background:
            "radial-gradient(ellipse, rgba(0,255,65,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* ls -la style header */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--muted)",
          marginBottom: 18,
          letterSpacing: "0.06em",
        }}
      >
        <span style={{ color: "var(--g3)" }}>drwxr-xr-x</span>
        {"  achira  staff  "}
        <span style={{ color: "var(--g)" }}>{project.path}</span>
        {"  PID:"}
        <span style={{ color: "var(--cyan)" }}> {project.pid}</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 14,
          marginBottom: 22,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 42, height: 42,
              border: "1px solid var(--g)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              fontSize: 18,
            }}
          >
            ⬛
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <h3
                style={{
                  fontFamily: "var(--font-disp)",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                {project.name}
              </h3>
              <StatusPill status={project.status} />
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--muted)",
              }}
            >
              ⭐ Featured Project
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href={project.repoUrl}
            className="btn btn-ghost"
            style={{ padding: "7px 16px", fontSize: 10 }}
          >
            git clone
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="btn btn-green"
              style={{ padding: "7px 16px", fontSize: 10 }}
            >
              ./run.sh ↗
            </a>
          )}
        </div>
      </div>

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--muted)",
          lineHeight: 1.85,
          marginBottom: 24,
          maxWidth: 580,
        }}
      >
        {project.desc}
      </p>

      {/* Contributions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 9,
          marginBottom: 24,
        }}
        className="feat-points"
      >
        {project.contributions.map((c) => (
          <div
            key={c}
            style={{ display: "flex", alignItems: "flex-start", gap: 7 }}
          >
            <span style={{ color: "var(--g)", flexShrink: 0, fontSize: 12 }}>✓</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--muted)",
                lineHeight: 1.55,
              }}
            >
              {c}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
        {project.tech.map((t) => (
          <Tag key={t} color={project.color}>{t}</Tag>
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .feat-points { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function ProjectCard({ project, delay }) {
  const [ref, visible] = useIntersection(0.1);

  return (
    <div
      ref={ref}
      className={`card appear ${visible ? "visible" : ""}`}
      style={{ padding: "26px", transitionDelay: `${delay}s` }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <span style={{ fontSize: 18, color: project.color }}>{project.icon ?? "⊙"}</span>
        <StatusPill status={project.status} />
      </div>

      {/* ls path */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          color: "var(--muted)",
          marginBottom: 8,
          letterSpacing: "0.05em",
        }}
      >
        {project.path}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-disp)",
          fontSize: 16,
          fontWeight: 700,
          color: "#fff",
          marginBottom: 10,
        }}
      >
        {project.name}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--muted)",
          lineHeight: 1.75,
          marginBottom: 18,
        }}
      >
        {project.desc}
      </p>

      {project.contributions?.length ? (
        <div style={{ marginBottom: 16 }}>
          {project.contributions.slice(0, 3).map((c) => (
            <div
              key={c}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 6,
                marginBottom: 6,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--muted)",
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: project.color, flexShrink: 0 }}>▸</span>
              <span>{c}</span>
            </div>
          ))}
        </div>
      ) : null}

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
            style={{ padding: "6px 12px", fontSize: 10 }}
          >
            git clone
          </a>
        ) : null}
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-green"
            style={{ padding: "6px 12px", fontSize: 10 }}
          >
            ./run.sh ↗
          </a>
        ) : null}
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {project.tech.map((t) => (
          <Tag key={t} color={project.color}>{t}</Tag>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [headerRef, headerVisible] = useIntersection(0.2);

  const featuredProjects = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      style={{
        padding: "110px clamp(16px,6vw,80px)",
        background: "rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div
          ref={headerRef}
          className={`appear ${headerVisible ? "visible" : ""}`}
          style={{ marginBottom: 52 }}
        >
          <SectionLabel>{"// Projects"}</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-disp)",
              fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            What I&apos;ve Built
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
            ls -la ~/projects/
          </p>
        </div>

        {/* Featured */}
        {featuredProjects.map((project) => (
          <FeaturedProject key={project.id} project={project} />
        ))}

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
          }}
        >
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
