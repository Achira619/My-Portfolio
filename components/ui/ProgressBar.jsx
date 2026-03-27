// components/ui/ProgressBar.jsx
"use client";

import { useEffect, useState } from "react";

export default function ProgressBar({ name, level, color, pkg, animate }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setWidth(level), 120);
      return () => clearTimeout(t);
    }
  }, [animate, level]);

  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 5,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--white)",
            }}
          >
            {name}
          </span>
          {pkg && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--muted)",
              }}
            >
              [{pkg}]
            </span>
          )}
        </div>
        {/* <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: color,
          }}
        >
          {level}%
        </span> */}
      </div>

      {/* htop-style bar */}
      {/* <div
        style={{
          height: 6,
          background: "rgba(0,255,65,0.07)",
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid rgba(0,255,65,0.08)",
        }}
      >
        <div
          className="prog-fill"
          style={{
            width: `${width}%`,
            background: color,
            boxShadow: `0 0 6px ${color}`,
            transition: "width 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div> */}
    </div>
  );
}
