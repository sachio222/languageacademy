import { createContext, useContext } from 'react';
import { useSectionProgress as useSectionProgressHook } from '../hooks/useSectionProgress';

const SectionProgressContext = createContext(null);

export const SectionProgressProvider = ({ children }) => {
  const sectionProgress = useSectionProgressHook();

  return (
    <SectionProgressContext.Provider value={sectionProgress}>
      {children}
    </SectionProgressContext.Provider>
  );
};

export const useSectionProgress = () => {
  const context = useContext(SectionProgressContext);
  if (!context) {
    throw new Error('useSectionProgress must be used within SectionProgressProvider');
  }
  return context;
};

