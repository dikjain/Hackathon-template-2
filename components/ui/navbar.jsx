import { Zap, Github, Home, Sparkles, PlayCircle, Users, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/app/utils/Context';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4 sm:h-5 sm:w-5 md:hidden" /> },
    { href: "/dashboard", label: "Dashboard", icon: <Home className="h-4 w-4 sm:h-5 sm:w-5 md:hidden" /> },
    { href: "/chatbot", label: "Chatbot", icon: <Home className="h-4 w-4 sm:h-5 sm:w-5 md:hidden" /> },
    // { href: "#team", label: "Team", icon: <Users className="h-5 w-5 md:hidden" /> },
    { 
      href: "https://github.com/dikjain/Hackathon-template-2", 
      label: "GitHub", 
      icon: <Github className="h-4 w-4 sm:h-5 sm:w-5" />,
      isExternal: true,
      className: "inline-flex items-center justify-center"
    }
  ];

  return (
    <header className="fixed z-50 w-full px-2 sm:px-4 md:px-10 transition-all duration-300 bottom-2 sm:bottom-4 md:top-4 md:bottom-auto bg-transparent left-1/2 -translate-x-1/2">
      <div className="mx-auto max-w-5xl">
        <div className="flex h-10 sm:h-12 items-center justify-between rounded-full border border-border/40 bg-background/95 px-2 sm:px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-1 sm:space-x-2 group">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
              <span className="text-xs sm:text-sm font-bold inline" style={{fontFamily: "var(--font-orbitron)"}}>ProjectX</span>
            </a>
          </div>
          
          <nav className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href} 
                className={`text-xs sm:text-sm font-medium transition-colors hover:text-primary ${link.className || ''}`}
                {...(link.isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {link.icon}
                <span className={`${link.isExternal ? 'ml-1 sm:ml-2' : ''} ${link.label === 'GitHub' ? '' : 'hidden'} md:inline`}>{link.label}</span>
              </Link>
            ))}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`flex items-center justify-center rounded-full ${theme === 'dark' ? 'bg-indigo-900/60' : 'bg-indigo-100'}`}
            >
              <button
                onClick={toggleTheme}
                className="p-1 sm:p-2 cursor-pointer rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </motion.div>
          </nav>
        </div>
      </div>
    </header>
  );
};