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
      href: "https://twitter.com/temitopeoyesiji",
      icon: faTwitter,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/temitopeoyesiji",
      icon: faInstagram,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/temitopeoyesiji",
      icon: faLinkedin,
    },
    {
      name: "Behance",
      href: "https://behance.net/temitopeoyesiji",
      icon: faBehance,
    },
  ],
  contact: [
    {
      name: "Email",
      value: "temitopeoyesiji@gmail.com",
      href: "mailto:temitopeoyesiji@gmail.com",
      icon: faEnvelope,
    },
    {
      name: "Phone",
      value: "+234 703 051 3326",
      href: "tel:+2347030513326",
      icon: faPhone,
    },
    {
      name: "Location",
      value: "Lagos, Nigeria",
      href: "#",
      icon: faLocationDot,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-white">
      <div className="absolute inset-0">
        <div className="dot-pattern opacity-30" />
        <div className="grid-pattern opacity-20" />
      </div>
      {/* Animated background orbs */}
      <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-[#2B3FF3]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-[#6F3FF3]/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="text-2xl font-bold text-gradient-animate">
              TemitopéGX
            </Link>
            <p className="text-gray-600 max-w-xs">
              Crafting digital experiences with innovative design and
              cutting-edge technology.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#2B3FF3] transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <FontAwesomeIcon icon={item.icon} className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Quick Links
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-600 hover:text-[#2B3FF3] transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="mt-12 md:mt-0">
                <h3 className="text-lg font-semibold text-gray-900">
                  Contact Info
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.contact.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-gray-600 hover:text-[#2B3FF3] transition-colors flex items-center"
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="h-5 w-5 mr-2"
                        />
                        <span>{item.value}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-gray-500 text-center">
            &copy; {new Date().getFullYear()} TemitopéGX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
