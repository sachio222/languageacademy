# Module System Guide - Complete Reference

This guide covers everything you need to know about adding, modifying, and managing modules in your French learning app.

## 🏗️ **System Architecture Overview**

Your app uses a **unit-based config system** with **dynamic ranges** and **permanent module identifiers**.

### **Key Components:**

- **Unit folders** (`unit1/`, `unit2/`, etc.) - Organize related modules
- **Unit configs** (`unit-config.js`) - Define pedagogical sequence per unit
- **Module files** - Individual learning modules with permanent `moduleKey`
- **Dynamic system** - Ranges and IDs auto-calculate

---

## 📁 **Directory Structure**

```
src/lessons/modules/
├── unit1/
│   ├── famous-words.js
│   ├── pronouns.js
│   ├── etre.js
│   ├── unit-config.js        ← Unit configuration
│   └── index.js              ← Exports all modules
├── unit2/
│   ├── demonstratives.js
│   ├── unit-config.js
│   └── index.js
├── ...
├── reference/
│   ├── alphabet.js
│   ├── unit-config.js
│   └── index.js
├── index.js                  ← Master export
└── unitConfigLoader.js       ← Assembles all units
```

---

## ➕ **Adding a New Module to Existing Unit**

### **Step 1: Create the Module File**

```javascript
// src/lessons/modules/unit3/new-reflexive-verbs.js
export const newReflexiveVerbsModule = {
  moduleKey: "2024-10-20-new-reflexive-verbs", // Permanent identifier - NEVER changes
  title: "New Reflexive Verbs - Daily Actions",
  description: "Learn more reflexive verbs for daily routines",

  concepts: [
    {
      term: "Reflexive Verbs",
      definition: "Verbs where the subject does the action to themselves",
      example: "se brosser les dents (to brush one's teeth)",
    },
  ],

  vocabularyReference: [
    { french: "se brosser", english: "to brush oneself", note: "reflexive" },
    { french: "se reposer", english: "to rest", note: "reflexive" },
  ],

  exerciseConfig: {
    type: "conjugation",
    // ... exercise configuration
  },
};
```

### **Step 2: Add to Unit Config**

```javascript
// src/lessons/modules/unit3/unit-config.js
import { newReflexiveVerbsModule } from "./new-reflexive-verbs.js";

export const unit3Config = {
  metadata: {
    /* ... */
  },
  modules: [
    contractions,
    venirModule,
    allerModule,
    verbPatternHelp,
    newReflexiveVerbsModule, // ← ADD HERE in pedagogical position
    partirModule, // ← Everything else stays the same
    // ... rest of modules
  ],
};
```

### **Step 3: Add to Unit Index**

```javascript
// src/lessons/modules/unit3/index.js
export { newReflexiveVerbsModule } from "./new-reflexive-verbs.js";
```

### **Result:**

- ✅ Module automatically gets next available lesson ID
- ✅ All subsequent modules shift IDs automatically
- ✅ Unit ranges update automatically
- ✅ Navigation updates automatically

---

## 🆕 **Adding a New Unit**

### **Step 1: Create Unit Directory**

```bash
mkdir src/lessons/modules/unit13
```

### **Step 2: Create Unit Config**

```javascript
// src/lessons/modules/unit13/unit-config.js
import { advancedGrammarModule } from "./advanced-grammar.js";
import { unit13Exam } from "./unit-13-exam.js";

export const unit13Config = {
  metadata: {
    id: 13,
    title: "Unit 13: Advanced Grammar",
    description: "Master complex grammatical structures",
    icon: "🎓",
    color: "#10b981",
  },
  modules: [
    advancedGrammarModule, // Modules in pedagogical order
    unit13Exam, // End with unit exam
  ],
};
```

### **Step 3: Create Unit Index**

```javascript
// src/lessons/modules/unit13/index.js
export { advancedGrammarModule } from "./advanced-grammar.js";
export { unit13Exam } from "./unit-13-exam.js";
```

### **Step 4: Add to Unit Config Loader**

```javascript
// src/lessons/unitConfigLoader.js
import { unit13Config } from "./modules/unit13/unit-config.js";

export const unitConfigs = [
  unit1Config,
  unit2Config,
  // ... existing units
  unit13Config, // ← ADD HERE
  referenceConfig, // Reference always last
];
```

### **Result:**

- ✅ New unit appears in navigation
- ✅ All ranges recalculate automatically
- ✅ Reference section moves to end automatically

---

## 🔧 **Modifying Existing Modules**

### **Editing Module Content:**

```javascript
// Just edit the module file directly
// src/lessons/modules/unit3/partir.js
export const partirModule = {
  moduleKey: "2024-01-29-partir", // DON'T change this
  title: "Essential Verb - partir (to leave)", // Can change
  description: "Updated description", // Can change
  // ... update content as needed
};
```

### **Reordering Modules Within Unit:**

```javascript
// src/lessons/modules/unit3/unit-config.js
modules: [
  contractions,
  venirModule,
  newModule, // ← Move to different position
  allerModule, // ← Everything else adjusts
  verbPatternHelp,
  // ...
];
```

### **Moving Module to Different Unit:**

1. **Move the file** to new unit folder
2. **Update import paths** in both unit configs
3. **Update unit index files**
4. **Ranges recalculate automatically**

---

## 🔑 **Module Key System**

### **Format:**

```
YYYY-MM-DD-descriptive-name
```

### **Examples:**

- `2024-01-01-pronouns` - Core pronouns module
- `2024-03-15-questce-qui-que` - Question discrimination module
- `2024-04-01-alphabet` - Alphabet reference

### **Rules:**

- ✅ **NEVER change** existing moduleKeys
- ✅ **Use incremental dates** to avoid duplicates
- ✅ **Descriptive names** in kebab-case
- ✅ **Unique across all modules**

### **Cross-References:**

```javascript
// OLD WAY (hardcoded - breaks on reorganization):
"You learned this in Module 154";

// NEW WAY (dynamic - always accurate):
import { getModuleRef } from "../../moduleIdResolver.js";
`You learned this in ${getModuleRef("2024-03-15-questce-qui-que")}`;
```

---

## 📚 **Reference Modules**

### **Adding Reference Module:**

```javascript
// 1. Create module file in reference/ folder
// 2. Add to reference/unit-config.js modules array
// 3. Add to reference/index.js exports
// 4. Reference page updates automatically
```

### **Reference Page:**

- **Dynamically pulls** from lesson system
- **No hardcoded data** - always stays in sync
- **Automatic icons/images** based on module titles

---

## 🧪 **Testing Your Changes**

### **Build Test:**

```bash
npm run build
```

### **System Verification:**

```bash
node -e "
import('./src/lessons/lessonData.js').then(module => {
  const { lessons, unitStructure } = module;
  console.log('Total lessons:', lessons.length);
  console.log('Total units:', unitStructure.length);
  // Check unit boundaries...
});
"
```

---

## ⚠️ **Important Rules**

### **DO:**

- ✅ Add modules to unit-config.js in **pedagogical order**
- ✅ Use **unique moduleKeys** with incremental dates
- ✅ End each unit with a **unit exam**
- ✅ Test build after changes

### **DON'T:**

- ❌ Change existing moduleKeys (breaks references)
- ❌ Skip unit-config.js (module won't appear)
- ❌ Use duplicate moduleKeys
- ❌ Hardcode lesson numbers anywhere

---

## 🔄 **Common Workflows**

### **Adding Module Mid-Unit:**

1. Create module file with unique moduleKey
2. Insert in unit-config.js at pedagogical position
3. Add to unit index.js
4. Test build

### **Reordering Unit Content:**

1. Reorder modules array in unit-config.js
2. Lesson IDs automatically reassign
3. Navigation updates automatically

### **Creating Unit Exam:**

```javascript
export const unit12Exam = {
  moduleKey: "2024-03-30-unit12-exam",
  title: "Unit 12 Final Exam - Curiosity & Questions",
  isUnitExam: true,
  unitNumber: 12,
  // ... exam configuration
};
```

---

## 🎯 **Best Practices**

### **Module Keys:**

- Use **creation date** or **logical sequence date**
- Keep **descriptive names** short but clear
- **Never reuse** keys from deleted modules

### **Pedagogical Order:**

- **Prerequisites first** - what students need to know
- **Building complexity** - simple to advanced
- **Logical flow** - each module builds on previous ones
- **Unit exams last** - test everything in that unit

### **File Organization:**

- **Related modules** in same unit folder
- **Clear file names** matching module purpose
- **Consistent export names** across the system

---

## 🚀 **Advanced Features**

### **Dynamic Cross-References:**

```javascript
import { getModuleId, getModuleRef } from "../../moduleIdResolver.js";

// Get current lesson ID for a module
const currentId = getModuleId("2024-01-01-pronouns"); // Returns actual lesson number

// Get formatted reference
const reference = getModuleRef("2024-01-01-pronouns"); // Returns "Module 2" (or current ID)
```

### **Unit Metadata:**

```javascript
// Each unit config includes rich metadata
metadata: {
  id: 3,
  title: "Unit 3: Movement & Possession",
  description: "Master motion verbs...",
  icon: "🎯",
  color: "#06b6d4"
}
```

---

## 🎓 **Your System Benefits**

### **For You (Developer):**

- 🔧 **Easy maintenance** - small, focused config files
- 📁 **Logical organization** - related modules grouped
- 🔄 **No manual range updates** - everything automatic
- 🛡️ **Error-proof** - can't have misaligned boundaries

### **For Students:**

- 🎯 **Correct navigation** - units show proper content
- 📚 **Working reference page** - all links functional
- 📱 **Consistent experience** - no broken flows

### **For Future:**

- ✅ **Scalable** - add unlimited modules/units
- 🔄 **Flexible** - reorder content easily
- 🛠️ **Maintainable** - clear structure for contributors

---

**Your module system is now production-ready and future-proof!** 🎉
