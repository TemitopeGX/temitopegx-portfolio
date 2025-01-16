import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faCode,
  faPaintBrush,
  faLaptop,
} from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
  const [currentService, setCurrentService] = useState(0);
  const [isErasing, setIsErasing] = useState(false);
  const services = [
    "Graphic Design",
    "Web Development",
    "Brand Identity",
    "UI/UX Design",
  ];

  useEffect(() => {
    const typingDelay = 2000;
    const erasingDelay = 1000;

    let timeout: NodeJS.Timeout;
    const interval = setInterval(() => {
      setIsErasing(true);

      timeout = setTimeout(() => {
        setCurrentService((prev) => (prev + 1) % services.length);
        setIsErasing(false);
      }, erasingDelay);
    }, typingDelay + erasingDelay);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FFDE00] relative overflow-hidden">
      {/* Animated Background Shapes for Mobile */}
      <div className="absolute inset-0 md:hidden">
        <div className="absolute left-[-20px] top-[20%] w-24 h-24 bg-[#2B3FF3] transform -rotate-12 animate-float-slow" />
        <div className="absolute right-[-10px] top-[30%] w-20 h-20 bg-[#FF90E8] transform rotate-12 animate-float-medium" />
        <div className="absolute left-[10%] bottom-[20%] w-16 h-16 bg-white transform rotate-45 animate-float-fast" />
      </div>

      {/* Desktop Floating Shapes */}
      <div className="hidden md:block">
        <div className="absolute left-20 top-40 w-32 h-32 bg-[#2B3FF3] transform -rotate-3 shadow-brutal floating-shape-left" />
        <div className="absolute right-20 top-20 w-32 h-32 bg-[#FF90E8] transform rotate-3 shadow-brutal floating-shape-right" />
      </div>

      {/* Main Content Card */}
      <div className="bg-white border-2 border-black p-8 md:p-12 w-[90%] md:max-w-4xl mx-4 transform rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10">
        <h1 className="text-4xl md:text-7xl font-black text-center mb-6 animate-fade-in">
          Welcome to TemitopeGX
        </h1>
        <div className="space-y-4 mb-8">
          <p className="text-center text-xl md:text-2xl font-bold animate-slide-up">
            Home of{" "}
            <span className="text-[#2B3FF3] hover:text-[#FF90E8] transition-colors">
              Oasis Graphix
            </span>
          </p>

          {/* Service Icons - Mobile Only */}
          <div className="flex justify-center space-x-4 md:hidden mb-4">
            <div className="w-10 h-10 bg-[#FFDE00] flex items-center justify-center rounded-full animate-bounce-slow">
              <FontAwesomeIcon icon={faPalette} className="text-black" />
            </div>
            <div className="w-10 h-10 bg-[#2B3FF3] flex items-center justify-center rounded-full animate-bounce-medium">
              <FontAwesomeIcon icon={faCode} className="text-white" />
            </div>
            <div className="w-10 h-10 bg-[#FF90E8] flex items-center justify-center rounded-full animate-bounce-fast">
              <FontAwesomeIcon icon={faPaintBrush} className="text-black" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-3">
            <p className="text-xl md:text-2xl font-bold">Specializing in</p>
            <div className="relative h-12 w-[300px] flex items-center justify-center md:justify-start">
              <span
                className={`text-[#2B3FF3] text-2xl md:text-3xl font-black absolute left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 ${
                  isErasing ? "animate-erasing" : "animate-typing"
                }`}
              >
                {services[currentService]}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center transform hover:scale-105 transition-transform">
          <Link
            href="/portfolio"
            className="bg-[#2B3FF3] text-white px-8 md:px-12 py-4 md:py-5 text-xl md:text-2xl font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
