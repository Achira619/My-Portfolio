// components/ui/Terminal.jsx
"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  { delay: 0,    type: "cmd",  prompt: "root@achira-dev:~#", text: "uname -a" },
  { delay: 500,  type: "out",  text: "Linux achira-dev 6.8.0-sre #1 SMP PREEMPT x86_64 GNU/Linux" },
  { delay: 1100, type: "cmd",  prompt: "root@achira-dev:~#", text: "cat /etc/os-release | head -3" },
  { delay: 1700, type: "out",  text: 'NAME="AchiraOS"\nVERSION="1.0 (Stable)"\nID=achira' },
  { delay: 2400, type: "cmd",  prompt: "root@achira-dev:~#", text: "systemctl status motivation" },
  { delay: 3000, type: "svc",  text: "● motivation.service — Achira's Drive\n   Loaded: loaded (/lib/systemd/motivation.service; enabled)\n   Active: \u001b[g]active (running)\u001b[/] since always; 20y 0d uptime" },
  { delay: 3900, type: "cmd",  prompt: "root@achira-dev:~#", text: "cat /proc/skills | grep -E 'docker|linux'" },
  { delay: 4500, type: "out",  text: "docker:    enabled   (65%)\nlinux:     active    (75%)" },
  { delay: 5200, type: "cmd",  prompt: "root@achira-dev:~#", text: "_" },
];

export default function Terminal() {
  const [shown, setShown] = useState(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    LINES.forEach((_, i) => {
      const t = setTimeout(() => {
        setShown(i + 1);
        // auto-scroll
        if (bodyRef.current) {
          bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
      }, LINES[i].delay + 300);
      return () => clearTimeout(t);
    });
  }, []);

  const renderText = (text) =>
    text
      .replace("\u001b[g]", `<span style="color:var(--g)">`)
      .replace("\u001b[/]", "</span>")
      .split("\n")
      .map((l, i) => (
        <span key={i}>
          {i > 0 && <br />}
          <span dangerouslySetInnerHTML={{ __html: l }} />
        </span>
      ));

  return (
    <div className="term-card">
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
          bash — root@achira-dev: ~
        </span>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        className="term-body"
        style={{ maxHeight: 280, overflowY: "auto" }}
      >
        {LINES.slice(0, shown).map((line, i) => (
          <div
            key={i}
            style={{ animation: "term-line 0.25s ease" }}
          >
            {line.type === "cmd" && (
              <div>
                <span style={{ color: "var(--g)" }}>{line.prompt}</span>{" "}
                {line.text === "_" ? (
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 14,
                      background: "var(--g)",
                      animation: "caret-blink 1s step-end infinite",
                      verticalAlign: "middle",
                    }}
                  />
                ) : (
                  <span style={{ color: "var(--white)" }}>{line.text}</span>
                )}
              </div>
            )}

            {line.type === "out" && (
              <div style={{ color: "var(--muted)", paddingLeft: 2 }}>
                {renderText(line.text)}
              </div>
            )}

            {line.type === "svc" && (
              <div style={{ paddingLeft: 2 }}>
                {line.text.split("\n").map((l, j) => (
                  <div
                    key={j}
                    style={{
                      color:
                        j === 0
                          ? "var(--white)"
                          : l.includes("active (running)")
                          ? "var(--g)"
                          : "var(--muted)",
                      paddingLeft: j > 0 ? 3 : 0,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: l.replace(
                        "active (running)",
                        `<span style="color:var(--g);font-weight:700">active (running)</span>`
                      ),
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
