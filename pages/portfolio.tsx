"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
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

      <main className="bg-dark min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />
          <div className="diagonal-stripe absolute top-1/2 -translate-y-1/2 w-full h-32 opacity-10" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
              Featured <span className="text-neon-green">Projects</span>
            </h1>
            <p className="text-gray-400 text-center text-lg md:text-xl max-w-3xl mx-auto">
              Showcasing some of our best work in web development, design, and
              branding
            </p>
          </div>
        </section>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-neon-green text-3xl animate-spin"
            />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-20">
            {error}
            <button
              onClick={fetchProjects}
              className="ml-4 text-neon-green hover:text-neon-green/80"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            {/* Featured Projects */}
            <section className="py-20 bg-dark-200">
              <div className="max-w-7xl mx-auto px-4">
                {featuredProjects.map((project, index) => (
                  <div
                    key={project._id}
                    className={`flex flex-col lg:flex-row gap-12 mb-32 ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Project Image */}
                    <div className="lg:w-3/5 relative group">
                      <div className="relative h-[400px] rounded-xl overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="lg:w-2/5 flex flex-col justify-center">
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-6">
                        {project.description}
                      </p>

                      {(project.challenge || project.solution) && (
                        <div className="space-y-4 mb-8">
                          {project.challenge && (
                            <div>
                              <h4 className="text-neon-green font-medium mb-2">
                                The Challenge
                              </h4>
                              <p className="text-gray-300">
                                {project.challenge}
                              </p>
                            </div>
                          )}
                          {project.solution && (
                            <div>
                              <h4 className="text-neon-green font-medium mb-2">
                                The Solution
                              </h4>
                              <p className="text-gray-300">
                                {project.solution}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-sm px-3 py-1 bg-neon-green/10 text-neon-green rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-neon-green hover:text-neon-green/80 transition-colors"
                        >
                          View Project
                          <FontAwesomeIcon
                            icon={faExternalLink}
                            className="text-sm"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Other Projects Grid */}
            {otherProjects.length > 0 && (
              <section className="py-20 bg-dark">
                <div className="max-w-7xl mx-auto px-4">
                  <h2 className="text-3xl font-bold mb-12">Other Projects</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherProjects.map((project) => (
                      <div
                        key={project._id}
                        className="bg-dark-200 rounded-xl overflow-hidden group hover:border-neon-green/30 border border-neon-green/10 transition-all duration-300"
                      >
                        <div className="relative h-48">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-white mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 bg-neon-green/10 text-neon-green rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-dark-200">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's work together to create something extraordinary
            </p>
            <a
              href="/contact"
              className="neon-button inline-flex items-center gap-2 text-lg"
            >
              Get in Touch
              <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </a>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">
              Find Me On <span className="text-neon-green">Social Media</span>
            </h2>
            <div className="flex justify-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 bg-dark-300 rounded-xl flex items-center justify-center text-gray-400 ${link.color} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-neon-green/20`}
                >
                  <FontAwesomeIcon icon={link.icon} className="text-2xl" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
