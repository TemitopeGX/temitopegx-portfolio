import { Dialog as HeadlessDialog } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Product } from "../types/product";

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
  if (!product) return null;

  return (
    <HeadlessDialog
      open={isOpen}
      onClose={closeModal}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <HeadlessDialog.Panel className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="dot-pattern opacity-30" />
            <div className="grid-pattern opacity-20" />
          </div>
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#2B3FF3]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#6F3FF3]/10 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column - Image */}
              <div className="relative h-[500px]">
                <Image
                  src={product.image || "/images/product1.jpg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="h-4 w-4 text-gray-600"
                  />
                </button>
              </div>

              {/* Right Column - Details */}
              <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto">
                {/* Title and Price */}
                <div>
                  <HeadlessDialog.Title className="text-2xl font-bold text-gradient-animate mb-2">
                    {product.name}
                  </HeadlessDialog.Title>
                  <p className="text-2xl font-bold text-[#2B3FF3]">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Description
                  </h4>
                  <p className="text-base text-gray-600">
                    {product.description}
                  </p>
                </div>

                {/* Details Section */}
                {product.details && (
                  <>
                    {/* Features */}
                    {product.details.features &&
                      product.details.features.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-lg font-semibold text-gray-900">
                            Features
                          </h4>
                          <ul className="grid grid-cols-2 gap-2">
                            {product.details.features.map(
                              (feature: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex items-center text-sm text-gray-600"
                                >
                                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#2B3FF3] to-[#6F3FF3] rounded-full mr-2" />
                                  {feature}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Specifications */}
                    {product.details.specifications &&
                      Object.keys(product.details.specifications).length >
                        0 && (
                        <div className="space-y-3">
                          <h4 className="text-lg font-semibold text-gray-900">
                            Specifications
                          </h4>
                          <dl className="grid grid-cols-2 gap-3">
                            {Object.entries(product.details.specifications).map(
                              ([key, value]) => (
                                <div
                                  key={key}
                                  className="glass-card p-3 rounded-lg"
                                >
                                  <dt className="text-sm font-medium text-gray-500">
                                    {key}
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900">
                                    {String(value)}
                                  </dd>
                                </div>
                              )
                            )}
                          </dl>
                        </div>
                      )}
                  </>
                )}
              </div>
            </div>
          </div>
        </HeadlessDialog.Panel>
      </div>
    </HeadlessDialog>
  );
}
