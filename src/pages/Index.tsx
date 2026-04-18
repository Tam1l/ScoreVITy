import { motion } from 'framer-motion';
import { Calculator, BarChart3, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ThemeToggle />
      <header className="bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-5 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-3">
            <Calculator size={24} className="text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">VIT GPA Calculator</h1>
          <p className="text-sm text-muted-foreground mt-1">Calculate your GPA or CGPA instantly</p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/gpa')}
            className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-primary/50 hover:shadow-lg transition-all text-left group"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Calculator size={28} className="text-primary" />
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">GPA Calculator</div>
              <p className="text-sm text-muted-foreground mt-1">Calculate your semester GPA from individual course grades & credits</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/cgpa')}
            className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-primary/50 hover:shadow-lg transition-all text-left group"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <BarChart3 size={28} className="text-primary" />
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">CGPA Calculator</div>
              <p className="text-sm text-muted-foreground mt-1">Calculate your overall CGPA from semester-wise GPAs & credits</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/target-cgpa')}
            className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-primary/50 hover:shadow-lg transition-all text-left group"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Target size={28} className="text-primary" />
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">Target CGPA</div>
              <p className="text-sm text-muted-foreground mt-1">Find what GPA you need to reach your desired CGPA</p>
            </div>
          </motion.button>
        </div>
      </main>

      <footer className="text-center text-xs text-muted-foreground pb-6">
        <p className="mt-1"> By  7s </p>
      </footer>
    </div>
  );
}
