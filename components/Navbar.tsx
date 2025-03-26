import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const router = useRouter();
  const { cartItems, isOpen, setIsOpen } = useCart();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setHasScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6"
    >
      <div
        className={`w-full max-w-[1200px] rounded-2xl backdrop-blur-md
                      ${
                        hasScrolled
                          ? "bg-black/40 border border-[var(--primary)]/10 shadow-[0_0_20px_rgba(57,255,19,0.1)]"
                          : "bg-black/20"
                      }`}
      >
        <nav className="relative h-16 flex items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-10">
            <motion.span
              className="text-lg sm:text-xl font-bold whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Temitope<span className="text-[var(--primary)]">GX</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className={`nav-link text-sm font-medium ${
                    isActive(link.href)
                      ? "text-[var(--primary)]"
                      : "text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4 z-10">
            {/* GitHub Button */}
            <motion.a
              href="https://github.com/TemitopeGX"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/80 hover:text-[var(--primary)] transition-colors hidden sm:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={faGithub} className="text-xl" />
            </motion.a>

            {/* Cart Button */}
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-white/80 hover:text-[var(--primary)] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-lg sm:text-xl"
              />
              <AnimatePresence>
                {cartItems?.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[var(--primary)] text-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  >
                    {cartItems.length}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Contact Button - Desktop */}
            <div className="hidden md:block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-xl text-sm font-medium
                           bg-[var(--primary)] text-black
                           hover:shadow-[0_0_20px_rgba(57,255,19,0.3)]
                           transition-all duration-300"
                >
                  Let's Talk
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-50 w-8 h-8 sm:w-10 sm:h-10 flex flex-col justify-center items-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span
                className={`w-5 sm:w-6 h-0.5 bg-[var(--primary)] transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                }`}
              />
              <span
                className={`w-5 sm:w-6 h-0.5 bg-[var(--primary)] transition-all duration-300 mt-1.5 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-0.5" : ""
                }`}
              />
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className="absolute top-full left-0 right-0 mt-4 p-4 rounded-2xl
                           bg-black/95 backdrop-blur-lg md:hidden
                           border border-[var(--primary)]/10"
              >
                <div className="flex flex-col space-y-4">
                  {/* Add GitHub link to mobile menu */}
                  <motion.a
                    href="https://github.com/TemitopeGX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-base sm:text-lg text-white/80 hover:text-[var(--primary)] transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <FontAwesomeIcon icon={faGithub} />
                    <span>GitHub</span>
                  </motion.a>
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={`block px-4 py-2 text-base sm:text-lg ${
                          isActive(link.href)
                            ? "text-[var(--primary)]"
                            : "text-white/80"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                    className="px-4 pt-2"
                  >
                    <Link
                      href="/contact"
                      className="block w-full py-2 text-center rounded-xl
                               bg-[var(--primary)] text-black font-medium
                               hover:shadow-[0_0_20px_rgba(57,255,19,0.3)]
                               transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Let's Talk
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </motion.header>
  );
}
