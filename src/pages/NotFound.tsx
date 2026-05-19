import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Zap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl" />
      </div>
      <div className="relative text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30">
          <Zap size={28} className="text-white" />
        </div>
        <h1 className="font-heading text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">404</h1>
        <h2 className="font-heading text-2xl font-bold text-white mb-3">Sayfa Bulunamadı</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto text-sm">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm hover:from-purple-500 hover:to-blue-500 hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/25"
        >
          <Home size={16} />
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}