import React from 'react';
import { BookOpen, Calculator, Calendar, Globe, Palette, Hash, Type, Award, ArrowLeft } from 'lucide-react';
import { lessons, unitStructure } from '../lessons/lessonData';
import '../styles/ReferenceModules.css';

// Helper function to get icon for each reference module
const getIconForModule = (lesson) => {
  const title = lesson.title.toLowerCase();
  if (title.includes('alphabet')) return Type;
  if (title.includes('nombre')) return Calculator;
  if (title.includes('jours') || title.includes('mois')) return Calendar;
  if (title.includes('fête')) return Award;
  if (title.includes('couleur')) return Palette;
  if (title.includes('francophonie')) return Globe;
  if (title.includes('chiffre')) return Hash;
  if (title.includes('spelling') || title.includes('pattern')) return BookOpen;
  if (title.includes('cognate')) return BookOpen;
  if (title.includes('liaison') || title.includes('flow')) return BookOpen;
  if (title.includes('verb pattern') || title.includes('verb pattern')) return BookOpen;
  return BookOpen; // default
};

// Helper function to get image for each reference module
const getImageForModule = (lesson) => {
  const title = lesson.title.toLowerCase();
  if (title.includes('alphabet')) return "https://images.unsplash.com/photo-1645897938945-7b1b53239ea6?w=400&h=300&fit=crop&crop=center&auto=format&q=80";
  if (title.includes('nombre')) return "https://images.unsplash.com/photo-1603290989627-5155a7f83dac?w=400&h=300&fit=crop&crop=center&auto=format&q=80";
  if (title.includes('jours') || title.includes('mois')) return "https://images.unsplash.com/photo-1540317700647-ec69694d70d0?w=400&h=300&fit=crop&crop=center&auto=format&q=80";
  if (title.includes('fête')) return "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop&crop=center&auto=format&q=80";
  if (title.includes('couleur')) return "https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=400&h=300&fit=crop&crop=center&auto=format&q=80";
  if (title.includes('francophonie')) return "https://images.unsplash.com/photo-1662009868204-4128942c9835?w=400&h=300&fit=crop&crop=center&auto=format&q=80";
  if (title.includes('chiffre')) return "https://images.unsplash.com/photo-1642516303080-431f6681f864?w=400&h=300&fit=crop&crop=center&auto=format&q=80";
  if (title.includes('spelling') || title.includes('pattern')) return "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center&auto=format&q=80";
  if (title.includes('cognate') || title.includes('share many words')) return "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop&crop=center&auto=format&q=80";
  if (title.includes('liaison') || title.includes('flow')) return "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center&auto=format&q=80";
  if (title.includes('verb pattern') || title.includes('understanding verb')) return "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center&auto=format&q=80";
  return "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center&auto=format&q=80"; // default
};

// Helper function to get category for each reference module
const getCategoryForModule = (lesson) => {
  const title = lesson.title.toLowerCase();
  if (title.includes('alphabet') || title.includes('nombre') || title.includes('spelling')) return "Language Basics";
  if (title.includes('jours') || title.includes('mois')) return "Time & Dates";
  if (title.includes('fête') || title.includes('francophonie') || title.includes('chiffre')) return "Culture";
  if (title.includes('couleur')) return "Vocabulary";
  if (title.includes('cognate') || title.includes('liaison') || title.includes('verb pattern') || title.includes('flow') || title.includes('understanding verb')) return "Learning Guides";
  return "Reference";
};

const ReferenceModules = ({ onModuleSelect, onBack }) => {
  // Get reference lessons dynamically from the lesson system
  const referenceUnit = unitStructure.find(u => u.isReference);
  const referenceLessons = lessons.filter(l => 
    referenceUnit && l.id >= referenceUnit.lessonRange[0] && l.id <= referenceUnit.lessonRange[1]
  );

  // Map lessons to display format with icons/images
  const referenceModules = referenceLessons.map(lesson => ({
    id: lesson.id,
    title: lesson.title.replace(/^Reference [IVXCL]+: /, ''), // Remove "Reference I:" prefix (supports up to XX)
    description: lesson.description,
    icon: getIconForModule(lesson),
    image: getImageForModule(lesson),
    category: getCategoryForModule(lesson)
  }));

  const handleModuleClick = (moduleId) => {
    if (onModuleSelect) {
      onModuleSelect(moduleId);
    }
  };

  return (
    <div className="reference-modules">
      <div className="reference-nav">
        {onBack && (
          <button className="btn-back-to-dashboard" onClick={onBack}>
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </button>
        )}
      </div>

      <div className="reference-header">
        <h1>Reference Materials</h1>
        <p>Essential reference materials for French learning</p>
      </div>

      <div className="reference-grid">
        {referenceModules.map((module) => {
          const IconComponent = module.icon;
          return (
            <div
              key={module.id}
              className="reference-card"
              onClick={() => handleModuleClick(module.id)}
            >
              <div className="card-image">
                <img
                  src={module.image}
                  alt={module.title}
                  loading="lazy"
                />
                <div className="card-overlay">
                  <IconComponent className="card-icon" />
                </div>
              </div>

              <div className="card-content">
                <div className="card-category">{module.category}</div>
                <h3 className="card-title">{module.title}</h3>
                <p className="card-description">{module.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReferenceModules;
