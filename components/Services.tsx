import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faCode,
  faMobileScreen,
  faLaptopCode,
  faPaintBrush,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

export default function Services() {
  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="neo-brutalism-pink p-10 mb-16 transform rotate-1 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center">
            Our Services
          </h2>
          <p className="text-center text-2xl mt-4">Creating Digital Magic</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Graphic Design */}
          <div className="neo-brutalism-white p-10 transform hover:-rotate-1">
            <div className="bg-[#FFDE00] w-20 h-20 flex items-center justify-center mb-8">
              <FontAwesomeIcon
                icon={faPaintBrush}
                className="text-4xl text-black"
              />
            </div>
            <h3 className="text-3xl font-bold mb-6">Graphic Design</h3>
            <ul className="space-y-4 text-lg">
              <li>Brand Identity Design</li>
              <li>Logo Design</li>
              <li>Marketing Material</li>
            </ul>
          </div>

          {/* Web Development */}
          <div className="neo-brutalism-white p-10 transform hover:rotate-1">
            <div className="bg-[#FFDE00] w-20 h-20 flex items-center justify-center mb-8">
              <FontAwesomeIcon
                icon={faLaptopCode}
                className="text-4xl text-black"
              />
            </div>
            <h3 className="text-3xl font-bold mb-6">Web Development</h3>
            <p className="text-lg">
              Custom responsive websites and web applications built with modern
              technologies.
            </p>
          </div>

          {/* Media Services */}
          <div className="neo-brutalism-white p-10 transform hover:-rotate-1">
            <div className="bg-[#FFDE00] w-20 h-20 flex items-center justify-center mb-8">
              <FontAwesomeIcon
                icon={faCamera}
                className="text-4xl text-black"
              />
            </div>
            <h3 className="text-3xl font-bold mb-6">Media Services</h3>
            <p className="text-lg">
              Professional media production, content creation, and digital
              marketing solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
