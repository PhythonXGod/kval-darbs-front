import { Category } from "@/models/Category";


export default async function handler(req, res) {
    const { method } = req;
  
    if (method === "GET") {
      try {
        const categories = await Category.find();
        res.status(200).json(categories);
      } catch (error) {
        console.error("Error occurred while fetching categories:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  }
  