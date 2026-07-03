import { useState } from 'react';
import { 
  ThermometerSun, 
  Stethoscope, 
  Sparkles, 
  Brain, 
  Activity,
  ArrowLeft,
  CheckCircle,
  Clock,
  HeartPulse
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const services = [
  { 
    id: 1,
    icon: ThermometerSun, 
    name: "Fever & Cold",
    shortDesc: "Natural relief for seasonal illnesses.",
    description: "Ayurveda views fever (Jwara) as a symptom of toxins (Ama) accumulating in the body and disrupting the balance of doshas, primarily Pitta. Our approach focuses on flushing out these toxins and strengthening the body's natural defense mechanism.",
    symptoms: ["Chronic cold", "Seasonal allergies", "Viral infections", "Low immunity"],
    treatment: ["Customized herbal decoctions (Kashayam)", "Dietary modifications to reduce Kapha", "Steam inhalation therapies", "Immunity-boosting supplements"],
    duration: "Typically 1-2 weeks for acute conditions"
  },
  { 
    id: 2,
    icon: Stethoscope, 
    name: "Digestive Issues",
    shortDesc: "Balance your gut health (Agni).",
    description: "Digestive fire (Agni) is the root of all health in Ayurveda. When Agni is weak or erratic, it leads to the formation of toxins (Ama). We offer comprehensive treatments to restore your digestive capacity.",
    symptoms: ["Acidity & Heartburn", "Irritable Bowel Syndrome (IBS)", "Chronic Constipation", "Bloating & Gas"],
    treatment: ["Deepana-Pachana (Digestive herbs)", "Panchakarma (Detoxification)", "Personalized diet charts", "Lifestyle counseling"],
    duration: "Varies; 4-12 weeks for chronic issues"
  },
  { 
    id: 3,
    icon: Sparkles, 
    name: "Skin & Hair",
    shortDesc: "Radiance from within.",
    description: "Skin and hair health is a direct reflection of your internal blood (Rakta) and plasma (Rasa) tissues. We treat dermatological and hair issues by purifying the blood and balancing Pitta dosha.",
    symptoms: ["Acne & Pimples", "Hair fall & Dandruff", "Eczema & Psoriasis", "Pigmentation"],
    treatment: ["Blood purifying herbs (Rakta Shodhaka)", "External lepams (herbal pastes)", "Shirodhara for stress-induced hair fall", "Nasya therapy"],
    duration: "3-6 months for sustainable results"
  },
  { 
    id: 4,
    icon: Brain, 
    name: "Stress & Anxiety",
    shortDesc: "Calm your mind and nervous system.",
    description: "Mental health issues often stem from an aggravated Vata dosha affecting the mind (Manovaha Srotas). Our therapies deeply relax the nervous system and promote emotional resilience.",
    symptoms: ["Insomnia", "Anxiety & Panic attacks", "Chronic stress", "Depression"],
    treatment: ["Shirodhara (Oil pouring on forehead)", "Medhya Rasayana (Brain tonics)", "Pranayama & Meditation guidance", "Abhyanga (Full body massage)"],
    duration: "Ongoing management; initial intensive 14-day program"
  },
  { 
    id: 5,
    icon: HeartPulse, 
    name: "Women's Health",
    shortDesc: "Holistic care for all stages of life.",
    description: "Ayurveda offers profound solutions for gynecological disorders by balancing the Apana Vata (downward moving energy) and nourishing the reproductive tissues (Artava Dhatu).",
    symptoms: ["PCOS & PCOD", "Irregular periods", "Menopause transition", "Infertility support"],
    treatment: ["Hormone-balancing herbs (Shatavari, Ashoka)", "Basti (Medicated enema therapy)", "Dietary guidelines for hormonal health", "Stress management protocols"],
    duration: "3-6 months for regulating cycles"
  },
  { 
    id: 6,
    icon: Activity, 
    name: "Lifestyle Diseases",
    shortDesc: "Manage modern ailments naturally.",
    description: "Conditions like diabetes, hypertension, and obesity are classified as lifestyle disorders (Pathya-Apathya issues). Reversing them requires a fundamental shift in daily habits and targeted metabolic support.",
    symptoms: ["Type 2 Diabetes", "Hypertension", "Obesity & Weight Management", "Thyroid imbalances"],
    treatment: ["Metabolism-correcting formulations", "Strict diet and lifestyle restructuring", "Panchakarma for deep cellular detox", "Daily Yoga and physical activity plans"],
    duration: "Long-term management and lifestyle overhaul"
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-serif text-lg font-bold text-ayur-dark-green">Specialized Services</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                onClick={() => setSelectedService(service)}
                className="p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-100 hover:border-ayur-green/30 group flex flex-col items-start gap-2"
              >
                <div className="p-2 bg-white rounded-md shadow-sm text-ayur-green group-hover:bg-ayur-green group-hover:text-white transition-colors">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{service.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{service.shortDesc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            <div className="max-w-3xl mx-auto min-h-screen flex flex-col bg-white">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center">
                <button onClick={() => setSelectedService(null)} className="flex items-center gap-2 text-slate-600 hover:text-ayur-dark-green font-medium text-sm">
                  <ArrowLeft size={16} /> Back to Services
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-ayur-cream rounded-xl text-ayur-green">
                    <selectedService.icon size={32} />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">{selectedService.name}</h1>
                    <p className="text-lg text-slate-600 font-medium mt-2">{selectedService.shortDesc}</p>
                  </div>
                </div>

                <div className="max-w-none text-slate-700">
                  <section className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Overview</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">{selectedService.description}</p>
                  </section>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <h2 className="text-xl font-serif font-bold text-slate-800 mb-4 flex items-center gap-2">
                         Common Symptoms We Treat
                      </h2>
                      <ul className="space-y-3">
                        {selectedService.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-700 font-medium">
                            <span className="text-red-400 mt-1">•</span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="bg-green-50 p-6 rounded-xl border border-green-100">
                      <h2 className="text-xl font-serif font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <CheckCircle size={20} className="text-green-600" /> 
                        Our Treatment Approach
                      </h2>
                      <ul className="space-y-3">
                        {selectedService.treatment.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-700 font-medium">
                            <span className="text-green-600 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  <section className="flex items-center gap-3 p-4 bg-ayur-cream rounded-lg text-ayur-dark-green font-medium">
                    <Clock size={20} />
                    <span><strong>Expected Duration:</strong> {selectedService.duration}</span>
                  </section>
                </div>
                
                <div className="mt-12 text-center">
                  <button 
                    onClick={() => {
                       setSelectedService(null);
                       setTimeout(() => {
                         document.getElementById('appointment-section')?.scrollIntoView({ behavior: 'smooth' });
                       }, 300);
                    }}
                    className="px-8 py-4 bg-ayur-green text-white font-bold rounded-lg shadow-md hover:bg-ayur-dark-green transition-colors"
                  >
                    Book a Consultation for {selectedService.name}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
