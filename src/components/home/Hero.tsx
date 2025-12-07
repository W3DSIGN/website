import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuRef.current && menuContentRef.current) {
      if (isMenuOpen) {
        // Open animation
        gsap.to(menuRef.current, {
          clipPath: 'inset(0 0 0 0%)',
          duration: 0.8,
          ease: 'power3.inOut'
        });
        
        const items = menuContentRef.current.children;
        gsap.fromTo(items, 
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.3,
            ease: 'power3.out'
          }
        );
      } else {
        // Close animation
        gsap.to(menuRef.current, {
          clipPath: 'inset(0 0 0 100%)',
          duration: 0.8,
          ease: 'power3.inOut'
        });
      }
    }
  }, [isMenuOpen]);

  useEffect(() => {
    // Elements
    const logoWrapper = document.querySelector('.logo-wrapper');
    const logoImg = document.querySelector('.logo-img');
    const marquee = document.querySelector('.marquee-container');
    const taglineRows = document.querySelectorAll('.tagline-row');
    const imageMasks = document.querySelectorAll('.image-mask');
    const imageContainer = document.querySelector('.hero-image-container');
    const menuButton = document.querySelector('.menu-button');

    if (logoWrapper && logoImg && marquee && imageContainer && menuButton) {
      const tl = gsap.timeline({ delay: 0.2 });

      // 1. Image & Tagline appear together
      tl.add('start')
        .to(imageMasks, {
          scaleY: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.inOut',
          transformOrigin: 'top'
        }, 'start')
        .fromTo(taglineRows,
          { clipPath: 'inset(100% 0 0 0)', y: '100%' },
          {
            clipPath: 'inset(0% 0 0 0)',
            y: '0%',
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out'
          },
          'start+=0.2'
        )

      // 2. White container (wrapper) appears Left to Right - Starts 1s before image/tagline ends
      .fromTo(logoWrapper,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power3.inOut'
        },
        "-=1.0" // Overlap by 1 second with previous animation
      )

      // 3. Logo & Marquee appear together
      .add('logoReveal')
      .fromTo(logoImg,
        { clipPath: 'inset(100% 0 0 0)', y: '100%' },
        {
          clipPath: 'inset(0% 0 0 0)',
          y: '0%',
          duration: 0.8,
          ease: 'power3.out'
        },
        'logoReveal-=0.2'
      )
      .fromTo(marquee,
        { clipPath: 'inset(100% 0 0 0)', y: '100%' },
        {
          clipPath: 'inset(0% 0 0 0)',
          y: '0%',
          duration: 0.8,
          ease: 'power3.out'
        },
        'logoReveal-=0.2'
      )

      // 4. Menu Button Slide Down
      .fromTo(menuButton,
        { y: '-100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out'
        },
        "-=0.4"
      );
    }
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2, ease: 'power1.out' });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: 'power1.out' });
  };

  return (
    <>
      {/* Fixed Menu Button */}
      <div 
        onClick={() => setIsMenuOpen(true)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`menu-button fixed top-0 right-4 bg-black p-4 flex items-center justify-center text-white text-sm lg:text-base z-50 cursor-pointer hover:bg-gray-900 transition-colors uppercase tracking-wider will-change-transform ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        Menu
      </div>

      {/* Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed top-0 right-0 w-full md:w-[50vw] lg:w-[40vw] h-dvh bg-black z-60 flex flex-col p-8 md:p-12 lg:p-16 justify-between will-change-[clip-path]"
        style={{ clipPath: 'inset(0 0 0 100%)' }}
      >
        {/* Close Button */}
        <div className="w-full flex justify-end mb-12">
          <button 
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={(e) => gsap.to(e.currentTarget, { rotation: 90, duration: 0.3 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { rotation: 0, duration: 0.3 })}
            className="text-white hover:text-gray-300 transition-colors will-change-transform"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Menu Content */}
        <div ref={menuContentRef} className="flex flex-col gap-4 text-white">
          <a 
            href="#about-us" 
            onClick={() => setIsMenuOpen(false)} 
            onMouseEnter={(e) => gsap.to(e.currentTarget, { x: 10, duration: 0.2 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, duration: 0.2 })}
            className="text-3xl md:text-4xl lg:text-5xl uppercase hover:text-brand-pink transition-colors will-change-transform"
          >
            About Us
          </a>
          <a 
            href="#services" 
            onClick={() => setIsMenuOpen(false)} 
            onMouseEnter={(e) => gsap.to(e.currentTarget, { x: 10, duration: 0.2 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, duration: 0.2 })}
            className="text-3xl md:text-4xl lg:text-5xl uppercase hover:text-brand-pink transition-colors will-change-transform"
          >
            Services
          </a>
          <a 
            href="#latest-projects" 
            onClick={() => setIsMenuOpen(false)} 
            onMouseEnter={(e) => gsap.to(e.currentTarget, { x: 10, duration: 0.2 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, duration: 0.2 })}
            className="text-3xl md:text-4xl lg:text-5xl uppercase hover:text-brand-pink transition-colors will-change-transform"
          >
            Latest Projects
          </a>
          <a 
            href="#our-team" 
            onClick={() => setIsMenuOpen(false)} 
            onMouseEnter={(e) => gsap.to(e.currentTarget, { x: 10, duration: 0.2 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, duration: 0.2 })}
            className="text-3xl md:text-4xl lg:text-5xl uppercase hover:text-brand-pink transition-colors will-change-transform"
          >
            Our Team
          </a>
          <a 
            href="#contact" 
            onClick={() => setIsMenuOpen(false)} 
            onMouseEnter={(e) => gsap.to(e.currentTarget, { x: 10, duration: 0.2 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, duration: 0.2 })}
            className="text-3xl md:text-4xl lg:text-5xl uppercase hover:text-brand-pink transition-colors will-change-transform"
          >
            Contact
          </a>
          <ThemeToggle />
        </div>

        {/* Footer/Bottom Info */}
        <div className="mt-auto text-white/50 text-sm uppercase tracking-widest">
          W3 DSIGN © 2024
        </div>
      </div>

      {/* Hero Grid Container */}
      <div className="grid grid-cols-6 grid-rows-8 relative w-full h-dvh snap-start lg:grid-cols-12 lg:grid-rows-12 bg-theme font-kode-mono overflow-hidden">
        
        {/* Hero Image/Video Container - Right Side */}
        <div className="hero-image-container col-start-1 col-end-7 row-start-3 row-end-9 lg:col-start-5 lg:col-end-13 lg:row-start-1 lg:row-end-13 bg-cover p-0 lg:p-4 relative overflow-hidden">
          <div className="w-full h-full bg-gray-900 overflow-hidden lg:aspect-square relative">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" 
              alt="Creative Portrait" 
              className="w-full h-full object-cover"
            />
            {/* 4 Vertical Masks */}
            <div className="absolute inset-0 flex">
              <div className="image-mask w-1/4 h-full bg-theme z-20 origin-top will-change-transform"></div>
              <div className="image-mask w-1/4 h-full bg-theme z-20 origin-top will-change-transform"></div>
              <div className="image-mask w-1/4 h-full bg-theme z-20 origin-top will-change-transform"></div>
              <div className="image-mask w-1/4 h-full bg-theme z-20 origin-top will-change-transform"></div>
            </div>
          </div>
        </div>

        {/* Tagline - Bottom Left */}
        <div className="col-start-1 col-end-7 row-start-8 row-end-9 lg:col-start-1 lg:col-end-5 lg:row-start-9 lg:row-end-13 bg-theme lg:bg-transparent flex items-center justify-center lg:justify-start lg:items-end p-4 lg:pr-4 lg:pb-8 z-10">
          <h1 
            className="uppercase w-full text-brand-pink leading-tight lg:leading-[0.9] flex flex-col justify-center lg:justify-start gap-x-2 text-center lg:text-left"
            style={{ fontSize: 'clamp(2rem, 6vw, 7rem)' }}
          >
            <div className="overflow-hidden w-full">
              <span className="tagline-row block w-full lg:hidden will-change-transform">Behind Every Digital Moment</span>
              <span className="tagline-row hidden lg:block w-full will-change-transform">Behind Every</span>
            </div>
            <div className="overflow-hidden w-full hidden lg:block">
              <span className="tagline-row block w-full will-change-transform">Digital Moment</span>
            </div>
          </h1>
        </div>

        {/* Logo and Marquee Container - Floating over image on desktop */}
        <div className="col-start-1 col-end-7 row-start-1 row-end-3 lg:col-start-1 lg:col-end-9 lg:row-start-1 lg:row-end-5 overflow-hidden relative z-30">
          <div className="logo-wrapper w-full h-full bg-theme flex flex-col justify-end p-4 will-change-[clip-path]">
            
            {/* Logo */}
            <div className="w-full flex items-end mb-4 overflow-hidden">
              <div className="logo-img flex w-full will-change-transform">
                <img 
                  src="/w3dsign.svg" 
                  alt="W3 DSIGN Logo" 
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Marquee */}
            <div className="marquee-container bg-theme text-brand-pink text-xs lg:text-sm w-full uppercase tracking-widest self-start overflow-hidden whitespace-nowrap flex will-change-transform">
              <div className="flex whitespace-nowrap animate-marquee">
                <span className="mr-4">Branding - Web Design - Digital Marketing - Social Media Content - </span>
                <span className="mr-4">Branding - Web Design - Digital Marketing - Social Media Content - </span>
                <span className="mr-4">Branding - Web Design - Digital Marketing - Social Media Content - </span>
                <span className="mr-4">Branding - Web Design - Digital Marketing - Social Media Content - </span>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </>
  );
};
