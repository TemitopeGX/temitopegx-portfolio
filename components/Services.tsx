import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faCode,
  faMobileScreen,
  faLaptopCode,
  faGlobe,
  faRocket,
  faLightbulb,
  faPenRuler,
  faLayerGroup,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Service {
  id: number;
  icon: IconDefinition;
  title: string;
  description: string;
  features: string[];
  technologies?: string[];
  deliverables?: string[];
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
  const [activeService, setActiveService] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <section className="py-20 bg-dark-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-4xl font-bold mb-4">
          Our <span className="text-neon-green">Services</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Transforming ideas into exceptional digital experiences through
          innovative design and development
        </p>

        {/* Services Slider */}
        <div className="flex flex-nowrap overflow-x-auto gap-6 pb-8 scrollbar-hide">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex-none w-[300px] bg-dark border border-neon-green/10 rounded-xl p-6 hover:border-neon-green/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center group-hover:bg-neon-green/20 transition-colors">
                  <FontAwesomeIcon
                    icon={service.icon}
                    className="text-neon-green text-xl"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-neon-green hover:text-neon-green/80 transition-colors"
          >
            <span>Start a Project</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </Link>
        </div>
      </div>

      {/* Add custom scrollbar styles to your globals.css */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
