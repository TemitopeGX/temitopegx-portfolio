"use client";
import Head from "next/head";
import Layout from "../components/Layout";
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

interface Service {
  id: number;
  icon: any;
  title: string;
  description: string;
  features: string[];
  technologies?: string[];
  deliverables?: string[];
  process?: string[];
  benefits?: string[];
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
    process: [
      "Discovery & Research",
      "Concept Development",
      "Design Exploration",
      "Refinement & Finalization",
      "Brand Guidelines Creation",
    ],
    benefits: [
      "Stand Out from Competitors",
      "Build Brand Recognition",
      "Increase Brand Value",
      "Maintain Consistency",
      "Professional Appearance",
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
    process: [
      "Requirements Analysis",
      "Architecture Planning",
      "Development & Testing",
      "Optimization & Launch",
      "Maintenance & Support",
    ],
    benefits: [
      "Increased Online Presence",
      "Better User Experience",
      "Higher Conversion Rates",
      "Improved Performance",
      "Scalable Solutions",
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
    process: [
      "User Research",
      "Wireframing",
      "Visual Design",
      "Prototyping",
      "Usability Testing",
    ],
    benefits: [
      "Enhanced User Engagement",
      "Improved User Retention",
      "Better App Store Presence",
      "Reduced Development Time",
      "Consistent User Experience",
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
    process: [
      "Component Planning",
      "Development",
      "Testing & QA",
      "Performance Tuning",
      "Deployment",
    ],
    benefits: [
      "Fast Loading Times",
      "Smooth Interactions",
      "Mobile Responsiveness",
      "Code Maintainability",
      "Modern User Experience",
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
    process: [
      "Market Research",
      "Strategy Development",
      "Campaign Creation",
      "Implementation",
      "Monitoring & Optimization",
    ],
    benefits: [
      "Increased Brand Awareness",
      "Higher Engagement Rates",
      "Better ROI",
      "Data-Driven Decisions",
      "Targeted Reach",
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
    process: [
      "Market Analysis",
      "Strategy Planning",
      "Asset Creation",
      "Launch Execution",
      "Performance Tracking",
    ],
    benefits: [
      "Maximum Impact",
      "Market Penetration",
      "Brand Awareness",
      "Lead Generation",
      "Measurable Results",
    ],
  },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <Layout>
      <Head>
        <title>
          Our Services - Professional Design & Development Solutions
        </title>
        <meta
          name="description"
          content="Explore our comprehensive range of design and development services. From brand identity to web development, we deliver exceptional digital experiences."
        />
      </Head>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="minimalist-section relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="dot-pattern opacity-30" />
            <div className="grid-pattern opacity-20" />
          </div>
          <div className="particle-effect" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#2B3FF3]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-[#6F3FF3]/10 rounded-full blur-3xl animate-pulse" />

          <div className="minimalist-container relative">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-animate">
                Transform Your Vision Into Reality
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12">
                We offer comprehensive design and development solutions to help
                your business thrive in the digital world
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/contact" className="minimalist-button">
                  Start Your Project
                </Link>
                <a href="#services" className="minimalist-button-outline">
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section
          id="services"
          className="minimalist-section relative overflow-hidden"
        >
          <div className="minimalist-container relative">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="group fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="gradient-border card-hover-effect cursor-pointer">
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
                        <p className="text-gray-600 mb-6">
                          {service.description}
                        </p>

                        {/* View Details Button */}
                        <button className="mt-auto text-[#2B3FF3] font-medium flex items-center group">
                          View Details
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="ml-2 transform group-hover:translate-x-1 transition-transform"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Details Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2B3FF3] to-[#6F3FF3] rounded-xl flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={selectedService.icon}
                        className="text-xl text-white"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-gradient-animate">
                      {selectedService.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium text-lg mb-4 text-gradient-animate">
                      Features
                    </h3>
                    <div className="space-y-3">
                      {selectedService.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center space-x-2"
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
                                : "text-gray-600"
                            }
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {(selectedService.technologies ||
                      selectedService.deliverables) && (
                      <div className="mt-8">
                        <h3 className="font-medium text-lg mb-4 text-gradient-animate">
                          {selectedService.technologies
                            ? "Technologies"
                            : "Deliverables"}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {(
                            selectedService.technologies ||
                            selectedService.deliverables
                          )?.map((item) => (
                            <span
                              key={item}
                              className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-[#2B3FF3]/10 to-[#6F3FF3]/10 text-[#2B3FF3]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    {selectedService.process && (
                      <div className="mb-8">
                        <h3 className="font-medium text-lg mb-4 text-gradient-animate">
                          Our Process
                        </h3>
                        <div className="space-y-3">
                          {selectedService.process.map((step, index) => (
                            <div
                              key={step}
                              className="flex items-center space-x-3"
                            >
                              <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#2B3FF3] to-[#6F3FF3] text-white flex items-center justify-center text-sm">
                                {index + 1}
                              </span>
                              <span className="text-gray-600">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedService.benefits && (
                      <div>
                        <h3 className="font-medium text-lg mb-4 text-gradient-animate">
                          Key Benefits
                        </h3>
                        <div className="space-y-3">
                          {selectedService.benefits.map((benefit) => (
                            <div
                              key={benefit}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#2B3FF3] to-[#6F3FF3]" />
                              <span className="text-gray-600">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                  <Link
                    href="/contact"
                    className="minimalist-button inline-flex items-center"
                  >
                    Get Started
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <section className="minimalist-section relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="dot-pattern opacity-30" />
            <div className="grid-pattern opacity-20" />
          </div>
          <div className="minimalist-container relative">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-gradient-animate">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Let's work together to create something extraordinary
              </p>
              <Link href="/contact" className="minimalist-button">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
