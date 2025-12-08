import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Home, Smartphone, Train, Zap, ArrowRight, Edit2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Signature } from '../ui/Signature';
import { useNavigate } from 'react-router-dom';
import { EditableContent } from '../ui/EditableContent';

interface TechPanelProps {
  title: string;
  icon: any;
  description: string;
  active: boolean;
  onClick: () => void;
  idPrefix: string;
}

const TechPanel = ({ title, icon: Icon, description, active, onClick, idPrefix }: TechPanelProps) => {
  const navigate = useNavigate();

  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/tech/${idPrefix}`);
  };

  return (
    <motion.div
      onClick={onClick}
      className={`group relative cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${active
        ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)]'
        : 'bg-white/5 border-white/10 hover:bg-white/10'
        }`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/tech/${idPrefix}`);
        }}
        className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 z-20 border border-white/10"
      >
        <Edit2 size={16} />
      </button>
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-lg ${active ? 'bg-blue-500' : 'bg-gray-700'}`}>
          <Icon className="text-white w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white">
          <EditableContent id={`${idPrefix}-title`} defaultContent={title} />
        </h3>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="text-blue-100 leading-relaxed mb-4">
              <EditableContent id={`${idPrefix}-desc`} defaultContent={description} multiline />
            </div>
            <button
              onClick={handleDetailClick}
              className="flex items-center gap-2 text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors"
            >
              View Details <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Tech = () => {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(() => {
    const saved = sessionStorage.getItem('tech_active_id');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    sessionStorage.setItem('tech_active_id', activeId.toString());
  }, [activeId]);

  const coreTechs = [
    {
      id: 1,
      title: t('tech.core.living.title'),
      icon: Home,
      description: t('tech.core.living.desc'),
      idPrefix: 'tech-living'
    },
    {
      id: 2,
      title: t('tech.core.smart.title'),
      icon: Smartphone,
      description: t('tech.core.smart.desc'),
      idPrefix: 'tech-smart'
    },
    {
      id: 3,
      title: t('tech.core.transport.title'),
      icon: Train,
      description: t('tech.core.transport.desc'),
      idPrefix: 'tech-transport'
    },
    {
      id: 4,
      title: t('tech.core.energy.title'),
      icon: Zap,
      description: t('tech.core.energy.desc'),
      idPrefix: 'tech-energy'
    }
  ];

  return (
    <section id="tech" className="min-h-screen py-20 relative z-10 flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4 group">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <EditableContent id="tech-title" defaultContent={t('tech.title')} />
            </h2>
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all text-white opacity-0 group-hover:opacity-100 border border-white/5">
              <Edit2 size={24} />
            </button>
          </div>
          <p className="text-xl text-blue-200">
            <EditableContent id="tech-subtitle" defaultContent={t('tech.subtitle')} multiline />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Core Tech */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-500 rounded-full" />
              <EditableContent id="tech-core-title" defaultContent={t('tech.core.title')} />
            </h3>
            <div className="space-y-4">
              {coreTechs.map((tech) => (
                <TechPanel
                  key={tech.id}
                  {...tech}
                  active={activeId === tech.id}
                  onClick={() => setActiveId(tech.id)}
                />
              ))}
            </div>
          </div>

          {/* Development Stages & Future */}
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-purple-500 rounded-full" />
                <EditableContent id="tech-stages-title" defaultContent={t('tech.stages.title')} />
              </h3>
              <div className="space-y-6">
                {[
                  { id: 's1', color: 'from-blue-500 to-cyan-500' },
                  { id: 's2', color: 'from-cyan-500 to-purple-500' },
                  { id: 's3', color: 'from-purple-500 to-pink-500' }
                ].map((stage) => (
                  <div key={stage.id} className="relative pl-8 border-l border-white/10">
                    <div className={`absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-gradient-to-r ${stage.color}`} />
                    <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                      <div className={`text-transparent bg-clip-text bg-gradient-to-r ${stage.color} font-bold mb-2`}>
                        <EditableContent id={`tech-stage-${stage.id}-year`} defaultContent={t(`tech.stages.${stage.id}.year`)} />
                      </div>
                      <div className="text-gray-300">
                        <EditableContent id={`tech-stage-${stage.id}-desc`} defaultContent={t(`tech.stages.${stage.id}.desc`)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Tech: Quantum Folding */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-pink-500 rounded-full" />
                <EditableContent id="tech-future-title" defaultContent={t('tech.future.title')} />
              </h3>
              <TechPanel
                title={t('tech.future.quantum.title')}
                icon={Cpu}
                description={t('tech.future.quantum.desc')}
                active={activeId === 0}
                onClick={() => setActiveId(0)}
                idPrefix="tech-quantum"
              />
            </div>
          </div>
        </div>

        <Signature />
      </div>
    </section>
  );
};
