
import React, { useState, useEffect } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, ...props }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    let didCancel = false;

    if (imageRef && imageSrc === null) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          }
        );
        observer.observe(imageRef);
      } else {
        // Fallback for older browsers
        setImageSrc(src);
      }
    }

    return () => {
      didCancel = true;
      if (observer && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]);

  return (
    <div className={`relative overflow-hidden bg-gray-200 dark:bg-slate-800 ${className}`}>
      <img
        ref={setImageRef}
        src={imageSrc || ''}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${imageSrc ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...props}
      />
      {!imageSrc && (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-academic-gold/30 border-t-academic-gold rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};
