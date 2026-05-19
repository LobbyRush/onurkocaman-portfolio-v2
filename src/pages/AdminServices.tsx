import React, { useState } from 'react';
import { Plus, Trash2, Save, Edit2, X, Check } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { usePortfolio, Service } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const iconOptions = ['Globe', 'Layout', 'LayoutDashboard', 'Brain', 'MessageSquare', 'Code', 'Cpu', 'Rocket'];

export default function AdminServices() {
  const { data, updateServices } = usePortfolio();
  const { isAuthenticated } = useAuth();
  const [services, setServices] = useState<Service[]>(data.services);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Service | null>(null);

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

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setEditForm({ ...service });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (!editForm) return;
    const updated = services.map((s) => (s.id === editForm.id ? editForm : s));
    setServices(updated);
    updateServices(updated);
    setEditingId(null);
    setEditForm(null);
    toast.success('Hizmet güncellendi!');
  };

  const deleteService = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    updateServices(updated);
    toast.success('Hizmet silindi!');
  };

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: 'Yeni Hizmet',
      description: 'Hizmet açıklaması buraya gelecek.',
      icon: 'Globe',
    };
    const updated = [...services, newService];
    setServices(updated);
    updateServices(updated);
    startEdit(newService);
  };

  return (
    <AdminLayout title="Hizmetler" subtitle="Hizmetlerinizi ekleyin, düzenleyin veya silin">
      <div className="space-y-4 max-w-3xl">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-6"
          >
            {editingId === service.id && editForm ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Başlık</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">İkon</label>
                    <select
                      value={editForm.icon}
                      onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                      className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Açıklama</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 resize-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={saveEdit}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500/15 border border-green-500/25 text-green-400 text-sm hover:bg-green-500/25 transition-all duration-200"
                  >
                    <Check size={14} />
                    Kaydet
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-white/10 transition-all duration-200"
                  >
                    <X size={14} />
                    İptal
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">{service.icon}</span>
                    <h3 className="text-white font-semibold text-sm">{service.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm">{service.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => startEdit(service)}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200"
                    aria-label="Düzenle"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => deleteService(service.id)}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-all duration-200"
                    aria-label="Sil"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addService}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-dashed border-white/15 text-gray-500 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-200 text-sm"
        >
          <Plus size={16} />
          Yeni Hizmet Ekle
        </button>
      </div>
    </AdminLayout>
  );
}