import React from 'react';
import { Practical } from '../types';
import CodeBlock from './CodeBlock';
import { ChevronRight } from 'lucide-react';

interface PracticalCardProps {
  practical: Practical;
  highlightTerm?: string;
}

// Helper component to highlight text safely
const HighlightedText: React.FC<{ text: string; term: string }> = ({ text, term }) => {
  if (!term || !term.trim()) return <>{text}</>;

  // Escape special regex characters
  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedTerm})`, 'gi'));

  return (
    <>
      {parts.map((part, index) => 
        part.toLowerCase() === term.toLowerCase() ? (
          <span key={index} className="bg-yellow-200 dark:bg-yellow-900/60 text-gray-900 dark:text-yellow-100 px-0.5 rounded shadow-sm">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

const PracticalCard: React.FC<PracticalCardProps> = ({ practical, highlightTerm = '' }) => {
  return (
    <div 
      id={practical.id} 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8 scroll-mt-24 transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-900/30"
    >
      <div className="p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-2">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider rounded-full">
            {practical.title}
          </span>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          <HighlightedText text={practical.subtitle} term={highlightTerm} />
        </h2>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Steps to Follow
          </h3>
          <ul className="space-y-2">
            {practical.steps.map((step, index) => (
              <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                <ChevronRight size={18} className="text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <HighlightedText text={step} term={highlightTerm} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Solution Code
            </h3>
          </div>
          <CodeBlock code={practical.code} />
        </div>
      </div>
    </div>
  );
};

export default PracticalCard;