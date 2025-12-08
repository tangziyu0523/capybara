import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Image as ImageIcon, X, Check } from 'lucide-react';

export const Signature = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (text || image) {
      setSubmitted(true);
    }
  };

  return (
    <div className="mt-12 border-t border-white/10 pt-8">
      {!submitted ? (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-medium text-gray-300 mb-4 flex items-center gap-2">
            <PenTool size={18} />
            Sign this module
          </h3>

          <div className="space-y-4">
            <div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 100))}
                placeholder="Leave your mark (Max 100 chars)..."
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none h-24"
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {text.length}/100
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <ImageIcon size={16} />
                  {image ? 'Change Image' : 'Add Image'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {image && (
                  <div className="relative w-10 h-10 rounded overflow-hidden border border-white/20 group">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={(e) => { e.stopPropagation(); setImage(null); }}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} className="text-white" />
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={!text && !image}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign
              </button>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-start gap-4"
        >
          <div className="bg-green-500/20 p-2 rounded-full">
            <Check size={20} className="text-green-400" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-400 mb-1">Signed by Guest</div>
            {text && <p className="text-white text-lg font-handwriting mb-2">"{text}"</p>}
            {image && (
              <div className="w-32 h-32 rounded-lg overflow-hidden border border-white/10">
                <img src={image} alt="Signature" className="w-full h-full object-cover" />
              </div>
            )}
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-gray-500 hover:text-white mt-4 underline"
            >
              Edit Signature
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
