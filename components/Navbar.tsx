import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
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
    <nav className="fixed w-full z-50 bg-dark/80 backdrop-blur-md border-b border-neon-green/20">
      <div className="max-w-7xl mx-auto px-4 h-20">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            TemitopéGX
            <span className="w-2 h-2 bg-neon-green inline-block ml-1 rounded-full"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-neon-green transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-gray-300 hover:text-neon-green transition-colors"
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className="text-gray-300 hover:text-neon-green transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="/store"
              className="text-gray-300 hover:text-neon-green transition-colors"
            >
              Store
            </Link>
            <Link href="/contact" className="neon-button">
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute left-0 right-0 bg-dark-200 transition-all duration-300 ease-in-out ${
            isOpen ? "top-20 opacity-100" : "-top-96 opacity-0"
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
