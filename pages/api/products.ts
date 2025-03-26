import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Test MongoDB connection first
    const client = await clientPromise;
    if (!client) {
      throw new Error("Failed to connect to MongoDB");
    }

    const db = client.db("ecommerce");
    const collection = db.collection("products");

    switch (req.method) {
      case "POST":
        try {
          // Validate required fields
          const { name, price, description, image } = req.body;
          if (!name || !price || !description || !image) {
            return res.status(400).json({ error: "Missing required fields" });
          }

          const newProduct = {
            ...req.body,
            category: req.body.category || "Digital Product",
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          const result = await collection.insertOne(newProduct);
          return res.status(201).json(result);
        } catch (error) {
          console.error("POST Error:", error);
          return res.status(500).json({
            error: "Failed to create product",
            details: error instanceof Error ? error.message : "Unknown error",
          });
        }

      case "GET":
        try {
          const products = await collection
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
          return res.status(200).json(products);
        } catch (error) {
          console.error("GET Error:", error);
          return res.status(500).json({
            error: "Failed to fetch products",
            details: error instanceof Error ? error.message : "Unknown error",
          });
        }

      default:
        res.setHeader("Allow", ["POST", "GET"]);
        return res
          .status(405)
          .json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
