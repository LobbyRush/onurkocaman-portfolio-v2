import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink, Zap, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07070d] border-t border-purple-500/15">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-heading text-xl font-bold text-white">
                Onur<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">.</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Web Proje & AI Destekli Dijital Çözümler. Fikirleri çalışan projelere dönüştürüyorum.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="mailto:info@onurkocaman.com.tr"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-500 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200"
              >
                <Github size={16} />
              </a>
              <a
                href="mailto:info@onurkocaman.com.tr"
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-500 hover:text-blue-400 hover:border-blue-500/40 transition-all duration-200"
              >
                <Twitter size={16} />
              </a>
              <a
                href="mailto:info@onurkocaman.com.tr"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-500 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              {['Hakkımda', 'Hizmetler', 'Projeler', 'İletişim'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      const id = item.toLowerCase().replace('ı', 'i').replace('ş', 's').replace('ç', 'c').replace('ğ', 'g').replace('ü', 'u').replace('ö', 'o');
                      const map: Record<string, string> = { 'hakkimda': 'about', 'hizmetler': 'services', 'projeler': 'projects', 'iletisim': 'contact' };
                      const el = document.getElementById(map[id] || id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">İletişim</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@onurkocaman.com.tr"
                  className="flex items-center gap-2 text-gray-500 hover:text-purple-400 text-sm transition-colors duration-200"
                >
                  <Mail size={14} />
                  info@onurkocaman.com.tr
                </a>
              </li>
              <li>
                <a
                  href="https://www.r10.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  <ExternalLink size={14} />
                  R10 Profil
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © 2026 Onur Kocaman. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-gray-600 hover:text-gray-400 text-xs transition-colors duration-200">
              Gizlilik Politikası
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-gray-400 text-xs transition-colors duration-200">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;