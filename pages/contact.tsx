'use client'
import Head from 'next/head'
import Layout from '../components/Layout'
import { FormEvent, useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    // Format the message for WhatsApp
    const whatsappMessage = encodeURIComponent(
      `*New Contact Form Submission*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n\n` +
      `*Message:*\n${formData.message}`
    )
    
    // WhatsApp API URL
    const whatsappUrl = `https://wa.me/2347071785772?text=${whatsappMessage}`
    
    // Open WhatsApp in a new window
    window.open(whatsappUrl, '_blank')
  }

  return (
    <Layout>
      <Head>
        <title>Contact - TemitopeGX</title>
        <meta name="description" content="Get in touch with us for your next project" />
      </Head>

      <section className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="neo-brutalism-white p-8 rotate-1">
            <h1 className="text-4xl font-black text-center mb-8">Let's Talk!</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-bold mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-black focus:ring-2 focus:ring-[#FFDE00]"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border-2 border-black focus:ring-2 focus:ring-[#FFDE00]"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Message</label>
                <textarea
                  rows={6}
                  className="w-full p-3 border-2 border-black focus:ring-2 focus:ring-[#FFDE00]"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="neo-brutalism-button bg-[#2B3FF3] text-white w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
} 