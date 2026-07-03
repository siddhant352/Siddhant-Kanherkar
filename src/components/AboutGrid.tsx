import { CheckCircle2, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutGrid() {
  return (
    <div className="bg-[#fffbea] p-4 rounded-xl border border-[#f0e4b8] flex-1">
      <h3 className="text-[10px] font-bold text-ayur-brown uppercase tracking-tighter mb-2 italic">Medical Disclaimer</h3>
      <p className="text-[10px] text-ayur-brown leading-tight">
        The information provided is for educational purposes only. Not a substitute for in-person diagnosis. In case of emergency, contact local medical services immediately.
      </p>
    </div>
  );
}
