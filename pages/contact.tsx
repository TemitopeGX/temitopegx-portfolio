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
import { motion } from "framer-motion";

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
      const whatsappMessage = `*New Message from Portfolio*\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage: ${formData.message}`;
      const phoneNumber = "+2349060462586";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappUrl, "_blank");
      setFormData({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent successfully!");
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
      label: "Twitter",
    },
    {
      icon: faLinkedinIn,
      url: "https://linkedin.com/in/temitopegx",
      color: "hover:text-[#0A66C2]",
      label: "LinkedIn",
    },
    {
      icon: faGithub,
      url: "https://github.com/temitopegx",
      color: "hover:text-white",
      label: "GitHub",
    },
    {
      icon: faBehance,
      url: "https://behance.net/temitopegx",
      color: "hover:text-[#1769FF]",
      label: "Behance",
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
                    Contact Me
                  </span>
                </div>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Work Together
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Have a project in mind? Let's discuss how we can work together to
              bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="bg-white/[0.03] backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-8">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-6 p-4 rounded-xl hover:bg-white/[0.02] transition-all duration-300 group"
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-12 h-12 bg-[#00FF00]/10 rounded-xl flex items-center justify-center group-hover:bg-[#00FF00]/20 transition-colors duration-300">
                        <FontAwesomeIcon
                          icon={info.icon}
                          className="text-[#00FF00] text-xl"
                        />
                      </div>
                      <div>
                        <p className="text-white/40 text-sm">{info.label}</p>
                        <p className="text-white font-medium">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/[0.03] backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-8">
                  Connect With Me
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 group"
                      whileHover={{ y: -5 }}
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/[0.05] group-hover:bg-white/[0.1]">
                        <FontAwesomeIcon
                          icon={social.icon}
                          className={`text-xl transition-colors duration-300 text-white/60 ${social.color}`}
                        />
                      </div>
                      <span className="text-white/60 group-hover:text-white transition-colors duration-300">
                        {social.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/[0.03] backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-white mb-8">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-white/60 text-sm">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white
                               focus:outline-none focus:border-[#00FF00]/30 focus:bg-white/[0.04]
                               transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-white/60 text-sm">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white
                               focus:outline-none focus:border-[#00FF00]/30 focus:bg-white/[0.04]
                               transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-white/60 text-sm">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white
                             focus:outline-none focus:border-[#00FF00]/30 focus:bg-white/[0.04]
                             transition-all duration-300"
                    placeholder="Project Discussion"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-white/60 text-sm">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white
                             focus:outline-none focus:border-[#00FF00]/30 focus:bg-white/[0.04]
                             transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00FF00] text-black font-medium py-4 rounded-xl
                           hover:bg-[#00FF00]/90 transition-all duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
