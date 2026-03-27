"use client";

import { useRef, useState } from "react";
import useIntersection from "@/hooks/useIntersection";
import SectionLabel from "@/components/ui/SectionLabel";

const CONTACT_LINKS = [
  {
    icon: "✉",
    label: "Email",
    display: "achiramedagedara0@gmail.com",
    href: "mailto:achiramedagedara0@gmail.com",
    cmd: "mail -s 'Opportunity'",
  },
  {
    icon: "⊙",
    label: "GitHub",
    display: "github.com/Achira619",
    href: "https://github.com/Achira619",
    cmd: "git clone",
  },
  {
    icon: "in",
    label: "LinkedIn",
    display: "linkedin.com/in/achira-medagedara",
    href: "http://www.linkedin.com/in/achira-medagedara",
    cmd: "curl -L",
  },
];

export default function Contact() {
  const [ref, visible] = useIntersection(0.15);
  const inputRefs = useRef({});

  const [form, setForm]   = useState({ name: "", email: "", message: "" });
  const [sent, setSent]   = useState(false);
  const [loading, setLoad] = useState(false);
  const [sendError, setSendError] = useState("");
  const [activeField, setActiveField] = useState("name");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendError("");
    setLoad(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload?.error || "Failed to send message");
      }

      setLoad(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setActiveField("name");
      moveToField("name");
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      setLoad(false);
      setSendError(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  const moveToField = (field) => {
    setActiveField(field);
    const next = inputRefs.current[field];
    if (next) next.focus();
  };

  const handleFieldEnter = (e, field) => {
    if (e.key !== "Enter") return;
    if (field === "name") {
      e.preventDefault();
      moveToField("email");
    }
    if (field === "email") {
      e.preventDefault();
      moveToField("message");
    }
  };

  const handleMessageKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
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
            <SectionLabel>{"// Contact"}</SectionLabel>
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

              <form onSubmit={handleSubmit} style={{ padding: "24px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--g)",
                    letterSpacing: "0.06em",
                    marginBottom: 18,
                  }}
                >
                  <span style={{ color: "var(--g3)" }}>visitor@portfolio:~$</span>
                  {" "}contact --interactive
                </div>

                <div
                  style={{
                    background: "rgba(0,255,65,0.03)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    padding: "12px 12px 8px",
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--muted)",
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ color: "var(--g3)" }}>$</span>
                    {` set sender.name "${form.name || "..."}"`}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--muted)",
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ color: "var(--g3)" }}>$</span>
                    {` set sender.email "${form.email || "..."}"`}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--muted)",
                    }}
                  >
                    <span style={{ color: "var(--g3)" }}>$</span> write message --chars={form.message.length}
                  </div>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: activeField === "name" ? "var(--g)" : "var(--muted)",
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ color: "var(--g3)" }}>name@prompt:~$</span> whoami --set
                  </div>
                  <input
                    ref={(el) => (inputRefs.current.name = el)}
                    className="form-input"
                    type="text"
                    name="name"
                    value={form.name}
                    onFocus={() => setActiveField("name")}
                    onChange={handleChange}
                    onKeyDown={(e) => handleFieldEnter(e, "name")}
                    placeholder="Your name"
                    required
                    style={{ borderStyle: "dashed" }}
                  />
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: activeField === "email" ? "var(--g)" : "var(--muted)",
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ color: "var(--g3)" }}>mail@prompt:~$</span> configure reply-to
                  </div>
                  <input
                    ref={(el) => (inputRefs.current.email = el)}
                    className="form-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onFocus={() => setActiveField("email")}
                    onChange={handleChange}
                    onKeyDown={(e) => handleFieldEnter(e, "email")}
                    placeholder="your@email.com"
                    required
                    style={{ borderStyle: "dashed" }}
                  />
                </div>

                <div style={{ marginBottom: 18 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: activeField === "message" ? "var(--g)" : "var(--muted)",
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ color: "var(--g3)" }}>msg@prompt:~$</span> nano /tmp/opportunity.txt
                  </div>
                  <textarea
                    ref={(el) => (inputRefs.current.message = el)}
                    className="form-input"
                    name="message"
                    rows={5}
                    value={form.message}
                    onFocus={() => setActiveField("message")}
                    onChange={handleChange}
                    onKeyDown={handleMessageKeyDown}
                    placeholder="Tell me about the opportunity..."
                    required
                    style={{ resize: "vertical", borderStyle: "dashed" }}
                  />
                  <div
                    style={{
                      marginTop: 8,
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--muted)",
                    }}
                  >
                    Tip: Press Enter to jump from name to email. Use Ctrl/Cmd + Enter here to submit.
                  </div>
                </div>

                <button
                  type="submit"
                  className={`btn ${sent ? "btn-ghost" : "btn-green"}`}
                  style={{ width: "100%", justifyContent: "center" }}
                  disabled={loading}
                >
                  {loading
                    ? "transmitting..."
                    : sent
                    ? "✓ Packet delivered"
                    : "sendmail --send --priority=high"}
                </button>

                {sendError ? (
                  <div
                    style={{
                      marginTop: 10,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "#ff6b6b",
                    }}
                  >
                    transmit: failed — {sendError}
                  </div>
                ) : null}
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
