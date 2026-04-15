import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Course, GRADES, CREDITS, Grade, Credit } from '@/lib/gpa';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
      <Select value={course.grade} onValueChange={val => onChange({ ...course, grade: val as Grade })}>
        <SelectTrigger className={`w-16 sm:w-24 border border-border bg-card px-1 sm:px-2 py-1.5 h-auto rounded-md text-sm font-semibold ${gradeColorMap[course.grade]} focus:ring-2 focus:ring-ring focus:ring-offset-0 focus:outline-none transition-colors`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          {GRADES.map(g => (
            <SelectItem key={g} value={g}>{g}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={course.credits.toString()} onValueChange={val => onChange({ ...course, credits: Number(val) as Credit })}>
        <SelectTrigger className="w-16 sm:w-24 border border-border bg-card px-1 sm:px-2 py-1.5 h-auto rounded-md text-sm text-foreground focus:ring-2 focus:ring-ring focus:ring-offset-0 focus:outline-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          {CREDITS.map(c => (
            <SelectItem key={c} value={c.toString()}>{c} cr</SelectItem>
          ))}
        </SelectContent>
      </Select>
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
