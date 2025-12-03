
import React from 'react';
import * as LucideIcons from 'lucide-react';

export const DynamicIcon = ({ name, size = 20, className = "" }: { name?: string, size?: number, className?: string }) => {
  if (!name) return <LucideIcons.HelpCircle size={size} className={className} />;
  
  // Access icon from the imported namespace
  const IconComponent = (LucideIcons as any)[name];
  
  if (!IconComponent) {
      // Fallback if icon name doesn't exist
      return <LucideIcons.Circle size={size} className={className} />;
  }
  
  return <IconComponent size={size} className={className} />;
};
