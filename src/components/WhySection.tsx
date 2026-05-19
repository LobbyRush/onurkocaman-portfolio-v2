import React from 'react';
import { Zap, Palette, HeadphonesIcon, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

const reasons = [
  {
    icon: Zap,
    title: 'Hızlı Çözüm',
    description: 'Projelerinizi hızlı ve verimli bir şekilde hayata geçiriyorum. Zaman kaybı yok.',
    color: 'from-yellow-500/20 to-orange-500/20',
    border: 'border-yellow-500/20',
    iconColor: 'text-yellow-400',
  },
  {
    icon: Palette,
    title: 'Modern Tasarım',
    description: 'Güncel tasarım trendlerini takip ederek estetik ve işlevsel arayüzler oluşturuyorum.',
    color: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: HeadphonesIcon,
    title: 'İletişim & Destek',
    description: 'Proje süresince ve sonrasında kesintisiz iletişim ve teknik destek sağlıyorum.',
    color: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Heart,
    title: 'Memnuniyet Odaklı',
    description: 'Müşteri memnuniyeti her şeyin önünde. Beklentilerinizi aşmak için çalışıyorum.',
    color: 'from-red-500/20 to-pink-500/20',
    border: 'border-red-500/20',
    iconColor: 'text-red-400',
  },
];

const WhySection: React.FC = () => {
  return (
    <section id="why" className="py-24 bg-[#07070d] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          label="Neden Ben?"
          title="Neden Benimle Çalışmalısın?"
          subtitle="Projelerinizde fark yaratan değerler."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative bg-white/[0.03] backdrop-blur-sm border ${reason.border} rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reason.color} border ${reason.border} flex items-center justify-center mb-6`}>
                  <Icon size={20} className={reason.iconColor} />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-3">{reason.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhySection;