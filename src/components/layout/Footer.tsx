import { useEffect, useRef, useState } from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const ScrollTriggerModule = await import('gsap/ScrollTrigger');
      
      const gsap = gsapModule.default;
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Parallax Image Effect
      if (containerRef.current && imageRef.current) {
        gsap.to(imageRef.current, {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      // Block Entrance Animation (Clipping Mask)
      if (containerRef.current) {
        gsap.fromTo(containerRef.current,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 90%',
            }
          }
        );
      }
    };

    initGSAP();
  }, []);

  return (
    <footer id="contact" ref={containerRef} className="w-full h-dvh bg-theme relative flex flex-col overflow-hidden snap-start">
      
      {/* Top Section: Image & "LET'S DESIGN" */}
      <div className="relative h-[55%] w-full overflow-hidden">
        {/* Parallax Image */}
        <div className="absolute inset-0 w-full h-[120%] -mt-[5%]">
          <img 
            ref={imageRef}
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2940&auto=format&fit=crop" 
            alt="Footer Background" 
            className="w-full h-full object-cover grayscale"
          />
        </div>

        {/* "LET'S DESIGN" Box - Overlapping Image */}
        <div className="absolute bottom-0 left-0 bg-theme pt-4 pr-8 z-10">
           <div className="px-4 md:px-8 lg:px-16">
            <h2 className="text-[12vw] md:text-[8vw] leading-[0.8] font-kode-mono uppercase text-theme tracking-tighter">
              <span className="overflow-hidden inline-block block">
                <span className="reveal-text inline-block">LET'S DESIGN</span>
              </span>
            </h2>
           </div>
        </div>
      </div>

      {/* Bottom Section: "YOUR NEXT..." & Links */}
      <div className="h-[45%] bg-theme w-full flex flex-col justify-between px-4 md:px-8 lg:px-16 pb-8 z-10">
        
        {/* Main Headline Continued */}
        <div ref={textRef} className="w-full pt-2">
          <h2 className="text-[12vw] md:text-[8vw] leading-[0.8] font-kode-mono uppercase text-theme tracking-tighter flex flex-wrap gap-x-[0.2em]">
            <span className="overflow-hidden inline-block"><span className="reveal-text inline-block">YOUR</span></span>
            <span className="overflow-hidden inline-block"><span className="reveal-text inline-block">NEXT</span></span>
            <span className="overflow-hidden inline-block"><span className="reveal-text inline-block">BRAND</span></span>
          </h2>
        </div>

        {/* Links Section */}
        <div className="w-full flex flex-col gap-8 md:gap-12">
          
          {/* Top Row: Links */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-8 border-t border-theme/20 pt-6">
            
            {/* Instagram */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-theme font-kode-mono text-lg hover:opacity-60 transition-opacity">
                Instagram
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <a href="tel:+33631078079" className="text-theme font-kode-mono text-lg hover:opacity-60 transition-opacity whitespace-nowrap">
                +33 631 078 079
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <a href="mailto:contact@w3dsign.com" className="text-theme font-kode-mono text-lg hover:opacity-60 transition-opacity">
                contact@w3dsign.com
              </a>
            </div>

          </div>

          {/* Bottom Row: Copyright */}
          <div className="flex justify-between items-end text-xs md:text-sm font-kode-mono text-theme/60 uppercase">
            <div>©W3DSIGN Agency - {currentYear}</div>
            <div className="flex gap-8">
              <a href="/legal" className="hover:opacity-100 transition-opacity">Legal Notice</a>
              <span className="hidden md:inline">Credits</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
