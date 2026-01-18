import { motion } from 'framer-motion';
import { GlassCard } from '@/components/GlassCard';
import { ExternalLink, Github, Zap, Brain, HeartPulse } from 'lucide-react';

const projects = [
  {
    title: 'NiftyStream-DE',
    description: 'Real-time stock data pipeline architecture processing live market feeds with Apache Kafka and Spark Streaming for instant analytics.',
    tech: ['Apache Kafka', 'Spark', 'Python', 'AWS'],
    link: 'https://github.com/AbhilashBagde/NiftyStream-DE',
    icon: Zap,
    color: 'cyan' as const,
  },
  {
    title: 'RAG-Chat-Analyst',
    description: 'LLM-powered analytics chatbot using Retrieval-Augmented Generation for intelligent data querying and insights extraction.',
    tech: ['LangChain', 'RAG', 'Python', 'Vector DB'],
    link: 'https://github.com/AbhilashBagde/rag-chat-analyst',
    icon: Brain,
    color: 'green' as const,
  },
  {
    title: 'Medical-Claim-Predictions',
    description: 'Predictive healthcare ML model analyzing medical claims data to forecast outcomes and optimize claim processing.',
    tech: ['Scikit-learn', 'Pandas', 'Python', 'ML'],
    link: 'https://github.com/AbhilashBagde/Medical-Claim-Predictions',
    icon: HeartPulse,
    color: 'cyan' as const,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export function ProjectsSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 py-32">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-header">{'// STAGE_03: SERVE'}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            Actionable <span className="text-primary text-glow-cyan">Intelligence</span>
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl">
            Structured data becomes value—powering real-time decisions and predictive insights.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <motion.div key={project.title} variants={itemVariants}>
                <GlassCard glowColor={project.color} className="h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-lg ${
                        project.color === 'cyan'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-secondary/10 text-secondary'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  </div>

                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    {project.title}
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </h3>

                  <p className="text-muted-foreground text-sm mb-6 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`font-mono text-xs px-2 py-1 rounded border ${
                          project.color === 'cyan'
                            ? 'border-primary/30 text-primary/80 bg-primary/5'
                            : 'border-secondary/30 text-secondary/80 bg-secondary/5'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
