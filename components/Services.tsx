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
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface Service {
  id: number;
  icon: any;
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
    title: "Brand Identity Design",
    description:
      "Create a memorable brand identity that resonates with your target audience and sets you apart from competitors.",
    features: [
      "Logo Design & Brand Guidelines",
      "Color Palette & Typography",
      "Brand Voice & Messaging",
      "Marketing Materials",
      "Social Media Templates",
    ],
    deliverables: [
      "Brand Style Guide",
      "Logo Files (All Formats)",
      "Business Card & Letterhead",
      "Social Media Kit",
    ],
  },
  {
    id: 2,
    icon: faCode,
    title: "Web Development",
    description:
      "Build modern, responsive websites that provide exceptional user experiences and drive business growth.",
    features: [
      "Custom Website Development",
      "E-commerce Solutions",
      "Content Management Systems",
      "Performance Optimization",
      "SEO Integration",
    ],
    technologies: [
      "React/Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
    ],
  },
  {
    id: 3,
    icon: faMobileScreen,
    title: "Mobile App Design",
    description:
      "Design intuitive and engaging mobile applications that deliver value to your users.",
    features: [
      "UI/UX Design",
      "Prototype Development",
      "User Flow Optimization",
      "Cross-platform Design",
      "App Icon & Store Assets",
    ],
    deliverables: [
      "Design System",
      "Interactive Prototype",
      "Source Files",
      "Implementation Guide",
    ],
  },
  {
    id: 4,
    icon: faLaptopCode,
    title: "Frontend Development",
    description:
      "Create responsive and interactive user interfaces with modern web technologies.",
    features: [
      "Component Development",
      "Responsive Design",
      "Animation & Interactions",
      "Performance Optimization",
      "Cross-browser Compatibility",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Next.js",
      "Framer Motion",
    ],
  },
  {
    id: 5,
    icon: faGlobe,
    title: "Digital Marketing",
    description:
      "Develop effective digital marketing strategies to reach and engage your target audience.",
    features: [
      "Social Media Marketing",
      "Content Strategy",
      "Email Marketing",
      "SEO Optimization",
      "Analytics & Reporting",
    ],
    deliverables: [
      "Marketing Strategy",
      "Content Calendar",
      "Campaign Reports",
      "Performance Analytics",
    ],
  },
  {
    id: 6,
    icon: faRocket,
    title: "Product Launch",
    description:
      "Launch your product successfully with comprehensive go-to-market strategies.",
    features: [
      "Launch Strategy",
      "Marketing Collateral",
      "PR & Communications",
      "Social Media Campaign",
      "Analytics Setup",
    ],
    deliverables: [
      "Launch Plan",
      "Marketing Assets",
      "PR Kit",
      "Performance Report",
    ],
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <section className="minimalist-section relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="dot-pattern opacity-30" />
        <div className="grid-pattern opacity-20" />
      </div>
      <div className="particle-effect" />

      {/* Animated Background Circles */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#2B3FF3]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-[#6F3FF3]/10 rounded-full blur-3xl animate-pulse" />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="floating-element w-8 h-8 bg-gradient-to-br from-[#2B3FF3]/20 to-[#6F3FF3]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="minimalist-container relative">
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
          <h2 className="text-4xl font-bold mb-6 text-gradient-animate">
            Our Services
          </h2>
          <p className="text-xl text-gray-600">
            Transforming ideas into exceptional digital experiences through
            innovative design and development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div
                className={`gradient-border card-hover-effect ${
                  activeService === service.id ? "scale-[1.02]" : ""
                }`}
              >
                <div className="gradient-border-content p-8">
                  <div className="flex flex-col h-full">
                    {/* Service Icon */}
                    <div className="mb-6 transform transition-transform duration-500 group-hover:scale-110">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#2B3FF3] to-[#6F3FF3] rounded-xl flex items-center justify-center glow-effect">
                        <FontAwesomeIcon
                          icon={service.icon}
                          className="text-2xl text-white"
                        />
                      </div>
                    </div>

                    {/* Service Title & Description */}
                    <h3 className="text-xl font-bold mb-4 text-gradient-animate">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>

                    {/* Features List */}
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center space-x-2 text-gray-600 transition-all duration-300"
                          onMouseEnter={() => setHoveredFeature(feature)}
                          onMouseLeave={() => setHoveredFeature(null)}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#2B3FF3] to-[#6F3FF3] transition-all duration-300 ${
                              hoveredFeature === feature ? "scale-150" : ""
                            }`}
                          />
                          <span
                            className={
                              hoveredFeature === feature
                                ? "text-gradient-animate"
                                : ""
                            }
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Technologies or Deliverables */}
                    {(service.technologies || service.deliverables) && (
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          {service.technologies
                            ? "Technologies"
                            : "Deliverables"}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(service.technologies || service.deliverables)?.map(
                            (item) => (
                              <span
                                key={item}
                                className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-[#2B3FF3]/10 to-[#6F3FF3]/10 text-[#2B3FF3]"
                              >
                                {item}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-20 fade-in">
          <div className="glass-card inline-block px-8 py-6 card-hover-effect">
            <p className="text-xl text-gradient-animate mb-6">
              Ready to bring your vision to life?
            </p>
            <a href="/contact" className="minimalist-button">
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
