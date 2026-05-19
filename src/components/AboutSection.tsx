import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Rocket } from 'lucide-react';
import SectionTitle from './SectionTitle';
import GlowCard from './GlowCard';
import { usePortfolio } from '../context/PortfolioContext';

const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const { about } = data;

  const icons = [Code2, Cpu, Rocket];

  return (
    <section id="about" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          label="Hakkımda"
          title={about.title}
          subtitle={about.description}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {about.stats.map((stat, i) => {
            const Icon = icons[i];
            return (
              <GlowCard key={stat.label} delay={i * 0.1} className="p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-purple-400" />
                </div>
                <div className="font-heading text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </GlowCard>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&h=500&fit=crop"
                alt="Modern web geliştirme ortamı"
                width={700}
                height={500}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white text-sm font-medium">Yeni projeler için müsait</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="font-heading text-2xl font-bold text-white">
              Teknoloji & Uzmanlık
            </h3>
            <p className="text-gray-400 leading-relaxed">
              React, TypeScript ve modern web teknolojileri ile kullanıcı deneyimini ön planda tutan projeler geliştiriyorum. AI entegrasyonları ile iş süreçlerini otomatize eden çözümler üretiyorum.
            </p>
            <div className="space-y-3">
              {['React / TypeScript', 'Node.js / API Geliştirme', 'AI & Otomasyon', 'UI/UX Tasarım'].map((skill, i) => (
                <div key={skill} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300 text-sm">{skill}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${[90, 80, 75, 85][i]}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;