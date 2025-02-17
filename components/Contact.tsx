import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faClock,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const contactInfo = [
  {
    icon: faEnvelope,
    label: "Email",
    value: "temitopeayomikun999@gmail.com",
    link: "mailto:temitopeayomikun999@gmail.com",
  },
  {
    icon: faPhone,
    label: "Phone",
    value: "+234 906 046 2586",
    link: "tel:+2349060462586",
  },
  {
    icon: faLocationDot,
    label: "Location",
    value: "Osun State, Nigeria",
  },
];

const workingHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Add your form submission logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-neon-green mb-4">
          Get in Touch
        </h2>
        <p className="text-center text-gray-400 mb-12">
          Let's discuss your next project
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-dark-200 border border-white/10 rounded-lg p-6">
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-dark-300 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-neon-green/50 transition-colors"
              />
              {/* ... other form fields */}
              <button className="w-full bg-neon-green text-dark font-bold py-3 rounded-lg hover:bg-neon-green/90 transition-colors">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="bg-dark-200 border border-white/10 rounded-lg p-6"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-neon-green/10 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={info.icon}
                      className="text-neon-green"
                    />
                  </div>
                  <div>
                    <div className="text-gray-400">{info.label}</div>
                    <div className="text-white">{info.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
