"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
import ProductModal from "../components/ProductModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEtsy } from "@fortawesome/free-brands-svg-icons";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useCart } from "../context/CartContext";
import Notification from "../components/Notification";
import { Product } from "../types/product";
import { truncateText } from "@/utils/textUtils";

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

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      // Add default images and details if needed
      const productsWithDefaults = data.map((product: Product) => ({
        ...product,
        image: product.image || "/images/product1.jpg",
        details: product.details || {
          features: ["Feature 1", "Feature 2", "Feature 3"],
          specifications: {
            "Delivery Time": "3-5 Business Days",
            Support: "30 Days",
          },
        },
      }));
      setProducts(productsWithDefaults);
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

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="neo-brutalism-card card-hover-effect group">
      {/* Image Section */}
      <div className="relative aspect-square mb-4 overflow-hidden">
        <Image
          src={product.image || "/images/product1.jpg"}
          alt={product.name}
          width={400}
          height={400}
          className="image-hover-effect"
        />
      </div>

      {/* Content Section */}
      <h3 className="text-xl font-black mb-2 text-gradient">{product.name}</h3>
      <p className="font-medium mb-4">
        {truncateText(product.description, 100)}
      </p>

      {/* Price Section */}
      <div className="mb-4">
        <span className="text-2xl font-black shine-effect">
          ₦{product.price.toLocaleString()}
        </span>
      </div>

      {/* Actions Section */}
      <div className="flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            openProductModal(product);
          }}
          className="neo-brutalism-button bg-[#FF90E8] text-white flex-1"
        >
          Read More
        </button>
        <button
          className="neo-brutalism-button bg-[#2B3FF3] text-white flex-1"
          onClick={(e) => handlePurchaseNow(e, product)}
        >
          Purchase
        </button>
      </div>
    </div>
  );

  return (
    <Layout>
      <Head>
        <title>Store - TemitopeGX</title>
        <meta
          name="description"
          content="Shop our creative products and services"
        />
      </Head>

      <section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="neo-brutalism-white p-8 mb-16 rotate-1">
            <h1 className="text-4xl md:text-5xl font-black text-center">
              Our Store
            </h1>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Purchase Modal */}
      {isPurchaseModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 neo-brutalism-white">
            <h2 className="text-2xl font-bold mb-4">
              Purchase Options for {selectedProduct?.name}
            </h2>
            <p className="text-xl font-bold text-[#2B3FF3] mb-4">
              ₦{selectedProduct?.price.toLocaleString()}
            </p>
            <div className="flex flex-col space-y-4">
              {selectedProduct?.selarLink && (
                <a
                  href={selectedProduct.selarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-brutalism-button bg-[#3C0B8C] text-white"
                >
                  Purchase on Selar
                </a>
              )}

              {selectedProduct?.purchaseOption !== "SELAR_ONLY" &&
                selectedProduct?.gumroadLink && (
                  <a
                    href={selectedProduct.gumroadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-brutalism-button bg-[#ff90e8] text-white"
                  >
                    Purchase on Gumroad
                  </a>
                )}

              {selectedProduct?.purchaseOption === "ALL_OPTIONS" && (
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
                  className="neo-brutalism-button bg-[#2B3FF3] text-white"
                >
                  Add to Cart
                </button>
              )}
            </div>
            <button
              onClick={() => setIsPurchaseModalOpen(false)}
              className="mt-4 text-red-500"
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
