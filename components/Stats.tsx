import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faClock,
  faUsers,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const stats = [
  {
    icon: faCheckDouble,
    value: 10,
    suffix: "+",
    label: "Projects Completed",
    color: "from-neon-green/20 to-neon-green/5",
  },
  {
    icon: faClock,
    value: 2,
    suffix: "+",
    label: "Years Experience",
    color: "from-neon-blue/20 to-neon-blue/5",
  },
  {
    icon: faUsers,
    value: 15,
    suffix: "+",
    label: "Happy Clients",
    color: "from-neon-purple/20 to-neon-purple/5",
  },
  {
    icon: faStar,
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    color: "from-[#FF00FF]/20 to-[#FF00FF]/5",
  },
];

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-dark-200" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative group"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Card */}
              <div className="bg-dark p-6 rounded-xl border border-neon-green/10 hover:border-neon-green/30 transition-all duration-300">
                {/* Icon */}
                <div
                  className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <FontAwesomeIcon
                    icon={stat.icon}
                    className="text-2xl text-white"
                  />
                </div>

                {/* Counter */}
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white counter">
                    {isVisible ? stat.value : 0}
                  </span>
                  <span className="text-2xl text-neon-green">
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-neon-green/5 blur-xl rounded-xl scale-0 group-hover:scale-110 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .counter {
          transition: all 2s ease-out;
          counter-reset: count ${isVisible ? "var(--value)" : 0};
          animation: ${isVisible ? "countUp 2s ease-out forwards" : "none"};
        }

        @keyframes countUp {
          from {
            --value: 0;
          }
          to {
            --value: var(--end-value);
          }
        }
      `}</style>
    </section>
  );
}
