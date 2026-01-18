import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <motion.div
        className="text-center max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.span
          className="section-header block mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {'// STAGE_01: INGEST'}
        </motion.span>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <span className="text-gradient-primary">Abhilash</span>{' '}
          <span className="text-foreground">Bagde</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground font-mono mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          Data Engineer & Business Intelligence Analyst
        </motion.p>

        <motion.p
          className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground/80 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          The world is full of <span className="text-muted-foreground">noise</span>.
          <br />
          I engineer the <span className="text-primary text-glow-cyan">signal</span>.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center font-mono text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <span className="px-3 py-1 border border-border rounded-full">MSBA @ UT Austin</span>
          <span className="px-3 py-1 border border-border rounded-full">3+ Years Experience</span>
          <span className="px-3 py-1 border border-border rounded-full">Austin, TX</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="font-mono text-xs tracking-widest">SCROLL TO TRANSFORM</span>
          <ChevronDown className="w-5 h-5 scroll-hint" />
        </div>
      </motion.div>
    </section>
  );
}
