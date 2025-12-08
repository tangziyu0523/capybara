import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { fetchContent, updateContent as apiUpdateContent } from '../api/client';

interface ContentContextType {
  content: Record<string, string>;
  isLoading: boolean;
  isEditMode: boolean;
  toggleEditMode: () => void;
  updateLocalContent: (key: string, value: string) => void;
  saveContent: (key: string, value: string, type?: string) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await fetchContent();
      setContent(data);
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLocalContent = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const saveContent = async (key: string, value: string, type: string = 'text') => {
    try {
      await apiUpdateContent(key, value, type);
      updateLocalContent(key, value);
    } catch (error) {
      console.error('Failed to save content:', error);
      throw error;
    }
  };

  const toggleEditMode = () => setIsEditMode(prev => !prev);

  return (
    <ContentContext.Provider value={{
      content,
      isLoading,
      isEditMode,
      toggleEditMode,
      updateLocalContent,
      saveContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
