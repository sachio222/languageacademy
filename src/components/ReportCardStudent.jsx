import ReportCard from './ReportCardEnhanced';
import { useAuth } from '../hooks/useAuth';

/**
 * ReportCardStudent - Wrapper component for student viewing their own report card
 * Shows current user's report card with enhanced section-level tracking
 */
function ReportCardStudent({ onBack = null }) {
  const { supabaseUser } = useAuth();
  
  return <ReportCard userId={supabaseUser?.id} isAdminView={false} onBack={onBack} />;
}

export default ReportCardStudent;

