import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  }

  async function handleAddProduct(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price")),
      description: formData.get("description"),
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        fetchProducts(); // Refresh the list
        e.target.reset(); // Clear the form
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="mb-8">
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="border p-2 w-full"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            step="0.01"
            className="border p-2 w-full"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="border p-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </form>

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <h2 className="font-bold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="mt-2">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
