"use client";

import useIntersection from "@/hooks/useIntersection";
import SectionLabel from "@/components/ui/SectionLabel";
import { goals } from "@/data/goals";

function GoalCard({ goal, delay }) {
  const [ref, visible] = useIntersection(0.1);

  return (
    <div
      ref={ref}
      className={`card appear ${visible ? "visible" : ""}`}
      style={{
        padding: "24px",
        display: "flex",
        gap: 16,
        transitionDelay: `${delay}s`,
      }}
    >
      {/* Icon box */}
      <div
        style={{
          width: 42,
          height: 42,
          flexShrink: 0,
          border: `1px solid ${goal.color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          fontSize: 16,
          color: goal.color,
          background: "rgba(0,0,0,0.35)",
        }}
      >
        {goal.icon}
      </div>

      <div style={{ minWidth: 0 }}>
        {/* Cron schedule */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: "var(--muted)",
            letterSpacing: "0.08em",
            marginBottom: 4,
          }}
        >
          <span style={{ color: "var(--g3)" }}>CRON </span>
          {goal.cron}
        </div>

        <h3
          style={{
            fontFamily: "var(--font-disp)",
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 8,
          }}
        >
          {goal.title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--muted)",
            lineHeight: 1.75,
          }}
        >
          {goal.desc}
        </p>
      </div>
    </div>
  );
}

export default function Goals() {
  const [headerRef, headerVisible] = useIntersection(0.2);

  return (
    <section
      id="goals"
      style={{
        padding: "110px clamp(16px,6vw,80px)",
        background: "rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div
          ref={headerRef}
          className={`appear ${headerVisible ? "visible" : ""}`}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <SectionLabel center>{"// Career Vision"}</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-disp)",
              fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: 14,
            }}
          >
            Where I&apos;m Headed
          </h2>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--muted)",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            crontab -l — scheduled goals &amp; long-term objectives
          </p>
        </div>

        {/* crontab header */}
        <div
          className={`appear ${headerVisible ? "visible" : ""}`}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--muted)",
            marginBottom: 20,
            padding: "8px 14px",
            background: "rgba(0,255,65,0.03)",
            border: "1px solid var(--border)",
            borderRadius: 2,
            letterSpacing: "0.06em",
          }}
        >
          <span style={{ color: "var(--g3)" }}># m h dom mon dow   command</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 18,
          }}
        >
          {goals.map((g, i) => (
            <GoalCard key={g.id} goal={g} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
