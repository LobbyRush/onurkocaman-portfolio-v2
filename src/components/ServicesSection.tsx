import React from 'react';
import { Globe, Layout, LayoutDashboard, Brain, MessageSquare } from 'lucide-react';
import SectionTitle from './SectionTitle';
import GlowCard from './GlowCard';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Globe,
  Layout,
  LayoutDashboard,
  Brain,
  MessageSquare,
};

const ServicesSection: React.FC = () => {
  const { data } = usePortfolio();
  const { services } = data;

  return (
    <section id="services" className="py-24 bg-[#07070d] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          label="Hizmetler"
          title="Neler Yapıyorum?"
          subtitle="Fikrinizden lansmana kadar her adımda yanınızdayım."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <GlowCard key={service.id} delay={i * 0.08} className="p-8 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                  <Icon size={20} className="text-purple-400" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;