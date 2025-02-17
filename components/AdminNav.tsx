import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faProjectDiagram,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "./LogoutButton";

export default function AdminNav() {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  return (
    <div className="bg-dark-200 border-b border-neon-green/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/admin/dashboard"
              className="text-xl font-bold text-white hover:text-neon-green transition-colors"
            >
              Admin Panel
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/admin/dashboard"
                className={`flex items-center gap-2 transition-colors ${
                  isActive("/admin/dashboard")
                    ? "text-neon-green"
                    : "text-gray-300 hover:text-neon-green"
                }`}
              >
                <FontAwesomeIcon icon={faTachometerAlt} />
                Dashboard
              </Link>
              <Link
                href="/admin/projects"
                className={`flex items-center gap-2 transition-colors ${
                  isActive("/admin/projects")
                    ? "text-neon-green"
                    : "text-gray-300 hover:text-neon-green"
                }`}
              >
                <FontAwesomeIcon icon={faProjectDiagram} />
                Projects
              </Link>
              <Link
                href="/admin/products"
                className={`flex items-center gap-2 transition-colors ${
                  isActive("/admin/products")
                    ? "text-neon-green"
                    : "text-gray-300 hover:text-neon-green"
                }`}
              >
                <FontAwesomeIcon icon={faBoxOpen} />
                Products
              </Link>
            </nav>
          </div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
