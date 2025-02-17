import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs/promises";

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
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const form = formidable({
      maxFiles: 1,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          reject(err);
          return res.status(500).json({ error: "Upload failed" });
        }

        const file = files.image?.[0];
        if (!file) {
          reject(new Error("No file uploaded"));
          return res.status(400).json({ error: "No file uploaded" });
        }

        try {
          // Read file and convert to base64
          const imageBuffer = await fs.readFile(file.filepath);
          const base64Image = imageBuffer.toString("base64");
          const fileType = file.mimetype || "image/jpeg";
          const imageString = `data:${fileType};base64,${base64Image}`;

          // Clean up temp file
          await fs.unlink(file.filepath);

          resolve(res.status(200).json({ url: imageString }));
        } catch (error) {
          reject(error);
          return res.status(500).json({ error: "Failed to process image" });
        }
      });
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Upload failed" });
  }
}
