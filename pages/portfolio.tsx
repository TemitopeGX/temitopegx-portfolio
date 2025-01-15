import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBehance } from "@fortawesome/free-brands-svg-icons";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  behanceLink: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Brand Identity Design",
    description:
      "Complete brand identity design for a Nigerian Graphic Designer",
    image: "/images/portfolio/project1.jpg",
    category: "Branding",
    behanceLink:
      "https://www.behance.net/gallery/216897333/Brand-design-for-OasisGraphix",
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Modern web interface design for an e-commerce platform",
    image: "/images/portfolio/project2.jpg",
    category: "UI/UX",
    behanceLink: "https://be.net/temitopeoyesiji",
  },
  {
    id: 3,
    title: "Logo Design",
    description: "Minimalist logo design for a fashion brand",
    image: "/images/portfolio/project3.jpg",
    category: "Logo",
    behanceLink: "https://be.net/temitopeoyesiji",
  },
  // Add more portfolio items as needed
];

export default function Portfolio() {
  return (
    <Layout>
      <Head>
        <title>Portfolio - TemitopeGX</title>
        <meta
          name="description"
          content="Check out our latest work and creative projects"
        />
      </Head>

      <section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="neo-brutalism-white p-8 mb-16 rotate-1">
            <h1 className="text-4xl md:text-5xl font-black text-center">
              My Portfolio
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="neo-brutalism-card overflow-hidden transition-transform hover:-translate-y-2"
              >
                <div className="relative aspect-video">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 mb-4 text-sm neo-brutalism-white">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <a
                    href={item.behanceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#053eff] hover:underline flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faBehance} />
                    <span>View Project</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* External Profile Links */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-black mb-8">
              Find More of Our Work On
            </h2>
            <div className="flex justify-center gap-6">
              <a
                href="https://www.behance.net/temitopegx"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-brutalism-button bg-[#053eff] text-white group"
              >
                <span className="flex items-center">
                  <FontAwesomeIcon
                    icon={faBehance}
                    className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform"
                  />
                  Behance
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
