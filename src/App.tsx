/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import AboutGrid from './components/AboutGrid';
import Stats from './components/Stats';
import HealthLibrary from './components/HealthLibrary';
import Appointment from './components/Appointment';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import AdminDashboard from './components/AdminDashboard';
import { useAuth } from './context/AuthContext';
import { useState, useEffect } from 'react';

export default function App() {
  const { user, login, loading } = useAuth();
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.pathname === '/admin');

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(window.location.pathname === '/admin');
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (isAdminRoute) {
    if (loading) return <div className="p-8 text-center">Loading...</div>;
    return (
      <div className="h-full bg-slate-50 font-sans flex flex-col overflow-hidden text-slate-800">
        <Navbar />
        <main className="flex-1 p-8 overflow-y-auto max-w-5xl mx-auto w-full">
          {!user ? (
            <div className="p-8 bg-white rounded-xl shadow mt-12 max-w-sm mx-auto">
              <h2 className="text-xl font-bold mb-6 text-center text-ayur-dark-green">Admin Login</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                login(form.email.value, form.password.value);
              }} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Email</label>
                  <input type="email" name="email" required className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-ayur-green" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Password</label>
                  <input type="password" name="password" required className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-ayur-green" />
                </div>
                <button type="submit" className="w-full bg-ayur-green text-white py-2 rounded font-bold hover:bg-ayur-dark-green transition-colors mt-2">Login</button>
              </form>
            </div>
          ) : (
            <AdminDashboard />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="h-full bg-ayur-cream font-sans flex flex-col text-slate-800">
      <Navbar />
      <main className="flex-1 overflow-y-auto p-4 flex flex-col lg:flex-row gap-4 scroll-smooth">
        {/* Left Column */}
        <div className="w-full lg:w-[260px] flex flex-col gap-4 shrink-0 pb-12" id="home">
          <Hero />
          <div id="about">
            <AboutGrid />
          </div>
        </div>
        
        {/* Middle Column */}
        <div className="flex-1 flex flex-col gap-4 pb-12">
          <Stats />
          <div id="services">
            <Services />
          </div>
          <div id="library">
            <HealthLibrary />
          </div>
          <Testimonials />
        </div>
        
        {/* Right Column */}
        <div className="w-full lg:w-[320px] flex flex-col gap-4 shrink-0 pb-12">
          <div id="contact">
            <Appointment />
          </div>
          <div id="faq">
            <FAQ />
          </div>
        </div>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
