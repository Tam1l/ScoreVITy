import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TargetCGPA() {
  const navigate = useNavigate();
  const [currentCGPA, setCurrentCGPA] = useState('');
  const [completedCredits, setCompletedCredits] = useState('');
  const [targetCGPA, setTargetCGPA] = useState('');
  const [upcomingCredits, setUpcomingCredits] = useState('');

  const curr = Number(currentCGPA);
  const done = Number(completedCredits);
  const target = Number(targetCGPA);
  const upcoming = Number(upcomingCredits);

  const allValid = curr >= 0 && curr <= 10 && done > 0 && target >= 0 && target <= 10 && upcoming > 0;
  const requiredGPA = allValid ? (target * (done + upcoming) - curr * done) / upcoming : null;

  const isAchievable = requiredGPA !== null && requiredGPA >= 0 && requiredGPA <= 10;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate('/')} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground leading-tight">Target CGPA Planner</h1>
            <p className="text-xs text-muted-foreground">Find the GPA you need to reach your goal</p>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target size={20} className="text-primary" />
            </div>
            <div>
              <div className="font-semibold text-foreground">Enter your details</div>
              <div className="text-xs text-muted-foreground">We'll calculate the GPA you need</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Current CGPA</label>
              <input
                type="number" step="0.01" min="0" max="10" placeholder="e.g. 8.5"
                value={currentCGPA} onChange={e => setCurrentCGPA(e.target.value)}
                className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Credits Completed So Far</label>
              <input
                type="number" step="0.5" min="0" placeholder="e.g. 80"
                value={completedCredits} onChange={e => setCompletedCredits(e.target.value)}
                className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Target CGPA</label>
              <input
                type="number" step="0.01" min="0" max="10" placeholder="e.g. 9.0"
                value={targetCGPA} onChange={e => setTargetCGPA(e.target.value)}
                className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Current / Upcoming Semester Credits</label>
              <input
                type="number" step="0.5" min="0" placeholder="e.g. 23"
                value={upcomingCredits} onChange={e => setUpcomingCredits(e.target.value)}
                className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring outline-none"
              />
            </div>
          </div>
        </div>

        {allValid && requiredGPA !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl border border-border p-6 text-center"
          >
            {isAchievable ? (
              <>
                <div className="text-sm text-muted-foreground mb-1">Required GPA Next Semester</div>
                <div className={`text-4xl font-bold font-['Space_Grotesk'] ${requiredGPA <= 7 ? 'text-grade-s' : requiredGPA <= 9 ? 'text-primary' : 'text-grade-e'}`}>
                  {requiredGPA.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground mt-3">
                  You need a GPA of <span className="font-semibold text-foreground">{requiredGPA.toFixed(2)}</span> in your next <span className="font-semibold text-foreground">{upcoming}</span> credits to achieve a CGPA of <span className="font-semibold text-foreground">{target}</span>
                </div>
              </>
            ) : (
              <>
                <div className="text-sm text-destructive font-medium mb-1">Not Achievable</div>
                <div className="text-xs text-muted-foreground mt-2">
                  {requiredGPA > 10
                    ? `You'd need a GPA of ${requiredGPA.toFixed(2)}, which exceeds the max of 10. Try adding more upcoming credits or lowering your target.`
                    : `The required GPA is negative, meaning you've already exceeded your target!`}
                </div>
              </>
            )}
          </motion.div>
        )}

        <footer className="text-center text-xs text-muted-foreground pb-8 pt-4">
          Required GPA = (Target × Total Credits − Current CGPA × Done Credits) / Upcoming Credits
        </footer>
      </main>
    </div>
  );
}
