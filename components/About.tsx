import Image from "next/image";

export default function About() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="neo-brutalism-white p-8 transform -rotate-1">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Image */}
            <div className="w-full md:w-1/2">
              <div className="neo-brutalism-image aspect-square relative">
                <Image
                  src="/images/about-me.jpg"
                  alt="Temitope"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Hey there! 👋</h2>
              <p className="mb-4">
                I'm Temitope, a creative professional specializing in graphic
                design, web development, and digital media.
              </p>
              <p className="mb-6">
                With over 5 years of experience, I've helped businesses
                transform their digital presence through compelling design and
                innovative solutions.
              </p>

              {/* Stats */}
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">30+</div>
                  <div className="text-sm">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
