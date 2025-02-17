import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio"); // your database name
    const collection = db.collection("projects");

    const processTags = (tags: string | undefined) => {
      if (!tags) return [];
      return tags
        .split(",")
        .map((tag: string) => tag.trim())
        .filter(Boolean);
    };

    switch (req.method) {
      case "GET":
        const projects = await collection
          .find({})
          .sort({ createdAt: -1 })
          .toArray();
        console.log("API Response:", projects);
        return res.status(200).json(projects);

      case "POST":
        // Allow both base64 and URL images
        if (
          req.body.image &&
          !req.body.image.startsWith("data:image/") &&
          !req.body.image.match(/^https?:\/\/.+\/.+$/)
        ) {
          return res.status(400).json({ error: "Invalid image format or URL" });
        }

        const newProject = {
          ...req.body,
          tags: processTags(req.body.tags),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const result = await collection.insertOne(newProject);
        return res.status(201).json({
          ...newProject,
          _id: result.insertedId,
        });

      case "PUT":
        const { id, _id, ...updateData } = req.body;

        // Allow both base64 and URL images
        if (
          updateData.image &&
          !updateData.image.startsWith("data:image/") &&
          !updateData.image.match(/^https?:\/\/.+\/.+$/)
        ) {
          return res.status(400).json({ error: "Invalid image format or URL" });
        }

        const updatedProject = {
          ...updateData,
          tags: processTags(updateData.tags),
          updatedAt: new Date(),
        };
        await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedProject }
        );
        return res.status(200).json({
          ...updatedProject,
          _id: id,
        });

      case "DELETE":
        const { id: deleteId } = req.query;
        await collection.deleteOne({ _id: new ObjectId(String(deleteId)) });
        return res
          .status(200)
          .json({ message: "Project deleted successfully" });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res
          .status(405)
          .json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Database operation failed" });
  }
}
