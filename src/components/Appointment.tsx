import React, { useState } from 'react';
import { CalendarDays, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function Appointment() {
  const [formData, setFormData] = useState({ name: '', phone: '', date: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: '', phone: '', date: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-ayur-green p-4 rounded-xl shadow-sm text-white shrink-0">
      <h2 className="font-serif text-lg font-bold mb-3">Book Free Consultation</h2>
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-ayur-gold text-2xl font-bold">✓</span>
          </div>
          <p className="text-sm font-bold text-ayur-gold mb-1">Request Sent</p>
          <p className="text-[10px] text-green-100">We will contact you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div>
            <label className="text-[10px] font-bold text-green-100 uppercase mb-1 block">Full Name</label>
            <input 
              type="text" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white/10 border border-white/20 rounded px-2 py-1.5 text-[12px] placeholder:text-white/40 focus:outline-none focus:border-ayur-gold" 
              placeholder="e.g. John Doe" 
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-green-100 uppercase mb-1 block">Phone Number</label>
            <input 
              type="tel" 
              required 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-white/10 border border-white/20 rounded px-2 py-1.5 text-[12px] placeholder:text-white/40 focus:outline-none focus:border-ayur-gold" 
              placeholder="10-digit number" 
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-green-100 uppercase mb-1 block">Preferred Date</label>
            <input 
              type="date" 
              required 
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full bg-white/10 border border-white/20 rounded px-2 py-1.5 text-[12px] placeholder:text-white/40 focus:outline-none focus:border-ayur-gold" 
            />
          </div>
          <button type="submit" className="w-full bg-ayur-gold text-ayur-dark-green font-bold text-xs py-2 rounded mt-2 hover:bg-yellow-500 transition-colors">
            Confirm Free Booking
          </button>
        </form>
      )}
    </div>
  );
}
