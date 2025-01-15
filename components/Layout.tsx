import Navbar from './Navbar'
import Footer from './Footer'
import { FontAwesomeSetup } from './FontAwesomeSetup'
import Cart from './Cart'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <FontAwesomeSetup />
      <Navbar />
      <main className="pt-16">{children}</main>
      <Cart />
      <Footer />
    </div>
  )
} 