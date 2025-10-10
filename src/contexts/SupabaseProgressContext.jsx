import { createContext, useContext } from 'react';
import { useSupabaseProgress as useSupabaseProgressHook } from '../hooks/useSupabaseProgress';

const SupabaseProgressContext = createContext(null);

export const SupabaseProgressProvider = ({ children }) => {
  const supabaseProgress = useSupabaseProgressHook();

  return (
    <SupabaseProgressContext.Provider value={supabaseProgress}>
      {children}
    </SupabaseProgressContext.Provider>
  );
};

export const useSupabaseProgress = () => {
  const context = useContext(SupabaseProgressContext);
  // Return context even if null - let the hook handle it
  return context;
};

