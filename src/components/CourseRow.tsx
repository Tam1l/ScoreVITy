import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Course, GRADES, CREDITS, GRADE_POINTS, Grade, Credit } from '@/lib/gpa';

interface Props {
  course: Course;
  index: number;
  onChange: (course: Course) => void;
  onRemove: () => void;
  canRemove: boolean;
}

const gradeColorMap: Record<Grade, string> = {
  S: 'text-grade-s', A: 'text-grade-a', B: 'text-grade-b',
  C: 'text-grade-c', D: 'text-grade-d', E: 'text-grade-e', F: 'text-grade-f',
};

export default function CourseRow({ course, index, onChange, onRemove, canRemove }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-1 sm:gap-3 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors group"
    >
      <span className="text-muted-foreground w-6 sm:w-8 text-sm font-medium">{index + 1}</span>
      <input
        type="text"
        placeholder="Course name (optional)"
        value={course.name}
        onChange={e => onChange({ ...course, name: e.target.value })}
        className="bg-transparent flex-1 border-b border-transparent focus:border-primary outline-none text-sm py-1 text-foreground placeholder:text-muted-foreground/50 transition-colors min-w-0"
      />
      <select
        value={course.grade}
        onChange={e => onChange({ ...course, grade: e.target.value as Grade })}
        className={`bg-card w-16 sm:w-24 border border-border rounded-md px-1 sm:px-2 py-1.5 text-sm font-semibold ${gradeColorMap[course.grade]} focus:ring-2 focus:ring-ring outline-none cursor-pointer transition-colors`}
      >
        {GRADES.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
      <select
        value={course.credits}
        onChange={e => onChange({ ...course, credits: Number(e.target.value) as Credit })}
        className="bg-card w-16 sm:w-24 border border-border rounded-md px-1 sm:px-2 py-1.5 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none cursor-pointer"
      >
        {CREDITS.map(c => (
          <option key={c} value={c}>{c} cr</option>
        ))}
      </select>
      <div className="w-8 sm:w-10 flex justify-end">
        <button
          onClick={onRemove}
          disabled={!canRemove}
          className="opacity-100 sm:opacity-0 group-hover:opacity-100 disabled:opacity-0 text-muted-foreground hover:text-destructive transition-all p-1"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}
