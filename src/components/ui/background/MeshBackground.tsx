"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { startMesh, type MeshOptions } from "@/lib/meshAnimation";

export interface MeshBackgroundProps extends MeshOptions {
  /** Additional classes for the canvas. Set a text color class to change the line color. */
  className?: string;
}

/**
 * MeshBackground
 *
 * A full-size animated wireframe mesh drawn in code. It is decoration only,
 * so it is hidden from screen readers. It pauses when the tab is hidden or the
 * visitor scrolls past it, and stays still for people who ask for less motion.
 */
export function MeshBackground({ className, ...options }: MeshBackgroundProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Keep the options in a ref so a re-render does not restart the animation.
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    return startMesh(canvasRef.current, optionsRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none block h-full w-full text-foreground",
        className
      )}
    />
  );
}

MeshBackground.displayName = "MeshBackground";
