import { motion } from 'framer-motion';
import { Users, Smile, Briefcase, GraduationCap, Edit2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Signature } from '../ui/Signature';
import { EditableContent } from '../ui/EditableContent';

export const Population = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section id="population" className="min-h-screen py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4 group">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <EditableContent id="population-title" defaultContent={t('population.title')} />
            </h2>
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all text-white opacity-0 group-hover:opacity-100 border border-white/5">
              <Edit2 size={24} />
            </button>
          </div>
          <p className="text-xl text-purple-300">
            <EditableContent id="population-subtitle" defaultContent={t('population.subtitle')} multiline />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* ... existing content ... */}
          <div
            onClick={() => navigate('/population/population-stats')}
            className="group relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 cursor-pointer hover:border-purple-500/50 transition-colors"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate('/population/population-stats');
              }}
              className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 z-20 border border-white/10"
            >
              <Edit2 size={16} />
            </button>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Users className="text-purple-400" />
              <EditableContent id="population-stats-title" defaultContent={t('population.total')} />: 2048
            </h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <EditableContent id="population-infants-label" defaultContent={t('population.types.infants')} />
                  <span>86</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '4.2%' }} className="h-full bg-purple-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <EditableContent id="population-students-label" defaultContent={t('population.types.students')} />
                  <span>462</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '22.6%' }} className="h-full bg-blue-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <EditableContent id="population-young-label" defaultContent={t('population.types.young_workers')} />
                  <span>301</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '14.7%' }} className="h-full bg-green-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <EditableContent id="population-mid-label" defaultContent={t('population.types.mid_workers')} />
                  <span>698</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '34.1%' }} className="h-full bg-yellow-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <EditableContent id="population-retirees-label" defaultContent={t('population.types.retirees')} />
                  <span>144</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '7.0%' }} className="h-full bg-red-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Happiness / Work */}
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => navigate('/population/population-happiness')}
              className="group relative bg-gradient-to-br from-purple-900/40 to-black/40 p-6 rounded-2xl border border-purple-500/30 flex flex-col justify-center items-center text-center cursor-pointer"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/population/population-happiness');
                }}
                className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 z-20 border border-white/10"
              >
                <Edit2 size={16} />
              </button>
              <Smile className="w-12 h-12 text-yellow-400 mb-4" />
              <div className="text-3xl font-bold text-white">9.2/10</div>
              <div className="text-sm text-gray-400">
                <EditableContent id="population-happiness-title" defaultContent={t('population.stats.happiness')} />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => navigate('/population/population-employment')}
              className="group relative bg-gradient-to-br from-blue-900/40 to-black/40 p-6 rounded-2xl border border-blue-500/30 flex flex-col justify-center items-center text-center cursor-pointer"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/population/population-employment');
                }}
                className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 z-20 border border-white/10"
              >
                <Edit2 size={16} />
              </button>
              <Briefcase className="w-12 h-12 text-blue-400 mb-4" />
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-sm text-gray-400">
                <EditableContent id="population-employment-title" defaultContent={t('population.stats.employment')} />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              onClick={() => navigate('/population/population-literacy')}
              className="group relative col-span-2 bg-gradient-to-br from-green-900/40 to-black/40 p-6 rounded-2xl border border-green-500/30 flex items-center justify-between px-10 cursor-pointer"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/population/population-literacy');
                }}
                className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 z-20 border border-white/10"
              >
                <Edit2 size={16} />
              </button>
              <div className="text-left">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-400">
                  <EditableContent id="population-literacy-title" defaultContent={t('population.stats.literacy')} />
                </div>
              </div>
              <GraduationCap className="w-16 h-16 text-green-400" />
            </motion.div>
          </div>
        </div>

        <Signature />
      </div>
    </section>
  );
};
