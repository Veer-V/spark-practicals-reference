import React, { useState, useEffect } from 'react';
import { PRACTICALS } from './constants';
import Sidebar from './components/Sidebar';
import PracticalCard from './components/PracticalCard';
import { Menu, Search, Moon, Sun } from 'lucide-react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Initialize dark mode from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply theme class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Intersection Observer to track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px', // Trigger when element is near top
        threshold: 0
      }
    );

    PRACTICALS.forEach((p) => {
      const element = document.getElementById(p.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const filteredPracticals = PRACTICALS.filter(p => 
    p.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.steps.some(step => step.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-300">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        activeId={activeId}
      />

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3 md:px-8 flex items-center justify-between transition-colors duration-300">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="mr-4 p-2 -ml-2 rounded-md lg:hidden text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
              Spark Labs
            </h1>
          </div>

          <div className="flex-1 max-w-xl ml-4 md:ml-8 flex items-center space-x-4">
            <div className="relative group flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search practicals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 sm:text-sm"
              />
            </div>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
          {filteredPracticals.length > 0 ? (
            filteredPracticals.map((practical) => (
              <PracticalCard 
                key={practical.id} 
                practical={practical} 
                highlightTerm={searchTerm}
              />
            ))
          ) : (
            <div className="text-center py-20">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-colors">
                <Search size={32} className="text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No practicals found</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search terms.</p>
            </div>
          )}
          
          <div className="h-24"></div> {/* Bottom spacer */}
        </div>
      </main>
    </div>
  );
}

export default App;