import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Video, Box, FileText, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MediaItem {
  url: string;
  type: 'image' | 'video' | 'model' | 'file';
  name: string;
  size?: number;
}

interface MediaUploadProps {
  items: MediaItem[];
  onChange: (items: MediaItem[]) => void;
  maxSizeMB?: {
    image: number;
    video: number;
    model: number;
    file: number;
  };
}

const DEFAULT_LIMITS = {
  image: 10,
  video: 500,
  model: 100,
  file: 50
};

export const MediaUpload: React.FC<MediaUploadProps> = ({ 
  items, 
  onChange, 
  maxSizeMB = DEFAULT_LIMITS 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): { valid: boolean; type?: MediaItem['type']; error?: string } => {
    const sizeMB = file.size / (1024 * 1024);
    let type: MediaItem['type'] | undefined;

    if (file.type.startsWith('image/')) type = 'image';
    else if (file.type.startsWith('video/')) type = 'video';
    else if (file.name.match(/\.(obj|gltf|glb|fbx)$/i)) type = 'model';
    else if (file.name.match(/\.(pdf|doc|docx|xls|xlsx)$/i)) type = 'file';

    if (!type) return { valid: false, error: 'Unsupported file format' };

    if (sizeMB > maxSizeMB[type]) {
      return { valid: false, error: `File too large (Max ${maxSizeMB[type]}MB)` };
    }

    return { valid: true, type };
  };

  const processFiles = async (files: FileList | File[]) => {
    setUploading(true);
    setError(null);
    const newItems: MediaItem[] = [];

    for (const file of Array.from(files)) {
      const validation = validateFile(file);
      if (!validation.valid) {
        setError(`${file.name}: ${validation.error}`);
        continue;
      }

      try {
        const result = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        newItems.push({
          url: result,
          type: validation.type!,
          name: file.name,
          size: file.size
        });
      } catch (e) {
        console.error(e);
        setError(`Failed to process ${file.name}`);
      }
    }

    setUploading(false);
    if (newItems.length > 0) {
      onChange([...items, ...newItems]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, [items]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatePresence>
          {items.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={`${item.name}-${idx}`}
              className="relative aspect-square rounded-xl overflow-hidden group bg-black/50 border border-white/10"
            >
              {item.type === 'image' && <img src={item.url} alt={item.name} className="w-full h-full object-cover" />}
              {item.type === 'video' && <video src={item.url} className="w-full h-full object-cover" />}
              {(item.type === 'model' || item.type === 'file') && (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-400 p-2 text-center">
                  {item.type === 'model' ? <Box size={32} /> : <FileText size={32} />}
                  <span className="text-xs mt-2 truncate w-full">{item.name}</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => onChange(items.filter((_, i) => i !== idx))}
                  className="p-2 bg-red-500/80 rounded-full text-white hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-[10px] text-white truncate px-2">
                {item.type.toUpperCase()}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <label
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all group
            ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 hover:border-blue-500/50 bg-white/5 hover:bg-blue-500/5'}
          `}
        >
          {uploading ? (
            <Loader2 className="animate-spin text-blue-400" size={32} />
          ) : (
            <>
              <div className="flex gap-2 mb-3 text-gray-500 group-hover:text-blue-400 transition-colors">
                <ImageIcon size={20} />
                <Video size={20} />
                <Box size={20} />
              </div>
              <span className="text-xs text-gray-500 group-hover:text-blue-400 font-medium text-center px-2">
                Click or Drop<br/>Media
              </span>
              <input 
                type="file" 
                multiple 
                className="hidden" 
                onChange={handleFileSelect}
                accept="image/*,video/*,.obj,.gltf,.glb,.fbx,.pdf,.doc,.docx,.xls,.xlsx"
              />
            </>
          )}
        </label>
      </div>

      {error && (
        <div className="text-red-400 text-sm px-2 py-1 bg-red-500/10 rounded border border-red-500/20">
          {error}
        </div>
      )}
      
      <div className="flex gap-4 text-[10px] text-gray-500 px-2">
        <span>IMG &lt;10MB</span>
        <span>VID &lt;500MB</span>
        <span>3D &lt;100MB</span>
        <span>DOC &lt;50MB</span>
      </div>
    </div>
  );
};
