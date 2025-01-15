import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db("ecommerce");
    const collection = db.collection("products");

    switch (req.method) {
      case "DELETE":
        const deleteResult = await collection.deleteOne({
          _id: new ObjectId(id),
        });
        res.status(200).json(deleteResult);
        break;

      case "PUT":
        const { _id, ...updateData } = req.body;
        const updateResult = await collection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              ...updateData,
              updatedAt: new Date(),
            },
          }
        );
        if (updateResult.modifiedCount === 0) {
          res.status(404).json({ error: "Product not found" });
        } else {
          res.status(200).json(updateResult);
        }
        break;

      default:
        res.setHeader("Allow", ["DELETE", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
