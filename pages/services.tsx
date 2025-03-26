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
import { motion, AnimatePresence } from "framer-motion";

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
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("features");

  const toggleService = (id: number) => {
    setSelectedService(selectedService === id ? null : id);
    setActiveTab("features");
  };

  return (
    <Layout>
      <Head>
        <title>Services - TemitopeGX</title>
        <meta
          name="description"
          content="Professional web development, design, and digital marketing services"
        />
      </Head>

      <main className="min-h-screen bg-black pt-32 pb-24 px-4 sm:px-6">
        {/* Background Elements */}
        <div className="fixed inset-0 z-0">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#00FF00 0.5px, transparent 0.5px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#00FF00]/5 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#00FF00]/20 blur-lg rounded-full" />
                <div className="relative bg-black border border-[#00FF00] rounded-full px-4 py-1.5">
                  <span className="text-[#00FF00] font-mono text-sm uppercase tracking-wider">
                    What I Offer
                  </span>
                </div>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Professional Services
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Transforming ideas into exceptional digital experiences through
              creative design and innovative development solutions.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div
                  className={`relative bg-white/[0.03] backdrop-blur-sm rounded-xl p-6
                             border border-white/10 hover:border-[#00FF00]/30
                             transition-all duration-300 h-full
                             ${
                               selectedService === service.id
                                 ? "border-[#00FF00]/30"
                                 : ""
                             }`}
                >
                  {/* Service Icon */}
                  <div className="relative h-12 w-12 mb-6">
                    <div
                      className="absolute inset-0 bg-[#00FF00]/5 rounded-lg blur-lg
                                  group-hover:bg-[#00FF00]/10 transition-all duration-300"
                    />
                    <div className="relative h-full w-full flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={service.icon}
                        className="text-2xl text-[#00FF00] group-hover:scale-110
                                 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Service Content */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/60 mb-6">{service.description}</p>

                  {/* Expand Button */}
                  <button
                    onClick={() => toggleService(service.id)}
                    className="flex items-center gap-2 text-[#00FF00] hover:text-[#00FF00]/80
                             transition-colors duration-300 text-sm font-medium"
                  >
                    {selectedService === service.id ? "View Less" : "View More"}
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className={`transition-transform duration-300
                                ${
                                  selectedService === service.id
                                    ? "rotate-180"
                                    : ""
                                }`}
                    />
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {selectedService === service.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        {/* Tabs */}
                        <div className="flex gap-4 mt-6 mb-4 overflow-x-auto pb-2">
                          {Object.keys(service)
                            .filter((key) =>
                              Array.isArray(service[key as keyof Service])
                            )
                            .map((tab) => (
                              <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap
                                          transition-all duration-300
                                          ${
                                            activeTab === tab
                                              ? "bg-[#00FF00] text-black font-medium"
                                              : "text-white/60 hover:text-white"
                                          }`}
                              >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                              </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2"
                        >
                          {service[activeTab as keyof Service]?.map(
                            (item: string, i: number) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                className="flex items-center gap-2 text-white/80"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF00]" />
                                {item}
                              </motion.div>
                            )
                          )}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                       bg-[#00FF00] text-black font-medium
                       hover:bg-[#00FF00]/90 transition-all duration-300"
            >
              Start a Project
              <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </Link>
          </motion.div>
        </div>
      </main>
    </Layout>
  );
}
