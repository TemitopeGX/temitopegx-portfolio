import Head from 'next/head'
import Layout from '../components/Layout'
import Image from 'next/image'
import Link from 'next/link'

export default function OasisGraphix() {
  const services = [
    {
      title: "Brand Identity",
      description: "Complete brand identity design including logos, color schemes, and typography."
    },
    {
      title: "Print Design",
      description: "Professional design for business cards, brochures, posters, and marketing materials."
    },
    {
      title: "Digital Design",
      description: "Social media graphics, digital ads, and web design assets."
    },
    {
      title: "Packaging Design",
      description: "Creative packaging solutions that make your products stand out."
    }
  ]

  return (
    <Layout>
      <Head>
        <title>Oasis Graphix - Professional Graphic Design Studio</title>
        <meta name="description" content="Professional graphic design services by Oasis Graphix, a TemitopeGX brand" />
      </Head>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-oasis-primary/20 to-oasis-secondary/20 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-oasis-primary to-oasis-secondary bg-clip-text text-transparent">
              Oasis Graphix
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Where Creativity Meets Excellence in Design
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/portfolio#graphic-design" 
                className="bg-oasis-primary hover:bg-oasis-primary/90 text-white px-8 py-3 rounded-full transition-colors">
                View Our Work
              </Link>
              <Link href="/contact"
                className="border border-oasis-primary text-oasis-primary hover:bg-oasis-primary hover:text-white px-8 py-3 rounded-full transition-colors">
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Design Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-900/50 p-8 rounded-xl hover:transform hover:scale-105 transition-transform border border-oasis-primary/20">
                <h3 className="text-xl font-bold mb-4 text-oasis-primary">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Design Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-oasis-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-bold mb-2">Discovery</h3>
              <p className="text-gray-400">Understanding your brand and objectives</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-oasis-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-bold mb-2">Concept</h3>
              <p className="text-gray-400">Creating initial design concepts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-oasis-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-bold mb-2">Refine</h3>
              <p className="text-gray-400">Perfecting the chosen design</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-oasis-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="font-bold mb-2">Deliver</h3>
              <p className="text-gray-400">Providing final files and support</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
} 