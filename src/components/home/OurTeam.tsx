import { useEffect, useRef } from 'react';

let gsap: any;
let ScrollTrigger: any;

const teamMembers = [
  {
    name: 'MYRIAM ETTAYEB',
    role: 'FOUNDER & CREATIVE DIRECTOR',
    description: 'With a background in business management, Myriam combines structure with creativity, guiding each project with precision and a human touch.'
  },
  {
    name: 'REBECA PIMENTEL',
    role: 'HEAD OF STRATEGY',
    description: 'A graduate in Fashion Business (Marketing & Management) from ESMOD ISEM in Paris, Rebeca has been working in the fashion industry since 2011.'
  },
  {
    name: 'SHEILA GOMIS',
    role: 'ART DIRECTOR',
    description: 'With over a decade of experience, Sheila began her career as a collection coordinator before moving into fashion show production.'
  }
];

export const OurTeam = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

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

      // Image Animation
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { scale: 1.1, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%',
            }
          }
        );
      }

      // Description Animation
      if (descRef.current) {
        gsap.fromTo(descRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: descRef.current,
              start: 'top 70%',
            }
          }
        );
      }

      // Team Grid Animation
      if (teamRef.current) {
        gsap.fromTo(teamRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: teamRef.current,
              start: 'top 85%', // Trigger slightly later as it's lower down
            }
          }
        );
      }
    };

    initGSAP();

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, []);

  const title = "OUR TEAM";

  return (
    <section id="team" ref={containerRef} className="w-full min-h-dvh p-4 md:py-24 bg-theme grid grid-cols-1 md:grid-cols-2 md:grid-rows-[1fr_auto] gap-4 overflow-hidden">
      
      {/* Block A: Title & Main Description */}
      <div className="flex flex-col md:col-start-1 md:row-start-1">
        {/* Title */}
        <div className="mb-8 md:mb-0">
          <h2 ref={titleRef} className="text-[15vw] md:text-[8vw] leading-[0.8] text-theme font-kode-mono uppercase break-words">
            {title.split('').map((char, i) => (
              <span key={i} className="char inline-block transform translate-y-full will-change-transform">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
        </div>

        {/* Main Description */}
        <div ref={descRef} className="mt-12 max-w-xl space-y-6 text-theme font-kode-mono text-lg md:text-xl">
          <p>
            W3DSIGN was founded in 2021 by Myriam Ettayeb, Rebeca Pimentel, and Sheila Gomis, 
            building on over a decade of experience in the fashion and luxury industry.
          </p>
          <p>
            Our story is one of three creative minds who bring inclusivity, 
            integrity, and respect to everything we create.
          </p>
        </div>
      </div>

      {/* Block B: Image */}
      <div className="w-full h-[50vh] md:h-full md:col-start-2 md:row-start-1 md:row-span-2 relative overflow-hidden">
        <div ref={imageRef} className="w-full h-full">
          <img 
            src="/team_portrait.png" 
            alt="Our Team" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>

      {/* Block C: Team Grid */}
      <div className="md:col-start-1 md:row-start-2">
        <div ref={teamRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="space-y-2">
              <span className="block text-theme font-kode-mono text-sm mb-4">-</span>
              <h3 className="text-theme font-kode-mono text-lg uppercase font-bold">
                {member.name}
              </h3>
              <p className="text-theme font-kode-mono text-sm opacity-80 leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
