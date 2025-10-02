import { useState } from 'react';
import LessonList from './components/LessonList';
import LessonView from './components/LessonView';
import { lessons } from './lessons/lessonData';
import './styles/App.css';

function App() {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedExercises, setCompletedExercises] = useState(new Set());

  const handleLessonSelect = (lessonId) => {
    setCurrentLesson(lessonId);
  };

  const handleBack = () => {
    setCurrentLesson(null);
  };

  const handleExerciseComplete = (exerciseId) => {
    setCompletedExercises(prev => new Set([...prev, exerciseId]));
  };

  const handleModuleComplete = (moduleId, goToNext = false) => {
    console.log('Module complete:', moduleId, 'goToNext:', goToNext);

    if (goToNext) {
      // Find next module
      const nextModuleId = moduleId + 1;
      const nextModule = lessons.find(l => l.id === nextModuleId);
      console.log('Looking for module', nextModuleId, 'found:', nextModule);

      if (nextModule) {
        setCurrentLesson(nextModuleId);
      } else {
        // No more modules - go back to module list
        alert('Congratulations! You\'ve completed all modules!');
        setCurrentLesson(null);
      }
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🎓 Language Academy</h1>
          <p className="tagline">Learn French Like a Functional Language</p>
        </div>
      </header>

      <main className="app-main">
        {!currentLesson ? (
          <LessonList
            lessons={lessons}
            onLessonSelect={handleLessonSelect}
            completedExercises={completedExercises}
          />
        ) : (
          <LessonView
            lesson={lessons.find(l => l.id === currentLesson)}
            onBack={handleBack}
            completedExercises={completedExercises}
            onExerciseComplete={handleExerciseComplete}
            onModuleComplete={handleModuleComplete}
            totalModules={lessons.length}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Built with React • Inspired by Codecademy • Grammar Linting Enabled</p>
      </footer>
    </div>
  );
}

export default App;


