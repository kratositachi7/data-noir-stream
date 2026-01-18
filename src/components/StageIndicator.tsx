import { ScrollStage } from '@/hooks/useScrollProgress';
import { motion } from 'framer-motion';

interface StageIndicatorProps {
  currentStage: ScrollStage;
}

const stages: { id: ScrollStage; label: string }[] = [
  { id: 'ingest', label: 'INGEST' },
  { id: 'transform', label: 'TRANSFORM' },
  { id: 'serve', label: 'SERVE' },
  { id: 'storage', label: 'STORAGE' },
];

export function StageIndicator({ currentStage }: StageIndicatorProps) {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {stages.map((stage) => {
        const isActive = stage.id === currentStage;
        const isPast = stages.findIndex(s => s.id === currentStage) > stages.findIndex(s => s.id === stage.id);

        return (
          <div key={stage.id} className="flex items-center gap-3">
            <motion.div
              className="relative"
              animate={{
                scale: isActive ? 1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  isActive
                    ? 'bg-primary glow-cyan'
                    : isPast
                    ? 'bg-secondary/50'
                    : 'bg-muted-foreground/20'
                }`}
              />
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
            <motion.span
              className={`font-mono text-xs tracking-wider transition-all duration-300 ${
                isActive
                  ? 'text-primary text-glow-cyan'
                  : isPast
                  ? 'text-muted-foreground'
                  : 'text-muted-foreground/50'
              }`}
              animate={{ opacity: isActive ? 1 : 0.5 }}
            >
              {stage.label}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}
