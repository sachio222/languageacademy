/**
 * TeacherDashboard - Main teacher view container
 * Manages navigation between class list and class detail
 */

import { useState } from 'react';
import TeacherClasses from './TeacherClasses';
import TeacherClassDetail from './TeacherClassDetail';

function TeacherDashboard({ onBack }) {
  const [selectedClass, setSelectedClass] = useState(null);

  if (selectedClass) {
    return (
      <TeacherClassDetail
        classData={selectedClass}
        onBack={() => setSelectedClass(null)}
        onBackToModules={onBack}
      />
    );
  }

  return (
    <TeacherClasses
      onSelectClass={setSelectedClass}
      onBack={onBack}
    />
  );
}

export default TeacherDashboard;
