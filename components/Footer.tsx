import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faLinkedin,
  faBehance,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Store", href: "/store" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    {
      name: "Twitter",
      href: "https://twitter.com/yourusername",
      icon: faTwitter,
      hoverColor: "hover:bg-[#1DA1F2]",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/yourusername",
      icon: faInstagram,
      hoverColor: "hover:bg-[#E4405F]",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/yourusername",
      icon: faLinkedin,
      hoverColor: "hover:bg-[#0A66C2]",
    },
    {
      name: "Behance",
      href: "https://behance.net/yourusername",
      icon: faBehance,
      hoverColor: "hover:bg-[#1769FF]",
    },
  ],
  contact: [
    {
      icon: faEnvelope,
      label: "Email",
      value: "temitopeayomikun999@gmail.com",
      href: "mailto:temitopeayomikun999@gmail.com",
    },
    {
      icon: faPhone,
      label: "Phone",
      value: "+234 906 046 2586",
      href: "tel:+2349060462586",
    },
    {
      icon: faLocationDot,
      label: "Location",
      value: "Osun State, Nigeria",
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-[#00FF00]/10">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#00FF00 0.5px, transparent 0.5px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF00]/5 to-transparent" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Section */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 space-y-6"
          >
            <Link href="/" className="inline-flex items-center space-x-2 group">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                TemitopéGX
              </span>
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="w-2 h-2 bg-[#00FF00] rounded-full"
              />
            </Link>
            <p className="text-white/60 max-w-md leading-relaxed">
              Turning digital dreams into reality through innovative design and
              development. Creating exceptional digital experiences that inspire
              and engage.
            </p>
            <div className="flex gap-4">
              {navigation.social.map((item) => (
                <motion.a
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center
                             bg-white/[0.03] backdrop-blur-lg border border-white/10
                             ${item.hoverColor} hover:text-white
                             group transition-all duration-300`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-[#00FF00] group-hover:text-white transition-colors duration-300"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 space-y-6"
          >
            <h3 className="text-white font-bold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <motion.li
                  key={item.name}
                  whileHover={{ x: 6 }}
                  className="w-fit"
                >
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-[#00FF00] transition-colors duration-300
                             flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00]/40 group-hover:bg-[#00FF00] transition-colors duration-300" />
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-5 space-y-6"
          >
            <h3 className="text-white font-bold text-lg">Contact Info</h3>
            <ul className="space-y-4">
              {navigation.contact.map((item) => (
                <motion.li
                  key={item.label}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className="w-12 h-12 rounded-xl bg-white/[0.03] backdrop-blur-lg
                                border border-white/10 flex items-center justify-center
                                group-hover:border-[#00FF00]/30 transition-all duration-300"
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-[#00FF00]"
                    />
                  </div>
                  <div>
                    <p className="text-white/40 text-sm">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white hover:text-[#00FF00] transition-colors duration-300"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-white">{item.value}</span>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-[#00FF00]/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-center md:text-left">
              © {new Date().getFullYear()} TemitopéGX. All rights reserved.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
