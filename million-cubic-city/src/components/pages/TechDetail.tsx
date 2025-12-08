import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { MediaUpload, type MediaItem } from '../ui/MediaUpload';

const TechDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { content, saveContent } = useContent();

  // Get tech data based on ID (in a real app, fetch from API/DB based on ID)
  // For now, we use the CMS content or defaults
  // Mapping ID to CMS keys
  const titleKey = `${id}-title`;
  // We use a separate key for detailed content
  const contentKey = `${id}-content`;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Load content
    const loadedTitle = content[titleKey] || id?.replace(/-/g, ' ').toUpperCase() || 'TECH DETAIL';
    const loadedDesc = content[contentKey] || '';
    // Try to load media from local storage for this tech item specifically
    const savedMedia = localStorage.getItem(`tech_media_${id}`);

    setTitle(loadedTitle);
    setDescription(loadedDesc);
    if (savedMedia) {
      setMediaItems(JSON.parse(savedMedia));
    }
  }, [id, content, titleKey, contentKey]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    setIsSaving(true);
    try {
      // Save text content via Context (which goes to DB)
      await saveContent(titleKey, title);
      await saveContent(contentKey, description, 'richtext');

      // Save media to local storage for now (demo purpose)
      localStorage.setItem(`tech_media_${id}`, JSON.stringify(mediaItems));

      setShowSuccess(true);
      setTimeout(() => {
        setIsSaving(false);
        setShowSuccess(false);
        handleBack();
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
    navigate('/', { state: { target: '#tech' } });
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
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent text-4xl font-bold text-white border-b border-transparent focus:border-blue-500 focus:outline-none pb-2 transition-all placeholder-gray-600"
                placeholder="Tech Title"
              />
              <p className="text-blue-400 text-sm mt-2 font-mono">ID: {id}</p>
            </div>
            <div className="flex items-center gap-4">
              {showSuccess && <span className="text-green-400 text-sm font-bold animate-pulse">Saved Successfully!</span>}
              <span className={`text-sm ${isSaving ? 'text-blue-400' : 'text-gray-500'} transition-colors`}>
                {isSaving ? 'Saving...' : 'Changes not saved'}
              </span>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 border border-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20"
              >
                <Save size={18} /> Save
              </button>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Visual Documentation</label>
            <MediaUpload items={mediaItems} onChange={setMediaItems} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Technical Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-[400px] bg-black/20 border border-white/10 rounded-xl p-6 text-lg leading-relaxed text-gray-200 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none outline-none"
              placeholder="Enter detailed technical specifications..."
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TechDetail;
