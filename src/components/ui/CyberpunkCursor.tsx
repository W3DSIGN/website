import { useEffect } from 'react';

export const CyberpunkCursor = () => {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'cyberpunk-cursor';
    document.body.appendChild(cursor);

    const pixels: HTMLDivElement[] = [];
    const pixelCount = 12;

    // Create pixel elements
    for (let i = 0; i < pixelCount; i++) {
      const pixel = document.createElement('div');
      pixel.className = 'cursor-pixel';
      cursor.appendChild(pixel);
      pixels.push(pixel);
    }

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      // Smooth follow
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

      // Animate pixels
      pixels.forEach((pixel, index) => {
        const angle = (index / pixelCount) * Math.PI * 2 + Date.now() * 0.002;
        const distance = 15 + Math.sin(Date.now() * 0.003 + index) * 8;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        const size = 3 + Math.sin(Date.now() * 0.005 + index * 0.5) * 2;
        
        pixel.style.transform = `translate(${x}px, ${y}px)`;
        pixel.style.width = `${size}px`;
        pixel.style.height = `${size}px`;
      });

      requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cursor.remove();
    };
  }, []);

  return null;
};
