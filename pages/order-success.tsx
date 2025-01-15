import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function OrderSuccess() {
  const router = useRouter()
  const { ref } = router.query

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I just made a purchase with reference: ${ref}. Could you help me with my order?`
    )
    window.open(`https://wa.me/2347071785772?text=${message}`, '_blank')
  }

  return (
    <Layout>
      <div className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="neo-brutalism-white p-8 text-center">
            <h1 className="text-4xl font-black mb-4">Thank You for Your Purchase!</h1>
            <p className="mb-4">Order Reference: {ref}</p>
            <p className="mb-8">
              We've opened WhatsApp for you to communicate with our team.
              If you closed it accidentally, you can click the button below.
            </p>
            <div className="space-y-4">
              <button
                onClick={openWhatsApp}
                className="neo-brutalism-button bg-[#25D366] text-white"
              >
                Contact Us on WhatsApp
              </button>
              <button
                onClick={() => router.push('/store')}
                className="neo-brutalism-button bg-[#2B3FF3] text-white ml-4"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 