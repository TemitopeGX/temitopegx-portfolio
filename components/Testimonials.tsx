import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBehance, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  location: string;
  socialLinks?: {
    behance?: string;
    linkedin?: string;
  };
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Oluwaseun Adebayo",
    role: "CEO",
    company: "TechNaija Solutions",
    image: "/images/testimonials/client1.jpg",
    text: "Working with Temitope was amazing! The brand identity transformation exceeded our expectations. His attention to detail and understanding of our local market needs was impressive.",
    location: "Lagos, Nigeria",
    socialLinks: {
      behance: "https://be.net/temitopeoyesiji",
      linkedin: "https://linkedin.com/in/oluwaseun-adebayo",
    },
  },
  {
    id: 2,
    name: "Chidinma Okonkwo",
    role: "Creative Director",
    company: "AfriCreate Studio",
    image: "/images/testimonials/client2.jpg",
    text: "The quality of work delivered was exceptional. Temitope understood our vision and created designs that resonated with our Nigerian audience while maintaining international standards.",
    location: "Abuja, Nigeria",
    socialLinks: {
      behance: "https://be.net/temitopeoyesiji",
    },
  },
  {
    id: 3,
    name: "Ibrahim Yusuf",
    role: "Founder",
    company: "NorthTech Innovations",
    image: "/images/testimonials/client3.jpg",
    text: "His understanding of both traditional and modern Nigerian aesthetics helped us create a brand that truly connects with our target market. The results have exceeded our expectations!",
    location: "Kano, Nigeria",
    socialLinks: {
      behance: "https://be.net/temitopeoyesiji",
      linkedin: "https://linkedin.com/in/ibrahim-yusuf",
    },
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="minimalist-section relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="dot-pattern opacity-30" />
        <div className="grid-pattern opacity-20" />
      </div>
      <div className="particle-effect" />
      <div className="absolute top-40 right-0 w-96 h-96 bg-[#2B3FF3]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6F3FF3]/10 rounded-full blur-3xl animate-pulse" />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="floating-element w-8 h-8 bg-gradient-to-br from-[#2B3FF3]/20 to-[#6F3FF3]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="minimalist-container relative">
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
          <h2 className="text-4xl font-bold mb-6 text-gradient-animate">
            Client Stories
          </h2>
          <p className="text-xl text-gray-600">
            Hear from businesses we've helped transform through design
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group"
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className={`gradient-border card-hover-effect ${
                  activeIndex === index ? "scale-[1.02]" : ""
                }`}
              >
                <div className="gradient-border-content p-8 h-full">
                  <div className="flex flex-col h-full fade-in">
                    {/* Quote Icon with Enhanced Animation */}
                    <div className="mb-6 transform transition-transform duration-500 group-hover:rotate-12">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#2B3FF3] to-[#6F3FF3] rounded-xl flex items-center justify-center glow-effect">
                        <FontAwesomeIcon
                          icon={faQuoteLeft}
                          className="text-2xl text-white"
                        />
                      </div>
                    </div>

                    {/* Testimonial Text with Gradient Effect */}
                    <blockquote className="text-gray-600 mb-8 italic relative">
                      <span className="text-gradient-animate font-medium text-lg">
                        "{testimonial.text}"
                      </span>
                    </blockquote>

                    {/* Enhanced Client Info */}
                    <div className="mt-auto">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 transform transition-transform duration-500 group-hover:scale-110">
                          <div className="absolute inset-0 gradient-border rounded-xl glow-effect">
                            <div className="absolute inset-[1px] overflow-hidden rounded-xl">
                              <Image
                                src={testimonial.image}
                                alt={testimonial.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg text-gradient-animate">
                            {testimonial.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {testimonial.role} at {testimonial.company}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>

                      {/* Enhanced Social Links */}
                      {testimonial.socialLinks && (
                        <div className="flex space-x-4 mt-4 pt-4 border-t border-gray-100">
                          {testimonial.socialLinks.behance && (
                            <a
                              href={testimonial.socialLinks.behance}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-[#2B3FF3] transition-colors transform hover:scale-110 transition-transform duration-300"
                            >
                              <FontAwesomeIcon
                                icon={faBehance}
                                className="w-5 h-5 hover-glow"
                              />
                            </a>
                          )}
                          {testimonial.socialLinks.linkedin && (
                            <a
                              href={testimonial.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-[#2B3FF3] transition-colors transform hover:scale-110 transition-transform duration-300"
                            >
                              <FontAwesomeIcon
                                icon={faLinkedin}
                                className="w-5 h-5 hover-glow"
                              />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-20 fade-in">
          <div className="glass-card inline-block px-8 py-6 card-hover-effect">
            <p className="text-xl text-gradient-animate mb-6">
              Ready to transform your brand?
            </p>
            <a href="/contact" className="minimalist-button">
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
