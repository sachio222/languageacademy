import { useState } from 'react';
import SpeakButton from './SpeakButton';
import './WordList.css';
import { logger } from '../utils/logger';

// A help screen in the shape of src/components/CognatesHelp.jsx, for readScreen tests.
const WordList = ({ supabaseClient, moduleId }) => {
  const [open, setOpen] = useState(false);
  const words = [
    { french: "un café", english: "coffee" },
    { french: "une table", english: "table" },
  ];
  const sections = [{ id: 'what-are-words', title: 'What Are Words?' }];
  logger.log('WordList: loaded words', words.length);
  const load = async () => {
    const { data } = await supabaseClient
      .from('concept_understanding')
      .select('concept_index, concept_term')
      .eq('module_key', moduleId);
    return data.filter((item) => item.concept_term.startsWith(`words-${sections[0].id}`));
  };

  return (
    <div className="word-list-help">
      <h1>Words you might know already</h1>
      <p className="section-intro">
        These words look <strong>identical</strong> in both languages. For example, "un café" means "a coffee".
      </p>
      <div className="phrase-item" onClick={() => setOpen(!open)}>
        <div className="phrase-french">Je veux un café</div>
        <div className="phrase-pronunciation">zhuh vuh zun ka-fay</div>
        <SpeakButton text="Je veux un café" language="fr-FR" size="small" />
      </div>
      {words.map((w, idx) => (
        <div key={idx} className="cognate-french">{w.french}</div>
      ))}
    </div>
  );
};

export default WordList;
