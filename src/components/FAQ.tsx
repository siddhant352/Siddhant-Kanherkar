import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: "What is Ayurveda?",
    answer: "Ayurveda is a traditional system of medicine with historical roots in the Indian subcontinent."
  },
  {
    question: "Is online consultation available?",
    answer: "Yes, I provide 100% free online consultations for general health guidance."
  },
  {
    question: "What conditions can be discussed?",
    answer: "General health issues such as digestive problems, skin care, stress, and lifestyle diseases."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex-1">
      <h2 className="font-serif text-lg font-bold text-ayur-dark-green mb-3">FAQ</h2>
      <div className="flex flex-col gap-2">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-slate-100 rounded overflow-hidden">
            <button 
              className="w-full flex items-center justify-between p-2 text-[11px] font-bold text-slate-800 bg-slate-50"
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              <span>{faq.question}</span>
              {open === idx ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {open === idx && (
              <div className="p-2 text-[10px] text-slate-600 bg-white border-t border-slate-100">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
