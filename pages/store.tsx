"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Image from "next/image";
import ProductModal from "../components/ProductModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSpinner,
  faCheck,
  faArrowRight,
  faTag,
  faShieldAlt,
  faClock,
  faCreditCard,
  faSearch,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";
import Notification from "../components/Notification";
import { Product } from "../types/product";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Store() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const { dispatch } = useCart();
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const openPurchaseModal = (product: Product) => {
    setSelectedProduct(product);
    setIsPurchaseModalOpen(true);
  };

  const handlePurchaseNow = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    openPurchaseModal(product);
  };

  const handleMouseEnter = () => setCursorVariant("hover");
  const handleMouseLeave = () => setCursorVariant("default");

  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setAddingToCart(product._id);
    try {
      await dispatch({
        type: "ADD_ITEM",
        payload: {
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image || "/default-product-image.jpg",
          quantity: 1,
        },
      });
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Store - Creative Digital Products</title>
        <meta
          name="description"
          content="Shop our collection of creative digital products and services."
        />
      </Head>

      <main className="min-h-screen bg-black pt-32 pb-24">
        {/* Background Elements */}
        <div className="fixed inset-0 z-0">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#00FF00 0.5px, transparent 0.5px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#00FF00]/5 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#00FF00]/20 blur-lg rounded-full" />
                <div className="relative bg-black border border-[#00FF00] rounded-full px-4 py-1.5">
                  <span className="text-[#00FF00] font-mono text-sm uppercase tracking-wider">
                    Digital Products
                  </span>
                </div>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Premium Digital Products
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Explore our collection of high-quality digital products designed
              to elevate your creative projects.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="mb-12">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 pl-12
                           text-white placeholder-white/40 focus:outline-none focus:border-[#00FF00]/30
                           transition-all duration-300"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="mb-24">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-64 space-y-4"
              >
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="text-[#00FF00] text-4xl animate-spin"
                />
                <p className="text-white/60">Loading products...</p>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => openProductModal(product)}
                      className="group cursor-pointer"
                    >
                      <div
                        className="bg-white/[0.03] backdrop-blur-lg rounded-2xl border border-white/10
                                    hover:border-[#00FF00]/30 transition-all duration-500
                                    overflow-hidden relative group/card"
                      >
                        {/* Product Image */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={product.image || "/default-product-image.jpg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* Quick Action Buttons - Appear on Hover */}
                          <div className="absolute bottom-4 right-4 flex gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(
                                e: React.MouseEvent<HTMLButtonElement>
                              ) => handleAddToCart(e, product)}
                              disabled={addingToCart === product._id}
                              className="p-2.5 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 text-white
                                       transition-all duration-300 border border-white/20"
                            >
                              {addingToCart === product._id ? (
                                <FontAwesomeIcon
                                  icon={faSpinner}
                                  className="animate-spin"
                                />
                              ) : (
                                <FontAwesomeIcon icon={faShoppingCart} />
                              )}
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(
                                e: React.MouseEvent<HTMLButtonElement>
                              ) => handlePurchaseNow(e, product)}
                              className="px-4 py-2 rounded-lg bg-[#00FF00] text-black font-medium
                                       hover:bg-[#00FF00]/90 transition-all duration-300"
                            >
                              Buy Now
                            </motion.button>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-6">
                          {/* Category Tag */}
                          <div className="mb-4">
                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-[#00FF00]/80 border border-[#00FF00]/20">
                              {product.category || "Digital Product"}
                            </span>
                          </div>

                          {/* Title and Description */}
                          <div className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-[#00FF00] transition-colors duration-300">
                              {product.name}
                            </h3>
                            <p className="text-white/60 text-sm line-clamp-2 leading-relaxed">
                              {product.description ||
                                "No description available"}
                            </p>
                          </div>

                          {/* Features */}
                          <div className="space-y-2 mb-6">
                            {product.features && product.features.length > 0 ? (
                              <>
                                {product.features
                                  .slice(0, 2)
                                  .map((feature, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center text-sm text-white/60"
                                    >
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#00FF00]/40 mr-2 group-hover:bg-[#00FF00] transition-colors duration-300" />
                                      {feature}
                                    </div>
                                  ))}
                                {product.features.length > 2 && (
                                  <p className="text-sm text-[#00FF00]/80 hover:text-[#00FF00] cursor-pointer transition-colors duration-300">
                                    +{product.features.length - 2} more features
                                  </p>
                                )}
                              </>
                            ) : (
                              <p className="text-sm text-white/40">
                                Features not available
                              </p>
                            )}
                          </div>

                          {/* Price */}
                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <div>
                              <p className="text-sm text-white/40 mb-1">
                                Price
                              </p>
                              <p className="text-2xl font-bold text-white group-hover:text-[#00FF00] transition-colors duration-300">
                                ₦{(product.price || 0).toLocaleString()}
                              </p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-[#00FF00]/10 flex items-center justify-center group-hover:bg-[#00FF00]/20 transition-all duration-300">
                              <FontAwesomeIcon
                                icon={faArrowRight}
                                className="text-[#00FF00] text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: faShieldAlt,
                title: "Secure Payments",
                description:
                  "Your transactions are protected with industry-standard security",
              },
              {
                icon: faClock,
                title: "Instant Delivery",
                description:
                  "Get immediate access to your digital products after purchase",
              },
              {
                icon: faTag,
                title: "Best Value",
                description:
                  "Premium quality products at competitive market prices",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/[0.03] backdrop-blur-lg rounded-2xl p-8 border border-white/10
                         hover:border-[#00FF00]/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#00FF00]/10 rounded-xl flex items-center justify-center mb-6">
                  <FontAwesomeIcon
                    icon={feature.icon}
                    className="text-2xl text-[#00FF00]"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </Layout>
  );
}
