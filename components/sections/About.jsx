"use client";

import useIntersection from "@/hooks/useIntersection";
import SectionLabel from "@/components/ui/SectionLabel";
import Terminal from "@/components/ui/Terminal";
import Tag from "@/components/ui/Tag";

const TAGS = ["IIT Sri Lanka", "SRE Focused", "Self-Learner", "Builder", "Linux User"];

const FACTS = [
  { label: "Hostname",  value: "Achira Medagedara"          },
  { label: "OS",     value: "Male"          },
  { label: "UpSince",    value: "2003/10/26"         },
  { label: "Current Location ",value: "Colombo Sri lanka"     },
  { label: "Home base ",  value: "691/06 Peradeniya Road, Kandy, Sri lanka"      },
];

const LOCATION_POINTS = {
  kandy: { x: 52, y: 47, label: "Kandy" },
  colombo: { x: 42, y: 62, label: "Colombo" },
  galle: { x: 48, y: 80, label: "Galle" },
  jaffna: { x: 50, y: 18, label: "Jaffna" },
};

function resolvePoint(value) {
  const normalized = String(value || "").toLowerCase();
  const foundKey = Object.keys(LOCATION_POINTS).find((key) =>
    normalized.includes(key)
  );

  if (foundKey) return LOCATION_POINTS[foundKey];
  return { x: 50, y: 55, label: "Sri Lanka" };
}

export default function About() {
  const [ref, visible] = useIntersection(0.15);
  const currentLocation =
    FACTS.find((f) => f.label.toLowerCase().includes("current location"))
      ?.value || "";

  const currentPoint = resolvePoint(currentLocation);
  const isAtHomeBase = String(currentLocation).toLowerCase().includes("kandy");
  const homePoint = LOCATION_POINTS.kandy;

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
            <SectionLabel>{"// About Me"}</SectionLabel>

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
              Engineering,{" "}
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
              I&apos;m a Software Engineering undergraduate at University Of WestMinster, IIT Sri Lanka, deeply
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
                display: "grid",
                gridTemplateColumns: "1.8fr 1fr",
                gap: 16,
              }}
              className="facts-wrap"
            >
              <div
                style={{
                  background: "rgba(0,255,65,0.03)",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  padding: "14px 18px 14px 8px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--g)",
                    letterSpacing: "0.12em",
                    marginBottom: 8,
                  }}
                >
                  cat /proc/self/status
                </div>

                {FACTS.map((f) => (
                  <div
                    key={f.label}
                    style={{
                      display: "flex",
                      gap: 14,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      lineHeight: 2,
                      padding: "2px 0",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--g3)",
                        minWidth: 96,
                      }}
                    >
                      {f.label}:
                    </span>
                    <span style={{ color: "var(--white)" }}>{f.value}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  background:
                    "linear-gradient(170deg, rgba(0,229,255,0.08) 0%, rgba(0,255,65,0.04) 35%, rgba(0,0,0,0.2) 100%)",
                  padding: 10,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    color: "var(--muted)",
                    marginBottom: 8,
                    letterSpacing: "0.08em",
                  }}
                >
                  geo --country sri-lanka --pins
                </div>

                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 170,
                    border: "1px dashed var(--border2)",
                    borderRadius: 4,
                    background:
                      "radial-gradient(circle at 78% 16%, rgba(0,229,255,0.12), transparent 42%), rgba(2,10,8,0.72)",
                  }}
                >
                  <svg
                    viewBox="0 0 300 500"
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      width: 112,
                      height: 162,
                      transform: "translate(-50%, -50%)",
                    }}
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="slFill" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="rgba(0,255,65,0.46)" />
                        <stop offset="100%" stopColor="rgba(0,136,34,0.30)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M151 24 C183 31 211 52 230 82 C247 109 257 141 260 173 C263 202 258 231 250 259 C243 284 236 310 227 338 C219 363 210 389 195 414 C181 438 165 460 145 474 C126 487 107 485 90 468 C74 452 65 431 58 406 C50 378 44 348 36 320 C29 293 21 267 20 241 C19 212 25 184 35 156 C45 129 58 104 75 80 C94 56 120 36 151 24 Z"
                      fill="url(#slFill)"
                      stroke="rgba(0,255,65,0.82)"
                      strokeWidth="6"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M220 418 C228 424 236 434 233 446 C227 452 216 451 208 443 C207 433 212 424 220 418 Z"
                      fill="rgba(0,255,65,0.34)"
                      stroke="rgba(0,255,65,0.72)"
                      strokeWidth="3"
                    />
                  </svg>

                  <div
                    style={{
                      position: "absolute",
                      top: 6,
                      left: 8,
                      fontFamily: "var(--font-mono)",
                      fontSize: 8,
                      color: "var(--muted)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    INDIAN OCEAN
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      left: `${homePoint.x}%`,
                      top: `${homePoint.y}%`,
                      transform: "translate(-50%, -50%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: "50%",
                        background: "var(--amber)",
                        boxShadow: "0 0 0 3px rgba(255,184,0,0.2), 0 0 14px rgba(255,184,0,0.4)",
                      }}
                    />
                    <span
                      style={{
                        marginTop: 4,
                        fontFamily: "var(--font-mono)",
                        fontSize: 8,
                        color: "var(--amber)",
                        whiteSpace: "nowrap",
                        letterSpacing: "0.05em",
                      }}
                    >
                      KANDY BASE
                    </span>
                  </div>

                  {!isAtHomeBase ? (
                    <div
                      style={{
                        position: "absolute",
                        left: `${currentPoint.x}%`,
                        top: `${currentPoint.y}%`,
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 11,
                          height: 11,
                          borderRadius: "50%",
                          background: "var(--g)",
                          boxShadow: "0 0 0 3px rgba(0,255,65,0.2), 0 0 14px rgba(0,255,65,0.38)",
                        }}
                      />
                      <span
                        style={{
                          marginTop: 4,
                          fontFamily: "var(--font-mono)",
                          fontSize: 8,
                          color: "var(--g)",
                          whiteSpace: "nowrap",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {currentPoint.label.toUpperCase()}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
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
          .facts-wrap { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
