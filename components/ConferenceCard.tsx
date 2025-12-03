
import React from 'react';
import { useData } from '../context/DataContext';
import { X, QrCode, Copy, Check } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ConferenceCard: React.FC<Props> = ({ isOpen, onClose }) => {
  const { profile } = useData();
  const [copied, setCopied] = React.useState(false);
  const currentUrl = window.location.href;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}&color=0A1931&bgcolor=D4AF37`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all">
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
        >
            <X size={20} />
        </button>

        {/* Card Header */}
        <div className="bg-academic-navy p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:10px_10px]"></div>
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full border-4 border-academic-gold overflow-hidden mb-4 shadow-lg">
                    <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1 font-serif">{profile.name}</h2>
                <p className="text-academic-gold text-sm font-medium tracking-wide uppercase">{profile.titles[0]}</p>
            </div>
        </div>

        {/* QR Section */}
        <div className="p-8 flex flex-col items-center bg-academic-ivory">
            <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-100 mb-6">
                <img src={qrUrl} alt="Scan QR Code" className="w-48 h-48 mix-blend-multiply" />
            </div>
            
            <p className="text-gray-500 text-sm mb-6 text-center">Scan to save contact or view portfolio</p>

            <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-academic-navy font-bold hover:bg-gray-50 transition-colors shadow-sm w-full justify-center"
            >
                {copied ? <Check size={18} className="text-green-500"/> : <Copy size={18} />}
                {copied ? "Link Copied!" : "Copy Portfolio Link"}
            </button>
        </div>
        
        <div className="bg-gray-50 p-4 flex justify-center border-t border-gray-100">
            <Logo className="w-8 h-8 opacity-50 grayscale" />
        </div>
      </div>
    </div>
  );
};
