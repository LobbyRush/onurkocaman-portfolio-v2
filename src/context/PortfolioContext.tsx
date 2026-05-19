import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

export interface PortfolioData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    description: string;
    stats: { label: string; value: string }[];
  };
  services: Service[];
  projects: Project[];
  contact: {
    email: string;
    r10Link: string;
    r10Label: string;
  };
}

const defaultData: PortfolioData = {
  hero: {
    title: 'Fikirleri çalışan web projelerine dönüştürüyorum.',
    subtitle: 'Web Proje & AI Destekli Dijital Çözümler',
    description: 'Modern, hızlı ve profesyonel dijital ürünler geliştiriyorum. Fikrinizi gerçeğe dönüştürelim.',
    ctaPrimary: 'Projelerimi İncele',
    ctaSecondary: 'İletişime Geç',
  },
  about: {
    title: 'Merhaba, ben Onur.',
    description:
      'Modern web projeleri, AI destekli sistemler ve kullanıcı odaklı dijital çözümler geliştiriyorum. Hızlı, modern ve profesyonel işler üretmeye odaklanıyorum.',
    stats: [
      { label: 'Tamamlanan Proje', value: '20+' },
      { label: 'Mutlu Müşteri', value: '15+' },
      { label: 'Yıl Deneyim', value: '3+' },
    ],
  },
  services: [
    { id: '1', title: 'Kişisel Web Sitesi', description: 'Sizi en iyi şekilde temsil eden, modern ve hızlı kişisel web siteleri.', icon: 'Globe' },
    { id: '2', title: 'Landing Page', description: 'Dönüşüm odaklı, etkileyici açılış sayfaları tasarımı ve geliştirmesi.', icon: 'Layout' },
    { id: '3', title: 'Admin Panel', description: 'Kullanımı kolay, güçlü yönetim panelleri ve dashboard sistemleri.', icon: 'LayoutDashboard' },
    { id: '4', title: 'AI Destekli Çözümler', description: 'Yapay zeka entegrasyonlu akıllı sistemler ve otomasyon çözümleri.', icon: 'Brain' },
    { id: '5', title: 'Forum & Tanıtım İçerikleri', description: 'Profesyonel forum konuları, tanıtım yazıları ve içerik üretimi.', icon: 'MessageSquare' },
  ],
  projects: [
    {
      id: '1',
      title: 'LobbyRush',
      description: 'Valorant oyuncularının takım arkadaşı bulmasını sağlayan modern bir platform.',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop',
      tags: ['React', 'Node.js', 'Gaming'],
      link: '#',
    },
    {
      id: '2',
      title: 'AI Klip Çıkarıcı',
      description: 'Uzun videolardan yapay zeka destekli otomatik kısa klip üretim sistemi.',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=500&fit=crop',
      tags: ['Python', 'AI/ML', 'Video'],
      link: '#',
    },
    {
      id: '3',
      title: 'İlan + Aracı Sistem',
      description: 'Güvenli ilan yönetimi ve aracılık işlemleri için geliştirilmiş platform konsepti.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      tags: ['React', 'TypeScript', 'Platform'],
      link: '#',
    },
    {
      id: '4',
      title: 'Yakında',
      description: 'Yeni dijital araçlar ve web projeleri çok yakında geliyor.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop',
      tags: ['Coming Soon'],
      link: '#',
    },
  ],
  contact: {
    email: 'info@onurkocaman.com.tr',
    r10Link: 'https://www.r10.net',
    r10Label: 'R10 Profil',
  },
};

interface PortfolioContextType {
  data: PortfolioData;
  updateHero: (hero: PortfolioData['hero']) => void;
  updateAbout: (about: PortfolioData['about']) => void;
  updateServices: (services: Service[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateContact: (contact: PortfolioData['contact']) => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(defaultData);

  const updateHero = (hero: PortfolioData['hero']) => setData((d) => ({ ...d, hero }));
  const updateAbout = (about: PortfolioData['about']) => setData((d) => ({ ...d, about }));
  const updateServices = (services: Service[]) => setData((d) => ({ ...d, services }));
  const updateProjects = (projects: Project[]) => setData((d) => ({ ...d, projects }));
  const updateContact = (contact: PortfolioData['contact']) => setData((d) => ({ ...d, contact }));

  return (
    <PortfolioContext.Provider value={{ data, updateHero, updateAbout, updateServices, updateProjects, updateContact }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
};