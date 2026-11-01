import React, { useEffect, useRef } from 'react';

export default function BackgroundStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particles: stars and falling white & black floating hearts
    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));

    const hearts = Array.from({ length: 24 }, () => {
      const isBlack = Math.random() > 0.5;
      return {
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 10 + 10,
        speedY: Math.random() * 1.1 + 0.5,
        speedX: Math.sin(Math.random() * Math.PI) * 0.8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.5 + 0.35,
        color: isBlack ? '#000000' : '#ffffff',
        strokeColor: isBlack ? '#ffffff' : '#000000',
      };
    });

    // Mouse sparkles trail (white & black hearts)
    const sparkles = [];
    const handleMouseMove = (e) => {
      if (Math.random() > 0.3) {
        const isBlack = Math.random() > 0.5;
        sparkles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
          alpha: 1,
          color: isBlack ? '#000000' : '#ffffff',
          strokeColor: isBlack ? '#ffffff' : '#000000',
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const drawHeart = (ctx, x, y, size, color, strokeColor, alpha) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 20, size / 20);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10, -10, -20, 5, 0, 20);
      ctx.bezierCurveTo(20, 5, 10, -10, 0, 0);
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw starry twinkles
      stars.forEach((star) => {
        star.alpha += star.speed * star.direction;
        if (star.alpha > 0.95 || star.alpha < 0.15) {
          star.direction *= -1;
        }
        ctx.fillStyle = `rgba(255, 230, 210, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw floating white & black hearts
      hearts.forEach((h) => {
        h.y += h.speedY;
        h.x += Math.sin(h.y * 0.01) * 0.8;
        h.rotation += h.rotationSpeed;

        if (h.y > height + 25) {
          h.y = -25;
          h.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.rotate((h.rotation * Math.PI) / 180);
        drawHeart(ctx, 0, 0, h.size, h.color, h.strokeColor, h.opacity);
        ctx.restore();
      });

      // Draw interactive mouse sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.alpha -= 0.02;
        s.size *= 0.96;
        s.y -= 0.4;

        if (s.alpha <= 0 || s.size <= 0.5) {
          sparkles.splice(i, 1);
        } else {
          drawHeart(ctx, s.x, s.y, s.size * 3, s.color, s.strokeColor, s.alpha);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
