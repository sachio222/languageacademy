/**
 * Dictionary Curriculum Update Script
 * Generated: 2025-10-29T16:21:21.234Z
 * 
 * Updates dictionary entries with curriculum tracking using existing schema fields:
 * - unit: "unit1", "unit2", etc.
 * - module: "être (to be)", "Core Pronouns", etc.  
 * - lesson: "lesson-1-3", etc.
 * - introduced_in: "Unit 1: Essential Grammar - être (to be)"
 */

import fs from 'fs';
import path from 'path';

// Curriculum data
const curriculumData = new Map([
  ["bonjour", {
  "unit": "unit1",
  "module": "Famous Words & Greetings",
  "lesson": "lesson-1-1",
  "introduced_in": "Unit 1: Essential Grammar - Famous Words & Greetings"
}],
  ["bonsoir", {
  "unit": "unit1",
  "module": "Famous Words & Greetings",
  "lesson": "lesson-1-1",
  "introduced_in": "Unit 1: Essential Grammar - Famous Words & Greetings"
}],
  ["merci", {
  "unit": "unit1",
  "module": "Famous Words & Greetings",
  "lesson": "lesson-1-1",
  "introduced_in": "Unit 1: Essential Grammar - Famous Words & Greetings"
}],
  ["oui", {
  "unit": "unit1",
  "module": "Famous Words & Greetings",
  "lesson": "lesson-1-1",
  "introduced_in": "Unit 1: Essential Grammar - Famous Words & Greetings"
}],
  ["non", {
  "unit": "unit1",
  "module": "Famous Words & Greetings",
  "lesson": "lesson-1-1",
  "introduced_in": "Unit 1: Essential Grammar - Famous Words & Greetings"
}],
  ["s'il vous plaît", {
  "unit": "unit1",
  "module": "Famous Words & Greetings",
  "lesson": "lesson-1-1",
  "introduced_in": "Unit 1: Essential Grammar - Famous Words & Greetings"
}],
  ["pardon", {
  "unit": "unit1",
  "module": "Famous Words & Greetings",
  "lesson": "lesson-1-1",
  "introduced_in": "Unit 1: Essential Grammar - Famous Words & Greetings"
}],
  ["au revoir", {
  "unit": "unit1",
  "module": "Famous Words & Greetings",
  "lesson": "lesson-1-1",
  "introduced_in": "Unit 1: Essential Grammar - Famous Words & Greetings"
}],
  ["voilà", {
  "unit": "unit1",
  "module": "Famous Words & Greetings",
  "lesson": "lesson-1-1",
  "introduced_in": "Unit 1: Essential Grammar - Famous Words & Greetings"
}],
  ["café", {
  "unit": "unit1",
  "module": "Famous Words & Greetings",
  "lesson": "lesson-1-1",
  "introduced_in": "Unit 1: Essential Grammar - Famous Words & Greetings"
}],
  ["bon", {
  "unit": "unit1",
  "module": "Famous Words & Greetings",
  "lesson": "lesson-1-1",
  "introduced_in": "Unit 1: Essential Grammar - Famous Words & Greetings"
}],
  ["bien", {
  "unit": "unit1",
  "module": "Famous Words & Greetings",
  "lesson": "lesson-1-1",
  "introduced_in": "Unit 1: Essential Grammar - Famous Words & Greetings"
}],
  ["salut", {
  "unit": "unit1",
  "module": "Famous Words & Greetings",
  "lesson": "lesson-1-1",
  "introduced_in": "Unit 1: Essential Grammar - Famous Words & Greetings"
}],
  ["je", {
  "unit": "unit1",
  "module": "2024-01-01-pronouns",
  "lesson": "lesson-1-2",
  "introduced_in": "Unit 1: Essential Grammar - 2024-01-01-pronouns"
}],
  ["tu", {
  "unit": "unit1",
  "module": "2024-01-01-pronouns",
  "lesson": "lesson-1-2",
  "introduced_in": "Unit 1: Essential Grammar - 2024-01-01-pronouns"
}],
  ["il", {
  "unit": "unit1",
  "module": "2024-01-01-pronouns",
  "lesson": "lesson-1-2",
  "introduced_in": "Unit 1: Essential Grammar - 2024-01-01-pronouns"
}],
  ["elle", {
  "unit": "unit1",
  "module": "2024-01-01-pronouns",
  "lesson": "lesson-1-2",
  "introduced_in": "Unit 1: Essential Grammar - 2024-01-01-pronouns"
}],
  ["nous", {
  "unit": "unit1",
  "module": "2024-01-01-pronouns",
  "lesson": "lesson-1-2",
  "introduced_in": "Unit 1: Essential Grammar - 2024-01-01-pronouns"
}],
  ["vous", {
  "unit": "unit1",
  "module": "2024-01-01-pronouns",
  "lesson": "lesson-1-2",
  "introduced_in": "Unit 1: Essential Grammar - 2024-01-01-pronouns"
}],
  ["ils", {
  "unit": "unit1",
  "module": "2024-01-01-pronouns",
  "lesson": "lesson-1-2",
  "introduced_in": "Unit 1: Essential Grammar - 2024-01-01-pronouns"
}],
  ["elles", {
  "unit": "unit1",
  "module": "2024-01-01-pronouns",
  "lesson": "lesson-1-2",
  "introduced_in": "Unit 1: Essential Grammar - 2024-01-01-pronouns"
}],
  ["on", {
  "unit": "unit1",
  "module": "2024-01-01-pronouns",
  "lesson": "lesson-1-2",
  "introduced_in": "Unit 1: Essential Grammar - 2024-01-01-pronouns"
}],
  ["être", {
  "unit": "unit1",
  "module": "2024-01-02-etre",
  "lesson": "lesson-1-3",
  "introduced_in": "Unit 1: Essential Grammar - 2024-01-02-etre"
}],
  ["avoir", {
  "unit": "unit1",
  "module": "avoir (to have)",
  "lesson": "lesson-1-4",
  "introduced_in": "Unit 1: Essential Grammar - avoir (to have)"
}],
  ["un", {
  "unit": "unit1",
  "module": "Articles",
  "lesson": "lesson-1-5",
  "introduced_in": "Unit 1: Essential Grammar - Articles"
}],
  ["une", {
  "unit": "unit1",
  "module": "Articles",
  "lesson": "lesson-1-5",
  "introduced_in": "Unit 1: Essential Grammar - Articles"
}],
  ["le", {
  "unit": "unit1",
  "module": "Articles",
  "lesson": "lesson-1-5",
  "introduced_in": "Unit 1: Essential Grammar - Articles"
}],
  ["la", {
  "unit": "unit1",
  "module": "Articles",
  "lesson": "lesson-1-5",
  "introduced_in": "Unit 1: Essential Grammar - Articles"
}],
  ["les", {
  "unit": "unit1",
  "module": "Articles",
  "lesson": "lesson-1-5",
  "introduced_in": "Unit 1: Essential Grammar - Articles"
}],
  ["l'", {
  "unit": "unit1",
  "module": "Articles",
  "lesson": "lesson-1-5",
  "introduced_in": "Unit 1: Essential Grammar - Articles"
}],
  ["un livre", {
  "unit": "unit1",
  "module": "Basic Nouns",
  "lesson": "lesson-1-6",
  "introduced_in": "Unit 1: Essential Grammar - Basic Nouns"
}],
  ["un chat", {
  "unit": "unit1",
  "module": "Basic Nouns",
  "lesson": "lesson-1-6",
  "introduced_in": "Unit 1: Essential Grammar - Basic Nouns"
}],
  ["une chatte", {
  "unit": "unit1",
  "module": "Basic Nouns",
  "lesson": "lesson-1-6",
  "introduced_in": "Unit 1: Essential Grammar - Basic Nouns"
}],
  ["un chien", {
  "unit": "unit1",
  "module": "Basic Nouns",
  "lesson": "lesson-1-6",
  "introduced_in": "Unit 1: Essential Grammar - Basic Nouns"
}],
  ["une chienne", {
  "unit": "unit1",
  "module": "Basic Nouns",
  "lesson": "lesson-1-6",
  "introduced_in": "Unit 1: Essential Grammar - Basic Nouns"
}],
  ["une maison", {
  "unit": "unit1",
  "module": "Basic Nouns",
  "lesson": "lesson-1-6",
  "introduced_in": "Unit 1: Essential Grammar - Basic Nouns"
}],
  ["une voiture", {
  "unit": "unit1",
  "module": "Basic Nouns",
  "lesson": "lesson-1-6",
  "introduced_in": "Unit 1: Essential Grammar - Basic Nouns"
}],
  ["un ami", {
  "unit": "unit1",
  "module": "Basic Nouns",
  "lesson": "lesson-1-6",
  "introduced_in": "Unit 1: Essential Grammar - Basic Nouns"
}],
  ["une amie", {
  "unit": "unit1",
  "module": "Basic Nouns",
  "lesson": "lesson-1-6",
  "introduced_in": "Unit 1: Essential Grammar - Basic Nouns"
}],
  ["un homme", {
  "unit": "unit1",
  "module": "Basic Nouns",
  "lesson": "lesson-1-6",
  "introduced_in": "Unit 1: Essential Grammar - Basic Nouns"
}],
  ["une femme", {
  "unit": "unit1",
  "module": "Basic Nouns",
  "lesson": "lesson-1-6",
  "introduced_in": "Unit 1: Essential Grammar - Basic Nouns"
}],
  ["un enfant", {
  "unit": "unit1",
  "module": "Basic Nouns",
  "lesson": "lesson-1-6",
  "introduced_in": "Unit 1: Essential Grammar - Basic Nouns"
}],
  ["une chose", {
  "unit": "unit1",
  "module": "Basic Nouns",
  "lesson": "lesson-1-6",
  "introduced_in": "Unit 1: Essential Grammar - Basic Nouns"
}],
  ["un jour", {
  "unit": "unit1",
  "module": "Basic Nouns",
  "lesson": "lesson-1-6",
  "introduced_in": "Unit 1: Essential Grammar - Basic Nouns"
}],
  ["des", {
  "unit": "unit1",
  "module": "Plurals",
  "lesson": "lesson-1-7",
  "introduced_in": "Unit 1: Essential Grammar - Plurals"
}],
  ["chats", {
  "unit": "unit1",
  "module": "Plurals",
  "lesson": "lesson-1-7",
  "introduced_in": "Unit 1: Essential Grammar - Plurals"
}],
  ["chiens", {
  "unit": "unit1",
  "module": "Plurals",
  "lesson": "lesson-1-7",
  "introduced_in": "Unit 1: Essential Grammar - Plurals"
}],
  ["livres", {
  "unit": "unit1",
  "module": "Plurals",
  "lesson": "lesson-1-7",
  "introduced_in": "Unit 1: Essential Grammar - Plurals"
}],
  ["amis", {
  "unit": "unit1",
  "module": "Plurals",
  "lesson": "lesson-1-7",
  "introduced_in": "Unit 1: Essential Grammar - Plurals"
}],
  ["choses", {
  "unit": "unit1",
  "module": "Plurals",
  "lesson": "lesson-1-7",
  "introduced_in": "Unit 1: Essential Grammar - Plurals"
}],
  ["enfants", {
  "unit": "unit1",
  "module": "Plurals",
  "lesson": "lesson-1-7",
  "introduced_in": "Unit 1: Essential Grammar - Plurals"
}],
  ["et", {
  "unit": "unit1",
  "module": "Connectors",
  "lesson": "lesson-1-9",
  "introduced_in": "Unit 1: Essential Grammar - Connectors"
}],
  ["mais", {
  "unit": "unit1",
  "module": "Connectors",
  "lesson": "lesson-1-9",
  "introduced_in": "Unit 1: Essential Grammar - Connectors"
}],
  ["ou", {
  "unit": "unit1",
  "module": "Connectors",
  "lesson": "lesson-1-9",
  "introduced_in": "Unit 1: Essential Grammar - Connectors"
}],
  ["aussi", {
  "unit": "unit1",
  "module": "Connectors",
  "lesson": "lesson-1-9",
  "introduced_in": "Unit 1: Essential Grammar - Connectors"
}],
  ["très", {
  "unit": "unit1",
  "module": "Connectors",
  "lesson": "lesson-1-9",
  "introduced_in": "Unit 1: Essential Grammar - Connectors"
}],
  ["ça", {
  "unit": "unit2",
  "module": "2024-01-12-demonstratives",
  "lesson": "lesson-2-1",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-12-demonstratives"
}],
  ["ce", {
  "unit": "unit2",
  "module": "2024-01-12-demonstratives",
  "lesson": "lesson-2-1",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-12-demonstratives"
}],
  ["cet", {
  "unit": "unit2",
  "module": "2024-01-12-demonstratives",
  "lesson": "lesson-2-1",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-12-demonstratives"
}],
  ["cette", {
  "unit": "unit2",
  "module": "2024-01-12-demonstratives",
  "lesson": "lesson-2-1",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-12-demonstratives"
}],
  ["ces", {
  "unit": "unit2",
  "module": "2024-01-12-demonstratives",
  "lesson": "lesson-2-1",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-12-demonstratives"
}],
  ["ceci", {
  "unit": "unit2",
  "module": "2024-01-12-demonstratives",
  "lesson": "lesson-2-1",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-12-demonstratives"
}],
  ["cela", {
  "unit": "unit2",
  "module": "2024-01-12-demonstratives",
  "lesson": "lesson-2-1",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-12-demonstratives"
}],
  ["c'est ça", {
  "unit": "unit2",
  "module": "2024-01-13-ca-survival",
  "lesson": "lesson-2-2",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-13-ca-survival"
}],
  ["ça va", {
  "unit": "unit2",
  "module": "2024-01-13-ca-survival",
  "lesson": "lesson-2-2",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-13-ca-survival"
}],
  ["ça va?", {
  "unit": "unit2",
  "module": "2024-01-13-ca-survival",
  "lesson": "lesson-2-2",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-13-ca-survival"
}],
  ["j'ai ça", {
  "unit": "unit2",
  "module": "2024-01-13-ca-survival",
  "lesson": "lesson-2-2",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-13-ca-survival"
}],
  ["tu as ça", {
  "unit": "unit2",
  "module": "2024-01-13-ca-survival",
  "lesson": "lesson-2-2",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-13-ca-survival"
}],
  ["j'ai ce livre", {
  "unit": "unit2",
  "module": "2024-01-14-determiners-nouns",
  "lesson": "lesson-2-3",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-14-determiners-nouns"
}],
  ["elle a cette maison", {
  "unit": "unit2",
  "module": "2024-01-14-determiners-nouns",
  "lesson": "lesson-2-3",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-14-determiners-nouns"
}],
  ["nous avons ces livres", {
  "unit": "unit2",
  "module": "2024-01-14-determiners-nouns",
  "lesson": "lesson-2-3",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-14-determiners-nouns"
}],
  ["tu as ce chat", {
  "unit": "unit2",
  "module": "2024-01-14-determiners-nouns",
  "lesson": "lesson-2-3",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-14-determiners-nouns"
}],
  ["ils ont ces chats", {
  "unit": "unit2",
  "module": "2024-01-14-determiners-nouns",
  "lesson": "lesson-2-3",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-14-determiners-nouns"
}],
  ["c'est cet homme", {
  "unit": "unit2",
  "module": "2024-01-14-determiners-nouns",
  "lesson": "lesson-2-3",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-14-determiners-nouns"
}],
  ["j'ai ces enfants", {
  "unit": "unit2",
  "module": "2024-01-14-determiners-nouns",
  "lesson": "lesson-2-3",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-14-determiners-nouns"
}],
  ["j'ai le chat", {
  "unit": "unit2",
  "module": "2024-01-14-determiners-nouns",
  "lesson": "lesson-2-3",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-14-determiners-nouns"
}],
  ["elle a la maison", {
  "unit": "unit2",
  "module": "2024-01-14-determiners-nouns",
  "lesson": "lesson-2-3",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-14-determiners-nouns"
}],
  ["ils ont les chiens", {
  "unit": "unit2",
  "module": "2024-01-14-determiners-nouns",
  "lesson": "lesson-2-3",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-14-determiners-nouns"
}],
  ["c'est ce livre", {
  "unit": "unit2",
  "module": "2024-01-14-determiners-nouns",
  "lesson": "lesson-2-3",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-14-determiners-nouns"
}],
  ["vouloir", {
  "unit": "unit2",
  "module": "2024-01-15-vouloir",
  "lesson": "lesson-2-4",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-15-vouloir"
}],
  ["pouvoir", {
  "unit": "unit2",
  "module": "2024-01-16-pouvoir",
  "lesson": "lesson-2-5",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-16-pouvoir"
}],
  ["voir", {
  "unit": "unit2",
  "module": "2024-01-17-voir",
  "lesson": "lesson-2-6",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-17-voir"
}],
  ["que / quoi", {
  "unit": "unit2",
  "module": "2024-01-18-questions",
  "lesson": "lesson-2-7",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-18-questions"
}],
  ["qui", {
  "unit": "unit2",
  "module": "2024-01-18-questions",
  "lesson": "lesson-2-7",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-18-questions"
}],
  ["où", {
  "unit": "unit2",
  "module": "2024-01-18-questions",
  "lesson": "lesson-2-7",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-18-questions"
}],
  ["quand", {
  "unit": "unit2",
  "module": "2024-01-18-questions",
  "lesson": "lesson-2-7",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-18-questions"
}],
  ["comment", {
  "unit": "unit2",
  "module": "2024-01-18-questions",
  "lesson": "lesson-2-7",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-18-questions"
}],
  ["pourquoi", {
  "unit": "unit2",
  "module": "2024-01-18-questions",
  "lesson": "lesson-2-7",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-18-questions"
}],
  ["combien", {
  "unit": "unit2",
  "module": "2024-01-18-questions",
  "lesson": "lesson-2-7",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-18-questions"
}],
  ["quel/quelle", {
  "unit": "unit2",
  "module": "2024-01-18-questions",
  "lesson": "lesson-2-7",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-18-questions"
}],
  ["est-ce que", {
  "unit": "unit2",
  "module": "2024-01-18-questions",
  "lesson": "lesson-2-7",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-18-questions"
}],
  ["qu'est-ce que c'est", {
  "unit": "unit2",
  "module": "2024-01-18-questions",
  "lesson": "lesson-2-7",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-18-questions"
}],
  ["comment ça va", {
  "unit": "unit2",
  "module": "2024-01-18-questions",
  "lesson": "lesson-2-7",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-18-questions"
}],
  ["qu'est-ce que tu veux", {
  "unit": "unit2",
  "module": "2024-01-18-questions",
  "lesson": "lesson-2-7",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-18-questions"
}],
  ["est-ce que tu peux", {
  "unit": "unit2",
  "module": "2024-01-18-questions",
  "lesson": "lesson-2-7",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-18-questions"
}],
  ["moi", {
  "unit": "unit2",
  "module": "2024-01-19-stressed-pronouns",
  "lesson": "lesson-2-8",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-19-stressed-pronouns"
}],
  ["toi", {
  "unit": "unit2",
  "module": "2024-01-19-stressed-pronouns",
  "lesson": "lesson-2-8",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-19-stressed-pronouns"
}],
  ["lui", {
  "unit": "unit2",
  "module": "2024-01-19-stressed-pronouns",
  "lesson": "lesson-2-8",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-19-stressed-pronouns"
}],
  ["eux", {
  "unit": "unit2",
  "module": "2024-01-19-stressed-pronouns",
  "lesson": "lesson-2-8",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-19-stressed-pronouns"
}],
  ["avec", {
  "unit": "unit2",
  "module": "2024-01-20-prepositions",
  "lesson": "lesson-2-9",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-20-prepositions"
}],
  ["dans", {
  "unit": "unit2",
  "module": "2024-01-20-prepositions",
  "lesson": "lesson-2-9",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-20-prepositions"
}],
  ["sur", {
  "unit": "unit2",
  "module": "2024-01-20-prepositions",
  "lesson": "lesson-2-9",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-20-prepositions"
}],
  ["sous", {
  "unit": "unit2",
  "module": "2024-01-20-prepositions",
  "lesson": "lesson-2-9",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-20-prepositions"
}],
  ["devant", {
  "unit": "unit2",
  "module": "2024-01-20-prepositions",
  "lesson": "lesson-2-9",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-20-prepositions"
}],
  ["derrière", {
  "unit": "unit2",
  "module": "2024-01-20-prepositions",
  "lesson": "lesson-2-9",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-20-prepositions"
}],
  ["entre", {
  "unit": "unit2",
  "module": "2024-01-20-prepositions",
  "lesson": "lesson-2-9",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-20-prepositions"
}],
  ["à", {
  "unit": "unit2",
  "module": "2024-01-20-prepositions",
  "lesson": "lesson-2-9",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-20-prepositions"
}],
  ["de", {
  "unit": "unit2",
  "module": "2024-01-20-prepositions",
  "lesson": "lesson-2-9",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-20-prepositions"
}],
  ["pour", {
  "unit": "unit2",
  "module": "2024-01-20-prepositions",
  "lesson": "lesson-2-9",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-20-prepositions"
}],
  ["chez", {
  "unit": "unit2",
  "module": "2024-01-20-prepositions",
  "lesson": "lesson-2-9",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-20-prepositions"
}],
  ["bon / bonne", {
  "unit": "unit2",
  "module": "2024-01-21-adjectives",
  "lesson": "lesson-2-10",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-21-adjectives"
}],
  ["grand / grande", {
  "unit": "unit2",
  "module": "2024-01-21-adjectives",
  "lesson": "lesson-2-10",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-21-adjectives"
}],
  ["petit / petite", {
  "unit": "unit2",
  "module": "2024-01-21-adjectives",
  "lesson": "lesson-2-10",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-21-adjectives"
}],
  ["nouveau / nouvelle", {
  "unit": "unit2",
  "module": "2024-01-21-adjectives",
  "lesson": "lesson-2-10",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-21-adjectives"
}],
  ["vieux / vieille", {
  "unit": "unit2",
  "module": "2024-01-21-adjectives",
  "lesson": "lesson-2-10",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-21-adjectives"
}],
  ["jeune / jeune", {
  "unit": "unit2",
  "module": "2024-01-21-adjectives",
  "lesson": "lesson-2-10",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-21-adjectives"
}],
  ["beau / belle", {
  "unit": "unit2",
  "module": "2024-01-21-adjectives",
  "lesson": "lesson-2-10",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-21-adjectives"
}],
  ["autre / autre", {
  "unit": "unit2",
  "module": "2024-01-21-adjectives",
  "lesson": "lesson-2-10",
  "introduced_in": "Unit 2: Asking & Describing - 2024-01-21-adjectives"
}],
  ["du", {
  "unit": "unit3",
  "module": "2024-01-25-contractions",
  "lesson": "lesson-3-1",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-25-contractions"
}],
  ["de la", {
  "unit": "unit3",
  "module": "2024-01-25-contractions",
  "lesson": "lesson-3-1",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-25-contractions"
}],
  ["de l'", {
  "unit": "unit3",
  "module": "2024-01-25-contractions",
  "lesson": "lesson-3-1",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-25-contractions"
}],
  ["au", {
  "unit": "unit3",
  "module": "2024-01-25-contractions",
  "lesson": "lesson-3-1",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-25-contractions"
}],
  ["à la", {
  "unit": "unit3",
  "module": "2024-01-25-contractions",
  "lesson": "lesson-3-1",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-25-contractions"
}],
  ["à l'", {
  "unit": "unit3",
  "module": "2024-01-25-contractions",
  "lesson": "lesson-3-1",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-25-contractions"
}],
  ["aux", {
  "unit": "unit3",
  "module": "2024-01-25-contractions",
  "lesson": "lesson-3-1",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-25-contractions"
}],
  ["venir", {
  "unit": "unit3",
  "module": "2024-01-26-venir",
  "lesson": "lesson-3-2",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-26-venir"
}],
  ["aller", {
  "unit": "unit3",
  "module": "2024-01-27-aller",
  "lesson": "lesson-3-3",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-27-aller"
}],
  ["partir", {
  "unit": "unit3",
  "module": "2024-01-29-partir",
  "lesson": "lesson-3-5",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-29-partir"
}],
  ["me", {
  "unit": "unit3",
  "module": "2024-01-30-object-pronouns",
  "lesson": "lesson-3-6",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-30-object-pronouns"
}],
  ["te", {
  "unit": "unit3",
  "module": "2024-01-30-object-pronouns",
  "lesson": "lesson-3-6",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-30-object-pronouns"
}],
  ["mon", {
  "unit": "unit3",
  "module": "2024-01-31-possessive-adjectives",
  "lesson": "lesson-3-7",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-31-possessive-adjectives"
}],
  ["ma", {
  "unit": "unit3",
  "module": "2024-01-31-possessive-adjectives",
  "lesson": "lesson-3-7",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-31-possessive-adjectives"
}],
  ["mes", {
  "unit": "unit3",
  "module": "2024-01-31-possessive-adjectives",
  "lesson": "lesson-3-7",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-31-possessive-adjectives"
}],
  ["ton", {
  "unit": "unit3",
  "module": "2024-01-31-possessive-adjectives",
  "lesson": "lesson-3-7",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-31-possessive-adjectives"
}],
  ["ta", {
  "unit": "unit3",
  "module": "2024-01-31-possessive-adjectives",
  "lesson": "lesson-3-7",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-31-possessive-adjectives"
}],
  ["tes", {
  "unit": "unit3",
  "module": "2024-01-31-possessive-adjectives",
  "lesson": "lesson-3-7",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-31-possessive-adjectives"
}],
  ["son", {
  "unit": "unit3",
  "module": "2024-01-31-possessive-adjectives",
  "lesson": "lesson-3-7",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-31-possessive-adjectives"
}],
  ["sa", {
  "unit": "unit3",
  "module": "2024-01-31-possessive-adjectives",
  "lesson": "lesson-3-7",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-31-possessive-adjectives"
}],
  ["ses", {
  "unit": "unit3",
  "module": "2024-01-31-possessive-adjectives",
  "lesson": "lesson-3-7",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-31-possessive-adjectives"
}],
  ["notre", {
  "unit": "unit3",
  "module": "2024-01-31-possessive-adjectives",
  "lesson": "lesson-3-7",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-31-possessive-adjectives"
}],
  ["nos", {
  "unit": "unit3",
  "module": "2024-01-31-possessive-adjectives",
  "lesson": "lesson-3-7",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-31-possessive-adjectives"
}],
  ["votre", {
  "unit": "unit3",
  "module": "2024-01-31-possessive-adjectives",
  "lesson": "lesson-3-7",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-31-possessive-adjectives"
}],
  ["vos", {
  "unit": "unit3",
  "module": "2024-01-31-possessive-adjectives",
  "lesson": "lesson-3-7",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-31-possessive-adjectives"
}],
  ["leur", {
  "unit": "unit3",
  "module": "2024-01-31-possessive-adjectives",
  "lesson": "lesson-3-7",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-31-possessive-adjectives"
}],
  ["leurs", {
  "unit": "unit3",
  "module": "2024-01-31-possessive-adjectives",
  "lesson": "lesson-3-7",
  "introduced_in": "Unit 3: Movement & Possession - 2024-01-31-possessive-adjectives"
}],
  ["le mien", {
  "unit": "unit3",
  "module": "2024-02-01-possessive-pronouns",
  "lesson": "lesson-3-8",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-01-possessive-pronouns"
}],
  ["la mienne", {
  "unit": "unit3",
  "module": "2024-02-01-possessive-pronouns",
  "lesson": "lesson-3-8",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-01-possessive-pronouns"
}],
  ["le tien", {
  "unit": "unit3",
  "module": "2024-02-01-possessive-pronouns",
  "lesson": "lesson-3-8",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-01-possessive-pronouns"
}],
  ["la tienne", {
  "unit": "unit3",
  "module": "2024-02-01-possessive-pronouns",
  "lesson": "lesson-3-8",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-01-possessive-pronouns"
}],
  ["le sien", {
  "unit": "unit3",
  "module": "2024-02-01-possessive-pronouns",
  "lesson": "lesson-3-8",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-01-possessive-pronouns"
}],
  ["la sienne", {
  "unit": "unit3",
  "module": "2024-02-01-possessive-pronouns",
  "lesson": "lesson-3-8",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-01-possessive-pronouns"
}],
  ["le nôtre", {
  "unit": "unit3",
  "module": "2024-02-01-possessive-pronouns",
  "lesson": "lesson-3-8",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-01-possessive-pronouns"
}],
  ["la nôtre", {
  "unit": "unit3",
  "module": "2024-02-01-possessive-pronouns",
  "lesson": "lesson-3-8",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-01-possessive-pronouns"
}],
  ["le vôtre", {
  "unit": "unit3",
  "module": "2024-02-01-possessive-pronouns",
  "lesson": "lesson-3-8",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-01-possessive-pronouns"
}],
  ["la vôtre", {
  "unit": "unit3",
  "module": "2024-02-01-possessive-pronouns",
  "lesson": "lesson-3-8",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-01-possessive-pronouns"
}],
  ["le leur", {
  "unit": "unit3",
  "module": "2024-02-01-possessive-pronouns",
  "lesson": "lesson-3-8",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-01-possessive-pronouns"
}],
  ["la leur", {
  "unit": "unit3",
  "module": "2024-02-01-possessive-pronouns",
  "lesson": "lesson-3-8",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-01-possessive-pronouns"
}],
  ["il l'a", {
  "unit": "unit3",
  "module": "2024-02-02-combining",
  "lesson": "lesson-3-9",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-02-combining"
}],
  ["elle l'a", {
  "unit": "unit3",
  "module": "2024-02-02-combining",
  "lesson": "lesson-3-9",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-02-combining"
}],
  ["ils les ont", {
  "unit": "unit3",
  "module": "2024-02-02-combining",
  "lesson": "lesson-3-9",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-02-combining"
}],
  ["je le veux", {
  "unit": "unit3",
  "module": "2024-02-02-combining",
  "lesson": "lesson-3-9",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-02-combining"
}],
  ["c'est le mien", {
  "unit": "unit3",
  "module": "2024-02-02-combining",
  "lesson": "lesson-3-9",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-02-combining"
}],
  ["c'est le sien", {
  "unit": "unit3",
  "module": "2024-02-02-combining",
  "lesson": "lesson-3-9",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-02-combining"
}],
  ["c'est le leur", {
  "unit": "unit3",
  "module": "2024-02-02-combining",
  "lesson": "lesson-3-9",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-02-combining"
}],
  ["est-ce le tien", {
  "unit": "unit3",
  "module": "2024-02-02-combining",
  "lesson": "lesson-3-9",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-02-combining"
}],
  ["tu viens avec moi", {
  "unit": "unit3",
  "module": "2024-02-02-combining",
  "lesson": "lesson-3-9",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-02-combining"
}],
  ["il va partir", {
  "unit": "unit3",
  "module": "2024-02-02-combining",
  "lesson": "lesson-3-9",
  "introduced_in": "Unit 3: Movement & Possession - 2024-02-02-combining"
}],
  ["je voudrais", {
  "unit": "unit4",
  "module": "Survival Phrases",
  "lesson": "lesson-4-1",
  "introduced_in": "Unit 4: Everyday Words - Survival Phrases"
}],
  ["s'il te plaît", {
  "unit": "unit4",
  "module": "Survival Phrases",
  "lesson": "lesson-4-1",
  "introduced_in": "Unit 4: Everyday Words - Survival Phrases"
}],
  ["excusez-moi", {
  "unit": "unit4",
  "module": "Survival Phrases",
  "lesson": "lesson-4-1",
  "introduced_in": "Unit 4: Everyday Words - Survival Phrases"
}],
  ["bonne nuit", {
  "unit": "unit4",
  "module": "Survival Phrases",
  "lesson": "lesson-4-1",
  "introduced_in": "Unit 4: Everyday Words - Survival Phrases"
}],
  ["bonne journée", {
  "unit": "unit4",
  "module": "Survival Phrases",
  "lesson": "lesson-4-1",
  "introduced_in": "Unit 4: Everyday Words - Survival Phrases"
}],
  ["c'est combien", {
  "unit": "unit4",
  "module": "Survival Phrases",
  "lesson": "lesson-4-1",
  "introduced_in": "Unit 4: Everyday Words - Survival Phrases"
}],
  ["combien ça coûte", {
  "unit": "unit4",
  "module": "Survival Phrases",
  "lesson": "lesson-4-1",
  "introduced_in": "Unit 4: Everyday Words - Survival Phrases"
}],
  ["où sont", {
  "unit": "unit4",
  "module": "Survival Phrases",
  "lesson": "lesson-4-1",
  "introduced_in": "Unit 4: Everyday Words - Survival Phrases"
}],
  ["les toilettes", {
  "unit": "unit4",
  "module": "Survival Phrases",
  "lesson": "lesson-4-1",
  "introduced_in": "Unit 4: Everyday Words - Survival Phrases"
}],
  ["l'addition", {
  "unit": "unit4",
  "module": "Survival Phrases",
  "lesson": "lesson-4-1",
  "introduced_in": "Unit 4: Everyday Words - Survival Phrases"
}],
  ["faire", {
  "unit": "unit4",
  "module": "2024-03-25-faire",
  "lesson": "lesson-4-2",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-25-faire"
}],
  ["devoir", {
  "unit": "unit4",
  "module": "2024-03-23-devoir",
  "lesson": "lesson-4-3",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-23-devoir"
}],
  ["parler", {
  "unit": "unit4",
  "module": "2024-03-29-parler",
  "lesson": "lesson-4-4",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-29-parler"
}],
  ["chercher", {
  "unit": "unit4",
  "module": "2024-10-22-search-find",
  "lesson": "lesson-4-5",
  "introduced_in": "Unit 4: Everyday Words - 2024-10-22-search-find"
}],
  ["je cherche", {
  "unit": "unit4",
  "module": "2024-10-22-search-find",
  "lesson": "lesson-4-5",
  "introduced_in": "Unit 4: Everyday Words - 2024-10-22-search-find"
}],
  ["tu cherches", {
  "unit": "unit4",
  "module": "2024-10-22-search-find",
  "lesson": "lesson-4-5",
  "introduced_in": "Unit 4: Everyday Words - 2024-10-22-search-find"
}],
  ["il/elle cherche", {
  "unit": "unit4",
  "module": "2024-10-22-search-find",
  "lesson": "lesson-4-5",
  "introduced_in": "Unit 4: Everyday Words - 2024-10-22-search-find"
}],
  ["nous cherchons", {
  "unit": "unit4",
  "module": "2024-10-22-search-find",
  "lesson": "lesson-4-5",
  "introduced_in": "Unit 4: Everyday Words - 2024-10-22-search-find"
}],
  ["vous cherchez", {
  "unit": "unit4",
  "module": "2024-10-22-search-find",
  "lesson": "lesson-4-5",
  "introduced_in": "Unit 4: Everyday Words - 2024-10-22-search-find"
}],
  ["ils/elles cherchent", {
  "unit": "unit4",
  "module": "2024-10-22-search-find",
  "lesson": "lesson-4-5",
  "introduced_in": "Unit 4: Everyday Words - 2024-10-22-search-find"
}],
  ["trouver", {
  "unit": "unit4",
  "module": "2024-10-22-search-find",
  "lesson": "lesson-4-5",
  "introduced_in": "Unit 4: Everyday Words - 2024-10-22-search-find"
}],
  ["je trouve", {
  "unit": "unit4",
  "module": "2024-10-22-search-find",
  "lesson": "lesson-4-5",
  "introduced_in": "Unit 4: Everyday Words - 2024-10-22-search-find"
}],
  ["tu trouves", {
  "unit": "unit4",
  "module": "2024-10-22-search-find",
  "lesson": "lesson-4-5",
  "introduced_in": "Unit 4: Everyday Words - 2024-10-22-search-find"
}],
  ["il/elle trouve", {
  "unit": "unit4",
  "module": "2024-10-22-search-find",
  "lesson": "lesson-4-5",
  "introduced_in": "Unit 4: Everyday Words - 2024-10-22-search-find"
}],
  ["nous trouvons", {
  "unit": "unit4",
  "module": "2024-10-22-search-find",
  "lesson": "lesson-4-5",
  "introduced_in": "Unit 4: Everyday Words - 2024-10-22-search-find"
}],
  ["vous trouvez", {
  "unit": "unit4",
  "module": "2024-10-22-search-find",
  "lesson": "lesson-4-5",
  "introduced_in": "Unit 4: Everyday Words - 2024-10-22-search-find"
}],
  ["ils/elles trouvent", {
  "unit": "unit4",
  "module": "2024-10-22-search-find",
  "lesson": "lesson-4-5",
  "introduced_in": "Unit 4: Everyday Words - 2024-10-22-search-find"
}],
  ["ne...pas", {
  "unit": "unit4",
  "module": "2024-03-28-negation",
  "lesson": "lesson-4-6",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-28-negation"
}],
  ["je ne suis pas", {
  "unit": "unit4",
  "module": "2024-03-28-negation",
  "lesson": "lesson-4-6",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-28-negation"
}],
  ["je n'ai pas", {
  "unit": "unit4",
  "module": "2024-03-28-negation",
  "lesson": "lesson-4-6",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-28-negation"
}],
  ["je ne veux pas", {
  "unit": "unit4",
  "module": "2024-03-28-negation",
  "lesson": "lesson-4-6",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-28-negation"
}],
  ["je ne fais pas", {
  "unit": "unit4",
  "module": "2024-03-28-negation",
  "lesson": "lesson-4-6",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-28-negation"
}],
  ["tu ne vas pas", {
  "unit": "unit4",
  "module": "2024-03-28-negation",
  "lesson": "lesson-4-6",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-28-negation"
}],
  ["il ne voit pas", {
  "unit": "unit4",
  "module": "2024-03-28-negation",
  "lesson": "lesson-4-6",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-28-negation"
}],
  ["je ne le vois pas", {
  "unit": "unit4",
  "module": "2024-03-28-negation",
  "lesson": "lesson-4-6",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-28-negation"
}],
  ["toujours", {
  "unit": "unit4",
  "module": "2024-04-01-time-adverbs",
  "lesson": "lesson-4-7",
  "introduced_in": "Unit 4: Everyday Words - 2024-04-01-time-adverbs"
}],
  ["pour toujours", {
  "unit": "unit4",
  "module": "2024-04-01-time-adverbs",
  "lesson": "lesson-4-7",
  "introduced_in": "Unit 4: Everyday Words - 2024-04-01-time-adverbs"
}],
  ["souvent", {
  "unit": "unit4",
  "module": "2024-04-01-time-adverbs",
  "lesson": "lesson-4-7",
  "introduced_in": "Unit 4: Everyday Words - 2024-04-01-time-adverbs"
}],
  ["parfois", {
  "unit": "unit4",
  "module": "2024-04-01-time-adverbs",
  "lesson": "lesson-4-7",
  "introduced_in": "Unit 4: Everyday Words - 2024-04-01-time-adverbs"
}],
  ["de temps en temps", {
  "unit": "unit4",
  "module": "2024-04-01-time-adverbs",
  "lesson": "lesson-4-7",
  "introduced_in": "Unit 4: Everyday Words - 2024-04-01-time-adverbs"
}],
  ["rarement", {
  "unit": "unit4",
  "module": "2024-04-01-time-adverbs",
  "lesson": "lesson-4-7",
  "introduced_in": "Unit 4: Everyday Words - 2024-04-01-time-adverbs"
}],
  ["très rarement", {
  "unit": "unit4",
  "module": "2024-04-01-time-adverbs",
  "lesson": "lesson-4-7",
  "introduced_in": "Unit 4: Everyday Words - 2024-04-01-time-adverbs"
}],
  ["jamais", {
  "unit": "unit4",
  "module": "2024-04-01-time-adverbs",
  "lesson": "lesson-4-7",
  "introduced_in": "Unit 4: Everyday Words - 2024-04-01-time-adverbs"
}],
  ["déjà", {
  "unit": "unit4",
  "module": "2024-04-01-time-adverbs",
  "lesson": "lesson-4-7",
  "introduced_in": "Unit 4: Everyday Words - 2024-04-01-time-adverbs"
}],
  ["encore", {
  "unit": "unit4",
  "module": "2024-04-01-time-adverbs",
  "lesson": "lesson-4-7",
  "introduced_in": "Unit 4: Everyday Words - 2024-04-01-time-adverbs"
}],
  ["juste", {
  "unit": "unit4",
  "module": "2024-04-01-time-adverbs",
  "lesson": "lesson-4-7",
  "introduced_in": "Unit 4: Everyday Words - 2024-04-01-time-adverbs"
}],
  ["maintenant", {
  "unit": "unit4",
  "module": "2024-04-01-time-adverbs",
  "lesson": "lesson-4-7",
  "introduced_in": "Unit 4: Everyday Words - 2024-04-01-time-adverbs"
}],
  ["aujourd'hui", {
  "unit": "unit4",
  "module": "2024-04-01-time-adverbs",
  "lesson": "lesson-4-7",
  "introduced_in": "Unit 4: Everyday Words - 2024-04-01-time-adverbs"
}],
  ["demain", {
  "unit": "unit4",
  "module": "2024-04-01-time-adverbs",
  "lesson": "lesson-4-7",
  "introduced_in": "Unit 4: Everyday Words - 2024-04-01-time-adverbs"
}],
  ["hier", {
  "unit": "unit4",
  "module": "2024-04-01-time-adverbs",
  "lesson": "lesson-4-7",
  "introduced_in": "Unit 4: Everyday Words - 2024-04-01-time-adverbs"
}],
  ["avant-hier", {
  "unit": "unit4",
  "module": "2024-04-01-time-adverbs",
  "lesson": "lesson-4-7",
  "introduced_in": "Unit 4: Everyday Words - 2024-04-01-time-adverbs"
}],
  ["je ne peux pas", {
  "unit": "unit4",
  "module": "2024-03-27-negation-2",
  "lesson": "lesson-4-8",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-27-negation-2"
}],
  ["tu ne peux pas", {
  "unit": "unit4",
  "module": "2024-03-27-negation-2",
  "lesson": "lesson-4-8",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-27-negation-2"
}],
  ["nous ne pouvons pas", {
  "unit": "unit4",
  "module": "2024-03-27-negation-2",
  "lesson": "lesson-4-8",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-27-negation-2"
}],
  ["tu ne veux jamais", {
  "unit": "unit4",
  "module": "2024-03-27-negation-2",
  "lesson": "lesson-4-8",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-27-negation-2"
}],
  ["il ne fait jamais", {
  "unit": "unit4",
  "module": "2024-03-27-negation-2",
  "lesson": "lesson-4-8",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-27-negation-2"
}],
  ["nous ne faisons pas", {
  "unit": "unit4",
  "module": "2024-03-27-negation-2",
  "lesson": "lesson-4-8",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-27-negation-2"
}],
  ["ils ne sont pas", {
  "unit": "unit4",
  "module": "2024-03-27-negation-2",
  "lesson": "lesson-4-8",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-27-negation-2"
}],
  ["nous n'allons pas", {
  "unit": "unit4",
  "module": "2024-03-27-negation-2",
  "lesson": "lesson-4-8",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-27-negation-2"
}],
  ["elle ne voit jamais", {
  "unit": "unit4",
  "module": "2024-03-27-negation-2",
  "lesson": "lesson-4-8",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-27-negation-2"
}],
  ["je ne le veux pas", {
  "unit": "unit4",
  "module": "2024-03-27-negation-2",
  "lesson": "lesson-4-8",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-27-negation-2"
}],
  ["ici", {
  "unit": "unit4",
  "module": "2024-03-26-location-adverbs",
  "lesson": "lesson-4-9",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-26-location-adverbs"
}],
  ["là", {
  "unit": "unit4",
  "module": "2024-03-26-location-adverbs",
  "lesson": "lesson-4-9",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-26-location-adverbs"
}],
  ["là-bas", {
  "unit": "unit4",
  "module": "2024-03-26-location-adverbs",
  "lesson": "lesson-4-9",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-26-location-adverbs"
}],
  ["partout", {
  "unit": "unit4",
  "module": "2024-03-26-location-adverbs",
  "lesson": "lesson-4-9",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-26-location-adverbs"
}],
  ["quelque part", {
  "unit": "unit4",
  "module": "2024-03-26-location-adverbs",
  "lesson": "lesson-4-9",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-26-location-adverbs"
}],
  ["nulle part", {
  "unit": "unit4",
  "module": "2024-03-26-location-adverbs",
  "lesson": "lesson-4-9",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-26-location-adverbs"
}],
  ["le temps", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["la vie", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["le monde", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["l'eau", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["le pain", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["l'argent", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["le travail", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["la ville", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["la place", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["la rue", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["la table", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["la main", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["la tête", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["le nom", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["la porte", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["tout le monde", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["personne", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["quelqu'un", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["quelque chose", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["la carte de crédit", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["les espèces", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["une carafe d'eau", {
  "unit": "unit4",
  "module": "2024-03-24-everyday-nouns",
  "lesson": "lesson-4-10",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-24-everyday-nouns"
}],
  ["Jardin du Luxembourg", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["Saint-Germain", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["ça va bien", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["le matin", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["ce soir", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["le problème", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["d'argent", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["avec moi", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["dans ma maison", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["je paie", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["tu ne dois pas", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["je la vois", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["à ce soir", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["tu es là", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["viens", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["qu'est-ce que vous voulez", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["nous voudrions", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["autres", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["le meilleur", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["tu parles bien", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["mais non", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["nouvelle", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["mon ami", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["nous sommes amis", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["j'aime", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["cette ville", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["manger", {
  "unit": "unit4",
  "module": "2024-03-30-reading-4",
  "lesson": "lesson-4-11",
  "introduced_in": "Unit 4: Everyday Words - 2024-03-30-reading-4"
}],
  ["plus", {
  "unit": "unit5",
  "module": "2024-04-08-comparisons",
  "lesson": "lesson-5-1",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-08-comparisons"
}],
  ["moins", {
  "unit": "unit5",
  "module": "2024-04-08-comparisons",
  "lesson": "lesson-5-1",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-08-comparisons"
}],
  ["meilleur / meilleure", {
  "unit": "unit5",
  "module": "2024-04-08-comparisons",
  "lesson": "lesson-5-1",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-08-comparisons"
}],
  ["le meilleur / la meilleure", {
  "unit": "unit5",
  "module": "2024-04-08-comparisons",
  "lesson": "lesson-5-1",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-08-comparisons"
}],
  ["pire", {
  "unit": "unit5",
  "module": "2024-04-08-comparisons",
  "lesson": "lesson-5-1",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-08-comparisons"
}],
  ["le/la pire", {
  "unit": "unit5",
  "module": "2024-04-08-comparisons",
  "lesson": "lesson-5-1",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-08-comparisons"
}],
  ["trop", {
  "unit": "unit5",
  "module": "2024-04-08-comparisons",
  "lesson": "lesson-5-1",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-08-comparisons"
}],
  ["tout / toute / tous / toutes", {
  "unit": "unit5",
  "module": "2024-04-08-comparisons",
  "lesson": "lesson-5-1",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-08-comparisons"
}],
  ["même", {
  "unit": "unit5",
  "module": "2024-04-08-comparisons",
  "lesson": "lesson-5-1",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-08-comparisons"
}],
  ["mal", {
  "unit": "unit5",
  "module": "2024-04-08-comparisons",
  "lesson": "lesson-5-1",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-08-comparisons"
}],
  ["c'est ouf", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est chelou", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est génial", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est nul", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est cool", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est dingue", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est grave", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["vachement", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["hyper", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est malade", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est capot", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est écœurant", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est le fun", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est poche", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est ben correct", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est gnama", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est fort", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est chaud", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est top", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["c'est mortel", {
  "unit": "unit5",
  "module": "2024-04-07-comparisons-slang",
  "lesson": "lesson-5-2",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-07-comparisons-slang"
}],
  ["je devrais", {
  "unit": "unit5",
  "module": "2024-04-09-conditionals",
  "lesson": "lesson-5-3",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-09-conditionals"
}],
  ["tu devrais", {
  "unit": "unit5",
  "module": "2024-04-09-conditionals",
  "lesson": "lesson-5-3",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-09-conditionals"
}],
  ["il/elle devrait", {
  "unit": "unit5",
  "module": "2024-04-09-conditionals",
  "lesson": "lesson-5-3",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-09-conditionals"
}],
  ["nous devrions", {
  "unit": "unit5",
  "module": "2024-04-09-conditionals",
  "lesson": "lesson-5-3",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-09-conditionals"
}],
  ["vous devriez", {
  "unit": "unit5",
  "module": "2024-04-09-conditionals",
  "lesson": "lesson-5-3",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-09-conditionals"
}],
  ["ils/elles devraient", {
  "unit": "unit5",
  "module": "2024-04-09-conditionals",
  "lesson": "lesson-5-3",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-09-conditionals"
}],
  ["je pourrais", {
  "unit": "unit5",
  "module": "2024-04-09-conditionals",
  "lesson": "lesson-5-3",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-09-conditionals"
}],
  ["tu pourrais", {
  "unit": "unit5",
  "module": "2024-04-09-conditionals",
  "lesson": "lesson-5-3",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-09-conditionals"
}],
  ["il/elle pourrait", {
  "unit": "unit5",
  "module": "2024-04-09-conditionals",
  "lesson": "lesson-5-3",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-09-conditionals"
}],
  ["nous pourrions", {
  "unit": "unit5",
  "module": "2024-04-09-conditionals",
  "lesson": "lesson-5-3",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-09-conditionals"
}],
  ["vous pourriez", {
  "unit": "unit5",
  "module": "2024-04-09-conditionals",
  "lesson": "lesson-5-3",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-09-conditionals"
}],
  ["ils/elles pourraient", {
  "unit": "unit5",
  "module": "2024-04-09-conditionals",
  "lesson": "lesson-5-3",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-09-conditionals"
}],
  ["tu voudrais", {
  "unit": "unit5",
  "module": "2024-04-16-would-conditionals",
  "lesson": "lesson-5-4",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-16-would-conditionals"
}],
  ["il/elle voudrait", {
  "unit": "unit5",
  "module": "2024-04-16-would-conditionals",
  "lesson": "lesson-5-4",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-16-would-conditionals"
}],
  ["vous voudriez", {
  "unit": "unit5",
  "module": "2024-04-16-would-conditionals",
  "lesson": "lesson-5-4",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-16-would-conditionals"
}],
  ["ils/elles voudraient", {
  "unit": "unit5",
  "module": "2024-04-16-would-conditionals",
  "lesson": "lesson-5-4",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-16-would-conditionals"
}],
  ["j'irais", {
  "unit": "unit5",
  "module": "2024-04-16-would-conditionals",
  "lesson": "lesson-5-4",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-16-would-conditionals"
}],
  ["tu irais", {
  "unit": "unit5",
  "module": "2024-04-16-would-conditionals",
  "lesson": "lesson-5-4",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-16-would-conditionals"
}],
  ["il/elle irait", {
  "unit": "unit5",
  "module": "2024-04-16-would-conditionals",
  "lesson": "lesson-5-4",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-16-would-conditionals"
}],
  ["nous irions", {
  "unit": "unit5",
  "module": "2024-04-16-would-conditionals",
  "lesson": "lesson-5-4",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-16-would-conditionals"
}],
  ["vous iriez", {
  "unit": "unit5",
  "module": "2024-04-16-would-conditionals",
  "lesson": "lesson-5-4",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-16-would-conditionals"
}],
  ["ils/elles iraient", {
  "unit": "unit5",
  "module": "2024-04-16-would-conditionals",
  "lesson": "lesson-5-4",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-16-would-conditionals"
}],
  ["je ferais", {
  "unit": "unit5",
  "module": "2024-04-16-would-conditionals",
  "lesson": "lesson-5-4",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-16-would-conditionals"
}],
  ["tu ferais", {
  "unit": "unit5",
  "module": "2024-04-16-would-conditionals",
  "lesson": "lesson-5-4",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-16-would-conditionals"
}],
  ["il/elle ferait", {
  "unit": "unit5",
  "module": "2024-04-16-would-conditionals",
  "lesson": "lesson-5-4",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-16-would-conditionals"
}],
  ["nous ferions", {
  "unit": "unit5",
  "module": "2024-04-16-would-conditionals",
  "lesson": "lesson-5-4",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-16-would-conditionals"
}],
  ["vous feriez", {
  "unit": "unit5",
  "module": "2024-04-16-would-conditionals",
  "lesson": "lesson-5-4",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-16-would-conditionals"
}],
  ["ils/elles feraient", {
  "unit": "unit5",
  "module": "2024-04-16-would-conditionals",
  "lesson": "lesson-5-4",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-16-would-conditionals"
}],
  ["aimer", {
  "unit": "unit5",
  "module": "2024-04-04-aimer",
  "lesson": "lesson-5-5",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-04-aimer"
}],
  ["tu aimes", {
  "unit": "unit5",
  "module": "2024-04-04-aimer",
  "lesson": "lesson-5-5",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-04-aimer"
}],
  ["il/elle aime", {
  "unit": "unit5",
  "module": "2024-04-04-aimer",
  "lesson": "lesson-5-5",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-04-aimer"
}],
  ["nous aimons", {
  "unit": "unit5",
  "module": "2024-04-04-aimer",
  "lesson": "lesson-5-5",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-04-aimer"
}],
  ["vous aimez", {
  "unit": "unit5",
  "module": "2024-04-04-aimer",
  "lesson": "lesson-5-5",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-04-aimer"
}],
  ["ils/elles aiment", {
  "unit": "unit5",
  "module": "2024-04-04-aimer",
  "lesson": "lesson-5-5",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-04-aimer"
}],
  ["aimer bien", {
  "unit": "unit5",
  "module": "2024-04-04-aimer",
  "lesson": "lesson-5-5",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-04-aimer"
}],
  ["je t'aime", {
  "unit": "unit5",
  "module": "2024-04-04-aimer",
  "lesson": "lesson-5-5",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-04-aimer"
}],
  ["j'étais", {
  "unit": "unit5",
  "module": "2024-04-10-etre-past",
  "lesson": "lesson-5-6",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-10-etre-past"
}],
  ["tu étais", {
  "unit": "unit5",
  "module": "2024-04-10-etre-past",
  "lesson": "lesson-5-6",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-10-etre-past"
}],
  ["il/elle était", {
  "unit": "unit5",
  "module": "2024-04-10-etre-past",
  "lesson": "lesson-5-6",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-10-etre-past"
}],
  ["nous étions", {
  "unit": "unit5",
  "module": "2024-04-10-etre-past",
  "lesson": "lesson-5-6",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-10-etre-past"
}],
  ["vous étiez", {
  "unit": "unit5",
  "module": "2024-04-10-etre-past",
  "lesson": "lesson-5-6",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-10-etre-past"
}],
  ["ils/elles étaient", {
  "unit": "unit5",
  "module": "2024-04-10-etre-past",
  "lesson": "lesson-5-6",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-10-etre-past"
}],
  ["j'avais", {
  "unit": "unit5",
  "module": "2024-04-05-avoir-past",
  "lesson": "lesson-5-7",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-05-avoir-past"
}],
  ["tu avais", {
  "unit": "unit5",
  "module": "2024-04-05-avoir-past",
  "lesson": "lesson-5-7",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-05-avoir-past"
}],
  ["il/elle avait", {
  "unit": "unit5",
  "module": "2024-04-05-avoir-past",
  "lesson": "lesson-5-7",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-05-avoir-past"
}],
  ["nous avions", {
  "unit": "unit5",
  "module": "2024-04-05-avoir-past",
  "lesson": "lesson-5-7",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-05-avoir-past"
}],
  ["vous aviez", {
  "unit": "unit5",
  "module": "2024-04-05-avoir-past",
  "lesson": "lesson-5-7",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-05-avoir-past"
}],
  ["ils/elles avaient", {
  "unit": "unit5",
  "module": "2024-04-05-avoir-past",
  "lesson": "lesson-5-7",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-05-avoir-past"
}],
  ["avoir faim", {
  "unit": "unit5",
  "module": "2024-04-05-avoir-past",
  "lesson": "lesson-5-7",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-05-avoir-past"
}],
  ["avoir raison", {
  "unit": "unit5",
  "module": "2024-04-05-avoir-past",
  "lesson": "lesson-5-7",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-05-avoir-past"
}],
  ["le café", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["un express", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["le thé", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["le lait", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["le vin", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["la bière", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["le jus", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["une baguette", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["un croissant", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["le beurre", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["le fromage", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["la pizza", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["le sel", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["le poivre", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["le sucre", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["la viande", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["le poulet", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["le poisson", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["le bœuf", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["le porc", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["les œufs", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["les légumes", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["la salade", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["la tomate", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["la pomme de terre", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["les frites", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["les haricots", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["les fruits", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["la pomme", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["la banane", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["l'orange", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["le riz", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["les pâtes", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["le gâteau", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["la glace", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["le chocolat", {
  "unit": "unit5",
  "module": "2024-04-11-food-nouns",
  "lesson": "lesson-5-8",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-11-food-nouns"
}],
  ["je mange", {
  "unit": "unit5",
  "module": "2024-04-12-manger",
  "lesson": "lesson-5-9",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-12-manger"
}],
  ["tu manges", {
  "unit": "unit5",
  "module": "2024-04-12-manger",
  "lesson": "lesson-5-9",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-12-manger"
}],
  ["il/elle mange", {
  "unit": "unit5",
  "module": "2024-04-12-manger",
  "lesson": "lesson-5-9",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-12-manger"
}],
  ["nous mangeons", {
  "unit": "unit5",
  "module": "2024-04-12-manger",
  "lesson": "lesson-5-9",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-12-manger"
}],
  ["vous mangez", {
  "unit": "unit5",
  "module": "2024-04-12-manger",
  "lesson": "lesson-5-9",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-12-manger"
}],
  ["ils/elles mangent", {
  "unit": "unit5",
  "module": "2024-04-12-manger",
  "lesson": "lesson-5-9",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-12-manger"
}],
  ["j'ai mangé", {
  "unit": "unit5",
  "module": "2024-04-12-manger",
  "lesson": "lesson-5-9",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-12-manger"
}],
  ["tu as mangé", {
  "unit": "unit5",
  "module": "2024-04-12-manger",
  "lesson": "lesson-5-9",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-12-manger"
}],
  ["il/elle a mangé", {
  "unit": "unit5",
  "module": "2024-04-12-manger",
  "lesson": "lesson-5-9",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-12-manger"
}],
  ["nous avons mangé", {
  "unit": "unit5",
  "module": "2024-04-12-manger",
  "lesson": "lesson-5-9",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-12-manger"
}],
  ["vous avez mangé", {
  "unit": "unit5",
  "module": "2024-04-12-manger",
  "lesson": "lesson-5-9",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-12-manger"
}],
  ["ils/elles ont mangé", {
  "unit": "unit5",
  "module": "2024-04-12-manger",
  "lesson": "lesson-5-9",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-12-manger"
}],
  ["boire", {
  "unit": "unit5",
  "module": "2024-04-06-boire",
  "lesson": "lesson-5-10",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-06-boire"
}],
  ["je bois", {
  "unit": "unit5",
  "module": "2024-04-06-boire",
  "lesson": "lesson-5-10",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-06-boire"
}],
  ["tu bois", {
  "unit": "unit5",
  "module": "2024-04-06-boire",
  "lesson": "lesson-5-10",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-06-boire"
}],
  ["il/elle boit", {
  "unit": "unit5",
  "module": "2024-04-06-boire",
  "lesson": "lesson-5-10",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-06-boire"
}],
  ["nous buvons", {
  "unit": "unit5",
  "module": "2024-04-06-boire",
  "lesson": "lesson-5-10",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-06-boire"
}],
  ["vous buvez", {
  "unit": "unit5",
  "module": "2024-04-06-boire",
  "lesson": "lesson-5-10",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-06-boire"
}],
  ["ils/elles boivent", {
  "unit": "unit5",
  "module": "2024-04-06-boire",
  "lesson": "lesson-5-10",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-06-boire"
}],
  ["j'ai bu", {
  "unit": "unit5",
  "module": "2024-04-06-boire",
  "lesson": "lesson-5-10",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-06-boire"
}],
  ["tu as bu", {
  "unit": "unit5",
  "module": "2024-04-06-boire",
  "lesson": "lesson-5-10",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-06-boire"
}],
  ["il/elle a bu", {
  "unit": "unit5",
  "module": "2024-04-06-boire",
  "lesson": "lesson-5-10",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-06-boire"
}],
  ["nous avons bu", {
  "unit": "unit5",
  "module": "2024-04-06-boire",
  "lesson": "lesson-5-10",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-06-boire"
}],
  ["vous avez bu", {
  "unit": "unit5",
  "module": "2024-04-06-boire",
  "lesson": "lesson-5-10",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-06-boire"
}],
  ["ils/elles ont bu", {
  "unit": "unit5",
  "module": "2024-04-06-boire",
  "lesson": "lesson-5-10",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-06-boire"
}],
  ["était", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["c'était", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["avions faim", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["avions mangé", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["a mangé", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["nous avons vu", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["a dit", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["j'ai dit", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["payer", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["nous ne pouvions pas", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["meilleur que", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["la meilleure", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["le même", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["génial", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["top", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["une pizza", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["un expresso", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["le restaurant", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["faim", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["contents", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["moi aussi", {
  "unit": "unit5",
  "module": "2024-04-13-reading-5",
  "lesson": "lesson-5-11",
  "introduced_in": "Unit 5: Time & Taste - 2024-04-13-reading-5"
}],
  ["être en train de", {
  "unit": "unit6",
  "module": "2024-04-23-progressive-tenses",
  "lesson": "lesson-6-1",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-23-progressive-tenses"
}],
  ["je suis en train de manger", {
  "unit": "unit6",
  "module": "2024-04-23-progressive-tenses",
  "lesson": "lesson-6-1",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-23-progressive-tenses"
}],
  ["j'étais en train de parler", {
  "unit": "unit6",
  "module": "2024-04-23-progressive-tenses",
  "lesson": "lesson-6-1",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-23-progressive-tenses"
}],
  ["je vais partir", {
  "unit": "unit6",
  "module": "2024-04-23-progressive-tenses",
  "lesson": "lesson-6-1",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-23-progressive-tenses"
}],
  ["je vais manger", {
  "unit": "unit6",
  "module": "2024-04-23-progressive-tenses",
  "lesson": "lesson-6-1",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-23-progressive-tenses"
}],
  ["je parlerai", {
  "unit": "unit6",
  "module": "2024-04-23-progressive-tenses",
  "lesson": "lesson-6-1",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-23-progressive-tenses"
}],
  ["tu mangeras", {
  "unit": "unit6",
  "module": "2024-04-23-progressive-tenses",
  "lesson": "lesson-6-1",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-23-progressive-tenses"
}],
  ["il ira", {
  "unit": "unit6",
  "module": "2024-04-23-progressive-tenses",
  "lesson": "lesson-6-1",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-23-progressive-tenses"
}],
  ["je ne vais pas", {
  "unit": "unit6",
  "module": "2024-04-23-progressive-tenses",
  "lesson": "lesson-6-1",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-23-progressive-tenses"
}],
  ["je ne devrais pas", {
  "unit": "unit6",
  "module": "2024-04-23-progressive-tenses",
  "lesson": "lesson-6-1",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-23-progressive-tenses"
}],
  ["je ne ferai pas", {
  "unit": "unit6",
  "module": "2024-04-23-progressive-tenses",
  "lesson": "lesson-6-1",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-23-progressive-tenses"
}],
  ["dire", {
  "unit": "unit6",
  "module": "2024-04-20-dire",
  "lesson": "lesson-6-2",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-20-dire"
}],
  ["je dis", {
  "unit": "unit6",
  "module": "2024-04-20-dire",
  "lesson": "lesson-6-2",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-20-dire"
}],
  ["tu dis", {
  "unit": "unit6",
  "module": "2024-04-20-dire",
  "lesson": "lesson-6-2",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-20-dire"
}],
  ["il/elle dit", {
  "unit": "unit6",
  "module": "2024-04-20-dire",
  "lesson": "lesson-6-2",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-20-dire"
}],
  ["nous disons", {
  "unit": "unit6",
  "module": "2024-04-20-dire",
  "lesson": "lesson-6-2",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-20-dire"
}],
  ["vous dites", {
  "unit": "unit6",
  "module": "2024-04-20-dire",
  "lesson": "lesson-6-2",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-20-dire"
}],
  ["ils/elles disent", {
  "unit": "unit6",
  "module": "2024-04-20-dire",
  "lesson": "lesson-6-2",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-20-dire"
}],
  ["dire que", {
  "unit": "unit6",
  "module": "2024-04-20-dire",
  "lesson": "lesson-6-2",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-20-dire"
}],
  ["dire à quelqu'un", {
  "unit": "unit6",
  "module": "2024-04-20-dire",
  "lesson": "lesson-6-2",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-20-dire"
}],
  ["je te dis", {
  "unit": "unit6",
  "module": "2024-04-20-dire",
  "lesson": "lesson-6-2",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-20-dire"
}],
  ["il me dit", {
  "unit": "unit6",
  "module": "2024-04-20-dire",
  "lesson": "lesson-6-2",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-20-dire"
}],
  ["c'est-à-dire", {
  "unit": "unit6",
  "module": "2024-04-20-dire",
  "lesson": "lesson-6-2",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-20-dire"
}],
  ["on dit que", {
  "unit": "unit6",
  "module": "2024-04-20-dire",
  "lesson": "lesson-6-2",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-20-dire"
}],
  ["comme on dit", {
  "unit": "unit6",
  "module": "2024-04-20-dire",
  "lesson": "lesson-6-2",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-20-dire"
}],
  ["prendre", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["je prends", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["tu prends", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["il/elle prend", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["nous prenons", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["vous prenez", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["ils/elles prennent", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["prendre le bus", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["prendre un café", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["apprendre", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["j'apprends", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["j'apprends le français", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["comprendre", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["je comprends", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["tu comprends?", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["je ne comprends pas", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["prends-le, s'il te plaît", {
  "unit": "unit6",
  "module": "2024-04-22-prendre",
  "lesson": "lesson-6-3",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-22-prendre"
}],
  ["donner", {
  "unit": "unit6",
  "module": "2024-10-22-donner",
  "lesson": "lesson-6-4",
  "introduced_in": "Unit 6: Basic Fluency - 2024-10-22-donner"
}],
  ["je donne", {
  "unit": "unit6",
  "module": "2024-10-22-donner",
  "lesson": "lesson-6-4",
  "introduced_in": "Unit 6: Basic Fluency - 2024-10-22-donner"
}],
  ["tu donnes", {
  "unit": "unit6",
  "module": "2024-10-22-donner",
  "lesson": "lesson-6-4",
  "introduced_in": "Unit 6: Basic Fluency - 2024-10-22-donner"
}],
  ["il/elle donne", {
  "unit": "unit6",
  "module": "2024-10-22-donner",
  "lesson": "lesson-6-4",
  "introduced_in": "Unit 6: Basic Fluency - 2024-10-22-donner"
}],
  ["nous donnons", {
  "unit": "unit6",
  "module": "2024-10-22-donner",
  "lesson": "lesson-6-4",
  "introduced_in": "Unit 6: Basic Fluency - 2024-10-22-donner"
}],
  ["vous donnez", {
  "unit": "unit6",
  "module": "2024-10-22-donner",
  "lesson": "lesson-6-4",
  "introduced_in": "Unit 6: Basic Fluency - 2024-10-22-donner"
}],
  ["ils/elles donnent", {
  "unit": "unit6",
  "module": "2024-10-22-donner",
  "lesson": "lesson-6-4",
  "introduced_in": "Unit 6: Basic Fluency - 2024-10-22-donner"
}],
  ["donner le livre", {
  "unit": "unit6",
  "module": "2024-10-22-donner",
  "lesson": "lesson-6-4",
  "introduced_in": "Unit 6: Basic Fluency - 2024-10-22-donner"
}],
  ["donner l'adresse", {
  "unit": "unit6",
  "module": "2024-10-22-donner",
  "lesson": "lesson-6-4",
  "introduced_in": "Unit 6: Basic Fluency - 2024-10-22-donner"
}],
  ["donner à", {
  "unit": "unit6",
  "module": "2024-10-22-donner",
  "lesson": "lesson-6-4",
  "introduced_in": "Unit 6: Basic Fluency - 2024-10-22-donner"
}],
  ["donne-moi", {
  "unit": "unit6",
  "module": "2024-10-22-donner",
  "lesson": "lesson-6-4",
  "introduced_in": "Unit 6: Basic Fluency - 2024-10-22-donner"
}],
  ["mettre", {
  "unit": "unit6",
  "module": "2024-04-21-mettre",
  "lesson": "lesson-6-5",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-21-mettre"
}],
  ["je mets", {
  "unit": "unit6",
  "module": "2024-04-21-mettre",
  "lesson": "lesson-6-5",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-21-mettre"
}],
  ["tu mets", {
  "unit": "unit6",
  "module": "2024-04-21-mettre",
  "lesson": "lesson-6-5",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-21-mettre"
}],
  ["il/elle met", {
  "unit": "unit6",
  "module": "2024-04-21-mettre",
  "lesson": "lesson-6-5",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-21-mettre"
}],
  ["nous mettons", {
  "unit": "unit6",
  "module": "2024-04-21-mettre",
  "lesson": "lesson-6-5",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-21-mettre"
}],
  ["vous mettez", {
  "unit": "unit6",
  "module": "2024-04-21-mettre",
  "lesson": "lesson-6-5",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-21-mettre"
}],
  ["ils/elles mettent", {
  "unit": "unit6",
  "module": "2024-04-21-mettre",
  "lesson": "lesson-6-5",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-21-mettre"
}],
  ["mettre la table", {
  "unit": "unit6",
  "module": "2024-04-21-mettre",
  "lesson": "lesson-6-5",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-21-mettre"
}],
  ["mettre un pantalon", {
  "unit": "unit6",
  "module": "2024-04-21-mettre",
  "lesson": "lesson-6-5",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-21-mettre"
}],
  ["mettre un manteau", {
  "unit": "unit6",
  "module": "2024-04-21-mettre",
  "lesson": "lesson-6-5",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-21-mettre"
}],
  ["mettre du temps", {
  "unit": "unit6",
  "module": "2024-04-21-mettre",
  "lesson": "lesson-6-5",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-21-mettre"
}],
  ["qu'est-ce que tu mets?", {
  "unit": "unit6",
  "module": "2024-04-21-mettre",
  "lesson": "lesson-6-5",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-21-mettre"
}],
  ["demander", {
  "unit": "unit6",
  "module": "2024-04-19-demander",
  "lesson": "lesson-6-6",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-19-demander"
}],
  ["je demande", {
  "unit": "unit6",
  "module": "2024-04-19-demander",
  "lesson": "lesson-6-6",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-19-demander"
}],
  ["tu demandes", {
  "unit": "unit6",
  "module": "2024-04-19-demander",
  "lesson": "lesson-6-6",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-19-demander"
}],
  ["il/elle demande", {
  "unit": "unit6",
  "module": "2024-04-19-demander",
  "lesson": "lesson-6-6",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-19-demander"
}],
  ["nous demandons", {
  "unit": "unit6",
  "module": "2024-04-19-demander",
  "lesson": "lesson-6-6",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-19-demander"
}],
  ["vous demandez", {
  "unit": "unit6",
  "module": "2024-04-19-demander",
  "lesson": "lesson-6-6",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-19-demander"
}],
  ["ils/elles demandent", {
  "unit": "unit6",
  "module": "2024-04-19-demander",
  "lesson": "lesson-6-6",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-19-demander"
}],
  ["demander de l'aide", {
  "unit": "unit6",
  "module": "2024-04-19-demander",
  "lesson": "lesson-6-6",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-19-demander"
}],
  ["demander pardon", {
  "unit": "unit6",
  "module": "2024-04-19-demander",
  "lesson": "lesson-6-6",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-19-demander"
}],
  ["demander la permission", {
  "unit": "unit6",
  "module": "2024-04-19-demander",
  "lesson": "lesson-6-6",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-19-demander"
}],
  ["demander à quelqu'un", {
  "unit": "unit6",
  "module": "2024-04-19-demander",
  "lesson": "lesson-6-6",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-19-demander"
}],
  ["je te demande", {
  "unit": "unit6",
  "module": "2024-04-19-demander",
  "lesson": "lesson-6-6",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-19-demander"
}],
  ["il me demande", {
  "unit": "unit6",
  "module": "2024-04-19-demander",
  "lesson": "lesson-6-6",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-19-demander"
}],
  ["demander de faire", {
  "unit": "unit6",
  "module": "2024-04-19-demander",
  "lesson": "lesson-6-6",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-19-demander"
}],
  ["commander", {
  "unit": "unit6",
  "module": "2024-04-18-commander",
  "lesson": "lesson-6-7",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-18-commander"
}],
  ["je commande", {
  "unit": "unit6",
  "module": "2024-04-18-commander",
  "lesson": "lesson-6-7",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-18-commander"
}],
  ["tu commandes", {
  "unit": "unit6",
  "module": "2024-04-18-commander",
  "lesson": "lesson-6-7",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-18-commander"
}],
  ["il/elle commande", {
  "unit": "unit6",
  "module": "2024-04-18-commander",
  "lesson": "lesson-6-7",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-18-commander"
}],
  ["nous commandons", {
  "unit": "unit6",
  "module": "2024-04-18-commander",
  "lesson": "lesson-6-7",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-18-commander"
}],
  ["vous commandez", {
  "unit": "unit6",
  "module": "2024-04-18-commander",
  "lesson": "lesson-6-7",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-18-commander"
}],
  ["ils/elles commandent", {
  "unit": "unit6",
  "module": "2024-04-18-commander",
  "lesson": "lesson-6-7",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-18-commander"
}],
  ["commander un café", {
  "unit": "unit6",
  "module": "2024-04-18-commander",
  "lesson": "lesson-6-7",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-18-commander"
}],
  ["commander une pizza", {
  "unit": "unit6",
  "module": "2024-04-18-commander",
  "lesson": "lesson-6-7",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-18-commander"
}],
  ["commander en ligne", {
  "unit": "unit6",
  "module": "2024-04-18-commander",
  "lesson": "lesson-6-7",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-18-commander"
}],
  ["je voudrais commander", {
  "unit": "unit6",
  "module": "2024-04-18-commander",
  "lesson": "lesson-6-7",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-18-commander"
}],
  ["vous commandez?", {
  "unit": "unit6",
  "module": "2024-04-18-commander",
  "lesson": "lesson-6-7",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-18-commander"
}],
  ["besoin", {
  "unit": "unit6",
  "module": "2024-04-17-besoin",
  "lesson": "lesson-6-8",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-17-besoin"
}],
  ["avoir besoin de", {
  "unit": "unit6",
  "module": "2024-04-17-besoin",
  "lesson": "lesson-6-8",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-17-besoin"
}],
  ["j'ai besoin de", {
  "unit": "unit6",
  "module": "2024-04-17-besoin",
  "lesson": "lesson-6-8",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-17-besoin"
}],
  ["tu as besoin de", {
  "unit": "unit6",
  "module": "2024-04-17-besoin",
  "lesson": "lesson-6-8",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-17-besoin"
}],
  ["il/elle a besoin de", {
  "unit": "unit6",
  "module": "2024-04-17-besoin",
  "lesson": "lesson-6-8",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-17-besoin"
}],
  ["nous avons besoin de", {
  "unit": "unit6",
  "module": "2024-04-17-besoin",
  "lesson": "lesson-6-8",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-17-besoin"
}],
  ["vous avez besoin de", {
  "unit": "unit6",
  "module": "2024-04-17-besoin",
  "lesson": "lesson-6-8",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-17-besoin"
}],
  ["ils/elles ont besoin de", {
  "unit": "unit6",
  "module": "2024-04-17-besoin",
  "lesson": "lesson-6-8",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-17-besoin"
}],
  ["j'ai besoin d'aide", {
  "unit": "unit6",
  "module": "2024-04-17-besoin",
  "lesson": "lesson-6-8",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-17-besoin"
}],
  ["j'ai besoin d'argent", {
  "unit": "unit6",
  "module": "2024-04-17-besoin",
  "lesson": "lesson-6-8",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-17-besoin"
}],
  ["j'ai besoin de temps", {
  "unit": "unit6",
  "module": "2024-04-17-besoin",
  "lesson": "lesson-6-8",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-17-besoin"
}],
  ["je n'ai pas besoin de", {
  "unit": "unit6",
  "module": "2024-04-17-besoin",
  "lesson": "lesson-6-8",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-17-besoin"
}],
  ["l'année", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["une fois", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["le moment", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["l'heure", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["la minute", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["le début", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["la fin", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["la personne", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["la famille", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["le père", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["la mère", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["le fils", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["la fille", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["le frère", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["la sœur", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["les yeux", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["le visage", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["le corps", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["le cœur", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["la voix", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["l'histoire", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["la question", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["la raison", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["le fait", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["la partie", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["le côté", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["la fois", {
  "unit": "unit6",
  "module": "2024-04-25-top-200-nouns",
  "lesson": "lesson-6-9",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-25-top-200-nouns"
}],
  ["je suis en train de", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["prendre le train", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["ça prend", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["comprends", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["mettre dans", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["marcher", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["me dis", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["finir", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["nous allons partir", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["je vais mettre", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["qu'est-ce qu'on va faire", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["mon frère", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["une semaine", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["une question", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["la première fois", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["une année", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["papa", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["maman", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["qu'est-ce que", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["fais", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["super", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["tes livres", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["ses livres", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["ton manteau", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["mon livre", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["livre de français", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["bien sûr", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["le train", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["trois heures", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["trois", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["du pain", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["du fromage", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["le prix", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["c'est vrai", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["va venir", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["toute", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["en ce moment", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["de bons restaurants", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["beaucoup", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["parler français", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["quelques", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["mots", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["avant de partir", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["très bien", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["bonne idée", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["belle", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["plus belle", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["la Tour Eiffel", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["contente", {
  "unit": "unit6",
  "module": "2024-04-24-reading-6",
  "lesson": "lesson-6-10",
  "introduced_in": "Unit 6: Basic Fluency - 2024-04-24-reading-6"
}],
  ["on est", {
  "unit": "unit7",
  "module": "2024-05-05-on-and-people",
  "lesson": "lesson-7-1",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-05-on-and-people"
}],
  ["on a", {
  "unit": "unit7",
  "module": "2024-05-05-on-and-people",
  "lesson": "lesson-7-1",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-05-on-and-people"
}],
  ["on va", {
  "unit": "unit7",
  "module": "2024-05-05-on-and-people",
  "lesson": "lesson-7-1",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-05-on-and-people"
}],
  ["on fait", {
  "unit": "unit7",
  "module": "2024-05-05-on-and-people",
  "lesson": "lesson-7-1",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-05-on-and-people"
}],
  ["on peut", {
  "unit": "unit7",
  "module": "2024-05-05-on-and-people",
  "lesson": "lesson-7-1",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-05-on-and-people"
}],
  ["on doit", {
  "unit": "unit7",
  "module": "2024-05-05-on-and-people",
  "lesson": "lesson-7-1",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-05-on-and-people"
}],
  ["on dit", {
  "unit": "unit7",
  "module": "2024-05-05-on-and-people",
  "lesson": "lesson-7-1",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-05-on-and-people"
}],
  ["on voit", {
  "unit": "unit7",
  "module": "2024-05-05-on-and-people",
  "lesson": "lesson-7-1",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-05-on-and-people"
}],
  ["On y va?", {
  "unit": "unit7",
  "module": "2024-05-05-on-and-people",
  "lesson": "lesson-7-1",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-05-on-and-people"
}],
  ["les gens", {
  "unit": "unit7",
  "module": "2024-05-05-on-and-people",
  "lesson": "lesson-7-1",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-05-on-and-people"
}],
  ["les gens disent", {
  "unit": "unit7",
  "module": "2024-05-05-on-and-people",
  "lesson": "lesson-7-1",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-05-on-and-people"
}],
  ["les gens pensent", {
  "unit": "unit7",
  "module": "2024-05-05-on-and-people",
  "lesson": "lesson-7-1",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-05-on-and-people"
}],
  ["tout le monde sait", {
  "unit": "unit7",
  "module": "2024-05-05-on-and-people",
  "lesson": "lesson-7-1",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-05-on-and-people"
}],
  ["le peuple", {
  "unit": "unit7",
  "module": "2024-05-05-on-and-people",
  "lesson": "lesson-7-1",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-05-on-and-people"
}],
  ["la population", {
  "unit": "unit7",
  "module": "2024-05-05-on-and-people",
  "lesson": "lesson-7-1",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-05-on-and-people"
}],
  ["les personnes", {
  "unit": "unit7",
  "module": "2024-05-05-on-and-people",
  "lesson": "lesson-7-1",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-05-on-and-people"
}],
  ["étudier", {
  "unit": "unit7",
  "module": "2024-05-09-studying-verbs",
  "lesson": "lesson-7-2",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-09-studying-verbs"
}],
  ["j'étudie", {
  "unit": "unit7",
  "module": "2024-05-09-studying-verbs",
  "lesson": "lesson-7-2",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-09-studying-verbs"
}],
  ["tu étudies", {
  "unit": "unit7",
  "module": "2024-05-09-studying-verbs",
  "lesson": "lesson-7-2",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-09-studying-verbs"
}],
  ["il/elle étudie", {
  "unit": "unit7",
  "module": "2024-05-09-studying-verbs",
  "lesson": "lesson-7-2",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-09-studying-verbs"
}],
  ["nous étudions", {
  "unit": "unit7",
  "module": "2024-05-09-studying-verbs",
  "lesson": "lesson-7-2",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-09-studying-verbs"
}],
  ["vous étudiez", {
  "unit": "unit7",
  "module": "2024-05-09-studying-verbs",
  "lesson": "lesson-7-2",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-09-studying-verbs"
}],
  ["ils/elles étudient", {
  "unit": "unit7",
  "module": "2024-05-09-studying-verbs",
  "lesson": "lesson-7-2",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-09-studying-verbs"
}],
  ["réviser", {
  "unit": "unit7",
  "module": "2024-05-09-studying-verbs",
  "lesson": "lesson-7-2",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-09-studying-verbs"
}],
  ["je révise", {
  "unit": "unit7",
  "module": "2024-05-09-studying-verbs",
  "lesson": "lesson-7-2",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-09-studying-verbs"
}],
  ["tu révises", {
  "unit": "unit7",
  "module": "2024-05-09-studying-verbs",
  "lesson": "lesson-7-2",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-09-studying-verbs"
}],
  ["il/elle révise", {
  "unit": "unit7",
  "module": "2024-05-09-studying-verbs",
  "lesson": "lesson-7-2",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-09-studying-verbs"
}],
  ["nous révisons", {
  "unit": "unit7",
  "module": "2024-05-09-studying-verbs",
  "lesson": "lesson-7-2",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-09-studying-verbs"
}],
  ["vous révisez", {
  "unit": "unit7",
  "module": "2024-05-09-studying-verbs",
  "lesson": "lesson-7-2",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-09-studying-verbs"
}],
  ["ils/elles révisent", {
  "unit": "unit7",
  "module": "2024-05-09-studying-verbs",
  "lesson": "lesson-7-2",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-09-studying-verbs"
}],
  ["j'étudie le français", {
  "unit": "unit7",
  "module": "2024-05-09-studying-verbs",
  "lesson": "lesson-7-2",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-09-studying-verbs"
}],
  ["je révise mes leçons", {
  "unit": "unit7",
  "module": "2024-05-09-studying-verbs",
  "lesson": "lesson-7-2",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-09-studying-verbs"
}],
  ["tu apprends", {
  "unit": "unit7",
  "module": "2024-05-04-learning-verbs",
  "lesson": "lesson-7-3",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-04-learning-verbs"
}],
  ["il/elle apprend", {
  "unit": "unit7",
  "module": "2024-05-04-learning-verbs",
  "lesson": "lesson-7-3",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-04-learning-verbs"
}],
  ["nous apprenons", {
  "unit": "unit7",
  "module": "2024-05-04-learning-verbs",
  "lesson": "lesson-7-3",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-04-learning-verbs"
}],
  ["vous apprenez", {
  "unit": "unit7",
  "module": "2024-05-04-learning-verbs",
  "lesson": "lesson-7-3",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-04-learning-verbs"
}],
  ["ils/elles apprennent", {
  "unit": "unit7",
  "module": "2024-05-04-learning-verbs",
  "lesson": "lesson-7-3",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-04-learning-verbs"
}],
  ["enseigner", {
  "unit": "unit7",
  "module": "2024-05-04-learning-verbs",
  "lesson": "lesson-7-3",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-04-learning-verbs"
}],
  ["j'enseigne", {
  "unit": "unit7",
  "module": "2024-05-04-learning-verbs",
  "lesson": "lesson-7-3",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-04-learning-verbs"
}],
  ["tu enseignes", {
  "unit": "unit7",
  "module": "2024-05-04-learning-verbs",
  "lesson": "lesson-7-3",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-04-learning-verbs"
}],
  ["il/elle enseigne", {
  "unit": "unit7",
  "module": "2024-05-04-learning-verbs",
  "lesson": "lesson-7-3",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-04-learning-verbs"
}],
  ["nous enseignons", {
  "unit": "unit7",
  "module": "2024-05-04-learning-verbs",
  "lesson": "lesson-7-3",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-04-learning-verbs"
}],
  ["vous enseignez", {
  "unit": "unit7",
  "module": "2024-05-04-learning-verbs",
  "lesson": "lesson-7-3",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-04-learning-verbs"
}],
  ["ils/elles enseignent", {
  "unit": "unit7",
  "module": "2024-05-04-learning-verbs",
  "lesson": "lesson-7-3",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-04-learning-verbs"
}],
  ["tu comprends", {
  "unit": "unit7",
  "module": "2024-04-29-comprendre",
  "lesson": "lesson-7-4",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-29-comprendre"
}],
  ["il/elle comprend", {
  "unit": "unit7",
  "module": "2024-04-29-comprendre",
  "lesson": "lesson-7-4",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-29-comprendre"
}],
  ["nous comprenons", {
  "unit": "unit7",
  "module": "2024-04-29-comprendre",
  "lesson": "lesson-7-4",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-29-comprendre"
}],
  ["vous comprenez", {
  "unit": "unit7",
  "module": "2024-04-29-comprendre",
  "lesson": "lesson-7-4",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-29-comprendre"
}],
  ["ils/elles comprennent", {
  "unit": "unit7",
  "module": "2024-04-29-comprendre",
  "lesson": "lesson-7-4",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-29-comprendre"
}],
  ["Je ne comprends pas", {
  "unit": "unit7",
  "module": "2024-04-29-comprendre",
  "lesson": "lesson-7-4",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-29-comprendre"
}],
  ["Tu comprends?", {
  "unit": "unit7",
  "module": "2024-04-29-comprendre",
  "lesson": "lesson-7-4",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-29-comprendre"
}],
  ["je comprends bien", {
  "unit": "unit7",
  "module": "2024-04-29-comprendre",
  "lesson": "lesson-7-4",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-29-comprendre"
}],
  ["savoir", {
  "unit": "unit7",
  "module": "2024-05-08-savoir",
  "lesson": "lesson-7-5",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-08-savoir"
}],
  ["je sais", {
  "unit": "unit7",
  "module": "2024-05-08-savoir",
  "lesson": "lesson-7-5",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-08-savoir"
}],
  ["tu sais", {
  "unit": "unit7",
  "module": "2024-05-08-savoir",
  "lesson": "lesson-7-5",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-08-savoir"
}],
  ["il/elle sait", {
  "unit": "unit7",
  "module": "2024-05-08-savoir",
  "lesson": "lesson-7-5",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-08-savoir"
}],
  ["nous savons", {
  "unit": "unit7",
  "module": "2024-05-08-savoir",
  "lesson": "lesson-7-5",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-08-savoir"
}],
  ["vous savez", {
  "unit": "unit7",
  "module": "2024-05-08-savoir",
  "lesson": "lesson-7-5",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-08-savoir"
}],
  ["ils/elles savent", {
  "unit": "unit7",
  "module": "2024-05-08-savoir",
  "lesson": "lesson-7-5",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-08-savoir"
}],
  ["Je ne sais pas", {
  "unit": "unit7",
  "module": "2024-05-08-savoir",
  "lesson": "lesson-7-5",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-08-savoir"
}],
  ["Tu sais?", {
  "unit": "unit7",
  "module": "2024-05-08-savoir",
  "lesson": "lesson-7-5",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-08-savoir"
}],
  ["je sais parler", {
  "unit": "unit7",
  "module": "2024-05-08-savoir",
  "lesson": "lesson-7-5",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-08-savoir"
}],
  ["connaître", {
  "unit": "unit7",
  "module": "2024-04-30-connaitre",
  "lesson": "lesson-7-6",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-30-connaitre"
}],
  ["je connais", {
  "unit": "unit7",
  "module": "2024-04-30-connaitre",
  "lesson": "lesson-7-6",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-30-connaitre"
}],
  ["tu connais", {
  "unit": "unit7",
  "module": "2024-04-30-connaitre",
  "lesson": "lesson-7-6",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-30-connaitre"
}],
  ["il/elle connaît", {
  "unit": "unit7",
  "module": "2024-04-30-connaitre",
  "lesson": "lesson-7-6",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-30-connaitre"
}],
  ["nous connaissons", {
  "unit": "unit7",
  "module": "2024-04-30-connaitre",
  "lesson": "lesson-7-6",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-30-connaitre"
}],
  ["vous connaissez", {
  "unit": "unit7",
  "module": "2024-04-30-connaitre",
  "lesson": "lesson-7-6",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-30-connaitre"
}],
  ["ils/elles connaissent", {
  "unit": "unit7",
  "module": "2024-04-30-connaitre",
  "lesson": "lesson-7-6",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-30-connaitre"
}],
  ["je connais Marie", {
  "unit": "unit7",
  "module": "2024-04-30-connaitre",
  "lesson": "lesson-7-6",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-30-connaitre"
}],
  ["je connais Paris", {
  "unit": "unit7",
  "module": "2024-04-30-connaitre",
  "lesson": "lesson-7-6",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-30-connaitre"
}],
  ["Tu connais?", {
  "unit": "unit7",
  "module": "2024-04-30-connaitre",
  "lesson": "lesson-7-6",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-30-connaitre"
}],
  ["penser", {
  "unit": "unit7",
  "module": "2024-05-06-penser",
  "lesson": "lesson-7-7",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-06-penser"
}],
  ["je pense", {
  "unit": "unit7",
  "module": "2024-05-06-penser",
  "lesson": "lesson-7-7",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-06-penser"
}],
  ["tu penses", {
  "unit": "unit7",
  "module": "2024-05-06-penser",
  "lesson": "lesson-7-7",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-06-penser"
}],
  ["il/elle pense", {
  "unit": "unit7",
  "module": "2024-05-06-penser",
  "lesson": "lesson-7-7",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-06-penser"
}],
  ["nous pensons", {
  "unit": "unit7",
  "module": "2024-05-06-penser",
  "lesson": "lesson-7-7",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-06-penser"
}],
  ["vous pensez", {
  "unit": "unit7",
  "module": "2024-05-06-penser",
  "lesson": "lesson-7-7",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-06-penser"
}],
  ["ils/elles pensent", {
  "unit": "unit7",
  "module": "2024-05-06-penser",
  "lesson": "lesson-7-7",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-06-penser"
}],
  ["je pense que oui", {
  "unit": "unit7",
  "module": "2024-05-06-penser",
  "lesson": "lesson-7-7",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-06-penser"
}],
  ["je pense que non", {
  "unit": "unit7",
  "module": "2024-05-06-penser",
  "lesson": "lesson-7-7",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-06-penser"
}],
  ["Qu'est-ce que tu penses?", {
  "unit": "unit7",
  "module": "2024-05-06-penser",
  "lesson": "lesson-7-7",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-06-penser"
}],
  ["je pense à toi", {
  "unit": "unit7",
  "module": "2024-05-06-penser",
  "lesson": "lesson-7-7",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-06-penser"
}],
  ["croire", {
  "unit": "unit7",
  "module": "2024-05-01-croire",
  "lesson": "lesson-7-8",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-01-croire"
}],
  ["je crois", {
  "unit": "unit7",
  "module": "2024-05-01-croire",
  "lesson": "lesson-7-8",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-01-croire"
}],
  ["tu crois", {
  "unit": "unit7",
  "module": "2024-05-01-croire",
  "lesson": "lesson-7-8",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-01-croire"
}],
  ["il/elle croit", {
  "unit": "unit7",
  "module": "2024-05-01-croire",
  "lesson": "lesson-7-8",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-01-croire"
}],
  ["nous croyons", {
  "unit": "unit7",
  "module": "2024-05-01-croire",
  "lesson": "lesson-7-8",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-01-croire"
}],
  ["vous croyez", {
  "unit": "unit7",
  "module": "2024-05-01-croire",
  "lesson": "lesson-7-8",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-01-croire"
}],
  ["ils/elles croient", {
  "unit": "unit7",
  "module": "2024-05-01-croire",
  "lesson": "lesson-7-8",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-01-croire"
}],
  ["je crois que oui", {
  "unit": "unit7",
  "module": "2024-05-01-croire",
  "lesson": "lesson-7-8",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-01-croire"
}],
  ["je ne crois pas", {
  "unit": "unit7",
  "module": "2024-05-01-croire",
  "lesson": "lesson-7-8",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-01-croire"
}],
  ["Tu crois?", {
  "unit": "unit7",
  "module": "2024-05-01-croire",
  "lesson": "lesson-7-8",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-01-croire"
}],
  ["la connaissance", {
  "unit": "unit7",
  "module": "2024-05-03-knowledge-nouns",
  "lesson": "lesson-7-9",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-03-knowledge-nouns"
}],
  ["le savoir", {
  "unit": "unit7",
  "module": "2024-05-03-knowledge-nouns",
  "lesson": "lesson-7-9",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-03-knowledge-nouns"
}],
  ["l'apprentissage (m)", {
  "unit": "unit7",
  "module": "2024-05-03-knowledge-nouns",
  "lesson": "lesson-7-9",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-03-knowledge-nouns"
}],
  ["l'étude (f)", {
  "unit": "unit7",
  "module": "2024-05-03-knowledge-nouns",
  "lesson": "lesson-7-9",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-03-knowledge-nouns"
}],
  ["la leçon", {
  "unit": "unit7",
  "module": "2024-05-03-knowledge-nouns",
  "lesson": "lesson-7-9",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-03-knowledge-nouns"
}],
  ["le cours", {
  "unit": "unit7",
  "module": "2024-05-03-knowledge-nouns",
  "lesson": "lesson-7-9",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-03-knowledge-nouns"
}],
  ["l'école (f)", {
  "unit": "unit7",
  "module": "2024-05-03-knowledge-nouns",
  "lesson": "lesson-7-9",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-03-knowledge-nouns"
}],
  ["l'université (f)", {
  "unit": "unit7",
  "module": "2024-05-03-knowledge-nouns",
  "lesson": "lesson-7-9",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-03-knowledge-nouns"
}],
  ["la pensée", {
  "unit": "unit7",
  "module": "2024-05-03-knowledge-nouns",
  "lesson": "lesson-7-9",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-03-knowledge-nouns"
}],
  ["l'idée (f)", {
  "unit": "unit7",
  "module": "2024-05-03-knowledge-nouns",
  "lesson": "lesson-7-9",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-03-knowledge-nouns"
}],
  ["la réponse", {
  "unit": "unit7",
  "module": "2024-05-03-knowledge-nouns",
  "lesson": "lesson-7-9",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-03-knowledge-nouns"
}],
  ["Allons-y!", {
  "unit": "unit7",
  "module": "2024-05-03-knowledge-nouns",
  "lesson": "lesson-7-9",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-03-knowledge-nouns"
}],
  ["donc", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["ainsi", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["en fait", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["bah", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["alors", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["quoi", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["presque", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["peut-être", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["certainement", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["seulement", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["probablement", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["sûrement", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["Je pense, donc je suis", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["Donc, tu comprends?", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["En fait, je ne sais pas", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["Bah, c'est comme ça", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["C'est bon, quoi", {
  "unit": "unit7",
  "module": "2024-05-02-discourse-markers",
  "lesson": "lesson-7-10",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-02-discourse-markers"
}],
  ["tout", {
  "unit": "unit7",
  "module": "2024-04-28-comparison-modifiers",
  "lesson": "lesson-7-11",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-28-comparison-modifiers"
}],
  ["tous", {
  "unit": "unit7",
  "module": "2024-04-28-comparison-modifiers",
  "lesson": "lesson-7-11",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-28-comparison-modifiers"
}],
  ["toutes", {
  "unit": "unit7",
  "module": "2024-04-28-comparison-modifiers",
  "lesson": "lesson-7-11",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-28-comparison-modifiers"
}],
  ["toute la classe", {
  "unit": "unit7",
  "module": "2024-04-28-comparison-modifiers",
  "lesson": "lesson-7-11",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-28-comparison-modifiers"
}],
  ["tout petit", {
  "unit": "unit7",
  "module": "2024-04-28-comparison-modifiers",
  "lesson": "lesson-7-11",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-28-comparison-modifiers"
}],
  ["le/la même", {
  "unit": "unit7",
  "module": "2024-04-28-comparison-modifiers",
  "lesson": "lesson-7-11",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-28-comparison-modifiers"
}],
  ["même moi", {
  "unit": "unit7",
  "module": "2024-04-28-comparison-modifiers",
  "lesson": "lesson-7-11",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-28-comparison-modifiers"
}],
  ["je comprends mal", {
  "unit": "unit7",
  "module": "2024-04-28-comparison-modifiers",
  "lesson": "lesson-7-11",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-28-comparison-modifiers"
}],
  ["aller mal", {
  "unit": "unit7",
  "module": "2024-04-28-comparison-modifiers",
  "lesson": "lesson-7-11",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-04-28-comparison-modifiers"
}],
  ["apprend", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["étudie", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["étudiant(s)", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["comprend", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["comprenez", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["sais", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["sait", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["connais", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["pense", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["pensent", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["pensées", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["croit", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["révise", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["révision", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["cherche", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["trouve", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["l'apprentissage", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["question", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["questions", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["réponse", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["réponses", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["idée", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["idées", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["l'étude", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["connaissance", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["pensée", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["Socrate", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["pendant", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["des heures", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["vraiment", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["voici", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["d'abord", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["ensuite", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["après", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["finalement", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["demande", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["mieux", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["soi", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["certains", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["bons", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["méthode", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["meilleures", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["avec le temps", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["un peu", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["des mots", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["mot", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["des phrases", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["phrase", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["voyage", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["magnifique", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["en train de", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["preuve", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["faites", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["le faites", {
  "unit": "unit7",
  "module": "2024-05-07-reading-7",
  "lesson": "lesson-7-12",
  "introduced_in": "Unit 7: Knowledge & Learning - 2024-05-07-reading-7"
}],
  ["avant", {
  "unit": "unit8",
  "module": "2024-05-23-temporal-words",
  "lesson": "lesson-8-1",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-23-temporal-words"
}],
  ["depuis", {
  "unit": "unit8",
  "module": "2024-05-23-temporal-words",
  "lesson": "lesson-8-1",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-23-temporal-words"
}],
  ["puis", {
  "unit": "unit8",
  "module": "2024-05-23-temporal-words",
  "lesson": "lesson-8-1",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-23-temporal-words"
}],
  ["enfin", {
  "unit": "unit8",
  "module": "2024-05-23-temporal-words",
  "lesson": "lesson-8-1",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-23-temporal-words"
}],
  ["se", {
  "unit": "unit8",
  "module": "2024-05-21-reflexive-pronouns",
  "lesson": "lesson-8-2",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-21-reflexive-pronouns"
}],
  ["je me lave", {
  "unit": "unit8",
  "module": "2024-05-21-reflexive-pronouns",
  "lesson": "lesson-8-2",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-21-reflexive-pronouns"
}],
  ["tu te lèves", {
  "unit": "unit8",
  "module": "2024-05-21-reflexive-pronouns",
  "lesson": "lesson-8-2",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-21-reflexive-pronouns"
}],
  ["il se prépare", {
  "unit": "unit8",
  "module": "2024-05-21-reflexive-pronouns",
  "lesson": "lesson-8-2",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-21-reflexive-pronouns"
}],
  ["nous nous aimons", {
  "unit": "unit8",
  "module": "2024-05-21-reflexive-pronouns",
  "lesson": "lesson-8-2",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-21-reflexive-pronouns"
}],
  ["s'appeler", {
  "unit": "unit8",
  "module": "2024-05-22-s-appeler",
  "lesson": "lesson-8-3",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-22-s-appeler"
}],
  ["je m'appelle", {
  "unit": "unit8",
  "module": "2024-05-22-s-appeler",
  "lesson": "lesson-8-3",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-22-s-appeler"
}],
  ["tu t'appelles", {
  "unit": "unit8",
  "module": "2024-05-22-s-appeler",
  "lesson": "lesson-8-3",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-22-s-appeler"
}],
  ["il s'appelle", {
  "unit": "unit8",
  "module": "2024-05-22-s-appeler",
  "lesson": "lesson-8-3",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-22-s-appeler"
}],
  ["elle s'appelle", {
  "unit": "unit8",
  "module": "2024-05-22-s-appeler",
  "lesson": "lesson-8-3",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-22-s-appeler"
}],
  ["nous nous appelons", {
  "unit": "unit8",
  "module": "2024-05-22-s-appeler",
  "lesson": "lesson-8-3",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-22-s-appeler"
}],
  ["vous vous appelez", {
  "unit": "unit8",
  "module": "2024-05-22-s-appeler",
  "lesson": "lesson-8-3",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-22-s-appeler"
}],
  ["ils s'appellent", {
  "unit": "unit8",
  "module": "2024-05-22-s-appeler",
  "lesson": "lesson-8-3",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-22-s-appeler"
}],
  ["elles s'appellent", {
  "unit": "unit8",
  "module": "2024-05-22-s-appeler",
  "lesson": "lesson-8-3",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-22-s-appeler"
}],
  ["Comment tu t'appelles?", {
  "unit": "unit8",
  "module": "2024-05-22-s-appeler",
  "lesson": "lesson-8-3",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-22-s-appeler"
}],
  ["Comment vous vous appelez?", {
  "unit": "unit8",
  "module": "2024-05-22-s-appeler",
  "lesson": "lesson-8-3",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-22-s-appeler"
}],
  ["se réveiller", {
  "unit": "unit8",
  "module": "2024-05-19-morning-routine",
  "lesson": "lesson-8-4",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-19-morning-routine"
}],
  ["je me réveille", {
  "unit": "unit8",
  "module": "2024-05-19-morning-routine",
  "lesson": "lesson-8-4",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-19-morning-routine"
}],
  ["tu te réveilles", {
  "unit": "unit8",
  "module": "2024-05-19-morning-routine",
  "lesson": "lesson-8-4",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-19-morning-routine"
}],
  ["il se réveille", {
  "unit": "unit8",
  "module": "2024-05-19-morning-routine",
  "lesson": "lesson-8-4",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-19-morning-routine"
}],
  ["elle se réveille", {
  "unit": "unit8",
  "module": "2024-05-19-morning-routine",
  "lesson": "lesson-8-4",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-19-morning-routine"
}],
  ["nous nous réveillons", {
  "unit": "unit8",
  "module": "2024-05-19-morning-routine",
  "lesson": "lesson-8-4",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-19-morning-routine"
}],
  ["vous vous réveillez", {
  "unit": "unit8",
  "module": "2024-05-19-morning-routine",
  "lesson": "lesson-8-4",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-19-morning-routine"
}],
  ["se lever", {
  "unit": "unit8",
  "module": "2024-05-19-morning-routine",
  "lesson": "lesson-8-4",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-19-morning-routine"
}],
  ["je me lève", {
  "unit": "unit8",
  "module": "2024-05-19-morning-routine",
  "lesson": "lesson-8-4",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-19-morning-routine"
}],
  ["il se lève", {
  "unit": "unit8",
  "module": "2024-05-19-morning-routine",
  "lesson": "lesson-8-4",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-19-morning-routine"
}],
  ["elle se lève", {
  "unit": "unit8",
  "module": "2024-05-19-morning-routine",
  "lesson": "lesson-8-4",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-19-morning-routine"
}],
  ["nous nous levons", {
  "unit": "unit8",
  "module": "2024-05-19-morning-routine",
  "lesson": "lesson-8-4",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-19-morning-routine"
}],
  ["vous vous levez", {
  "unit": "unit8",
  "module": "2024-05-19-morning-routine",
  "lesson": "lesson-8-4",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-19-morning-routine"
}],
  ["se laver", {
  "unit": "unit8",
  "module": "2024-05-17-getting-ready",
  "lesson": "lesson-8-5",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-17-getting-ready"
}],
  ["tu te laves", {
  "unit": "unit8",
  "module": "2024-05-17-getting-ready",
  "lesson": "lesson-8-5",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-17-getting-ready"
}],
  ["s'habiller", {
  "unit": "unit8",
  "module": "2024-05-17-getting-ready",
  "lesson": "lesson-8-5",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-17-getting-ready"
}],
  ["je m'habille", {
  "unit": "unit8",
  "module": "2024-05-17-getting-ready",
  "lesson": "lesson-8-5",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-17-getting-ready"
}],
  ["tu t'habilles", {
  "unit": "unit8",
  "module": "2024-05-17-getting-ready",
  "lesson": "lesson-8-5",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-17-getting-ready"
}],
  ["il s'habille", {
  "unit": "unit8",
  "module": "2024-05-17-getting-ready",
  "lesson": "lesson-8-5",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-17-getting-ready"
}],
  ["se préparer", {
  "unit": "unit8",
  "module": "2024-05-17-getting-ready",
  "lesson": "lesson-8-5",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-17-getting-ready"
}],
  ["je me prépare", {
  "unit": "unit8",
  "module": "2024-05-17-getting-ready",
  "lesson": "lesson-8-5",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-17-getting-ready"
}],
  ["tu te prépares", {
  "unit": "unit8",
  "module": "2024-05-17-getting-ready",
  "lesson": "lesson-8-5",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-17-getting-ready"
}],
  ["on se prépare", {
  "unit": "unit8",
  "module": "2024-05-17-getting-ready",
  "lesson": "lesson-8-5",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-17-getting-ready"
}],
  ["se souvenir", {
  "unit": "unit8",
  "module": "2024-05-16-daily-reflexives",
  "lesson": "lesson-8-6",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-16-daily-reflexives"
}],
  ["je me souviens", {
  "unit": "unit8",
  "module": "2024-05-16-daily-reflexives",
  "lesson": "lesson-8-6",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-16-daily-reflexives"
}],
  ["tu te souviens", {
  "unit": "unit8",
  "module": "2024-05-16-daily-reflexives",
  "lesson": "lesson-8-6",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-16-daily-reflexives"
}],
  ["il se souvient", {
  "unit": "unit8",
  "module": "2024-05-16-daily-reflexives",
  "lesson": "lesson-8-6",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-16-daily-reflexives"
}],
  ["s'amuser", {
  "unit": "unit8",
  "module": "2024-05-16-daily-reflexives",
  "lesson": "lesson-8-6",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-16-daily-reflexives"
}],
  ["je m'amuse", {
  "unit": "unit8",
  "module": "2024-05-16-daily-reflexives",
  "lesson": "lesson-8-6",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-16-daily-reflexives"
}],
  ["tu t'amuses", {
  "unit": "unit8",
  "module": "2024-05-16-daily-reflexives",
  "lesson": "lesson-8-6",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-16-daily-reflexives"
}],
  ["on s'amuse", {
  "unit": "unit8",
  "module": "2024-05-16-daily-reflexives",
  "lesson": "lesson-8-6",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-16-daily-reflexives"
}],
  ["se dépêcher", {
  "unit": "unit8",
  "module": "2024-05-16-daily-reflexives",
  "lesson": "lesson-8-6",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-16-daily-reflexives"
}],
  ["je me dépêche", {
  "unit": "unit8",
  "module": "2024-05-16-daily-reflexives",
  "lesson": "lesson-8-6",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-16-daily-reflexives"
}],
  ["tu te dépêches", {
  "unit": "unit8",
  "module": "2024-05-16-daily-reflexives",
  "lesson": "lesson-8-6",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-16-daily-reflexives"
}],
  ["Dépêche-toi!", {
  "unit": "unit8",
  "module": "2024-05-16-daily-reflexives",
  "lesson": "lesson-8-6",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-16-daily-reflexives"
}],
  ["je me suis réveillé", {
  "unit": "unit8",
  "module": "2024-06-07-reflexive-past",
  "lesson": "lesson-8-7",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-06-07-reflexive-past"
}],
  ["je me suis réveillée", {
  "unit": "unit8",
  "module": "2024-06-07-reflexive-past",
  "lesson": "lesson-8-7",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-06-07-reflexive-past"
}],
  ["tu t'es levé", {
  "unit": "unit8",
  "module": "2024-06-07-reflexive-past",
  "lesson": "lesson-8-7",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-06-07-reflexive-past"
}],
  ["il s'est lavé", {
  "unit": "unit8",
  "module": "2024-06-07-reflexive-past",
  "lesson": "lesson-8-7",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-06-07-reflexive-past"
}],
  ["elle s'est levée", {
  "unit": "unit8",
  "module": "2024-06-07-reflexive-past",
  "lesson": "lesson-8-7",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-06-07-reflexive-past"
}],
  ["nous nous sommes préparés", {
  "unit": "unit8",
  "module": "2024-06-07-reflexive-past",
  "lesson": "lesson-8-7",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-06-07-reflexive-past"
}],
  ["ils se sont amusés", {
  "unit": "unit8",
  "module": "2024-06-07-reflexive-past",
  "lesson": "lesson-8-7",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-06-07-reflexive-past"
}],
  ["elles se sont amusées", {
  "unit": "unit8",
  "module": "2024-06-07-reflexive-past",
  "lesson": "lesson-8-7",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-06-07-reflexive-past"
}],
  ["nous nous parlons", {
  "unit": "unit8",
  "module": "2024-06-06-reciprocal-reflexives",
  "lesson": "lesson-8-8",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-06-06-reciprocal-reflexives"
}],
  ["on se voit", {
  "unit": "unit8",
  "module": "2024-06-06-reciprocal-reflexives",
  "lesson": "lesson-8-8",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-06-06-reciprocal-reflexives"
}],
  ["on se voit demain", {
  "unit": "unit8",
  "module": "2024-06-06-reciprocal-reflexives",
  "lesson": "lesson-8-8",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-06-06-reciprocal-reflexives"
}],
  ["ils se connaissent", {
  "unit": "unit8",
  "module": "2024-06-06-reciprocal-reflexives",
  "lesson": "lesson-8-8",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-06-06-reciprocal-reflexives"
}],
  ["ils se parlent", {
  "unit": "unit8",
  "module": "2024-06-06-reciprocal-reflexives",
  "lesson": "lesson-8-8",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-06-06-reciprocal-reflexives"
}],
  ["vous vous comprenez", {
  "unit": "unit8",
  "module": "2024-06-06-reciprocal-reflexives",
  "lesson": "lesson-8-8",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-06-06-reciprocal-reflexives"
}],
  ["Mange!", {
  "unit": "unit8",
  "module": "2024-05-13-commands-tu",
  "lesson": "lesson-8-9",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-13-commands-tu"
}],
  ["Parle!", {
  "unit": "unit8",
  "module": "2024-05-13-commands-tu",
  "lesson": "lesson-8-9",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-13-commands-tu"
}],
  ["Écoute!", {
  "unit": "unit8",
  "module": "2024-05-13-commands-tu",
  "lesson": "lesson-8-9",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-13-commands-tu"
}],
  ["Regarde!", {
  "unit": "unit8",
  "module": "2024-05-13-commands-tu",
  "lesson": "lesson-8-9",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-13-commands-tu"
}],
  ["Pense!", {
  "unit": "unit8",
  "module": "2024-05-13-commands-tu",
  "lesson": "lesson-8-9",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-13-commands-tu"
}],
  ["Viens!", {
  "unit": "unit8",
  "module": "2024-05-13-commands-tu",
  "lesson": "lesson-8-9",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-13-commands-tu"
}],
  ["Pars!", {
  "unit": "unit8",
  "module": "2024-05-13-commands-tu",
  "lesson": "lesson-8-9",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-13-commands-tu"
}],
  ["Prends!", {
  "unit": "unit8",
  "module": "2024-05-13-commands-tu",
  "lesson": "lesson-8-9",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-13-commands-tu"
}],
  ["Mangez!", {
  "unit": "unit8",
  "module": "2024-05-14-commands-vous",
  "lesson": "lesson-8-10",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-14-commands-vous"
}],
  ["Parlez!", {
  "unit": "unit8",
  "module": "2024-05-14-commands-vous",
  "lesson": "lesson-8-10",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-14-commands-vous"
}],
  ["Écoutez!", {
  "unit": "unit8",
  "module": "2024-05-14-commands-vous",
  "lesson": "lesson-8-10",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-14-commands-vous"
}],
  ["Regardez!", {
  "unit": "unit8",
  "module": "2024-05-14-commands-vous",
  "lesson": "lesson-8-10",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-14-commands-vous"
}],
  ["Venez!", {
  "unit": "unit8",
  "module": "2024-05-14-commands-vous",
  "lesson": "lesson-8-10",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-14-commands-vous"
}],
  ["Prenez!", {
  "unit": "unit8",
  "module": "2024-05-14-commands-vous",
  "lesson": "lesson-8-10",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-14-commands-vous"
}],
  ["Sois!", {
  "unit": "unit8",
  "module": "2024-05-18-irregular-commands",
  "lesson": "lesson-8-11",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-18-irregular-commands"
}],
  ["Soyez!", {
  "unit": "unit8",
  "module": "2024-05-18-irregular-commands",
  "lesson": "lesson-8-11",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-18-irregular-commands"
}],
  ["Sois gentil!", {
  "unit": "unit8",
  "module": "2024-05-18-irregular-commands",
  "lesson": "lesson-8-11",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-18-irregular-commands"
}],
  ["Aie!", {
  "unit": "unit8",
  "module": "2024-05-18-irregular-commands",
  "lesson": "lesson-8-11",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-18-irregular-commands"
}],
  ["Ayez!", {
  "unit": "unit8",
  "module": "2024-05-18-irregular-commands",
  "lesson": "lesson-8-11",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-18-irregular-commands"
}],
  ["Aie confiance!", {
  "unit": "unit8",
  "module": "2024-05-18-irregular-commands",
  "lesson": "lesson-8-11",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-18-irregular-commands"
}],
  ["Va!", {
  "unit": "unit8",
  "module": "2024-05-18-irregular-commands",
  "lesson": "lesson-8-11",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-18-irregular-commands"
}],
  ["Allez!", {
  "unit": "unit8",
  "module": "2024-05-18-irregular-commands",
  "lesson": "lesson-8-11",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-18-irregular-commands"
}],
  ["Vas-y!", {
  "unit": "unit8",
  "module": "2024-05-18-irregular-commands",
  "lesson": "lesson-8-11",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-18-irregular-commands"
}],
  ["Fais!", {
  "unit": "unit8",
  "module": "2024-05-18-irregular-commands",
  "lesson": "lesson-8-11",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-18-irregular-commands"
}],
  ["Faites!", {
  "unit": "unit8",
  "module": "2024-05-18-irregular-commands",
  "lesson": "lesson-8-11",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-18-irregular-commands"
}],
  ["Fais attention!", {
  "unit": "unit8",
  "module": "2024-05-18-irregular-commands",
  "lesson": "lesson-8-11",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-18-irregular-commands"
}],
  ["Donne-le-moi!", {
  "unit": "unit8",
  "module": "2024-05-12-commands-pronouns",
  "lesson": "lesson-8-12",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-12-commands-pronouns"
}],
  ["Regarde-moi!", {
  "unit": "unit8",
  "module": "2024-05-12-commands-pronouns",
  "lesson": "lesson-8-12",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-12-commands-pronouns"
}],
  ["Écoute-le!", {
  "unit": "unit8",
  "module": "2024-05-12-commands-pronouns",
  "lesson": "lesson-8-12",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-12-commands-pronouns"
}],
  ["Ne le fais pas!", {
  "unit": "unit8",
  "module": "2024-05-12-commands-pronouns",
  "lesson": "lesson-8-12",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-12-commands-pronouns"
}],
  ["Ne me regarde pas!", {
  "unit": "unit8",
  "module": "2024-05-12-commands-pronouns",
  "lesson": "lesson-8-12",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-12-commands-pronouns"
}],
  ["on se pose des questions", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["s'aident", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["nous nous comprenons", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["on se parle", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["Écoute bien!", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["la Sorbonne", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["journée", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["typique", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["tout de suite", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["minutes", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["cuisine", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["professeur", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["nouveaux", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["tes amis", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["les étudiants", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["mes leçons", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["chez moi", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["rentre", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["encore plus", {
  "unit": "unit8",
  "module": "2024-05-20-reading-8",
  "lesson": "lesson-8-13",
  "introduced_in": "Unit 8: Daily Life & Actions - 2024-05-20-reading-8"
}],
  ["parce que", {
  "unit": "unit9",
  "module": "2024-05-26-causal-words",
  "lesson": "lesson-9-1",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-26-causal-words"
}],
  ["car", {
  "unit": "unit9",
  "module": "2024-05-26-causal-words",
  "lesson": "lesson-9-1",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-26-causal-words"
}],
  ["puisque", {
  "unit": "unit9",
  "module": "2024-05-26-causal-words",
  "lesson": "lesson-9-1",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-26-causal-words"
}],
  ["comme", {
  "unit": "unit9",
  "module": "2024-05-26-causal-words",
  "lesson": "lesson-9-1",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-26-causal-words"
}],
  ["grâce à", {
  "unit": "unit9",
  "module": "2024-05-26-causal-words",
  "lesson": "lesson-9-1",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-26-causal-words"
}],
  ["à cause de", {
  "unit": "unit9",
  "module": "2024-05-26-causal-words",
  "lesson": "lesson-9-1",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-26-causal-words"
}],
  ["le motif", {
  "unit": "unit9",
  "module": "2024-05-26-causal-words",
  "lesson": "lesson-9-1",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-26-causal-words"
}],
  ["la cause", {
  "unit": "unit9",
  "module": "2024-05-26-causal-words",
  "lesson": "lesson-9-1",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-26-causal-words"
}],
  ["parmi", {
  "unit": "unit9",
  "module": "2024-06-08-spatial-prepositions",
  "lesson": "lesson-9-2",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-08-spatial-prepositions"
}],
  ["au-dessus de", {
  "unit": "unit9",
  "module": "2024-06-08-spatial-prepositions",
  "lesson": "lesson-9-2",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-08-spatial-prepositions"
}],
  ["au-dessous de", {
  "unit": "unit9",
  "module": "2024-06-08-spatial-prepositions",
  "lesson": "lesson-9-2",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-08-spatial-prepositions"
}],
  ["la position", {
  "unit": "unit9",
  "module": "2024-06-08-spatial-prepositions",
  "lesson": "lesson-9-2",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-08-spatial-prepositions"
}],
  ["l'endroit (m)", {
  "unit": "unit9",
  "module": "2024-06-08-spatial-prepositions",
  "lesson": "lesson-9-2",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-08-spatial-prepositions"
}],
  ["près de", {
  "unit": "unit9",
  "module": "2024-05-28-more-spatial-relations",
  "lesson": "lesson-9-3",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-28-more-spatial-relations"
}],
  ["loin de", {
  "unit": "unit9",
  "module": "2024-05-28-more-spatial-relations",
  "lesson": "lesson-9-3",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-28-more-spatial-relations"
}],
  ["à côté de", {
  "unit": "unit9",
  "module": "2024-05-28-more-spatial-relations",
  "lesson": "lesson-9-3",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-28-more-spatial-relations"
}],
  ["en face de", {
  "unit": "unit9",
  "module": "2024-05-28-more-spatial-relations",
  "lesson": "lesson-9-3",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-28-more-spatial-relations"
}],
  ["autour de", {
  "unit": "unit9",
  "module": "2024-05-28-more-spatial-relations",
  "lesson": "lesson-9-3",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-28-more-spatial-relations"
}],
  ["le long de", {
  "unit": "unit9",
  "module": "2024-05-28-more-spatial-relations",
  "lesson": "lesson-9-3",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-28-more-spatial-relations"
}],
  ["au milieu de", {
  "unit": "unit9",
  "module": "2024-05-28-more-spatial-relations",
  "lesson": "lesson-9-3",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-28-more-spatial-relations"
}],
  ["au bout de", {
  "unit": "unit9",
  "module": "2024-05-28-more-spatial-relations",
  "lesson": "lesson-9-3",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-28-more-spatial-relations"
}],
  ["la distance", {
  "unit": "unit9",
  "module": "2024-05-28-more-spatial-relations",
  "lesson": "lesson-9-3",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-28-more-spatial-relations"
}],
  ["proche", {
  "unit": "unit9",
  "module": "2024-05-28-more-spatial-relations",
  "lesson": "lesson-9-3",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-28-more-spatial-relations"
}],
  ["lointain(e)", {
  "unit": "unit9",
  "module": "2024-05-28-more-spatial-relations",
  "lesson": "lesson-9-3",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-28-more-spatial-relations"
}],
  ["j'ai parlé", {
  "unit": "unit9",
  "module": "2024-05-30-passe-compose-er",
  "lesson": "lesson-9-4",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-30-passe-compose-er"
}],
  ["j'ai étudié", {
  "unit": "unit9",
  "module": "2024-05-30-passe-compose-er",
  "lesson": "lesson-9-4",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-30-passe-compose-er"
}],
  ["j'ai aimé", {
  "unit": "unit9",
  "module": "2024-05-30-passe-compose-er",
  "lesson": "lesson-9-4",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-30-passe-compose-er"
}],
  ["j'ai cherché", {
  "unit": "unit9",
  "module": "2024-05-30-passe-compose-er",
  "lesson": "lesson-9-4",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-30-passe-compose-er"
}],
  ["j'ai trouvé", {
  "unit": "unit9",
  "module": "2024-05-30-passe-compose-er",
  "lesson": "lesson-9-4",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-30-passe-compose-er"
}],
  ["j'ai travaillé", {
  "unit": "unit9",
  "module": "2024-05-30-passe-compose-er",
  "lesson": "lesson-9-4",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-30-passe-compose-er"
}],
  ["j'ai écouté", {
  "unit": "unit9",
  "module": "2024-05-30-passe-compose-er",
  "lesson": "lesson-9-4",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-30-passe-compose-er"
}],
  ["j'ai regardé", {
  "unit": "unit9",
  "module": "2024-05-30-passe-compose-er",
  "lesson": "lesson-9-4",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-30-passe-compose-er"
}],
  ["j'ai demandé", {
  "unit": "unit9",
  "module": "2024-05-30-passe-compose-er",
  "lesson": "lesson-9-4",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-30-passe-compose-er"
}],
  ["j'ai eu", {
  "unit": "unit9",
  "module": "2024-06-01-passe-compose-irregular-1",
  "lesson": "lesson-9-5",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-01-passe-compose-irregular-1"
}],
  ["j'ai été", {
  "unit": "unit9",
  "module": "2024-06-01-passe-compose-irregular-1",
  "lesson": "lesson-9-5",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-01-passe-compose-irregular-1"
}],
  ["j'ai fait", {
  "unit": "unit9",
  "module": "2024-06-01-passe-compose-irregular-1",
  "lesson": "lesson-9-5",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-01-passe-compose-irregular-1"
}],
  ["j'ai vu", {
  "unit": "unit9",
  "module": "2024-06-01-passe-compose-irregular-1",
  "lesson": "lesson-9-5",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-01-passe-compose-irregular-1"
}],
  ["tu as eu", {
  "unit": "unit9",
  "module": "2024-06-01-passe-compose-irregular-1",
  "lesson": "lesson-9-5",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-01-passe-compose-irregular-1"
}],
  ["il a fait", {
  "unit": "unit9",
  "module": "2024-06-01-passe-compose-irregular-1",
  "lesson": "lesson-9-5",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-01-passe-compose-irregular-1"
}],
  ["ils ont été", {
  "unit": "unit9",
  "module": "2024-06-01-passe-compose-irregular-1",
  "lesson": "lesson-9-5",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-01-passe-compose-irregular-1"
}],
  ["la chance", {
  "unit": "unit9",
  "module": "2024-06-01-passe-compose-irregular-1",
  "lesson": "lesson-9-5",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-01-passe-compose-irregular-1"
}],
  ["les devoirs", {
  "unit": "unit9",
  "module": "2024-06-01-passe-compose-irregular-1",
  "lesson": "lesson-9-5",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-01-passe-compose-irregular-1"
}],
  ["j'ai voulu", {
  "unit": "unit9",
  "module": "2024-06-02-passe-compose-irregular-2",
  "lesson": "lesson-9-6",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-02-passe-compose-irregular-2"
}],
  ["j'ai pu", {
  "unit": "unit9",
  "module": "2024-06-02-passe-compose-irregular-2",
  "lesson": "lesson-9-6",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-02-passe-compose-irregular-2"
}],
  ["j'ai dû", {
  "unit": "unit9",
  "module": "2024-06-02-passe-compose-irregular-2",
  "lesson": "lesson-9-6",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-02-passe-compose-irregular-2"
}],
  ["j'ai pris", {
  "unit": "unit9",
  "module": "2024-06-02-passe-compose-irregular-2",
  "lesson": "lesson-9-6",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-02-passe-compose-irregular-2"
}],
  ["j'ai mis", {
  "unit": "unit9",
  "module": "2024-06-02-passe-compose-irregular-2",
  "lesson": "lesson-9-6",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-02-passe-compose-irregular-2"
}],
  ["j'ai compris", {
  "unit": "unit9",
  "module": "2024-06-02-passe-compose-irregular-2",
  "lesson": "lesson-9-6",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-02-passe-compose-irregular-2"
}],
  ["j'ai appris", {
  "unit": "unit9",
  "module": "2024-06-02-passe-compose-irregular-2",
  "lesson": "lesson-9-6",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-02-passe-compose-irregular-2"
}],
  ["le manteau", {
  "unit": "unit9",
  "module": "2024-06-02-passe-compose-irregular-2",
  "lesson": "lesson-9-6",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-02-passe-compose-irregular-2"
}],
  ["je suis allé(e)", {
  "unit": "unit9",
  "module": "2024-05-31-passe-compose-etre",
  "lesson": "lesson-9-7",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-31-passe-compose-etre"
}],
  ["je suis venu(e)", {
  "unit": "unit9",
  "module": "2024-05-31-passe-compose-etre",
  "lesson": "lesson-9-7",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-31-passe-compose-etre"
}],
  ["je suis parti(e)", {
  "unit": "unit9",
  "module": "2024-05-31-passe-compose-etre",
  "lesson": "lesson-9-7",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-31-passe-compose-etre"
}],
  ["je suis arrivé(e)", {
  "unit": "unit9",
  "module": "2024-05-31-passe-compose-etre",
  "lesson": "lesson-9-7",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-31-passe-compose-etre"
}],
  ["je suis sorti(e)", {
  "unit": "unit9",
  "module": "2024-05-31-passe-compose-etre",
  "lesson": "lesson-9-7",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-31-passe-compose-etre"
}],
  ["je suis entré(e)", {
  "unit": "unit9",
  "module": "2024-05-31-passe-compose-etre",
  "lesson": "lesson-9-7",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-31-passe-compose-etre"
}],
  ["je suis rentré(e)", {
  "unit": "unit9",
  "module": "2024-05-31-passe-compose-etre",
  "lesson": "lesson-9-7",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-31-passe-compose-etre"
}],
  ["je suis resté(e)", {
  "unit": "unit9",
  "module": "2024-05-31-passe-compose-etre",
  "lesson": "lesson-9-7",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-31-passe-compose-etre"
}],
  ["je suis monté(e)", {
  "unit": "unit9",
  "module": "2024-05-31-passe-compose-etre",
  "lesson": "lesson-9-7",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-31-passe-compose-etre"
}],
  ["je suis descendu(e)", {
  "unit": "unit9",
  "module": "2024-05-31-passe-compose-etre",
  "lesson": "lesson-9-7",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-31-passe-compose-etre"
}],
  ["je suis tombé(e)", {
  "unit": "unit9",
  "module": "2024-05-31-passe-compose-etre",
  "lesson": "lesson-9-7",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-31-passe-compose-etre"
}],
  ["je suis devenu(e)", {
  "unit": "unit9",
  "module": "2024-05-31-passe-compose-etre",
  "lesson": "lesson-9-7",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-31-passe-compose-etre"
}],
  ["il est allé", {
  "unit": "unit9",
  "module": "2024-05-29-passe-compose-agreement",
  "lesson": "lesson-9-8",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-29-passe-compose-agreement"
}],
  ["elle est allée", {
  "unit": "unit9",
  "module": "2024-05-29-passe-compose-agreement",
  "lesson": "lesson-9-8",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-29-passe-compose-agreement"
}],
  ["ils sont allés", {
  "unit": "unit9",
  "module": "2024-05-29-passe-compose-agreement",
  "lesson": "lesson-9-8",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-29-passe-compose-agreement"
}],
  ["elles sont allées", {
  "unit": "unit9",
  "module": "2024-05-29-passe-compose-agreement",
  "lesson": "lesson-9-8",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-29-passe-compose-agreement"
}],
  ["nous sommes allés", {
  "unit": "unit9",
  "module": "2024-05-29-passe-compose-agreement",
  "lesson": "lesson-9-8",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-29-passe-compose-agreement"
}],
  ["nous sommes allées", {
  "unit": "unit9",
  "module": "2024-05-29-passe-compose-agreement",
  "lesson": "lesson-9-8",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-29-passe-compose-agreement"
}],
  ["vous êtes allé", {
  "unit": "unit9",
  "module": "2024-05-29-passe-compose-agreement",
  "lesson": "lesson-9-8",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-29-passe-compose-agreement"
}],
  ["vous êtes allée", {
  "unit": "unit9",
  "module": "2024-05-29-passe-compose-agreement",
  "lesson": "lesson-9-8",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-29-passe-compose-agreement"
}],
  ["vous êtes allés", {
  "unit": "unit9",
  "module": "2024-05-29-passe-compose-agreement",
  "lesson": "lesson-9-8",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-29-passe-compose-agreement"
}],
  ["vous êtes allées", {
  "unit": "unit9",
  "module": "2024-05-29-passe-compose-agreement",
  "lesson": "lesson-9-8",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-29-passe-compose-agreement"
}],
  ["je parlais", {
  "unit": "unit9",
  "module": "2024-05-27-imparfait-all-verbs",
  "lesson": "lesson-9-9",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-27-imparfait-all-verbs"
}],
  ["il faisait", {
  "unit": "unit9",
  "module": "2024-05-27-imparfait-all-verbs",
  "lesson": "lesson-9-9",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-27-imparfait-all-verbs"
}],
  ["on allait", {
  "unit": "unit9",
  "module": "2024-05-27-imparfait-all-verbs",
  "lesson": "lesson-9-9",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-27-imparfait-all-verbs"
}],
  ["je voulais", {
  "unit": "unit9",
  "module": "2024-05-27-imparfait-all-verbs",
  "lesson": "lesson-9-9",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-27-imparfait-all-verbs"
}],
  ["il y avait", {
  "unit": "unit9",
  "module": "2024-05-27-imparfait-all-verbs",
  "lesson": "lesson-9-9",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-27-imparfait-all-verbs"
}],
  ["je prenais", {
  "unit": "unit9",
  "module": "2024-05-27-imparfait-all-verbs",
  "lesson": "lesson-9-9",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-27-imparfait-all-verbs"
}],
  ["tous les jours", {
  "unit": "unit9",
  "module": "2024-05-27-imparfait-all-verbs",
  "lesson": "lesson-9-9",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-27-imparfait-all-verbs"
}],
  ["chaque", {
  "unit": "unit9",
  "module": "2024-05-27-imparfait-all-verbs",
  "lesson": "lesson-9-9",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-05-27-imparfait-all-verbs"
}],
  ["pendant que", {
  "unit": "unit9",
  "module": "2024-06-04-pc-vs-imparfait",
  "lesson": "lesson-9-10",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-04-pc-vs-imparfait"
}],
  ["soudain / tout à coup", {
  "unit": "unit9",
  "module": "2024-06-04-pc-vs-imparfait",
  "lesson": "lesson-9-10",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-04-pc-vs-imparfait"
}],
  ["d'habitude", {
  "unit": "unit9",
  "module": "2024-06-04-pc-vs-imparfait",
  "lesson": "lesson-9-10",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-04-pc-vs-imparfait"
}],
  ["à ce moment-là", {
  "unit": "unit9",
  "module": "2024-06-04-pc-vs-imparfait",
  "lesson": "lesson-9-10",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-04-pc-vs-imparfait"
}],
  ["j'ai décidé de", {
  "unit": "unit9",
  "module": "2024-06-03-past-tense-composition",
  "lesson": "lesson-9-11",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-03-past-tense-composition"
}],
  ["Paris", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["Pierre", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["Marie", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["Café de Flore", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["Lyon", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["Amélie", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["Le Procope", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["samedi", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["j'étais content", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["le week-end", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["je me levais", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["plus tard", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["ce jour-là", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["sortir", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["si beau", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["après mon café", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["je suis allé", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["le parc", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["ma maison", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["beaucoup de gens", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["une belle journée", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["près du lac", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["le lac", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["soudain", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["mon ami Pierre", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["il était assis", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["sur un banc", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["le banc", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["sous un arbre", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["un grand arbre", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["l'arbre", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["vers lui", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["on a commencé à parler", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["qu'est-ce que tu fais", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["je voulais être dehors", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["dehors", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["je suis content que tu sois là", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["il a dit", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["nous avons parlé", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["pendant une heure", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["il m'a dit", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["qu'il voulait", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["un nouveau travail", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["nouveau", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["il n'aimait pas", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["son travail", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["je lui ai dit", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["je comprenais", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["le même problème", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["l'année dernière", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["nous avions faim", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["nous avons décidé", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["d'aller au café", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["qui est", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["en face du parc", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["le café était", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["très bon", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["à côté des fenêtres", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["les fenêtres", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["autour des tables", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["nous avons commandé", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["des sandwichs", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["nous mangions", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["nous avons vu Marie", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["elle est entrée", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["elle nous a vus", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["elle est venue", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["à notre table", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["quelle surprise", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["elle a dit", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["je ne savais pas", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["vous étiez ici", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["notre amie", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["de l'université", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["l'université", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["nous ne l'avons pas vue", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["depuis six mois", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["elle est maintenant", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["dans une autre ville", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["autre", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["cette rencontre", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["la rencontre", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["nous avons pu être", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["pour l'après-midi", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["l'après-midi", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["ensemble", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["au cinéma", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["le cinéma", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["un bon film", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["le film", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["français", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["le cinéma était", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["près de la gare", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["la gare", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["à dix minutes", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["du café", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["le film était excellent", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["excellent", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["nous avons beaucoup aimé", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["après le film", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["nous avons décidé de manger", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["au restaurant", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["qui est derrière", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["derrière le cinéma", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["de la bonne cuisine", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["la cuisine", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["française", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["c'était délicieux", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["délicieux", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["nous avons parlé de", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["nos vies", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["ce que nous voulons faire", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["à cause du temps", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["Marie a dû partir", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["vers 9h", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["pour rentrer", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["chez elle", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["Pierre et moi", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["sommes restés", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["un peu plus", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["nous avons pris", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["un dernier café", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["dernier", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["je suis rentré", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["vers 10h", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["j'étais fatigué", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["fatigué", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["mais très heureux", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["heureux", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["une journée parfaite", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["parfait", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["les meilleures journées", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["meilleur", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["sont celles", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["qu'on ne pense pas avoir", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["grâce à ma sortie", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["la sortie", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["une très belle journée", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["avec mes amis", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["avant de dormir", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["dormir", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["j'ai pensé", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["c'est pour ça que", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["j'aime les samedis", {
  "unit": "unit9",
  "module": "2024-06-05-reading-9",
  "lesson": "lesson-9-12",
  "introduced_in": "Unit 9: Discourse & Past Tense - 2024-06-05-reading-9"
}],
  ["tu sois", {
  "unit": "unit10",
  "module": "2024-01-23-common-special-forms-1",
  "lesson": "lesson-10-1",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-23-common-special-forms-1"
}],
  ["il/elle soit", {
  "unit": "unit10",
  "module": "2024-01-23-common-special-forms-1",
  "lesson": "lesson-10-1",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-23-common-special-forms-1"
}],
  ["je sois", {
  "unit": "unit10",
  "module": "2024-01-23-common-special-forms-1",
  "lesson": "lesson-10-1",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-23-common-special-forms-1"
}],
  ["tu aies", {
  "unit": "unit10",
  "module": "2024-01-23-common-special-forms-1",
  "lesson": "lesson-10-1",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-23-common-special-forms-1"
}],
  ["il/elle ait", {
  "unit": "unit10",
  "module": "2024-01-23-common-special-forms-1",
  "lesson": "lesson-10-1",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-23-common-special-forms-1"
}],
  ["tu ailles", {
  "unit": "unit10",
  "module": "2024-01-23-common-special-forms-1",
  "lesson": "lesson-10-1",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-23-common-special-forms-1"
}],
  ["il/elle aille", {
  "unit": "unit10",
  "module": "2024-01-23-common-special-forms-1",
  "lesson": "lesson-10-1",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-23-common-special-forms-1"
}],
  ["tu fasses", {
  "unit": "unit10",
  "module": "2024-01-23-common-special-forms-1",
  "lesson": "lesson-10-1",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-23-common-special-forms-1"
}],
  ["il/elle fasse", {
  "unit": "unit10",
  "module": "2024-01-23-common-special-forms-1",
  "lesson": "lesson-10-1",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-23-common-special-forms-1"
}],
  ["tu viennes", {
  "unit": "unit10",
  "module": "2024-01-24-common-special-forms-2",
  "lesson": "lesson-10-2",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-24-common-special-forms-2"
}],
  ["il/elle vienne", {
  "unit": "unit10",
  "module": "2024-01-24-common-special-forms-2",
  "lesson": "lesson-10-2",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-24-common-special-forms-2"
}],
  ["tu partes", {
  "unit": "unit10",
  "module": "2024-01-24-common-special-forms-2",
  "lesson": "lesson-10-2",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-24-common-special-forms-2"
}],
  ["il/elle parte", {
  "unit": "unit10",
  "module": "2024-01-24-common-special-forms-2",
  "lesson": "lesson-10-2",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-24-common-special-forms-2"
}],
  ["tu puisses", {
  "unit": "unit10",
  "module": "2024-01-24-common-special-forms-2",
  "lesson": "lesson-10-2",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-24-common-special-forms-2"
}],
  ["il/elle puisse", {
  "unit": "unit10",
  "module": "2024-01-24-common-special-forms-2",
  "lesson": "lesson-10-2",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-24-common-special-forms-2"
}],
  ["tu saches", {
  "unit": "unit10",
  "module": "2024-01-24-common-special-forms-2",
  "lesson": "lesson-10-2",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-24-common-special-forms-2"
}],
  ["il/elle sache", {
  "unit": "unit10",
  "module": "2024-01-24-common-special-forms-2",
  "lesson": "lesson-10-2",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-24-common-special-forms-2"
}],
  ["tu comprennes", {
  "unit": "unit10",
  "module": "2024-01-24-common-special-forms-2",
  "lesson": "lesson-10-2",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-24-common-special-forms-2"
}],
  ["il/elle comprenne", {
  "unit": "unit10",
  "module": "2024-01-24-common-special-forms-2",
  "lesson": "lesson-10-2",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-24-common-special-forms-2"
}],
  ["il faut que tu manges", {
  "unit": "unit10",
  "module": "2024-01-28-necessity-phrases",
  "lesson": "lesson-10-3",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-28-necessity-phrases"
}],
  ["il faut que tu partes", {
  "unit": "unit10",
  "module": "2024-01-28-necessity-phrases",
  "lesson": "lesson-10-3",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-28-necessity-phrases"
}],
  ["il faut que j'aille", {
  "unit": "unit10",
  "module": "2024-01-28-necessity-phrases",
  "lesson": "lesson-10-3",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-28-necessity-phrases"
}],
  ["il faut qu'on parte", {
  "unit": "unit10",
  "module": "2024-01-28-necessity-phrases",
  "lesson": "lesson-10-3",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-28-necessity-phrases"
}],
  ["il faut que tu sois sage", {
  "unit": "unit10",
  "module": "2024-01-28-necessity-phrases",
  "lesson": "lesson-10-3",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-28-necessity-phrases"
}],
  ["il faut que tu fasses attention", {
  "unit": "unit10",
  "module": "2024-01-28-necessity-phrases",
  "lesson": "lesson-10-3",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-28-necessity-phrases"
}],
  ["il faut qu'elle vienne", {
  "unit": "unit10",
  "module": "2024-01-28-necessity-phrases",
  "lesson": "lesson-10-3",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-28-necessity-phrases"
}],
  ["je veux que tu viennes", {
  "unit": "unit10",
  "module": "2024-02-07-wish-phrases",
  "lesson": "lesson-10-4",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-07-wish-phrases"
}],
  ["je veux qu'il parte", {
  "unit": "unit10",
  "module": "2024-02-07-wish-phrases",
  "lesson": "lesson-10-4",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-07-wish-phrases"
}],
  ["je veux que tu comprennes", {
  "unit": "unit10",
  "module": "2024-02-07-wish-phrases",
  "lesson": "lesson-10-4",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-07-wish-phrases"
}],
  ["j'aimerais que tu sois là", {
  "unit": "unit10",
  "module": "2024-02-07-wish-phrases",
  "lesson": "lesson-10-4",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-07-wish-phrases"
}],
  ["je veux qu'on aille ensemble", {
  "unit": "unit10",
  "module": "2024-02-07-wish-phrases",
  "lesson": "lesson-10-4",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-07-wish-phrases"
}],
  ["je veux qu'elle sache", {
  "unit": "unit10",
  "module": "2024-02-07-wish-phrases",
  "lesson": "lesson-10-4",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-07-wish-phrases"
}],
  ["je suis triste que tu partes", {
  "unit": "unit10",
  "module": "2024-01-25-emotion-phrases",
  "lesson": "lesson-10-5",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-25-emotion-phrases"
}],
  ["j'ai peur qu'il parte", {
  "unit": "unit10",
  "module": "2024-01-25-emotion-phrases",
  "lesson": "lesson-10-5",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-25-emotion-phrases"
}],
  ["je suis désolé que tu sois malade", {
  "unit": "unit10",
  "module": "2024-01-25-emotion-phrases",
  "lesson": "lesson-10-5",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-25-emotion-phrases"
}],
  ["je suis surpris que tu saches ça", {
  "unit": "unit10",
  "module": "2024-01-25-emotion-phrases",
  "lesson": "lesson-10-5",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-25-emotion-phrases"
}],
  ["je regrette que tu ne puisses pas venir", {
  "unit": "unit10",
  "module": "2024-01-25-emotion-phrases",
  "lesson": "lesson-10-5",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-25-emotion-phrases"
}],
  ["je pense qu'il vient", {
  "unit": "unit10",
  "module": "2024-01-29-opinion-phrases",
  "lesson": "lesson-10-6",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-29-opinion-phrases"
}],
  ["je ne pense pas qu'il vienne", {
  "unit": "unit10",
  "module": "2024-01-29-opinion-phrases",
  "lesson": "lesson-10-6",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-29-opinion-phrases"
}],
  ["je doute qu'elle sache", {
  "unit": "unit10",
  "module": "2024-01-29-opinion-phrases",
  "lesson": "lesson-10-6",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-29-opinion-phrases"
}],
  ["je ne crois pas qu'il ait raison", {
  "unit": "unit10",
  "module": "2024-01-29-opinion-phrases",
  "lesson": "lesson-10-6",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-29-opinion-phrases"
}],
  ["je ne pense pas que ce soit vrai", {
  "unit": "unit10",
  "module": "2024-01-29-opinion-phrases",
  "lesson": "lesson-10-6",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-29-opinion-phrases"
}],
  ["je doute que ce soit possible", {
  "unit": "unit10",
  "module": "2024-01-29-opinion-phrases",
  "lesson": "lesson-10-6",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-29-opinion-phrases"
}],
  ["si j'étais riche", {
  "unit": "unit10",
  "module": "2024-01-27-hypothetical-phrases",
  "lesson": "lesson-10-7",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-27-hypothetical-phrases"
}],
  ["si j'avais de l'argent", {
  "unit": "unit10",
  "module": "2024-01-27-hypothetical-phrases",
  "lesson": "lesson-10-7",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-27-hypothetical-phrases"
}],
  ["si j'étais toi", {
  "unit": "unit10",
  "module": "2024-01-27-hypothetical-phrases",
  "lesson": "lesson-10-7",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-27-hypothetical-phrases"
}],
  ["si tu étais ici", {
  "unit": "unit10",
  "module": "2024-01-27-hypothetical-phrases",
  "lesson": "lesson-10-7",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-27-hypothetical-phrases"
}],
  ["si on avait le temps", {
  "unit": "unit10",
  "module": "2024-01-27-hypothetical-phrases",
  "lesson": "lesson-10-7",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-27-hypothetical-phrases"
}],
  ["je voyagerais le monde", {
  "unit": "unit10",
  "module": "2024-01-27-hypothetical-phrases",
  "lesson": "lesson-10-7",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-27-hypothetical-phrases"
}],
  ["si j'avais su", {
  "unit": "unit10",
  "module": "2024-01-30-past-regret-phrases",
  "lesson": "lesson-10-8",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-30-past-regret-phrases"
}],
  ["si j'avais étudié", {
  "unit": "unit10",
  "module": "2024-01-30-past-regret-phrases",
  "lesson": "lesson-10-8",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-30-past-regret-phrases"
}],
  ["si j'avais fait ça", {
  "unit": "unit10",
  "module": "2024-01-30-past-regret-phrases",
  "lesson": "lesson-10-8",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-30-past-regret-phrases"
}],
  ["je serais venu", {
  "unit": "unit10",
  "module": "2024-01-30-past-regret-phrases",
  "lesson": "lesson-10-8",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-30-past-regret-phrases"
}],
  ["j'aurais réussi", {
  "unit": "unit10",
  "module": "2024-01-30-past-regret-phrases",
  "lesson": "lesson-10-8",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-30-past-regret-phrases"
}],
  ["si j'avais pu", {
  "unit": "unit10",
  "module": "2024-01-30-past-regret-phrases",
  "lesson": "lesson-10-8",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-30-past-regret-phrases"
}],
  ["j'avais déjà mangé", {
  "unit": "unit10",
  "module": "2024-01-26-had-already-phrases",
  "lesson": "lesson-10-9",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-26-had-already-phrases"
}],
  ["j'étais déjà parti", {
  "unit": "unit10",
  "module": "2024-01-26-had-already-phrases",
  "lesson": "lesson-10-9",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-26-had-already-phrases"
}],
  ["elle était déjà partie", {
  "unit": "unit10",
  "module": "2024-01-26-had-already-phrases",
  "lesson": "lesson-10-9",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-26-had-already-phrases"
}],
  ["j'avais déjà vu ce film", {
  "unit": "unit10",
  "module": "2024-01-26-had-already-phrases",
  "lesson": "lesson-10-9",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-26-had-already-phrases"
}],
  ["il avait déjà commencé", {
  "unit": "unit10",
  "module": "2024-01-26-had-already-phrases",
  "lesson": "lesson-10-9",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-26-had-already-phrases"
}],
  ["nous avions déjà fini", {
  "unit": "unit10",
  "module": "2024-01-26-had-already-phrases",
  "lesson": "lesson-10-9",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-26-had-already-phrases"
}],
  ["sérieusement", {
  "unit": "unit10",
  "module": "2024-01-22-common-adverbs",
  "lesson": "lesson-10-10",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-22-common-adverbs"
}],
  ["lentement", {
  "unit": "unit10",
  "module": "2024-01-22-common-adverbs",
  "lesson": "lesson-10-10",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-22-common-adverbs"
}],
  ["rapidement", {
  "unit": "unit10",
  "module": "2024-01-22-common-adverbs",
  "lesson": "lesson-10-10",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-22-common-adverbs"
}],
  ["facilement", {
  "unit": "unit10",
  "module": "2024-01-22-common-adverbs",
  "lesson": "lesson-10-10",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-22-common-adverbs"
}],
  ["complètement", {
  "unit": "unit10",
  "module": "2024-01-22-common-adverbs",
  "lesson": "lesson-10-10",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-22-common-adverbs"
}],
  ["en mangeant", {
  "unit": "unit10",
  "module": "2024-02-06-while-doing-phrases",
  "lesson": "lesson-10-11",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-06-while-doing-phrases"
}],
  ["en parlant", {
  "unit": "unit10",
  "module": "2024-02-06-while-doing-phrases",
  "lesson": "lesson-10-11",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-06-while-doing-phrases"
}],
  ["en travaillant", {
  "unit": "unit10",
  "module": "2024-02-06-while-doing-phrases",
  "lesson": "lesson-10-11",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-06-while-doing-phrases"
}],
  ["en écoutant", {
  "unit": "unit10",
  "module": "2024-02-06-while-doing-phrases",
  "lesson": "lesson-10-11",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-06-while-doing-phrases"
}],
  ["en marchant", {
  "unit": "unit10",
  "module": "2024-02-06-while-doing-phrases",
  "lesson": "lesson-10-11",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-06-while-doing-phrases"
}],
  ["en pratiquant", {
  "unit": "unit10",
  "module": "2024-02-06-while-doing-phrases",
  "lesson": "lesson-10-11",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-06-while-doing-phrases"
}],
  ["je me fais couper les cheveux", {
  "unit": "unit10",
  "module": "2024-02-02-service-phrases",
  "lesson": "lesson-10-12",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-02-service-phrases"
}],
  ["je fais réparer ma voiture", {
  "unit": "unit10",
  "module": "2024-02-02-service-phrases",
  "lesson": "lesson-10-12",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-02-service-phrases"
}],
  ["je me fais maquiller", {
  "unit": "unit10",
  "module": "2024-02-02-service-phrases",
  "lesson": "lesson-10-12",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-02-service-phrases"
}],
  ["je fais nettoyer la maison", {
  "unit": "unit10",
  "module": "2024-02-02-service-phrases",
  "lesson": "lesson-10-12",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-02-service-phrases"
}],
  ["je me fais examiner", {
  "unit": "unit10",
  "module": "2024-02-02-service-phrases",
  "lesson": "lesson-10-12",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-02-service-phrases"
}],
  ["je fais construire une maison", {
  "unit": "unit10",
  "module": "2024-02-02-service-phrases",
  "lesson": "lesson-10-12",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-02-service-phrases"
}],
  ["avant que tu partes", {
  "unit": "unit10",
  "module": "2024-01-21-before-phrases",
  "lesson": "lesson-10-13",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-21-before-phrases"
}],
  ["avant qu'il arrive", {
  "unit": "unit10",
  "module": "2024-01-21-before-phrases",
  "lesson": "lesson-10-13",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-21-before-phrases"
}],
  ["avant qu'elle vienne", {
  "unit": "unit10",
  "module": "2024-01-21-before-phrases",
  "lesson": "lesson-10-13",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-21-before-phrases"
}],
  ["avant qu'on parte", {
  "unit": "unit10",
  "module": "2024-01-21-before-phrases",
  "lesson": "lesson-10-13",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-21-before-phrases"
}],
  ["avant qu'il soit trop tard", {
  "unit": "unit10",
  "module": "2024-01-21-before-phrases",
  "lesson": "lesson-10-13",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-21-before-phrases"
}],
  ["pour que tu comprennes", {
  "unit": "unit10",
  "module": "2024-02-03-so-that-phrases",
  "lesson": "lesson-10-14",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-03-so-that-phrases"
}],
  ["pour qu'elle sache", {
  "unit": "unit10",
  "module": "2024-02-03-so-that-phrases",
  "lesson": "lesson-10-14",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-03-so-that-phrases"
}],
  ["pour qu'on puisse", {
  "unit": "unit10",
  "module": "2024-02-03-so-that-phrases",
  "lesson": "lesson-10-14",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-03-so-that-phrases"
}],
  ["pour que tu sois content", {
  "unit": "unit10",
  "module": "2024-02-03-so-that-phrases",
  "lesson": "lesson-10-14",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-03-so-that-phrases"
}],
  ["pour qu'il vienne", {
  "unit": "unit10",
  "module": "2024-02-03-so-that-phrases",
  "lesson": "lesson-10-14",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-03-so-that-phrases"
}],
  ["bien que je sois fatigué", {
  "unit": "unit10",
  "module": "2024-01-20-although-phrases",
  "lesson": "lesson-10-15",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-20-although-phrases"
}],
  ["bien qu'il fasse froid", {
  "unit": "unit10",
  "module": "2024-01-20-although-phrases",
  "lesson": "lesson-10-15",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-20-although-phrases"
}],
  ["bien que tu sois occupé", {
  "unit": "unit10",
  "module": "2024-01-20-although-phrases",
  "lesson": "lesson-10-15",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-20-although-phrases"
}],
  ["bien qu'elle soit malade", {
  "unit": "unit10",
  "module": "2024-01-20-although-phrases",
  "lesson": "lesson-10-15",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-20-although-phrases"
}],
  ["bien qu'on ait peu de temps", {
  "unit": "unit10",
  "module": "2024-01-20-although-phrases",
  "lesson": "lesson-10-15",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-20-although-phrases"
}],
  ["il est possible qu'il vienne", {
  "unit": "unit10",
  "module": "2024-01-31-possibility-phrases",
  "lesson": "lesson-10-16",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-31-possibility-phrases"
}],
  ["peut-être qu'il viendra", {
  "unit": "unit10",
  "module": "2024-01-31-possibility-phrases",
  "lesson": "lesson-10-16",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-31-possibility-phrases"
}],
  ["il se peut que", {
  "unit": "unit10",
  "module": "2024-01-31-possibility-phrases",
  "lesson": "lesson-10-16",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-31-possibility-phrases"
}],
  ["il est possible qu'on parte", {
  "unit": "unit10",
  "module": "2024-01-31-possibility-phrases",
  "lesson": "lesson-10-16",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-31-possibility-phrases"
}],
  ["peut-être demain", {
  "unit": "unit10",
  "module": "2024-01-31-possibility-phrases",
  "lesson": "lesson-10-16",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-31-possibility-phrases"
}],
  ["peut-être pas", {
  "unit": "unit10",
  "module": "2024-01-31-possibility-phrases",
  "lesson": "lesson-10-16",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-01-31-possibility-phrases"
}],
  ["Notre-Dame", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["Montmartre", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["Nice", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["Bordeaux", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["le Louvre", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["la Seine", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["Sophie", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["Marc", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["je veux que", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["j'aimerais que", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["je suis content(e) que", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["je suis heureux/heureuse que", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["j'ai peur que", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["je regrette que", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["il faut que", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["si j'étais", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["si j'avais", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["j'avais déjà", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["avant que", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["pour que", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["soit", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["sois", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["soyons", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["soient", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["vienne", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["ait", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["aies", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["essaie", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["essaies", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["réussisse", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["réussissions", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["sache", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["saches", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["voient", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["puisse", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["puissions", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["rêve", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["rêves", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["espoir", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["espoirs", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["cathédrale", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["différente", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["simplement", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["rêver", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["achèterais", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["voyagerais", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["quartier", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["artistes", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["ont vécu", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["serais", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["change", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["artiste", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["peintures", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["monde", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["difficile", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["essayer", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["tu ne sauras jamais", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["étudiants", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["adorent", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["langue", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["excellente", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["essayé", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["réussi", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["renoncerais", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["raison", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["perdu", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["aider", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["l'un l'autre", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["tous les deux", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["marché", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["nuit", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["lumières", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["brillaient", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["au loin", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["toute la nuit", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["toute ma vie", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["pont", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["reconnaissante", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["m'aies dit", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["dois", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["continuer", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["conversation", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["j'aie perdu", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["plus tôt", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["j'aurais continué", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["études", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["trop tard", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["appeler", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["université", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["informations", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["devenir", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["deviennent", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["réalité", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["soirée", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["retrouvé", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["courage", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["existe", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["me soutiennent", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["peuvent", {
  "unit": "unit10",
  "module": "2024-02-01-reading-10",
  "lesson": "lesson-10-17",
  "introduced_in": "Unit 10: Mastery & Nuance - 2024-02-01-reading-10"
}],
  ["j'ai ... ans", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["quel âge avez-vous?", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["quel âge as-tu?", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["j'ai vingt ans", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["tu as quel âge?", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["il a quinze ans", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["elle a trente ans", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["je suis né", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["je suis née", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["en mille neuf cent quatre-vingt-quinze", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["né en", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["né à", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["quelle est votre date de naissance?", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["ma date de naissance", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["l'âge", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["les ans", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["la naissance", {
  "unit": "unit11",
  "module": "2024-02-08-age-personal-info",
  "lesson": "lesson-11-1",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-08-age-personal-info"
}],
  ["il donne", {
  "unit": "unit11",
  "module": "2024-02-10-donner",
  "lesson": "lesson-11-2",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-10-donner"
}],
  ["elle donne", {
  "unit": "unit11",
  "module": "2024-02-10-donner",
  "lesson": "lesson-11-2",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-10-donner"
}],
  ["ils donnent", {
  "unit": "unit11",
  "module": "2024-02-10-donner",
  "lesson": "lesson-11-2",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-10-donner"
}],
  ["elles donnent", {
  "unit": "unit11",
  "module": "2024-02-10-donner",
  "lesson": "lesson-11-2",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-10-donner"
}],
  ["je te donne", {
  "unit": "unit11",
  "module": "2024-02-10-donner",
  "lesson": "lesson-11-2",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-10-donner"
}],
  ["tu me donnes", {
  "unit": "unit11",
  "module": "2024-02-10-donner",
  "lesson": "lesson-11-2",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-10-donner"
}],
  ["il me donne", {
  "unit": "unit11",
  "module": "2024-02-10-donner",
  "lesson": "lesson-11-2",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-10-donner"
}],
  ["donner quelque chose à quelqu'un", {
  "unit": "unit11",
  "module": "2024-02-10-donner",
  "lesson": "lesson-11-2",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-10-donner"
}],
  ["donner rendez-vous", {
  "unit": "unit11",
  "module": "2024-02-10-donner",
  "lesson": "lesson-11-2",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-10-donner"
}],
  ["donner l'heure", {
  "unit": "unit11",
  "module": "2024-02-10-donner",
  "lesson": "lesson-11-2",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-10-donner"
}],
  ["donner raison", {
  "unit": "unit11",
  "module": "2024-02-10-donner",
  "lesson": "lesson-11-2",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-10-donner"
}],
  ["donner de l'aide", {
  "unit": "unit11",
  "module": "2024-02-10-donner",
  "lesson": "lesson-11-2",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-10-donner"
}],
  ["donner de l'argent", {
  "unit": "unit11",
  "module": "2024-02-10-donner",
  "lesson": "lesson-11-2",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-10-donner"
}],
  ["je dors", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["tu dors", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["il dort", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["elle dort", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["nous dormons", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["vous dormez", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["ils dorment", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["elles dorment", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["travailler", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["je travaille", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["tu travailles", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["il travaille", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["elle travaille", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["nous travaillons", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["vous travaillez", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["ils travaillent", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["elles travaillent", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["vivre", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["je vis", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["tu vis", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["il vit", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["elle vit", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["nous vivons", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["vous vivez", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["ils vivent", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["elles vivent", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["bien dormir", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["travailler dur", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["vivre sa vie", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["où travaillez-vous?", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["je travaille à", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["je vis à", {
  "unit": "unit11",
  "module": "2024-05-15-daily-actions-1",
  "lesson": "lesson-11-3",
  "introduced_in": "Unit 11: Daily Essentials - 2024-05-15-daily-actions-1"
}],
  ["il cherche", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["elle cherche", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["ils cherchent", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["elles cherchent", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["il trouve", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["elle trouve", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["ils trouvent", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["elles trouvent", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["je cherche mes clés", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["qu'est-ce que tu cherches?", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["tu cherches quoi?", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["j'ai trouvé!", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["je trouve que", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["tu trouves ça comment?", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["chercher du travail", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["trouver du travail", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["chercher quelqu'un", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["trouver quelqu'un", {
  "unit": "unit11",
  "module": "2024-02-13-search-and-find",
  "lesson": "lesson-11-4",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-13-search-and-find"
}],
  ["écouter", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["j'écoute", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["tu écoutes", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["il écoute", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["elle écoute", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["nous écoutons", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["vous écoutez", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["ils écoutent", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["elles écoutent", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["regarder", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["je regarde", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["tu regardes", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["il regarde", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["elle regarde", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["nous regardons", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["vous regardez", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["ils regardent", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["elles regardent", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["écouter de la musique", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["regarder la télé", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["regarder un film", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["écouter le professeur", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["regarder par la fenêtre", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["qu'est-ce que tu écoutes?", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["qu'est-ce que tu regardes?", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["comment tu trouves ça?", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["bien écouter", {
  "unit": "unit11",
  "module": "2024-02-11-perception-verbs",
  "lesson": "lesson-11-5",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-11-perception-verbs"
}],
  ["attendre", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["j'attends", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["tu attends", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["il attend", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["elle attend", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["nous attendons", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["vous attendez", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["ils attendent", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["elles attendent", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["arriver", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["j'arrive", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["tu arrives", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["il arrive", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["elle arrive", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["nous arrivons", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["vous arrivez", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["ils arrivent", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["elles arrivent", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["rester", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["je reste", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["tu restes", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["il reste", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["elle reste", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["nous restons", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["vous restez", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["ils restent", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["elles restent", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["j'attends le bus", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["tu attends quelqu'un?", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["j'arrive à", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["j'arrive à 8h", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["le train arrive", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["je reste ici", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["tu restes combien de temps?", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["on reste ensemble", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["il reste du pain", {
  "unit": "unit11",
  "module": "2024-02-14-social-situations",
  "lesson": "lesson-11-6",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-14-social-situations"
}],
  ["le nord", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["le sud", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["l'est", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["l'ouest", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["à gauche", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["à droite", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["tout droit", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["tournez", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["tourne", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["tournez à gauche", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["tournez à droite", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["allez", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["va", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["continuez", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["continue", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["au coin de", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["à cinq minutes", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["à pied", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["en voiture", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["où est...?", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["comment aller à...?", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["excusez-moi, où est...?", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["c'est loin?", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["c'est près?", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["c'est par là", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["c'est par ici", {
  "unit": "unit11",
  "module": "2024-02-09-directions-navigation",
  "lesson": "lesson-11-7",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-09-directions-navigation"
}],
  ["évoluer", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["habitants", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["nation", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["capitale", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["millions", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["visiteurs", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["admirer", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["monuments", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["historiques", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["système", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["éducatif", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["reconnu", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["internationalement", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["matières", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["sciences", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["littérature", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["primaire", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["culture", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["influence", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["entier", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["créent", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["œuvres", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["inspirent", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["planète", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["populaire", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["plaisir", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["plats", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["économie", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["dépend", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["secteurs", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["services", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["industrie", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["agriculture", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["entreprises", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["exportent", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["produits", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["transport", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["public", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["fonctionne", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["trains", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["rapides", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["connectent", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["destination", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["métro", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["permet", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["se déplacer", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["vacances", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["été", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["profiter", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["soleil", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["mer", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["destinations", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["préfèrent", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["région", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["découvrir", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["beauté", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["campagne", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["technologie", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["quotidienne", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["jeunes", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["en ligne", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["internet", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["communiquent", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["téléphones", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["génération", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["parents", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["garde", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["valeurs", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["activement", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["protéger", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["environnement", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["gouvernement", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["encourage", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["citoyens", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["utiliser", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["recycler", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["déchets", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["économiser", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["énergie", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["efforts", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["montrent", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["avenir", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["relations", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["internationales", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["participe", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["organisations", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["européennes", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["mondiales", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["diplomates", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["régulièrement", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["rencontrer", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["homologues", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["étrangers", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["discutent", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["économiques", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["politiques", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["culturelles", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["conclusion", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["moderne", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["combine", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["tradition", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["innovation", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["préserve", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["patrimoine", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["historique", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["embrassant", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["changements", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["vingt et unième", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["siècle", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["jouer", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["rôle", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["significatif", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["scène", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["contributions", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["enrichissent", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["France", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["Europe", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["Tour Eiffel", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["Louvre", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["Arc de Triomphe", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["Champs-Élysées", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["Versailles", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["Moulin Rouge", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["Marseille", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["Cannes", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["Méditerranée", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["Claude Monet", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["Auguste Renoir", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["Vincent van Gogh", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["coq au vin", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["ratatouille", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["bouillabaisse", {
  "unit": "unit11",
  "module": "2024-02-12-reading-11",
  "lesson": "lesson-11-8",
  "introduced_in": "Unit 11: Daily Essentials - 2024-02-12-reading-11"
}],
  ["un oiseau", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["les oiseaux", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["une tortue", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["un écureuil", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["un lapin", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["un papillon", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["une abeille", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["un poisson", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["un arbre", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["les arbres", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["une plante", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["les plantes", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["une fleur", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["le vent", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["la pluie", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["la nature", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["lent / lente", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["rapide", {
  "unit": "unit12",
  "module": "2024-03-15-nature-animals",
  "lesson": "lesson-12-1",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-nature-animals"
}],
  ["nager", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["je nage", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["tu nages", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["il nage", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["elle nage", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["nous nageons", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["vous nagez", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["ils nagent", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["elles nagent", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["sauter", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["je saute", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["tu sautes", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["il saute", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["nous sautons", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["vous sautez", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["ils sautent", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["voler", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["je vole", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["tu voles", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["il vole", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["nous volons", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["vous volez", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["ils volent", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["courir", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["je cours", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["tu cours", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["il court", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["nous courons", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["vous courez", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["ils courent", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["je marche", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["tu marches", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["il marche", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["nous marchons", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["vous marchez", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["ils marchent", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["grimper", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["je grimpe", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["tu grimpes", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["il grimpe", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["nous grimpons", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["vous grimpez", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["ils grimpent", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["nager dans la mer", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["courir vite", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["marcher lentement", {
  "unit": "unit12",
  "module": "2024-03-16-movement-verbs",
  "lesson": "lesson-12-2",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-movement-verbs"
}],
  ["briller", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["je brille", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["tu brilles", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["il brille", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["nous brillons", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["vous brillez", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["ils brillent", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["le soleil brille", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["pousser", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["je pousse", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["tu pousses", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["il pousse", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["nous poussons", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["vous poussez", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["ils poussent", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["les plantes poussent", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["pleuvoir", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["il pleut", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["il a plu", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["il pleuvait", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["souffler", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["je souffle", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["tu souffles", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["il souffle", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["nous soufflons", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["vous soufflez", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["ils soufflent", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["le vent souffle", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["tomber", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["je tombe", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["il tombe", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["la pluie tombe", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["rendre", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["je rends", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["tu rends", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["il rend", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["nous rendons", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["vous rendez", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["ils rendent", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["rendre + adjective", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["le soleil rend l'herbe verte", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["le froid rend l'eau glacée", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["la pluie rend la terre humide", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["qu'est-ce qui rend...?", {
  "unit": "unit12",
  "module": "2024-03-17-natural-phenomena",
  "lesson": "lesson-12-3",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-17-natural-phenomena"
}],
  ["qu'est-ce qui", {
  "unit": "unit12",
  "module": "2024-03-15-questce-qui-que",
  "lesson": "lesson-12-4",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-questce-qui-que"
}],
  ["Qu'est-ce qui brille?", {
  "unit": "unit12",
  "module": "2024-03-15-questce-qui-que",
  "lesson": "lesson-12-4",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-questce-qui-que"
}],
  ["Qu'est-ce qui tombe?", {
  "unit": "unit12",
  "module": "2024-03-15-questce-qui-que",
  "lesson": "lesson-12-4",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-questce-qui-que"
}],
  ["Qu'est-ce qui fait du bruit?", {
  "unit": "unit12",
  "module": "2024-03-15-questce-qui-que",
  "lesson": "lesson-12-4",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-questce-qui-que"
}],
  ["Qu'est-ce qui rend l'herbe verte?", {
  "unit": "unit12",
  "module": "2024-03-15-questce-qui-que",
  "lesson": "lesson-12-4",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-questce-qui-que"
}],
  ["Qu'est-ce que tu vois?", {
  "unit": "unit12",
  "module": "2024-03-15-questce-qui-que",
  "lesson": "lesson-12-4",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-questce-qui-que"
}],
  ["Qu'est-ce que tu manges?", {
  "unit": "unit12",
  "module": "2024-03-15-questce-qui-que",
  "lesson": "lesson-12-4",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-questce-qui-que"
}],
  ["Qu'est-ce que les oiseaux mangent?", {
  "unit": "unit12",
  "module": "2024-03-15-questce-qui-que",
  "lesson": "lesson-12-4",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-questce-qui-que"
}],
  ["Qu'est-ce que le soleil fait?", {
  "unit": "unit12",
  "module": "2024-03-15-questce-qui-que",
  "lesson": "lesson-12-4",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-15-questce-qui-que"
}],
  ["pourquoi est-ce que", {
  "unit": "unit12",
  "module": "2024-03-19-pourquoi-complex",
  "lesson": "lesson-12-5",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-19-pourquoi-complex"
}],
  ["Pourquoi est-ce que le ciel est bleu?", {
  "unit": "unit12",
  "module": "2024-03-19-pourquoi-complex",
  "lesson": "lesson-12-5",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-19-pourquoi-complex"
}],
  ["Pourquoi est-ce que l'herbe est verte?", {
  "unit": "unit12",
  "module": "2024-03-19-pourquoi-complex",
  "lesson": "lesson-12-5",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-19-pourquoi-complex"
}],
  ["Pourquoi est-ce que les nuages sont blancs?", {
  "unit": "unit12",
  "module": "2024-03-19-pourquoi-complex",
  "lesson": "lesson-12-5",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-19-pourquoi-complex"
}],
  ["Pourquoi est-ce que le soleil brille?", {
  "unit": "unit12",
  "module": "2024-03-19-pourquoi-complex",
  "lesson": "lesson-12-5",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-19-pourquoi-complex"
}],
  ["Pourquoi est-ce que les oiseaux volent?", {
  "unit": "unit12",
  "module": "2024-03-19-pourquoi-complex",
  "lesson": "lesson-12-5",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-19-pourquoi-complex"
}],
  ["Pourquoi est-ce que les plantes poussent?", {
  "unit": "unit12",
  "module": "2024-03-19-pourquoi-complex",
  "lesson": "lesson-12-5",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-19-pourquoi-complex"
}],
  ["Pourquoi est-ce qu'il pleut?", {
  "unit": "unit12",
  "module": "2024-03-19-pourquoi-complex",
  "lesson": "lesson-12-5",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-19-pourquoi-complex"
}],
  ["Pourquoi est-ce qu'il fait ça?", {
  "unit": "unit12",
  "module": "2024-03-19-pourquoi-complex",
  "lesson": "lesson-12-5",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-19-pourquoi-complex"
}],
  ["Pourquoi est-ce que tu cours?", {
  "unit": "unit12",
  "module": "2024-03-19-pourquoi-complex",
  "lesson": "lesson-12-5",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-19-pourquoi-complex"
}],
  ["Pourquoi est-ce que c'est comme ça?", {
  "unit": "unit12",
  "module": "2024-03-19-pourquoi-complex",
  "lesson": "lesson-12-5",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-19-pourquoi-complex"
}],
  ["comment est-ce que", {
  "unit": "unit12",
  "module": "2024-03-20-comment-complex",
  "lesson": "lesson-12-6",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-20-comment-complex"
}],
  ["Comment est-ce qu'une tortue nage?", {
  "unit": "unit12",
  "module": "2024-03-20-comment-complex",
  "lesson": "lesson-12-6",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-20-comment-complex"
}],
  ["Comment est-ce qu'un oiseau vole?", {
  "unit": "unit12",
  "module": "2024-03-20-comment-complex",
  "lesson": "lesson-12-6",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-20-comment-complex"
}],
  ["Comment est-ce qu'un écureuil saute?", {
  "unit": "unit12",
  "module": "2024-03-20-comment-complex",
  "lesson": "lesson-12-6",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-20-comment-complex"
}],
  ["Comment est-ce qu'un lapin saute?", {
  "unit": "unit12",
  "module": "2024-03-20-comment-complex",
  "lesson": "lesson-12-6",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-20-comment-complex"
}],
  ["Comment est-ce que les plantes poussent?", {
  "unit": "unit12",
  "module": "2024-03-20-comment-complex",
  "lesson": "lesson-12-6",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-20-comment-complex"
}],
  ["Comment est-ce qu'on fait ça?", {
  "unit": "unit12",
  "module": "2024-03-20-comment-complex",
  "lesson": "lesson-12-6",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-20-comment-complex"
}],
  ["Comment est-ce que tu fais ça?", {
  "unit": "unit12",
  "module": "2024-03-20-comment-complex",
  "lesson": "lesson-12-6",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-20-comment-complex"
}],
  ["Comment est-ce qu'il court si vite?", {
  "unit": "unit12",
  "module": "2024-03-20-comment-complex",
  "lesson": "lesson-12-6",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-20-comment-complex"
}],
  ["Comment nage une tortue?", {
  "unit": "unit12",
  "module": "2024-03-20-comment-complex",
  "lesson": "lesson-12-6",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-20-comment-complex"
}],
  ["qui est-ce qui", {
  "unit": "unit12",
  "module": "2024-03-16-quiest-qui-que",
  "lesson": "lesson-12-7",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-quiest-qui-que"
}],
  ["qui est-ce que", {
  "unit": "unit12",
  "module": "2024-03-16-quiest-qui-que",
  "lesson": "lesson-12-7",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-quiest-qui-que"
}],
  ["Qui est-ce qui parle?", {
  "unit": "unit12",
  "module": "2024-03-16-quiest-qui-que",
  "lesson": "lesson-12-7",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-quiest-qui-que"
}],
  ["Qui est-ce qui fait ça?", {
  "unit": "unit12",
  "module": "2024-03-16-quiest-qui-que",
  "lesson": "lesson-12-7",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-quiest-qui-que"
}],
  ["Qui est-ce qui nage?", {
  "unit": "unit12",
  "module": "2024-03-16-quiest-qui-que",
  "lesson": "lesson-12-7",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-quiest-qui-que"
}],
  ["Qui est-ce qui parle français?", {
  "unit": "unit12",
  "module": "2024-03-16-quiest-qui-que",
  "lesson": "lesson-12-7",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-quiest-qui-que"
}],
  ["Qui est-ce que tu vois?", {
  "unit": "unit12",
  "module": "2024-03-16-quiest-qui-que",
  "lesson": "lesson-12-7",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-quiest-qui-que"
}],
  ["Qui est-ce que tu aimes?", {
  "unit": "unit12",
  "module": "2024-03-16-quiest-qui-que",
  "lesson": "lesson-12-7",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-quiest-qui-que"
}],
  ["Qui est-ce que je dois appeler?", {
  "unit": "unit12",
  "module": "2024-03-16-quiest-qui-que",
  "lesson": "lesson-12-7",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-quiest-qui-que"
}],
  ["Qui est-ce que tu connais?", {
  "unit": "unit12",
  "module": "2024-03-16-quiest-qui-que",
  "lesson": "lesson-12-7",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-16-quiest-qui-que"
}],
  ["Comment fais-tu ça?", {
  "unit": "unit12",
  "module": "2024-03-22-inversion-questions",
  "lesson": "lesson-12-8",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-22-inversion-questions"
}],
  ["Où vas-tu?", {
  "unit": "unit12",
  "module": "2024-03-22-inversion-questions",
  "lesson": "lesson-12-8",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-22-inversion-questions"
}],
  ["Pourquoi court-il?", {
  "unit": "unit12",
  "module": "2024-03-22-inversion-questions",
  "lesson": "lesson-12-8",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-22-inversion-questions"
}],
  ["Pourquoi a-t-il ça?", {
  "unit": "unit12",
  "module": "2024-03-22-inversion-questions",
  "lesson": "lesson-12-8",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-22-inversion-questions"
}],
  ["Où va-t-elle?", {
  "unit": "unit12",
  "module": "2024-03-22-inversion-questions",
  "lesson": "lesson-12-8",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-22-inversion-questions"
}],
  ["Pourquoi les nuages sont-ils blancs?", {
  "unit": "unit12",
  "module": "2024-03-22-inversion-questions",
  "lesson": "lesson-12-8",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-22-inversion-questions"
}],
  ["Où vont les oiseaux en hiver?", {
  "unit": "unit12",
  "module": "2024-03-22-inversion-questions",
  "lesson": "lesson-12-8",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-22-inversion-questions"
}],
  ["Quand fleurissent les plantes?", {
  "unit": "unit12",
  "module": "2024-03-22-inversion-questions",
  "lesson": "lesson-12-8",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-22-inversion-questions"
}],
  ["Comment fait-on ça?", {
  "unit": "unit12",
  "module": "2024-03-22-inversion-questions",
  "lesson": "lesson-12-8",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-22-inversion-questions"
}],
  ["je me demande", {
  "unit": "unit12",
  "module": "2024-03-23-embedded-questions",
  "lesson": "lesson-12-9",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-23-embedded-questions"
}],
  ["je ne sais pas", {
  "unit": "unit12",
  "module": "2024-03-23-embedded-questions",
  "lesson": "lesson-12-9",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-23-embedded-questions"
}],
  ["peux-tu me dire", {
  "unit": "unit12",
  "module": "2024-03-23-embedded-questions",
  "lesson": "lesson-12-9",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-23-embedded-questions"
}],
  ["Je me demande pourquoi c'est comme ça", {
  "unit": "unit12",
  "module": "2024-03-23-embedded-questions",
  "lesson": "lesson-12-9",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-23-embedded-questions"
}],
  ["Je ne sais pas comment on fait ça", {
  "unit": "unit12",
  "module": "2024-03-23-embedded-questions",
  "lesson": "lesson-12-9",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-23-embedded-questions"
}],
  ["Peux-tu me dire où est la gare?", {
  "unit": "unit12",
  "module": "2024-03-23-embedded-questions",
  "lesson": "lesson-12-9",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-23-embedded-questions"
}],
  ["Tu sais pourquoi il fait ça?", {
  "unit": "unit12",
  "module": "2024-03-23-embedded-questions",
  "lesson": "lesson-12-9",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-23-embedded-questions"
}],
  ["On ne comprend pas comment ça marche", {
  "unit": "unit12",
  "module": "2024-03-23-embedded-questions",
  "lesson": "lesson-12-9",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-23-embedded-questions"
}],
  ["Je me demande comment ça marche", {
  "unit": "unit12",
  "module": "2024-03-23-embedded-questions",
  "lesson": "lesson-12-9",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-23-embedded-questions"
}],
  ["N'est-ce pas vrai?", {
  "unit": "unit12",
  "module": "2024-03-24-rhetorical-negative",
  "lesson": "lesson-12-10",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-24-rhetorical-negative"
}],
  ["N'est-ce pas?", {
  "unit": "unit12",
  "module": "2024-03-24-rhetorical-negative",
  "lesson": "lesson-12-10",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-24-rhetorical-negative"
}],
  ["N'es-tu pas content?", {
  "unit": "unit12",
  "module": "2024-03-24-rhetorical-negative",
  "lesson": "lesson-12-10",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-24-rhetorical-negative"
}],
  ["N'as-tu pas faim?", {
  "unit": "unit12",
  "module": "2024-03-24-rhetorical-negative",
  "lesson": "lesson-12-10",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-24-rhetorical-negative"
}],
  ["Ne veux-tu pas essayer?", {
  "unit": "unit12",
  "module": "2024-03-24-rhetorical-negative",
  "lesson": "lesson-12-10",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-24-rhetorical-negative"
}],
  ["Comment ne pas aimer ça?", {
  "unit": "unit12",
  "module": "2024-03-24-rhetorical-negative",
  "lesson": "lesson-12-10",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-24-rhetorical-negative"
}],
  ["Qui ne voudrait pas ça?", {
  "unit": "unit12",
  "module": "2024-03-24-rhetorical-negative",
  "lesson": "lesson-12-10",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-24-rhetorical-negative"
}],
  ["Pourquoi ne pas essayer?", {
  "unit": "unit12",
  "module": "2024-03-24-rhetorical-negative",
  "lesson": "lesson-12-10",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-24-rhetorical-negative"
}],
  ["Comment ne pas aimer le soleil?", {
  "unit": "unit12",
  "module": "2024-03-24-rhetorical-negative",
  "lesson": "lesson-12-10",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-24-rhetorical-negative"
}],
  ["Pourquoi est-ce qu'il faut que je fasse ça?", {
  "unit": "unit12",
  "module": "2024-03-25-multi-clause-questions",
  "lesson": "lesson-12-11",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-25-multi-clause-questions"
}],
  ["Pourquoi est-ce qu'il faut que tu partes?", {
  "unit": "unit12",
  "module": "2024-03-25-multi-clause-questions",
  "lesson": "lesson-12-11",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-25-multi-clause-questions"
}],
  ["Pourquoi est-ce que tu veux que je fasse ça?", {
  "unit": "unit12",
  "module": "2024-03-25-multi-clause-questions",
  "lesson": "lesson-12-11",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-25-multi-clause-questions"
}],
  ["Comment est-ce que tu veux que je le fasse?", {
  "unit": "unit12",
  "module": "2024-03-25-multi-clause-questions",
  "lesson": "lesson-12-11",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-25-multi-clause-questions"
}],
  ["Pourquoi est-ce que tu penses que c'est comme ça?", {
  "unit": "unit12",
  "module": "2024-03-25-multi-clause-questions",
  "lesson": "lesson-12-11",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-25-multi-clause-questions"
}],
  ["Comment est-ce que tu penses qu'on devrait faire ça?", {
  "unit": "unit12",
  "module": "2024-03-25-multi-clause-questions",
  "lesson": "lesson-12-11",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-25-multi-clause-questions"
}],
  ["Qu'est-ce qui rendrait l'herbe plus verte?", {
  "unit": "unit12",
  "module": "2024-03-25-multi-clause-questions",
  "lesson": "lesson-12-11",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-25-multi-clause-questions"
}],
  ["Pourquoi est-ce que tu ferais ça?", {
  "unit": "unit12",
  "module": "2024-03-25-multi-clause-questions",
  "lesson": "lesson-12-11",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-25-multi-clause-questions"
}],
  ["Pourquoi est-ce que ça ne marche pas?", {
  "unit": "unit12",
  "module": "2024-03-25-multi-clause-questions",
  "lesson": "lesson-12-11",
  "introduced_in": "Unit 12: Curiosity & Questions - 2024-03-25-multi-clause-questions"
}],
  ["a", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["b", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["c", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["d", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["e", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["f", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["g", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["h", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["i", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["j", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["k", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["l", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["m", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["n", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["o", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["p", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["q", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["r", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["s", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["t", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["u", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["v", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["w", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["x", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["y", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["z", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["l'alphabet", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["une lettre", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["un accent", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["une voyelle", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["une consonne", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["épeler", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["Comment ça s'écrit?", {
  "unit": "unit13",
  "module": "2024-04-01-alphabet",
  "lesson": "lesson-13-1",
  "introduced_in": "Reference - 2024-04-01-alphabet"
}],
  ["zéro", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["deux", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["quatre", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["cinq", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["six", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["sept", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["huit", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["neuf", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["dix", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["vingt", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["vingt-et-un", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["vingt-deux", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["trente", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["trente-et-un", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["trente-cinq", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["quarante", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["quarante-et-un", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["cinquante", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["cinquante-et-un", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["soixante", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["soixante-et-un", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["soixante-neuf", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["soixante-dix", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["soixante-et-onze", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["soixante-quinze", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["soixante-dix-neuf", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["quatre-vingts", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["quatre-vingt-un", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["quatre-vingt-dix", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["quatre-vingt-onze", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["quatre-vingt-dix-neuf", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["cent", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["deux cents", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["deux cent un", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["mille", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["trois mille", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["un million", {
  "unit": "unit13",
  "module": "2024-04-02-numbers",
  "lesson": "lesson-13-2",
  "introduced_in": "Reference - 2024-04-02-numbers"
}],
  ["lundi", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["mardi", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["mercredi", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["jeudi", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["vendredi", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["dimanche", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["janvier", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["février", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["mars", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["avril", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["mai", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["juin", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["juillet", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["août", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["septembre", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["octobre", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["novembre", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["décembre", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["le printemps", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["l'été", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["l'automne", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["l'hiver", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["cette semaine", {
  "unit": "unit13",
  "module": "2024-04-03-days-months",
  "lesson": "lesson-13-3",
  "introduced_in": "Reference - 2024-04-03-days-months"
}],
  ["une fête", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["un jour férié", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["le Nouvel An", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["Pâques", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["la Fête du Travail", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["la Fête Nationale", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["la Toussaint", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["Noël", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["la Chandeleur", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["le Poisson d'Avril", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["la Fête de la Musique", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["le Réveillon", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["la Galette des Rois", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["la Saint-Valentin", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["Halloween", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["Joyeux Noël!", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["Bonne année!", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["Joyeuses Pâques!", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["Bonnes fêtes!", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["Bon anniversaire!", {
  "unit": "unit13",
  "module": "2024-04-04-holidays",
  "lesson": "lesson-13-4",
  "introduced_in": "Reference - 2024-04-04-holidays"
}],
  ["bleu / bleue", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["rouge", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["vert / verte", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["jaune", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["blanc / blanche", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["noir / noire", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["orange", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["violet / violette", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["rose", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["gris / grise", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["marron", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["beige", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["clair", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["foncé", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["vif / vive", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["pâle", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["doré", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["argenté", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["multicolore", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["coloré / colorée", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["la couleur", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["De quelle couleur?", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["De quelle couleur est...?", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["le ciel", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["l'herbe", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["les nuages", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["le soleil", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["la mer", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["la neige", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["les feuilles", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["voir la vie en rose", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["être dans le rouge", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["avoir une peur bleue", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["rire jaune", {
  "unit": "unit13",
  "module": "2024-04-05-colors",
  "lesson": "lesson-13-5",
  "introduced_in": "Reference - 2024-04-05-colors"
}],
  ["la Francophonie", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["francophone", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["un pays", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["une langue", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["la langue officielle", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["l'Afrique", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["l'Europe", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["l'Amérique du Nord", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["les Caraïbes", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["le Québec", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["le Congo", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["la France", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["la Belgique", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["la Suisse", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["le Sénégal", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["la Côte d'Ivoire", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["Haïti", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["le Maroc", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["le Liban", {
  "unit": "unit13",
  "module": "2024-04-06-french-countries",
  "lesson": "lesson-13-6",
  "introduced_in": "Reference - 2024-04-06-french-countries"
}],
  ["un phonème", {
  "unit": "unit13",
  "module": "2024-04-07-language-stats",
  "lesson": "lesson-13-7",
  "introduced_in": "Reference - 2024-04-07-language-stats"
}],
  ["une syllabe", {
  "unit": "unit13",
  "module": "2024-04-07-language-stats",
  "lesson": "lesson-13-7",
  "introduced_in": "Reference - 2024-04-07-language-stats"
}],
  ["la liaison", {
  "unit": "unit13",
  "module": "2024-04-07-language-stats",
  "lesson": "lesson-13-7",
  "introduced_in": "Reference - 2024-04-07-language-stats"
}],
  ["un mot", {
  "unit": "unit13",
  "module": "2024-04-07-language-stats",
  "lesson": "lesson-13-7",
  "introduced_in": "Reference - 2024-04-07-language-stats"
}],
  ["une phrase", {
  "unit": "unit13",
  "module": "2024-04-07-language-stats",
  "lesson": "lesson-13-7",
  "introduced_in": "Reference - 2024-04-07-language-stats"
}],
  ["le vocabulaire", {
  "unit": "unit13",
  "module": "2024-04-07-language-stats",
  "lesson": "lesson-13-7",
  "introduced_in": "Reference - 2024-04-07-language-stats"
}],
  ["la grammaire", {
  "unit": "unit13",
  "module": "2024-04-07-language-stats",
  "lesson": "lesson-13-7",
  "introduced_in": "Reference - 2024-04-07-language-stats"
}],
  ["un verbe", {
  "unit": "unit13",
  "module": "2024-04-07-language-stats",
  "lesson": "lesson-13-7",
  "introduced_in": "Reference - 2024-04-07-language-stats"
}],
  ["un nom", {
  "unit": "unit13",
  "module": "2024-04-07-language-stats",
  "lesson": "lesson-13-7",
  "introduced_in": "Reference - 2024-04-07-language-stats"
}],
  ["un adjectif", {
  "unit": "unit13",
  "module": "2024-04-07-language-stats",
  "lesson": "lesson-13-7",
  "introduced_in": "Reference - 2024-04-07-language-stats"
}],
  ["masculin", {
  "unit": "unit13",
  "module": "2024-04-07-language-stats",
  "lesson": "lesson-13-7",
  "introduced_in": "Reference - 2024-04-07-language-stats"
}],
  ["féminin", {
  "unit": "unit13",
  "module": "2024-04-07-language-stats",
  "lesson": "lesson-13-7",
  "introduced_in": "Reference - 2024-04-07-language-stats"
}],
  ["la conjugaison", {
  "unit": "unit13",
  "module": "2024-04-07-language-stats",
  "lesson": "lesson-13-7",
  "introduced_in": "Reference - 2024-04-07-language-stats"
}],
  ["irrégulier", {
  "unit": "unit13",
  "module": "2024-04-07-language-stats",
  "lesson": "lesson-13-7",
  "introduced_in": "Reference - 2024-04-07-language-stats"
}],
  ["l'Académie française", {
  "unit": "unit13",
  "module": "2024-04-07-language-stats",
  "lesson": "lesson-13-7",
  "introduced_in": "Reference - 2024-04-07-language-stats"
}],
  ["parler vite", {
  "unit": "unit13",
  "module": "2024-04-07-language-stats",
  "lesson": "lesson-13-7",
  "introduced_in": "Reference - 2024-04-07-language-stats"
}]
]);

/**
 * Update dictionary entry with curriculum tracking
 */
function updateDictionaryEntry(entry, word) {
  const curriculum = curriculumData.get(word);
  
  if (!curriculum) {
    return entry;
  }
  
  return {
    ...entry,
    unit: curriculum.unit,
    module: curriculum.module,
    lesson: curriculum.lesson,
    introduced_in: curriculum.introduced_in,
    updated_at: new Date().toISOString()
  };
}

/**
 * Process a dictionary file
 */
function processDictionaryFile(filePath, category) {
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    return;
  }
  
  console.log(`📝 Processing ${category}...`);
  
  // Read the file
  const content = fs.readFileSync(filePath, 'utf8');
  
  // This is a simplified approach - in practice you'd want more robust parsing
  // For now, we'll create a new file with updated entries
  
  const updatedContent = `/**
 * ${category.charAt(0).toUpperCase() + category.slice(1)} Dictionary
 * Updated with curriculum tracking
 * Generated: ${new Date().toISOString()}
 */

// Import the original data
import { ${category} as original${category.charAt(0).toUpperCase() + category.slice(1)} } from './${category}-original.js';

// Update entries with curriculum tracking
export const ${category} = new Map(
  Array.from(original${category.charAt(0).toUpperCase() + category.slice(1)}.entries()).map(([word, entry]) => [
    word,
    updateDictionaryEntry(entry, word)
  ])
);
`;
  
  // Write updated file
  fs.writeFileSync(filePath.replace('.js', '-updated.js'), updatedContent);
  console.log(`   ✅ Updated ${category} dictionary`);
}

/**
 * Main update function
 */
function updateAllDictionaries() {
  const dictionaryPath = path.join(__dirname, 'src', 'data', 'dictionary', 'words');
  
  const files = [
    'nouns.js',
    'verbs.js', 
    'adjectives.js',
    'adverbs.js',
    'pronouns.js',
    'articles.js',
    'prepositions.js',
    'conjunctions.js',
    'interjections.js',
    'interrogatives.js',
    'expressions.js'
  ];
  
  files.forEach(filename => {
    const filePath = path.join(dictionaryPath, filename);
    const category = filename.replace('.js', '');
    processDictionaryFile(filePath, category);
  });
  
  console.log('\n🎉 Dictionary update completed!');
}

// Run the update
if (import.meta.url === `file://${process.argv[1]}`) {
  updateAllDictionaries();
}
