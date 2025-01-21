"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
import ProductModal from "../components/ProductModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import Notification from "../components/Notification";
import { Product } from "../types/product";

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

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

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

  return (
    <Layout>
      <Head>
        <title>Store - Creative Digital Products</title>
        <meta
          name="description"
          content="Shop our collection of creative digital products and services."
        />
      </Head>

      <div className="min-h-screen w-full">
        {/* Hero Section */}
        <section className="minimalist-section relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="dot-pattern opacity-30" />
            <div className="grid-pattern opacity-20" />
          </div>
          <div className="particle-effect" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#2B3FF3]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-[#6F3FF3]/10 rounded-full blur-3xl animate-pulse" />

          <div className="minimalist-container relative">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-animate">
                Creative Digital Products
              </h1>
              <p className="text-lg md:text-2xl text-gray-600 mb-12">
                Explore our collection of premium digital resources and tools
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="minimalist-section pt-0">
          <div className="minimalist-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div
                  key={product._id}
                  className="group fade-in h-full"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => openProductModal(product)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="gradient-border card-hover-effect h-full">
                    <div className="gradient-border-content p-6 flex flex-col h-full">
                      {/* Product Image */}
                      <div className="relative aspect-square mb-6 overflow-hidden rounded-xl">
                        <Image
                          src={product.image || "/images/product1.jpg"}
                          alt={product.name}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-2 text-gradient-animate">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-6 line-clamp-2 flex-grow">
                          {product.description}
                        </p>

                        {/* Price & Buttons */}
                        <div className="space-y-4">
                          {/* Price */}
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-gradient-animate">
                              ₦{product.price.toLocaleString()}
                            </span>
                            <button
                              onClick={(e) => handlePurchaseNow(e, product)}
                              className="minimalist-button-outline flex items-center"
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                            >
                              <FontAwesomeIcon
                                icon={faShoppingCart}
                                className="mr-2 h-4 w-4"
                              />
                              Purchase
                            </button>
                          </div>

                          {/* View Details Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openProductModal(product);
                            }}
                            className="w-full py-2 text-gray-600 hover:text-[#2B3FF3] transition-colors flex items-center justify-center group border border-gray-200 rounded-xl hover:border-[#2B3FF3]/30"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            View Details
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Purchase Modal */}
      {isPurchaseModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-card p-6 rounded-2xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-gradient-animate">
              Purchase {selectedProduct.name}
            </h2>
            <p className="text-xl font-bold text-[#2B3FF3] mb-4">
              ₦{selectedProduct.price.toLocaleString()}
            </p>
            <div className="flex flex-col space-y-4">
              {selectedProduct.selarLink && (
                <a
                  href={selectedProduct.selarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="minimalist-button"
                >
                  Purchase on Selar
                </a>
              )}

              {selectedProduct.purchaseOption !== "SELAR_ONLY" && (
                <button
                  onClick={() => {
                    dispatch({
                      type: "ADD_ITEM",
                      payload: {
                        id: selectedProduct._id,
                        name: selectedProduct.name,
                        price: selectedProduct.price,
                        image:
                          selectedProduct.image || "/default-product-image.jpg",
                        quantity: 1,
                      },
                    });
                    setNotification({
                      show: true,
                      message: `${selectedProduct.name} added to cart!`,
                    });
                    setIsPurchaseModalOpen(false);
                  }}
                  className="minimalist-button-outline"
                >
                  Add to Cart
                </button>
              )}
            </div>
            <button
              onClick={() => setIsPurchaseModalOpen(false)}
              className="mt-4 text-red-500 hover:text-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />

      <Notification
        message={notification.message}
        isVisible={notification.show}
        onClose={() => setNotification({ show: false, message: "" })}
      />
    </Layout>
  );
}
