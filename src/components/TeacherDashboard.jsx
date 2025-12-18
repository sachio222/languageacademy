/**
 * TeacherDashboard - Main teacher view container
 * Manages navigation between class list and class detail
 */

import { useState } from 'react';
import TeacherClasses from './TeacherClasses';
import TeacherClassDetail from './TeacherClassDetail';

function TeacherDashboard() {
  const [selectedClass, setSelectedClass] = useState(null);

  if (selectedClass) {
    return (
      <TeacherClassDetail
        classData={selectedClass}
        onBack={() => setSelectedClass(null)}
      />
    );
  }

  return (
    <TeacherClasses
      onSelectClass={setSelectedClass}
    />
  );
}

export default TeacherDashboard;
