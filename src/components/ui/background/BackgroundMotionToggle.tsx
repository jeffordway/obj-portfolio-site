"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { RiPauseFill, RiPlayFill } from "@remixicon/react";

/** Name of the browser event that tells background animations to pause or play. */
export const BACKGROUND_MOTION_EVENT = "background-motion";

/**
 * BackgroundMotionToggle
 *
 * A small pause/play button for the moving hero background (the coded
 * animation or the background video). Accessibility guidelines ask that
 * visitors can pause any motion that keeps running (WCAG 2.2.2).
 *
 * - It starts paused for visitors whose device asks for reduced motion.
 * - It fades away once the visitor scrolls past the hero.
 */
export function BackgroundMotionToggle({ className }: { className?: string }) {
  const [paused, setPaused] = React.useState(false);
  const [pastHero, setPastHero] = React.useState(false);

  /** Apply a paused/playing state to every background video and animation. */
  const apply = React.useCallback((nextPaused: boolean) => {
    document
      .querySelectorAll<HTMLVideoElement>("video[data-background-video]")
      .forEach((video) => {
        if (nextPaused) {
          video.pause();
        } else {
          // play() can be refused by the browser. That is fine to ignore.
          video.play().catch(() => {});
        }
      });
    window.dispatchEvent(
      new CustomEvent(BACKGROUND_MOTION_EVENT, {
        detail: { paused: nextPaused },
      })
    );
  }, []);

  // Start paused if the visitor's device asks for reduced motion.
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPaused(true);
      apply(true);
    }
  }, [apply]);

  // Hide the button once the hero has scrolled out of view.
  React.useEffect(() => {
    const handleScroll = () =>
      setPastHero(window.scrollY > window.innerHeight * 0.6);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = () => {
    const nextPaused = !paused;
    setPaused(nextPaused);
    apply(nextPaused);
  };

  const label = paused
    ? "Play background animation"
    : "Pause background animation";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={paused}
      title={label}
      tabIndex={pastHero ? -1 : 0}
      className={cn(
        // Positioning (mirrors the theme button, on the opposite corner)
        "fixed bottom-6 left-6 z-40",
        // Appearance
        "flex items-center justify-center",
        "w-12 h-12 rounded-full",
        "bg-background/80 backdrop-blur-sm",
        "shadow-lg ring-1 ring-foreground/10",
        // Interaction
        "transition-all duration-300 ease-in-out",
        "hover:ring-foreground/20 hover:scale-110",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        pastHero && "pointer-events-none opacity-0",
        className
      )}
    >
      {paused ? (
        <RiPlayFill className="h-6 w-6 text-foreground" aria-hidden="true" />
      ) : (
        <RiPauseFill className="h-6 w-6 text-foreground" aria-hidden="true" />
      )}
    </button>
  );
}

BackgroundMotionToggle.displayName = "BackgroundMotionToggle";
