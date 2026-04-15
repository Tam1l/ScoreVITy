import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, ArrowLeft, Calculator, BookOpen, Info, Save } from 'lucide-react';
import { Semester, calculateGPA, createSemester, createCourse } from '@/lib/gpa';
import SemesterCard from '@/components/SemesterCard';
import { getCookie, loadUserOptions, saveUserOptions } from '@/lib/userOptionsStore';
import { useNavigate } from 'react-router-dom';


export default function GPACalculator() {
  const navigate = useNavigate();
  // We initialize semesters immediately depending on if cookie useLastOptions is true
  const initialUseLast = getCookie('useLastOptions') === 'true';
  const initialOptions = initialUseLast ? loadUserOptions() : null;
  const initialSemesters = initialOptions?.gpaSemesters?.length ? initialOptions.gpaSemesters : [createSemester(1)];

  const [semesters, setSemesters] = useState<Semester[]>(initialSemesters);
  const [useLast, setUseLast] = useState<boolean>(initialUseLast);

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      setUseLast(customEvent.detail);
      if (customEvent.detail) {
        const prev = loadUserOptions() || {};
        saveUserOptions({ ...prev, gpaSemesters: semesters });
      }
    }
    window.addEventListener('optionsToggled', handleSync);
    return () => window.removeEventListener('optionsToggled', handleSync);
  }, [semesters]);

  useEffect(() => {
    if (useLast) {
      const prev = loadUserOptions() || {};
      saveUserOptions({ ...prev, gpaSemesters: semesters });
    }
  }, [semesters, useLast]);



  const totalCredits = semesters.flatMap(s => s.courses).reduce((sum, c) => sum + c.credits, 0);
  const totalCourses = semesters.flatMap(s => s.courses).length;

  const updateSemester = (index: number, sem: Semester) => {
    const next = [...semesters];
    next[index] = sem;
    setSemesters(next);
  };

  const removeSemester = (index: number) => {
    setSemesters(semesters.filter((_, i) => i !== index));
  };

  const addSemester = () => {
    setSemesters([...semesters, createSemester(semesters.length + 1)]);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
              <ArrowLeft size={18} className="text-foreground" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">GPA Calculator</h1>
              <p className="text-xs text-muted-foreground">Semester-wise grade calculation</p>
            </div>
          </div>

        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Courses', value: totalCourses, icon: BookOpen },
            { label: 'Credits', value: totalCredits, icon: Info },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground font-['Space_Grotesk']">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          {semesters.map((sem, i) => (
            <SemesterCard
              key={sem.id}
              semester={sem}
              onChange={s => updateSemester(i, s)}
              onRemove={() => removeSemester(i)}
              canRemove={semesters.length > 1}
            />
          ))}
        </AnimatePresence>

        <button
          onClick={addSemester}
          className="w-full py-4 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2 font-medium"
        >
          <Plus size={18} /> Add Semester
        </button>

        <footer className="text-center text-xs text-muted-foreground pb-8 pt-4">
          GPA = Σ(Credits × Grade Points) / Σ(Credits)
        </footer>
      </main>
    </div>
  );
}
