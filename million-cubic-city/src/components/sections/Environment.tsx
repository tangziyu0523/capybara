import { motion } from 'framer-motion';
import { Building2, CheckCircle2, Edit2, Trees, Waves, Sun, Flower2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Signature } from '../ui/Signature';
import { useNavigate } from 'react-router-dom';

import { EditableContent } from '../ui/EditableContent';

export const Environment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const zones = [
    { id: 'environment-coral', transKey: 'coral', icon: Building2, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { id: 'environment-forest', transKey: 'forest', icon: Trees, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
    { id: 'environment-tidal', transKey: 'tidal', icon: Waves, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
    { id: 'environment-canyon', transKey: 'canyon', icon: Sun, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
    { id: 'environment-garden', transKey: 'garden', icon: Flower2, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  ];

  const principles = ['p1', 'p2', 'p3'];

  return (
    <section id="environment" className="min-h-screen py-20 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4 group">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <EditableContent id="environment-title" defaultContent={t('environment.title')} />
            </h2>
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all text-white opacity-0 group-hover:opacity-100 border border-white/5">
              <Edit2 size={24} />
            </button>
          </div>
          <p className="text-xl text-blue-300">
            <EditableContent id="environment-subtitle" defaultContent={t('environment.subtitle')} multiline />
          </p>
        </div>

        {/* Zoning Map / Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
          >
            <div className="flex items-center gap-4 mb-6 group">
              <h3 className="text-2xl font-bold text-white">
                <EditableContent id="environment-map-title" defaultContent={t('environment.mapTitle')} />
              </h3>
              <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all text-white opacity-0 group-hover:opacity-100 border border-white/5">
                <Edit2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  onClick={() => navigate(`/environment/${zone.id}`)}
                  className={`group relative p-6 rounded-xl border ${zone.bg} transition-transform hover:scale-105 cursor-pointer hover:shadow-lg hover:shadow-${zone.color.split('-')[1]}-500/20`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/environment/${zone.id}`);
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 z-20 border border-white/10"
                  >
                    <Edit2 size={16} />
                  </button>
                  <zone.icon className={`w-8 h-8 ${zone.color} mb-3`} />
                  <h4 className="text-white font-bold mb-2">
                    <EditableContent id={`${zone.id}-title`} defaultContent={t(`environment.zones.${zone.transKey}.title`)} />
                  </h4>
                  <div className="text-gray-400 text-sm">
                    <EditableContent id={`${zone.id}-desc`} defaultContent={t(`environment.zones.${zone.transKey}.desc`)} multiline />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Design Principles */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-white mb-8">{t('environment.principles.title')}</h3>
            <div className="space-y-6">
              {principles.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5"
                >
                  <CheckCircle2 className="text-green-400 w-6 h-6 flex-shrink-0" />
                  <span className="text-xl text-gray-200">{t(`environment.principles.${p}`)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <Signature />
      </div>
    </section>
  );
};
