import Link from 'next/link'
import Layout from '../components/Layout'

const Admin = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
        
        <div className="space-y-4">
          <Link href="/admin/projects">
            <button className="neo-brutalism-button bg-blue-500 text-white p-4 w-full text-center">
              Manage Projects
            </button>
          </Link>
          <Link href="/admin/products">
            <button className="neo-brutalism-button bg-green-500 text-white p-4 w-full text-center">
              Manage Products
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Admin 