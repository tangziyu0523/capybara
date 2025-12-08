import { motion } from 'framer-motion';
import { Clock, Flag, Rocket, Zap, Calendar, ArrowRight, Edit2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Signature } from '../ui/Signature';
import { EditableContent } from '../ui/EditableContent';

interface StoryCardProps {
  year: string;
  title: string;
  description: string;
  icon: any;
  index: number;
  idPrefix: string;
}

const StoryCard = ({ year, title, description, icon: Icon, index, idPrefix }: StoryCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:rotate-12">
      <Icon className="w-24 h-24" />
    </div>

    <Link
      to={`/archive/${idPrefix}`}
      className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 z-20 border border-white/10"
    >
      <Edit2 size={16} />
    </Link>

    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-xl bg-[var(--color-primary)] text-white shadow-lg">
          <Icon className="w-6 h-6" />
        </div>
        <EditableContent
          id={`${idPrefix}-year`}
          defaultContent={year}
          className="text-2xl font-bold text-[var(--color-secondary)] font-mono tracking-wider"
        />
      </div>

      <div className="text-2xl font-bold text-[var(--color-text)] mb-3 group-hover:text-[var(--color-accent)] transition-colors">
        <EditableContent
          id={`${idPrefix}-title`}
          defaultContent={title}
          type="span"
        />
      </div>

      <div className="text-[var(--color-text)] opacity-80 leading-relaxed mb-6">
        <EditableContent
          id={`${idPrefix}-desc`}
          defaultContent={description}
          type="div"
          multiline
        />
      </div>

      <Link
        to={`/archive/${idPrefix}`}
        className="inline-flex items-center gap-2 text-[var(--color-accent)] text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300"
      >
        <Calendar size={16} />
        <span>View Archives</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  </motion.div>
);

export const Story = () => {
  const { t } = useTranslation();

  const stories = [
    {
      year: '2015',
      title: t('story.items.foundation.title'),
      description: t('story.items.foundation.desc'),
      icon: Flag,
      idPrefix: 'story-foundation'
    },
    {
      year: '2020',
      title: t('story.items.energy.title'),
      description: t('story.items.energy.desc'),
      icon: Zap,
      idPrefix: 'story-energy'
    },
    {
      year: '2030',
      title: t('story.items.transport.title'),
      description: t('story.items.transport.desc'),
      icon: Rocket,
      idPrefix: 'story-transport'
    },
    {
      year: '2100',
      title: t('story.items.expansion.title'),
      description: t('story.items.expansion.desc'),
      icon: Flag,
      idPrefix: 'story-expansion'
    },
    {
      year: '2200',
      title: t('story.items.quantum.title'),
      description: t('story.items.quantum.desc'),
      icon: Clock,
      idPrefix: 'story-quantum'
    },
    {
      year: '2300',
      title: t('story.items.era.title'),
      description: t('story.items.era.desc'),
      icon: Clock,
      idPrefix: 'story-era'
    }
  ];

  return (
    <section id="story" className="min-h-screen py-20 relative z-10 flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6 group">
            <h2 className="text-5xl md:text-6xl font-bold text-[var(--color-text)] tracking-tight">
              <EditableContent id="story-main-title" defaultContent={t('story.title')} />
            </h2>
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all text-[var(--color-text)] opacity-0 group-hover:opacity-100 border border-white/5">
              <Edit2 size={24} />
            </button>
          </div>
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto rounded-full mb-6" />
          <p className="text-xl text-[var(--color-text)] opacity-70 max-w-2xl mx-auto">
            <EditableContent id="story-main-subtitle" defaultContent={t('story.subtitle')} multiline />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stories.map((story, index) => (
            <StoryCard key={story.year} {...story} index={index} />
          ))}
        </div>

        <Signature />
      </div>
    </section>
  );
};
