/**
 * Animated wireframe mesh, drawn on a <canvas>.
 *
 * This replaces the old 15 MB background video on the home page. It draws a
 * sheet of triangles whose corners drift slowly, with a soft "light" that makes
 * some corners and their lines glow, then fade.
 *
 * It has no React in it on purpose, so it is easy to test and reuse.
 * Call startMesh(canvas) to begin. It returns a function that stops everything.
 */

export interface MeshOptions {
  /** Rough size of one triangle cell, in CSS pixels. Bigger = fewer lines. */
  cellSize?: number;
  /** How far each corner wanders from its home spot, as a share of cellSize. */
  drift?: number;
  /** Faintest line opacity (0 to 1). */
  minAlpha?: number;
  /** Brightest line opacity (0 to 1). */
  maxAlpha?: number;
  /** Overall speed. 1 is the default pace, 0.5 is half speed. */
  speed?: number;
  /** Frames per second cap. 30 is smooth enough here and easy on batteries. */
  fps?: number;
}

interface Point {
  /** Home position, in cells (not pixels), so resizing keeps the same pattern. */
  gx: number;
  gy: number;
  /** Random values that make each point move and glow on its own schedule. */
  phaseX: number;
  phaseY: number;
  phaseGlow: number;
  rateX: number;
  rateY: number;
  rateGlow: number;
  /** Current position in pixels and current glow (0 to 1), updated every frame. */
  x: number;
  y: number;
  glow: number;
}

/** Small seeded random number generator, so the mesh looks the same on every visit. */
function createRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function startMesh(
  canvas: HTMLCanvasElement,
  options: MeshOptions = {}
): () => void {
  const {
    cellSize = 150,
    drift = 0.22,
    minAlpha = 0.06,
    maxAlpha = 0.6,
    speed = 1,
    fps = 30,
  } = options;

  const maybeCtx = canvas.getContext("2d");
  if (!maybeCtx) return () => {};
  const ctx: CanvasRenderingContext2D = maybeCtx;

  const reduceMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let width = 0;
  let height = 0;
  let cols = 0;
  let rows = 0;
  let stepX = cellSize;
  let stepY = cellSize;
  let points: Point[] = [];
  let edges: [number, number][] = [];
  let lineColor = "#ffffff";
  let frameId = 0;
  let lastFrameTime = 0;
  let running = false;

  /** Build the grid of points and the list of lines between them. */
  function buildMesh() {
    const random = createRandom(7);
    // One extra row and column on every side, so lines run off the edges.
    cols = Math.ceil(width / cellSize) + 3;
    rows = Math.ceil(height / cellSize) + 3;
    stepX = width / (cols - 3);
    stepY = height / (rows - 3);

    points = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        points.push({
          gx: c - 1 + (random() - 0.5) * 0.7,
          gy: r - 1 + (random() - 0.5) * 0.7,
          phaseX: random() * Math.PI * 2,
          phaseY: random() * Math.PI * 2,
          phaseGlow: random() * Math.PI * 2,
          rateX: 0.15 + random() * 0.25,
          rateY: 0.15 + random() * 0.25,
          rateGlow: 0.25 + random() * 0.45,
          x: 0,
          y: 0,
          glow: 0,
        });
      }
    }

    edges = [];
    const index = (c: number, r: number) => r * cols + c;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (c < cols - 1) edges.push([index(c, r), index(c + 1, r)]);
        if (r < rows - 1) edges.push([index(c, r), index(c, r + 1)]);
        // One diagonal per cell turns each square into two triangles.
        // The direction is random so it does not look like a tidy grid.
        if (c < cols - 1 && r < rows - 1) {
          if (random() < 0.5) {
            edges.push([index(c, r), index(c + 1, r + 1)]);
          } else {
            edges.push([index(c + 1, r), index(c, r + 1)]);
          }
        }
      }
    }
  }

  /** Match the canvas to its size on screen, sharp on high-density displays. */
  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    // Cap at 2x. Above that the extra pixels cost a lot and add nothing visible.
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    buildMesh();
    readColor();
    draw(performance.now());
  }

  /** Lines use the canvas's CSS text color, so light and dark themes both work. */
  function readColor() {
    lineColor = getComputedStyle(canvas).color || "#ffffff";
  }

  function draw(now: number) {
    const t = (now / 1000) * speed;
    const wander = cellSize * drift;

    // A slow wave of light that sweeps across the whole sheet.
    const sweepAngle = t * 0.05;
    const sweepX = Math.cos(sweepAngle);
    const sweepY = Math.sin(sweepAngle);

    for (const p of points) {
      p.x = p.gx * stepX + Math.sin(t * p.rateX + p.phaseX) * wander;
      p.y = p.gy * stepY + Math.cos(t * p.rateY + p.phaseY) * wander;

      // Each point twinkles on its own. Raising to a power keeps it dim most
      // of the time with short bright moments.
      const twinkle = Math.pow(
        0.5 + 0.5 * Math.sin(t * p.rateGlow + p.phaseGlow),
        6
      );
      const sweep = Math.pow(
        0.5 +
          0.5 *
            Math.sin((p.gx * sweepX + p.gy * sweepY) * 0.55 - t * 0.35),
        3
      );
      p.glow = Math.min(1, twinkle * 0.75 + sweep * 0.45);
    }

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;
    ctx.lineCap = "round";

    for (const [a, b] of edges) {
      const pa = points[a];
      const pb = points[b];
      const glow = (pa.glow + pb.glow) / 2;
      ctx.globalAlpha = minAlpha + (maxAlpha - minAlpha) * glow;
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function loop(now: number) {
    if (!running) return;
    frameId = requestAnimationFrame(loop);
    if (now - lastFrameTime < 1000 / fps) return;
    lastFrameTime = now;
    draw(now);
  }

  function play() {
    if (running || reduceMotionQuery.matches) return;
    running = true;
    frameId = requestAnimationFrame(loop);
  }

  function pause() {
    running = false;
    cancelAnimationFrame(frameId);
  }

  /** Only animate when someone can actually see it. */
  function updatePlayState() {
    const scrolledPast = window.scrollY > window.innerHeight;
    if (document.hidden || scrolledPast || reduceMotionQuery.matches) {
      pause();
    } else {
      play();
    }
  }

  function handleMotionPreferenceChange() {
    updatePlayState();
    draw(performance.now());
  }

  // Redraw with the new color when the site theme flips between light and dark.
  const themeObserver = new MutationObserver(() => {
    readColor();
    draw(performance.now());
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "data-theme", "style"],
  });

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  document.addEventListener("visibilitychange", updatePlayState);
  window.addEventListener("scroll", updatePlayState, { passive: true });
  reduceMotionQuery.addEventListener("change", handleMotionPreferenceChange);

  resize();
  updatePlayState();

  return () => {
    pause();
    themeObserver.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener("visibilitychange", updatePlayState);
    window.removeEventListener("scroll", updatePlayState);
    reduceMotionQuery.removeEventListener(
      "change",
      handleMotionPreferenceChange
    );
  };
}
