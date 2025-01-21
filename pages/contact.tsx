"use client";
import { useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faClock,
  faCheck,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  const handleMouseEnter = () => setCursorVariant("hover");
  const handleMouseLeave = () => setCursorVariant("default");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Format the message for WhatsApp
      const whatsappMessage = `*New Contact Form Message*\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`;

      // Format the phone number (remove any spaces or special characters)
      const phoneNumber = "+2347030513326";

      // Create the WhatsApp URL
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank");

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
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
      value: "temitopeoyesiji@gmail.com",
      href: "mailto:temitopeoyesiji@gmail.com",
    },
    {
      icon: faPhone,
      label: "Phone",
      value: "+234 703 051 3326",
      href: "tel:+2347030513326",
    },
    {
      icon: faLocationDot,
      label: "Location",
      value: "Lagos, Nigeria",
      href: "#",
    },
  ];

  const workingHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
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
                Let's Work Together
              </h1>
              <p className="text-lg md:text-2xl text-gray-600 mb-12">
                Have a project in mind? Get in touch and let's create something
                amazing.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="minimalist-section pt-0">
          <div className="minimalist-container">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="space-y-8">
                <div className="gradient-border p-[1px] rounded-2xl">
                  <form
                    onSubmit={handleSubmit}
                    className="gradient-border-content p-6 space-y-6"
                  >
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="minimalist-input"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="minimalist-input"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="minimalist-input"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="minimalist-input resize-none"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="minimalist-button w-full flex items-center justify-center"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {status === "loading" ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="animate-spin mr-2"
                        />
                      ) : status === "success" ? (
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                      ) : null}
                      {status === "loading"
                        ? "Sending..."
                        : status === "success"
                        ? "Message Sent!"
                        : "Send Message"}
                    </button>

                    {status === "error" && (
                      <p className="text-red-500 text-center">
                        Failed to send message. Please try again.
                      </p>
                    )}
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                {/* Contact Details */}
                <div className="gradient-border p-[1px] rounded-2xl">
                  <div className="gradient-border-content p-6 space-y-6">
                    <h3 className="text-xl font-bold text-gradient-animate">
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      {contactInfo.map((info) => (
                        <a
                          key={info.label}
                          href={info.href}
                          className="flex items-center space-x-4 text-gray-600 hover:text-[#2B3FF3] transition-colors group"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#2B3FF3]/10 to-[#6F3FF3]/10 flex items-center justify-center group-hover:from-[#2B3FF3]/20 group-hover:to-[#6F3FF3]/20 transition-colors">
                            <FontAwesomeIcon
                              icon={info.icon}
                              className="h-4 w-4 text-[#2B3FF3]"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              {info.label}
                            </p>
                            <p className="font-medium">{info.value}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="gradient-border p-[1px] rounded-2xl">
                  <div className="gradient-border-content p-6 space-y-6">
                    <h3 className="text-xl font-bold text-gradient-animate flex items-center">
                      <FontAwesomeIcon icon={faClock} className="mr-2" />
                      Working Hours
                    </h3>
                    <div className="space-y-4">
                      {workingHours.map((schedule) => (
                        <div
                          key={schedule.day}
                          className="flex justify-between items-center text-gray-600"
                        >
                          <span className="font-medium">{schedule.day}</span>
                          <span>{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
