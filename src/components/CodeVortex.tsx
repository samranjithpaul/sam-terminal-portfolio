import { useEffect, useRef } from 'react';

const turn = Math.PI * 2;
const ringCount = 68;

// Rasterize the binary rings once so each animation frame only composites images.
function createRing(variant: number) {
  const image = document.createElement('canvas');
  image.width = image.height = 768;
  const context = image.getContext('2d');
  if (!context) return image;

  const center = image.width / 2;
  const marks = 212 + variant * 4;
  context.font = 'bold 9px monospace';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  for (let mark = 0; mark < marks; mark++) {
    if ((mark * 3 + variant * 11) % 43 < 2) continue;
    const angle = mark / marks * turn;
    const arc = (1 + Math.cos(3 * angle + variant * 1.7)) / 2;
    const crest = arc ** 5;
    const radius = 354 + 5 * Math.sin(angle * 4 + variant);
    context.setTransform(
      -Math.sin(angle), Math.cos(angle), -Math.cos(angle), -Math.sin(angle),
      center + Math.cos(angle) * radius, center + Math.sin(angle) * radius,
    );
    context.shadowColor = '#11f575';
    context.shadowBlur = crest * 10;
    context.fillStyle = `rgba(79, 255, 139, ${0.16 + 0.32 * arc + 0.52 * crest})`;
    context.fillText(Math.sin(mark * 81.17 + variant * 19.31) > 0 ? '1' : '0', 0, 0);
  }
  return image;
}

export function CodeVortex({ paused }: { paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textures = useRef<HTMLCanvasElement[]>([]);
  const elapsed = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: false });
    if (!canvas || !context) return;
    if (!textures.current.length) {
      textures.current = Array.from({ length: 6 }, (_, variant) => createRing(variant));
    }

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let previous: number | undefined;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let visible = false;

    function draw() {
      if (!context || !width || !height) return;
      const time = elapsed.current;
      const centerX = width * 0.5;
      const centerY = height * 0.49;
      const inner = Math.max(18, Math.min(width, height) * 0.04);
      const outer = Math.hypot(width, height) * 0.78;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.globalAlpha = 1;
      context.fillStyle = '#000703';
      context.fillRect(0, 0, width, height);

      for (let index = 0; index < ringCount; index++) {
        const depth = (index / ringCount + time * 0.064) % 1;
        const radius = inner * (outer / inner) ** depth;
        const angle = depth * 2.8 - time * 0.28;
        const wave = (1 + Math.cos(depth * 29 - time * 1.35)) / 2;
        const fade = Math.min(1, depth * 24, (1 - depth) * 14);
        const size = radius * 2.17;
        const texture = textures.current[index % textures.current.length];
        context.save();
        context.translate(centerX, centerY);
        context.scale(1.08, 0.94);
        context.rotate(angle);
        context.globalAlpha = fade * (0.15 + 0.85 * wave ** 3);
        context.drawImage(texture, -size / 2, -size / 2, size, size);
        context.restore();
      }
    }

    function animate(timestamp: number) {
      if (previous !== undefined) elapsed.current += Math.min(0.05, (timestamp - previous) / 1000);
      previous = timestamp;
      draw();
      frame = requestAnimationFrame(animate);
    }

    function syncPlayback() {
      cancelAnimationFrame(frame);
      previous = undefined;
      if (visible && !paused && !motion.matches && !document.hidden) {
        frame = requestAnimationFrame(animate);
      }
    }

    const resize = new ResizeObserver(([entry]) => {
      ({ width, height } = entry.contentRect);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      draw();
    });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    resize.observe(canvas);
    intersection.observe(canvas);
    motion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      motion.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, [paused]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
