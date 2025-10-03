import { useState, useEffect } from 'react';
import LessonList from './components/LessonList';
import LessonView from './components/LessonView';
import { lessons } from './lessons/lessonData';
import './styles/App.css';

function App() {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollUpDistance = 0;
    let ticking = false;
    const headerHeight = 90; // Approximate header height in pixels

    const updateHeaderVisibility = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = lastScrollY - currentScrollY;

      // Always show header when at top
      if (currentScrollY < 10) {
        setHeaderVisible(true);
        scrollUpDistance = 0;
      } else if (scrollDiff > 0) {
        // Scrolling up - accumulate distance
        scrollUpDistance += scrollDiff;

        // Only show header if scrolled up more than 2x header height
        if (scrollUpDistance > headerHeight * 2) {
          setHeaderVisible(true);
        }
      } else if (scrollDiff < 0) {
        // Scrolling down
        scrollUpDistance = 0; // Reset accumulator

        if (currentScrollY > 100) {
          setHeaderVisible(false);
        }
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderVisibility);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

    if (goToNext) {
      // Go to next module
      const nextModuleId = moduleId + 1;
      const nextModule = lessons.find(l => l.id === nextModuleId);
      console.log('Looking for module', nextModuleId, 'found:', nextModule);

      if (nextModule) {
        setCurrentLesson(nextModuleId);
        window.scrollTo(0, 0);
      } else {
        // No more modules - go back to module list
        alert('Congratulations! You\'ve completed all modules!');
        setCurrentLesson(null);
        window.scrollTo(0, 0);
      }
    }
  };


  return (
    <div className="app">
      <header className={`app-header ${headerVisible ? 'header-visible' : 'header-hidden'}`}>
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


