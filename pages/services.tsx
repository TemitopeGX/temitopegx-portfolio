'use client'
import Head from 'next/head'
import Layout from '../components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faPalette, 
  faCode, 
  faBullhorn 
} from '@fortawesome/free-solid-svg-icons'

export default function Services() {
  const services = [
    {
      title: "Oasis Graphix",
      icon: faPalette,
      description: "Professional graphic design studio delivering creative visual solutions for your brand.",
      features: [
        "Logo & Brand Identity Design",
        "Marketing Materials",
        "Social Media Graphics",
        "Print Design",
        "Packaging Design",
        "Brand Guidelines"
      ]
    },
    {
      title: "Web Development",
      icon: faCode,
      description: "Custom responsive websites and web applications built with modern technologies for optimal performance.",
      features: [
        "Custom Website Development",
        "E-commerce Solutions",
        "Web Applications",
        "Responsive Design",
        "Website Maintenance",
        "SEO Optimization"
      ]
    },
    {
      title: "Media Services",
      icon: faBullhorn,
      description: "Comprehensive media production and content creation services to enhance your digital presence.",
      features: [
        "Content Creation",
        "Digital Marketing",
        "Social Media Management",
        "Video Production",
        "Photography",
        "Brand Strategy"
      ]
    }
  ]

  return (
    <Layout>
      <Head>
        <title>Services - TemitopeGX</title>
        <meta name="description" content="Professional creative services by TemitopeGX - Home of Oasis Graphix" />
      </Head>

      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} 
                className="neo-brutalism-card card-hover-effect group"
              >
                <div className="mb-6 bg-[#FFDE00] p-4 inline-block neo-brutalism-shadow group-hover:rotate-3 transition-transform duration-300">
                  <FontAwesomeIcon 
                    icon={service.icon}
                    className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-2xl font-black mb-4 text-gradient">{service.title}</h3>
                <p className="font-bold mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} 
                      className="flex items-center font-medium hover-lift cursor-default"
                    >
                      <span className="text-[#2B3FF3] mr-2 group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
} 