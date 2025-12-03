import { useEffect, useRef } from "react";

let gsap: any;
let ScrollTrigger: any;

const services = [
  {
    id: "01",
    title: ["BRANDING"],
    items: [
      "Visual Identity",
      "Brand Strategy",
      "Logo Design",
      "Brand Guidelines",
    ],
  },
  {
    id: "02",
    title: ["WEB", "DESIGN"],
    items: [
      "UI/UX Design",
      "Responsive Development",
      "Interactive Experiences",
      "Performance Optimization",
    ],
  },
  {
    id: "03",
    title: ["DIGITAL", "MARKETING"],
    items: [
      "SEO Strategy",
      "Social Media Management",
      "Content Creation",
      "Analytics & Reporting",
    ],
  },
  {
    id: "04",
    title: ["SOCIAL", "MEDIA"],
    items: [
      "Content Planning",
      "Photography & Video",
      "Copywriting",
      "Community Management",
    ],
  },
];

export const ServicesScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const numberFillsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const initGSAP = async () => {
      // Check if we're on mobile (below md breakpoint = 768px)
      const isMobile = window.innerWidth < 768;
      if (isMobile || !desktopRef.current) return;

      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");

      gsap = gsapModule.default;
      ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const container = desktopRef.current;
      const totalServices = services.length;
      
      // Master Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalServices * 100}%`,
          pin: true,
          scrub: 0.5,
          snap: {
            snapTo: 1 / (totalServices - 1),
            duration: { min: 0.2, max: 0.5 },
            delay: 0.1,
            ease: "power1.inOut",
          },
        },
      });

      // Initial Setup
      services.forEach((_, i) => {
        const slide = slidesRef.current[i];
        const numberFill = numberFillsRef.current[i];
        if (slide && numberFill) {
          const title = slide.querySelector(".service-title");
          const items = slide.querySelectorAll(".service-item");

          if (i === 0) {
            gsap.set(title, { y: "0%", opacity: 1 });
            gsap.set(items, { y: 0, opacity: 1 });
            gsap.set(numberFill, { clipPath: "inset(0% 0 0 0)" });
          } else {
            gsap.set(title, { y: "100%", opacity: 0 });
            gsap.set(items, { y: 50, opacity: 0 });
            gsap.set(numberFill, { clipPath: "inset(100% 0 0 0)" });
          }
        }
      });

      // Build Timeline
      services.forEach((_, i) => {
        if (i === totalServices - 1) return;

        const slideCurrent = slidesRef.current[i];
        const slideNext = slidesRef.current[i + 1];
        const numberFillCurrent = numberFillsRef.current[i];
        const numberFillNext = numberFillsRef.current[i + 1];

        if (
          !slideCurrent ||
          !slideNext ||
          !numberFillCurrent ||
          !numberFillNext
        )
          return;

        const titleCurrent = slideCurrent.querySelector(".service-title");
        const itemsCurrent = slideCurrent.querySelectorAll(".service-item");
        const titleNext = slideNext.querySelector(".service-title");
        const itemsNext = slideNext.querySelectorAll(".service-item");

        const startTime = i;

        // 1. Current Service Exit (complete before next enters)
        tl.to(
          titleCurrent,
          {
            y: "-100%",
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          },
          startTime + 0.4
        );

        tl.to(
          itemsCurrent,
          {
            y: -30,
            opacity: 0,
            duration: 0.2,
            stagger: 0.03,
          },
          startTime + 0.4
        );

        // 2. Next Service Enter (after current exits)
        tl.fromTo(
          titleNext,
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.3, ease: "power2.out" },
          startTime + 0.7
        );

        tl.fromTo(
          itemsNext,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.08, ease: "power2.out" },
          startTime + 0.75
        );

        // 3. Number Animations
        // Current number: fill reverses (white fills from bottom to top)
        tl.fromTo(
          numberFillCurrent,
          { clipPath: "inset(0% 0 0 0)" },
          { clipPath: "inset(0% 0 100% 0)", duration: 0.5, ease: "none" },
          startTime + 0.3
        );

        // Next number: fills normally (white reveals from bottom to top)
        tl.fromTo(
          numberFillNext,
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 0.5, ease: "none" },
          startTime + 0.5
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

  return (
    <>
      {/* Desktop/Tablet Version - Animated */}
      <section
        ref={desktopRef}
        className="hidden md:block relative w-full h-dvh overflow-hidden bg-white"
      >
        {/* Blue/Pink Block - Centered vertically with margins */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 w-2/3 h-[60dvh] bg-brand-pink z-10">
          {/* Numbers inside pink block */}
          <div className="absolute top-8 right-6 lg:right-12 xl:right-16 flex gap-8 lg:gap-12">
            {services.map((service, index) => (
              <div key={service.id} className="relative">
                <span className="text-2xl lg:text-3xl text-white/30 font-kode-mono">
                  {service.id}.
                </span>
                <span 
                  ref={el => { numberFillsRef.current[index] = el }}
                  className="absolute top-0 left-0 text-2xl lg:text-3xl text-white font-kode-mono will-change-[clip-path]"
                  style={{ clipPath: 'inset(100% 0 0 0)' }}
                >
                  {service.id}.
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area - Above pink block */}
        <div className="relative w-full h-full z-20 px-6 lg:px-12 xl:px-16">
          <div className="relative w-full h-full max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={el => { slidesRef.current[index] = el }}
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-center"
              >
                {/* Title - Centered vertically, aligned to middle horizontally */}
                <div className="w-full mb-12 lg:mb-16 overflow-hidden">
                  <div className="service-title transform translate-y-full will-change-transform">
                    {service.title.map((line, i) => (
                      <h3 key={i} className="text-6xl lg:text-8xl xl:text-9xl font-black leading-none text-black">
                        {line}
                      </h3>
                    ))}
                  </div>
                </div>
                
                {/* Items Grid - Below title */}
                <div className="w-full flex justify-start">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-12 max-w-4xl">
                    {service.items.map((item, i) => (
                      <div key={i} className="service-item opacity-0 transform translate-y-12 will-change-transform">
                        <span className="block w-4 h-0.5 bg-black mb-3"></span>
                        <div className="overflow-hidden">
                        <p className="text-xs lg:text-sm xl:text-base text-black leading-tight">
                          {item}
                        </p>
                      </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Version - Static Scroll */}
      <section className="md:hidden w-full bg-white py-8">
        {services.map((service) => (
          <div key={service.id} className="px-6 py-12 flex flex-col">
            {/* Number */}
            <div className="text-5xl font-black mb-8 text-brand-pink">
              {service.id}.
            </div>
            
            {/* Title */}
            <div className="mb-8">
              {service.title.map((line, i) => (
                <h3 key={i} className="text-5xl font-black leading-none text-black mb-2">
                  {line}
                </h3>
              ))}
            </div>
            
            {/* Items */}
            <div className="space-y-4 bg-gray-50 p-6 rounded-2xl">
              {service.items.map((item, i) => (
                <div key={i}>
                  <p className="text-base text-black">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
