import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: 'star' | 'cloud' | 'petal';
  color: string;
}

interface ParticleBackgroundProps {
  theme?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ theme = 'default' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  const getThemeConfig = (theme: string) => {
    switch (theme) {
      case 'qin':
        return { colors: ['#FFD700', '#FFA500', '#FF6347'], particleType: 'star' as const };
      case 'han':
        return { colors: ['#FFD700', '#FFFF00', '#FFA500'], particleType: 'star' as const };
      case 'tang':
        return { colors: ['#FF69B4', '#FFB6C1', '#FFC0CB'], particleType: 'petal' as const };
      case 'song':
        return { colors: ['#87CEEB', '#B0E0E6', '#E0F6FF'], particleType: 'cloud' as const };
      case 'yuan':
        return { colors: ['#4169E1', '#6495ED', '#87CEFA'], particleType: 'star' as const };
      case 'ming':
        return { colors: ['#DC143C', '#FF6347', '#FFB6C1'], particleType: 'petal' as const };
      case 'qing':
        return { colors: ['#9370DB', '#BA55D3', '#DDA0DD'], particleType: 'star' as const };
      default:
        return { colors: ['#FFD700', '#87CEEB', '#FFB6C1'], particleType: 'star' as const };
    }
  };

  const createParticle = (canvas: HTMLCanvasElement, themeConfig: any): Particle => {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      type: themeConfig.particleType,
      color: themeConfig.colors[Math.floor(Math.random() * themeConfig.colors.length)]
    };
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;

    switch (particle.type) {
      case 'star':
        drawStar(ctx, particle.x, particle.y, particle.size);
        break;
      case 'cloud':
        drawCloud(ctx, particle.x, particle.y, particle.size);
        break;
      case 'petal':
        drawPetal(ctx, particle.x, particle.y, particle.size);
        break;
    }
    ctx.restore();
  };

  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      const radius = i % 2 === 0 ? size : size / 2;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  };

  const drawCloud = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.arc(x + size, y, size * 0.8, 0, Math.PI * 2);
    ctx.arc(x - size, y, size * 0.8, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.ellipse(x, y, size, size * 2, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const themeConfig = getThemeConfig(theme);
    
    // 初始化粒子
    particlesRef.current = Array.from({ length: 50 }, () => createParticle(canvas, themeConfig));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        // 更新位置
        particle.x += particle.vx;
        particle.y += particle.vy;

        // 边界检查
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // 透明度变化
        particle.opacity += (Math.random() - 0.5) * 0.01;
        particle.opacity = Math.max(0.1, Math.min(0.7, particle.opacity));

        drawParticle(ctx, particle);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleBackground;