import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const { method, query } = req;
  await mongooseConnect();

  if (method === "GET") {
    try {
      const { searchTerm, category } = query;
      let filters = {};

      if (searchTerm) {
        filters.title = { $regex: searchTerm, $options: "i" };
      }

      if (category) {
        filters.category = { $regex: category, $options: "i" };
      }

      const products = await Product.find(filters);
      res.status(200).json(products);
    } catch (error) {
      console.error("Error occurred while fetching products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}






