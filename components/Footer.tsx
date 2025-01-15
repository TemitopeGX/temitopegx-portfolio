import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black/90 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm">
              Professional creative solutions for your digital needs.
              Specializing in graphic design, web development, and media
              services.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/portfolio"
                  className="text-sm hover:text-blue-500 transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm hover:text-blue-500 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="text-sm hover:text-blue-500 transition-colors"
                >
                  Store
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:text-blue-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: temitopeayomikun999@gmail.com</li>
              <li>Phone: +2349060462586</li>
              <li>Address: Osun State, Nigeria</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} TemitopeGX - Home of Oasis
            Graphix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
