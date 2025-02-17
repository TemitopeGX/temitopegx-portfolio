import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faHtml5,
  faCss3Alt,
  faJs,
  faNode,
  faPython,
  faPhp,
  faFigma,
  faGit,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useRef } from "react";

const technologies = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "React/Next.js", level: 70 },
      { name: "Tailwind CSS", level: 70 },
    ],
    icon: faReact,
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 65 },
      { name: "Python/Flask", level: 80 },
      { name: "PHP", level: 80 },
      { name: "REST APIs", level: 60 },
    ],
    icon: faNode,
  },
  {
    category: "Development Tools",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "TypeScript", level: 65 },
      { name: "MySQL", level: 80 },
    ],
    icon: faJs,
  },
  {
    category: "Design",
    skills: [
      { name: "UI/UX Design", level: 90 },
      { name: "Figma", level: 95 },
      { name: "Adobe Suite", level: 85 },
    ],
    icon: faFigma,
  },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const skillBars = document.querySelectorAll(".skill-bar");
    skillBars.forEach((bar) => observer.observe(bar));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-dark-200" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-4xl font-bold mb-4 animate-fade-in">
          Skills & <span className="text-neon-green">Technologies</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in delay-100">
          Leveraging cutting-edge technologies to build modern digital solutions
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {technologies.map((tech, techIndex) => (
            <div
              key={tech.category}
              className="bg-dark p-5 rounded-xl border border-neon-green/10 hover:border-neon-green/30 transition-colors animate-slide-up"
              style={{ animationDelay: `${techIndex * 100}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-neon-green/10 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={tech.icon}
                    className="text-neon-green text-2xl"
                  />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {tech.category}
                </h3>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {tech.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">
                        {skill.name}
                      </span>
                      <span className="text-neon-green text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
                      <div
                        className="skill-bar h-full bg-neon-green/50 rounded-full transform origin-left transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .animate-in .skill-bar {
          animation: fillBar 1.5s ease-out forwards;
        }

        @keyframes fillBar {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          opacity: 0;
          animation: slideUp 0.5s ease-out forwards;
        }

        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
