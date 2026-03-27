// hooks/useTyping.js
"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through an array of strings with typing + deleting animation.
 * @param {string[]} phrases
 * @param {{ typeSpeed?: number, deleteSpeed?: number, pause?: number }} opts
 */
export default function useTyping(
  phrases,
  { typeSpeed = 65, deleteSpeed = 40, pause = 1800 } = {}
) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let ti = 0;    // phrase index
    let ci = 0;    // char index
    let deleting = false;
    let timeout;

    function tick() {
      const current = phrases[ti];

      if (!deleting) {
        ci++;
        setDisplayed(current.slice(0, ci));
        if (ci === current.length) {
          deleting = true;
          timeout = setTimeout(tick, pause);
          return;
        }
      } else {
        ci--;
        setDisplayed(current.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          ti = (ti + 1) % phrases.length;
        }
      }

      timeout = setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
    }

    timeout = setTimeout(tick, 800);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return displayed;
}
