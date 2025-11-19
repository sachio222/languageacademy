# 🔄 ModuleKey Migration Plan

**Goal:** Migrate from `lesson.id` (numeric, unstable) to `moduleKey` (string, stable) as primary identifier.

**Critical Requirements:**
- ✅ Maintain ALL existing functionality
- ✅ Preserve ALL user progress data  
- ✅ Zero downtime migration
- ✅ Support frequent lesson reordering

---

## 🎯 **Current State Analysis**

### **What Uses lesson.id (NEEDS MIGRATION):**
```javascript
// Database Tables:
- module_progress.module_id: "1", "2", "3", ...
- exercise_completions.module_id: "1", "2", "3", ...  
- concept_understanding.module_id: "1", "2", "3", ...

// Code References:
- extractModuleId(lesson) → lesson.id.toString()
- Webhook payload: { module_id: 3 }
- Edge function lookups: MODULE_EMAIL_DATA[3]
- Stats calculations: parseInt(module_id)
```

### **What Uses moduleKey (ALREADY GOOD):**
```javascript
// Module Configs:
- lesson.moduleKey: "2024-01-01-famous-words"
- emailMetadata mapping
- Module reference system
```

---

## 🚀 **Migration Strategy: 4-Phase Approach**

### **Phase 1: Stats Fix (COMPLETED ✅)**
- ✅ Fixed field names: `completed` → `completed_at`, `score` → `exam_score`
- ✅ Function deployed and working
- ✅ Stats will now return correct values

### **Phase 2: Hybrid System (NEXT)**
**Goal:** Support both lesson.id AND moduleKey simultaneously

#### **2.1 Update extractModuleId Function**
```javascript
// Current:
export const extractModuleId = (lesson) => {
  return lesson.id?.toString() || 'unknown'
}

// New (Hybrid):
export const extractModuleId = (lesson) => {
  // For new completions, prefer moduleKey
  // For existing data, keep using lesson.id for compatibility
  return lesson.moduleKey || lesson.id?.toString() || 'unknown'
}
```

#### **2.2 Update Edge Functions for Dual Lookup**
```typescript
// get-module-email-data: Support both formats
const MODULE_EMAIL_DATA = {
  // Legacy format (lesson.id)
  "1": { title: "Famous Words & Greetings", moduleKey: "2024-01-01-famous-words" },
  "3": { title: "Essential Verb - être (to be)", moduleKey: "2024-01-03-etre" },
  
  // New format (moduleKey) 
  "2024-01-01-famous-words": { title: "Famous Words & Greetings", lessonId: 1 },
  "2024-01-03-etre": { title: "Essential Verb - être (to be)", lessonId: 3 }
}

// Lookup logic:
const module = MODULE_EMAIL_DATA[moduleId] || MODULE_EMAIL_DATA[moduleId.toString()];
```

#### **2.3 Update Stats Function for Dual Support**
```typescript
// Handle both numeric lesson.id and string moduleKey
const currentModule = completedModules.length > 0 ? 
  Math.max(...completedModules.map(m => {
    // Try parsing as number (legacy lesson.id)
    const numericId = parseInt(m.module_id);
    if (!isNaN(numericId)) return numericId;
    
    // For moduleKey, map back to lesson position
    return getModulePosition(m.module_id) || 0;
  })) + 1 : 1;
```

### **Phase 3: Data Migration (CAREFUL)**
**Goal:** Migrate existing database records from lesson.id to moduleKey

#### **3.1 Create Mapping Table**
```sql
-- Create temporary mapping for migration
CREATE TABLE module_id_mapping (
  old_module_id TEXT,
  new_module_id TEXT,
  lesson_title TEXT,
  migration_date TIMESTAMP DEFAULT NOW()
);

-- Populate mapping
INSERT INTO module_id_mapping (old_module_id, new_module_id, lesson_title) VALUES
('1', '2024-01-01-famous-words', 'Famous Words & Greetings'),
('2', '2024-01-02-pronouns', 'Personal Pronouns'),
('3', '2024-01-03-etre', 'Essential Verb - être (to be)'),
-- ... all 150+ modules
```

#### **3.2 Migration Script (ATOMIC)**
```sql
-- Migrate module_progress
BEGIN;
UPDATE module_progress 
SET module_id = mapping.new_module_id
FROM module_id_mapping mapping
WHERE module_progress.module_id = mapping.old_module_id;

-- Migrate exercise_completions  
UPDATE exercise_completions
SET module_id = mapping.new_module_id
FROM module_id_mapping mapping
WHERE exercise_completions.module_id = mapping.old_module_id;

-- Migrate concept_understanding
UPDATE concept_understanding
SET module_id = mapping.new_module_id  
FROM module_id_mapping mapping
WHERE concept_understanding.module_id = mapping.old_module_id;

-- Verify migration
SELECT 
  'module_progress' as table_name,
  COUNT(*) as migrated_records
FROM module_progress 
WHERE module_id LIKE '2024-%'
UNION ALL
SELECT 
  'exercise_completions',
  COUNT(*)
FROM exercise_completions
WHERE module_id LIKE '2024-%';

COMMIT;
```

### **Phase 4: Cleanup (FINAL)**
**Goal:** Remove legacy lesson.id support

#### **4.1 Update extractModuleId (Final)**
```javascript
// Remove lesson.id fallback
export const extractModuleId = (lesson) => {
  if (!lesson.moduleKey) {
    throw new Error(`Module missing moduleKey: ${lesson.title}`);
  }
  return lesson.moduleKey;
}
```

#### **4.2 Update Edge Functions (Final)**
```typescript
// Remove numeric key support
const MODULE_EMAIL_DATA = {
  // Only moduleKey format
  "2024-01-01-famous-words": { title: "Famous Words & Greetings" },
  "2024-01-03-etre": { title: "Essential Verb - être (to be)" }
}
```

#### **4.3 Drop Migration Table**
```sql
DROP TABLE module_id_mapping;
```

---

## 🧪 **Testing Strategy**

### **Phase 2 Testing:**
1. ✅ Complete a module → Check both lesson.id AND moduleKey work
2. ✅ Trigger webhook → Verify email data lookup works
3. ✅ Check stats → Ensure calculations remain accurate
4. ✅ Reorder lessons → Confirm new completions use moduleKey

### **Phase 3 Testing:**
1. ✅ Backup production database
2. ✅ Run migration on staging environment
3. ✅ Verify all user progress preserved
4. ✅ Test all email workflows
5. ✅ Confirm stats accuracy
6. ✅ Load test with real user data

### **Phase 4 Testing:**
1. ✅ Remove all lesson.id references
2. ✅ Verify no functionality breaks
3. ✅ Test lesson reordering extensively
4. ✅ Monitor for any edge cases

---

## ⚠️ **Risk Mitigation**

### **Data Loss Prevention:**
- ✅ Full database backup before Phase 3
- ✅ Atomic transactions for all migrations
- ✅ Rollback plan for each phase
- ✅ Staging environment testing

### **Functionality Preservation:**
- ✅ Dual support during transition
- ✅ Comprehensive test suite
- ✅ Gradual rollout (not big bang)
- ✅ Monitor all endpoints during migration

### **User Experience:**
- ✅ Zero downtime migration
- ✅ No progress loss
- ✅ No email disruption
- ✅ Transparent to users

---

## 📅 **Recommended Timeline**

### **Week 1: Phase 2 (Hybrid System)**
- Day 1-2: Update extractModuleId function
- Day 3-4: Update Edge Functions for dual lookup  
- Day 5: Deploy and test hybrid system
- Weekend: Monitor for issues

### **Week 2: Phase 3 Preparation**
- Day 1-2: Create mapping table and migration scripts
- Day 3-4: Test migration on staging environment
- Day 5: Final testing and validation
- Weekend: Schedule production migration

### **Week 3: Phase 3 Execution**
- Day 1: Execute production migration (low traffic time)
- Day 2-5: Monitor and verify all functionality
- Weekend: Address any issues

### **Week 4: Phase 4 Cleanup**
- Day 1-3: Remove legacy lesson.id support
- Day 4-5: Final testing and cleanup
- Weekend: Complete migration

---

## 🎯 **Success Criteria**

### **Phase 2 Complete When:**
- ✅ New module completions use moduleKey
- ✅ Existing data still works with lesson.id
- ✅ All emails send correctly
- ✅ Stats calculations accurate

### **Phase 3 Complete When:**
- ✅ All database records use moduleKey
- ✅ No data loss detected
- ✅ All functionality preserved
- ✅ Performance unchanged

### **Phase 4 Complete When:**
- ✅ No lesson.id references remain
- ✅ Lesson reordering works perfectly
- ✅ All tests pass
- ✅ System fully stable

---

## 🚨 **Emergency Rollback Plan**

### **If Phase 2 Issues:**
```sql
-- Revert extractModuleId function
-- Keep using lesson.id only
-- No database changes needed
```

### **If Phase 3 Issues:**
```sql
-- Restore from backup
-- Revert to Phase 2 state
-- Investigate and fix issues
```

### **If Phase 4 Issues:**
```sql
-- Re-enable dual support
-- Investigate specific failures
-- Gradual re-cleanup
```

---

## 💡 **Next Steps**

1. **Review this plan** - Any concerns or modifications?
2. **Start Phase 2** - Update extractModuleId function?
3. **Create staging environment** - For safe testing?
4. **Schedule migration window** - When is low traffic time?

**The stats function is now fixed and working. Ready to proceed with Phase 2?**
