/**
 * Animated grid with pulses of light, drawn on a <canvas>.
 *
 * A faint square grid fills the screen. Small pulses of light travel along the
 * grid lines, each with a fading tail behind it. At a crossing a pulse usually
 * keeps going straight and sometimes turns. After a while it fades out and a
 * new one starts somewhere else.
 *
 * It has no React in it on purpose, so it is easy to test and reuse.
 * Call startGrid(canvas) to begin. It returns a function that stops everything.
 *
 * Colors come from CSS, so light and dark themes both work:
 * - grid lines use the canvas's text color
 * - pulses use the --accent color (falls back to the text color)
 */

export interface GridOptions {
  /** Size of one grid square, in CSS pixels. */
  cellSize?: number;
  /** Opacity of the grid lines (0 to 1). */
  lineAlpha?: number;
  /** How many pulses per million square pixels of screen. More = busier. */
  density?: number;
  /** Pulse speed, in grid squares per second. */
  speed?: number;
  /** Length of the fading tail, in grid squares. */
  tailLength?: number;
  /** Chance (0 to 1) that a pulse turns when it reaches a crossing. */
  turnChance?: number;
}

/** The four directions a pulse can travel: right, down, left, up. */
const DIRECTIONS: readonly [number, number][] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

interface Pulse {
  /** Crossing the pulse last left, in grid squares. */
  col: number;
  row: number;
  /** Index into DIRECTIONS. */
  direction: number;
  /** How far it is along the current square's edge, 0 to 1. */
  progress: number;
  /** Its own speed, in squares per second. */
  speed: number;
  /** Squares left to travel before it starts fading out. */
  stepsLeft: number;
  /** Overall brightness, 0 to 1. Fades in at the start and out at the end. */
  life: number;
  /** Seconds to wait before this pulse appears (staggers the restarts). */
  delay: number;
  /** Points it has passed through, newest first, in pixels. Used for the tail. */
  trail: { x: number; y: number }[];
}

export function startGrid(
  canvas: HTMLCanvasElement,
  options: GridOptions = {}
): () => void {
  const {
    cellSize = 72,
    lineAlpha = 0.09,
    density = 14,
    speed = 4,
    tailLength = 4,
    turnChance = 0.3,
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
  /** Shift that centers the grid, so the edges look the same on both sides. */
  let offsetX = 0;
  let offsetY = 0;
  let pulses: Pulse[] = [];
  let lineColor = "#ffffff";
  let pulseColor = "#ffffff";
  let frameId = 0;
  let lastFrameTime = 0;
  let running = false;

  const toX = (col: number) => offsetX + col * cellSize;
  const toY = (row: number) => offsetY + row * cellSize;

  /** Put a pulse at a random crossing, heading in a random direction. */
  function resetPulse(pulse: Pulse, delay: number) {
    pulse.col = Math.floor(Math.random() * (cols + 1));
    pulse.row = Math.floor(Math.random() * (rows + 1));
    pulse.direction = Math.floor(Math.random() * 4);
    pulse.progress = 0;
    pulse.speed = speed * (0.7 + Math.random() * 0.6);
    pulse.stepsLeft = 8 + Math.floor(Math.random() * 16);
    pulse.life = 0;
    pulse.delay = delay;
    pulse.trail = [];
  }

  function buildPulses() {
    const count = Math.max(
      4,
      Math.min(28, Math.round(((width * height) / 1_000_000) * density))
    );
    pulses = [];
    for (let i = 0; i < count; i++) {
      const pulse = {} as Pulse;
      // Spread the first appearances over a few seconds.
      resetPulse(pulse, Math.random() * 3);
      pulses.push(pulse);
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

    cols = Math.ceil(width / cellSize) + 1;
    rows = Math.ceil(height / cellSize) + 1;
    offsetX = (width - cols * cellSize) / 2;
    offsetY = (height - rows * cellSize) / 2;

    buildPulses();
    readColors();
    draw();
  }

  function readColors() {
    const styles = getComputedStyle(canvas);
    lineColor = styles.color || "#ffffff";
    pulseColor = styles.getPropertyValue("--accent").trim() || lineColor;
  }

  /** Move every pulse forward by dt seconds. */
  function update(dt: number) {
    for (const pulse of pulses) {
      if (pulse.delay > 0) {
        pulse.delay -= dt;
        continue;
      }

      // Fade in while it still has distance to cover, fade out once it is done.
      if (pulse.stepsLeft > 0) {
        pulse.life = Math.min(1, pulse.life + dt * 2);
      } else {
        pulse.life -= dt * 1.2;
        if (pulse.life <= 0) {
          resetPulse(pulse, 0.5 + Math.random() * 2.5);
          continue;
        }
      }

      pulse.progress += pulse.speed * dt;

      // Each time it reaches the next crossing, pick where to go next.
      while (pulse.progress >= 1) {
        pulse.progress -= 1;
        const [dx, dy] = DIRECTIONS[pulse.direction];
        pulse.col += dx;
        pulse.row += dy;
        pulse.stepsLeft -= 1;
        pulse.trail.unshift({ x: toX(pulse.col), y: toY(pulse.row) });
        if (pulse.trail.length > tailLength + 2) pulse.trail.pop();

        if (Math.random() < turnChance) {
          const turn = Math.random() < 0.5 ? 1 : 3; // right or left
          pulse.direction = (pulse.direction + turn) % 4;
        }

        // If it has run off the screen, let it fade out.
        const offScreen =
          pulse.col < -1 ||
          pulse.col > cols + 1 ||
          pulse.row < -1 ||
          pulse.row > rows + 1;
        if (offScreen) pulse.stepsLeft = 0;
      }
    }
  }

  function drawGridLines() {
    ctx.strokeStyle = lineColor;
    ctx.globalAlpha = lineAlpha;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let c = 0; c <= cols; c++) {
      // The half pixel keeps 1px lines crisp instead of blurry.
      const x = Math.round(toX(c)) + 0.5;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let r = 0; r <= rows; r++) {
      const y = Math.round(toY(r)) + 0.5;
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }

  function drawPulse(pulse: Pulse) {
    if (pulse.delay > 0 || pulse.life <= 0) return;

    const [dx, dy] = DIRECTIONS[pulse.direction];
    const headX = toX(pulse.col + dx * pulse.progress);
    const headY = toY(pulse.row + dy * pulse.progress);

    // The tail is the path from the head back through the crossings it passed.
    // It is drawn in short pieces, each a little fainter than the one before.
    const tailPixels = tailLength * cellSize;
    const pieceLength = 6;
    let travelled = 0;
    let fromX = headX;
    let fromY = headY;

    ctx.strokeStyle = pulseColor;
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";

    for (const point of pulse.trail) {
      const segmentLength = Math.hypot(point.x - fromX, point.y - fromY);
      const pieces = Math.max(1, Math.ceil(segmentLength / pieceLength));
      for (let i = 0; i < pieces; i++) {
        const start = i / pieces;
        const end = (i + 1) / pieces;
        const distance = travelled + segmentLength * start;
        if (distance >= tailPixels) break;
        const fade = 1 - distance / tailPixels;
        ctx.globalAlpha = fade * fade * pulse.life * 0.9;
        ctx.beginPath();
        ctx.moveTo(
          fromX + (point.x - fromX) * start,
          fromY + (point.y - fromY) * start
        );
        ctx.lineTo(
          fromX + (point.x - fromX) * end,
          fromY + (point.y - fromY) * end
        );
        ctx.stroke();
      }
      travelled += segmentLength;
      if (travelled >= tailPixels) break;
      fromX = point.x;
      fromY = point.y;
    }

    // The head: a soft glow with a bright dot in the middle.
    ctx.fillStyle = pulseColor;
    ctx.globalAlpha = 0.12 * pulse.life;
    ctx.beginPath();
    ctx.arc(headX, headY, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.25 * pulse.life;
    ctx.beginPath();
    ctx.arc(headX, headY, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = pulse.life;
    ctx.beginPath();
    ctx.arc(headX, headY, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    drawGridLines();
    // With reduced motion on, show the still grid and no moving lights.
    if (!reduceMotionQuery.matches) {
      for (const pulse of pulses) drawPulse(pulse);
    }
    ctx.globalAlpha = 1;
  }

  function loop(now: number) {
    if (!running) return;
    frameId = requestAnimationFrame(loop);
    // Cap the time step, so pulses do not jump after the tab was in the background.
    const dt = Math.min(0.05, (now - lastFrameTime) / 1000);
    lastFrameTime = now;
    update(dt);
    draw();
  }

  function play() {
    if (running || reduceMotionQuery.matches) return;
    running = true;
    lastFrameTime = performance.now();
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
    draw();
  }

  // Redraw with the new colors when the site theme flips between light and dark.
  const themeObserver = new MutationObserver(() => {
    readColors();
    draw();
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
