import { useRef, useEffect, useCallback } from 'react';
import { ScrollStage } from './useScrollProgress';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  char: string;
  targetX?: number;
  targetY?: number;
  color: { r: number; g: number; b: number };
  transformed: boolean;
}

interface ParticleSystemConfig {
  scrollProgress: number;
  stage: ScrollStage;
  stageProgress: number;
}

const CHARS = ['0', '1', '·', '•'];

// Colors
const CHAOS_COLOR = { r: 255, g: 255, b: 255 };
const CYAN_COLOR = { r: 0, g: 243, b: 255 };
const GREEN_COLOR = { r: 0, g: 255, b: 157 };

export function useParticleSystem(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  config: ParticleSystemConfig
) {
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const configRef = useRef(config);

  // Update config ref
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 150 : 500;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        color: { ...CHAOS_COLOR },
        transformed: false,
      });
    }

    particlesRef.current = particles;
  }, []);

  const updateParticles = useCallback((canvas: HTMLCanvasElement) => {
    const { stage, stageProgress, scrollProgress } = configRef.current;
    const particles = particlesRef.current;
    const width = canvas.width;
    const height = canvas.height;

    particles.forEach((particle, index) => {
      switch (stage) {
        case 'ingest':
          // Brownian motion - chaotic
          particle.vx += (Math.random() - 0.5) * 0.5;
          particle.vy += (Math.random() - 0.5) * 0.5;
          particle.vx *= 0.99;
          particle.vy *= 0.99;
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.opacity = 0.1 + Math.random() * 0.2;
          particle.color = { ...CHAOS_COLOR };
          particle.transformed = false;
          break;

        case 'transform':
          // Transition to horizontal streams
          const streamY = (index % 8) * (height / 8) + height / 16;
          const targetSpeed = 3 + stageProgress * 4;

          // Lerp to stream position
          particle.y += (streamY - particle.y) * 0.02 * stageProgress;
          particle.vx = targetSpeed;
          particle.vy *= 0.95;
          particle.x += particle.vx;

          // Wrap around
          if (particle.x > width) {
            particle.x = -10;
          }

          // Color transition
          const colorProgress = stageProgress;
          particle.color = {
            r: CHAOS_COLOR.r + (CYAN_COLOR.r - CHAOS_COLOR.r) * colorProgress,
            g: CHAOS_COLOR.g + (CYAN_COLOR.g - CHAOS_COLOR.g) * colorProgress,
            b: CHAOS_COLOR.b + (CYAN_COLOR.b - CHAOS_COLOR.b) * colorProgress,
          };
          particle.opacity = 0.3 + stageProgress * 0.4;
          particle.transformed = stageProgress > 0.5;
          break;

        case 'serve':
          // Form geometric patterns - grid/nodes
          const gridCols = 12;
          const gridRows = 8;
          const cellWidth = width / gridCols;
          const cellHeight = height / gridRows;
          const targetCol = index % gridCols;
          const targetRow = Math.floor(index / gridCols) % gridRows;
          const targetX = targetCol * cellWidth + cellWidth / 2;
          const targetY = targetRow * cellHeight + cellHeight / 2;

          particle.x += (targetX - particle.x) * 0.03 * stageProgress;
          particle.y += (targetY - particle.y) * 0.03 * stageProgress;

          // Alternate between cyan and green
          const isGreen = (targetCol + targetRow) % 2 === 0;
          particle.color = isGreen ? { ...GREEN_COLOR } : { ...CYAN_COLOR };
          particle.opacity = 0.5 + stageProgress * 0.3;
          particle.size = 2 + stageProgress * 2;
          break;

        case 'storage':
          // Settle into a pulsing grid at bottom
          const finalGridCols = 20;
          const finalCol = index % finalGridCols;
          const finalRow = Math.floor(index / finalGridCols);
          const finalX = (finalCol + 0.5) * (width / finalGridCols);
          const finalY = height - 150 + finalRow * 15;

          particle.x += (finalX - particle.x) * 0.05;
          particle.y += (finalY - particle.y) * 0.05;

          // Pulsing effect
          const pulse = Math.sin(Date.now() * 0.002 + index * 0.1) * 0.2 + 0.8;
          particle.opacity = 0.6 * pulse;
          particle.color = index % 3 === 0 ? { ...GREEN_COLOR } : { ...CYAN_COLOR };
          particle.size = 3;
          break;
      }

      // Keep particles in bounds for chaos stage
      if (stage === 'ingest') {
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
      }
    });
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const { stage } = configRef.current;
    
    // Clear with fade effect
    ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;

    // Draw connections in serve/storage stage
    if (stage === 'serve' || stage === 'storage') {
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.1)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i += 10) {
        for (let j = i + 1; j < Math.min(i + 5, particles.length); j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Draw particles
    particles.forEach((particle) => {
      const { x, y, size, opacity, char, color } = particle;
      
      ctx.font = `${size * 6}px \"JetBrains Mono\", monospace`;
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
      ctx.fillText(char, x, y);

      // Add glow for transformed particles
      if (particle.transformed || stage === 'serve' || stage === 'storage') {
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`;
        ctx.shadowBlur = 10;
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;
      }
    });
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    updateParticles(canvas);
    draw(ctx, canvas);

    animationRef.current = requestAnimationFrame(animate);
  }, [canvasRef, updateParticles, draw]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(canvas);
  }, [canvasRef, initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [canvasRef, handleResize, animate]);
}
