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
    <section className="minimalist-section relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="dot-pattern opacity-30" />
        <div className="grid-pattern opacity-20" />
      </div>
      <div className="particle-effect" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#2B3FF3]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#6F3FF3]/10 rounded-full blur-3xl animate-pulse" />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="floating-element w-8 h-8 bg-gradient-to-br from-[#2B3FF3]/20 to-[#6F3FF3]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="minimalist-container relative">
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
          <h2 className="text-4xl font-bold mb-6 text-gradient-animate">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600">
            Let's discuss your next project and bring your vision to life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="fade-in">
            <div className="gradient-border card-hover-effect">
              <div className="gradient-border-content p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium mb-1 transition-colors duration-300 ${
                        focusedField === "name"
                          ? "text-gradient-animate"
                          : "text-gray-700"
                      }`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className={`minimalist-input ${
                        focusedField === "name" ? "glow-effect" : ""
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-1 transition-colors duration-300 ${
                        focusedField === "email"
                          ? "text-gradient-animate"
                          : "text-gray-700"
                      }`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`minimalist-input ${
                        focusedField === "email" ? "glow-effect" : ""
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className={`block text-sm font-medium mb-1 transition-colors duration-300 ${
                        focusedField === "message"
                          ? "text-gradient-animate"
                          : "text-gray-700"
                      }`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      rows={6}
                      className={`minimalist-input resize-none ${
                        focusedField === "message" ? "glow-effect" : ""
                      }`}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="minimalist-button w-full group"
                  >
                    <span className="flex items-center justify-center">
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                      />
                    </span>
                  </button>

                  {submitStatus === "success" && (
                    <div className="glass-card p-4 text-green-600 text-center animate-fade-in">
                      Message sent successfully!
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="glass-card p-4 text-red-600 text-center animate-fade-in">
                      Failed to send message. Please try again.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 fade-in delay-200">
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="gradient-border card-hover-effect"
                >
                  <div className="gradient-border-content p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#2B3FF3] to-[#6F3FF3] rounded-xl flex items-center justify-center flex-shrink-0 glow-effect">
                        <FontAwesomeIcon
                          icon={info.icon}
                          className="text-xl text-white"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1 text-gradient-animate">
                          {info.label}
                        </h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-600 hover:text-[#2B3FF3] transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-600">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Working Hours */}
            <div className="gradient-border card-hover-effect">
              <div className="gradient-border-content p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2B3FF3] to-[#6F3FF3] rounded-xl flex items-center justify-center flex-shrink-0 glow-effect">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-xl text-white"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-3 text-gradient-animate">
                      Working Hours
                    </h3>
                    <div className="space-y-2">
                      {workingHours.map((schedule) => (
                        <div
                          key={schedule.day}
                          className="flex justify-between text-gray-600"
                        >
                          <span>{schedule.day}</span>
                          <span className="font-medium">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
