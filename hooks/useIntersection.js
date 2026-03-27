// hooks/useIntersection.js
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, isVisible].
 * Once visible it stays visible (one-shot).
 */
export default function useIntersection(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
