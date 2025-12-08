import { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { Edit2, Check, X } from 'lucide-react';

interface EditableContentProps {
  id: string;
  defaultContent: string;
  type?: 'span' | 'div';
  className?: string;
  multiline?: boolean;
}

export const EditableContent = ({
  id,
  defaultContent,
  type = 'span',
  className = '',
  multiline = false
}: EditableContentProps) => {
  const { content, isEditMode, saveContent } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(defaultContent);
  const [isLoading, setIsLoading] = useState(false);

  // Get value from context or fallback to default
  const displayValue = content[id] || defaultContent;

  useEffect(() => {
    setTempValue(displayValue);
  }, [displayValue]);

  const handleSave = async () => {
    if (tempValue === displayValue) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      await saveContent(id, tempValue, multiline ? 'richtext' : 'text');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
      // Optionally show error toast
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempValue(displayValue);
    setIsEditing(false);
  };

  if (isEditMode) {
    if (isEditing) {
      return (
        <div className={`relative inline-block min-w-[100px] ${type === 'div' ? 'w-full' : ''}`}>
          {multiline ? (
            <textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className={`w-full bg-gray-800 text-white p-2 rounded border border-blue-500 outline-none ${className}`}
              rows={4}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className={`w-full bg-gray-800 text-white px-2 py-1 rounded border border-blue-500 outline-none ${className}`}
              autoFocus
            />
          )}
          <div className="absolute -top-8 right-0 flex gap-1 bg-gray-900 rounded shadow-lg p-1 z-50">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="p-1 bg-green-600 text-white rounded hover:bg-green-500"
            >
              <Check size={14} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 bg-red-600 text-white rounded hover:bg-red-500"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`relative group cursor-pointer border border-dashed border-transparent hover:border-blue-400/50 rounded px-1 -mx-1 transition-all ${type === 'div' ? 'block' : 'inline-block'} ${className}`}
        onClick={() => setIsEditing(true)}
      >
        {type === 'span' ? (
          <span dangerouslySetInnerHTML={{ __html: displayValue }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: displayValue }} />
        )}
        <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white p-1 rounded-full shadow-lg z-10">
          <Edit2 size={10} />
        </div>
      </div>
    );
  }

  // Normal render
  if (type === 'span') {
    return <span className={className} dangerouslySetInnerHTML={{ __html: displayValue }} />;
  }

  return <div className={className} dangerouslySetInnerHTML={{ __html: displayValue }} />;
};
