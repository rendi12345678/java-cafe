"use server";
import { connectToDatabase } from "@/lib/dbConnect";
import { getFile, uploadFile } from "@/lib/storage";
import Product from "@/models/Product";
import {
  AddProductType,
  addProductSchema,
  newAddProductType,
} from "@/schemas/AddProductSchema";
import { revalidatePath } from "next/cache";

const handleUpload = async (file: File) => {
  const folder = "products/";
  const imagePath = await uploadFile(file, folder);
  const imageUrl = await getFile(imagePath);

  return imageUrl;
};

export async function addProductAction(formData: FormData) {
  try {
    await connectToDatabase();

    const data: AddProductType = {
      title: formData.get("title") as string,
      price: Number(formData.get("price")),
      capital: Number(formData.get("capital")),
      profit: Number(formData.get("profit")),
      weight: Number(formData.get("weight")),
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      stock: Number(formData.get("stock")),
      productImage: formData.get("productImage") as string,
    };

    // Validate the data against the schema
    const parseResult = addProductSchema.safeParse(data);
    if (!parseResult.success) {
      return {
        status: "error",
        message: parseResult.error.errors.map((err) => err.message).join(", "),
        errors: parseResult.error.errors,
      };
    }

    const imgUrl = await handleUpload(data.productImage as File);

    // Extracting data from formData and casting to appropriate types
    const { productImage, ...payload } = parseResult.data;

    (payload as newAddProductType).imgUrl = imgUrl;

    // Add the product to the database
    const newProduct = new Product(payload);
    await newProduct.save();

    revalidatePath("/admin/products/add");
    revalidatePath("/admin/products");

    return {
      status: "success",
      message: "Product added successfully.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as { message: string }).message || "Internal server error.",
    };
  }
}
