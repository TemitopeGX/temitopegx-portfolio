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
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";
import Notification from "../components/Notification";
import { Product } from "../types/product";
import toast from "react-hot-toast";

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

  const handleAddToCart = async (product: Product) => {
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

      <div className="min-h-screen bg-dark">
        {/* Hero Section */}
        <div className="bg-dark-200 border-b border-neon-green/10">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Digital <span className="text-neon-green">Products</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Explore our collection of premium digital products designed to
                elevate your creative projects.
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <FontAwesomeIcon
                icon={faSpinner}
                className="text-neon-green text-4xl animate-spin"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  onClick={() => openProductModal(product)}
                  className="bg-dark-200 rounded-xl border border-neon-green/10 overflow-hidden hover:border-neon-green/30 transition-all duration-300 group cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square">
                    <Image
                      src={product.image || "/default-product-image.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-lg font-bold text-white line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {product.description || "No description available"}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {product.features && product.features.length > 0 ? (
                        <>
                          {product.features
                            .slice(0, 3)
                            .map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center text-sm text-gray-300"
                              >
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="text-neon-green mr-2 text-xs"
                                />
                                {feature}
                              </div>
                            ))}
                          {product.features.length > 3 && (
                            <div
                              className="text-sm text-neon-green cursor-pointer hover:underline"
                              onClick={() => openProductModal(product)}
                            >
                              +{product.features.length - 3} more features
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-sm text-gray-400">
                          Features not available
                        </div>
                      )}
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-3 border-t border-neon-green/10">
                      <p className="text-xl font-bold text-neon-green">
                        ₦{(product.price || 0).toLocaleString()}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openProductModal(product);
                        }}
                        className="bg-neon-green text-dark px-4 py-2 rounded-lg font-semibold hover:bg-neon-green/90 transition-colors flex items-center gap-2 text-sm"
                      >
                        <FontAwesomeIcon icon={faCreditCard} />
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="bg-dark-200 border-t border-neon-green/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-2xl text-neon-green"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">Secure Payments</h3>
                <p className="text-gray-400 text-sm">
                  Your transactions are safe and secure with us
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-2xl text-neon-green"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">Instant Delivery</h3>
                <p className="text-gray-400 text-sm">
                  Get your digital products instantly after purchase
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={faTag}
                    className="text-2xl text-neon-green"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">Best Value</h3>
                <p className="text-gray-400 text-sm">
                  Premium quality products at competitive prices
                </p>
              </div>
            </div>
          </div>
        </div>
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
        closeModal={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
      />

      <Notification
        message={notification.message}
        isVisible={notification.show}
        onClose={() => setNotification({ show: false, message: "" })}
      />
    </Layout>
  );
}
