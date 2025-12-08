import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileText, Image as ImageIcon, Film, X, Send, MessageSquare, Layers, CheckCircle, AlertCircle, Box } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Comment {
  id: number;
  user: string;
  text: string;
  date: string;
  moduleId: string;
}

type ModuleId = 'story' | 'energy' | 'tech' | 'environment' | 'population' | 'models';

interface ModuleUploadState {
  file: File | null;
  preview: string | null;
  uploading: boolean;
  uploaded: boolean;
  auditStatus?: 'pending' | 'approved' | 'rejected';
}

const initialModuleState: ModuleUploadState = {
  file: null,
  preview: null,
  uploading: false,
  uploaded: false,
};

export const Upload = () => {
  const { t } = useTranslation();
  const [activeModule, setActiveModule] = useState<ModuleId>('story');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // State per module
  const [moduleStates, setModuleStates] = useState<Record<ModuleId, ModuleUploadState>>({
    story: { ...initialModuleState },
    energy: { ...initialModuleState },
    tech: { ...initialModuleState },
    environment: { ...initialModuleState },
    population: { ...initialModuleState },
    models: { ...initialModuleState },
  });

  // Mock Comments
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, user: 'NeoUser_01', text: 'Great data on the energy sector!', date: '2099-12-01', moduleId: 'energy' },
    { id: 2, user: 'EcoGuardian', text: 'The green coverage map is impressive.', date: '2099-12-02', moduleId: 'environment' },
    { id: 3, user: 'Historian_X', text: 'Looking forward to more archives.', date: '2099-12-03', moduleId: 'story' }
  ]);
  const [newComment, setNewComment] = useState('');

  const modules: ModuleId[] = ['story', 'energy', 'tech', 'environment', 'population', 'models'];

  const currentState = moduleStates[activeModule];

  const updateCurrentState = (updates: Partial<ModuleUploadState>) => {
    setModuleStates(prev => ({
      ...prev,
      [activeModule]: { ...prev[activeModule], ...updates }
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.size > 50 * 1024 * 1024) {
      alert("File too large (Max 50MB)");
      return;
    }

    const updates: Partial<ModuleUploadState> = {
      file,
      uploaded: false,
      preview: null,
      auditStatus: undefined
    };

    // Create preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCurrentState({ ...updates, preview: reader.result as string });
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
      updateCurrentState({ ...updates, preview: URL.createObjectURL(file) });
    } else {
      updateCurrentState(updates);
    }
  };

  const handleSubmit = () => {
    if (!currentState.file) return;

    updateCurrentState({ uploading: true });

    setTimeout(() => {
      updateCurrentState({
        uploading: false,
        uploaded: true,
        auditStatus: activeModule === 'models' ? 'pending' : undefined
      });
      if (activeModule !== 'models') {
        alert(`${t('upload.success')} (${t(`nav.${activeModule}`)})`);
      }
    }, 2000);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now(),
      user: 'Guest_User',
      text: newComment,
      date: new Date().toISOString().split('T')[0],
      moduleId: activeModule
    };
    setComments([...comments, comment]);
    setNewComment('');
  };

  const activeComments = comments.filter(c => c.moduleId === activeModule);
  const isModelModule = activeModule === 'models';

  return (
    <section id="upload" className="min-h-screen py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('upload.title')}</h2>
          <p className="text-xl text-blue-300">{t('upload.subtitle')}</p>
        </motion.div>

        {/* Module Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {modules.map((mod) => (
            <button
              key={mod}
              onClick={() => setActiveModule(mod)}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${activeModule === mod
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
            >
              {mod === 'models' ? <Box size={18} /> : <Layers size={18} />}
              {t(`nav.${mod}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Area */}
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-400 uppercase tracking-wider">
              {t('upload.currentModule')}: <span className="text-blue-400">{t(`nav.${activeModule}`)}</span>
            </div>

            <div className="mt-6">
              <div
                className={`relative h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
              >
                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                  accept={isModelModule ? ".obj,.gltf,.glb,.fbx" : "image/*,video/*,.pdf"}
                />
                {isModelModule ? <Box className="w-12 h-12 text-gray-400 mb-4" /> : <UploadIcon className="w-12 h-12 text-gray-400 mb-4" />}
                <p className="text-gray-300 text-lg mb-2">{t('upload.dropzone')}</p>
                <p className="text-gray-500 text-sm">{isModelModule ? t('upload.supports3d') : t('upload.supports')}</p>
              </div>

              {currentState.file && (
                <div className="mt-6 p-4 bg-white/5 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-3">
                    {isModelModule ? <Box className="text-purple-400" /> :
                      currentState.file.type.startsWith('image/') ? <ImageIcon className="text-blue-400" /> :
                        currentState.file.type.startsWith('video/') ? <Film className="text-red-400" /> :
                          <FileText className="text-gray-400" />}
                    <div>
                      <p className="text-white font-medium truncate max-w-[200px]">{currentState.file.name}</p>
                      <p className="text-gray-500 text-xs">{(currentState.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); updateCurrentState({ file: null, preview: null, uploaded: false, auditStatus: undefined }); }} className="p-2 hover:bg-white/10 rounded-full">
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              )}

              {/* Preview for images/video */}
              {currentState.preview && !isModelModule && (
                <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
                  {currentState.file?.type.startsWith('image/') ? (
                    <img src={currentState.preview} alt="Preview" className="w-full h-48 object-cover" />
                  ) : (
                    <video src={currentState.preview} controls className="w-full h-48 object-cover" />
                  )}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={!currentState.file || currentState.uploading || currentState.uploaded}
                className={`mt-6 w-full py-3 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${!currentState.file ? 'bg-gray-700 text-gray-500 cursor-not-allowed' :
                    currentState.uploading ? 'bg-blue-600 animate-pulse' :
                      currentState.uploaded ? 'bg-green-600/20 text-green-400 border border-green-500/50 cursor-default' :
                        'bg-blue-600 hover:bg-blue-500'
                  }`}
              >
                {currentState.uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : currentState.uploaded ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {currentState.auditStatus === 'pending' ? t('upload.audit') : t('upload.success')}
                  </>
                ) : (
                  t('upload.submit')
                )}
              </button>
            </div>
          </motion.div>

          {/* Comments Area */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 flex flex-col h-full"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <MessageSquare className="text-blue-400" /> {t('upload.comments')}
              <span className="text-sm font-normal text-gray-500 ml-2">({t(`nav.${activeModule}`)})</span>
            </h3>

            <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 max-h-[400px]">
              {activeComments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                  <AlertCircle className="w-12 h-12 mb-2 opacity-50" />
                  <p>{t('upload.noComments')}</p>
                </div>
              ) : (
                activeComments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 p-4 rounded-xl border border-white/5"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-blue-300">{comment.user}</span>
                      <span className="text-xs text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{comment.text}</p>
                  </motion.div>
                ))
              )}
            </div>

            <form onSubmit={handleCommentSubmit} className="relative">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={t('upload.placeholder')}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-colors"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-400 hover:text-blue-300 transition-colors disabled:text-gray-600 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
