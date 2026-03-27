"use client";

import useIntersection from "@/hooks/useIntersection";
import SectionLabel from "@/components/ui/SectionLabel";
import Tag from "@/components/ui/Tag";
import { certifications } from "@/data/certifications";

const STATUS_MAP = {
  earned:      { label: "VERIFIED",    bg: "rgba(0,255,65,0.08)",   border: "rgba(0,255,65,0.28)",   text: "var(--g)"    },
  "in-progress":{ label: "IN PROGRESS", bg: "rgba(255,184,0,0.08)",  border: "rgba(255,184,0,0.28)",  text: "var(--amber)" },
  planned:     { label: "PLANNED",     bg: "rgba(90,122,153,0.08)", border: "rgba(90,122,153,0.22)", text: "var(--muted)" },
};

function StatusPill({ status }) {
  const s = STATUS_MAP[status] ?? STATUS_MAP.planned;
  return (
    <span
      style={{
        padding: "2px 9px",
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 2,
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: "0.1em",
        color: s.text,
      }}
    >
      {s.label}
    </span>
  );
}

function CertCard({ cert, delay }) {
  const [ref, visible] = useIntersection(0.1);
  const isEarned = cert.status === "earned";

  return (
    <div
      ref={ref}
      className={`appear ${visible ? "visible" : ""}`}
      style={{
        transitionDelay: `${delay}s`,
        background: "var(--surface)",
        border: `1px solid ${isEarned ? "rgba(0,255,65,0.2)" : "var(--border)"}`,
        borderRadius: 4,
        backdropFilter: "blur(20px)",
        overflow: "hidden",
        transition: "border-color 0.28s, box-shadow 0.28s, transform 0.28s",
        cursor: isEarned ? "pointer" : "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = cert.color;
        e.currentTarget.style.boxShadow = `0 0 18px ${cert.color}22`;
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isEarned
          ? "rgba(0,255,65,0.2)"
          : "var(--border)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: 2,
          background: isEarned
            ? `linear-gradient(90deg, ${cert.color}, transparent)`
            : "transparent",
          borderBottom: isEarned ? "none" : "1px solid var(--border)",
        }}
      />

      <div style={{ padding: "22px 22px 20px" }}>
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 10,
            marginBottom: 14,
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 40,
              height: 40,
              border: `1px solid ${cert.color}`,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
              flexShrink: 0,
              background: `${cert.color}0a`,
              color: cert.color,
              opacity: isEarned ? 1 : 0.45,
            }}
          >
            {cert.icon}
          </div>

          <StatusPill status={cert.status} />
        </div>

        {/* Name */}
        <h3
          style={{
            fontFamily: "var(--font-disp)",
            fontSize: 14,
            fontWeight: 700,
            color: isEarned ? "#fff" : "var(--muted)",
            lineHeight: 1.3,
            marginBottom: 5,
          }}
        >
          {cert.name}
        </h3>

        {/* Issuer */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--muted)",
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ color: "var(--g3)" }}>issuer:</span>
          {cert.issuer}
        </div>

        {/* Meta */}
        {cert.issued && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--muted)",
              marginBottom: 14,
              display: "flex",
              gap: 14,
            }}
          >
            <span>
              <span style={{ color: "var(--g3)" }}>issued: </span>
              {cert.issued}
            </span>
            {cert.expires && (
              <span>
                <span style={{ color: "var(--g3)" }}>expires: </span>
                {cert.expires}
              </span>
            )}
          </div>
        )}

        {/* Credential ID */}
        {cert.credentialId && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              color: "var(--muted)",
              marginBottom: 14,
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ color: "var(--g3)" }}>id: </span>
            {cert.credentialId}
          </div>
        )}

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
          {cert.tags.map((t) => (
            <Tag key={t} color={cert.color}>
              {t}
            </Tag>
          ))}
        </div>

        {/* Verify link */}
        {isEarned && cert.verifyUrl && cert.verifyUrl !== "#" && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--g)",
              textDecoration: "none",
              letterSpacing: "0.06em",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            ✓ verify credential ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function Certifications() {
  const [headerRef, headerVisible] = useIntersection(0.2);

  const earned     = certifications.filter((c) => c.status === "earned");
  const inProgress = certifications.filter((c) => c.status === "in-progress");
  const planned    = certifications.filter((c) => c.status === "planned");

  const groups = [
    { label: "Verified",     cmd: "ls -la ~/certs/earned/",       items: earned     },
    { label: "In Progress",  cmd: "systemctl status learning.service", items: inProgress },
    { label: "Roadmap",      cmd: "cat ~/certs/roadmap.txt",      items: planned    },
  ].filter((g) => g.items.length > 0);

  return (
    <section
      id="certifications"
      style={{ padding: "110px clamp(16px,6vw,80px)" }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Header */}
        <div
          ref={headerRef}
          className={`appear ${headerVisible ? "visible" : ""}`}
          style={{ marginBottom: 52 }}
        >
          <SectionLabel>// Certifications</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-disp)",
              fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Credentials &amp; Roadmap
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
            find ~/certs -name "*.cert" | xargs verify --status
          </p>
        </div>

        {/* Progress summary bar */}
        <div
          className={`appear ${headerVisible ? "visible" : ""}`}
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            padding: "14px 20px",
            background: "rgba(0,255,65,0.03)",
            border: "1px solid var(--border)",
            borderRadius: 4,
            marginBottom: 40,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
          }}
        >
          {[
            { k: "earned",      label: "verified",     color: "var(--g)",    val: earned.length     },
            { k: "in-progress", label: "in-progress",  color: "var(--amber)", val: inProgress.length },
           // { k: "planned",     label: "roadmap",      color: "var(--muted)", val: planned.length    },
            { k: "total",       label: "total",        color: "var(--cyan)",  val: certifications.length },
          ].map((s) => (
            <div key={s.k} style={{ display: "flex", gap: 6 }}>
              <span style={{ color: "var(--g3)" }}>{s.label}:</span>
              <span style={{ color: s.color, fontWeight: 600 }}>{s.val}</span>
            </div>
          ))}
        </div>

        {/* Groups */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {groups.map((group) => (
            <div key={group.label}>
              {/* Group label */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--muted)",
                  letterSpacing: "0.1em",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ color: "var(--g3)" }}>#</span>
                {group.label.toUpperCase()}
                <span style={{ color: "var(--g3)", marginLeft: 4 }}>
                  — {group.cmd}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 16,
                }}
              >
                {group.items.map((cert, i) => (
                  <CertCard key={cert.id} cert={cert} delay={i * 0.08} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
