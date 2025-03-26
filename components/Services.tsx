import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faCode,
  faMobileScreen,
  faLaptopCode,
  faGlobe,
  faRocket,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import Link from "next/link";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";

interface Service {
  id: number;
  icon: IconDefinition;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    id: 1,
    icon: faPalette,
    title: "Brand Identity",
    description:
      "Create a unique and memorable brand identity that resonates with your target audience.",
    features: [
      "Logo Design",
      "Brand Guidelines",
      "Visual Identity",
      "Brand Strategy",
    ],
  },
  {
    id: 2,
    icon: faCode,
    title: "Web Development",
    description: "Custom Websites, E-commerce & Web Applications",
    features: [
      "Custom Websites",
      "E-commerce",
      "Web Applications",
      "API Integration",
    ],
  },
  {
    id: 3,
    icon: faMobileScreen,
    title: "UI/UX Design",
    description: "User Interface & Experience Design",
    features: [
      "Wireframing",
      "Prototyping",
      "User Research",
      "Interface Design",
    ],
  },
  {
    id: 4,
    icon: faLaptopCode,
    title: "Frontend Dev",
    description: "Responsive & Interactive Web Interfaces",
    features: [
      "React/Next.js",
      "Responsive Design",
      "Performance",
      "Animations",
    ],
  },
  {
    id: 5,
    icon: faGlobe,
    title: "Digital Marketing",
    description: "Social Media, SEO & Content Strategy",
    features: ["Social Media", "SEO", "Content Strategy", "Analytics"],
  },
  {
    id: 6,
    icon: faRocket,
    title: "Product Launch",
    description: "Go-to-Market Strategy & Implementation",
    features: [
      "Launch Strategy",
      "Market Research",
      "Campaign Planning",
      "Growth Hacking",
    ],
  },
];

export default function Services() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#00FF00 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00FF00]/5 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
            <span className="text-[#00FF00] font-mono text-sm">
              Our Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            What We Can Do For
            <span className="block text-[#00FF00] mt-2">Your Business</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            We transform ideas into exceptional digital experiences through
            innovative design and development solutions.
          </p>
        </motion.div>

        {/* New Services Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* New Card Design */}
              <div
                className="group h-full relative bg-black border border-white/10 rounded-2xl p-1 
                            hover:border-[#00FF00]/50 transition-all duration-500 overflow-hidden"
              >
                {/* Animated Border Gradient */}
                <div
                  className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-[#00FF00]/20 to-transparent 
                              opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
                />

                {/* Card Inner Content */}
                <div className="relative h-full bg-black/50 backdrop-blur-sm rounded-xl p-8">
                  {/* Top Section with Icon and Title */}
                  <div className="flex items-start gap-4 mb-6">
                    {/* Icon Container */}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <div
                          className="absolute inset-0 bg-[#00FF00]/10 rounded-lg transform 
                                      group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"
                        />
                        <div
                          className="absolute inset-0 bg-black rounded-lg transform 
                                      group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                        />
                        <FontAwesomeIcon
                          icon={service.icon}
                          className="relative z-10 text-[#00FF00] text-2xl transform group-hover:scale-110 transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Title and Description */}
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#00FF00] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-white/60 text-sm mt-1 group-hover:text-white/80 transition-colors duration-300">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-white/70 group-hover:text-white/90 
                                 transition-colors duration-300 p-2 rounded-lg bg-white/5 
                                 group-hover:bg-[#00FF00]/5"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#00FF00]/50 group-hover:bg-[#00FF00]" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <Link
                    href={`/services#${service.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="inline-flex items-center gap-2 text-[#00FF00] text-sm 
                             relative group/link"
                  >
                    <span className="relative">
                      Explore Service
                      <span
                        className="absolute left-0 bottom-0 w-full h-px bg-[#00FF00]/50 
                                     transform scale-x-0 group-hover/link:scale-x-100 
                                     transition-transform duration-300 origin-left"
                      />
                    </span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-xs transform group-hover/link:translate-x-1 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
