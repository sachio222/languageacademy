import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Module email metadata - extracted from all module files
// This data drives the reengagement email system
const MODULE_EMAIL_DATA: Record<number, {
  title: string;
  capabilities: string[];
  realWorldUse: string;
  milestone?: string;
  utilityScore?: number;
  isUnitCompletion?: boolean;
  nextModuleTeaser?: string;
}> = {
  // Unit 1: Essential Grammar
  1: {
    title: "Famous Words & Greetings",
    capabilities: [
      "Greet someone in French (bonjour, bonsoir)",
      "Say thank you, please, excuse me",
      "Recognize internationally known French words"
    ],
    realWorldUse: "greet people and be polite",
    nextModuleTeaser: "Build your first sentences with pronouns"
  },
  2: {
    title: "Core Pronouns - The Building Blocks",
    capabilities: [
      "Use all 9 essential French pronouns (I, you, he, she, we, they)",
      "Distinguish between formal and informal 'you'",
      "Understand the foundation for all French sentences"
    ],
    realWorldUse: "build every sentence you'll ever speak",
    nextModuleTeaser: "Combine these with être to make your first real sentences"
  },
  3: {
    title: "Essential Verb - être (to be)",
    capabilities: [
      "Say 'I am', 'you are', 'he/she is' in French",
      "Introduce yourself and describe others",
      "Form your first complete French sentences"
    ],
    realWorldUse: "introduce yourself and describe people",
    milestone: "First real sentences",
    utilityScore: 4,
    nextModuleTeaser: "Add avoir (to have) to express possession"
  },
  4: {
    title: "Essential Verb - avoir (to have)",
    capabilities: [
      "Express possession (I have, you have, they have)",
      "Talk about age and physical states in French",
      "Use both être and avoir to form different sentences"
    ],
    realWorldUse: "express what you have and what you need",
    nextModuleTeaser: "Combine with ça to have real conversations"
  },
  5: {
    title: "Articles - The, A, An",
    capabilities: [
      "Use 'the' (le, la, les) with masculine, feminine, and plural nouns",
      "Use 'a/an' (un, une) correctly based on gender",
      "Understand why French requires articles with every noun"
    ],
    realWorldUse: "prepare to talk about real things",
    nextModuleTeaser: "Add nouns to talk about real objects"
  },
  6: {
    title: "Cognates - French and English Share Many Words",
    capabilities: [
      "Recognize French words that look like English",
      "Understand why French isn't as hard as you thought",
      "Build confidence with familiar word patterns"
    ],
    realWorldUse: "quickly expand your vocabulary using cognates",
    nextModuleTeaser: "Continue building your noun vocabulary"
  },
  7: {
    title: "Basic Nouns - People & Things",
    capabilities: [
      "Talk about real things (books, cats, cars, houses)",
      "Say 'I have a cat' or 'It's a book' in French",
      "Combine articles + nouns with être and avoir"
    ],
    realWorldUse: "name and talk about concrete objects",
    milestone: "Talk about real things",
    nextModuleTeaser: "Learn plurals to talk about multiple things"
  },
  8: {
    title: "Plurals - More Than One",
    capabilities: [
      "Talk about multiple things (cats, books, friends)",
      "Transform singular nouns to plural forms",
      "Say 'I have cats' or 'We have books' in French"
    ],
    realWorldUse: "talk about multiple objects and groups",
    nextModuleTeaser: "Learn demonstratives to point to specific things"
  },
  9: {
    title: "French Flow - Liaison Help",
    capabilities: [
      "Understand how French words flow together",
      "Recognize when sounds connect between words",
      "Sound more natural when speaking French"
    ],
    realWorldUse: "speak with natural French rhythm and flow",
    nextModuleTeaser: "Use connectors to link your ideas"
  },
  10: {
    title: "Basic Connectors - et, mais, ou, aussi, très",
    capabilities: [
      "Connect ideas with 'and', 'but', 'or' in French",
      "Add emphasis with 'very' and 'also/too'",
      "Form more natural, flowing sentences"
    ],
    realWorldUse: "make your French sound natural and connected",
    nextModuleTeaser: "Practice everything you've learned with reading comprehension"
  },
  11: {
    title: "Reading Comprehension - First Paragraph!",
    capabilities: [
      "Read and understand a complete French paragraph",
      "Recognize sentence patterns using all your vocabulary",
      "Comprehend French stories and basic conversations"
    ],
    realWorldUse: "read simple French texts and understand them",
    milestone: "First reading comprehension",
    nextModuleTeaser: "Practice combining everything you've learned"
  },
  12: {
    title: "Unit 1 Practice - Fill in the Blanks",
    capabilities: [
      "Compose complete French sentences from scratch",
      "Combine pronouns, verbs, articles, and nouns naturally",
      "Apply everything from Unit 1 in context"
    ],
    realWorldUse: "form your own original French sentences",
    nextModuleTeaser: "Take the Unit 1 exam to prove your mastery"
  },
  13: {
    title: "Unit 1 Final Exam - Foundation",
    capabilities: [
      "Have basic conversations with French speakers",
      "Introduce yourself and talk about what you have",
      "Understand ~35% of everyday French conversations"
    ],
    realWorldUse: "communicate basic needs and introductions",
    milestone: "Conversational basics achieved",
    isUnitCompletion: true,
    nextModuleTeaser: "Start Unit 2 to ask questions and describe things"
  },

  // Unit 2: Asking & Describing
  14: {
    title: "Demonstratives - It, That, This",
    capabilities: [
      "Point to specific things (this, that, these, those)",
      "Use ça (that/it) in everyday conversation",
      "Prepare to specify exactly which object you mean"
    ],
    realWorldUse: "point to and identify specific objects",
    nextModuleTeaser: "Combine demonstratives with nouns to say 'this book', 'that cat'"
  },
  15: {
    title: "ça - Survival Phrases",
    capabilities: [
      "Greet someone and ask how they're doing (ça va?)",
      "Agree with people (c'est ça - that's right)",
      "Use ça in conversation (I have that, it's that)"
    ],
    realWorldUse: "greet someone and ask how they're doing",
    milestone: "First real conversations",
    utilityScore: 8,
    nextModuleTeaser: "Add more verbs to express wants and abilities"
  },
  16: {
    title: "Determiners + Nouns - Building Phrases",
    capabilities: [
      "Say 'this book', 'that house', 'these cats' in French",
      "Combine demonstratives with nouns like functions",
      "Form 3-4 word phrases with specific objects"
    ],
    realWorldUse: "specify exactly which object you're talking about",
    milestone: "Functional composition mastered",
    nextModuleTeaser: "Add vouloir to express what you want"
  },
  17: {
    title: "Essential Verb - vouloir (to want)",
    capabilities: [
      "Express what you want (I want, you want, they want)",
      "Make polite requests and express desires",
      "Say 'I want this book' or 'Do you want that?' in French"
    ],
    realWorldUse: "express your wants and make polite requests",
    milestone: "Express desires and wants",
    utilityScore: 9,
    nextModuleTeaser: "Add pouvoir to express what you can do"
  },
  18: {
    title: "Essential Verb - pouvoir (can)",
    capabilities: [
      "Express ability and possibility (I can, you can, they can)",
      "Ask for permission politely in French",
      "Combine with vouloir to say 'I can want' or 'Can you have?'"
    ],
    realWorldUse: "express what you can do and ask permission",
    nextModuleTeaser: "Add voir to talk about what you see"
  },
  19: {
    title: "Essential Verb - voir (to see)",
    capabilities: [
      "Talk about what you see (I see, you see, they see)",
      "Express perception and observation in French",
      "Prepare for object pronouns (I see him/her/it)"
    ],
    realWorldUse: "describe what you see and perceive",
    nextModuleTeaser: "Master question words to ask anything"
  },
  20: {
    title: "Question Words - Ask Anything!",
    capabilities: [
      "Ask questions with where, what, when, who, how, why",
      "Say 'Where is the book?' or 'What do you want?'",
      "Have actual two-way conversations in French"
    ],
    realWorldUse: "ask questions and have real conversations",
    milestone: "Can ask questions",
    utilityScore: 10,
    nextModuleTeaser: "Learn stressed pronouns for emphasis"
  },
  21: {
    title: "The Power to Ask Anything",
    capabilities: [
      "Understand the three ways to ask questions in French",
      "Choose the right question method for each situation",
      "Build confidence in asking questions naturally"
    ],
    realWorldUse: "master French question formation",
    nextModuleTeaser: "Use stressed pronouns for emphasis"
  },
  22: {
    title: "Stressed Pronouns - moi, toi, lui...",
    capabilities: [
      "Use special pronouns after 'with', 'for', 'without' (avec moi, pour toi)",
      "Emphasize who you're talking about (c'est moi - it's me)",
      "Give short emphatic answers (Moi? - Me?)"
    ],
    realWorldUse: "emphasize and specify people in conversation",
    nextModuleTeaser: "Add prepositions to describe locations and relationships"
  },
  23: {
    title: "Prepositions - Spatial & Relational Words",
    capabilities: [
      "Describe locations (in the house, on the table, under the book)",
      "Express relationships (with me, for you, to Paris)",
      "Use stressed pronouns with prepositions naturally"
    ],
    realWorldUse: "describe where things are and relationships between people",
    nextModuleTeaser: "Add adjectives to describe qualities"
  },
  24: {
    title: "Common Adjectives - Describing Things",
    capabilities: [
      "Describe things as big, small, good, bad, new, old",
      "Use adjectives with correct gender agreement",
      "Say 'a good book' or 'a big house' in French"
    ],
    realWorldUse: "describe qualities and characteristics of things",
    nextModuleTeaser: "Practice reading comprehension with everything you've learned"
  },
  25: {
    title: "Reading Comprehension 2 - Rendez-vous en Normandie",
    capabilities: [
      "Read engaging French stories with cultural context",
      "Understand dialogue and descriptive passages",
      "Comprehend French at a conversational level"
    ],
    realWorldUse: "read French stories and understand cultural content",
    milestone: "Cultural reading comprehension",
    nextModuleTeaser: "Practice everything with interactive exercises"
  },
  26: {
    title: "Unit 2 Practice - Fill in the Blanks",
    capabilities: [
      "Compose complex sentences with wants, abilities, and questions",
      "Combine demonstratives, verbs, and adjectives naturally",
      "Apply Unit 2 vocabulary in realistic contexts"
    ],
    realWorldUse: "form complex original French sentences",
    nextModuleTeaser: "Take the Unit 2 exam to prove your compositional skills"
  },
  27: {
    title: "Unit 2 Final Exam - Composition",
    capabilities: [
      "Ask and answer questions in French conversations",
      "Express wants, abilities, and observations",
      "Understand ~50% of everyday French conversations"
    ],
    realWorldUse: "have real two-way conversations",
    milestone: "Conversational fluency achieved",
    isUnitCompletion: true,
    nextModuleTeaser: "Start Unit 3 to master movement and possession"
  },

  // Unit 3: Movement & Possession
  28: {
    title: "Contractions - du, au, de la, à la",
    capabilities: [
      "Use contractions naturally (du, au, de la, à la)",
      "Say 'some bread', 'at the café', 'of the book' in French",
      "Make your French flow smoothly with proper contractions"
    ],
    realWorldUse: "speak French that sounds natural and fluid",
    nextModuleTeaser: "Master movement verbs like venir and aller"
  },
  29: {
    title: "Essential Verb - venir (to come)",
    capabilities: [
      "Express coming and arriving (I come, you come, they come)",
      "Say 'I come from Paris' or 'Who is coming?'",
      "Use venir with vouloir and pouvoir"
    ],
    realWorldUse: "talk about arrival and origin",
    nextModuleTeaser: "Add aller to express where you're going"
  },
  30: {
    title: "Essential Verb - aller (to go)",
    capabilities: [
      "Express movement and going places (I go, you go, they go)",
      "Talk about future plans (I'm going to...)",
      "Say 'Where are you going?' or 'I'm going to Paris'"
    ],
    realWorldUse: "talk about movement and future plans",
    nextModuleTeaser: "Learn verb patterns to master conjugation"
  },
  31: {
    title: "Understanding Verb Patterns",
    capabilities: [
      "Recognize patterns across French verb conjugations",
      "Predict how new verbs will conjugate",
      "Understand why verbs change the way they do"
    ],
    realWorldUse: "learn new verbs faster using patterns",
    nextModuleTeaser: "Apply patterns to partir (to leave)"
  },
  32: {
    title: "Essential Verb - partir (to leave)",
    capabilities: [
      "Express leaving and departing (I leave, you leave, they leave)",
      "Talk about departures and travel",
      "Combine with venir and aller for complete movement vocabulary"
    ],
    realWorldUse: "talk about leaving places and travel",
    nextModuleTeaser: "Learn object pronouns to say 'I see him/her/it'"
  },
  33: {
    title: "Object Pronouns - Him, Her, It, Them",
    capabilities: [
      "Say 'I see him/her/it/them' with object pronouns",
      "Form more concise sentences (I want it vs. I want the book)",
      "Understand French word order with object pronouns"
    ],
    realWorldUse: "speak more concisely and naturally",
    milestone: "Concise sentence formation",
    nextModuleTeaser: "Add possessive adjectives to show ownership"
  },
  34: {
    title: "Possessive Adjectives - My, Your, His, Her",
    capabilities: [
      "Show ownership (my cat, your house, his book, their car)",
      "Use possessive adjectives with correct gender agreement",
      "Say 'Where is my book?' or 'I want your car' in French"
    ],
    realWorldUse: "talk about who owns what",
    milestone: "Express ownership and possession",
    nextModuleTeaser: "Learn possessive pronouns to say 'it's mine'"
  },
  35: {
    title: "Possessive Pronouns - Mine, Yours, Theirs",
    capabilities: [
      "Say 'It's mine', 'It's yours', 'It's his/hers' in French",
      "Express ownership without repeating the noun",
      "Ask 'Is that yours?' or answer 'No, it's theirs'"
    ],
    realWorldUse: "claim ownership and clarify who things belong to",
    nextModuleTeaser: "Combine everything you've learned"
  },
  36: {
    title: "Putting It Together - Who Has What?",
    capabilities: [
      "Combine object pronouns and possessives in sentences",
      "Say 'He has it', 'I want it', 'It's mine' naturally",
      "Form complex sentences with movement, possession, and objects"
    ],
    realWorldUse: "have sophisticated conversations about ownership",
    milestone: "Complex sentence mastery",
    nextModuleTeaser: "Test your comprehension with cultural reading"
  },
  37: {
    title: "Reading Comprehension 3 - La Première Page",
    capabilities: [
      "Read complex French stories with advanced grammar",
      "Understand movement, possession, and object pronouns in context",
      "Comprehend authentic French narrative flow"
    ],
    realWorldUse: "read French literature and authentic content",
    milestone: "Advanced reading comprehension",
    nextModuleTeaser: "Practice advanced structures with interactive exercises"
  },
  38: {
    title: "Unit 3 Practice - Fill in the Blanks",
    capabilities: [
      "Compose sentences with motion verbs and object pronouns",
      "Use possessives and contractions naturally",
      "Apply Unit 3 advanced structures in context"
    ],
    realWorldUse: "form sophisticated French sentences",
    nextModuleTeaser: "Take the Unit 3 exam to prove your mastery"
  },
  39: {
    title: "Unit 3 Final Exam - Movement & Possession",
    capabilities: [
      "Express movement and travel naturally in French",
      "Use object pronouns and possessives fluently",
      "Understand ~60% of everyday French conversations"
    ],
    realWorldUse: "have sophisticated conversations about movement and ownership",
    milestone: "Advanced conversational French",
    isUnitCompletion: true,
    nextModuleTeaser: "Start Unit 4 for everyday communication"
  },

  // Unit 4: Everyday Words
  40: {
    title: "Survival Phrases - Real-World Essentials",
    capabilities: [
      "Order food and drinks politely (Je voudrais...)",
      "Ask essential questions (How much? Where is...?)",
      "Navigate shops, cafés, and France successfully"
    ],
    realWorldUse: "survive and thrive in France",
    milestone: "Real-world travel ready",
    nextModuleTeaser: "Master faire (to do/make) for daily activities"
  },
  41: {
    title: "Essential Verb - faire (to do/make)",
    capabilities: [
      "Express doing and making (I do, you make, they do)",
      "Talk about activities and tasks in French",
      "Use faire in common expressions and daily activities"
    ],
    realWorldUse: "talk about what you do and make",
    nextModuleTeaser: "Add devoir to express obligations"
  },
  42: {
    title: "Essential Verb - devoir (must)",
    capabilities: [
      "Express obligation and necessity (I must, you have to)",
      "Talk about responsibilities and duties",
      "Say 'I must go' or 'You have to see this' in French"
    ],
    realWorldUse: "express obligations and what you must do",
    nextModuleTeaser: "Learn parler to talk about speaking and communication"
  },
  43: {
    title: "Essential Verb - parler (to speak)",
    capabilities: [
      "Talk about languages you speak (I speak French)",
      "Discuss communication and conversation",
      "Master the regular -ER verb pattern used by most verbs"
    ],
    realWorldUse: "talk about communication and languages",
    nextModuleTeaser: "Learn chercher and trouver to search and find things"
  },
  44: {
    title: "Essential Verbs - chercher & trouver",
    capabilities: [
      "Express searching and finding (I'm looking for, I found)",
      "Talk about looking for lost items or locations",
      "Say 'I'm looking for my keys' or 'I found it!' in French"
    ],
    realWorldUse: "search for and find things in daily life",
    nextModuleTeaser: "Learn negation to say what you don't do"
  },
  45: {
    title: "Negation - ne...pas (not)",
    capabilities: [
      "Say what you don't do, don't have, or don't want",
      "Negate any French sentence with ne...pas",
      "Express disagreement and refusal politely"
    ],
    realWorldUse: "express what you don't do or want",
    milestone: "Negative expressions mastered",
    nextModuleTeaser: "Add time words to say when things happen"
  },
  46: {
    title: "Time & Frequency - now, always, never, today",
    capabilities: [
      "Add time context to sentences (now, today, tomorrow, yesterday)",
      "Express frequency (always, never, sometimes, often)",
      "Say 'I always go' or 'I never want that' in French"
    ],
    realWorldUse: "express when and how often things happen",
    nextModuleTeaser: "Master more negation with modal verbs"
  },
  47: {
    title: "Negation Part 2 - I can't, I won't, I never",
    capabilities: [
      "Say 'I can't', 'I won't', 'I never do' in French",
      "Negate modal verbs (vouloir, pouvoir, devoir)",
      "Use ne...jamais to express never"
    ],
    realWorldUse: "express refusal and things you never do",
    nextModuleTeaser: "Add location words to describe where"
  },
  48: {
    title: "Location Adverbs - here, there, everywhere",
    capabilities: [
      "Point to locations (here, there, over there, everywhere)",
      "Express presence across different places",
      "Say 'I'm here' or 'It's over there' in French"
    ],
    realWorldUse: "indicate locations and direct people",
    nextModuleTeaser: "Add everyday nouns for daily life"
  },
  49: {
    title: "Everyday Nouns - Life & World",
    capabilities: [
      "Talk about everyday things (world, life, water, bread, time)",
      "Use high-frequency nouns in conversation",
      "Express abstract and concrete concepts naturally"
    ],
    realWorldUse: "discuss daily life and the world around you",
    nextModuleTeaser: "Test comprehension with cultural reading"
  },
  50: {
    title: "Reading Comprehension 4 - La nouvelle époque de Marie",
    capabilities: [
      "Follow authentic French café conversations",
      "Understand survival phrases in context",
      "Comprehend French with negation and time expressions"
    ],
    realWorldUse: "understand real French conversations",
    milestone: "Authentic conversation comprehension",
    nextModuleTeaser: "Practice with interactive exercises"
  },
  51: {
    title: "Unit 4 Practice - Fill in the Blanks",
    capabilities: [
      "Use survival phrases and negation naturally",
      "Combine action verbs with time and location context",
      "Apply everyday vocabulary in realistic scenarios"
    ],
    realWorldUse: "navigate daily French situations",
    nextModuleTeaser: "Take the Unit 4 exam to prove your practical French"
  },
  52: {
    title: "Unit 4 Final Exam - Expression",
    capabilities: [
      "Navigate daily French situations with confidence",
      "Express negation, time, and location naturally",
      "Use survival phrases for real-world France"
    ],
    realWorldUse: "handle everyday situations in France",
    milestone: "Practical French mastery",
    isUnitCompletion: true,
    nextModuleTeaser: "Start Unit 5 for past tense and nuance"
  },

  // Unit 5: Time & Taste
  53: {
    title: "Comparisons & Intensity",
    capabilities: [
      "Compare things (better, worse, more, less)",
      "Express intensity and quantity (too much, very, all)",
      "Say 'This is better than that' or 'It's the best' in French"
    ],
    realWorldUse: "compare and evaluate things",
    nextModuleTeaser: "Add slang comparisons for natural speech"
  },
  54: {
    title: "Slang - Comparisons & Intensity",
    capabilities: [
      "Understand real French slang (c'est ouf, c'est génial)",
      "Sound natural with Quebec and African French expressions",
      "Connect with native speakers using authentic language"
    ],
    realWorldUse: "speak like a native with authentic slang",
    nextModuleTeaser: "Add conditional forms for polite requests"
  },
  55: {
    title: "Should & Could - Advice and Possibility",
    capabilities: [
      "Give advice with 'should' (tu devrais partir)",
      "Express possibility with 'could' (je pourrais venir)",
      "Make suggestions and polite requests"
    ],
    realWorldUse: "give advice and express possibilities",
    nextModuleTeaser: "Add 'would' for even more polite requests"
  },
  56: {
    title: "Would Forms - Hypotheticals and Desires",
    capabilities: [
      "Make very polite requests (I would like...)",
      "Express hypothetical actions (I would go, I would do)",
      "Sound more sophisticated and polite in French"
    ],
    realWorldUse: "make polite requests and express hypotheticals",
    nextModuleTeaser: "Practice all Unit 5 skills with interactive exercises"
  },
  57: {
    title: "aimer - To Like / To Love",
    capabilities: [
      "Express what you like and love (I like coffee, I love you)",
      "Distinguish between liking and loving in French",
      "Use aimer with object pronouns (I love him/her)"
    ],
    realWorldUse: "express preferences and affection",
    nextModuleTeaser: "Learn past tense with être to say 'I was'"
  },
  58: {
    title: "être - Past Tense (was / were)",
    capabilities: [
      "Talk about the past (I was, you were, they were)",
      "Describe past states and conditions",
      "Say 'I was happy' or 'We were in Paris' in French"
    ],
    realWorldUse: "describe past situations and states",
    milestone: "Past tense foundation",
    nextModuleTeaser: "Add avoir in past tense to say 'I had'"
  },
  59: {
    title: "avoir - Past Tense (had)",
    capabilities: [
      "Express past possession (I had, you had, they had)",
      "Describe what you possessed in the past",
      "Combine with être past to tell complete stories"
    ],
    realWorldUse: "talk about past possessions and experiences",
    nextModuleTeaser: "Add food vocabulary for restaurant conversations"
  },
  60: {
    title: "Everyday Food Nouns",
    capabilities: [
      "Order specific foods at French establishments",
      "Talk about bread, coffee, pastries, and meals",
      "Navigate French bakeries and cafés confidently"
    ],
    realWorldUse: "order food in France",
    nextModuleTeaser: "Use manger and boire with food vocabulary"
  },
  61: {
    title: "manger - To Eat (Present & Past)",
    capabilities: [
      "Talk about eating and meals (I eat, I ate, I've eaten)",
      "Order food and discuss dietary preferences",
      "Use past tense to describe what you ate"
    ],
    realWorldUse: "talk about food and eating",
    nextModuleTeaser: "Add boire to talk about drinks"
  },
  62: {
    title: "boire - To Drink (Present & Past)",
    capabilities: [
      "Talk about drinking and beverages (I drink, I drank)",
      "Order drinks at cafés and restaurants",
      "Describe what you drank using past tense"
    ],
    realWorldUse: "order drinks and discuss beverages",
    nextModuleTeaser: "Practice reading comprehension with food context"
  },
  63: {
    title: "Reading Comprehension 5 - La fée verte (The Green Fairy)",
    capabilities: [
      "Read French art history stories",
      "Understand cultural content with past tense",
      "Comprehend sophisticated narratives about famous artists"
    ],
    realWorldUse: "enjoy French cultural and historical content",
    milestone: "Cultural literacy achieved",
    nextModuleTeaser: "Practice all your skills with interactive exercises"
  },
  64: {
    title: "Unit 5 Practice - Fill in the Blanks",
    capabilities: [
      "Compose sentences with past tense and comparisons",
      "Use conditional forms and food vocabulary naturally",
      "Apply Unit 5 sophistication in context"
    ],
    realWorldUse: "form nuanced French sentences",
    nextModuleTeaser: "Take the Unit 5 exam to prove your mastery"
  },
  65: {
    title: "Unit 5 Final Exam - Sophistication",
    capabilities: [
      "Talk about the past (I was, I had, I went)",
      "Express preferences and make comparisons",
      "Order food and navigate French restaurants confidently"
    ],
    realWorldUse: "discuss past experiences and express preferences",
    milestone: "Past tense and nuanced expression achieved",
    isUnitCompletion: true,
    nextModuleTeaser: "Start Unit 6 for advanced communication verbs"
  },

  // Unit 6: Basic Fluency
  66: {
    title: "Progressive & Future - Expressing Time",
    capabilities: [
      "Express ongoing actions (I'm eating, you're speaking)",
      "Talk about future plans (I'm going to go, we're going to eat)",
      "Use future tense for definite future actions"
    ],
    realWorldUse: "describe what's happening now and what will happen",
    nextModuleTeaser: "Master dire to express what you say"
  },
  67: {
    title: "dire - To Say / To Tell",
    capabilities: [
      "Express what you say and tell (I say, you tell, they say)",
      "Report speech and convey information",
      "Use dire with que to quote what people say"
    ],
    realWorldUse: "communicate what you and others say",
    nextModuleTeaser: "Add prendre for taking things and transportation"
  },
  68: {
    title: "prendre - To Take",
    capabilities: [
      "Express taking things and transportation (I take the bus)",
      "Use apprendre to talk about learning",
      "Use comprendre to express understanding"
    ],
    realWorldUse: "talk about taking things and learning",
    nextModuleTeaser: "Add donner to express giving"
  },
  69: {
    title: "donner - To Give",
    capabilities: [
      "Express giving and offering (I give, you give, they give)",
      "Talk about providing information and help",
      "Use donner with object pronouns (I give it to him)"
    ],
    realWorldUse: "express giving and offering",
    nextModuleTeaser: "Add mettre to talk about putting and placing"
  },
  70: {
    title: "mettre - To Put / To Set",
    capabilities: [
      "Express putting and placing things (I put, you set)",
      "Talk about setting the table and putting on clothes",
      "Use mettre in common daily expressions"
    ],
    realWorldUse: "talk about placing things and getting dressed",
    nextModuleTeaser: "Add demander to ask for things"
  },
  71: {
    title: "demander - To Ask",
    capabilities: [
      "Ask for things and help (I ask, you ask, they ask)",
      "Request information and assistance",
      "Use demander with à and de correctly"
    ],
    realWorldUse: "ask for help and information",
    nextModuleTeaser: "Add commander to order food and products"
  },
  72: {
    title: "commander - To Order",
    capabilities: [
      "Order food and drinks at restaurants",
      "Order products online or in shops",
      "Navigate French dining and shopping confidently"
    ],
    realWorldUse: "order food, drinks, and products",
    nextModuleTeaser: "Express needs with avoir besoin de"
  },
  73: {
    title: "avoir besoin de - To Need",
    capabilities: [
      "Express what you need (I need coffee, you need help)",
      "Talk about needs and necessities in French",
      "Use avoir besoin de with nouns and verbs"
    ],
    realWorldUse: "express needs and necessities",
    nextModuleTeaser: "Expand vocabulary with top 200 words"
  },
  74: {
    title: "Essential Vocabulary - Time, People & Ideas",
    capabilities: [
      "Talk about time periods (year, moment, hour)",
      "Discuss people and relationships (family, person)",
      "Express abstract concepts (heart, story, history)"
    ],
    realWorldUse: "discuss time, people, and abstract ideas",
    milestone: "Expanded vocabulary mastery",
    nextModuleTeaser: "Test comprehension with cultural reading"
  },
  75: {
    title: "Reading Comprehension 6 - Un Voyage en Famille",
    capabilities: [
      "Read complex stories with advanced communication verbs",
      "Understand French family conversations and planning",
      "Comprehend progressive tenses and future forms in context"
    ],
    realWorldUse: "understand French conversations about planning and communication",
    milestone: "Advanced communication comprehension",
    nextModuleTeaser: "Practice all Unit 6 skills"
  },
  76: {
    title: "Unit 6 Practice - Fill in the Blanks",
    capabilities: [
      "Use progressive and future tenses naturally",
      "Combine communication verbs in complex sentences",
      "Apply advanced Unit 6 structures in context"
    ],
    realWorldUse: "form sophisticated communication",
    nextModuleTeaser: "Take the Unit 6 exam to prove your fluency"
  },
  77: {
    title: "Unit 6 Final Exam - Communication",
    capabilities: [
      "Express ongoing actions (I'm eating, you're speaking)",
      "Use advanced communication verbs (say, take, give, put, ask)",
      "Understand ~70% of everyday French conversations"
    ],
    realWorldUse: "communicate with advanced nuance and precision",
    milestone: "Advanced communication fluency",
    isUnitCompletion: true,
    nextModuleTeaser: "Start Unit 7 for cognitive verbs"
  },

  // Unit 7: Knowledge & Learning
  78: {
    title: "Talking About People in General",
    capabilities: [
      "Use 'on' like a native speaker (we/people/one)",
      "Talk about people in general (people say, everyone knows)",
      "Sound more natural with on instead of nous"
    ],
    realWorldUse: "speak naturally about people in general",
    milestone: "Natural French pronoun usage",
    nextModuleTeaser: "Add discourse markers for conversational flow"
  },
  79: {
    title: "Studying & Reviewing - étudier & réviser",
    capabilities: [
      "Talk about studying and reviewing (I study, I review)",
      "Discuss academic work and preparation",
      "Say 'I'm studying French' or 'I'm reviewing for the exam'"
    ],
    realWorldUse: "talk about studying and academic work",
    nextModuleTeaser: "Master the most important pronoun: on (we/people)"
  },
  80: {
    title: "Learning & Teaching - apprendre & enseigner",
    capabilities: [
      "Talk about learning and teaching (I learn, you teach)",
      "Say 'I'm learning French' or 'Who teaches you?'",
      "Use apprendre (prendre pattern) and enseigner naturally"
    ],
    realWorldUse: "discuss learning and education",
    nextModuleTeaser: "Add studying verbs to complete your learning vocabulary"
  },
  81: {
    title: "comprendre - To Understand",
    capabilities: [
      "Express understanding (I understand, do you understand?)",
      "Say 'I don't understand' when confused",
      "Use comprendre with que to show comprehension of ideas"
    ],
    realWorldUse: "communicate understanding and confusion",
    nextModuleTeaser: "Add penser to express your thoughts"
  },
  82: {
    title: "savoir - To Know (Facts/Skills)",
    capabilities: [
      "Express knowledge of facts (I know, I don't know)",
      "Say what skills you have (I know how to speak French)",
      "Use the most common phrase in French (je ne sais pas)"
    ],
    realWorldUse: "express what you know and don't know",
    milestone: "Knowledge expression mastery",
    nextModuleTeaser: "Add connaître to talk about people and places you know"
  },
  83: {
    title: "connaître - To Know (People/Places)",
    capabilities: [
      "Talk about people you know (I know Marie)",
      "Discuss places you're familiar with (Do you know Paris?)",
      "Distinguish between savoir (facts) and connaître (people/places)"
    ],
    realWorldUse: "talk about people and places you know",
    nextModuleTeaser: "Add learning and studying verbs"
  },
  84: {
    title: "penser - To Think",
    capabilities: [
      "Express your thoughts and opinions (I think that...)",
      "Ask what others think (What do you think?)",
      "Use penser with que to share ideas"
    ],
    realWorldUse: "express opinions and thoughts",
    nextModuleTeaser: "Add croire to express beliefs"
  },
  85: {
    title: "croire - To Believe",
    capabilities: [
      "Express beliefs and tentative opinions (I believe that...)",
      "Sound more tentative than penser (I think)",
      "Use croire with que for softer assertions"
    ],
    realWorldUse: "express beliefs and tentative opinions",
    nextModuleTeaser: "Add knowledge nouns to discuss learning concepts"
  },
  86: {
    title: "Knowledge & Learning - Essential Nouns",
    capabilities: [
      "Talk about academic concepts (question, answer, idea, class)",
      "Discuss learning and educational contexts",
      "Use knowledge nouns with cognitive verbs naturally"
    ],
    realWorldUse: "discuss education and ideas",
    nextModuleTeaser: "Add discourse markers to sound like a native"
  },
  87: {
    title: "Discourse Markers - Sound Like a Native",
    capabilities: [
      "Sound like a native speaker with donc, en fait, quoi",
      "Connect ideas naturally in conversation",
      "Add conversational flow markers that French people use constantly"
    ],
    realWorldUse: "speak with natural French rhythm and flow",
    milestone: "Natural conversational French",
    nextModuleTeaser: "Complete modifiers with tout, même, mal"
  },
  88: {
    title: "Modifiers - tout, même, mal",
    capabilities: [
      "Use tout for 'all' and 'everyone' (tout le monde)",
      "Express sameness with même (the same thing)",
      "Describe how well or poorly you do things (mal, bien)"
    ],
    realWorldUse: "add nuance to comparisons and descriptions",
    nextModuleTeaser: "Test comprehension with cultural reading"
  },
  89: {
    title: "Reading 7 - L'Art d'Apprendre",
    capabilities: [
      "Read philosophical French texts about learning",
      "Understand academic and intellectual discourse",
      "Comprehend cognitive verbs and discourse markers in context"
    ],
    realWorldUse: "read French intellectual and educational content",
    milestone: "Academic comprehension achieved",
    nextModuleTeaser: "Practice Unit 7 cognitive skills"
  },
  90: {
    title: "Unit 7 Practice - Fill in the Blanks",
    capabilities: [
      "Use cognitive verbs naturally in conversation",
      "Apply discourse markers for conversational flow",
      "Express knowledge, thoughts, and beliefs fluently"
    ],
    realWorldUse: "communicate intellectual ideas naturally",
    nextModuleTeaser: "Take the Unit 7 exam to prove your cognitive mastery"
  },
  91: {
    title: "Unit 7 Final Exam - Knowledge & Learning",
    capabilities: [
      "Express thinking, knowing, and understanding in French",
      "Use discourse markers for natural speech (donc, en fait, quoi)",
      "Discuss learning, beliefs, and knowledge naturally"
    ],
    realWorldUse: "express thoughts, knowledge, and opinions",
    milestone: "Cognitive expression mastery",
    isUnitCompletion: true,
    nextModuleTeaser: "Start Unit 8 for daily routines and reflexive verbs"
  },

  // Unit 8: Daily Life & Actions
  92: {
    title: "Reflexive Pronouns - me, te, se, nous, vous",
    capabilities: [
      "Use reflexive pronouns for daily actions",
      "Understand the pattern for reflexive verbs",
      "Prepare to describe daily routines in French"
    ],
    realWorldUse: "build foundation for daily routine expressions",
    nextModuleTeaser: "Learn s'appeler to finally introduce yourself properly"
  },
  93: {
    title: "s'appeler - To Be Called (Your Name!)",
    capabilities: [
      "Introduce yourself properly (My name is...)",
      "Ask someone's name (What's your name?)",
      "Use the most important reflexive verb in French"
    ],
    realWorldUse: "introduce yourself and ask people's names",
    milestone: "Proper French introductions",
    nextModuleTeaser: "Describe your morning routine"
  },
  94: {
    title: "Morning Routine - se réveiller, se lever",
    capabilities: [
      "Describe your morning routine (I wake up, I get up)",
      "Talk about daily schedules and timing",
      "Ask what time someone wakes up or gets up"
    ],
    realWorldUse: "talk about morning routines",
    nextModuleTeaser: "Add more daily reflexive verbs"
  },
  95: {
    title: "Daily Actions - se souvenir, s'amuser, se dépêcher",
    capabilities: [
      "Talk about remembering things (I remember, do you remember?)",
      "Express having fun and enjoyment (I'm having fun)",
      "Say you're hurrying or in a rush (I'm hurrying)"
    ],
    realWorldUse: "describe daily mental and emotional states",
    nextModuleTeaser: "Learn getting ready and preparation verbs"
  },
  96: {
    title: "Getting Ready - se laver, s'habiller, se préparer",
    capabilities: [
      "Describe getting ready (I wash, I get dressed, I prepare)",
      "Talk about morning hygiene and preparation",
      "Complete your full morning routine description"
    ],
    realWorldUse: "describe your complete morning routine",
    nextModuleTeaser: "Learn daily actions like sleep, work, and live"
  },
  97: {
    title: "Daily Life Essentials - Sleep, Work, Live",
    capabilities: [
      "Talk about sleeping, working, and living",
      "Describe your daily life and existence",
      "Say 'I sleep 8 hours', 'I work in Paris', 'I live here'"
    ],
    realWorldUse: "describe fundamental daily activities",
    nextModuleTeaser: "Master commands to give instructions"
  },
  98: {
    title: "Commands with Pronouns",
    capabilities: [
      "Give commands with object pronouns (Give it to me!)",
      "Use pronouns with affirmative and negative commands",
      "Form complex commands like 'Don't do it!' or 'Look at me!'"
    ],
    realWorldUse: "give precise instructions with objects",
    nextModuleTeaser: "Add temporal words to sequence events"
  },
  99: {
    title: "Commands - tu form (Informal)",
    capabilities: [
      "Give informal commands to friends and family",
      "Tell someone to eat, speak, go, do something",
      "Use command form with -ER and -IR verbs"
    ],
    realWorldUse: "give instructions to friends",
    nextModuleTeaser: "Add formal commands for polite instructions"
  },
  100: {
    title: "Commands - vous form (Formal/Plural)",
    capabilities: [
      "Give formal or plural commands politely",
      "Instruct groups or strangers (Eat! Speak! Listen!)",
      "Use vous command form in professional contexts"
    ],
    realWorldUse: "give polite instructions",
    nextModuleTeaser: "Learn irregular commands"
  },
  101: {
    title: "Irregular Commands - être, avoir, aller, faire",
    capabilities: [
      "Use irregular commands (Be!, Have!, Go!, Do!)",
      "Say common phrases like 'Vas-y!' (Go for it!)",
      "Master the most frequently used command forms"
    ],
    realWorldUse: "give common everyday instructions",
    nextModuleTeaser: "Combine commands with pronouns"
  },
  102: {
    title: "Temporal & Sequential Words - Time & Order",
    capabilities: [
      "Sequence events in time (first, then, finally)",
      "Describe when things happen (before, during, after)",
      "Tell stories with proper temporal flow"
    ],
    realWorldUse: "organize and tell stories chronologically",
    milestone: "Temporal sequencing mastered",
    nextModuleTeaser: "Test comprehension with daily life reading"
  },
  103: {
    title: "Reading 8 - Ma Journée",
    capabilities: [
      "Read French stories about daily routines",
      "Understand reflexive verbs and temporal words in context",
      "Comprehend narrative sequences and daily life descriptions"
    ],
    realWorldUse: "understand French daily life narratives",
    milestone: "Daily routine comprehension",
    nextModuleTeaser: "Practice all Unit 8 reflexive skills"
  },
  104: {
    title: "Unit 8 Practice - Fill in the Blanks",
    capabilities: [
      "Describe daily routines with reflexive verbs",
      "Use temporal words to sequence events",
      "Apply commands and routine vocabulary naturally"
    ],
    realWorldUse: "describe your daily life in French",
    nextModuleTeaser: "Take the Unit 8 exam to prove your daily life mastery"
  },
  105: {
    title: "Unit 8 Final Exam - Daily Life & Actions",
    capabilities: [
      "Describe daily routines (I wake up, I get dressed, I go to bed)",
      "Give commands and instructions in French",
      "Express reciprocal actions (we love each other)"
    ],
    realWorldUse: "talk about daily life and give directions",
    milestone: "Daily routine fluency",
    isUnitCompletion: true,
    nextModuleTeaser: "Start Unit 9 for past tense mastery"
  },

  // Unit 9: Discourse & Past Tense
  106: {
    title: "Causal & Reason Words - Explaining Why",
    capabilities: [
      "Explain why things happen (because, since, thanks to)",
      "Give reasons for your actions and decisions",
      "Connect cause and effect in French"
    ],
    realWorldUse: "explain reasons and provide justifications",
    nextModuleTeaser: "Add spatial prepositions to describe locations"
  },
  107: {
    title: "Spatial Prepositions - Position & Location",
    capabilities: [
      "Describe precise locations (in front of, behind, between)",
      "Give directions and explain positions",
      "Say 'The café is in front of the park' in French"
    ],
    realWorldUse: "describe locations and give directions",
    nextModuleTeaser: "Add more spatial relations for complete descriptions"
  },
  108: {
    title: "More Spatial Relations - Distance & Proximity",
    capabilities: [
      "Describe distance and proximity (near, far from, next to)",
      "Give detailed directions with spatial relations",
      "Say 'The café is next to the park' in French"
    ],
    realWorldUse: "give precise directions and describe locations",
    nextModuleTeaser: "Start learning past tense with regular -ER verbs"
  },
  109: {
    title: "Passé Composé - Regular -ER Verbs (I spoke, I ate)",
    capabilities: [
      "Talk about completed past actions (I spoke, I ate, I studied)",
      "Form past tense with regular -ER verbs",
      "Begin telling stories about what you did"
    ],
    realWorldUse: "describe completed past actions",
    milestone: "Past tense foundation",
    nextModuleTeaser: "Add irregular past participles"
  },
  110: {
    title: "Irregular Past Participles - Set 1 (had, was, did, saw)",
    capabilities: [
      "Use the 4 most common irregular past forms (had, was, did, saw)",
      "Say 'I had time', 'It was good', 'I did it', 'I saw him'",
      "Form past tense with the most frequent verbs"
    ],
    realWorldUse: "describe common past actions",
    nextModuleTeaser: "Add more irregular past participles"
  },
  111: {
    title: "Irregular Past Participles - Set 2 (wanted, could, had to, said)",
    capabilities: [
      "Express past desires, abilities, and obligations (wanted, could, had to)",
      "Say 'I wanted to go', 'I could come', 'I had to work'",
      "Use irregular past forms for modal and -RE verbs"
    ],
    realWorldUse: "describe past intentions and obligations",
    nextModuleTeaser: "Learn motion verbs with être"
  },
  112: {
    title: "être Verbs - DR & MRS VANDERTRAMP (went, came, left)",
    capabilities: [
      "Describe movement in the past (I went, I came, I left)",
      "Use être instead of avoir for motion verbs",
      "Master DR & MRS VANDERTRAMP verb patterns"
    ],
    realWorldUse: "tell stories about where you went",
    milestone: "Motion verb past tense mastery",
    nextModuleTeaser: "Learn past participle agreement rules"
  },
  113: {
    title: "Past Participle Agreement with être",
    capabilities: [
      "Make past participles agree with gender and number",
      "Understand when to add e, s, or es to past participles",
      "Use agreement rules correctly with être verbs"
    ],
    realWorldUse: "write grammatically correct past tense",
    nextModuleTeaser: "Form imparfait for all verbs"
  },
  114: {
    title: "Imparfait Formation - All Verbs (was doing, used to do)",
    capabilities: [
      "Form imparfait for any French verb (was doing, used to do)",
      "Describe ongoing past actions and habits",
      "Use the 'nous stem' rule to conjugate all verbs"
    ],
    realWorldUse: "describe past habits and ongoing situations",
    milestone: "Imparfait mastery",
    nextModuleTeaser: "Learn when to use passé composé vs imparfait"
  },
  115: {
    title: "Passé Composé vs Imparfait - The Golden Rule",
    capabilities: [
      "Choose the right past tense for every situation",
      "Tell complete stories mixing actions and descriptions",
      "Master the most important past tense distinction in French"
    ],
    realWorldUse: "tell sophisticated stories about the past",
    milestone: "Past tense storytelling mastery",
    nextModuleTeaser: "Practice composing complex past narratives"
  },
  116: {
    title: "Past Tense Composition - Building Complete Stories",
    capabilities: [
      "Compose complete past tense narratives",
      "Combine scene-setting, events, reasons, and locations",
      "Tell rich, sophisticated stories in French"
    ],
    realWorldUse: "tell complete stories with all past tense elements",
    milestone: "Story composition mastery",
    nextModuleTeaser: "Test your storytelling with reading comprehension"
  },
  117: {
    title: "Reflexive Verbs in Past Tense",
    capabilities: [
      "Describe past routines (I woke up, I got dressed, I left)",
      "Use être with all reflexive verbs in past tense",
      "Tell stories about what you did in your daily routine"
    ],
    realWorldUse: "describe past daily routines",
    nextModuleTeaser: "Express mutual actions with reciprocal reflexives"
  },
  118: {
    title: "Reciprocal Reflexives - Each Other",
    capabilities: [
      "Express mutual actions (we love each other, they see each other)",
      "Talk about reciprocal relationships",
      "Use reflexive pronouns for 'each other' meanings"
    ],
    realWorldUse: "describe mutual relationships and actions",
    nextModuleTeaser: "Master the passé composé vs imparfait distinction"
  },
  119: {
    title: "Reading 9 - Une Histoire du Passé",
    capabilities: [
      "Read complete French stories in the past tense",
      "Understand mixed passé composé and imparfait narratives",
      "Comprehend sophisticated storytelling with causal relationships"
    ],
    realWorldUse: "read French stories and narratives",
    milestone: "Past tense narrative comprehension",
    nextModuleTeaser: "Practice all past tense skills"
  },
  120: {
    title: "Unit 9 Practice - Fill in the Blanks",
    capabilities: [
      "Compose stories with passé composé and imparfait",
      "Use causal words to explain why things happened",
      "Apply past tense mastery in realistic narratives"
    ],
    realWorldUse: "tell complete stories about the past",
    nextModuleTeaser: "Take the Unit 9 exam to prove your storytelling mastery"
  },
  121: {
    title: "Unit 9 Final Exam - Discourse & Past Tense",
    capabilities: [
      "Tell complete stories in the past tense",
      "Distinguish between passé composé and imparfait",
      "Use discourse markers for natural storytelling"
    ],
    realWorldUse: "tell stories and describe past experiences",
    milestone: "Past tense storytelling mastery",
    isUnitCompletion: true,
    nextModuleTeaser: "Start Unit 10 for advanced B2 expressions"
  },

  // Unit 10: Mastery & Nuance (Key B2 modules)
  122: {
    title: "Forms Used After 'il faut que' and 'je veux que'",
    capabilities: [
      "Use special verb forms for wishes and necessities",
      "Form the foundation for subjunctive expressions",
      "Prepare to express complex ideas at B2 level"
    ],
    realWorldUse: "build foundation for advanced French expressions",
    nextModuleTeaser: "Add more special forms"
  },
  123: {
    title: "Il faut que... - Saying What's Necessary",
    capabilities: [
      "Express necessity and requirements (It's necessary that...)",
      "Tell people what needs to happen",
      "Use 'il faut que' with subjunctive forms naturally"
    ],
    realWorldUse: "express what needs to happen",
    milestone: "B2 necessity expressions",
    nextModuleTeaser: "Express wishes with je veux que"
  },
  124: {
    title: "Je veux que... - Expressing Wishes",
    capabilities: [
      "Express what you want others to do (I want you to...)",
      "Use subjunctive with wish expressions",
      "Communicate desires about other people's actions"
    ],
    realWorldUse: "express wishes about what others should do",
    nextModuleTeaser: "Express emotions with je suis content que"
  },
  125: {
    title: "Je suis content que... - Emotion Phrases",
    capabilities: [
      "Express emotions about what others do (I'm happy that...)",
      "Use subjunctive with emotion expressions",
      "Communicate feelings about other people's actions"
    ],
    realWorldUse: "express emotions about others",
    nextModuleTeaser: "Share opinions with je pense que"
  },
  130: {
    title: "Si j'étais... - Daydreaming & Hypotheticals",
    capabilities: [
      "Express hypothetical situations (If I were..., I would...)",
      "Talk about daydreams and what-if scenarios",
      "Use conditional mood naturally"
    ],
    realWorldUse: "express hypotheticals and daydreams",
    milestone: "Hypothetical thinking mastery",
    nextModuleTeaser: "Express past regrets with si j'avais su"
  },
  140: {
    title: "Unit 10 Final Exam - Mastery & Nuance",
    capabilities: [
      "Express complex ideas with subjunctive mood",
      "Use hypothetical and conditional structures fluently",
      "Communicate at B2 level with nuance and precision"
    ],
    realWorldUse: "express complex thoughts and hypothetical situations",
    milestone: "B2 level mastery achieved",
    isUnitCompletion: true,
    nextModuleTeaser: "Start Unit 11 for complete top 100 word coverage"
  },

  // Unit 11: Daily Essentials (Key modules)
  141: {
    title: "Age & Personal Information",
    capabilities: [
      "Say your age and ask someone's age (I'm 25 years old)",
      "Share personal information and birthdate",
      "Handle essential personal conversations"
    ],
    realWorldUse: "share personal information in French",
    milestone: "Personal information mastery",
    nextModuleTeaser: "Complete top 100 words with donner"
  },
  142: {
    title: "donner - To Give",
    capabilities: [
      "Express giving and offering (I give you, he gives me)",
      "Talk about gifts, help, and sharing",
      "Use one of the top 25 most common French words"
    ],
    realWorldUse: "talk about giving and sharing",
    milestone: "Top 100 word completion milestone",
    nextModuleTeaser: "Add daily action verbs"
  },
  150: {
    title: "Unit 11 Final Exam - Daily Essentials & Practical Communication",
    capabilities: [
      "Use all top 100 French words fluently",
      "Navigate France with directions and practical phrases",
      "Understand ~85% of everyday French conversations"
    ],
    realWorldUse: "handle any daily situation in France",
    milestone: "Complete top 100 word mastery",
    isUnitCompletion: true,
    nextModuleTeaser: "Start Unit 12 for advanced question mastery"
  }
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const url = new URL(req.url);
    const moduleId = parseInt(url.searchParams.get('module_id') || '0');
    
    if (!moduleId || moduleId < 1) {
      return new Response(JSON.stringify({
        success: false,
        error: "Valid module_id parameter required (1-150+)"
      }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    const module = MODULE_EMAIL_DATA[moduleId];
    const nextModule = MODULE_EMAIL_DATA[moduleId + 1];
    
    if (!module) {
      // Return generic data for modules not yet in our lookup
      const genericModule = {
        title: `Module ${moduleId}`,
        capabilities: [
          "Master this module's vocabulary and concepts",
          "Apply new knowledge in conversation",
          "Build on your growing French foundation"
        ],
        realWorldUse: "use this knowledge in daily French",
        nextModuleTeaser: "Continue expanding your French skills"
      };

      return new Response(JSON.stringify({
        success: true,
        data: {
          module: {
            id: moduleId,
            title: genericModule.title,
            capabilities: genericModule.capabilities,
            realWorldUse: genericModule.realWorldUse,
            milestone: null,
            utilityScore: 5,
            isUnitCompletion: false,
            nextModuleTeaser: genericModule.nextModuleTeaser
          },
          nextModule: null,
          isGeneric: true
        }
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    // Calculate unit number (rough estimate: 12-13 modules per unit)
    const unitNumber = Math.ceil(moduleId / 12);

    return new Response(JSON.stringify({
      success: true,
      data: {
        module: {
          id: moduleId,
          title: module.title,
          capabilities: module.capabilities,
          realWorldUse: module.realWorldUse,
          milestone: module.milestone || null,
          utilityScore: module.utilityScore || 5,
          isUnitCompletion: module.isUnitCompletion || false,
          nextModuleTeaser: module.nextModuleTeaser || "Continue your French journey",
          unitNumber: unitNumber
        },
        nextModule: nextModule ? {
          id: moduleId + 1,
          title: nextModule.title,
          realWorldUse: nextModule.realWorldUse,
          capabilities: nextModule.capabilities
        } : null
      }
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });

  } catch (error) {
    console.error('Error in get-module-email-data:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
});
