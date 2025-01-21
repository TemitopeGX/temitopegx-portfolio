import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="minimalist-section relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="dot-pattern opacity-30" />
        <div className="grid-pattern opacity-20" />
      </div>
      <div className="particle-effect" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#2B3FF3]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-[#6F3FF3]/10 rounded-full blur-3xl animate-pulse" />

      <div className="minimalist-container relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-animate">
              Creative Digital Products
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 mb-8">
              Explore our collection of premium digital resources and tools
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="/store" className="minimalist-button">
                View Products
              </a>
              <a href="/contact" className="minimalist-button-outline">
                Get in Touch
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 relative w-full max-w-[500px]">
            <div className="relative w-full aspect-square">
              <Image
                src="/images/hero-image.png"
                alt="Creative Digital Products"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
