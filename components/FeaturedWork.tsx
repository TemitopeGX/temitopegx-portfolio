import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const projects = [
  {
    id: 1,
    title: "Brand Identity Design",
    category: "Branding",
    image: "/images/project1.jpg",
    link: "/portfolio/project1",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    category: "Web Development",
    image: "/images/project2.jpg",
    link: "/portfolio/project2",
  },
  {
    id: 3,
    title: "Mobile App UI/UX",
    category: "UI/UX Design",
    image: "/images/project3.jpg",
    link: "/portfolio/project3",
  },
];

export default function FeaturedWork() {
  return (
    <section className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Featured <span className="text-neon-green">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of my recent work in design and development
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {projects.map((project) => (
            <Link
              href={project.link}
              key={project.id}
              className="group relative overflow-hidden rounded-xl"
            >
              {/* Project Image */}
              <div className="aspect-[4/3] relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60" />
              </div>

              {/* Project Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="text-neon-green text-sm mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-neon-green/0 transition-all duration-300 group-hover:border-neon-green/50 rounded-xl" />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-neon-green hover:text-neon-green/80 transition-colors"
          >
            <span>View All Projects</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
