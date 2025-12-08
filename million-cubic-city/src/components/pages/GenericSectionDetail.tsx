import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Edit2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { MediaUpload, type MediaItem } from '../ui/MediaUpload';

interface GenericSectionDetailProps {
  sectionName: string;
}

const GenericSectionDetail: React.FC<GenericSectionDetailProps> = ({ sectionName }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { content, saveContent } = useContent();

  const titleKey = `${id}-title`;
  const contentKey = `${id}-content`;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const loadedTitle = content[titleKey] || id?.replace(/-/g, ' ').toUpperCase() || `${sectionName.toUpperCase()} DETAIL`;
    const loadedDesc = content[contentKey] || '';
    const savedMedia = localStorage.getItem(`${sectionName}_media_${id}`);
    // Legacy support
    const savedImages = localStorage.getItem(`${sectionName}_images_${id}`);

    setTitle(loadedTitle);
    setDescription(loadedDesc);

    if (savedMedia) {
      setMediaItems(JSON.parse(savedMedia));
    } else if (savedImages) {
      // Migrate legacy images
      try {
        const parsed = JSON.parse(savedImages);
        if (Array.isArray(parsed)) {
          setMediaItems(parsed.map((url: string) => ({
            url,
            type: 'image',
            name: 'Existing Image'
          })));
        }
      } catch (e) {
        console.error("Failed to migrate legacy images", e);
      }
    }
  }, [id, content, titleKey, contentKey, sectionName]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    setIsSaving(true);
    try {
      await saveContent(titleKey, title);
      await saveContent(contentKey, description, 'richtext');
      localStorage.setItem(`${sectionName}_media_${id}`, JSON.stringify(mediaItems));

      setShowSuccess(true);
      setTimeout(() => {
        setIsSaving(false);
        setShowSuccess(false);
        handleBack(); // Auto return after save
      }, 1000);
    } catch (error) {
      console.error("Failed to save", error);
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to discard changes?")) {
      handleBack();
    }
  };

  const handleBack = () => {
    navigate('/', { state: { target: `#${sectionName}` } });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24 relative">
      <button
        onClick={handleBack}
        className="fixed top-24 right-8 z-50 flex items-center gap-2 text-white/80 hover:text-white transition-all group bg-black/40 hover:bg-black/60 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 shadow-lg"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Return to City</span>
      </button>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1 mr-8">
              <div className="flex items-center gap-3 mb-2">
                <Edit2 size={20} className="text-blue-400" />
                <span className="text-sm text-blue-400 font-mono uppercase tracking-wider">Editing: {id}</span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent text-4xl font-bold text-white border-b border-transparent focus:border-blue-500 focus:outline-none pb-2 transition-all placeholder-gray-600"
                placeholder="Title"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-6 py-2 rounded-lg text-white font-medium transition-all flex items-center gap-2 shadow-lg ${isSaving ? 'bg-green-600 cursor-default' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20'
                  }`}
              >
                {isSaving ? (
                  <>
                    {showSuccess ? <CheckCircle size={18} /> : <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>}
                    {showSuccess ? 'Saved!' : 'Saving...'}
                  </>
                ) : (
                  <>
                    <Save size={18} /> Save Changes
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Visual Documentation</label>
            <MediaUpload items={mediaItems} onChange={setMediaItems} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-[400px] bg-black/20 border border-white/10 rounded-xl p-6 text-lg leading-relaxed text-gray-200 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none outline-none"
              placeholder="Enter details..."
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GenericSectionDetail;
