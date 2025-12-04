import { useEffect, useRef } from 'react';

let gsap: any;
let ScrollTrigger: any;

export const Footer = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const ScrollTriggerModule = await import('gsap/ScrollTrigger');
      
      gsap = gsapModule.default;
      ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Simple fade in for the footer content
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
          }
        }
      );
    };

    initGSAP();

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, []);

  return (
    <footer ref={containerRef} className="w-full bg-theme py-12 px-4 md:px-8">
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 text-theme font-kode-mono text-sm md:text-base uppercase tracking-wide">
        
        {/* Left: Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="opacity-50 text-xs">
            ©W3DSIGN Agency - 2025
          </div>
        </div>

        {/* Center: Instagram */}
        <div className="order-first md:order-none">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <span>↗</span> Instagram
          </a>
        </div>

        {/* Right: Legal */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <a href="/legal" className="hover:opacity-70 transition-opacity">
            Legal Notice
          </a>
        </div>

      </div>
    </footer>
  );
};
