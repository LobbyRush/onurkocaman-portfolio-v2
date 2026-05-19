import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  User,
  Briefcase,
  FolderOpen,
  Mail,
  LogOut,
  Zap,
  Eye,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Hero Bölümü', href: '/admin/hero', icon: Sparkles },
  { label: 'Hakkımda', href: '/admin/about', icon: User },
  { label: 'Hizmetler', href: '/admin/services', icon: Briefcase },
  { label: 'Projeler', href: '/admin/projects', icon: FolderOpen },
  { label: 'İletişim', href: '/admin/contact', icon: Mail },
  { label: 'Canlı Önizleme', href: '/', icon: Eye },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-[#0d0d14] border-r border-white/5 flex flex-col">
      <div className="p-6 border-b border-white/5">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <span className="font-heading text-sm font-bold text-white block">Admin Panel</span>
            <span className="text-xs text-gray-500">onurkocaman.com.tr</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1" aria-label="Admin navigasyon">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/25'
                  : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Link
          to="/admin/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 w-full"
        >
          <LogOut size={16} />
          Çıkış Yap
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;