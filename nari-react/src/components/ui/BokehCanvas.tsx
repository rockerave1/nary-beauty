import { useEffect, useRef } from 'react';

/** Warm bokeh palette — gold, amber, champagne */
const COLORS = [
  [212, 180, 131], // champagne gold
  [194, 154, 100], // warm amber
  [228, 200, 160], // light gold
  [180, 145, 95],  // deep amber
  [220, 195, 155], // soft cream
];

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  opacity: number;
  color: number[];
  phase: number;      // offset for sine-wave drift
  pulseSpeed: number;  // opacity breathing speed
}

function createParticle(w: number, h: number): Particle {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r: 3 + Math.random() * 18,              // 3–21px
    vx: (Math.random() - 0.5) * 0.15,       // very slow horizontal drift
    vy: -0.05 - Math.random() * 0.12,       // gentle upward float
    opacity: 0.08 + Math.random() * 0.28,   // 0.08–0.36
    color,
    phase: Math.random() * Math.PI * 2,
    pulseSpeed: 0.3 + Math.random() * 0.5,
  };
}

/**
 * Ambient bokeh canvas — soft warm light spots that float gently.
 * Runs on a single requestAnimationFrame loop, GPU-friendly.
 */
export const BokehCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const PARTICLE_COUNT = 28; // keep it light

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      resize();
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(w, h)
      );
    };

    const draw = (time: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // Gentle sine-wave horizontal sway
        const sway = Math.sin(time * 0.0004 + p.phase) * 0.3;
        p.x += p.vx + sway * 0.1;
        p.y += p.vy;

        // Breathing opacity
        const breathe =
          0.5 + 0.5 * Math.sin(time * 0.001 * p.pulseSpeed + p.phase);
        const alpha = p.opacity * (0.6 + 0.4 * breathe);

        // Wrap around edges
        if (p.y + p.r < 0) {
          p.y = h + p.r;
          p.x = Math.random() * w;
        }
        if (p.x < -p.r) p.x = w + p.r;
        if (p.x > w + p.r) p.x = -p.r;

        // Draw soft radial gradient circle (bokeh)
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        const [r, g, b] = p.color;
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    animId = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};
