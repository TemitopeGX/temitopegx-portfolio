import { useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faBehance } from "@fortawesome/free-brands-svg-icons";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  behanceLink: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Brand Identity Design",
    description:
      "Complete brand identity design for a Nigerian Graphic Designer",
    image: "/images/portfolio/project1.jpg",
    category: "Branding",
    behanceLink:
      "https://www.behance.net/gallery/216897333/Brand-design-for-OasisGraphix",
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Modern web interface design for an e-commerce platform",
    image: "/images/portfolio/project2.jpg",
    category: "UI/UX",
    behanceLink: "https://be.net/temitopeoyesiji",
  },
  {
    id: 3,
    title: "Logo Design",
    description: "Minimalist logo design for a fashion brand",
    image: "/images/portfolio/project3.jpg",
    category: "Logo",
    behanceLink: "https://be.net/temitopeoyesiji",
  },
];

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  const handleMouseEnter = () => setCursorVariant("hover");
  const handleMouseLeave = () => setCursorVariant("default");

  return (
    <Layout>
      <Head>
        <title>Portfolio - Creative Design & Development Projects</title>
        <meta
          name="description"
          content="Explore our portfolio of innovative design and development projects. From brand identity to web applications, discover our creative solutions."
        />
      </Head>

      {/* Custom Cursor */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-300 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${
            cursorVariant === "hover" ? 1.5 : 1
          })`,
        }}
      >
        <div className="w-5 h-5 bg-white rounded-full" />
      </div>

      {/* Mouse/Touch Follower */}
      <div
        className="fixed pointer-events-none z-40"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#2B3FF3]/20 to-[#6F3FF3]/20 blur-3xl animate-pulse" />
      </div>

      <div className="min-h-screen w-full">
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
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-animate">
                Our Creative Portfolio
              </h1>
              <p className="text-lg md:text-2xl text-gray-600 mb-12">
                Showcasing innovative solutions and creative excellence in
                design and development
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="minimalist-section relative overflow-hidden">
          <div className="minimalist-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="group fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="gradient-border card-hover-effect">
                    <div className="gradient-border-content">
                      {/* Project Image */}
                      <div className="relative h-64 mb-6 overflow-hidden rounded-t-xl">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="p-6">
                        {/* Project Category */}
                        <span className="inline-block px-3 py-1 mb-4 text-sm rounded-full bg-gradient-to-r from-[#2B3FF3]/10 to-[#6F3FF3]/10 text-[#2B3FF3]">
                          {project.category}
                        </span>

                        {/* Project Title & Description */}
                        <h3 className="text-xl font-bold mb-4 text-gradient-animate">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {project.description}
                        </p>

                        {/* View on Behance Link */}
                        <a
                          href={project.behanceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2B3FF3] font-medium flex items-center group hover:opacity-80 transition-opacity"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <FontAwesomeIcon icon={faBehance} className="mr-2" />
                          View Project
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="ml-2 transform group-hover:translate-x-1 transition-transform"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Expertise Section */}
        <section className="minimalist-section relative overflow-hidden py-20">
          <div className="absolute inset-0">
            <div className="dot-pattern opacity-20" />
            <div className="grid-pattern opacity-10" />
          </div>
          {/* Animated background orbs */}
          <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-[#2B3FF3]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-[#6F3FF3]/20 rounded-full blur-3xl animate-pulse" />

          <div className="minimalist-container relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient-animate">
                Skills & Expertise
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Crafting digital experiences with cutting-edge technologies
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Design Skills */}
              <div className="mb-12 transform hover:scale-[1.02] transition-transform duration-300">
                <div
                  className="glass-card p-8 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <h3 className="text-xl font-bold mb-6 text-gradient-animate flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-[#2B3FF3] to-[#6F3FF3] rounded-full mr-3 animate-pulse"></span>
                    Design
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "UI/UX Design",
                      "Brand Identity",
                      "Logo Design",
                      "Wireframing",
                      "Prototyping",
                    ].map((skill, index) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-gradient-to-r from-[#2B3FF3]/10 to-[#6F3FF3]/10 text-[#2B3FF3] rounded-xl text-sm font-medium border border-[#2B3FF3]/20 hover:border-[#2B3FF3]/40 transition-colors duration-300 fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tools */}
              <div className="mb-12 transform hover:scale-[1.02] transition-transform duration-300">
                <div
                  className="glass-card p-8 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <h3 className="text-xl font-bold mb-6 text-gradient-animate flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-[#6F3FF3] to-[#2B3FF3] rounded-full mr-3 animate-pulse"></span>
                    Tools
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Figma",
                      "Adobe XD",
                      "Photoshop",
                      "Illustrator",
                      "After Effects",
                    ].map((tool, index) => (
                      <span
                        key={tool}
                        className="px-4 py-2 bg-gradient-to-r from-[#6F3FF3]/10 to-[#2B3FF3]/10 text-[#6F3FF3] rounded-xl text-sm font-medium border border-[#6F3FF3]/20 hover:border-[#6F3FF3]/40 transition-colors duration-300 fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Development */}
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <div
                  className="glass-card p-8 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <h3 className="text-xl font-bold mb-6 text-gradient-animate flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-[#2B3FF3] to-[#6F3FF3] rounded-full mr-3 animate-pulse"></span>
                    Development
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "HTML5",
                      "CSS3",
                      "JavaScript",
                      "React",
                      "Next.js",
                      "Tailwind CSS",
                    ].map((tech, index) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-[#2B3FF3]/10 to-[#6F3FF3]/10 text-[#2B3FF3] rounded-xl text-sm font-medium border border-[#2B3FF3]/20 hover:border-[#2B3FF3]/40 transition-colors duration-300 fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="minimalist-section relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="dot-pattern opacity-30" />
            <div className="grid-pattern opacity-20" />
          </div>
          <div className="minimalist-container relative">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient-animate">
                Ready to Create Your Success Story?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Let's collaborate to bring your vision to life with innovative
                design and cutting-edge technology
              </p>
              <a
                href="/contact"
                className="minimalist-button"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Start Your Project
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
