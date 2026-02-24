import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const NetworkAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const dots: Dot[] = [];
    const dotCount = 60;
    const connectionDistance = 120;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    // Create dots in a pin/teardrop shape
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;

    for (let i = 0; i < dotCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radiusRange = Math.random() * 180 + 40;
      // Bias toward pin shape (wider at top, narrow at bottom)
      const yBias = Math.sin(angle) > 0 ? 0.6 : 1;
      dots.push({
        x: centerX + Math.cos(angle) * radiusRange * yBias,
        y: centerY + Math.sin(angle) * radiusRange * 0.8 - 20,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update & draw connections
      for (let i = 0; i < dots.length; i++) {
        dots[i].x += dots[i].vx;
        dots[i].y += dots[i].vy;

        // Soft boundary
        if (dots[i].x < 50 || dots[i].x > canvas.offsetWidth - 50) dots[i].vx *= -1;
        if (dots[i].y < 50 || dots[i].y > canvas.offsetHeight - 50) dots[i].vy *= -1;

        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `hsla(175, 100%, 31%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(dots[i].x, dots[i].y, dots[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(175, 100%, 31%, ${dots[i].opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default NetworkAnimation;
