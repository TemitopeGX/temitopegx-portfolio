import Navbar from "./Navbar";
import Footer from "./Footer";
import { FontAwesomeSetup } from "./FontAwesomeSetup";
import Cart from "./Cart";
import CustomCursor from "./CustomCursor";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // Check if device is mobile
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    // Only add cursor-none class on desktop
    if (!isMobile) {
      document.documentElement.classList.add("cursor-none");
    }

    return () => {
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark">
      <FontAwesomeSetup />
      <CustomCursor />
      <Navbar />
      <main className="pt-16">{children}</main>
      <Cart />
      <Footer />
    </div>
  );
}
