import Link from "next/link";
import { useEffect, useState } from "react";

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
    <section className="min-h-screen flex items-center justify-center bg-[#FFDE00] relative">
      {/* Floating Shapes */}
      <div className="absolute left-20 top-40 w-40 h-40 bg-[#2B3FF3] transform -rotate-3 shadow-brutal floating-shape-left" />
      <div className="absolute right-20 top-20 w-40 h-40 bg-[#FF90E8] transform rotate-3 shadow-brutal floating-shape-right" />

      {/* Main Content Card */}
      <div className="bg-white border-2 border-black p-20 max-w-5xl mx-4 transform rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-6xl md:text-8xl font-black text-center mb-8">
          Welcome to TemitopeGX
        </h1>
        <div className="space-y-6 mb-12">
          <p className="text-center text-3xl font-bold">
            Home of <span className="text-[#2B3FF3]">Oasis Graphix</span>
          </p>
          <div className="flex items-center justify-center space-x-3">
            <p className="text-3xl font-bold">Specializing in</p>
            <div className="relative h-12 w-[300px] flex items-center">
              <span
                className={`text-[#2B3FF3] text-3xl font-black absolute left-0 ${
                  isErasing ? "animate-erasing" : "animate-typing"
                }`}
              >
                {services[currentService]}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href="/portfolio"
            className="bg-[#2B3FF3] text-white px-12 py-5 text-2xl font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
