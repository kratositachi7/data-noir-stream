import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'green' | 'none';
  hover?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  glowColor = 'none',
  hover = true,
  ...props 
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'glass-card p-6',
        hover && 'transition-all duration-300 hover:border-primary/30',
        glowColor === 'cyan' && 'hover:glow-cyan',
        glowColor === 'green' && 'hover:glow-green',
        className
      )}
      whileHover={hover ? { scale: 1.02, y: -5 } : undefined}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
