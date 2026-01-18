import { useRef } from 'react';
import { useParticleSystem } from '@/hooks/useParticleSystem';
import { ScrollStage } from '@/hooks/useScrollProgress';

interface VisualizationEngineProps {
  scrollProgress: number;
  stage: ScrollStage;
  stageProgress: number;
}

export function VisualizationEngine({ scrollProgress, stage, stageProgress }: VisualizationEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useParticleSystem(canvasRef, { scrollProgress, stage, stageProgress });

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'hsl(0 0% 2%)' }}
    />
  );
}
