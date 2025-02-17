import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const router = useRouter();
  const { cartItems, isOpen, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/store", label: "Store" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-neon-green/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <Link href="/" className="text-xl font-bold">
            Temitope<span className="text-neon-green">GX</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-gray-300 hover:text-neon-green transition-colors ${
                  isActive(link.href) ? "text-neon-green" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side - Cart Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-gray-400 hover:text-neon-green transition-colors"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
              <AnimatePresence>
                {cartItems?.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-neon-green text-dark w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  >
                    {cartItems.length}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute left-0 right-0 bg-dark-200 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "top-20 opacity-100" : "-top-96 opacity-0"
          }`}
        >
          <div className="p-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-300 hover:text-neon-green py-2"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="block text-gray-300 hover:text-neon-green py-2"
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className="block text-gray-300 hover:text-neon-green py-2"
            >
              Portfolio
            </Link>
            <Link
              href="/store"
              className="block text-gray-300 hover:text-neon-green py-2"
            >
              Store
            </Link>
            <Link href="/contact" className="neon-button block text-center">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
