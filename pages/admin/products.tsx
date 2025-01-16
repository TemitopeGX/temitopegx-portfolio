import { useEffect, useState, useRef } from "react";
import { Product } from "../../types/product";
import Image from "next/image";
import { truncateText } from "@/utils/textUtils";
import { withAuth } from "@/components/withAuth";
import { useAuth } from "@/context/AuthContext";

type PurchaseOption = "SELAR_ONLY" | "SELAR_GUMROAD" | "ALL_OPTIONS";

interface FormData {
  name: string;
  price: string;
  description: string;
  features: string[];
  specifications: {
    [key: string]: string;
  };
  purchaseOption: PurchaseOption;
  selarLink?: string;
  gumroadLink?: string;
  image: string;
}

const DEFAULT_FEATURES = [
  "3 Initial Concepts",
  "Unlimited Revisions",
  "Source Files",
  "High Resolution Files",
  "Social Media Kit",
  "Commercial Rights",
  "Support",
];

const DEFAULT_SPECIFICATIONS = {
  "Delivery Time": "3-5 Business Days",
  "File Formats": "AI, EPS, PDF, PNG, JPG",
  "Commercial Rights": "Full Rights",
  Support: "30 Days",
};

function AdminProducts() {
  const { logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    description: "",
    features: [],
    specifications: {},
    purchaseOption: "ALL_OPTIONS",
    selarLink: "",
    gumroadLink: "",
    image: "",
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch("/api/products");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from server");
      }

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to load products. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(productId: string) {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchProducts();
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  }

  function handleEdit(product: Product) {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      features: product.details?.features || [],
      specifications: product.details?.specifications || {},
      purchaseOption: product.purchaseOption,
      selarLink: product.selarLink || "",
      gumroadLink: product.gumroadLink || "",
      image: product.image || "",
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : "/api/products";

      const method = editingProduct ? "PUT" : "POST";

      // Validate required fields
      if (
        !formData.name ||
        !formData.price ||
        !formData.description ||
        !formData.image
      ) {
        alert("Please fill in all required fields including the product image");
        return;
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          description: formData.description,
          image: formData.image,
          details: {
            features: formData.features,
            specifications: formData.specifications,
          },
          purchaseOption: formData.purchaseOption,
          selarLink: formData.selarLink,
          gumroadLink: formData.gumroadLink,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save product");
      }

      // Clear form
      setFormData({
        name: "",
        price: "",
        description: "",
        features: [],
        specifications: {},
        purchaseOption: "ALL_OPTIONS",
        selarLink: "",
        gumroadLink: "",
        image: "",
      });
      setEditingProduct(null);
      fetchProducts();
      alert(
        editingProduct
          ? "Product updated successfully!"
          : "Product added successfully!"
      );
    } catch (error) {
      console.error("Error saving product:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to save product. Please try again."
      );
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFeatureToggle(feature: string) {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  }

  function handleSpecificationChange(key: string, value: string) {
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value,
      },
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      alert("File is too large. Please choose an image under 5MB.");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setFormData((prev) => ({ ...prev, image: data.url }));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 neo-brutalism-pink inline-block p-4">
        {editingProduct ? "Edit Product" : "Manage Products"}
      </h1>

      {/* Add Product Form */}
      <div className="neo-brutalism-white p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 neo-brutalism-blue inline-block p-2 text-white">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div>
            <label htmlFor="name" className="block text-lg font-bold mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 neo-brutalism-shadow border-2 border-black focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-lg font-bold mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full p-3 neo-brutalism-shadow border-2 border-black focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-lg font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 neo-brutalism-shadow border-2 border-black focus:outline-none"
              required
            />
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-bold mb-2">Features</h3>
            <div className="grid grid-cols-2 gap-4">
              {DEFAULT_FEATURES.map((feature) => (
                <label
                  key={feature}
                  className="flex items-center space-x-2 neo-brutalism-shadow border-2 border-black p-2"
                >
                  <input
                    type="checkbox"
                    checked={formData.features.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="form-checkbox h-5 w-5"
                  />
                  <span>{feature}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-lg font-bold mb-2">Specifications</h3>
            <div className="space-y-4">
              {Object.entries(DEFAULT_SPECIFICATIONS).map(
                ([key, defaultValue]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1">
                      {key}
                    </label>
                    <input
                      type="text"
                      value={formData.specifications[key] || defaultValue}
                      onChange={(e) =>
                        handleSpecificationChange(key, e.target.value)
                      }
                      className="w-full p-2 neo-brutalism-shadow border-2 border-black focus:outline-none"
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Purchase Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-2">Purchase Options</h3>

            <div className="space-y-4">
              <label className="flex items-center space-x-2 neo-brutalism-shadow border-2 border-black p-2">
                <input
                  type="radio"
                  name="purchaseOption"
                  checked={formData.purchaseOption === "SELAR_ONLY"}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      purchaseOption: "SELAR_ONLY",
                    }))
                  }
                  className="form-radio h-5 w-5"
                />
                <span>Made Available on Selar Only</span>
              </label>

              <label className="flex items-center space-x-2 neo-brutalism-shadow border-2 border-black p-2">
                <input
                  type="radio"
                  name="purchaseOption"
                  checked={formData.purchaseOption === "SELAR_GUMROAD"}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      purchaseOption: "SELAR_GUMROAD",
                    }))
                  }
                  className="form-radio h-5 w-5"
                />
                <span>Made Available on Selar and Gumroad</span>
              </label>

              <label className="flex items-center space-x-2 neo-brutalism-shadow border-2 border-black p-2">
                <input
                  type="radio"
                  name="purchaseOption"
                  checked={formData.purchaseOption === "ALL_OPTIONS"}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      purchaseOption: "ALL_OPTIONS",
                    }))
                  }
                  className="form-radio h-5 w-5"
                />
                <span>Made Available on Selar, Gumroad and Cart</span>
              </label>
            </div>

            {/* Conditional Link Fields */}
            {(formData.purchaseOption === "SELAR_ONLY" ||
              formData.purchaseOption === "SELAR_GUMROAD" ||
              formData.purchaseOption === "ALL_OPTIONS") && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  Selar Link
                </label>
                <input
                  type="url"
                  name="selarLink"
                  value={formData.selarLink}
                  onChange={handleChange}
                  placeholder="https://selar.co/product-link"
                  className="w-full p-2 neo-brutalism-shadow border-2 border-black focus:outline-none"
                  required
                />
              </div>
            )}

            {(formData.purchaseOption === "SELAR_GUMROAD" ||
              formData.purchaseOption === "ALL_OPTIONS") && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  Gumroad Link
                </label>
                <input
                  type="url"
                  name="gumroadLink"
                  value={formData.gumroadLink}
                  onChange={handleChange}
                  placeholder="https://gumroad.com/product-link"
                  className="w-full p-2 neo-brutalism-shadow border-2 border-black focus:outline-none"
                  required
                />
              </div>
            )}
          </div>

          {/* Add Image */}
          <div>
            <label htmlFor="image" className="block text-lg font-bold mb-2">
              Product Image
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                id="image"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="neo-brutalism-button bg-gray-500 text-white"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Choose Image"}
              </button>
              {formData.image && (
                <div className="relative w-24 h-24">
                  <Image
                    src={formData.image}
                    alt="Product preview"
                    fill
                    className="rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image: "" }))
                    }
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            {!formData.image && (
              <p className="text-sm text-gray-600 mt-1">
                Upload a product image (recommended size: 800x800px)
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <button type="submit" className="neo-brutalism-button">
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
            {editingProduct && (
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setFormData({
                    name: "",
                    price: "",
                    description: "",
                    features: [],
                    specifications: {},
                    purchaseOption: "ALL_OPTIONS",
                    selarLink: "",
                    gumroadLink: "",
                    image: "",
                  });
                }}
                className="neo-brutalism-button bg-gray-500 text-white"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Products List */}
      <div className="neo-brutalism-white p-6">
        <h2 className="text-2xl font-bold mb-6 neo-brutalism-blue inline-block p-2 text-white">
          Current Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="neo-brutalism-card">
              {product.image && (
                <div className="relative aspect-square mb-4 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              <h3 className="font-bold text-xl mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-[#2B3FF3] mb-2">
                ₦{(product.price * 1000).toLocaleString()}
              </p>
              <p className="text-gray-700 mb-4">
                {truncateText(product.description, 100)}
              </p>

              {/* Show truncated features */}
              {product.details?.features && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold">Features:</h4>
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <ul className="list-disc list-inside">
                    {product.details.features
                      .slice(0, 3)
                      .map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    {product.details.features.length > 3 && (
                      <li className="text-gray-500">...</li>
                    )}
                  </ul>
                </div>
              )}

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="neo-brutalism-button bg-blue-500 text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="neo-brutalism-button bg-red-500 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={logout}
        className="neo-brutalism-button bg-red-500 text-white fixed top-4 right-4"
      >
        Logout
      </button>
    </div>
  );
}

export default withAuth(AdminProducts);
