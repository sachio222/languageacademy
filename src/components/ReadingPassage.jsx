/**
 * Reading Passage Component
 * Displays a reading passage with translation toggle and interactive word tooltips
 */
import { useState, useRef, useEffect } from 'react';
import SpeakButton from './SpeakButton';
import { useSpeech } from '../hooks/useSpeech';
import { readingVocabulary as wordTranslations } from './readingVocabulary';
import { getTTSText } from '../utils/ttsUtils';

// Word translations now imported from readingVocabulary.js (deduplicated, 1752 unique entries)

const wikipediaEntries = {
  // Normandy locations for Reading 2 - All variations for proper hover functionality
  'Normandie': {
    name: 'Normandie (Normandy)',
    description: 'Historical region in northern France, famous for D-Day landings and Norman architecture',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Falaises_Etretat_2012.jpg/500px-Falaises_Etretat_2012.jpg',
    url: 'https://en.wikipedia.org/wiki/Normandy'
  },
  'normandie': {
    name: 'Normandie (Normandy)',
    description: 'Historical region in northern France, famous for D-Day landings and Norman architecture',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Falaises_Etretat_2012.jpg/500px-Falaises_Etretat_2012.jpg',
    url: 'https://en.wikipedia.org/wiki/Normandy'
  },
  'Caen': {
    name: 'Caen',
    description: 'Historic capital of Lower Normandy, home to medieval castles and abbeys',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Mairie_de_Caen_7.JPG/960px-Mairie_de_Caen_7.JPG',
    url: 'https://en.wikipedia.org/wiki/Caen'
  },
  'caen': {
    name: 'Caen',
    description: 'Historic capital of Lower Normandy, home to medieval castles and abbeys',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Mairie_de_Caen_7.JPG/960px-Mairie_de_Caen_7.JPG',
    url: 'https://en.wikipedia.org/wiki/Caen'
  },
  'Honfleur': {
    name: 'Honfleur',
    description: 'Picturesque port town famous for its old harbor and historic wooden church',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/PShonfleur4326tonemapped.jpg/960px-PShonfleur4326tonemapped.jpg',
    url: 'https://en.wikipedia.org/wiki/Honfleur'
  },
  'honfleur': {
    name: 'Honfleur',
    description: 'Picturesque port town famous for its old harbor and historic wooden church',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/PShonfleur4326tonemapped.jpg/960px-PShonfleur4326tonemapped.jpg',
    url: 'https://en.wikipedia.org/wiki/Honfleur'
  },
  'Bayeux': {
    name: 'Bayeux',
    description: 'Medieval town famous for the Bayeux Tapestry depicting the Norman Conquest of 1066',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bayeux_centre.jpg/960px-Bayeux_centre.jpg',
    url: 'https://en.wikipedia.org/wiki/Bayeux'
  },
  'bayeux': {
    name: 'Bayeux',
    description: 'Medieval town famous for the Bayeux Tapestry depicting the Norman Conquest of 1066',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bayeux_centre.jpg/960px-Bayeux_centre.jpg',
    url: 'https://en.wikipedia.org/wiki/Bayeux'
  },
  'mont-saint-michel': {
    name: 'Mont-Saint-Michel',
    description: 'Iconic tidal island abbey, UNESCO World Heritage site and medieval marvel',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Mont-Saint-Michel_vu_du_ciel.jpg/960px-Mont-Saint-Michel_vu_du_ciel.jpg',
    url: 'https://en.wikipedia.org/wiki/Mont-Saint-Michel'
  },
  'Mont-Saint-Michel': {
    name: 'Mont-Saint-Michel',
    description: 'Iconic tidal island abbey, UNESCO World Heritage site and medieval marvel',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Mont-Saint-Michel_vu_du_ciel.jpg/960px-Mont-Saint-Michel_vu_du_ciel.jpg',
    url: 'https://en.wikipedia.org/wiki/Mont-Saint-Michel'
  },
  'Rouen': {
    name: 'Rouen',
    description: 'Historic capital of Upper Normandy, famous for its Gothic cathedral and Joan of Arc history',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Cath%C3%A9drale_de_Rouen_vue_de_l%27Op%C3%A9ra.JPG/500px-Cath%C3%A9drale_de_Rouen_vue_de_l%27Op%C3%A9ra.JPG',
    url: 'https://en.wikipedia.org/wiki/Rouen'
  },
  'rouen': {
    name: 'Rouen',
    description: 'Historic capital of Upper Normandy, famous for its Gothic cathedral and Joan of Arc history',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Cath%C3%A9drale_de_Rouen_vue_de_l%27Op%C3%A9ra.JPG/500px-Cath%C3%A9drale_de_Rouen_vue_de_l%27Op%C3%A9ra.JPG',
    url: 'https://en.wikipedia.org/wiki/Rouen'
  },

  // Original Paris locations  
  'paris': {
    name: 'Paris',
    description: 'Capital and largest city of France',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/300px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg',
    url: 'https://en.wikipedia.org/wiki/Paris'
  },
  'Paris': {
    name: 'Paris',
    description: 'Capital and largest city of France',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/300px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg',
    url: 'https://en.wikipedia.org/wiki/Paris'
  },
  'la Tour Eiffel': {
    name: 'La Tour Eiffel',
    description: 'Wrought-iron lattice tower, built 1887-1889, 330m tall',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/2013_Fireworks_on_Eiffel_Tower_11.jpg/500px-2013_Fireworks_on_Eiffel_Tower_11.jpg',
    url: 'https://en.wikipedia.org/wiki/Eiffel_Tower'
  },
  'Tour Eiffel': {
    name: 'Tour Eiffel',
    description: 'Wrought-iron lattice tower, built 1887-1889, 330m tall',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/2013_Fireworks_on_Eiffel_Tower_11.jpg/500px-2013_Fireworks_on_Eiffel_Tower_11.jpg',
    url: 'https://en.wikipedia.org/wiki/Eiffel_Tower'
  },
  'socrate': {
    name: 'Socrate (Socrates)',
    description: 'Ancient Greek philosopher (470-399 BC), father of Western philosophy, famous for Socratic method of questioning',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Socrates_Louvre.jpg/260px-Socrates_Louvre.jpg',
    url: 'https://en.wikipedia.org/wiki/Socrates'
  },
  'Socrate': {
    name: 'Socrate (Socrates)',
    description: 'Ancient Greek philosopher (470-399 BC), father of Western philosophy, famous for Socratic method of questioning',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Socrates_Louvre.jpg/260px-Socrates_Louvre.jpg',
    url: 'https://en.wikipedia.org/wiki/Socrates'
  },
  'la sorbonne': {
    name: 'La Sorbonne',
    description: 'Historic university in Paris, founded 1257, one of the world\'s oldest and most prestigious universities',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Front_of_the_Sorbonne.jpg/500px-Front_of_the_Sorbonne.jpg',
    url: 'https://en.wikipedia.org/wiki/University_of_Paris'
  },
  'La Sorbonne': {
    name: 'La Sorbonne',
    description: 'Historic university in Paris, founded 1257, one of the world\'s oldest and most prestigious universities',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Front_of_the_Sorbonne.jpg/500px-Front_of_the_Sorbonne.jpg',
    url: 'https://en.wikipedia.org/wiki/University_of_Paris'
  },
  'Sorbonne': {
    name: 'La Sorbonne',
    description: 'Historic university in Paris, founded 1257, one of the world\'s oldest and most prestigious universities',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Front_of_the_Sorbonne.jpg/500px-Front_of_the_Sorbonne.jpg',
    url: 'https://en.wikipedia.org/wiki/University_of_Paris'
  },
  'Jardin des Tuileries': {
    name: 'Jardin des Tuileries',
    description: 'Historic public garden in Paris, created in 1564, located between the Louvre and Place de la Concorde',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Crowd_in_the_Jardin_des_Tuileries%2C_Paris_July_2014.jpg/320px-Crowd_in_the_Jardin_des_Tuileries%2C_Paris_July_2014.jpg',
    url: 'https://en.wikipedia.org/wiki/Tuileries_Garden'
  },
  'le Jardin des Tuileries': {
    name: 'Jardin des Tuileries',
    description: 'Historic public garden in Paris, created in 1564, located between the Louvre and Place de la Concorde',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Crowd_in_the_Jardin_des_Tuileries%2C_Paris_July_2014.jpg/320px-Crowd_in_the_Jardin_des_Tuileries%2C_Paris_July_2014.jpg',
    url: 'https://en.wikipedia.org/wiki/Tuileries_Garden'
  },
  'au Jardin des Tuileries': {
    name: 'Jardin des Tuileries',
    description: 'Historic public garden in Paris, created in 1564, located between the Louvre and Place de la Concorde',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Crowd_in_the_Jardin_des_Tuileries%2C_Paris_July_2014.jpg/320px-Crowd_in_the_Jardin_des_Tuileries%2C_Paris_July_2014.jpg',
    url: 'https://en.wikipedia.org/wiki/Tuileries_Garden'
  },
  'jardin du luxembourg': {
    name: 'Jardin du Luxembourg',
    description: 'Second largest public park in Paris, created in 1612, featuring formal gardens, palace, and fountains',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Palais_du_Luxembourg_October_21%2C_2010.jpg/960px-Palais_du_Luxembourg_October_21%2C_2010.jpg',
    url: 'https://en.wikipedia.org/wiki/Luxembourg_Gardens'
  },
  'Jardin du Luxembourg': {
    name: 'Jardin du Luxembourg',
    description: 'Second largest public park in Paris, created in 1612, featuring formal gardens, palace, and fountains',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Palais_du_Luxembourg_October_21%2C_2010.jpg/960px-Palais_du_Luxembourg_October_21%2C_2010.jpg',
    url: 'https://en.wikipedia.org/wiki/Luxembourg_Gardens'
  },
  'au Jardin du Luxembourg': {
    name: 'Jardin du Luxembourg',
    description: 'Second largest public park in Paris, created in 1612, featuring formal gardens, palace, and fountains',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Palais_du_Luxembourg_October_21%2C_2010.jpg/960px-Palais_du_Luxembourg_October_21%2C_2010.jpg',
    url: 'https://en.wikipedia.org/wiki/Luxembourg_Gardens'
  },
  'café de flore': {
    name: 'Café de Flore',
    description: 'Historic café in Paris, opened 1887, famous meeting place for intellectuals like Sartre and Simone de Beauvoir',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Caf%C3%A9_de_Flore%2C_172_boulevard_Saint-Germain%2C_Paris_6e.jpg/500px-Caf%C3%A9_de_Flore%2C_172_boulevard_Saint-Germain%2C_Paris_6e.jpg',
    url: 'https://en.wikipedia.org/wiki/Caf%C3%A9_de_Flore'
  },
  'Café de Flore': {
    name: 'Café de Flore',
    description: 'Historic café in Paris, opened 1887, famous meeting place for intellectuals like Sartre and Simone de Beauvoir',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Caf%C3%A9_de_Flore%2C_172_boulevard_Saint-Germain%2C_Paris_6e.jpg/500px-Caf%C3%A9_de_Flore%2C_172_boulevard_Saint-Germain%2C_Paris_6e.jpg',
    url: 'https://en.wikipedia.org/wiki/Caf%C3%A9_de_Flore'
  },
  'au Café de Flore': {
    name: 'Café de Flore',
    description: 'Historic café in Paris, opened 1887, famous meeting place for intellectuals like Sartre and Simone de Beauvoir',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Caf%C3%A9_de_Flore%2C_172_boulevard_Saint-Germain%2C_Paris_6e.jpg/500px-Caf%C3%A9_de_Flore%2C_172_boulevard_Saint-Germain%2C_Paris_6e.jpg',
    url: 'https://en.wikipedia.org/wiki/Caf%C3%A9_de_Flore'
  },
  'lyon': {
    name: 'Lyon',
    description: 'Third largest city in France, historic capital of gastronomy, UNESCO World Heritage site',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Lyon-part-dieu-2023.jpg/960px-Lyon-part-dieu-2023.jpg',
    url: 'https://en.wikipedia.org/wiki/Lyon'
  },
  'Lyon': {
    name: 'Lyon',
    description: 'Third largest city in France, historic capital of gastronomy, UNESCO World Heritage site',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Lyon-part-dieu-2023.jpg/960px-Lyon-part-dieu-2023.jpg',
    url: 'https://en.wikipedia.org/wiki/Lyon'
  },
  'Lyon.': {
    name: 'Lyon',
    description: 'Third largest city in France, historic capital of gastronomy, UNESCO World Heritage site',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Lyon-part-dieu-2023.jpg/960px-Lyon-part-dieu-2023.jpg',
    url: 'https://en.wikipedia.org/wiki/Lyon'
  },
  'à Lyon': {
    name: 'Lyon',
    description: 'Third largest city in France, historic capital of gastronomy, UNESCO World Heritage site',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Lyon-part-dieu-2023.jpg/960px-Lyon-part-dieu-2023.jpg',
    url: 'https://en.wikipedia.org/wiki/Lyon'
  },
  'amélie': {
    name: 'Le Fabuleux Destin d\'Amélie Poulain (Amélie)',
    description: 'Beloved 2001 French romantic comedy film directed by Jean-Pierre Jeunet, set in Montmartre, Paris',
    image: 'https://upload.wikimedia.org/wikipedia/en/5/53/Amelie_poster.jpg',
    url: 'https://en.wikipedia.org/wiki/Am%C3%A9lie'
  },
  'Amélie': {
    name: 'Le Fabuleux Destin d\'Amélie Poulain (Amélie)',
    description: 'Beloved 2001 French romantic comedy film directed by Jean-Pierre Jeunet, set in Montmartre, Paris',
    image: 'https://upload.wikimedia.org/wikipedia/en/5/53/Amelie_poster.jpg',
    url: 'https://en.wikipedia.org/wiki/Am%C3%A9lie'
  },
  '"Amélie"': {
    name: 'Le Fabuleux Destin d\'Amélie Poulain (Amélie)',
    description: 'Beloved 2001 French romantic comedy film directed by Jean-Pierre Jeunet, set in Montmartre, Paris',
    image: 'https://upload.wikimedia.org/wikipedia/en/5/53/Amelie_poster.jpg',
    url: 'https://en.wikipedia.org/wiki/Am%C3%A9lie'
  },
  'Amélie.': {
    name: 'Le Fabuleux Destin d\'Amélie Poulain (Amélie)',
    description: 'Beloved 2001 French romantic comedy film directed by Jean-Pierre Jeunet, set in Montmartre, Paris',
    image: 'https://upload.wikimedia.org/wikipedia/en/5/53/Amelie_poster.jpg',
    url: 'https://en.wikipedia.org/wiki/Am%C3%A9lie'
  },
  'le procope': {
    name: 'Le Procope',
    description: 'Oldest café in Paris, opened 1686, historic meeting place for Voltaire, Rousseau, Victor Hugo, and many writers',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Le_Procope_1%2C_Paris_2010.jpg/500px-Le_Procope_1%2C_Paris_2010.jpg',
    url: 'https://en.wikipedia.org/wiki/Caf%C3%A9_Procope'
  },
  'Le Procope': {
    name: 'Le Procope',
    description: 'Oldest café in Paris, opened 1686, historic meeting place for Voltaire, Rousseau, Victor Hugo, and many writers',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Le_Procope_1%2C_Paris_2010.jpg/500px-Le_Procope_1%2C_Paris_2010.jpg',
    url: 'https://en.wikipedia.org/wiki/Caf%C3%A9_Procope'
  },
  'Restaurant Le Procope': {
    name: 'Le Procope',
    description: 'Oldest café in Paris, opened 1686, historic meeting place for Voltaire, Rousseau, Victor Hugo, and many writers',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Le_Procope_1%2C_Paris_2010.jpg/500px-Le_Procope_1%2C_Paris_2010.jpg',
    url: 'https://en.wikipedia.org/wiki/Caf%C3%A9_Procope'
  },
  'au Restaurant Le Procope': {
    name: 'Le Procope',
    description: 'Oldest café in Paris, opened 1686, historic meeting place for Voltaire, Rousseau, Victor Hugo, and many writers',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Le_Procope_1%2C_Paris_2010.jpg/500px-Le_Procope_1%2C_Paris_2010.jpg',
    url: 'https://en.wikipedia.org/wiki/Caf%C3%A9_Procope'
  },
  'notre-dame': {
    name: 'Notre-Dame de Paris',
    description: 'Medieval Catholic cathedral built 1163-1345, Gothic architecture masterpiece on Île de la Cité',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Notre-Dame_de_Paris%2C_4_October_2017.jpg/500px-Notre-Dame_de_Paris%2C_4_October_2017.jpg',
    url: 'https://en.wikipedia.org/wiki/Notre-Dame_de_Paris'
  },
  'Notre-Dame': {
    name: 'Notre-Dame de Paris',
    description: 'Medieval Catholic cathedral built 1163-1345, Gothic architecture masterpiece on Île de la Cité',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Notre-Dame_de_Paris%2C_4_October_2017.jpg/500px-Notre-Dame_de_Paris%2C_4_October_2017.jpg',
    url: 'https://en.wikipedia.org/wiki/Notre-Dame_de_Paris'
  },
  'montmartre': {
    name: 'Montmartre',
    description: 'Historic hilltop neighborhood famous for artists, Sacré-Cœur Basilica, and bohemian culture since 1800s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/View_from_Notre-Dame_de_Paris%2C_24_June_2014_004.jpg/500px-View_from_Notre-Dame_de_Paris%2C_24_June_2014_004.jpg',
    url: 'https://en.wikipedia.org/wiki/Montmartre'
  },
  'Montmartre': {
    name: 'Montmartre',
    description: 'Historic hilltop neighborhood famous for artists, Sacré-Cœur Basilica, and bohemian culture since 1800s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/View_from_Notre-Dame_de_Paris%2C_24_June_2014_004.jpg/500px-View_from_Notre-Dame_de_Paris%2C_24_June_2014_004.jpg',
    url: 'https://en.wikipedia.org/wiki/Montmartre'
  },
  'à Montmartre': {
    name: 'Montmartre',
    description: 'Historic hilltop neighborhood famous for artists, Sacré-Cœur Basilica, and bohemian culture since 1800s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/View_from_Notre-Dame_de_Paris%2C_24_June_2014_004.jpg/500px-View_from_Notre-Dame_de_Paris%2C_24_June_2014_004.jpg',
    url: 'https://en.wikipedia.org/wiki/Montmartre'
  },
  'nice': {
    name: 'Nice',
    description: 'Mediterranean resort city on French Riviera, known for Promenade des Anglais and beautiful beaches',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/CollineDuChateau_NiceFrance2022.png/500px-CollineDuChateau_NiceFrance2022.png',
    url: 'https://en.wikipedia.org/wiki/Nice'
  },
  'Nice': {
    name: 'Nice',
    description: 'Mediterranean resort city on French Riviera, known for Promenade des Anglais and beautiful beaches',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/CollineDuChateau_NiceFrance2022.png/500px-CollineDuChateau_NiceFrance2022.png',
    url: 'https://en.wikipedia.org/wiki/Nice'
  },
  'à Nice': {
    name: 'Nice',
    description: 'Mediterranean resort city on French Riviera, known for Promenade des Anglais and beautiful beaches',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/CollineDuChateau_NiceFrance2022.png/500px-CollineDuChateau_NiceFrance2022.png',
    url: 'https://en.wikipedia.org/wiki/Nice'
  },
  'bordeaux': {
    name: 'Bordeaux',
    description: 'Port city in southwest France, world capital of wine, UNESCO World Heritage Site since 2007',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Bordeaux_Place_de_la_Bourse_de_nuit.jpg/960px-Bordeaux_Place_de_la_Bourse_de_nuit.jpg',
    url: 'https://en.wikipedia.org/wiki/Bordeaux'
  },
  'Bordeaux': {
    name: 'Bordeaux',
    description: 'Port city in southwest France, world capital of wine, UNESCO World Heritage Site since 2007',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Bordeaux_Place_de_la_Bourse_de_nuit.jpg/960px-Bordeaux_Place_de_la_Bourse_de_nuit.jpg',
    url: 'https://en.wikipedia.org/wiki/Bordeaux'
  },
  'à Bordeaux': {
    name: 'Bordeaux',
    description: 'Port city in southwest France, world capital of wine, UNESCO World Heritage Site since 2007',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Bordeaux_Place_de_la_Bourse_de_nuit.jpg/960px-Bordeaux_Place_de_la_Bourse_de_nuit.jpg',
    url: 'https://en.wikipedia.org/wiki/Bordeaux'
  },
  'louvre': {
    name: 'Louvre Museum',
    description: 'World\'s largest art museum, 782,910 sq ft, houses Mona Lisa, opened 1793, 8.9 million visitors/year',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/300px-Louvre_Museum_Wikimedia_Commons.jpg',
    url: 'https://en.wikipedia.org/wiki/Louvre'
  },
  'Louvre': {
    name: 'Louvre Museum',
    description: 'World\'s largest art museum, 782,910 sq ft, houses Mona Lisa, opened 1793, 8.9 million visitors/year',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/300px-Louvre_Museum_Wikimedia_Commons.jpg',
    url: 'https://en.wikipedia.org/wiki/Louvre'
  },
  'le Louvre': {
    name: 'Louvre Museum',
    description: 'World\'s largest art museum, 782,910 sq ft, houses Mona Lisa, opened 1793, 8.9 million visitors/year',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/300px-Louvre_Museum_Wikimedia_Commons.jpg',
    url: 'https://en.wikipedia.org/wiki/Louvre'
  },
  'au Louvre': {
    name: 'Louvre Museum',
    description: 'World\'s largest art museum, 782,910 sq ft, houses Mona Lisa, opened 1793, 8.9 million visitors/year',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/300px-Louvre_Museum_Wikimedia_Commons.jpg',
    url: 'https://en.wikipedia.org/wiki/Louvre'
  },
  'seine': {
    name: 'Seine River',
    description: '777 km river flowing through Paris, divides Left Bank from Right Bank, integral to city\'s history',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Seine_by_Eiffel.jpg/500px-Seine_by_Eiffel.jpg',
    url: 'https://en.wikipedia.org/wiki/Seine'
  },
  'Seine': {
    name: 'Seine River',
    description: '777 km river flowing through Paris, divides Left Bank from Right Bank, integral to city\'s history',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Seine_by_Eiffel.jpg/500px-Seine_by_Eiffel.jpg',
    url: 'https://en.wikipedia.org/wiki/Seine'
  },
  'la Seine': {
    name: 'Seine River',
    description: '777 km river flowing through Paris, divides Left Bank from Right Bank, integral to city\'s history',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Seine_by_Eiffel.jpg/500px-Seine_by_Eiffel.jpg',
    url: 'https://en.wikipedia.org/wiki/Seine'
  },
  'vers la Seine': {
    name: 'Seine River',
    description: '777 km river flowing through Paris, divides Left Bank from Right Bank, integral to city\'s history',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Seine_by_Eiffel.jpg/500px-Seine_by_Eiffel.jpg',
    url: 'https://en.wikipedia.org/wiki/Seine'
  },
  'marseille': {
    name: 'Marseille',
    description: 'France\'s second-largest city, major Mediterranean port, founded by Greeks 600 BC, cultural capital of Europe 2013',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Marseille-corniche.jpg/500px-Marseille-corniche.jpg',
    url: 'https://en.wikipedia.org/wiki/Marseille'
  },
  'Marseille': {
    name: 'Marseille',
    description: 'France\'s second-largest city, major Mediterranean port, founded by Greeks 600 BC, cultural capital of Europe 2013',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Marseille-corniche.jpg/500px-Marseille-corniche.jpg',
    url: 'https://en.wikipedia.org/wiki/Marseille'
  },
  'monet': {
    name: 'Claude Monet',
    description: 'French Impressionist painter (1840-1926), founder of Impressionism, famous for Water Lilies and Rouen Cathedral series',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Monet_-_Seerosen5.jpg/500px-Monet_-_Seerosen5.jpg',
    url: 'https://en.wikipedia.org/wiki/Claude_Monet'
  },
  'Monet': {
    name: 'Claude Monet',
    description: 'French Impressionist painter (1840-1926), founder of Impressionism, famous for Water Lilies and Rouen Cathedral series',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Monet_-_Seerosen5.jpg/500px-Monet_-_Seerosen5.jpg',
    url: 'https://en.wikipedia.org/wiki/Claude_Monet'
  },
  'Claude Monet': {
    name: 'Claude Monet',
    description: 'French Impressionist painter (1840-1926), founder of Impressionism, famous for Water Lilies and Rouen Cathedral series',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Monet_-_Seerosen5.jpg/500px-Monet_-_Seerosen5.jpg',
    url: 'https://en.wikipedia.org/wiki/Claude_Monet'
  },
  'van gogh': {
    name: 'Vincent van Gogh',
    description: 'Dutch Post-Impressionist painter (1853-1890), lived in France, famous for Starry Night and Sunflowers',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/260px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg',
    url: 'https://en.wikipedia.org/wiki/Vincent_van_Gogh'
  },
  'Van Gogh': {
    name: 'Vincent van Gogh',
    description: 'Dutch Post-Impressionist painter (1853-1890), lived in France, famous for Starry Night and Sunflowers',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/260px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg',
    url: 'https://en.wikipedia.org/wiki/Vincent_van_Gogh'
  },
  'Vincent van Gogh': {
    name: 'Vincent van Gogh',
    description: 'Dutch Post-Impressionist painter (1853-1890), lived in France, famous for Starry Night and Sunflowers',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/260px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg',
    url: 'https://en.wikipedia.org/wiki/Vincent_van_Gogh'
  },
  'renoir': {
    name: 'Auguste Renoir',
    description: 'French Impressionist painter (1841-1919), famous for vibrant light and saturated color, painted people in intimate settings',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Pierre-Auguste_Renoir%2C_uncropped_image.jpg/260px-Pierre-Auguste_Renoir%2C_uncropped_image.jpg',
    url: 'https://en.wikipedia.org/wiki/Pierre-Auguste_Renoir'
  },
  'Renoir': {
    name: 'Auguste Renoir',
    description: 'French Impressionist painter (1841-1919), famous for vibrant light and saturated color, painted people in intimate settings',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Pierre-Auguste_Renoir%2C_uncropped_image.jpg/260px-Pierre-Auguste_Renoir%2C_uncropped_image.jpg',
    url: 'https://en.wikipedia.org/wiki/Pierre-Auguste_Renoir'
  },
  'moulin rouge': {
    name: 'Moulin Rouge',
    description: 'Famous cabaret built 1889 in Montmartre, birthplace of modern can-can dance, iconic red windmill',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Moulin_Rouge%2C_17_April_2011.jpg/960px-Moulin_Rouge%2C_17_April_2011.jpg',
    url: 'https://en.wikipedia.org/wiki/Moulin_Rouge'
  },
  'Moulin Rouge': {
    name: 'Moulin Rouge',
    description: 'Famous cabaret built 1889 in Montmartre, birthplace of modern can-can dance, iconic red windmill',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Moulin_Rouge%2C_17_April_2011.jpg/960px-Moulin_Rouge%2C_17_April_2011.jpg',
    url: 'https://en.wikipedia.org/wiki/Moulin_Rouge'
  },
  'champs-élysées': {
    name: 'Champs-Élysées',
    description: 'Most famous avenue in Paris, 1.9km long, connects Arc de Triomphe to Place de la Concorde',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Avenue_des_Champs-%C3%89lys%C3%A9es_July_24%2C_2009_N1.jpg/960px-Avenue_des_Champs-%C3%89lys%C3%A9es_July_24%2C_2009_N1.jpg',
    url: 'https://en.wikipedia.org/wiki/Champs-%C3%89lys%C3%A9es'
  },
  'Champs-Élysées': {
    name: 'Champs-Élysées',
    description: 'Most famous avenue in Paris, 1.9km long, connects Arc de Triomphe to Place de la Concorde',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Avenue_des_Champs-%C3%89lys%C3%A9es_July_24%2C_2009_N1.jpg/960px-Avenue_des_Champs-%C3%89lys%C3%A9es_July_24%2C_2009_N1.jpg',
    url: 'https://en.wikipedia.org/wiki/Champs-%C3%89lys%C3%A9es'
  },
  'versailles': {
    name: 'Palace of Versailles',
    description: 'Royal château 12 miles southwest of Paris, symbol of absolute monarchy, Hall of Mirrors, UNESCO World Heritage',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chateau_Versailles_Galerie_des_Glaces.jpg/960px-Chateau_Versailles_Galerie_des_Glaces.jpg',
    url: 'https://en.wikipedia.org/wiki/Palace_of_Versailles'
  },
  'Versailles': {
    name: 'Palace of Versailles',
    description: 'Royal château 12 miles southwest of Paris, symbol of absolute monarchy, Hall of Mirrors, UNESCO World Heritage',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chateau_Versailles_Galerie_des_Glaces.jpg/960px-Chateau_Versailles_Galerie_des_Glaces.jpg',
    url: 'https://en.wikipedia.org/wiki/Palace_of_Versailles'
  },
  'coq au vin': {
    name: 'Coq au Vin',
    description: 'Classic French dish of chicken braised in wine, traditionally Burgundy wine, with mushrooms and onions',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Coq_au_vin_at_The_Swan_at_the_Globe%2C_London.jpg/500px-Coq_au_vin_at_The_Swan_at_the_Globe%2C_London.jpg',
    url: 'https://en.wikipedia.org/wiki/Coq_au_vin'
  },
  'ratatouille': {
    name: 'Ratatouille',
    description: 'Traditional French vegetable stew from Provence, made with tomatoes, eggplant, zucchini, peppers, and herbs',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Confit_byaldi_2.jpg/500px-Confit_byaldi_2.jpg',
    url: 'https://en.wikipedia.org/wiki/Ratatouille'
  },
  'bouillabaisse': {
    name: 'Bouillabaisse',
    description: 'Traditional fish stew from Marseille, made with Mediterranean fish, saffron, and served with rouille sauce',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Bullabessa.jpg/500px-Bullabessa.jpg',
    url: 'https://en.wikipedia.org/wiki/Bouillabaisse'
  },
  'bouillabaisse de marseille': {
    name: 'Bouillabaisse',
    description: 'Traditional fish stew from Marseille, made with Mediterranean fish, saffron, and served with rouille sauce',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Bullabessa.jpg/500px-Bullabessa.jpg',
    url: 'https://en.wikipedia.org/wiki/Bouillabaisse'
  },
  'arc de triomphe': {
    name: 'Arc de Triomphe',
    description: 'Triumphal arch built 1806-1836, honors French military victories, tomb of unknown soldier, center of Place Charles de Gaulle',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/300px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg',
    url: 'https://en.wikipedia.org/wiki/Arc_de_Triomphe'
  },
  'Arc de Triomphe': {
    name: 'Arc de Triomphe',
    description: 'Triumphal arch built 1806-1836, honors French military victories, tomb of unknown soldier, center of Place Charles de Gaulle',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/300px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg',
    url: 'https://en.wikipedia.org/wiki/Arc_de_Triomphe'
  },
  'l\'Arc de Triomphe': {
    name: 'Arc de Triomphe',
    description: 'Triumphal arch built 1806-1836, honors French military victories, tomb of unknown soldier, center of Place Charles de Gaulle',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/300px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg',
    url: 'https://en.wikipedia.org/wiki/Arc_de_Triomphe'
  },
  'auguste renoir': {
    name: 'Auguste Renoir',
    description: 'French Impressionist painter (1841-1919), famous for vibrant light and saturated color, painted people in intimate settings',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg/500px-Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg',
    url: 'https://en.wikipedia.org/wiki/Pierre-Auguste_Renoir'
  },
  'Auguste Renoir': {
    name: 'Auguste Renoir',
    description: 'French Impressionist painter (1841-1919), famous for vibrant light and saturated color, painted people in intimate settings',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg/500px-Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg',
    url: 'https://en.wikipedia.org/wiki/Pierre-Auguste_Renoir'
  },
  'méditerranée': {
    name: 'Mediterranean Sea',
    description: 'Sea between Europe, Africa and Asia, 2.5 million km², cradle of Western civilization, connects to Atlantic via Gibraltar',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Ionian_sea_islands%2C_pic1.JPG/500px-Ionian_sea_islands%2C_pic1.JPG',
    url: 'https://en.wikipedia.org/wiki/Mediterranean_Sea'
  },
  'Méditerranée': {
    name: 'Mediterranean Sea',
    description: 'Sea between Europe, Africa and Asia, 2.5 million km², cradle of Western civilization, connects to Atlantic via Gibraltar',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Ionian_sea_islands%2C_pic1.JPG/500px-Ionian_sea_islands%2C_pic1.JPG',
    url: 'https://en.wikipedia.org/wiki/Mediterranean_Sea'
  },
  'mer Méditerranée': {
    name: 'Mediterranean Sea',
    description: 'Sea between Europe, Africa and Asia, 2.5 million km², cradle of Western civilization, connects to Atlantic via Gibraltar',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Ionian_sea_islands%2C_pic1.JPG/500px-Ionian_sea_islands%2C_pic1.JPG',
    url: 'https://en.wikipedia.org/wiki/Mediterranean_Sea'
  },
  'cannes': {
    name: 'Cannes',
    description: 'Resort city on French Riviera, famous for Cannes Film Festival since 1946, luxury shopping and beaches',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/H%C3%B4tel_Martinez%2C_Cannes_%282014%29.JPG/500px-H%C3%B4tel_Martinez%2C_Cannes_%282014%29.JPG',
    url: 'https://en.wikipedia.org/wiki/Cannes'
  },
  'Cannes': {
    name: 'Cannes',
    description: 'Resort city on French Riviera, famous for Cannes Film Festival since 1946, luxury shopping and beaches',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/H%C3%B4tel_Martinez%2C_Cannes_%282014%29.JPG/500px-H%C3%B4tel_Martinez%2C_Cannes_%282014%29.JPG',
    url: 'https://en.wikipedia.org/wiki/Cannes'
  },
  'bouillabaisse': {
    name: 'Bouillabaisse',
    description: 'Traditional fish stew from Marseille, made with Mediterranean fish, saffron, and served with rouille sauce',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Bullabessa.jpg/500px-Bullabessa.jpg',
    url: 'https://en.wikipedia.org/wiki/Bouillabaisse'
  },
  'château de versailles': {
    name: 'Palace of Versailles',
    description: 'Royal château built for Louis XIV, symbol of absolute monarchy, Hall of Mirrors, 2,300 rooms, UNESCO World Heritage Site',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chateau_Versailles_Galerie_des_Glaces.jpg/960px-Chateau_Versailles_Galerie_des_Glaces.jpg',
    url: 'https://en.wikipedia.org/wiki/Palace_of_Versailles'
  },
  'Château de Versailles': {
    name: 'Palace of Versailles',
    description: 'Royal château built for Louis XIV, symbol of absolute monarchy, Hall of Mirrors, 2,300 rooms, UNESCO World Heritage Site',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chateau_Versailles_Galerie_des_Glaces.jpg/960px-Chateau_Versailles_Galerie_des_Glaces.jpg',
    url: 'https://en.wikipedia.org/wiki/Palace_of_Versailles'
  }
};

function ReadingPassage({ passage }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [hoveredWord, setHoveredWord] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ shift: 0, arrowShift: 0, isVisible: false });
  const wordRefs = useRef({});
  const { speak } = useSpeech();

  // Use centralized TTS utility (no need for local function)

  // Calculate tooltip position on mobile to prevent viewport overflow
  useEffect(() => {
    if (!hoveredWord) {
      setTooltipPosition({ shift: 0, arrowShift: 0, isVisible: false });
      return;
    }

    // Only calculate on mobile screens
    const isMobile = window.innerWidth <= 640;
    if (!isMobile) {
      // Desktop: show immediately, no calculation needed
      setTooltipPosition({ shift: 0, arrowShift: 0, isVisible: true });
      return;
    }

    const wordElement = wordRefs.current[hoveredWord];
    if (!wordElement) return;

    // Start with hidden tooltip so we can measure it
    setTooltipPosition({ shift: 0, arrowShift: 0, isVisible: false });

    // Use requestAnimationFrame to measure in next frame
    requestAnimationFrame(() => {
      const tooltipElement = wordElement.querySelector('.wiki-tooltip');
      if (!tooltipElement) return;

      const wordRect = wordElement.getBoundingClientRect();
      const tooltipRect = tooltipElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const safeMargin = 8; // 8px margin from edge

      // Calculate word center position
      const wordCenter = wordRect.left + wordRect.width / 2;

      // Calculate where tooltip would be positioned (centered on word)
      const tooltipLeft = wordCenter - tooltipRect.width / 2;
      const tooltipRight = wordCenter + tooltipRect.width / 2;

      let shift = 0;

      // Would overflow left edge?
      if (tooltipLeft < safeMargin) {
        shift = safeMargin - tooltipLeft;
      }
      // Would overflow right edge?
      else if (tooltipRight > viewportWidth - safeMargin) {
        shift = (viewportWidth - safeMargin) - tooltipRight;
      }

      // Update position and make visible
      setTooltipPosition({
        shift: shift,
        arrowShift: -shift, // Arrow moves opposite to keep pointing at word
        isVisible: true
      });
    });
  }, [hoveredWord]);

  if (!passage) return null;

  // Strip markdown formatting and image markers for TTS
  const stripMarkdown = (text) => {
    return text
      .replace(/\*\*/g, '')
      .replace(/!\[.*?\]/g, '')  // Remove image markers
      .replace(/\n\n+/g, '\n\n'); // Clean up extra newlines
  };

  // Make words interactive - use paragraph index for truly unique keys
  const renderInteractiveText = (text, paragraphIndex) => {
    // Check if line has speaker label
    const speakerMatch = text.match(/^\*\*([^:]+):\*\*/);

    if (speakerMatch) {
      const speaker = speakerMatch[1];
      const dialogue = text.replace(/^\*\*[^:]+:\*\*\s*/, '');

      return (
        <>
          <strong className="speaker-label">{speaker}:</strong>{' '}
          {renderWords(dialogue, paragraphIndex)}
        </>
      );
    }

    return renderWords(text, paragraphIndex);
  };

  const renderWords = (text, paragraphIndex) => {
    let remainingText = text;
    const elements = [];
    let charPosition = 0;

    // Multi-word phrases to check FIRST (longest first to avoid conflicts)
    const multiWordPhrases = [
      { phrase: "qu'est-ce que c'est", translation: "what is it?" },
      { phrase: "qu'est-ce que vous voulez", translation: "what do you want" },
      { phrase: "Qu'est-ce qu'il y a", translation: "What is there" },
      { phrase: "il y a", translation: "there is / there are" },
      { phrase: "qu'est-ce que", translation: "what" },
      { phrase: "s'il vous plaît", translation: "please (formal)" },
      { phrase: "s'il vous plait", translation: "please (formal)" },
      { phrase: "s'il te plaît", translation: "please (informal)" },
      { phrase: "s'il te plait", translation: "please (informal)" },
      { phrase: "excusez-moi", translation: "excuse me" },
      { phrase: "merci beaucoup", translation: "thank you very much" },
      { phrase: "merci à toi", translation: "thank you (to you)" },
      { phrase: "c'est combien", translation: "how much is it?" },
      { phrase: "combien est-ce", translation: "how much is it?" },
      { phrase: "est-ce que", translation: "question marker" },
      { phrase: "comment ça va", translation: "how's it going?" },
      { phrase: "au revoir", translation: "goodbye" },
      { phrase: "ça va bien", translation: "I'm good / it's going well" },
      { phrase: "ça va", translation: "it's going / OK" },
      { phrase: "ah bon", translation: "oh really / I see" },
      { phrase: "mais non", translation: "but no / not at all" },
      { phrase: "c'est ça", translation: "that's it / that's right" },
      { phrase: "aujourd'hui", translation: "today" },
      { phrase: "ce soir", translation: "this evening / tonight" },
      { phrase: "à ce soir", translation: "see you this evening" },
      { phrase: "le matin", translation: "the morning / in the morning" },
      { phrase: "là-bas", translation: "over there" },
      { phrase: "quelque part", translation: "somewhere" },
      { phrase: "nulle part", translation: "nowhere" },
      { phrase: "Grâce à", translation: "Thanks to" },
      { phrase: "grâce à", translation: "thanks to" },
      { phrase: "à cause de", translation: "because of" },
      { phrase: "parce que", translation: "because" },
      { phrase: "au-delà", translation: "beyond" },

      // Subjunctive forms that get tokenized incorrectly
      { phrase: "j'aie", translation: "I have (subjunctive)" },
      { phrase: "que j'aie", translation: "that I have (subjunctive)" },
      { phrase: "que j'aie perdu", translation: "that I lost/have lost" },

      // Proper nouns - multi-word
      { phrase: "Jardin des Tuileries", translation: "Tuileries Garden" },
      { phrase: "le Jardin des Tuileries", translation: "the Tuileries Garden" },
      { phrase: "au Jardin des Tuileries", translation: "at the Tuileries Garden" },
      { phrase: "Jardin du Luxembourg", translation: "Luxembourg Garden (famous Paris park)" },
      { phrase: "le Jardin du Luxembourg", translation: "the Luxembourg Garden" },
      { phrase: "au Jardin du Luxembourg", translation: "at/to Luxembourg Garden" },
      { phrase: "du Jardin du Luxembourg", translation: "from Luxembourg Garden" },
      { phrase: "Café de Flore", translation: "Café de Flore (famous Parisian café)" },
      { phrase: "Restaurant Le Procope", translation: "Restaurant Le Procope (oldest in Paris)" },
      { phrase: '"Amélie"', translation: '"Amélie" (famous French film)' },
      { phrase: "au Restaurant Le Procope", translation: "at Restaurant Le Procope" },
      { phrase: "Le Procope", translation: "Le Procope" },
      { phrase: "la Tour Eiffel", translation: "the Eiffel Tower" },
      { phrase: "Tour Eiffel", translation: "Eiffel Tower" },
      { phrase: "la Sorbonne", translation: "the Sorbonne" },
      { phrase: "La Sorbonne", translation: "the Sorbonne" },
      { phrase: "à la Sorbonne", translation: "at the Sorbonne" },
      { phrase: "Notre-Dame", translation: "Notre-Dame Cathedral" },
      { phrase: "Mont-Saint-Michel", translation: "Mont-Saint-Michel Abbey" },
      { phrase: "le Louvre", translation: "the Louvre Museum" },
      { phrase: "au Louvre", translation: "at the Louvre" },
      { phrase: "la Seine", translation: "the Seine River" },
      { phrase: "vers la Seine", translation: "towards the Seine" },
      { phrase: "Claude Monet", translation: "Claude Monet (Impressionist painter)" },
      { phrase: "Auguste Renoir", translation: "Auguste Renoir (Impressionist painter)" },
      { phrase: "Vincent van Gogh", translation: "Vincent van Gogh (Post-Impressionist painter)" },
      { phrase: "Moulin Rouge", translation: "Moulin Rouge (famous cabaret)" },
      { phrase: "Arc de Triomphe", translation: "Arc de Triomphe (triumphal arch)" },
      { phrase: "l'Arc de Triomphe", translation: "the Arc de Triomphe" },
      { phrase: "Champs-Élysées", translation: "Champs-Élysées (famous avenue)" },
      { phrase: "château de Versailles", translation: "Palace of Versailles" },
      { phrase: "mer Méditerranée", translation: "Mediterranean Sea" },
      { phrase: "coq au vin", translation: "Coq au Vin (classic French dish)" },
      { phrase: "bouillabaisse", translation: "bouillabaisse (Marseille fish stew)" },
      { phrase: "bouillabaisse de Marseille", translation: "bouillabaisse from Marseille" },
      { phrase: "soixante-huit millions", translation: "sixty-eight million" },
      { phrase: "Quelle surprise!", translation: "What a surprise!" },
      { phrase: "\"Quelle surprise!\"", translation: "\"What a surprise!\"" },

      // Unit 4 - Everyday nouns phrases
      { phrase: "tout le monde", translation: "everybody/everyone" },
      { phrase: "carte de crédit", translation: "credit card" },
      { phrase: "carte de credit", translation: "credit card" },
      { phrase: "ma carte de crédit", translation: "my credit card" },
      { phrase: "ma carte de credit", translation: "my credit card" },
      { phrase: "en espèces", translation: "in cash" },
      { phrase: "en especes", translation: "in cash" },
      { phrase: "une carafe d'eau", translation: "a carafe of water" },
      { phrase: "carafe d'eau", translation: "carafe of water" },
      { phrase: "l'addition", translation: "the bill" },
      { phrase: "le serveur", translation: "the waiter" },
      { phrase: "ce n'est pas un problème", translation: "that's not a problem" },
      { phrase: "ce n'est pas", translation: "it's not" },
      { phrase: "n'est pas", translation: "is not" },
      { phrase: "n'avais pas", translation: "didn't have" },
      { phrase: "n'ai pas", translation: "don't have" },
      { phrase: "n'a pas", translation: "doesn't have" },
      { phrase: "j'ai de l'argent", translation: "I have money" },
      { phrase: "de l'argent", translation: "money" },
      { phrase: "de l'eau", translation: "water" },
      { phrase: "du pain", translation: "bread" },
      { phrase: "pour la table", translation: "for the table" },
      { phrase: "pour le pain", translation: "for the bread" },
      { phrase: "pour toi", translation: "for you" },
      { phrase: "avec toi", translation: "with you" },
      { phrase: "avec moi", translation: "with me" },
      { phrase: "avec mes amis", translation: "with my friends" },
      { phrase: "avec eux", translation: "with them" },
      { phrase: "avec mon ami", translation: "with my friend" },
      { phrase: "je ne vois personne", translation: "I see nobody" },
      { phrase: "ne vois personne", translation: "see nobody" },
      { phrase: "autre chose", translation: "something else" },
      { phrase: "plus tard", translation: "later" },
      { phrase: "cet après-midi", translation: "this afternoon" },
      { phrase: "après-midi", translation: "afternoon" },
      { phrase: "le monde de la ville", translation: "the world of the city" },
      { phrase: "la grande place", translation: "the big square" },
      { phrase: "cette belle place", translation: "this beautiful square" },
      { phrase: "cette ville", translation: "this city" },
      { phrase: "de mauvais", translation: "bad" },

      // Negation phrases
      { phrase: "je ne peux pas payer", translation: "I can't pay" },
      { phrase: "ne peux pas payer", translation: "can't pay" },
      { phrase: "ne viens jamais", translation: "never comes" },
      { phrase: "ne vient jamais", translation: "never comes" },
      { phrase: "je ne vais jamais partir", translation: "I'll never leave" },
      { phrase: "ne vais jamais partir", translation: "never leave" },
      { phrase: "ne vais jamais", translation: "never go" },
      { phrase: "ne parle pas", translation: "doesn't speak" },
      { phrase: "ne parlons pas", translation: "don't speak" },
      { phrase: "ne peut pas", translation: "can't" },
      { phrase: "ne peux pas", translation: "can't" },
      { phrase: "ne veux pas", translation: "don't want" },
      { phrase: "le pain ne coûte rien", translation: "bread costs nothing" },
      { phrase: "ne coûte rien", translation: "costs nothing" },

      // Common verb phrases from Reading 4
      { phrase: "tu veux manger avec moi", translation: "do you want to eat with me" },
      { phrase: "tu veux manger", translation: "do you want to eat" },
      { phrase: "je veux manger", translation: "I want to eat" },
      { phrase: "qu'est-ce que vous voulez manger", translation: "what do you want to eat" },
      { phrase: "vous voulez manger", translation: "you want to eat" },
      { phrase: "je voudrais du pain et de l'eau", translation: "I would like bread and water" },
      { phrase: "je voudrais du pain", translation: "I would like bread" },
      { phrase: "je veux du pain aussi", translation: "I want bread too" },
      { phrase: "je veux du pain", translation: "I want bread" },
      { phrase: "c'est combien pour le pain", translation: "how much is the bread" },
      { phrase: "c'est combien pour", translation: "how much for" },
      { phrase: "vous devez manger autre chose", translation: "you must eat something else" },
      { phrase: "vous devez manger", translation: "you must eat" },
      { phrase: "je veux aussi voir", translation: "I also want to see" },
      { phrase: "tu vois la grande place", translation: "do you see the big square" },
      { phrase: "tu vois la", translation: "do you see the" },
      { phrase: "j'ai vu cette belle place", translation: "I saw this beautiful square" },
      { phrase: "j'ai vu", translation: "I saw" },
      { phrase: "je ne vais jamais partir de cette ville", translation: "I'll never leave this city" },
      { phrase: "partir de cette ville", translation: "leave this city" },
      { phrase: "tu aimes beaucoup cette ville", translation: "you really like this city" },
      { phrase: "tu aimes beaucoup", translation: "you really like" },
      { phrase: "la vie est très bonne ici", translation: "life is very good here" },
      { phrase: "la vie est", translation: "life is" },
      { phrase: "est très bonne", translation: "is very good" },
      { phrase: "tout le monde est gentil", translation: "everyone is kind" },
      { phrase: "je ne vois personne de mauvais", translation: "I don't see anyone bad" },
      { phrase: "où est la porte", translation: "where is the door" },
      { phrase: "je dois aller", translation: "I must go" },
      { phrase: "nous devons demander l'addition", translation: "we must ask for the bill" },
      { phrase: "demander l'addition", translation: "ask for the bill" },
      { phrase: "je dois faire mon travail", translation: "I must do my work" },
      { phrase: "faire mon travail", translation: "do my work" },
      { phrase: "vous payez comment", translation: "how are you paying" },
      { phrase: "je vais payer avec ma carte de crédit", translation: "I'm going to pay with my credit card" },
      { phrase: "je vais payer avec", translation: "I'm going to pay with" },
      { phrase: "je vais payer pour toi", translation: "I'm going to pay for you" },
      { phrase: "je vais payer", translation: "I'm going to pay" },
      { phrase: "demain je vais payer", translation: "tomorrow I'll pay" },
      { phrase: "tu es une bonne amie", translation: "you're a good friend" },
      { phrase: "je peux payer pour toi", translation: "I can pay for you" },
      { phrase: "je peux payer", translation: "I can pay" },
      { phrase: "payer avec ma carte de crédit", translation: "pay with my credit card" },
      { phrase: "payer avec ma", translation: "pay with my" },
      { phrase: "payer avec", translation: "pay with" },
      { phrase: "payer en espèces", translation: "pay in cash" },
      { phrase: "dans ma main", translation: "in my hand" },
      { phrase: "j'ai le temps", translation: "I have time" },
      { phrase: "le temps aujourd'hui", translation: "time today" },
      { phrase: "où est le restaurant", translation: "where is the restaurant" },
      { phrase: "je vois un bon restaurant", translation: "I see a good restaurant" },
      { phrase: "dans la rue", translation: "on the street" },
      { phrase: "nous devons aller là-bas", translation: "we must go there" },
      { phrase: "aller là-bas", translation: "go there" },
      { phrase: "tout le monde parle de ce restaurant", translation: "everyone talks about this restaurant" },
      { phrase: "parle de ce restaurant", translation: "talks about this restaurant" },
      { phrase: "une carafe d'eau pour la table", translation: "a carafe of water for the table" },
      { phrase: "je la vois", translation: "I see it (fem)" },
      { phrase: "tu aimes", translation: "you like" },
      { phrase: "c'est la vie", translation: "that's life" },
      { phrase: "à demain", translation: "see you tomorrow" },

      // Existing phrases
      { phrase: "nous devons", translation: "we must" },
      { phrase: "je dois", translation: "I must" },
      { phrase: "je voudrais", translation: "I would like" },
      { phrase: "tu veux", translation: "you want" },
      { phrase: "je veux", translation: "I want" },
      { phrase: "je vois", translation: "I see" },
      { phrase: "je le vois", translation: "I see him/it" },
      { phrase: "tu vois", translation: "you see" },
      { phrase: "je parle", translation: "I speak" },
      { phrase: "tu parles", translation: "you speak" },
      { phrase: "nous parlons", translation: "we speak" },
      { phrase: "je fais", translation: "I do/make" },
      { phrase: "tu fais", translation: "you do/make" },
      { phrase: "nous voyons", translation: "we see" },
      { phrase: "nous avons vu", translation: "we saw/have seen" },
      { phrase: "je suis", translation: "I am" },
      { phrase: "il est", translation: "he is" },
      { phrase: "nous allons", translation: "we go/are going" },
      { phrase: "je vais", translation: "I go/am going" },
      { phrase: "tu vas", translation: "you go/are going" },
      { phrase: "j'aime", translation: "I like/love" },
      { phrase: "j'aime", translation: "I like/love" },
      { phrase: "j'ai", translation: "I have" },
      { phrase: "j'ai", translation: "I have" },
      { phrase: "tu n'as pas", translation: "you don't have" },
      { phrase: "il a", translation: "he has" },
      { phrase: "il doit", translation: "he must" },
      { phrase: "c'est", translation: "it's" },
    ];

    while (remainingText.length > 0) {
      let matched = false;

      // Check for multi-word phrases
      for (const { phrase, translation } of multiWordPhrases) {
        if (remainingText.toLowerCase().startsWith(phrase.toLowerCase())) {
          const matchedText = remainingText.slice(0, phrase.length);
          const uniqueKey = `p${paragraphIndex}-c${charPosition}`;
          const wikiEntry = wikipediaEntries[matchedText] || wikipediaEntries[matchedText.toLowerCase()];

          elements.push(
            <span
              key={uniqueKey}
              ref={el => { if (el) wordRefs.current[uniqueKey] = el; }}
              className="interactive-word"
              onMouseEnter={() => setHoveredWord(uniqueKey)}
              onMouseLeave={() => setHoveredWord(null)}
              onClick={() => speak(getTTSText(matchedText), 'fr-FR')}
              style={{ cursor: 'pointer' }}
            >
              {matchedText}
              {hoveredWord === uniqueKey && wikiEntry && (
                <span
                  className="word-tooltip wiki-tooltip"
                  style={{
                    '--tooltip-shift': `${tooltipPosition.shift}px`,
                    '--arrow-shift': `${tooltipPosition.arrowShift}px`,
                    visibility: tooltipPosition.isVisible ? 'visible' : 'hidden'
                  }}
                >
                  <div className="wiki-content">
                    <img src={wikiEntry.image} alt={wikiEntry.name} className="wiki-image" />
                    <div className="wiki-text">
                      <strong>{wikiEntry.name}</strong>
                      <p>{wikiEntry.description}</p>
                      <a href={wikiEntry.url} target="_blank" rel="noopener noreferrer" className="wiki-link">
                        📖 Wikipedia
                      </a>
                    </div>
                  </div>
                </span>
              )}
              {hoveredWord === uniqueKey && !wikiEntry && (
                <span className="word-tooltip">{translation}</span>
              )}
            </span>
          );
          remainingText = remainingText.slice(phrase.length);
          charPosition += phrase.length;
          matched = true;
          break;
        }
      }

      if (matched) continue;

      // Check for single words (including accented characters)
      const wordMatch = remainingText.match(/^([a-zàâäæçéèêëïîôùûüœ']+)/i);
      if (wordMatch) {
        const word = wordMatch[1];
        const cleanWord = word.toLowerCase();
        const translation = wordTranslations[word] || wordTranslations[cleanWord];
        const uniqueKey = `p${paragraphIndex}-c${charPosition}`;

        if (translation) {
          const wikiEntry = wikipediaEntries[word] || wikipediaEntries[cleanWord];

          elements.push(
            <span
              key={uniqueKey}
              ref={el => { if (el) wordRefs.current[uniqueKey] = el; }}
              className="interactive-word"
              onMouseEnter={() => setHoveredWord(uniqueKey)}
              onMouseLeave={() => setHoveredWord(null)}
              onClick={() => speak(getTTSText(word), 'fr-FR')}
              style={{ cursor: 'pointer' }}
            >
              {word}
              {hoveredWord === uniqueKey && wikiEntry && (
                <span
                  className="word-tooltip wiki-tooltip"
                  style={{
                    '--tooltip-shift': `${tooltipPosition.shift}px`,
                    '--arrow-shift': `${tooltipPosition.arrowShift}px`,
                    visibility: tooltipPosition.isVisible ? 'visible' : 'hidden'
                  }}
                >
                  <div className="wiki-content">
                    <img src={wikiEntry.image} alt={wikiEntry.name} className="wiki-image" />
                    <div className="wiki-text">
                      <strong>{wikiEntry.name}</strong>
                      <p>{wikiEntry.description}</p>
                      <a href={wikiEntry.url} target="_blank" rel="noopener noreferrer" className="wiki-link">
                        📖 Wikipedia
                      </a>
                    </div>
                  </div>
                </span>
              )}
              {hoveredWord === uniqueKey && !wikiEntry && (
                <span className="word-tooltip">{translation}</span>
              )}
            </span>
          );
        } else {
          // Log missing words for debugging
          console.warn(`Missing translation for: "${word}"`);
          elements.push(<span key={uniqueKey} className="missing-translation" title={`Translation missing for: ${word}`}>{word}</span>);
        }

        remainingText = remainingText.slice(word.length);
        charPosition += word.length;
        continue;
      }

      // Match spaces and punctuation
      const otherMatch = remainingText.match(/^(\s+|[.!?,;:])/);
      if (otherMatch) {
        elements.push(<span key={`p${paragraphIndex}-c${charPosition}`}>{otherMatch[1]}</span>);
        remainingText = remainingText.slice(otherMatch[1].length);
        charPosition += otherMatch[1].length;
        continue;
      }

      // Fallback
      const char = remainingText[0];
      elements.push(<span key={`p${paragraphIndex}-c${charPosition}`}>{char}</span>);
      remainingText = remainingText.slice(1);
      charPosition++;
    }

    return elements;
  };

  const frenchParagraphs = passage.text.split('\n\n');
  const englishParagraphs = passage.translation.split('\n\n');

  // Helper to check if a paragraph is an image marker
  const isImageMarker = (text) => {
    return /^!\[(.+?)\]$/.test(text.trim());
  };

  // Helper to extract image path and optional size from marker
  // Syntax: ![path] or ![path|maxWidth:400px] or ![path|400px]
  const extractImageInfo = (text) => {
    const match = text.trim().match(/^!\[(.+?)\]$/);
    if (!match) return null;

    const content = match[1];
    const parts = content.split('|');
    const path = parts[0].trim();

    let style = {};
    if (parts[1]) {
      const size = parts[1].trim();
      // If it's just a number with px/%, treat it as maxWidth
      if (/^\d+(%|px)$/.test(size)) {
        style.maxWidth = size;
      } else if (size.includes(':')) {
        // Parse CSS-like syntax: maxWidth:400px
        const [prop, value] = size.split(':');
        style[prop.trim()] = value.trim();
      }
    }

    return { path, style };
  };

  return (
    <div className="reading-passage">
      <div className="passage-header">
        <div className="passage-meta">Reading Comprehension</div>
        <h1>{passage.title}</h1>
        <div className="passage-controls">
          <button
            className="btn-translation"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            {showTranslation ? 'Hide' : 'Show'} English Translation
          </button>
        </div>
      </div>

      <div className="passage-content">
        {/* Read entire passage button - above first paragraph */}
        <div className="passage-audio-header">
          <SpeakButton
            text={stripMarkdown(passage.text)}
            language="fr-FR"
            size="medium"
            ariaLabel="Read entire passage aloud"
          />
          <span className="audio-label">Listen to entire passage</span>
        </div>

        <div className="passage-french">
          {frenchParagraphs.map((paragraph, pIdx) => {
            // Check if this paragraph is an image marker
            if (isImageMarker(paragraph)) {
              const imageInfo = extractImageInfo(paragraph);
              if (!imageInfo) return null;

              return (
                <div key={pIdx} className="paragraph-block paragraph-image">
                  <img
                    src={`/${imageInfo.path}`}
                    alt={`Reading illustration ${pIdx + 1}`}
                    className="reading-image"
                    style={imageInfo.style}
                  />
                </div>
              );
            }

            // Regular paragraph
            return (
              <div key={pIdx} className="paragraph-block paragraph-with-audio">
                <p className="french-text">
                  {renderInteractiveText(paragraph, pIdx)}
                </p>
                {/* Per-paragraph speaker button - appears on hover */}
                <div className="paragraph-audio-btn">
                  <SpeakButton
                    text={stripMarkdown(paragraph)}
                    language="fr-FR"
                    size="small"
                    ariaLabel={`Read paragraph ${pIdx + 1}`}
                  />
                </div>
                {showTranslation && (
                  <p className="english-translation">{englishParagraphs[pIdx]}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="passage-instructions">
        <strong>💡 Tip:</strong> Hover over any French word to see its English translation! Click on any word to hear it spoken.
        Hover over paragraphs to read them individually.
      </div>
    </div>
  );
}

export default ReadingPassage;

