import React, { useState } from 'react';
import { Plus, Trash2, Edit2, X, Check, Image } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { usePortfolio, Project } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AdminProjects() {
  const { data, updateProjects } = usePortfolio();
  const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<Project[]>(data.projects);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Project | null>(null);

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

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setEditForm({ ...project, tags: [...project.tags] });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (!editForm) return;
    const updated = projects.map((p) => (p.id === editForm.id ? editForm : p));
    setProjects(updated);
    updateProjects(updated);
    setEditingId(null);
    setEditForm(null);
    toast.success('Proje güncellendi!');
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    updateProjects(updated);
    toast.success('Proje silindi!');
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'Yeni Proje',
      description: 'Proje açıklaması.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop',
      tags: ['React'],
      link: '#',
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    updateProjects(updated);
    startEdit(newProject);
  };

  const updateTag = (index: number, value: string) => {
    if (!editForm) return;
    const tags = [...editForm.tags];
    tags[index] = value;
    setEditForm({ ...editForm, tags });
  };

  const addTag = () => {
    if (!editForm) return;
    setEditForm({ ...editForm, tags: [...editForm.tags, 'Tag'] });
  };

  const removeTag = (index: number) => {
    if (!editForm) return;
    setEditForm({ ...editForm, tags: editForm.tags.filter((_, i) => i !== index) });
  };

  return (
    <AdminLayout title="Projeler" subtitle="Projelerinizi ekleyin, düzenleyin veya silin">
      <div className="space-y-4 max-w-3xl">
        {projects.map((project) => (
          <div key={project.id} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
            {editingId === project.id && editForm ? (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Proje Adı</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Link</label>
                    <input
                      type="text"
                      value={editForm.link || ''}
                      onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                    />
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
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Görsel URL</label>
                  <div className="flex items-center gap-2">
                    <Image size={14} className="text-gray-500 flex-shrink-0" />
                    <input
                      type="text"
                      value={editForm.image}
                      onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-gray-500">Etiketler</label>
                    <button onClick={addTag} className="text-xs text-purple-400 hover:text-purple-300 transition-colors duration-200">+ Ekle</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editForm.tags.map((tag, i) => (
                      <div key={i} className="flex items-center gap-1 bg-purple-500/10 border border-purple-500/20 rounded-full px-2 py-1">
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) => updateTag(i, e.target.value)}
                          className="bg-transparent text-purple-400 text-xs w-16 focus:outline-none"
                        />
                        <button onClick={() => removeTag(i)} className="text-purple-600 hover:text-red-400 transition-colors duration-200">
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
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
              <div className="flex items-center gap-4 p-4">
                <img
                  src={project.image}
                  alt={`${project.title} görseli`}
                  width={80}
                  height={60}
                  className="w-20 h-14 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm truncate">{project.title}</h3>
                  <p className="text-gray-500 text-xs truncate mt-0.5">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => startEdit(project)}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200"
                    aria-label="Düzenle"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
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
          onClick={addProject}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-dashed border-white/15 text-gray-500 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-200 text-sm"
        >
          <Plus size={16} />
          Yeni Proje Ekle
        </button>
      </div>
    </AdminLayout>
  );
}