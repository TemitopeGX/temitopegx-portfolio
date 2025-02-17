"use client";
import { useState } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faPaperPlane,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faLinkedinIn,
  faGithub,
  faBehance,
} from "@fortawesome/free-brands-svg-icons";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: faEnvelope,
      label: "Email",
      value: "temitopeayomikun999@gmail.com",
      link: "mailto:temitopeayomikun999@gmail.com",
    },
    {
      icon: faPhone,
      label: "Phone",
      value: "+234 906 046 2586",
      link: "tel:+2349060462586",
    },
    {
      icon: faMapMarkerAlt,
      label: "Location",
      value: "Osun State, Nigeria",
      link: "https://maps.google.com/?q=Osun+State+Nigeria",
    },
  ];

  const socialLinks = [
    {
      icon: faTwitter,
      url: "https://twitter.com/temitopegx",
      color: "hover:text-[#1DA1F2]",
    },
    {
      icon: faLinkedinIn,
      url: "https://linkedin.com/in/temitopegx",
      color: "hover:text-[#0A66C2]",
    },
    {
      icon: faGithub,
      url: "https://github.com/temitopegx",
      color: "hover:text-white",
    },
    {
      icon: faBehance,
      url: "https://behance.net/temitopegx",
      color: "hover:text-[#1769FF]",
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Contact - Let's Work Together</title>
        <meta
          name="description"
          content="Get in touch with us for your next creative project. We're here to help bring your vision to life."
        />
      </Head>

      <div className="min-h-screen bg-dark">
        {/* Header Section */}
        <div className="bg-dark-200 border-b border-neon-green/10">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get in <span className="text-neon-green">Touch</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Have a project in mind? Let's discuss how we can work together
                to bring your ideas to life.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-dark-200 rounded-2xl p-8 border border-neon-green/10">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-dark-300 rounded-xl hover:bg-dark-400 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-neon-green/10 rounded-lg flex items-center justify-center group-hover:bg-neon-green/20 transition-colors">
                        <FontAwesomeIcon
                          icon={info.icon}
                          className="text-neon-green text-xl"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{info.label}</p>
                        <p className="text-white font-medium">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-dark-200 rounded-2xl p-8 border border-neon-green/10">
                <h2 className="text-2xl font-bold mb-6">Follow Me</h2>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-dark-300 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-colors`}
                    >
                      <FontAwesomeIcon icon={social.icon} className="text-xl" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-dark-200 rounded-2xl p-8 border border-neon-green/10">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-300 border border-neon-green/10 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-neon-green/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-300 border border-neon-green/10 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-neon-green/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 text-sm">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-300 border border-neon-green/10 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-neon-green/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 text-sm">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-dark-300 border border-neon-green/10 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-neon-green/30 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neon-green text-dark font-semibold px-6 py-4 rounded-xl hover:bg-neon-green/90 transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
