import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Trash2, ArrowLeft, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SemesterGPA {
  id: string;
  name: string;
  gpa: string;
  credits: string;
}

function createSemEntry(index: number): SemesterGPA {
  return { id: crypto.randomUUID(), name: `Semester ${index}`, gpa: '', credits: '' };
}

export default function CGPACalculator() {
  const navigate = useNavigate();
  const [semesters, setSemesters] = useState<SemesterGPA[]>([createSemEntry(1)]);

  const updateSem = (index: number, field: keyof SemesterGPA, value: string) => {
    const next = [...semesters];
    next[index] = { ...next[index], [field]: value };
    setSemesters(next);
  };

  const removeSem = (index: number) => {
    setSemesters(semesters.filter((_, i) => i !== index));
  };

  const addSem = () => {
    setSemesters([...semesters, createSemEntry(semesters.length + 1)]);
  };

  // Calculate CGPA: Σ(GPA × credits) / Σ(credits)
  const validSems = semesters.filter(s => s.gpa && s.credits && !isNaN(Number(s.gpa)) && !isNaN(Number(s.credits)));
  const totalCredits = validSems.reduce((sum, s) => sum + Number(s.credits), 0);
  const weightedSum = validSems.reduce((sum, s) => sum + Number(s.gpa) * Number(s.credits), 0);
  const cgpa = totalCredits > 0 ? weightedSum / totalCredits : 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
              <ArrowLeft size={18} className="text-foreground" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">CGPA Calculator</h1>
              <p className="text-xs text-muted-foreground">Enter each semester's GPA & credits</p>
            </div>
          </div>
          <motion.div
            key={cgpa.toFixed(2)}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-right"
          >
            <div className="text-xs text-muted-foreground font-medium">CGPA</div>
            <div className="text-2xl font-bold text-primary font-['Space_Grotesk']">{cgpa.toFixed(2)}</div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="flex px-3 sm:px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border bg-muted/30">
            <span className="w-6 sm:w-8">#</span>
            <span className="flex-1">Semester</span>
            <span className="w-16 sm:w-24 text-center">GPA</span>
            <span className="w-16 sm:w-24 text-center">Credits</span>
            <span className="w-8 sm:w-10"></span>
          </div>

          <AnimatePresence mode="popLayout">
            {semesters.map((sem, i) => (
              <motion.div
                key={sem.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-1 sm:gap-3 px-3 sm:px-5 py-3 hover:bg-muted/30 transition-colors group"
              >
                <span className="w-6 sm:w-8 text-sm text-muted-foreground font-medium">{i + 1}</span>
                <input
                  type="text"
                  value={sem.name}
                  onChange={e => updateSem(i, 'name', e.target.value)}
                  className="bg-transparent flex-1 border-b border-transparent focus:border-primary outline-none text-sm py-1 text-foreground transition-colors min-w-0"
                />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  placeholder="8.5"
                  value={sem.gpa}
                  onChange={e => updateSem(i, 'gpa', e.target.value)}
                  className="bg-card w-16 sm:w-24 border border-border rounded-md px-1 sm:px-3 py-1.5 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none text-center"
                />
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  placeholder="23"
                  value={sem.credits}
                  onChange={e => updateSem(i, 'credits', e.target.value)}
                  className="bg-card w-16 sm:w-24 border border-border rounded-md px-1 sm:px-3 py-1.5 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none text-center"
                />
                <div className="w-8 sm:w-10 flex justify-end">
                  <button
                    onClick={() => removeSem(i)}
                    disabled={semesters.length <= 1}
                    className="opacity-100 sm:opacity-0 group-hover:opacity-100 disabled:opacity-0 text-muted-foreground hover:text-destructive transition-all p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button
          onClick={addSem}
          className="w-full py-4 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2 font-medium"
        >
          <Plus size={18} /> Add Semester
        </button>

        {validSems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-xl border border-border p-5 text-center"
          >
            <div className="text-sm text-muted-foreground mb-1">Your CGPA</div>
            <div className="text-4xl font-bold text-primary font-['Space_Grotesk']">{cgpa.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground mt-2">
              Based on {validSems.length} semester{validSems.length !== 1 ? 's' : ''} · {totalCredits} total credits
            </div>
          </motion.div>
        )}

        <footer className="text-center text-xs text-muted-foreground pb-8 pt-4">
          CGPA = Σ(GPA × Credits) / Σ(Credits)
        </footer>
      </main>
    </div>
  );
}
