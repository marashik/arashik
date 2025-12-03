
import React from 'react';

interface RichTextProps {
  text: string;
  className?: string;
}

export const RichText: React.FC<RichTextProps> = ({ text, className = "" }) => {
  if (!text) return null;

  // Regex to split text by markdown link pattern: [Link Text](URL)
  const regex = /(\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Check if this specific part matches the link pattern
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        
        if (match) {
          const [_, linkText, url] = match;
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-academic-gold font-bold hover:underline hover:text-academic-navy dark:hover:text-white transition-colors decoration-2 underline-offset-2"
              onClick={(e) => e.stopPropagation()} // Prevent clicking parent containers (like cards)
            >
              {linkText}
            </a>
          );
        }
        
        // Return normal text
        return part;
      })}
    </span>
  );
};
