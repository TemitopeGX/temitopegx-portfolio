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
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="neo-brutalism-pink p-8 mb-12 transform rotate-1 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Our Services
          </h2>
          <p className="text-center text-xl mt-3">Creating Digital Magic</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Graphic Design */}
          <div className="neo-brutalism-white p-8 transform hover:-rotate-1">
            <div className="bg-[#FFDE00] w-16 h-16 flex items-center justify-center mb-6">
              <FontAwesomeIcon
                icon={faPaintBrush}
                className="text-3xl text-black"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">Graphic Design</h3>
            <ul className="space-y-3 text-base">
              <li>Brand Identity Design</li>
              <li>Logo Design</li>
              <li>Marketing Material</li>
            </ul>
          </div>

          {/* Web Development */}
          <div className="neo-brutalism-white p-8 transform hover:rotate-1">
            <div className="bg-[#FFDE00] w-16 h-16 flex items-center justify-center mb-6">
              <FontAwesomeIcon
                icon={faLaptopCode}
                className="text-3xl text-black"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">Web Development</h3>
            <p className="text-base">
              Custom responsive websites and web applications built with modern
              technologies.
            </p>
          </div>

          {/* Media Services */}
          <div className="neo-brutalism-white p-8 transform hover:-rotate-1">
            <div className="bg-[#FFDE00] w-16 h-16 flex items-center justify-center mb-6">
              <FontAwesomeIcon
                icon={faCamera}
                className="text-3xl text-black"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">Media Services</h3>
            <p className="text-base">
              Professional media production, content creation, and digital
              marketing solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
