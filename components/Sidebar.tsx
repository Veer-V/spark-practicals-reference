import React from 'react';
import { PRACTICALS } from '../constants';
import { Terminal, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeId: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, activeId }) => {
  const scrollToPractical = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-[#0f172a] text-white transform transition-transform duration-300 ease-in-out shadow-2xl lg:translate-x-0 lg:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Terminal size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Spark</h1>
              <span className="text-xs text-gray-400 font-mono">Reference Guide</span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 overflow-y-auto h-[calc(100%-88px)]">
          <ul className="space-y-1">
            {PRACTICALS.map((p) => {
              const isActive = activeId === p.id;
              return (
                <li key={p.id}>
                  <button
                    onClick={() => scrollToPractical(p.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 group ${isActive ? 'bg-blue-600 text-white font-medium shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                  >
                    <div className="flex items-start">
                      <span className={`mr-3 font-mono text-xs mt-0.5 ${isActive ? 'text-blue-200' : 'text-gray-600 group-hover:text-gray-500'}`}>
                        {p.title.split(' ')[1].padStart(2, '0')}
                      </span>
                      <span className="line-clamp-2">{p.subtitle}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#0f172a] border-t border-gray-800">
          <p className="text-xs text-center text-gray-500">
            &copy; {new Date().getFullYear()} Spark Practicals
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;