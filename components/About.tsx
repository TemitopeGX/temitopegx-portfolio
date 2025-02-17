import Image from "next/image";

const stats = [
  { number: "50+", label: "Projects Completed" },
  { number: "30+", label: "Happy Clients" },
  { number: "5+", label: "Years Experience" },
  { number: "100%", label: "Client Satisfaction" },
];

export default function About() {
  return (
    <section className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[600px]">
            <div className="absolute inset-0 bg-neon-green/5 rounded-lg transform rotate-2" />
            <Image
              src="/images/about-me.jpg"
              alt="About Me"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-neon-green">About Me</h2>
            <p className="text-gray-400">
              I'm a creative professional specializing in graphic design, web
              development, and digital media.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
