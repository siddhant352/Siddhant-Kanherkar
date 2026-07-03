import { useState } from 'react';
import { Search, ArrowRight, BookOpen, ArrowLeft, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import immunityImg from '../assets/images/immunity_herbs_1783054151548.jpg';

const articles = [
  { 
    id: 1,
    title: "Importance of Ayurveda", 
    category: "Basics", 
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800", 
    desc: "Discover how Ayurveda balances body and mind.",
    content: {
      introduction: "Ayurveda, often called the 'Mother of All Healing', originated in India over 5,000 years ago. It stems from the ancient Vedic culture and was taught for many thousands of years in an oral tradition from accomplished masters to their disciples.",
      benefits: [
        "Encourages self-love and self-care",
        "Provides a holistic approach to health",
        "Helps in maintaining a healthy weight",
        "Reduces stress and promotes relaxation"
      ],
      scientific: "Modern science is increasingly recognizing the physiological benefits of Ayurvedic practices. Studies show that adaptogenic herbs like Ashwagandha can lower cortisol levels, while mindful practices like Yoga and Pranayama improve autonomic nervous system regulation.",
      lifestyle: "Wake up before sunrise, scrape your tongue, drink warm water with lemon, and practice mindful eating. Avoid iced drinks during meals to maintain your digestive fire (Agni)."
    }
  },
  { 
    id: 2,
    title: "Healthy Lifestyle Tips", 
    category: "Lifestyle", 
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800", 
    desc: "Simple habits for a healthier, happier life.",
    content: {
      introduction: "A healthy lifestyle in Ayurveda is about finding your unique balance. It's not a one-size-fits-all approach, but rather a continuous journey of tuning into your body's needs.",
      benefits: [
        "Increased daily energy levels",
        "Better sleep quality",
        "Improved mental clarity",
        "Stronger immune response"
      ],
      scientific: "Circadian biology aligns closely with Ayurvedic lifestyle principles. Eating your largest meal at noon corresponds with peak digestive enzyme production, and sleeping by 10 PM aligns with natural melatonin secretion cycles.",
      lifestyle: "Prioritize sleep, eat fresh seasonal foods, move your body daily, and take time for silence. Disconnect from screens at least one hour before bed."
    }
  },
  { 
    id: 3,
    title: "Daily Routine (Dinacharya)", 
    category: "Routine", 
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800", 
    desc: "Dinacharya practices for daily wellness.",
    content: {
      introduction: "Dinacharya is the Ayurvedic concept of a daily routine. Establishing a consistent daily rhythm helps regulate the biological clock, aids digestion, absorption, and assimilation, and generates self-esteem, discipline, peace, happiness, and longevity.",
      benefits: [
        "Synchronizes the body's rhythms with nature",
        "Improves digestion and elimination",
        "Calms the nervous system",
        "Builds self-discipline"
      ],
      scientific: "Regular routines help regulate the hypothalamic-pituitary-adrenal (HPA) axis, leading to more stable hormone levels and reduced baseline stress.",
      lifestyle: "Try waking up at the same time every day, preferably early. Start with tongue scraping and oil pulling, followed by a warm shower and 15 minutes of meditation before checking your phone."
    }
  },
  { 
    id: 4,
    title: "Immunity Building", 
    category: "Wellness", 
    image: immunityImg, 
    desc: "Natural ways to boost your immune system.",
    content: {
      introduction: "In Ayurveda, immunity is known as 'Ojas' – the subtle essence that gives the body strength, vigor, vitality, and immunity. When your digestion is strong and your mind is peaceful, your Ojas naturally flourishes.",
      benefits: [
        "Fewer seasonal illnesses",
        "Faster recovery times",
        "More stable energy",
        "Clearer skin"
      ],
      scientific: "Certain Ayurvedic herbs like Tulsi and Amla have been scientifically proven to have immunomodulatory effects, enhancing the activity of macrophages and natural killer cells.",
      lifestyle: "Include immune-boosting spices like turmeric, ginger, and black pepper in your cooking. Sip warm water throughout the day to help flush out toxins (Ama)."
    }
  }
];

export default function HealthLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: 'Check out this Ayurvedic article!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`Share link copied for: ${title}`);
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex-1 flex flex-col min-h-[300px]">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h2 className="font-serif text-lg font-bold text-ayur-dark-green">Health Library</h2>
          <div className="relative w-48">
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-2 py-1 rounded text-[12px] border border-slate-200 bg-slate-50 focus:outline-none focus:border-ayur-green"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto pr-1">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div key={article.id} onClick={() => setSelectedArticle(article)} className="flex flex-col border border-slate-100 rounded overflow-hidden hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="h-24 bg-slate-200 relative overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-2">
                  <p className="text-[11px] font-bold leading-tight text-ayur-dark-green">{article.title}</p>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{article.desc}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[9px] font-bold text-ayur-gold uppercase">{article.category}</span>
                    <span className="text-[10px] text-ayur-green font-semibold flex items-center gap-1">Read <ArrowRight size={10} /></span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 py-8 text-center text-slate-400 text-xs">
              No articles found.
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            <div className="max-w-3xl mx-auto min-h-screen flex flex-col bg-white">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
                <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-2 text-slate-600 hover:text-ayur-dark-green font-medium text-sm">
                  <ArrowLeft size={16} /> Back to Library
                </button>
                <button onClick={() => handleShare(selectedArticle.title)} className="p-2 text-slate-600 hover:text-ayur-green hover:bg-slate-50 rounded-full transition-colors" title="Share Article">
                  <Share2 size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-8">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-ayur-cream text-ayur-dark-green text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                    {selectedArticle.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4 leading-tight">{selectedArticle.title}</h1>
                  <p className="text-lg text-slate-600 font-medium">{selectedArticle.desc}</p>
                </div>
                
                <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden mb-10 shadow-sm border border-slate-100">
                  <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
                </div>

                <div className="max-w-none text-slate-700">
                  <section className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Introduction</h2>
                    <p className="text-slate-600 leading-relaxed">{selectedArticle.content.introduction}</p>
                  </section>

                  <section className="mb-10 bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <h2 className="text-xl font-serif font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <BookOpen size={20} className="text-ayur-green" /> 
                      Key Benefits
                    </h2>
                    <ul className="space-y-3">
                      {selectedArticle.content.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-700">
                          <span className="text-ayur-gold mt-1">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="mb-10">
                    <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Scientific Explanation</h2>
                    <p className="text-slate-600 leading-relaxed bg-blue-50/50 p-4 rounded-lg border-l-4 border-blue-200">
                      {selectedArticle.content.scientific}
                    </p>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Lifestyle Tips</h2>
                    <p className="text-slate-600 leading-relaxed">{selectedArticle.content.lifestyle}</p>
                  </section>
                </div>

                {/* Related Articles */}
                <div className="border-t border-slate-200 pt-10 pb-20">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Related Articles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {articles.filter(a => a.id !== selectedArticle.id).slice(0, 2).map(related => (
                      <div 
                        key={related.id} 
                        onClick={() => {
                          setSelectedArticle(related);
                          window.scrollTo(0,0);
                        }}
                        className="flex gap-4 border border-slate-100 rounded-lg p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <img src={related.image} alt={related.title} className="w-20 h-20 object-cover rounded-md" />
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm mb-1">{related.title}</h4>
                          <span className="text-xs text-ayur-green font-medium">{related.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
