import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs/promises";
import sharp from "sharp";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = formidable({});
    const [, files] = await form.parse(req);
    const file = files.image?.[0];

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Read file
    const imageBuffer = await fs.readFile(file.filepath);

    // Compress and resize image
    const compressedImage = await sharp(imageBuffer)
      .resize(800, 800, { fit: "inside" })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Convert to base64
    const base64Image = compressedImage.toString("base64");
    const fileType = "image/jpeg";
    const imageUrl = `data:${fileType};base64,${base64Image}`;

    // Clean up temp file
    await fs.unlink(file.filepath);

    res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
}
