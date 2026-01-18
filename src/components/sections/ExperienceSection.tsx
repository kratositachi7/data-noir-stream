import { motion } from 'framer-motion';
import { GlassCard } from '@/components/GlassCard';
import { Briefcase, TrendingUp } from 'lucide-react';

const experiences = [
  {
    company: 'DISCO',
    location: 'Gurgaon, India',
    role: 'Business Intelligence Analyst',
    period: 'July 2023 – Nov 2024',
    highlights: [
      'Designed and optimized ELT/ETL pipelines using Python, SQL, and Snowflake, reducing data latency by 20%',
      'Built scalable data warehouses with star/snowflake schemas for optimized query performance',
      'Engineered real-time streaming pipelines using Apache Kafka and Spark Streaming',
      'Standardized enterprise KPIs using dbt, improving reporting performance by 25%',
    ],
    metric: '-20% Data Latency',
  },
  {
    company: 'Merkle',
    location: 'Pune, India',
    role: 'Business Intelligence Analyst',
    period: 'April 2022 – July 2023',
    highlights: [
      'Built Gradient Boosting and Logistic Regression models to optimize marketing ROI by 10-15%',
      'Applied NLP techniques (TF-IDF) to classify ad creatives, increasing CTR by 9%',
      'Integrated large-scale marketing datasets in Snowflake, reducing manual effort by 60%',
      'Designed A/B testing frameworks for data-driven marketing decisions',
    ],
    metric: '+15% Marketing ROI',
  },
  {
    company: 'VVDN Technologies',
    location: 'India',
    role: 'Marketing Executive & Tech Author',
    period: 'Feb 2020 – July 2021',
    highlights: [
      'Analyzed business processes to identify inefficiencies and drive optimization',
      'Performed advanced data analysis and visualization to uncover actionable insights',
      'Collaborated with stakeholders to define requirements and functional specifications',
    ],
    metric: 'Process Optimization',
  },
];

export function ExperienceSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 py-32">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-header">{'// THE_MILESTONES'}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            Professional <span className="text-secondary text-glow-green">Journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/20 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute top-6 w-4 h-4 rounded-full bg-primary hidden md:block ${
                    index % 2 === 0 ? 'right-0 translate-x-1/2 md:-right-2' : 'left-0 -translate-x-1/2 md:-left-2'
                  }`}
                >
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                </div>

                <GlassCard glowColor={index % 2 === 0 ? 'cyan' : 'green'}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase className="w-4 h-4 text-primary" />
                        <h3 className="text-xl font-bold">{exp.company}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm">{exp.location}</p>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-mono text-xs">
                      <TrendingUp className="w-3 h-3" />
                      {exp.metric}
                    </div>
                  </div>

                  <p className="font-medium text-foreground/90 mb-1">{exp.role}</p>
                  <p className="font-mono text-xs text-muted-foreground mb-4">{exp.period}</p>

                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary mt-1">▸</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
