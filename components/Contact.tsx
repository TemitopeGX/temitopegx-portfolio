import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-[#8B5CF6] mb-12">
        Get in Touch
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-white border-2 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-[#2B3FF3]">✉</span>
              <a
                href="mailto:temitopeayomikun999@gmail.com"
                className="ml-4 hover:text-[#2B3FF3]"
              >
                temitopeayomikun999@gmail.com
              </a>
            </div>
            <div className="flex items-center">
              <span className="text-[#2B3FF3]">📞</span>
              <a
                href="tel:+2349060462586"
                className="ml-4 hover:text-[#2B3FF3]"
              >
                +2349060462586
              </a>
            </div>
            <div className="flex items-center">
              <span className="text-[#2B3FF3]">📍</span>
              <span className="ml-4">Osun State, Nigeria</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border-2 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <form className="space-y-4">
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                className="w-full border-2 border-black p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                className="w-full border-2 border-black p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Message</label>
              <textarea
                className="w-full border-2 border-black p-2 h-32"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#2B3FF3] text-white py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
