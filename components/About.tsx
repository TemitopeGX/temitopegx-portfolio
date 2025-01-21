import Image from "next/image";

const stats = [
  { number: "50+", label: "Projects Completed" },
  { number: "30+", label: "Happy Clients" },
  { number: "5+", label: "Years Experience" },
  { number: "100%", label: "Client Satisfaction" },
];

export default function About() {
  return (
    <section className="minimalist-section">
      <div className="minimalist-container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative h-[600px] fade-in">
            <div className="absolute inset-0 bg-gray-50 -z-10 rounded-2xl transform rotate-2"></div>
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <Image
                src="/images/about-me.jpg"
                alt="Temitope"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 fade-in delay-200">
            <div>
              <h2 className="minimalist-heading">About Me</h2>
              <p className="minimalist-subheading">
                Crafting digital experiences with passion and precision
              </p>
            </div>

            <div className="space-y-4 text-gray-600">
              <p>
                I'm Temitope, a creative professional specializing in graphic
                design, web development, and digital media. With a passion for
                creating impactful digital experiences, I help businesses
                transform their online presence.
              </p>
              <p>
                My approach combines aesthetic excellence with functional
                design, ensuring every project not only looks great but delivers
                real results for my clients.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8 pt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="fade-in">
                  <div className="text-3xl font-bold">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
