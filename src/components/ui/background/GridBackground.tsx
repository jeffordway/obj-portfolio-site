"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { startGrid, type GridOptions } from "@/lib/gridAnimation";

export interface GridBackgroundProps extends GridOptions {
  /** Additional classes for the canvas. Set a text color class to change the grid line color. */
  className?: string;
}

/** Fades the grid out toward the edges of the screen. */
const edgeFade =
  "radial-gradient(ellipse at center, #000 55%, transparent 100%)";

/**
 * GridBackground
 *
 * A full-size grid with pulses of light travelling along its lines, drawn in
 * code. It is decoration only, so it is hidden from screen readers. It pauses
 * when the tab is hidden or the visitor scrolls past it, and shows a still grid
 * for people who ask for less motion.
 */
export function GridBackground({ className, ...options }: GridBackgroundProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Keep the options in a ref so a re-render does not restart the animation.
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    return startGrid(canvasRef.current, optionsRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none block h-full w-full text-foreground",
        className
      )}
      style={{ maskImage: edgeFade, WebkitMaskImage: edgeFade }}
    />
  );
}

GridBackground.displayName = "GridBackground";
