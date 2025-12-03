import React, { useEffect } from 'react';
import { Check, Info, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <Check size={18} className="text-green-500" />,
    info: <Info size={18} className="text-blue-500" />,
    error: <AlertCircle size={18} className="text-red-500" />
  };

  const bgColors = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
  };

  return (
    <div className={`fixed top-24 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border animate-in slide-in-from-right-10 duration-300 ${bgColors[type]}`}>
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{message}</p>
      <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
        <X size={14} />
      </button>
    </div>
  );
};