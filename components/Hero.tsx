import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  ReactIcon,
  TypeScriptIcon,
  NextjsIcon,
  NodejsIcon,
  TailwindIcon,
} from "./icons/TechIcons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Animate text elements
    const elements = textRef.current.querySelectorAll(".animate-text");
    elements.forEach((element, index) => {
      tl.from(element, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
      });
    });

    // Animate code lines
    gsap.from(".code-line", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "center center",
        scrub: 1,
      },
      opacity: 0,
      x: -50,
      stagger: 0.1,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col-reverse lg:flex-row items-center 
                 bg-black px-4 sm:px-6 lg:px-8 py-12 lg:py-0 gap-8 lg:gap-0"
    >
      {/* Left Content Side */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 relative flex items-center lg:pl-16 xl:pl-24"
      >
        {/* Main Content */}
        <div ref={textRef} className="relative z-10 max-w-2xl mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center space-x-2 mb-6"
          >
            <span className="w-3 h-3 rounded-full bg-[#00FF00] animate-pulse" />
            <span className="text-[#00FF00] font-mono text-sm sm:text-base">
              Available for projects
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 
                     leading-tight text-white"
          >
            Crafting Digital
            <span className="block text-[#00FF00] mt-2">Experiences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg sm:text-xl text-white/80 mb-8 sm:mb-12 leading-relaxed"
          >
            Hi, I'm TemitopGX. I transform ideas into exceptional digital
            experiences through creative design and innovative development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/portfolio"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-[#00FF00] text-black font-medium
                       text-center hover:bg-[#00FF00]/90 transition-all duration-300
                       text-sm sm:text-base"
            >
              Explore My Work
            </Link>

            <Link
              href="/contact"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-[#00FF00] text-[#00FF00]
                       text-center hover:bg-[#00FF00]/10 transition-all duration-300
                       text-sm sm:text-base"
            >
              Let's Connect
            </Link>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 sm:mt-16 hidden sm:block"
          >
            <p className="text-white/60 text-sm mb-4 font-mono">TECH STACK</p>
            <div className="flex flex-wrap gap-4 sm:gap-8">
              {[
                { icon: ReactIcon, name: "React" },
                { icon: NextjsIcon, name: "Next.js" },
                { icon: TypeScriptIcon, name: "TypeScript" },
                { icon: NodejsIcon, name: "Node.js" },
                { icon: TailwindIcon, name: "Tailwind" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="group relative w-12 sm:w-16 h-12 sm:h-16 rounded-xl bg-white/5 border border-white/10
                         hover:border-[#00FF00]/50 transition-all duration-300 p-2 sm:p-3"
                >
                  <tech.icon />
                  <div
                    className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 opacity-0 
                              group-hover:opacity-100 transition-opacity duration-200 text-white/60 
                              text-xs sm:text-sm whitespace-nowrap"
                  >
                    {tech.name}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Visual Side */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 relative flex items-center justify-center lg:h-screen 
                   pt-16 sm:pt-24 lg:pt-0"
      >
        {/* Profile Image Container */}
        <div className="relative w-[280px] sm:w-[400px] lg:w-[500px] xl:w-[600px] aspect-square">
          {/* Background Elements */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00FF00]/10 to-transparent" />
          <div className="absolute inset-0 rounded-3xl border border-[#00FF00]/20" />

          {/* Decorative Elements */}
          <div className="absolute -inset-4 bg-[#00FF00]/5 rounded-[2rem] blur-2xl" />
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#00FF00]/20 to-transparent rounded-3xl blur" />

          {/* Image */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden">
            <Image
              src="/images/about-me.jpg"
              alt="TemitopGX"
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 400px, (max-width: 1280px) 500px, 600px"
              priority
            />
          </div>

          {/* Floating Elements */}
          <div className="absolute -right-6 top-1/4 w-12 h-12 bg-[#00FF00]/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute -left-8 bottom-1/3 w-16 h-16 bg-[#00FF00]/10 rounded-full blur-xl animate-pulse delay-1000" />
        </div>
      </motion.div>
    </section>
  );
}
