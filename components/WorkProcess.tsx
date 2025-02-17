import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  faLightbulb,
  faCode,
  faRocket,
  faCheckCircle,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const steps = [
  {
    icon: faLightbulb,
    title: "Discovery",
    description:
      "Understanding your needs and project requirements through detailed consultation",
    color: "from-neon-purple/20 to-neon-purple/5",
  },
  {
    icon: faCode,
    title: "Development",
    description:
      "Crafting solutions using cutting-edge technologies and best practices",
    color: "from-neon-blue/20 to-neon-blue/5",
  },
  {
    icon: faCheckCircle,
    title: "Testing",
    description: "Rigorous quality assurance to ensure perfect functionality",
    color: "from-neon-green/20 to-neon-green/5",
  },
  {
    icon: faRocket,
    title: "Launch",
    description: "Seamless deployment and ongoing support for your success",
    color: "from-[#FF00FF]/20 to-[#FF00FF]/5",
  },
];

export default function WorkProcess() {
  return (
    <section className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-4xl font-bold mb-4">
          Work <span className="text-neon-green">Process</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          A systematic approach to delivering exceptional results
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="group relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 left-full w-full h-[2px] bg-gradient-to-r from-neon-green/50 to-transparent -translate-y-1/2 z-0" />
              )}

              {/* Card */}
              <div className="relative bg-dark-200 rounded-xl p-6 border border-neon-green/10 hover:border-neon-green/30 transition-all duration-300">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-green text-dark rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}
                >
                  <FontAwesomeIcon
                    icon={step.icon}
                    className="text-2xl text-white"
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Optional CTA */}
        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-neon-green hover:text-neon-green/80 transition-colors"
          >
            <span>Start Your Project</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
