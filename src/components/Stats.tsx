import { Users, HeartPulse } from 'lucide-react';

const stats = [
  { label: 'Happy Patients', value: '50+', icon: Users },
  { label: 'Consultation Fee', value: 'FREE', icon: HeartPulse }
];

export default function Stats() {
  return (
    <div className="bg-ayur-dark-green rounded-xl p-3 flex justify-between items-center text-white shrink-0 shadow-sm overflow-hidden">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex flex-col items-center flex-1 border-r border-white/10 last:border-r-0">
          <stat.icon size={16} className="text-ayur-gold mb-1" />
          <span className="text-[14px] font-bold">{stat.value}</span>
          <span className="text-[9px] uppercase tracking-wider text-green-200">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

