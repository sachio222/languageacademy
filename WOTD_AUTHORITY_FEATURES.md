# WOTD Authoritative Features

## What Makes This THE Definitive Reference

### Depth Beyond Competitors

#### vs Oxford/Cambridge
- **Them:** 1-2 definitions, 2-3 examples
- **Us:** Multiple senses with register labels, 5+ contextual examples with proficiency levels, grammar notes, collocations, idioms

#### vs WordReference
- **Them:** Conjugation tables, forum discussions
- **Us:** Etymology + historical evolution, frequency ranking, collocations, idiom meanings, usage across levels

#### vs Duolingo/Babbel
- **Them:** Basic translation, single example
- **Us:** Full linguistic treatment, multiple contexts, grammar patterns, real-world usage

### Authoritative Data Points

For each word, we provide:

1. **Frequency Data**
   - Absolute ranking (#8 most common)
   - Context about frequency ("Top 10 most common verb")
   - Visual badge with gradient highlighting

2. **Multiple Definitions**
   - Numbered senses (1, 2, 3...)
   - Register labels (universal, common, grammatical)
   - Inline examples for each sense
   - Shows semantic range

3. **Etymology Section**
   - Latin/Greek/Germanic roots
   - Historical evolution with intermediate forms
   - Century of first attestation
   - Linguistic notes about irregularity

4. **Grammar Notes**
   - Irregularity patterns
   - Auxiliary verb information
   - Construction patterns (futur proche, etc.)
   - Special conjugation notes

5. **Collocations**
   - Common word combinations
   - Shows real usage patterns
   - Interactive hover states

6. **Idioms & Expressions**
   - Common idiomatic uses
   - Literal vs actual meaning
   - Proficiency level for each
   - Cultural context

7. **Contextual Examples**
   - 5+ examples across contexts
   - CEFR level for each (A1-C2)
   - Context labels (Movement, Well-being, etc.)
   - Usage notes for complex cases
   - Audio for every example

8. **Related Words**
   - Relationship types (antonym, synonym, related motion)
   - Not just translations
   - Semantic networks

### Design Signals Authority

1. **Visual Hierarchy**
   - Clean, academic presentation
   - Professional typography
   - Color-coded sections (blue=grammar, amber=idioms, green=etymology)

2. **Information Density**
   - Comprehensive but scannable
   - Grouped by cognitive association
   - No scrolling fatigue

3. **Credibility Markers**
   - Frequency rankings
   - Historical data (9th century)
   - Linguistic terminology (Vulgar Latin, etc.)
   - CEFR standardization

4. **Professional Polish**
   - Serif fonts for etymology (Georgia)
   - Gradient backgrounds for special sections
   - Hover interactions
   - Smooth animations

### Data Requirements for Production

To maintain authority, each word needs:

**Required:**
- ✅ Word, IPA pronunciation, part of speech
- ✅ Frequency rank (1-10,000)
- ✅ 2+ definitions with senses
- ✅ 3+ examples with levels
- ✅ Grammar notes (if verb/adjective)
- ✅ Etymology (origin, period)

**Strongly Recommended:**
- ⚠️ 5+ collocations
- ⚠️ 2+ idioms
- ⚠️ Historical evolution
- ⚠️ 3+ related words

**Nice to Have:**
- ◻️ Regional variants
- ◻️ False friends
- ◻️ Cognates in other languages

### Content Sources

**Frequency Data:**
- Lexique 3 database
- Google Books French corpus
- OpenSubtitles frequency lists

**Etymology:**
- TLFi (Trésor de la Langue Française informatisé)
- Centre National de Ressources Textuelles et Lexicales (CNRTL)

**Examples:**
- Tatoeba corpus (verified)
- French literature excerpts
- News article samples

**Collocations:**
- Sketch Engine French corpus
- Manual curation from native speakers

## Competitive Positioning

**Tagline Concepts:**
- "The definitive French word reference"
- "More than a dictionary. A complete language resource."
- "French words explained like never before"

**Trust Signals:**
- Comprehensive linguistic data
- CEFR-aligned examples
- Frequency rankings from major corpora
- Etymology from authoritative sources
- Professional presentation

**User Perception:**
"This is the most detailed explanation of a French word I've ever seen. Better than my university textbook."

## Implementation Status

✅ UI/UX designed and built  
✅ All sections styled professionally  
✅ Mock data demonstrates full capability  
⏳ Database schema needed  
⏳ Content pipeline for 365 words  
⏳ API integration with frequency/etymology data  

