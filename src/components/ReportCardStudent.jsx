import ReportCard from './ReportCard';
import { useAuth } from '../hooks/useAuth';

/**
 * ReportCardStudent - Wrapper component for student viewing their own report card
 * Shows current user's report card
 */
function ReportCardStudent() {
  const { supabaseUser } = useAuth();
  
  return <ReportCard userId={supabaseUser?.id} isAdminView={false} />;
}

export default ReportCardStudent;

