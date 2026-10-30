import React, { useEffect, useState } from 'react';

export default function Loader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Fast, crisp cinematic progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              if (onLoaded) onLoaded();
            }, 600);
          }, 200);
          return 100;
        }
        const step = Math.floor(Math.random() * 25) + 15;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div
      className="cinematic-loader"
      style={{
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? 'none' : 'auto'
      }}
      aria-hidden={isFading}
    >
      <div className="loader-emblem">
        <div className="loader-ring"></div>
        <div className="loader-ring-inner"></div>
        <span className="loader-monogram">GM</span>
      </div>

      <div className="loader-title">Gustavo Mendes</div>
      <div className="loader-bar-bg">
        <div className="loader-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

