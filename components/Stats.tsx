import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faClock,
  faUsers,
  faStar,
  faRocket,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

const stats = [
  {
    icon: faRocket,
    value: 10,
    suffix: "+",
    label: "Projects Completed",
    description: "Successfully delivered projects",
  },
  {
    icon: faClock,
    value: 2,
    suffix: "+",
    label: "Years Experience",
    description: "Professional development experience",
  },
  {
    icon: faCode,
    value: 15000,
    suffix: "+",
    label: "Lines of Code",
    description: "Written with best practices",
  },
  {
    icon: faStar,
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    description: "From project feedback",
  },
];

function CountUpAnimation({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      if (currentStep < steps) {
        setCount(Math.ceil((value * ++currentStep) / steps));
      } else {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={counterRef} className="flex items-baseline gap-1">
      <span className="text-4xl md:text-5xl font-bold text-white">
        {count.toLocaleString()}
      </span>
      <span className="text-xl md:text-2xl text-[#00FF00]">{suffix}</span>
    </div>
  );
}

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section
      className="relative py-24 bg-black overflow-hidden"
      ref={containerRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#00FF00 0.5px, transparent 0.5px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00FF00]/5 via-transparent to-transparent" />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#00FF00]/20 blur-lg rounded-full" />
              <div className="relative bg-black border border-[#00FF00] rounded-full px-4 py-1.5">
                <span className="text-[#00FF00] font-mono text-sm uppercase tracking-wider">
                  Achievement Stats
                </span>
              </div>
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Numbers That Speak
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base">
            Milestones and achievements throughout my journey
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div
                className="relative bg-white/[0.03] backdrop-blur-sm rounded-xl p-6
                            border border-white/10 hover:border-[#00FF00]/30
                            transition-all duration-300 h-full"
              >
                {/* Icon */}
                <div className="relative h-12 mb-6 flex items-center justify-center">
                  <div
                    className="absolute inset-0 bg-[#00FF00]/5 rounded-lg filter blur-lg 
                                group-hover:bg-[#00FF00]/10 transition-all duration-300"
                  />
                  <FontAwesomeIcon
                    icon={stat.icon}
                    className="text-2xl text-[#00FF00] group-hover:scale-110 
                             transition-transform duration-300"
                  />
                </div>

                {/* Counter */}
                <CountUpAnimation value={stat.value} suffix={stat.suffix} />

                {/* Label & Description */}
                <h3 className="text-lg font-semibold text-white mt-4 mb-2">
                  {stat.label}
                </h3>
                <p className="text-sm text-white/50">{stat.description}</p>

                {/* Hover Glow */}
                <div
                  className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100
                              transition-all duration-300 bg-gradient-to-r from-[#00FF00]/0 
                              via-[#00FF00]/5 to-[#00FF00]/0 blur-sm"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
