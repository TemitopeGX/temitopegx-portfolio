import React from "react";
import Image from "next/image";
import { Product } from "../types/product";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  closeModal: () => void;
}

const ProductModal = ({ product, isOpen, closeModal }: ProductModalProps) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto neo-brutalism-white">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <button
              onClick={closeModal}
              className="neo-brutalism-button bg-red-500 text-white"
            >
              Close
            </button>
          </div>

          {/* Image and Basic Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="relative aspect-square">
              <Image
                src={product.image || "/images/product1.jpg"}
                alt={product.name}
                width={400}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div>
              <p className="text-3xl font-bold text-[#2B3FF3] mb-4">
                ₦{(product.price * 1000).toLocaleString()}
              </p>
              <p className="text-gray-700 mb-4">{product.description}</p>
            </div>
          </div>

          {/* Features */}
          {product.details?.features && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Features</h3>
              <ul className="list-disc list-inside space-y-2">
                {product.details.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.details?.specifications && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.details.specifications).map(
                  ([key, value]) => (
                    <div key={key} className="neo-brutalism-white p-3">
                      <span className="font-bold">{key}:</span> {value}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Purchase Button */}
          <button
            onClick={closeModal}
            className="neo-brutalism-button bg-[#2B3FF3] text-white w-full"
          >
            Purchase Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
