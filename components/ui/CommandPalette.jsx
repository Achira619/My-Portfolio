"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const NAV_COMMANDS = [
  { cmd: "about",         label: "cat about.txt",         hint: "About",          action: { type: "scroll", target: "#about" } },
  { cmd: "education",     label: "cat education.log",     hint: "Education",      action: { type: "scroll", target: "#education" } },
  { cmd: "skills",        label: "htop --skills",         hint: "Skills",         action: { type: "scroll", target: "#skills" } },
  { cmd: "certs",         label: "ls -la certs/",         hint: "Certifications", action: { type: "scroll", target: "#certifications" } },
  { cmd: "projects",      label: "ls -la projects/",      hint: "Projects",       action: { type: "scroll", target: "#projects" } },
  { cmd: "github",        label: "git remote -v",         hint: "GitHub activity",action: { type: "scroll", target: "#github" } },
  { cmd: "goals",         label: "crontab -l",            hint: "Goals",          action: { type: "scroll", target: "#goals" } },
  { cmd: "contact",       label: "sendmail --compose",    hint: "Contact",        action: { type: "scroll", target: "#contact" } },
  { cmd: "top",           label: "cd ~",                  hint: "back to top",    action: { type: "scroll", target: "#top" } },
];

const ACTION_COMMANDS = [
  { cmd: "resume",     label: "curl resume.pdf",            hint: "open resume",        action: { type: "link", target: "/resume.pdf" } },
  { cmd: "github.com", label: "open github.com/Achira619",  hint: "open GitHub profile", action: { type: "link", target: "https://github.com/Achira619" } },
  { cmd: "linkedin",   label: "open linkedin",               hint: "open LinkedIn",       action: { type: "link", target: "http://www.linkedin.com/in/achira-medagedara" } },
  { cmd: "hire",       label: "$ hire --me",                 hint: "go to contact form",  action: { type: "scroll", target: "#contact" } },
];

const FUN_COMMANDS = [
  { cmd: "whoami",  label: "whoami",  hint: "who's running this shell" },
  { cmd: "sudo",    label: "sudo !!", hint: "nice try" },
  { cmd: "clear",   label: "clear",   hint: "clear scrollback" },
  { cmd: "help",    label: "help",    hint: "list all commands" },
];

const ALL_COMMANDS = [...NAV_COMMANDS, ...ACTION_COMMANDS, ...FUN_COMMANDS];

function runOutput(cmd) {
  switch (cmd) {
    case "whoami":
      return "achira-medagedara // SRE & DevOps enthusiast // uid=0(root) gid=0(root)";
    case "sudo":
      return "Permission denied: nice try. This incident will be reported.";
    case "help":
      return "available: " + ALL_COMMANDS.map((c) => c.cmd).join(", ");
    default:
      return null;
  }
}

export default function CommandPalette() {
  const [open, setOpen]     = useState(false);
  const [query, setQuery]   = useState("");
  const [active, setActive] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [history, setHistory] = useState([
    { type: "sys", text: "type a command, or `help` to list all. try `about`, `projects`, `resume`..." },
  ]);
  const inputRef  = useRef(null);
  const scrollRef = useRef(null);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  // First-visit boot alert announcing the terminal-only navigation
  useEffect(() => {
    if (localStorage.getItem("cp-alert-seen")) return;
    const t = setTimeout(() => setShowAlert(true), 900);
    return () => clearTimeout(t);
  }, []);

  const dismissAlert = useCallback(() => {
    setShowAlert(false);
    localStorage.setItem("cp-alert-seen", "1");
  }, []);

  useEffect(() => {
    if (open) dismissAlert();
  }, [open, dismissAlert]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      } else if (e.key === "Escape" && showAlert) {
        dismissAlert();
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpenEvent);
    };
  }, [open, toggle, showAlert, dismissAlert]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history, open]);

  const filtered = query
    ? ALL_COMMANDS.filter(
        (c) =>
          c.cmd.toLowerCase().includes(query.toLowerCase()) ||
          c.label.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const run = (entry, rawInput) => {
    const typed = rawInput ?? entry?.label ?? "";
    setHistory((h) => [...h, { type: "cmd", text: typed }]);

    if (!entry) {
      setHistory((h) => [...h, { type: "err", text: `command not found: ${typed}` }]);
      return;
    }

    if (entry.cmd === "clear") {
      setHistory([]);
      return;
    }

    const out = runOutput(entry.cmd);
    if (out) {
      setHistory((h) => [...h, { type: "out", text: out }]);
      return;
    }

    const { action } = entry;
    if (!action) return;

    if (action.type === "scroll") {
      requestAnimationFrame(() => {
        if (action.target === "#top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          document.querySelector(action.target)?.scrollIntoView({ behavior: "smooth" });
        }
      });
      setHistory((h) => [...h, { type: "out", text: `→ scrolled to ${entry.hint}` }]);
    } else if (action.type === "link") {
      window.open(action.target, "_blank", "noopener,noreferrer");
      setHistory((h) => [...h, { type: "out", text: `→ opened ${action.target}` }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const q = query.trim().toLowerCase();
    const entry =
      (filtered.length && filtered[active]) ||
      ALL_COMMANDS.find((c) => c.cmd === q);
    run(entry, query.trim());
    setQuery("");
    setActive(0);
  };

  return (
    <>
      {/* ── First-visit boot alert ── */}
      {showAlert && (
        <div
          role="alertdialog"
          aria-modal="true"
          onClick={dismissAlert}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 250,
            background: "rgba(2, 4, 2, 0.82)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            animation: "fade-in 0.2s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(420px, 100%)",
              background: "var(--bg2)",
              border: "1px solid var(--red)",
              boxShadow: "0 0 24px rgba(255,68,68,0.25), 0 0 48px rgba(255,68,68,0.1)",
              fontFamily: "var(--font-mono)",
              animation: "slide-up 0.25s ease",
            }}
          >
            {/* Alert title bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 12px",
                borderBottom: "1px solid var(--border)",
                background: "rgba(255,68,68,0.06)",
              }}
            >
              <span
                style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: "var(--red)",
                  boxShadow: "0 0 8px var(--red)",
                  animation: "status-pulse 1.4s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 10.5, color: "var(--red)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                ALERT — sre-portfolio/navigation
              </span>
            </div>

            {/* Alert body */}
            <div style={{ padding: "16px 16px 6px" }}>
              <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 10, letterSpacing: "0.04em" }}>
                severity=P3 status=firing host=achira-dev
              </div>
              <p style={{ fontSize: 12.5, lineHeight: 1.8, color: "var(--red)", margin: 0 }}>
                navbar.service has been decommissioned. all routing now handled by terminal.service.
                <br />
                press <strong>Ctrl/Cmd+K</strong>, or open the <strong>&gt;_ terminal</strong> tab docked on the right edge, to navigate this site.
                <br />
                type <strong>help</strong> once inside to list available commands.
              </p>
            </div>

            {/* Alert actions */}
            <div
              style={{
                display: "flex",
                gap: 8,
                padding: "12px 16px 16px",
              }}
            >
              <button
                onClick={() => { dismissAlert(); setOpen(true); }}
                className="btn btn-green"
                style={{ fontSize: 10.5, padding: "7px 14px" }}
              >
                $ open --terminal
              </button>
              <button
                onClick={dismissAlert}
                className="btn btn-ghost"
                style={{ fontSize: 10.5, padding: "7px 14px" }}
              >
                ack
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Docked toggle tab ── */}
      {!open && (
        <>
          <button
            onClick={toggle}
            title="Open mini terminal (Ctrl/Cmd+K)"
            style={{
              position: "fixed",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 199,
              background: "var(--bg2)",
              border: "1px solid var(--border2)",
              borderRight: "none",
              color: "var(--g)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              padding: "10px 6px",
              cursor: "pointer",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              boxShadow: "var(--glow-sm)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border3)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border2)")}
          >
            &gt;_ terminal
          </button>
        </>
      )}

      {/* ── Docked mini terminal panel ── */}
      {open && (
        <div
          role="complementary"
          aria-label="mini terminal"
          style={{
            position: "fixed",
            right: "clamp(8px, 2vw, 20px)",
            bottom: "clamp(8px, 4vh, 24px)",
            top: "auto",
            zIndex: 199,
            width: "min(320px, 92vw)",
            height: "min(420px, 60vh)",
            display: "flex",
            flexDirection: "column",
            background: "var(--bg2)",
            border: "1px solid var(--border3)",
            boxShadow: "var(--glow-md)",
            fontFamily: "var(--font-mono)",
            animation: "slide-up 0.18s ease",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "7px 10px",
              borderBottom: "1px solid var(--border)",
              fontSize: 10,
              color: "var(--muted)",
              letterSpacing: "0.06em",
              flexShrink: 0,
            }}
          >
            <span>root@achira-dev:~$</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "var(--muted)",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--red)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
              title="close (Esc)"
            >
              ✕
            </button>
          </div>

          {/* Scrollback */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "10px 12px",
              fontSize: 11.5,
              lineHeight: 1.65,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {history.map((line, i) => (
              <div
                key={i}
                style={{
                  color:
                    line.type === "cmd" ? "var(--white)" :
                    line.type === "err" ? "var(--red)" :
                    line.type === "sys" ? "var(--muted)" :
                    "var(--cyan)",
                  wordBreak: "break-word",
                }}
              >
                {line.type === "cmd" ? (
                  <>
                    <span style={{ color: "var(--g)" }}>$</span> {line.text}
                  </>
                ) : (
                  line.text
                )}
              </div>
            ))}
          </div>

          {/* Suggestions */}
          {filtered.length > 0 && (
            <div
              style={{
                maxHeight: 120,
                overflowY: "auto",
                borderTop: "1px solid var(--border)",
                flexShrink: 0,
              }}
            >
              {filtered.map((c, i) => (
                <button
                  key={c.cmd}
                  onClick={() => { run(c, c.label); setQuery(""); setActive(0); }}
                  onMouseEnter={() => setActive(i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    padding: "6px 10px",
                    background: i === active ? "var(--surface2)" : "transparent",
                    borderLeft: i === active ? "2px solid var(--g)" : "2px solid transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: 10.5, color: i === active ? "var(--g)" : "var(--white)" }}>
                    {c.label}
                  </span>
                  <span style={{ fontSize: 9, color: "var(--muted)", whiteSpace: "nowrap" }}>
                    {c.hint}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Input line */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 10px",
              borderTop: "1px solid var(--border)",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "var(--g)", fontSize: 12 }}>$</span>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActive(0); }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((a) => Math.min(a + 1, Math.max(filtered.length - 1, 0)));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((a) => Math.max(a - 1, 0));
                }
              }}
              placeholder="type a command..."
              spellCheck={false}
              autoComplete="off"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--white)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                minWidth: 0,
              }}
            />
          </form>
        </div>
      )}
    </>
  );
}
