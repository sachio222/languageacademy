import ReportCard from './ReportCard';
import { useAuth } from '../hooks/useAuth';

/**
 * ReportCardStudent - Wrapper component for student viewing their own report card
 * Shows current user's report card
 */
function ReportCardStudent({ onBack = null }) {
  const { supabaseUser } = useAuth();
  
  return <ReportCard userId={supabaseUser?.id} isAdminView={false} onBack={onBack} />;
}

export default ReportCardStudent;

