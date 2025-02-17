import { useEffect, useState, useRef } from "react";
import { Product } from "../../types/product";
import Image from "next/image";
import { truncateText } from "@/utils/textUtils";
import { withAuth } from "@/components/withAuth";
import { useAuth } from "@/context/AuthContext";
import AdminNav from "@/components/AdminNav";
import Layout from "@/components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faSpinner,
  faTrash,
  faEdit,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

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
      purchaseOption: product.purchaseOption || "SELAR_ONLY",
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
    <Layout>
      <AdminNav />
      <div className="min-h-screen bg-dark">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header Section */}
          <div className="bg-dark-200 rounded-xl p-8 mb-8 border border-neon-green/10">
            <h1 className="text-4xl font-bold mb-4">
              Manage <span className="text-neon-green">Products</span>
            </h1>
            <p className="text-gray-400">
              Add, edit, or remove store products.
            </p>
          </div>

          {/* Add/Edit Product Form */}
          <div className="bg-dark-200 rounded-xl p-6 mb-8 border border-neon-green/10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FontAwesomeIcon
                icon={editingProduct ? faEdit : faPlus}
                className="text-neon-green"
              />
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-dark-300 border border-neon-green/10 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-neon-green/30 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Price (₦)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full bg-dark-300 border border-neon-green/10 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-neon-green/30 transition-colors"
                    placeholder="e.g., 3000"
                    required
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    Enter the price in Naira (₦)
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-dark-300 border border-neon-green/10 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-neon-green/30 transition-colors"
                  required
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-gray-300 mb-2">Features</label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {DEFAULT_FEATURES.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-2 bg-dark-300 p-3 rounded-xl border border-neon-green/10 cursor-pointer hover:border-neon-green/30 transition-colors"
                      onClick={() => handleFeatureToggle(feature)}
                    >
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        className="form-checkbox h-5 w-5 text-neon-green rounded border-neon-green/30"
                      />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Product Image
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  {formData.image ? (
                    <div className="relative w-48 h-48">
                      <Image
                        src={formData.image}
                        alt="Product preview"
                        fill
                        className="object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: "" })}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-48 h-48 border-2 border-dashed border-neon-green/30 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-neon-green/50 hover:text-neon-green transition-colors"
                    >
                      <FontAwesomeIcon
                        icon={faCloudUploadAlt}
                        className="text-3xl mb-2"
                      />
                      <span>Upload Image</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-neon-green text-dark font-semibold px-6 py-3 rounded-xl hover:bg-neon-green/90 transition-colors flex items-center gap-2"
                >
                  {uploading && (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin"
                    />
                  )}
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
                    className="bg-red-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Products List */}
          <div className="bg-dark-200 rounded-xl p-6 border border-neon-green/10">
            <h2 className="text-2xl font-bold mb-6">Current Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-dark-300 rounded-xl overflow-hidden border border-neon-green/10 hover:border-neon-green/30 transition-all duration-300"
                >
                  {product.image && (
                    <div className="relative aspect-square">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-2 text-white">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-neon-green mb-2">
                      ₦{(product.price * 1000).toLocaleString()}
                    </p>
                    <p className="text-gray-400 mb-4">
                      {truncateText(product.description, 100)}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(AdminProducts);
