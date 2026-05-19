import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, User, Briefcase, FolderOpen, Mail, TrendingUp, Eye } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';

const quickLinks = [
  { label: 'Hero Bölümü', href: '/admin/hero', icon: Sparkles, color: 'from-purple-500/20 to-purple-600/20', border: 'border-purple-500/20', iconColor: 'text-purple-400' },
  { label: 'Hakkımda', href: '/admin/about', icon: User, color: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-500/20', iconColor: 'text-blue-400' },
  { label: 'Hizmetler', href: '/admin/services', icon: Briefcase, color: 'from-green-500/20 to-green-600/20', border: 'border-green-500/20', iconColor: 'text-green-400' },
  { label: 'Projeler', href: '/admin/projects', icon: FolderOpen, color: 'from-orange-500/20 to-orange-600/20', border: 'border-orange-500/20', iconColor: 'text-orange-400' },
  { label: 'İletişim', href: '/admin/contact', icon: Mail, color: 'from-pink-500/20 to-pink-600/20', border: 'border-pink-500/20', iconColor: 'text-pink-400' },
];

export default function AdminDashboard() {
  const { data } = usePortfolio();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090f] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Bu sayfaya erişmek için giriş yapmanız gerekiyor.</p>
          <Link to="/admin/login" className="text-purple-400 hover:text-purple-300 underline">
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout title="Dashboard" subtitle="Portföy içeriklerinizi yönetin">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 text-sm">Toplam Proje</span>
            <FolderOpen size={16} className="text-purple-400" />
          </div>
          <div className="font-heading text-3xl font-bold text-white">{data.projects.length}</div>
          <div className="text-green-400 text-xs mt-1 flex items-center gap-1">
            <TrendingUp size={12} />
            Aktif
          </div>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 text-sm">Hizmet Sayısı</span>
            <Briefcase size={16} className="text-blue-400" />
          </div>
          <div className="font-heading text-3xl font-bold text-white">{data.services.length}</div>
          <div className="text-green-400 text-xs mt-1 flex items-center gap-1">
            <TrendingUp size={12} />
            Aktif
          </div>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 text-sm">Canlı Önizleme</span>
            <Eye size={16} className="text-green-400" />
          </div>
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm hover:bg-green-500/20 transition-all duration-200"
          >
            <Eye size={14} />
            Siteyi Görüntüle
          </Link>
        </div>
      </div>

      <h2 className="font-heading text-lg font-bold text-white mb-4">Hızlı Erişim</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-4 bg-white/[0.03] border ${item.border} rounded-2xl p-6 hover:bg-white/[0.05] hover:-translate-y-0.5 transition-all duration-200`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} border ${item.border} flex items-center justify-center`}>
                <Icon size={18} className={item.iconColor} />
              </div>
              <span className="text-white font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </AdminLayout>
  );
}