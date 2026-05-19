import React, { Suspense, lazy } from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';

import { PortfolioProvider } from './src/context/PortfolioContext';
import { AuthProvider } from './src/context/AuthContext';

import Home from './src/pages/Home';
import NotFound from './src/pages/NotFound';

const AdminLogin = lazy(() => import('./src/pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./src/pages/AdminDashboard'));
const AdminHero = lazy(() => import('./src/pages/AdminHero'));
const AdminAbout = lazy(() => import('./src/pages/AdminAbout'));
const AdminServices = lazy(() => import('./src/pages/AdminServices'));
const AdminProjects = lazy(() => import('./src/pages/AdminProjects'));
const AdminContact = lazy(() => import('./src/pages/AdminContact'));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Theme appearance="dark" radius="large" scaling="100%">
          <Router>
            <Suspense fallback={
              <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/hero" element={<AdminHero />} />
                <Route path="/admin/about" element={<AdminAbout />} />
                <Route path="/admin/services" element={<AdminServices />} />
                <Route path="/admin/projects" element={<AdminProjects />} />
                <Route path="/admin/contact" element={<AdminContact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              newestOnTop
              closeOnClick
              pauseOnHover
              theme="dark"
              toastStyle={{ background: '#1a1a2e', border: '1px solid rgba(139,92,246,0.2)', color: '#fff' }}
            />
          </Router>
        </Theme>
      </PortfolioProvider>
    </AuthProvider>
  );
};

export default App;