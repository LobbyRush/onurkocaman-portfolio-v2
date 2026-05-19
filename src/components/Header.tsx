import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Ana Sayfa', href: '/#hero' },
  { label: 'Hakkımda', href: '/#about' },
  { label: 'Hizmetler', href: '/#services' },
  { label: 'Projeler', href: '/#projects' },
  { label: 'İletişim', href: '/#contact' },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#0a0a0f]/95 backdrop-blur-md border-b border-purple-500/20 shadow-lg shadow-purple-900/10'
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="Onur Kocaman Ana Sayfa"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/60 transition-all duration-300">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-heading text-xl font-bold text-white tracking-tight">
            Onur<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">.</span>
          </span>
        </Link>

        {!isAdmin && (
          <nav className="hidden md:flex items-center gap-8" aria-label="Ana navigasyon">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200 relative group font-medium"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {!isAdmin && (
            <Link
              to="/admin"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-blue-500 hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/25"
            >
              Admin
            </Link>
          )}
          {!isAdmin && (
            <button
              className="md:hidden text-gray-400 hover:text-white transition-colors duration-200 p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && !isAdmin && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0a0a0f]/98 border-t border-purple-500/20 overflow-hidden"
            role="dialog"
            aria-label="Mobil navigasyon"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-3 text-gray-300 hover:text-white hover:pl-2 transition-all duration-200 border-b border-white/5 text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold"
              >
                Admin Panel
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;