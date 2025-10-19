import React from 'react';
import { BookOpen, Calculator, Calendar, Globe, Palette, Hash, Type, Award, ArrowLeft } from 'lucide-react';
import '../styles/ReferenceModules.css';

const ReferenceModules = ({ onModuleSelect, onBack }) => {
  // Reference modules data with optimized Unsplash images
  const referenceModules = [
    {
      id: 155,
      title: "L'Alphabet",
      description: "French alphabet with pronunciation guide",
      icon: Type,
      image: "https://images.unsplash.com/photo-1699192676418-7a1eba1dc104?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      category: "Language Basics"
    },
    {
      id: 156,
      title: "Les Nombres",
      description: "Numbers from 0 to infinity - including the unique 70s, 80s, and 90s!",
      icon: Calculator,
      image: "https://images.unsplash.com/photo-1603290989627-5155a7f83dac?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      category: "Language Basics"
    },
    {
      id: 157,
      title: "Jours et Mois",
      description: "Days of the week and months in French",
      icon: Calendar,
      image: "https://images.unsplash.com/photo-1540317700647-ec69694d70d0?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      category: "Time & Dates"
    },
    {
      id: 158,
      title: "Les Fêtes",
      description: "French holidays and celebrations",
      icon: Award,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      category: "Culture"
    },
    {
      id: 159,
      title: "Les Couleurs",
      description: "Colors with agreement rules and nature vocabulary",
      icon: Palette,
      image: "https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      category: "Vocabulary"
    },
    {
      id: 160,
      title: "La Francophonie",
      description: "French-speaking countries worldwide",
      icon: Globe,
      image: "https://images.unsplash.com/photo-1662009868204-4128942c9835?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      category: "Culture"
    },
    {
      id: 161,
      title: "Le Français en Chiffres",
      description: "Fascinating language statistics",
      icon: Hash,
      image: "https://images.unsplash.com/photo-1586448911804-9fc613f60e15?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      category: "Culture"
    },
    {
      id: 162,
      title: "French Spelling Patterns",
      description: "Complete guide to French sound-to-spelling correspondences",
      icon: BookOpen,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      category: "Language Basics"
    }
  ];

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
