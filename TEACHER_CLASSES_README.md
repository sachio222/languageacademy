# Teacher Classes - Enterprise Feature

## Overview

The teacher classes feature is an **optional enterprise add-on** that allows schools to:

- Teachers create and manage multiple classes
- Students join classes via join codes
- Teachers view student progress within their classes
- All while maintaining full support for individual learners

## Key Principles

### 1. Optional, Not Mandatory

- ✅ Students can use Language Academy **without** joining any class
- ✅ Individual subscriptions work exactly as before
- ✅ Classes are an enterprise feature for schools/teachers
- ✅ App functions identically for solo learners and class members

### 2. Clean Integration

- Follows DESIGN_PRINCIPLES.md precisely
- Matches existing UI/UX aesthetic
- Minimal, clean, generous spacing
- Same Airbnb-level design quality

### 3. Progress Independence

- Student progress stored at **user level**, not class level
- Progress follows students between classes
- Removing from class preserves all progress
- Transferring classes keeps full history

## Components

### Teacher Components

#### `TeacherDashboard.jsx`

Main container that shows either class list or class detail

#### `TeacherClasses.jsx`

- Grid of teacher's classes
- Create new class modal
- Copy join codes
- View class stats

#### `TeacherClassDetail.jsx`

- Single class roster
- Student progress table
- Class statistics
- Reuses admin dashboard styling

### Student Components

#### `JoinClass.jsx`

- Optional modal for students to join a class
- Enter 6-character join code
- Clear messaging that it's optional

### Hooks

#### `useClasses.js`

- `fetchClasses()` - Get teacher's classes
- `createClass(data)` - Create new class
- `joinClass(code)` - Student joins via code
- `fetchStudentClasses()` - Get student's enrolled classes

## Database Tables

### `schools`

Multi-tenant container for organizations

### `classes`

Teacher classes with metadata (name, term, period, join code)

### `class_permissions`

Multi-teacher access (owner, co-teacher, substitute, viewer)

### `class_enrollments`

Many-to-many student-class relationships

## Materialized Views

### `teacher_class_dashboard`

Pre-calculated student stats per class (fast queries)

Refreshed with `SELECT refresh_teacher_dashboard()`

## User Roles

Add to `user_profiles.role`:

- `student` (default for existing users)
- `teacher` (can create/manage classes)
- `school_admin` (can view school-wide data)
- `super_admin` (full access)

## Integration Points

### In App.jsx or Navigation

```javascript
import TeacherDashboard from "./components/TeacherDashboard";
import JoinClass from "./components/JoinClass";
import { useAuth } from "./hooks/useAuth";

// Show teacher dashboard for teachers
const { profile } = useAuth();
const isTeacher =
  profile?.role === "teacher" || profile?.role === "school_admin";

// In navigation or router:
{
  isTeacher && <Route path="/classes" element={<TeacherDashboard />} />;
}

// Optional join button for students (in settings or nav)
<button onClick={() => setShowJoinClass(true)}>Join a Class</button>;
{
  showJoinClass && <JoinClass onClose={() => setShowJoinClass(false)} />;
}
```

### Navigation Menu

```javascript
// For teachers, add to navigation
{
  isTeacher && (
    <NavLink to="/classes">
      <Users size={20} />
      <span>My Classes</span>
    </NavLink>
  );
}

// For students, optional setting
<button className="secondary-action" onClick={() => setShowJoinClass(true)}>
  Join a Class (Optional)
</button>;
```

## Usage Flow

### Teacher Workflow

1. Teacher role assigned in database
2. Navigate to "My Classes"
3. Click "New Class"
4. Fill in name, term, period
5. Get auto-generated join code (e.g., "ABC123")
6. Share code with students
7. View student roster and progress

### Student Workflow (Optional)

1. Teacher shares join code
2. Student clicks "Join a Class" (optional feature)
3. Enters code
4. Automatically enrolled
5. Continues using app exactly as before
6. Teacher can now see their progress

### Individual Student (No Class)

1. Student signs up
2. Uses app normally
3. Completes modules, tracks progress
4. No difference in experience
5. Never sees class-related UI

## Sharing & Permissions

### Share Class with Co-Teacher

```javascript
// Insert permission
await supabase.from("class_permissions").insert({
  class_id: classId,
  user_id: coTeacherId,
  role: "co-teacher",
});
```

### Add Temporary Substitute

```javascript
await supabase.from("class_permissions").insert({
  class_id: classId,
  user_id: substituteId,
  role: "substitute",
  expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks
});
```

### Transfer Ownership

```javascript
// Update roles
await supabase
  .from("class_permissions")
  .update({ role: "co-teacher" })
  .eq("class_id", classId)
  .eq("user_id", oldTeacherId);

await supabase
  .from("class_permissions")
  .update({ role: "owner" })
  .eq("class_id", classId)
  .eq("user_id", newTeacherId);
```

## Bulk Operations

### Transfer Students

```javascript
await supabase.rpc("bulk_transfer_students", {
  student_ids: [id1, id2, id3],
  from_class_id: oldClassId,
  to_class_id: newClassId,
});
```

### Remove Students

```javascript
await supabase
  .from("class_enrollments")
  .update({ status: "dropped" })
  .in("student_id", studentIds)
  .eq("class_id", classId);
```

## Maintenance

### Refresh Dashboards

Run every 5 minutes via cron or manually:

```sql
SELECT refresh_admin_dashboard();
SELECT refresh_teacher_dashboard();
```

### Clean Expired Permissions

```sql
SELECT cleanup_expired_permissions();
```

## Design Adherence

All components follow DESIGN_PRINCIPLES.md:

- ✅ Typography hierarchy (2rem headers, 0.9375rem body)
- ✅ Generous spacing (2.5rem between sections)
- ✅ Minimal borders (only where needed)
- ✅ Grayscale + blue accent
- ✅ Clean, uncluttered layouts
- ✅ Fast transitions (0.15s)
- ✅ Subtle hover states
- ✅ Modal animations (slideUp)
- ✅ Responsive design

## Testing Checklist

- [ ] Teacher can create class
- [ ] Student can join via code
- [ ] Invalid code shows error
- [ ] Duplicate join shows error
- [ ] Teacher sees enrolled students
- [ ] Student progress displays correctly
- [ ] Individual students unaffected
- [ ] Remove student preserves progress
- [ ] Transfer student keeps data
- [ ] Co-teacher can view roster
- [ ] Substitute access expires
- [ ] Materialized view refreshes
- [ ] Mobile responsive
- [ ] Accessibility (keyboard nav)

## Future Enhancements

Possible additions (not implemented):

- CSV roster import
- Assignment creation
- Class-specific grading
- Parent/observer accounts
- SSO integration
- SIS integration (Clever, Classlink)
- Class-level analytics
- Bulk email to students
- Class announcements

---

**Remember**: This is an **enterprise feature**. The core app works perfectly for individual learners without any classes.
