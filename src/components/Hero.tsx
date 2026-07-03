import { Calendar, PhoneCall, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import doctorImage from '../assets/images/regenerated_image_1783003510107.jpg';

export default function Hero() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
        <div className="aspect-[4/5] w-full bg-slate-100 rounded-lg mb-4 flex items-center justify-center border-2 border-ayur-gold overflow-hidden relative shadow-inner">
          <img src={doctorImage} alt="Dr. Maheshwari Kanherkar" className="w-full h-full object-cover object-[center_30%]" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800'; }} />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg"></div>
        </div>
        <h2 className="font-serif text-xl font-bold text-ayur-dark-green">Dr. Maheshwari Kanherkar</h2>
        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          Dr. Maheshwari is a dedicated BAMS intern providing Ayurvedic lifestyle guidance, diet advice, and general health counseling with a focus on holistic wellbeing.
        </p>
        <div className="mt-4 space-y-2">
          <a href="https://wa.me/917030019036" className="w-full py-2 bg-ayur-dark-gold text-white rounded text-xs font-bold flex justify-center shadow">
            WhatsApp Inquiry
          </a>
          <a href="#book" className="w-full py-2 border-2 border-ayur-green text-ayur-green rounded text-xs font-bold flex justify-center">
            Book Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
