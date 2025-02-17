import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faShoppingCart,
  faSpinner,
  faTimes,
  faExternalLinkAlt,
  faLock,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  closeModal: () => void;
}

export default function ProductModal({
  product,
  isOpen,
  closeModal,
}: ProductModalProps) {
  const [addingToCart, setAddingToCart] = useState(false);
  const { dispatch } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = async () => {
    setAddingToCart(true);
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
      closeModal();
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div
        className="bg-dark-200 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        style={{ backdropFilter: "blur(20px)" }}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 bg-dark-300/80 p-2 rounded-full hover:bg-dark-400 transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} className="text-gray-400 text-lg" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Product Image Section */}
          <div className="md:p-8 relative">
            <div className="relative aspect-square w-full rounded-t-2xl md:rounded-2xl overflow-hidden">
              <Image
                src={product.image || "/default-product-image.jpg"}
                alt={product.name}
                fill
                className="object-contain bg-dark-300"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Product Details Section */}
          <div className="p-8 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">{product.name}</h2>
              <p className="text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Card */}
            <div className="bg-dark-300 rounded-xl p-6 border border-neon-green/10">
              <p className="text-sm text-gray-400 mb-1">Price</p>
              <p className="text-4xl font-bold text-neon-green">
                ₦{(product.price || 0).toLocaleString()}
              </p>
            </div>

            {/* Purchase Options */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Purchase Options</h3>

              {/* Selar Option */}
              {product.selarLink && (
                <a
                  href={product.selarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white px-6 py-4 rounded-xl hover:from-[#6D28D9] hover:to-[#4C1D95] transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faLock} className="text-2xl" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Pay with Selar</p>
                      <p className="text-sm text-white/80">
                        Secure payment via Selar (Recommended)
                      </p>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              )}

              {/* Cart Option */}
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex items-center justify-between w-full bg-gradient-to-r from-neon-green to-[#2B3FF3] text-white px-6 py-4 rounded-xl hover:from-[#32CD32] hover:to-[#1E2F9F] transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="text-2xl"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Add to Cart</p>
                    <p className="text-sm text-white/80">
                      Purchase with other items
                    </p>
                  </div>
                </div>
                {addingToCart ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="animate-spin text-xl"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </button>

              {/* Gumroad Option */}
              {product.gumroadLink && (
                <a
                  href={product.gumroadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full bg-gradient-to-r from-[#FF90E8] to-[#FF2E9E] text-white px-6 py-4 rounded-xl hover:from-[#FF70D8] hover:to-[#FF0F8E] transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faGlobe} className="text-2xl" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Pay with Gumroad</p>
                      <p className="text-sm text-white/80">
                        International payments accepted
                      </p>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              )}
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">
                  What's Included
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-dark-300 p-4 rounded-xl border border-neon-green/10"
                    >
                      <div className="w-8 h-8 bg-neon-green/10 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-neon-green text-sm"
                        />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications */}
            {product.specifications &&
              Object.keys(product.specifications).length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    Specifications
                  </h3>
                  <div className="grid gap-3">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center bg-dark-300 p-4 rounded-xl border border-neon-green/10"
                        >
                          <span className="text-gray-400">{key}</span>
                          <span className="text-gray-300 font-medium">
                            {value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
