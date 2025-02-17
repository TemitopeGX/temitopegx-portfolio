import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="min-h-screen bg-dark relative overflow-hidden flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />
      <div className="diagonal-stripe absolute top-1/2 -translate-y-1/2 w-full h-32 opacity-10" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              I can deliver results that
              <span className="text-neon-green block mt-2">
                exceed expectations.
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl">
              Creative designer and developer crafting innovative digital
              experiences
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/portfolio" className="neon-button">
                View Portfolio
              </Link>
              <Link
                href="/contact"
                className="border border-white/20 px-6 py-2 hover:border-neon-green hover:text-neon-green transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex-1 relative flex justify-center items-center">
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-neon-green/20 rounded-full blur-3xl animate-pulse" />

            {/* Frame and image container */}
            <div className="relative w-[400px] h-[500px] md:w-[450px] md:h-[600px]">
              {/* Decorative frame */}
              <div className="absolute inset-0 border-2 border-neon-green/50 rounded-2xl transform rotate-2 -z-10" />
              <div className="absolute inset-0 border-2 border-neon-green/30 rounded-2xl transform -rotate-2 -z-10" />

              {/* Image container with alternative gradient background */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                {/* Gradient background - choose one of these options */}

                {/* Option 1: Radial gradient */}
                <div className="absolute inset-0 bg-gradient-radial from-dark-200 via-dark-300 to-dark" />

                {/* Option 2: Angular gradient */}
                <div className="absolute inset-0 bg-gradient-conic from-dark-300 via-dark to-dark-200" />

                {/* Option 3: Diagonal gradient with accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-300 via-neon-green/5 to-dark" />

                {/* Image */}
                <Image
                  src="/images/about-me.png"
                  alt="Temitope"
                  fill
                  className="object-cover object-center relative z-10"
                  priority
                  sizes="(max-width: 768px) 400px, 450px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
