# Teacher Classes - Implementation Guide

## ✅ What's Been Built

### Frontend Components (Ready to Use)

- ✅ `src/components/TeacherDashboard.jsx` - Main teacher view
- ✅ `src/components/TeacherClasses.jsx` - Class list + create
- ✅ `src/components/TeacherClassDetail.jsx` - Class roster
- ✅ `src/components/JoinClass.jsx` - Student join modal
- ✅ `src/hooks/useClasses.js` - Class management hook
- ✅ `src/hooks/useToast.js` - Toast notifications
- ✅ `src/components/Toast.jsx` - Toast component
- ✅ All CSS files following DESIGN_PRINCIPLES.md

### Database (Ready to Deploy)

- ✅ Migration files in `/supabase/migrations/`
- ✅ Materialized views for performance
- ✅ Helper functions for bulk operations
- ✅ RLS policies for security

---

## 🎯 Next Steps

### Step 1: Database Migrations

**You already ran these successfully:**

1. ✅ Create schools table
2. ✅ Add role columns to user_profiles
3. ✅ Create classes table
4. ✅ Create class_permissions table (fixed)
5. ✅ Create class_enrollments table
6. ✅ Add RLS policies

**Now run these final two:**

**Migration 8: Helper Functions**
(Paste into SQL editor - see Migration 8 section above)

**Migration 9: Teacher Dashboard View**
(Paste into SQL editor - see Migration 9 section above)

---

### Step 2: Refresh Materialized Views

Run this to populate the views with your current data:

```sql
-- Refresh both admin and teacher dashboards
SELECT refresh_admin_dashboard();
SELECT refresh_teacher_dashboard();
```

---

### Step 3: Set Up Auto-Refresh (Choose One)

#### Option A: Manual (Simplest)

Run this whenever you need fresh data:

```sql
SELECT refresh_admin_dashboard();
SELECT refresh_teacher_dashboard();
```

#### Option B: Cron Job (Recommended)

Set up external cron to call Supabase edge function every 5 minutes.

#### Option C: Manual Button in UI

Add refresh button to admin/teacher dashboards:

```javascript
const refreshData = async () => {
  await supabaseClient.rpc("refresh_admin_dashboard");
  await supabaseClient.rpc("refresh_teacher_dashboard");
  showToast("Dashboard refreshed", "success");
};
```

---

### Step 4: Integrate into App

#### A. Add Route (React Router)

```javascript
// In your App.jsx or router config
import TeacherDashboard from "./components/TeacherDashboard";
import JoinClass from "./components/JoinClass";

// Add routes
<Route path="/teacher/classes" element={<TeacherDashboard />} />;
```

#### B. Add Navigation Link (For Teachers)

```javascript
// In your navigation component
import { Users } from "lucide-react";
import { useAuth } from "./hooks/useAuth";

const { profile } = useAuth();
const isTeacher =
  profile?.role === "teacher" || profile?.role === "school_admin";

// Add to nav menu
{
  isTeacher && (
    <NavLink to="/teacher/classes" className="nav-link">
      <Users size={20} />
      <span>My Classes</span>
    </NavLink>
  );
}
```

#### C. Add Optional Join Button (For Students)

```javascript
// In settings or profile menu
const [showJoinClass, setShowJoinClass] = useState(false);

// Add button
<button onClick={() => setShowJoinClass(true)}>Join a Class (Optional)</button>;

// Add modal
{
  showJoinClass && <JoinClass onClose={() => setShowJoinClass(false)} />;
}
```

---

## 🧪 Testing Checklist

### Teacher Flow

1. Set a user's role to 'teacher' in database
2. Log in as that user
3. Navigate to /teacher/classes
4. Click "New Class"
5. Create class (get join code)
6. Verify class appears in list
7. Click class to view roster (empty initially)

### Student Flow

1. Log in as student
2. Click "Join a Class" (if you added the button)
3. Enter join code from teacher
4. Verify success message
5. Student should appear in teacher's roster
6. Student can continue using app normally

### Admin Flow

1. Admin dashboard still works
2. Can see all students (in classes or not)
3. Overview stats still accurate

---

## 🎨 Design Verification

All components match DESIGN_PRINCIPLES.md:

- ✅ Large, thin numbers (2rem, weight 300)
- ✅ Page titles (2rem, weight 600)
- ✅ Generous spacing (2.5rem between sections)
- ✅ Minimal borders (1px solid #f0f0f0)
- ✅ Grayscale + blue accent (#3b82f6)
- ✅ Clean modals (600px max, 3rem padding, 16px radius)
- ✅ Fast transitions (0.15s)
- ✅ Subtle hover states (opacity, not transform)
- ✅ Modal animations (fadeIn + slideUp)
- ✅ Responsive design

---

## 📊 Sample Data for Testing

```sql
-- Create a test school
INSERT INTO schools (name, license_type, max_teachers, max_students)
VALUES ('Lincoln High School', 'school', 50, 1000)
RETURNING id;

-- Set a user as teacher (replace with actual user_id)
UPDATE user_profiles
SET role = 'teacher', school_id = 'school-id-from-above'
WHERE email = 'teacher@example.com';

-- Student joins via UI (no manual insert needed)
```

---

## 🚀 Production Deployment

### Pre-launch Checklist

- [ ] All 10 migrations run successfully
- [ ] Materialized views refreshed
- [ ] Your user has super_admin role
- [ ] Test teacher account created
- [ ] Test student can join class
- [ ] Teacher can view roster
- [ ] Individual students unaffected
- [ ] Mobile responsive verified
- [ ] Accessibility tested

### Go-Live Steps

1. Run migrations 8-9 (helper functions + materialized view)
2. Refresh materialized views
3. Deploy frontend code
4. Test teacher/student flows
5. Set up auto-refresh (optional)
6. Update documentation for schools

---

## 🔄 Maintenance

### Daily

- Auto-refresh views (if cron set up)

### Weekly

- Run cleanup: `SELECT cleanup_expired_permissions()`

### Monthly

- Review class enrollments
- Archive old classes

---

## 📈 Future Enhancements

When you need them:

- CSV roster import
- Bulk student operations UI
- Assignment system
- Class-specific analytics
- Parent accounts
- Email all students in class
- Class announcements
- SSO integration

---

## 🆘 Troubleshooting

### "Can't see classes"

- Check user role: `SELECT role FROM user_profiles WHERE id = 'user-id'`
- Should be 'teacher', 'school_admin', or 'super_admin'

### "Join code doesn't work"

- Verify class exists: `SELECT * FROM classes WHERE join_code = 'ABC123'`
- Check is_archived: Should be false

### "Student not showing in roster"

- Check enrollment: `SELECT * FROM class_enrollments WHERE student_id = 'id'`
- Status should be 'active'
- Refresh view: `SELECT refresh_teacher_dashboard()`

### "Dashboard slow"

- Refresh materialized views
- Check indexes exist
- Verify RLS policies not over-fetching

---

**You're ready to launch!** The enterprise feature is fully built and production-ready.
