import React, { useState, useEffect } from 'react';

interface Review {
  id: number;
  name: string;
  text: string;
  rating: number;
  createdAt: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [formData, setFormData] = useState({ name: '', text: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const fetchReviews = () => {
    fetch('/api/reviews/approved')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      fetchReviews();
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: '', text: '', rating: 5 });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 shrink-0 flex flex-col gap-4">
      <div>
        <h2 className="font-serif text-lg font-bold text-ayur-dark-green mb-3">Patient Reviews</h2>
        <div className="overflow-x-auto border border-slate-100 rounded-lg">
          <table className="w-full text-left text-[11px] text-slate-600">
            <thead className="bg-slate-50 text-[10px] uppercase text-slate-800 border-b border-slate-100">
              <tr>
                <th className="px-4 py-2 font-bold w-1/4">Patient Name</th>
                <th className="px-4 py-2 font-bold w-1/6">Rating</th>
                <th className="px-4 py-2 font-bold">Feedback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {testimonials.map((t, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-ayur-dark-green">{t.name}</td>
                  <td className="px-4 py-3 text-ayur-gold font-bold">{'★'.repeat(t.rating || 5)}{'☆'.repeat(5 - (t.rating || 5))}</td>
                  <td className="px-4 py-3 italic">"{t.text}"</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-ayur-green p-4 rounded-xl shadow-sm text-white">
        <h3 className="font-serif text-md font-bold mb-3">Submit a Review</h3>
        {submitted ? (
          <div className="text-center py-4">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-ayur-gold text-lg font-bold">✓</span>
            </div>
            <p className="text-xs font-bold text-ayur-gold">Review Submitted</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <label className="text-[10px] font-bold text-green-100 uppercase mb-1 block">Your Name</label>
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
              <label className="text-[10px] font-bold text-green-100 uppercase mb-1 block">Rating</label>
              <select 
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                className="w-full bg-white/10 border border-white/20 rounded px-2 py-1.5 text-[12px] text-white focus:outline-none focus:border-ayur-gold"
              >
                <option value="5" className="text-black">★★★★★ (5)</option>
                <option value="4" className="text-black">★★★★☆ (4)</option>
                <option value="3" className="text-black">★★★☆☆ (3)</option>
                <option value="2" className="text-black">★★☆☆☆ (2)</option>
                <option value="1" className="text-black">★☆☆☆☆ (1)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-green-100 uppercase mb-1 block">Your Feedback</label>
              <textarea 
                required 
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                className="w-full bg-white/10 border border-white/20 rounded px-2 py-1.5 text-[12px] placeholder:text-white/40 focus:outline-none focus:border-ayur-gold resize-none" 
                placeholder="Share your experience..."
                rows={2}
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-ayur-gold text-ayur-dark-green font-bold text-xs py-2 rounded mt-2 hover:bg-yellow-500 transition-colors">
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
