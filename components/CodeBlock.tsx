import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-gray-700 bg-[#1e1e1e] shadow-lg mt-4">
      {/* Header for code block (optional aesthetic touch) */}
      <div className="flex justify-between items-center px-4 py-2 bg-[#2d2d2d] border-b border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-xs text-gray-400 font-mono">Python / PySpark</div>
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-12 right-4 p-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 backdrop-blur-sm"
        aria-label="Copy code"
        title="Copy code"
      >
        {copied ? (
          <Check size={18} className="text-green-400" />
        ) : (
          <Copy size={18} />
        )}
      </button>

      {/* Code Content */}
      <div className="overflow-x-auto p-4">
        <pre className="text-sm font-mono leading-relaxed text-gray-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;