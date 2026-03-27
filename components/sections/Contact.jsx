"use client";

import { useState } from "react";
import useIntersection from "@/hooks/useIntersection";
import SectionLabel from "@/components/ui/SectionLabel";

const CONTACT_LINKS = [
  {
    icon: "✉",
    label: "Email",
    display: "achira.medagedara@gmail.com",
    href: "mailto:achira.medagedara@gmail.com",
    cmd: "mail -s 'Opportunity'",
  },
  {
    icon: "⊙",
    label: "GitHub",
    display: "github.com/achira-medagedara",
    href: "https://github.com",
    cmd: "git clone",
  },
  {
    icon: "in",
    label: "LinkedIn",
    display: "linkedin.com/in/achira-medagedara",
    href: "https://linkedin.com",
    cmd: "curl -L",
  },
];

export default function Contact() {
  const [ref, visible] = useIntersection(0.15);

  const [form, setForm]   = useState({ name: "", email: "", message: "" });
  const [sent, setSent]   = useState(false);
  const [loading, setLoad] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 1200);
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{ padding: "110px clamp(16px,6vw,80px)" }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 72,
          }}
          className="contact-grid"
        >
          {/* ── Left ── */}
          <div className={`appear ${visible ? "visible" : ""}`}>
            <SectionLabel>// Contact</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-disp)",
                fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginBottom: 20,
              }}
            >
              Let&apos;s Build
              <br />
              <span style={{ color: "var(--g)" }}>Something</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--muted)",
                lineHeight: 1.9,
                marginBottom: 36,
              }}
            >
              I&apos;m actively looking for SRE, DevOps, and Cloud internship
              opportunities. If you&apos;re building systems that need to scale and
              stay reliable — let&apos;s talk.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CONTACT_LINKS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "15px 18px",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      width: 34, height: 34,
                      border: "1px solid var(--border2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--g)",
                      borderRadius: 2,
                      fontSize: 13,
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        color: "var(--muted)",
                        letterSpacing: "0.1em",
                        marginBottom: 2,
                      }}
                    >
                      {c.cmd}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--white)",
                      }}
                    >
                      {c.display}
                    </div>
                  </div>
                  <span
                    style={{
                      color: "var(--muted)",
                      marginLeft: "auto",
                      fontSize: 12,
                    }}
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: form ── */}
          <div
            className={`appear ${visible ? "visible" : ""}`}
            style={{ transitionDelay: "0.2s" }}
          >
            <div
              className="term-card"
              style={{ padding: 0, overflow: "hidden" }}
            >
              {/* Title bar */}
              <div className="term-titlebar">
                <div className="term-dot" style={{ background: "#ff5f57" }} />
                <div className="term-dot" style={{ background: "#febc2e" }} />
                <div className="term-dot" style={{ background: "#28c840" }} />
                <span
                  style={{
                    marginLeft: 10,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--muted)",
                  }}
                >
                  sendmail — compose
                </span>
              </div>

              <form onSubmit={handleSubmit} style={{ padding: "28px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--g)",
                    letterSpacing: "0.08em",
                    marginBottom: 22,
                  }}
                >
                  <span style={{ color: "var(--g3)" }}>root@achira-dev:~#</span>
                  {" "}compose --new-message
                </div>

                {[
                  { name: "name",    label: "From (Name)",  type: "text",  placeholder: "Your name"        },
                  { name: "email",   label: "Reply-To",     type: "email", placeholder: "your@email.com"   },
                ].map((field) => (
                  <div key={field.name} style={{ marginBottom: 16 }}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        letterSpacing: "0.12em",
                        color: "var(--muted)",
                        marginBottom: 6,
                        textTransform: "uppercase",
                      }}
                    >
                      {field.label}:
                    </label>
                    <input
                      className="form-input"
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                    />
                  </div>
                ))}

                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      letterSpacing: "0.12em",
                      color: "var(--muted)",
                      marginBottom: 6,
                      textTransform: "uppercase",
                    }}
                  >
                    Subject / Message:
                  </label>
                  <textarea
                    className="form-input"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the opportunity..."
                    required
                    style={{ resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  className={`btn ${sent ? "btn-ghost" : "btn-green"}`}
                  style={{ width: "100%", justifyContent: "center" }}
                  disabled={loading}
                >
                  {loading
                    ? "sending..."
                    : sent
                    ? "✓ Message Sent!"
                    : "sendmail --send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
