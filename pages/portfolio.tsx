"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faExternalLink,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPinterest,
  faBehance,
  faDribbble,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  challenge?: string;
  solution?: string;
  image: string;
  tags: string[];
  link?: string;
  featured: boolean;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/projects");

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const socialLinks = [
    {
      name: "Pinterest",
      icon: faPinterest,
      url: "https://www.pinterest.com/temitopeayomikun999/",
      color: "hover:text-[#E60023]",
    },
    {
      name: "Dribbble",
      icon: faDribbble,
      url: "https://dribbble.com/Temitope112211",
      color: "hover:text-[#EA4C89]",
    },
    {
      name: "Behance",
      icon: faBehance,
      url: "https://behance.net/temitopegx",
      color: "hover:text-[#1769FF]",
    },
    {
      name: "GitHub",
      icon: faGithub,
      url: "https://github.com/TemitopeGX",
      color: "hover:text-[#6e5494]",
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Portfolio - TemitopéGX</title>
        <meta
          name="description"
          content="Explore my portfolio of web development, design, and branding projects."
        />
      </Head>

      <main className="min-h-screen bg-black pt-32 pb-24">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
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
                    My Work
                  </span>
                </div>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured Projects
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              A showcase of my best work in web development, design, and digital
              experiences.
            </p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center gap-6 mt-8"
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white/60 hover:scale-110 transition-all duration-300 ${link.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={link.icon} className="text-2xl" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center py-20"
            >
              <FontAwesomeIcon
                icon={faSpinner}
                className="text-[#00FF00] text-3xl animate-spin"
              />
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center py-20 bg-red-500/10 rounded-xl backdrop-blur-sm"
            >
              <p className="mb-4">{error}</p>
              <button
                onClick={fetchProjects}
                className="px-4 py-2 bg-[#00FF00] text-black rounded-lg hover:bg-[#00FF00]/90 transition-colors"
              >
                Try again
              </button>
            </motion.div>
          ) : (
            <>
              {/* Featured Projects */}
              <div className="space-y-32">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex flex-col lg:flex-row gap-12 ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Project Image */}
                    <div className="lg:w-3/5 relative group">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="relative h-[400px] rounded-2xl overflow-hidden"
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Project Link */}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-4 right-4 bg-[#00FF00] text-black px-4 py-2 rounded-lg
                                     flex items-center gap-2 opacity-0 group-hover:opacity-100
                                     translate-y-4 group-hover:translate-y-0
                                     transition-all duration-300"
                          >
                            View Project
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="text-sm"
                            />
                          </a>
                        )}
                      </motion.div>
                    </div>

                    {/* Project Info */}
                    <div className="lg:w-2/5 flex flex-col justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <span className="text-[#00FF00] font-mono text-sm uppercase tracking-wider mb-2 block">
                          {project.category}
                        </span>
                        <h3 className="text-3xl font-bold text-white mb-4">
                          {project.title}
                        </h3>
                        <p className="text-white/60 mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-sm px-3 py-1 bg-[#00FF00]/10 text-[#00FF00] rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Challenge & Solution */}
                        {(project.challenge || project.solution) && (
                          <div className="space-y-6 mb-8">
                            {project.challenge && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="bg-white/[0.03] backdrop-blur-sm rounded-xl p-6 border border-white/10"
                              >
                                <h4 className="text-[#00FF00] font-medium mb-2 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00]" />
                                  The Challenge
                                </h4>
                                <p className="text-white/80">
                                  {project.challenge}
                                </p>
                              </motion.div>
                            )}
                            {project.solution && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="bg-white/[0.03] backdrop-blur-sm rounded-xl p-6 border border-white/10"
                              >
                                <h4 className="text-[#00FF00] font-medium mb-2 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00]" />
                                  The Solution
                                </h4>
                                <p className="text-white/80">
                                  {project.solution}
                                </p>
                              </motion.div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Other Projects Grid */}
              {otherProjects.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-32"
                >
                  <h2 className="text-3xl font-bold text-white mb-12 text-center">
                    Other Projects
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherProjects.map((project, index) => (
                      <motion.div
                        key={project._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group"
                      >
                        <div
                          className="bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/10
                                      hover:border-[#00FF00]/30 transition-all duration-300 overflow-hidden"
                        >
                          {/* Project Image */}
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          </div>

                          {/* Project Info */}
                          <div className="p-6">
                            <span className="text-[#00FF00] font-mono text-sm uppercase tracking-wider mb-2 block">
                              {project.category}
                            </span>
                            <h3 className="text-xl font-semibold text-white mb-3">
                              {project.title}
                            </h3>
                            <p className="text-white/60 text-sm mb-4 line-clamp-2">
                              {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-1 bg-[#00FF00]/10 text-[#00FF00] rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 3 && (
                                <span className="text-xs px-2 py-1 bg-white/5 text-white/60 rounded-full">
                                  +{project.tags.length - 3} more
                                </span>
                              )}
                            </div>

                            {/* Project Link */}
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[#00FF00] hover:text-[#00FF00]/80
                                         transition-colors duration-300 text-sm font-medium"
                              >
                                View Project
                                <FontAwesomeIcon
                                  icon={faArrowRight}
                                  className="text-xs transition-transform duration-300
                                           group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}
