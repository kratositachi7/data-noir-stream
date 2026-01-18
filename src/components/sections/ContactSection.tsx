import { motion } from 'framer-motion';
import { GlassCard } from '@/components/GlassCard';
import { Mail, Phone, MapPin, Linkedin, Github, Download, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 py-32">
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-header">{'// STAGE_04: STORAGE'}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            Ready to <span className="text-secondary text-glow-green">Deploy</span>?
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-xl mx-auto">
            The pipeline is complete. Let's engineer something extraordinary together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard glowColor="cyan" className="max-w-2xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="mailto:abhilashbagde@utexas.edu"
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors group"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:glow-cyan transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Email</p>
                  <p className="text-sm text-foreground">abhilashbagde@utexas.edu</p>
                </div>
              </a>

              <a
                href="tel:+17373966402"
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors group"
              >
                <div className="p-3 rounded-lg bg-secondary/10 text-secondary group-hover:glow-green transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Phone</p>
                  <p className="text-sm text-foreground">(737) 396-6402</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/abhilashbagde/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors group"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:glow-cyan transition-all">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">LinkedIn</p>
                  <p className="text-sm text-foreground">in/abhilashbagde</p>
                </div>
              </a>

              <a
                href="https://github.com/AbhilashBagde"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors group"
              >
                <div className="p-3 rounded-lg bg-secondary/10 text-secondary group-hover:glow-green transition-all">
                  <Github className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">GitHub</p>
                  <p className="text-sm text-foreground">AbhilashBagde</p>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-3 p-4 mt-4 rounded-lg bg-muted/20">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Austin, Texas</span>
              <span className="ml-auto font-mono text-xs text-primary">MSBA @ UT Austin '26</span>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan px-8 py-6 text-lg font-semibold"
          >
            <a href="/Abhilash_Bagde_Resume.pdf" download>
              <span className="relative z-10 flex items-center gap-3">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download Full Logs (Resume)
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 flex items-center justify-center gap-2 text-muted-foreground font-mono text-xs"
        >
          <Database className="w-4 h-4" />
          <span>Data stored successfully. Pipeline complete.</span>
        </motion.div>
      </div>
    </section>
  );
}
