import { Zap, Github, Home, Sparkles, PlayCircle, Users, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/app/utils/Context';

export const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="fixed z-50 w-full px-4 md:px-10 transition-all duration-300 bottom-4 md:top-4 md:bottom-auto bg-transparent left-1/2 -translate-x-1/2">
      <div className="mx-auto max-w-5xl">
        <div className="flex h-12 items-center justify-between rounded-full border border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2 group">
              <Zap className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
              <span className="font-bold inline" style={{fontFamily: "var(--font-orbitron)"}}>ProjectX</span>
            </a>
          </div>
          
          <nav className="flex items-center space-x-6">
            <a href="/" className="text-sm font-medium transition-colors hover:text-primary">
              <Home className="h-5 w-5 md:hidden" />
              <span className="hidden md:inline">Home</span>
            </a>
            <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              <Sparkles className="h-5 w-5 md:hidden" />
              <span className="hidden md:inline">Features</span>
            </a>
            <a href="#demo" className="text-sm font-medium transition-colors hover:text-primary">
              <PlayCircle className="h-5 w-5 md:hidden" />
              <span className="hidden md:inline">Demo</span>
            </a>
            <a href="#team" className="text-sm font-medium transition-colors hover:text-primary">
              <Users className="h-5 w-5 md:hidden" />
              <span className="hidden md:inline">Team</span>
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center text-sm font-medium transition-colors hover:text-primary"
            >
              <Github className="h-5 w-5" />
              <span className="hidden md:inline ml-2">GitHub</span>
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};