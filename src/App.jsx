import { useState } from 'react';
import LeftNav from './components/LeftNav';
import LessonList from './components/LessonList';
import LessonView from './components/LessonView';
import { lessons } from './lessons/lessonData';
import './styles/App.css';

function App() {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLessonSelect = (lessonId) => {
    setCurrentLesson(lessonId);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentLesson(null);
  };

  const handleExerciseComplete = (exerciseId) => {
    setCompletedExercises(prev => new Set([...prev, exerciseId]));
  };

  const handleModuleComplete = (moduleId, goToNext = false) => {
    console.log('Module complete:', moduleId, 'goToNext:', goToNext);
    console.log('Total lessons available:', lessons.length);

    if (goToNext) {
      // Go to next module
      const nextModuleId = moduleId + 1;
      const nextModule = lessons.find(l => l.id === nextModuleId);
      console.log('Looking for module', nextModuleId, 'found:', nextModule);
      console.log('Next module title:', nextModule?.title);
      console.log('Next module exercises:', nextModule?.exercises?.length);

      if (nextModule) {
        console.log('Setting currentLesson to:', nextModuleId);
        setCurrentLesson(nextModuleId);
        window.scrollTo(0, 0);
      } else {
        // No more modules - go back to module list
        console.log('No next module found - completed all modules!');
        alert('Congratulations! You\'ve completed all modules!');
        setCurrentLesson(null);
        window.scrollTo(0, 0);
      }
    }
  };


  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 Language Academy</h1>
      </header>

      <LeftNav
        lessons={lessons}
        currentLesson={currentLesson}
        onLessonSelect={handleLessonSelect}
        completedExercises={completedExercises}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className="app-main">
        {!currentLesson ? (
          <LessonList
            lessons={lessons}
            onLessonSelect={handleLessonSelect}
            completedExercises={completedExercises}
          />
        ) : (
          (() => {
            const lesson = lessons.find(l => l.id === currentLesson);
            if (!lesson) {
              return (
                <div className="error-screen">
                  <h2>⚠️ Module Not Found</h2>
                  <p>Could not find module with ID: {currentLesson}</p>
                </div>
              );
            }
            return (
              <LessonView
                lesson={lesson}
                onBack={handleBack}
                completedExercises={completedExercises}
                onExerciseComplete={handleExerciseComplete}
                onModuleComplete={handleModuleComplete}
                totalModules={lessons.length}
              />
            );
          })()
        )}
      </main>

      <footer className="app-footer">
        <p>Built with React • Inspired by Codecademy • Grammar Linting Enabled</p>
      </footer>
    </div>
  );
}

export default App;


