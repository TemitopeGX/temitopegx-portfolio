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
    },
    {
      name: "Instagram",
      href: "https://instagram.com/yourusername",
      icon: faInstagram,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/yourusername",
      icon: faLinkedin,
    },
    {
      name: "Behance",
      href: "https://behance.net/yourusername",
      icon: faBehance,
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

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-neon-green/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold text-white">
              TemitopéGX
              <span className="w-2 h-2 bg-neon-green inline-block ml-1 rounded-full"></span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-xs">
              Turning digital dreams into reality through innovative design and
              development
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-neon-green transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              {navigation.contact.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neon-green/10 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-neon-green"
                    />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-neon-green transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-gray-400">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neon-green/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} TemitopéGX. All rights reserved.
            </p>
            <div className="flex gap-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neon-green/10 rounded-lg flex items-center justify-center hover:bg-neon-green/20 transition-colors"
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-neon-green"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
