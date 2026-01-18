import { motion } from 'framer-motion';
import { GlassCard } from '@/components/GlassCard';
import { Database, Cloud, Zap, BarChart3, Code2, GitBranch } from 'lucide-react';

const skillCategories = [
  {
    title: 'Data Engineering',
    icon: Database,
    skills: ['Snowflake', 'dbt', 'Apache Spark', 'Airflow'],
    color: 'cyan' as const,
  },
  {
    title: 'Streaming & Processing',
    icon: Zap,
    skills: ['Apache Kafka', 'Spark Streaming', 'AWS Glue', 'Flink'],
    color: 'green' as const,
  },
  {
    title: 'Cloud Platforms',
    icon: Cloud,
    skills: ['AWS (S3, Lambda, Redshift)', 'GCP BigQuery', 'Docker'],
    color: 'cyan' as const,
  },
  {
    title: 'Programming',
    icon: Code2,
    skills: ['Python', 'SQL', 'Pandas', 'Scikit-learn'],
    color: 'green' as const,
  },
  {
    title: 'Analytics & BI',
    icon: BarChart3,
    skills: ['Amazon QuickSight', 'Data Modeling', 'KPI Design'],
    color: 'cyan' as const,
  },
  {
    title: 'DevOps & Version Control',
    icon: GitBranch,
    skills: ['Git', 'CI/CD', 'Terraform', 'IaC'],
    color: 'green' as const,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function SkillsSection() {
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
          <span className="section-header">{'// STAGE_02: TRANSFORM'}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            The <span className="text-primary text-glow-cyan">Filters</span>
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl">
            Raw data flows through specialized systems, each transforming chaos into structure.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div key={category.title} variants={itemVariants}>
                <GlassCard glowColor={category.color} className="h-full">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        category.color === 'cyan'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-secondary/10 text-secondary'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-3">{category.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`font-mono text-xs px-2 py-1 rounded border ${
                              category.color === 'cyan'
                                ? 'border-primary/30 text-primary/80'
                                : 'border-secondary/30 text-secondary/80'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
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
