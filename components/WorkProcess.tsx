import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  faLightbulb,
  faCode,
  faRocket,
  faCheckCircle,
  faArrowRight,
  faComments,
  faPencilRuler,
  faGears,
} from "@fortawesome/free-solid-svg-icons";

const steps = [
  {
    icon: faComments,
    title: "Initial Discussion",
    description:
      "We start with understanding your vision, goals, and requirements through detailed consultation.",
    details: [
      "Project scope definition",
      "Goals identification",
      "Timeline planning",
    ],
  },
  {
    icon: faPencilRuler,
    title: "Planning & Design",
    description:
      "Creating comprehensive plans and designs that align with your objectives.",
    details: ["Wireframe creation", "Design mockups", "Architecture planning"],
  },
  {
    icon: faCode,
    title: "Development",
    description:
      "Building your solution using cutting-edge technologies and best practices.",
    details: ["Clean code writing", "Regular updates", "Progress tracking"],
  },
  {
    icon: faGears,
    title: "Testing & Review",
    description:
      "Thorough testing and refinement to ensure everything works perfectly.",
    details: ["Quality assurance", "Performance testing", "Client feedback"],
  },
  {
    icon: faRocket,
    title: "Launch & Support",
    description: "Seamless deployment and continued support for your success.",
    details: [
      "Deployment strategy",
      "Performance monitoring",
      "Ongoing maintenance",
    ],
  },
];

export default function WorkProcess() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
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
                  Work Process
                </span>
              </div>
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How We Work Together
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base">
            A systematic approach to turning your ideas into reality
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-[#00FF00]/30 via-[#00FF00]/50 to-[#00FF00]/30 transform -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Step Number */}
                <div
                  className="absolute -top-4 left-1/2 lg:left-auto lg:top-0 transform -translate-x-1/2 lg:translate-x-0 
                               w-8 h-8 bg-[#00FF00] text-black rounded-full flex items-center justify-center font-bold 
                               text-sm z-10 lg:mb-4 group-hover:scale-110 transition-transform duration-300"
                >
                  {index + 1}
                </div>

                {/* Card */}
                <div
                  className="relative bg-white/[0.03] backdrop-blur-sm rounded-lg p-6 border border-white/10 
                               hover:border-[#00FF00]/30 transition-all duration-300 mt-6"
                >
                  {/* Icon */}
                  <div className="relative h-12 mb-4 flex items-center justify-center">
                    <div
                      className="absolute inset-0 bg-[#00FF00]/5 rounded-lg filter blur-lg 
                                  group-hover:bg-[#00FF00]/10 transition-all duration-300"
                    />
                    <FontAwesomeIcon
                      icon={step.icon}
                      className="text-2xl text-[#00FF00] group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-4 text-center">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li
                        key={i}
                        className="text-xs text-white/50 flex items-center"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00]/50 mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* Hover Effect */}
                  <div
                    className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100
                                transition-all duration-300 bg-gradient-to-r from-[#00FF00]/0 
                                via-[#00FF00]/5 to-[#00FF00]/0 blur-sm"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#00FF00]/10 text-[#00FF00] px-6 py-3 rounded-full
                     border border-[#00FF00]/30 hover:bg-[#00FF00]/20 transition-all duration-300
                     group"
          >
            <span>Start Your Project</span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-sm transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
