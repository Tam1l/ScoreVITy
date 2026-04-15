import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { Semester, Course, calculateGPA, createCourse } from '@/lib/gpa';
import CourseRow from './CourseRow';

interface Props {
  semester: Semester;
  onChange: (semester: Semester) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export default function SemesterCard({ semester, onChange, onRemove, canRemove }: Props) {
  const gpa = calculateGPA(semester.courses);
  const totalCredits = semester.courses.reduce((s, c) => s + c.credits, 0);

  const updateCourse = (index: number, course: Course) => {
    const courses = [...semester.courses];
    courses[index] = course;
    onChange({ ...semester, courses });
  };

  const removeCourse = (index: number) => {
    onChange({ ...semester, courses: semester.courses.filter((_, i) => i !== index) });
  };

  const addCourse = () => {
    onChange({ ...semester, courses: [...semester.courses, createCourse()] });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <GraduationCap size={16} className="text-primary" />
          </div>
          <input
            type="text"
            value={semester.name}
            onChange={e => onChange({ ...semester, name: e.target.value })}
            className="bg-transparent font-semibold text-foreground outline-none text-base"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-muted-foreground">{totalCredits} credits</div>
            <div className="text-lg font-bold text-primary font-['Space_Grotesk']">{gpa.toFixed(2)}</div>
          </div>
          {canRemove && (
            <button onClick={onRemove} className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-md hover:bg-destructive/10">
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="px-2 sm:px-3 py-2">
        <div className="flex px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <span className="w-6 sm:w-8">#</span>
          <span className="flex-1">Course</span>
          <span className="w-16 sm:w-24 text-center">Grade</span>
          <span className="w-16 sm:w-24 text-center">Credits</span>
          <span className="w-8 sm:w-10"></span>
        </div>

        <AnimatePresence mode="popLayout">
          {semester.courses.map((course, i) => (
            <CourseRow
              key={course.id}
              course={course}
              index={i}
              onChange={c => updateCourse(i, c)}
              onRemove={() => removeCourse(i)}
              canRemove={semester.courses.length > 1}
            />
          ))}
        </AnimatePresence>

        <button
          onClick={addCourse}
          className="w-full mt-2 mb-2 py-2 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-1.5"
        >
          <Plus size={14} /> Add Course
        </button>
      </div>
    </motion.div>
  );
}
