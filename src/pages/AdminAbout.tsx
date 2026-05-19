import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AdminAbout() {
  const { data, updateAbout } = usePortfolio();
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState(data.about);

  useEffect(() => {
    setForm(data.about);
  }, [data.about]);

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
    updateAbout(form);
    toast.success('Hakkımda bölümü güncellendi!');
  };

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    const newStats = [...form.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setForm({ ...form, stats: newStats });
  };

  const addStat = () => {
    setForm({ ...form, stats: [...form.stats, { label: 'Yeni İstatistik', value: '0' }] });
  };

  const removeStat = (index: number) => {
    setForm({ ...form, stats: form.stats.filter((_, i) => i !== index) });
  };

  return (
    <AdminLayout title="Hakkımda" subtitle="Hakkımda bölümü içeriğini düzenleyin">
      <div className="max-w-2xl space-y-6">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Başlık</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Açıklama</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 resize-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-400">İstatistikler</label>
              <button
                onClick={addStat}
                className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors duration-200"
              >
                <Plus size={14} />
                Ekle
              </button>
            </div>
            <div className="space-y-3">
              {form.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(i, 'value', e.target.value)}
                    placeholder="Değer"
                    className="w-24 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStat(i, 'label', e.target.value)}
                    placeholder="Etiket"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                  />
                  <button
                    onClick={() => removeStat(i)}
                    className="text-gray-600 hover:text-red-400 transition-colors duration-200"
                    aria-label="İstatistiği sil"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
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