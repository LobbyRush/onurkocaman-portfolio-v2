import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AdminHero() {
  const { data, updateHero } = usePortfolio();
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState(data.hero);

  useEffect(() => {
    setForm(data.hero);
  }, [data.hero]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090f] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Bu sayfaya erişmek için giriş yapmanız gerekiyor.</p>
          <Link to="/admin/login" className="text-purple-400 hover:text-purple-300 underline">Giriş Yap</Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateHero(form);
    toast.success('Hero bölümü güncellendi!');
  };

  return (
    <AdminLayout title="Hero Bölümü" subtitle="Ana sayfa hero içeriğini düzenleyin">
      <div className="max-w-2xl space-y-6">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Alt Başlık (Subtitle)</label>
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Ana Başlık</label>
            <textarea
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Açıklama</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Birincil Buton</label>
              <input
                type="text"
                value={form.ctaPrimary}
                onChange={(e) => setForm({ ...form, ctaPrimary: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">İkincil Buton</label>
              <input
                type="text"
                value={form.ctaSecondary}
                onChange={(e) => setForm({ ...form, ctaSecondary: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm hover:from-purple-500 hover:to-blue-500 transition-all duration-200 hover:scale-105 shadow-lg shadow-purple-500/25"
        >
          <Save size={16} />
          Kaydet
        </button>
      </div>
    </AdminLayout>
  );
}