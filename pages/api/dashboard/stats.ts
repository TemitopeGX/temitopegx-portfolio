import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    // Get total projects
    const totalProjects = await db.collection("projects").countDocuments();

    // Get total products
    const totalProducts = await db.collection("products").countDocuments();

    // Simulate visitor count (you might want to implement actual analytics)
    const recentVisitors = Math.floor(Math.random() * 2000) + 500;

    // Get total sales (you might want to implement actual sales tracking)
    const totalSales = Math.floor(Math.random() * 100000) + 10000;

    const stats = {
      totalProjects,
      totalProducts,
      recentVisitors,
      totalSales,
    };

    return res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return res.status(500).json({
      totalProjects: 0,
      totalProducts: 0,
      recentVisitors: 0,
      totalSales: 0,
    });
  }
}
