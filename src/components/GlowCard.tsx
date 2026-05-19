import React from 'react';
import { motion } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'purple' | 'blue' | 'mixed';
  delay?: number;
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'mixed',
  delay = 0,
}) => {
  const glowMap = {
    purple: 'hover:shadow-purple-500/20 hover:border-purple-500/40',
    blue: 'hover:shadow-blue-500/20 hover:border-blue-500/40',
    mixed: 'hover:shadow-purple-500/15 hover:border-purple-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`
        relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300
        ${glowMap[glowColor]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlowCard;