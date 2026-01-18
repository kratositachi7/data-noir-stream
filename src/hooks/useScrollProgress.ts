import { useState, useEffect, useCallback } from 'react';

export type ScrollStage = 'ingest' | 'transform' | 'serve' | 'storage';

export interface ScrollProgress {
  progress: number; // 0 to 1
  stage: ScrollStage;
  stageProgress: number; // Progress within current stage (0 to 1)
}

export function useScrollProgress(): ScrollProgress {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const newProgress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
    setProgress(newProgress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Determine current stage based on progress
  const getStage = (p: number): ScrollStage => {
    if (p < 0.25) return 'ingest';
    if (p < 0.60) return 'transform';
    if (p < 0.90) return 'serve';
    return 'storage';
  };

  const stage = getStage(progress);

  // Calculate progress within current stage
  const getStageProgress = (p: number, s: ScrollStage): number => {
    switch (s) {
      case 'ingest':
        return p / 0.25;
      case 'transform':
        return (p - 0.25) / 0.35;
      case 'serve':
        return (p - 0.60) / 0.30;
      case 'storage':
        return (p - 0.90) / 0.10;
      default:
        return 0;
    }
  };

  return {
    progress,
    stage,
    stageProgress: Math.min(Math.max(getStageProgress(progress, stage), 0), 1),
  };
}
