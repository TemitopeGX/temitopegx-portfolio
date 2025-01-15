import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBehance } from "@fortawesome/free-brands-svg-icons";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  location: string;
  projectLink?: string;
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
    projectLink: "https://be.net/temitopeoyesiji",
  },
  {
    id: 2,
    name: "Chidinma Okonkwo",
    role: "Creative Director",
    company: "AfriCreate Studio",
    image: "/images/testimonials/client2.jpg",
    text: "The quality of work delivered was exceptional. Temitope understood our vision and created designs that resonated with our Nigerian audience while maintaining international standards.",
    location: "Abuja, Nigeria",
    projectLink: "https://be.net/temitopeoyesiji",
  },
  {
    id: 3,
    name: "Ibrahim Yusuf",
    role: "Founder",
    company: "NorthTech Innovations",
    image: "/images/testimonials/client3.jpg",
    text: "His understanding of both traditional and modern Nigerian aesthetics helped us create a brand that truly connects with our target market. The results have exceeded our expectations!",
    location: "Kano, Nigeria",
    projectLink: "https://be.net/temitopeoyesiji",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-[#FFF0F0]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mb-12">
          <h2 className="text-4xl font-black text-center text-gradient">
            Client Reviews
          </h2>
          <a
            href="https://be.net/temitopeoyesiji"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-brutalism-button bg-[#053eff] text-white flex items-center gap-2 hover:bg-[#0035db]"
          >
            <FontAwesomeIcon icon={faBehance} />
            <span>View Portfolio</span>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="neo-brutalism-card p-6 bg-white transition-transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                  <p className="text-sm text-[#2B3FF3]">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              <blockquote className="relative mb-8">
                <span className="text-5xl text-[#FF90E8] absolute -top-4 -left-2">
                  "
                </span>
                <p className="text-gray-700 italic pl-6">{testimonial.text}</p>
                <span className="text-5xl text-[#FF90E8] absolute -bottom-8 right-0">
                  "
                </span>
              </blockquote>

              {testimonial.projectLink && (
                <a
                  href={testimonial.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#053eff] hover:underline flex items-center gap-1 mt-4"
                >
                  <FontAwesomeIcon icon={faBehance} />
                  <span>View Project on Behance</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
