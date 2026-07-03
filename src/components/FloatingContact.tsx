import { MessageCircle, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-16 right-6 flex flex-col gap-3 z-50">
      <motion.a
        href="https://wa.me/917030019036"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer border-2 border-white relative group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={18} className="text-white" />
        <span className="absolute right-12 bg-white text-gray-800 text-[10px] font-bold px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
