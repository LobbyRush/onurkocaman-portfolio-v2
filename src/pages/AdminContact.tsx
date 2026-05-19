import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AdminContact() {
  const { data, updateContact } = usePortfolio();
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState(data.contact);

  useEffect(() => {
    setForm(data.contact);
  }, [data.contact]);

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
    updateContact(form);
    toast.success('İletişim bilgileri güncellendi!');
  };

  return (
    <AdminLayout title="İletişim" subtitle="İletişim bilgilerinizi düzenleyin">
      <div className="max-w-2xl space-y-6">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">E-posta Adresi</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">R10 Profil Linki</label>
            <input
              type="url"
              value={form.r10Link}
              onChange={(e) => setForm({ ...form, r10Link: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">R10 Etiket</label>
            <input
              type="text"
              value={form.r10Label}
              onChange={(e) => setForm({ ...form, r10Label: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
            />
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