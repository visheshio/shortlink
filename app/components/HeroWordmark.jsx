"use client";

import { useEffect, useState } from "react";
import TechText from "./TechText";

/*
 * TechText paints straight onto a 2D canvas, so CSS custom properties are
 * useless as colours — canvas never resolves var(). Read the palette off the
 * root element once on mount, and again whenever the colour scheme flips, so
 * the wordmark tracks --shell-ink / --brass in both light and dark.
 */
const FALLBACK = { color: "#16181c", accentColor: "#b8862b" };

const readPalette = () => {
  if (typeof window === "undefined") return FALLBACK;
  const styles = getComputedStyle(document.documentElement);
  const pick = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;
  return {
    color: pick("--shell-ink", FALLBACK.color),
    accentColor: pick("--brass", FALLBACK.accentColor)
  };
};

const HeroWordmark = () => {
  const [palette, setPalette] = useState(FALLBACK);

  useEffect(() => {
    setPalette(readPalette());

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setPalette(readPalette());
    media.addEventListener?.("change", onChange);

    return () => media.removeEventListener?.("change", onChange);
  }, []);

  return (
    <div className="relative h-[220px] w-full sm:h-[320px] lg:h-[420px]">
      <TechText
        text="ShortLink"
        color={palette.color}
        accentColor={palette.accentColor}
        fontWeight={600}
        fontSize={120}
        letterSpacing={-0.04}
        reveal="letter"
        reach={180}
        dashLength={4}
        dashGap={2}
        strokeWidth={1.5}
        specks={15}
        speed={0.8}
      />
    </div>
  );
};

export default HeroWordmark;