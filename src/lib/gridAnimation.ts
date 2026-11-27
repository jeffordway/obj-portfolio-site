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
 * The color comes from CSS: the grid and the pulses both use the canvas's text
 * color. So on a dark theme the light is white, and on a light theme it is dark.
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
  /** Length of the fading tail behind a pulse, in grid squares. */
  tailLength?: number;
  /** How far the glow reaches out in front of a pulse, in grid squares. */
  leadLength?: number;
  /** Size of the soft glow around the head of a pulse, in CSS pixels. */
  glowRadius?: number;
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

/**
 * A blurred line is faked by drawing it several times: [width in px, strength].
 * Wide and faint first, thin and bright last.
 */
const GLOW_LAYERS: readonly [number, number][] = [
  [9, 0.07],
  [5, 0.16],
  [2.5, 0.35],
  [1.2, 0.9],
];

interface Pulse {
  /** Crossing the pulse last left, in grid squares. */
  col: number;
  row: number;
  /** Index into DIRECTIONS. */
  direction: number;
  /** The direction it will take at the next crossing, chosen ahead of time
   *  so the glow in front can bend around the corner with it. */
  nextDirection: number;
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
    speed = 2.2,
    tailLength = 5,
    leadLength = 1.2,
    glowRadius = 26,
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
  /** A small pre-drawn picture of the soft glow, stamped at each pulse's head. */
  let glowSprite: HTMLCanvasElement | null = null;
  let frameId = 0;
  let lastFrameTime = 0;
  let running = false;

  const toX = (col: number) => offsetX + col * cellSize;
  const toY = (row: number) => offsetY + row * cellSize;

  /** Usually straight on, sometimes a left or right turn. */
  function pickNextDirection(direction: number) {
    if (Math.random() >= turnChance) return direction;
    const turn = Math.random() < 0.5 ? 1 : 3; // right or left
    return (direction + turn) % 4;
  }

  /** Put a pulse at a random crossing, heading in a random direction. */
  function resetPulse(pulse: Pulse, delay: number) {
    pulse.col = Math.floor(Math.random() * (cols + 1));
    pulse.row = Math.floor(Math.random() * (rows + 1));
    pulse.direction = Math.floor(Math.random() * 4);
    pulse.nextDirection = pickNextDirection(pulse.direction);
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
    lineColor = getComputedStyle(canvas).color || "#ffffff";
    buildGlowSprite();
  }

  /**
   * Draw the soft round glow once, in the current color, onto a tiny hidden
   * canvas. Stamping that picture each frame is much cheaper than blurring live.
   */
  function buildGlowSprite() {
    const size = Math.ceil(glowRadius * 2);
    const sprite = document.createElement("canvas");
    sprite.width = size * 2; // 2x so it stays smooth on sharp screens
    sprite.height = size * 2;
    const spriteCtx = sprite.getContext("2d");
    if (!spriteCtx) return;
    spriteCtx.scale(2, 2);

    // First paint the shape of the glow: solid in the middle, fading to nothing.
    const gradient = spriteCtx.createRadialGradient(
      glowRadius, glowRadius, 0,
      glowRadius, glowRadius, glowRadius
    );
    gradient.addColorStop(0, "rgba(0,0,0,1)");
    gradient.addColorStop(0.08, "rgba(0,0,0,0.85)");
    gradient.addColorStop(0.25, "rgba(0,0,0,0.32)");
    gradient.addColorStop(0.55, "rgba(0,0,0,0.09)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    spriteCtx.fillStyle = gradient;
    spriteCtx.fillRect(0, 0, size, size);

    // Then tint that shape with the theme color.
    spriteCtx.globalCompositeOperation = "source-in";
    spriteCtx.fillStyle = lineColor;
    spriteCtx.fillRect(0, 0, size, size);
    glowSprite = sprite;
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

        pulse.direction = pulse.nextDirection;
        pulse.nextDirection = pickNextDirection(pulse.direction);

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

  /**
   * Draw one stretch of light along a path of points, brightest at the start
   * and fading to nothing over maxPixels. Each piece is drawn three times, wide
   * and faint, then narrower and brighter, which reads as a soft blurred line.
   */
  function drawFadingPath(
    startX: number,
    startY: number,
    path: { x: number; y: number }[],
    maxPixels: number,
    brightness: number
  ) {
    const pieceLength = 6;
    let travelled = 0;
    let fromX = startX;
    let fromY = startY;

    for (const point of path) {
      const segmentLength = Math.hypot(point.x - fromX, point.y - fromY);
      if (segmentLength > 0) {
        const pieces = Math.max(1, Math.ceil(segmentLength / pieceLength));
        for (let i = 0; i < pieces; i++) {
          const start = i / pieces;
          const end = (i + 1) / pieces;
          const distance = travelled + segmentLength * start;
          if (distance >= maxPixels) break;
          const fade = 1 - distance / maxPixels;
          const alpha = fade * fade * brightness;
          const x1 = fromX + (point.x - fromX) * start;
          const y1 = fromY + (point.y - fromY) * start;
          const x2 = fromX + (point.x - fromX) * end;
          const y2 = fromY + (point.y - fromY) * end;

          for (const [lineWidth, strength] of GLOW_LAYERS) {
            ctx.lineWidth = lineWidth;
            ctx.globalAlpha = alpha * strength;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }
      travelled += segmentLength;
      if (travelled >= maxPixels) break;
      fromX = point.x;
      fromY = point.y;
    }
  }

  function drawPulse(pulse: Pulse) {
    if (pulse.delay > 0 || pulse.life <= 0) return;

    const [dx, dy] = DIRECTIONS[pulse.direction];
    const headX = toX(pulse.col + dx * pulse.progress);
    const headY = toY(pulse.row + dy * pulse.progress);

    ctx.strokeStyle = lineColor;
    ctx.lineCap = "butt";

    // The tail: back from the head through the crossings it has passed.
    drawFadingPath(
      headX,
      headY,
      pulse.trail,
      tailLength * cellSize,
      pulse.life * 0.8
    );

    // The lead: a shorter glow reaching ahead, following the turn it is about
    // to make at the next crossing.
    const nextCol = pulse.col + dx;
    const nextRow = pulse.row + dy;
    const [ndx, ndy] = DIRECTIONS[pulse.nextDirection];
    const reach = Math.ceil(leadLength) + 1;
    drawFadingPath(
      headX,
      headY,
      [
        { x: toX(nextCol), y: toY(nextRow) },
        { x: toX(nextCol + ndx * reach), y: toY(nextRow + ndy * reach) },
      ],
      leadLength * cellSize,
      pulse.life * 0.8
    );

    // The head: a soft, diffuse point of light.
    if (glowSprite) {
      ctx.globalAlpha = pulse.life;
      ctx.drawImage(
        glowSprite,
        headX - glowRadius,
        headY - glowRadius,
        glowRadius * 2,
        glowRadius * 2
      );
    }
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
