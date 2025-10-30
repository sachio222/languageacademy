import { useCallback } from 'react';
import { lessons } from '../lessons/lessonData';

export const useUrlManager = () => {
  // Get initial lesson from URL with validation
  const getInitialLesson = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const moduleParam = params.get('module');
    const referenceParam = params.get('reference');
    const vocabularyParam = params.get('vocabulary');
    const dictionaryParam = params.get('dictionary');

    if (referenceParam === 'true') return 'reference';
    if (vocabularyParam === 'true') return 'vocabulary';
    if (dictionaryParam === 'true') return 'dictionary';

    if (moduleParam) {
      const moduleId = parseInt(moduleParam, 10);
      if (!isNaN(moduleId) && moduleId > 0 && lessons.find(l => l.id === moduleId)) {
        return moduleId;
      }
      // Invalid module param - clean URL
      cleanUrl();
    }
    return null;
  }, []);

  // Clean all URL parameters
  const cleanUrl = useCallback(() => {
    const url = new URL(window.location);
    const paramsToDelete = ['module', 'view', 'exercise', 'sentence', 'question', 'section', 'reference', 'vocabulary', 'dictionary'];
    paramsToDelete.forEach(param => url.searchParams.delete(param));
    window.history.replaceState({}, '', url);
  }, []);

  // Set module in URL
  const setModule = useCallback((lessonId) => {
    const url = new URL(window.location);
    url.searchParams.set('module', lessonId);
    // Clean other params
    ['view', 'exercise', 'sentence', 'question', 'section'].forEach(param => 
      url.searchParams.delete(param)
    );
    window.history.pushState({}, '', url);
  }, []);

  // Set reference in URL
  const setReference = useCallback(() => {
    const url = new URL(window.location);
    url.searchParams.set('reference', 'true');
    ['module', 'view', 'exercise', 'sentence', 'question', 'section'].forEach(param => 
      url.searchParams.delete(param)
    );
    window.history.pushState({}, '', url);
  }, []);

  // Set vocabulary in URL
  const setVocabulary = useCallback(() => {
    const url = new URL(window.location);
    url.searchParams.set('vocabulary', 'true');
    ['module', 'view', 'exercise', 'sentence', 'question', 'section', 'reference'].forEach(param => 
      url.searchParams.delete(param)
    );
    window.history.pushState({}, '', url);
  }, []);

  // Set dictionary in URL
  const setDictionary = useCallback(() => {
    const url = new URL(window.location);
    url.searchParams.set('dictionary', 'true');
    window.history.pushState({}, '', url);
  }, []);

  // Set admin in URL
  const setAdmin = useCallback((isAdmin) => {
    const url = new URL(window.location);
    if (isAdmin) {
      url.searchParams.set('admin', 'true');
    } else {
      url.searchParams.delete('admin');
    }
    window.history.pushState({}, '', url);
  }, []);

  // Handle browser back/forward navigation
  const handlePopState = useCallback((setCurrentLesson, setShowFeedbackAdmin) => {
    const params = new URLSearchParams(window.location.search);
    const moduleParam = params.get('module');
    const referenceParam = params.get('reference');
    const adminParam = params.get('admin');

    setShowFeedbackAdmin(adminParam === 'true');

    if (referenceParam === 'true') {
      setCurrentLesson('reference');
    } else if (moduleParam) {
      const moduleId = parseInt(moduleParam, 10);
      if (!isNaN(moduleId) && moduleId > 0 && lessons.find(l => l.id === moduleId)) {
        setCurrentLesson(moduleId);
      } else {
        setCurrentLesson(null);
        cleanUrl();
      }
    } else {
      setCurrentLesson(null);
    }
  }, [cleanUrl]);

  return {
    getInitialLesson,
    cleanUrl,
    setModule,
    setReference,
    setVocabulary,
    setDictionary,
    setAdmin,
    handlePopState
  };
};
