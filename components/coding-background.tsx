"use client";

import { useEffect, useRef } from "react";

type NodePoint = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
};

const palette = {
  dark: {
    teal: "45, 212, 191",
    lime: "163, 230, 53",
    violet: "167, 139, 250",
    ink: "248, 250, 252",
  },
  light: {
    teal: "13, 148, 136",
    lime: "101, 163, 13",
    violet: "124, 58, 237",
    ink: "15, 23, 42",
  },
};

export function CodingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35 };
    const nodes: NodePoint[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let raf = 0;

    const getTheme = () =>
      document.documentElement.dataset.theme === "light" ? palette.light : palette.dark;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes.length = 0;
      const count = Math.min(76, Math.max(34, Math.floor((width * height) / 19000)));
      for (let index = 0; index < count; index += 1) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          size: Math.random() * 1.8 + 0.8,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawCircuitWave = (
      color: string,
      offset: number,
      amplitude: number,
      baseline: number,
      alpha: number,
    ) => {
      context.beginPath();
      for (let x = -80; x <= width + 80; x += 24) {
        const y =
          baseline +
          Math.sin(x * 0.008 + frame * 0.012 + offset) * amplitude +
          Math.sin(x * 0.021 - frame * 0.009 + offset) * (amplitude * 0.32);

        if (x === -80) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }

        if (x % 144 === 0) {
          context.lineTo(x + 18, y);
          context.lineTo(x + 18, y + 18 * Math.sign(Math.sin(offset + x)));
        }
      }

      context.strokeStyle = `rgba(${color}, ${alpha})`;
      context.lineWidth = 1;
      context.stroke();
    };

    const render = () => {
      const colors = getTheme();
      const reducedMotion = motionQuery.matches;
      context.clearRect(0, 0, width, height);

      const grid = context.createLinearGradient(0, 0, width, height);
      grid.addColorStop(0, `rgba(${colors.teal}, 0.07)`);
      grid.addColorStop(0.5, `rgba(${colors.violet}, 0.035)`);
      grid.addColorStop(1, `rgba(${colors.lime}, 0.055)`);
      context.fillStyle = grid;
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalCompositeOperation = "screen";
      drawCircuitWave(colors.teal, 0, 20, height * 0.24, 0.18);
      drawCircuitWave(colors.violet, 2.4, 34, height * 0.54, 0.12);
      drawCircuitWave(colors.lime, 4.6, 24, height * 0.78, 0.1);
      context.restore();

      for (const point of nodes) {
        if (!reducedMotion) {
          point.x += point.vx + Math.sin(frame * 0.009 + point.phase) * 0.018;
          point.y += point.vy + Math.cos(frame * 0.007 + point.phase) * 0.018;

          if (point.x < -40 || point.x > width + 40) point.vx *= -1;
          if (point.y < -40 || point.y > height + 40) point.vy *= -1;

          const dx = point.x - mouse.x;
          const dy = point.y - mouse.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 190 && distance > 0) {
            const force = (190 - distance) / 190;
            point.x += (dx / distance) * force * 0.35;
            point.y += (dy / distance) * force * 0.35;
          }
        }

        point.x += (point.baseX - point.x) * 0.0025;
        point.y += (point.baseY - point.y) * 0.0025;
      }

      for (let index = 0; index < nodes.length; index += 1) {
        const source = nodes[index];
        for (let otherIndex = index + 1; otherIndex < nodes.length; otherIndex += 1) {
          const target = nodes[otherIndex];
          const distance = Math.hypot(source.x - target.x, source.y - target.y);
          if (distance < 132) {
            const alpha = (1 - distance / 132) * 0.14;
            context.beginPath();
            context.moveTo(source.x, source.y);
            context.lineTo(target.x, target.y);
            context.strokeStyle = `rgba(${colors.teal}, ${alpha})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      }

      for (const point of nodes) {
        context.beginPath();
        context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(${colors.ink}, 0.2)`;
        context.fill();
        context.beginPath();
        context.arc(point.x, point.y, point.size * 2.6, 0, Math.PI * 2);
        context.strokeStyle = `rgba(${colors.teal}, 0.08)`;
        context.lineWidth = 1;
        context.stroke();
      }

      if (!reducedMotion) {
        frame += 1;
        raf = window.requestAnimationFrame(render);
      }
    };

    const handlePointer = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointer, { passive: true });
    motionQuery.addEventListener("change", render);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
      motionQuery.removeEventListener("change", render);
    };
  }, []);

  return <canvas ref={canvasRef} className="code-canvas" aria-hidden="true" />;
}
