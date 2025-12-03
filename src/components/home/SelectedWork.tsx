import { useEffect, useRef } from 'react';

let gsap: any;
let ScrollTrigger: any;

const projects = [
  { name: 'NINA RICCI', collection: 'SS26', location: 'PARIS', service: 'FITTINGS MANAGEMENT' },
  { name: 'LOUBOUTIN', collection: 'LOUBOUTIN SHOW', location: 'PARIS', service: 'PERFORMERS MANAGEMENT' },
  { name: 'JEAN PAUL GAULTIER', collection: 'SS26 "JUNIOR"', location: 'PARIS', service: 'FITTINGS MANAGEMENT' },
  { name: 'VICTORIA BECKHAM', collection: 'SS26', location: 'PARIS', service: 'FITTINGS PRODUCTION COORDINATION' },
  { name: 'ALAÏA', collection: 'WINTER/SPRING 26', location: 'PARIS', service: 'SHOW CALLING' },
  { name: 'MUGLER', collection: 'SS26', location: 'PARIS', service: 'DRESSERS' },
  { name: 'ISABEL MARANT', collection: 'SS26', location: 'PARIS', service: 'SHOOTING MANAGEMENT' },
  { name: 'GABRIELA HEARST', collection: 'SS26', location: 'PARIS', service: 'FITTINGS PRODUCTION' },
  { name: 'DIOR', collection: 'SS26', location: 'PARIS', service: 'SHOW CALLING ASSISTANCE' },
];

export const SelectedWork = () => {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const ScrollTriggerModule = await import('gsap/ScrollTrigger');
      
      gsap = gsapModule.default;
      ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Title Animation
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        gsap.fromTo(chars, 
          { y: '100%' },
          {
            y: '0%',
            duration: 0.8,
            stagger: 0.03,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
            }
          }
        );
      }

      // Rows Animation
      rowRefs.current.forEach((row, index) => {
        if (!row) return;

        gsap.fromTo(row,
          {
            x: '100%',
            opacity: 0
          },
          {
            x: '0%',
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              end: 'top 60%',
              toggleActions: 'play none none reverse',
              scrub: 0.5
            }
          }
        );
      });
    };

    initGSAP();

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, []);

  const title = "LATEST PROJECTS";

  return (
    <section id="latest-projects" className="w-full bg-theme md:py-24 p-4">
      {/* Title */}
      <div className="w-full px-4 mb-8 md:mb-12 pb-4 overflow-hidden -mx-4">
        {/* Mobile Title - 2 Rows */}
        <div className="md:hidden">
          <h2 className="text-[15vw] leading-none text-theme font-kode-mono flex flex-col">
            <span className="block">LATEST</span>
            <span className="block">PROJECTS</span>
          </h2>
        </div>

        {/* Desktop Title - Animated */}
        <h2 ref={titleRef} className="hidden md:flex text-[15vw] md:text-[12vw] lg:text-[10vw] leading-none text-theme flex-wrap overflow-hidden font-kode-mono">
          {title.split('').map((char, i) => (
            <span key={i} className="char inline-block transform translate-y-full will-change-transform">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>
      </div>

      {/* Projects List */}
      <div className="w-full">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={el => { rowRefs.current[index] = el }}
            className="group relative px-4 py-3 md:py-4 border-b border-theme last:border-b-0 overflow-hidden cursor-pointer will-change-transform"
          >
            {/* Hover Background - Clip Mask Effect */}
            <div className="absolute inset-0 bg-brand-yellow z-0 transition-transform duration-500 ease-out transform scale-y-0 group-hover:scale-y-100 origin-center will-change-transform" />

            {/* Content */}
            <div className="relative z-10">
              {/* Mobile Layout - Stacked */}
              <div className="md:hidden space-y-2">
                <div className="text-theme font-kode-mono text-xl leading-tight">
                  {project.name}
                </div>
                <div className="text-theme font-kode-mono text-base">
                  {project.collection}
                </div>
                <div className="text-theme font-kode-mono text-base">
                  {project.location}
                </div>
                <div className="text-theme font-kode-mono text-base flex items-center gap-2">
                  <span>•</span>
                  <span>{project.service}</span>
                  <svg className="w-5 h-5 ml-auto transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 will-change-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>

              {/* Desktop Layout - Grid */}
              <div className="hidden md:grid md:grid-cols-4 gap-4 items-center">
                <div className="text-theme font-kode-mono text-lg lg:text-xl">
                  {project.name}
                </div>
                <div className="text-theme font-kode-mono text-lg lg:text-xl">
                  {project.collection}
                </div>
                <div className="text-theme font-kode-mono text-lg lg:text-xl">
                  {project.location}
                </div>
                <div className="text-theme font-kode-mono text-lg lg:text-xl flex items-center justify-between">
                  <span>{project.service}</span>
                  <svg className="w-6 h-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 will-change-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
