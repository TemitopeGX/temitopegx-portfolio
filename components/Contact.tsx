import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

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
    icon: faLocationDot,
    label: "Location",
    value: "Osun State, Nigeria",
  },
];

const formFields = [
  { name: "name", label: "Your Name", type: "text" },
  { name: "email", label: "Your Email", type: "email" },
  { name: "subject", label: "Subject", type: "text" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Format the message for WhatsApp
      const message = `*New Message from Portfolio*\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message);

      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/2349060462586?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank");

      // Reset form
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#00FF00 0.5px, transparent 0.5px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00FF00]/5 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
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

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base">
            Have a project in mind? Let's discuss how we can bring your ideas to
            life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/[0.03] backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {formFields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.label}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 
                               text-white placeholder:text-white/30
                               focus:border-[#00FF00]/50 focus:ring-1 focus:ring-[#00FF00]/50
                               transition-all duration-300"
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 
                             text-white placeholder:text-white/30
                             focus:border-[#00FF00]/50 focus:ring-1 focus:ring-[#00FF00]/50
                             transition-all duration-300"
                  />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full bg-[#00FF00] text-black font-semibold py-4 rounded-lg
                           hover:bg-[#00FF00]/90 disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting
                      ? "Opening WhatsApp..."
                      : "Send Message via WhatsApp"}
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="text-sm transition-transform group-hover:translate-x-1"
                    />
                  </span>
                  <div
                    className="absolute inset-0 bg-white/20 translate-y-full
                               group-hover:translate-y-0 transition-transform duration-300"
                  />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group"
              >
                <div
                  className="bg-white/[0.03] backdrop-blur-sm rounded-xl p-6
                              border border-white/10 hover:border-[#00FF00]/30
                              transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 flex items-center justify-center">
                      <div
                        className="absolute inset-0 bg-[#00FF00]/5 rounded-lg blur-lg
                                    group-hover:bg-[#00FF00]/10 transition-all duration-300"
                      />
                      <FontAwesomeIcon
                        icon={info.icon}
                        className="text-xl text-[#00FF00] group-hover:scale-110
                                 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white/60">
                        {info.label}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-white hover:text-[#00FF00] transition-colors duration-300"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white">{info.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Map or Additional Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white/[0.03] backdrop-blur-sm rounded-xl p-6 border border-white/10"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
