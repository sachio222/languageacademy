import { useState } from 'react';
import LeftNav from './components/LeftNav';
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
        <div className="header-left">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? '›' : '☰'}
          </button>
          <h1>🎓 Language Academy</h1>
        </div>
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
          <div className="welcome-screen">
            <div className="welcome-icon">📚</div>
            <h2>Welcome to Language Academy</h2>
            <p className="welcome-subtitle">Master French through structured, test-driven learning</p>

            <div className="welcome-actions">
              <div className="welcome-tip">
                <span className="tip-icon">←</span>
                <span>Select a module from the sidebar to begin</span>
              </div>
              <div className="welcome-tip">
                <span className="tip-icon">⌘K</span>
                <span>Quick search modules and vocabulary</span>
              </div>
            </div>

            <div className="welcome-stats">
              <div className="stat-card">
                <span className="stat-number">{lessons.length}</span>
                <span className="stat-label">Modules</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{lessons.reduce((sum, l) => sum + l.exercises.length, 0)}</span>
                <span className="stat-label">Exercises</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{completedExercises.size}</span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
          </div>
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


