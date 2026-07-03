import { Phone, MessageCircle, MapPin, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="h-12 bg-ayur-dark-green text-white px-6 flex items-center justify-between text-[11px] shrink-0 z-10">
      <p>© 2026 Dr. Maheshwari Kanherkar. BAMS Intern. All Rights Reserved.</p>
      <div className="flex gap-4 items-center">
        <a href="https://instagram.com/arogyam.ayurveda_" target="_blank" rel="noreferrer" className="hover:text-ayur-gold transition-colors font-medium">
          Instagram: @arogyam.ayurveda_
        </a>
        <a href="/admin" className="hover:text-ayur-gold transition-colors font-medium text-white/70">
          Admin Panel
        </a>
        <span className="text-ayur-gold font-bold ml-4 border-l border-white/20 pl-4">Emergency: 102 / 108</span>
      </div>
    </footer>
  );
}
