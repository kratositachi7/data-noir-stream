import { useScrollProgress } from '@/hooks/useScrollProgress';
import { VisualizationEngine } from '@/components/VisualizationEngine';
import { StageIndicator } from '@/components/StageIndicator';
import { HeroSection } from '@/components/sections/HeroSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';

const Index = () => {
  const { progress, stage, stageProgress } = useScrollProgress();

  return (
    <div className="relative min-h-screen">
      {/* Particle Canvas Background */}
      <VisualizationEngine 
        scrollProgress={progress} 
        stage={stage} 
        stageProgress={stageProgress} 
      />

      {/* Fixed Stage Indicator */}
      <StageIndicator currentStage={stage} />

      {/* Narrative Layer - Scrollable Content */}
      <main className="relative z-10">
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-20 bg-noise opacity-[0.02]" />
    </div>
  );
};

export default Index;
