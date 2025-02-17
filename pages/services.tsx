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
  color: string;
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
    color: "from-neon-purple/20 to-neon-purple/5",
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
    color: "from-neon-blue/20 to-neon-blue/5",
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
    color: "from-neon-green/20 to-neon-green/5",
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
    color: "from-neon-purple/20 to-neon-purple/5",
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
    color: "from-neon-blue/20 to-neon-blue/5",
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
    color: "from-neon-green/20 to-neon-green/5",
  },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCard = (id: number) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

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

      <main className="bg-dark min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />
          <div className="diagonal-stripe absolute top-1/2 -translate-y-1/2 w-full h-32 opacity-10" />

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
              Our <span className="text-neon-green">Services</span>
            </h1>
            <p className="text-gray-400 text-center text-lg md:text-xl max-w-3xl mx-auto">
              Transforming ideas into exceptional digital experiences through
              innovative design and development solutions
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-dark-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="bg-dark p-8 rounded-xl border border-neon-green/10 hover:border-neon-green/30 transition-all duration-300 group"
                >
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}
                  >
                    <FontAwesomeIcon
                      icon={service.icon}
                      className="text-2xl text-white"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-gray-300"
                      >
                        <span className="w-1.5 h-1.5 bg-neon-green rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-dark relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's work together to create something extraordinary
            </p>
            <Link
              href="/contact"
              className="neon-button inline-flex items-center gap-2 text-lg"
            >
              Get in Touch
              <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
