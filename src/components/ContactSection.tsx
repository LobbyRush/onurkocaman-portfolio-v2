import React from 'react';
import { Mail, ExternalLink, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import NeonButton from './NeonButton';
import { usePortfolio } from '../context/PortfolioContext';

const ContactSection: React.FC = () => {
  const { data } = usePortfolio();
  const { contact } = data;

  return (
    <section id="contact" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle
          label="İletişim"
          title="Birlikte Çalışalım"
          subtitle="Projeniz için hazırım. Hemen iletişime geçin."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.a
            href={`mailto:${contact.email}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group flex items-center gap-6 bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
              <Mail size={22} className="text-purple-400" />
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">E-posta</div>
              <div className="text-white font-semibold text-sm">{contact.email}</div>
              <div className="text-gray-600 text-xs mt-1">Genellikle 24 saat içinde yanıt</div>
            </div>
          </motion.a>

          <motion.a
            href={contact.r10Link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group flex items-center gap-6 bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
              <ExternalLink size={22} className="text-blue-400" />
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Forum</div>
              <div className="text-white font-semibold text-sm">{contact.r10Label}</div>
              <div className="text-gray-600 text-xs mt-1">Profil ve referanslar</div>
            </div>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 border border-purple-500/20 rounded-2xl p-10">
            <h3 className="font-heading text-2xl font-bold text-white mb-3">
              Projenizi Hayata Geçirelim
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm leading-relaxed">
              Fikrinizi paylaşın, birlikte en iyi çözümü bulalım. Ücretsiz danışmanlık için hemen yazın.
            </p>
            <NeonButton
              variant="primary"
              onClick={() => window.location.href = `mailto:${contact.email}`}
            >
              <Send size={16} />
              Mesaj Gönder
            </NeonButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;