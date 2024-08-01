import { ProductType } from "@/components/ProductsList";
import { connectToDatabase } from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function getProductsAction(page: number, limit: number) {
  try {
    await connectToDatabase();

    const skip = (page - 1) * limit;

    const products: ProductType[] = await Product.find({})
      .skip(skip)
      .limit(limit)
      .lean();
    const totalProductsLength: number = await Product.find({}).countDocuments();

    const formattedProducts = products.map((product) => {
      return {
        ...product,
        _id: product._id.toString(),
      };
    });

    return {
      status: "success",
      message: "Products fetched successfully.",
      products: formattedProducts,
      totalProductsLength,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Error fetching products.",
      products: [],
      totalProductsLength: 0,
    };
  }
}
