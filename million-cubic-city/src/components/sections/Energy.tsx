import { motion } from 'framer-motion';
import { Battery, Zap, Sun, Wind, Edit2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Signature } from '../ui/Signature';
import { EditableContent } from '../ui/EditableContent';
import { useNavigate } from 'react-router-dom';

interface StatCardProps {
  icon: any;
  label: string;
  value: string;
  color: string;
  idPrefix: string;
}

const StatCard = ({ icon: Icon, label, value, color, idPrefix }: StatCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={() => navigate(`/energy/${idPrefix}`)}
      className="group relative bg-black/40 backdrop-blur-lg p-6 rounded-2xl border border-white/10 cursor-pointer hover:border-blue-500/50 transition-colors"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/energy/${idPrefix}`);
        }}
        className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 z-20 border border-white/10"
      >
        <Edit2 size={16} />
      </button>
      <div className={`inline-flex p-3 rounded-lg ${color} bg-opacity-20 mb-4`}>
        <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div className="text-3xl font-bold text-white mb-1">
        <EditableContent id={`${idPrefix}-value`} defaultContent={value} />
      </div>
      <div className="text-gray-400">
        <EditableContent id={`${idPrefix}-title`} defaultContent={label} />
      </div>
    </motion.div>
  );
};

export const Energy = () => {
  const { t } = useTranslation();

  return (
    <section id="energy" className="min-h-screen py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4 group">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <EditableContent id="energy-title" defaultContent={t('energy.title')} />
            </h2>
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all text-white opacity-0 group-hover:opacity-100 border border-white/5">
              <Edit2 size={24} />
            </button>
          </div>
          <p className="text-xl text-green-300">
            <EditableContent id="energy-subtitle" defaultContent={t('energy.subtitle')} multiline />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={Zap} label={t('energy.stats.output')} value="28,088 MWh" color="bg-yellow-500" idPrefix="energy-stat-output" />
          <StatCard icon={Sun} label={t('energy.stats.solar')} value="11,987 kWh" color="bg-orange-500" idPrefix="energy-stat-solar" />
          <StatCard icon={Wind} label={t('energy.stats.aero')} value="33,670 kWh" color="bg-blue-500" idPrefix="energy-stat-aero" />
          <StatCard icon={Battery} label={t('energy.stats.storage')} value="50,000 MWh" color="bg-green-500" idPrefix="energy-stat-storage" />
        </div>

        <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
          <div className="flex items-center gap-4 mb-6 group">
            <h3 className="text-2xl font-bold text-white">
              <EditableContent id="energy-dist-title" defaultContent={t('energy.distribution.title')} />
            </h3>
            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all text-white opacity-0 group-hover:opacity-100 border border-white/5">
              <Edit2 size={16} />
            </button>
          </div>
          <div className="space-y-6">
            {[
              { label: t('energy.distribution.solar_nuclear'), val: 75.26, color: 'bg-yellow-500', id: 'dist-solar' },
              { label: t('energy.distribution.wind'), val: 16.49, color: 'bg-blue-500', id: 'dist-wind' },
              { label: t('energy.distribution.tidal'), val: 8.25, color: 'bg-cyan-500', id: 'dist-tidal' },
              { label: t('energy.distribution.geo'), val: 0, color: 'bg-red-500', id: 'dist-geo', text: 'Heating Only' },
            ].map((item) => (
              <div key={item.id}>
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <EditableContent id={`energy-${item.id}-label`} defaultContent={item.label} />
                  <span>{item.text || `${item.val}%`}</span>
                </div>
                <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.val || 100}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-blue-200 text-sm leading-relaxed">
              <EditableContent id="energy-future-desc" defaultContent={t('energy.future')} multiline />
            </p>
          </div>
        </div>

        <Signature />
      </div>
    </section>
  );
};
