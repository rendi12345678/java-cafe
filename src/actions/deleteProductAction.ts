"use server";

import { connectToDatabase } from "@/lib/dbConnect";
import { deleteFile } from "@/lib/storage";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";

export default async function deleteProductAction(
  itemId: number | string,
  filePath: string,
) {
  try {
    await connectToDatabase();
    const response = await Product.deleteOne({
      _id: itemId,
    });

    if (response.deletedCount === 0)
      return {
        message: "Product not found.",
        status: "error",
      };

    revalidatePath("/admin/products");

    await deleteFile(filePath);

    return {
      status: "success",
      message: "Product deleted successfully.",
    };
  } catch (error) {
    return { status: "error", message: "Internal server error." };
  }
}
