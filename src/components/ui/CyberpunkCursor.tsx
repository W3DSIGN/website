import { useEffect } from 'react';

export const CyberpunkCursor = () => {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'cyberpunk-cursor';
    document.body.appendChild(cursor);

    const trail: HTMLDivElement[] = [];
    const trailLength = 8;

    // Create trail elements with blur
    for (let i = 0; i < trailLength; i++) {
      const trailElement = document.createElement('div');
      trailElement.className = 'cursor-trail';
      trailElement.style.filter = `blur(${i * 0.5}px)`;
      trailElement.style.opacity = `${1 - (i / trailLength) * 0.7}`;
      cursor.appendChild(trailElement);
      trail.push(trailElement);
    }

    // Create center pixel cluster
    const centerCluster = document.createElement('div');
    centerCluster.className = 'cursor-center';
    cursor.appendChild(centerCluster);

    for (let i = 0; i < 4; i++) {
      const pixel = document.createElement('div');
      pixel.className = 'center-pixel';
      centerCluster.appendChild(pixel);
    }

    let mouseX = 0;
    let mouseY = 0;
    const positions: { x: number; y: number }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Store position for trail
      positions.unshift({ x: mouseX, y: mouseY });
      if (positions.length > trailLength) {
        positions.pop();
      }
    };

    const animateCursor = () => {
      // Position cursor directly at mouse (no smooth following)
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      // Update trail positions
      trail.forEach((element, index) => {
        if (positions[index]) {
          const offset = index * 8;
          element.style.transform = `translate(${positions[index].x - mouseX}px, ${positions[index].y - mouseY}px)`;
        }
      });

      // Animate center pixels
      const pixels = centerCluster.querySelectorAll('.center-pixel');
      pixels.forEach((pixel, index) => {
        const angle = (index / 4) * Math.PI * 2 + Date.now() * 0.003;
        const distance = 6 + Math.sin(Date.now() * 0.004 + index) * 3;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const size = 4 + Math.sin(Date.now() * 0.006 + index * 0.8) * 2;
        
        (pixel as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
        (pixel as HTMLElement).style.width = `${size}px`;
        (pixel as HTMLElement).style.height = `${size}px`;
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
