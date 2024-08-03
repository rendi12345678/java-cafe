import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/constanst";
import { z } from "zod";

// Add product schema for coffee shop owner
export const addProductSchema = z.object({
  title: z
    .string()
    .min(1, "Product title is required")
    .max(50, "Product title cannot exceed 50 characters"),
  price: z.coerce
    .number()
    .min(1000, "Price must be at least IDR 1K")
    .max(10000000000000, "Price cannot exceed 10000000000000"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(95, "Description cannot exceed 95 characters"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(30, "Category cannot exceed 30 characters"),
  stock: z.coerce
    .number()
    .min(1, "Stock must be at least 1")
    .max(9999, "Stock cannot exceed 9999")
    .default(1),
  productImage: z
    .any()
    .refine((files) => {
      return files?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export const newAddProductSchema = addProductSchema
  .omit({ productImage: true })
  .extend({
    imgUrl: z
      .string()
      .url()
      .min(5, "newField must be at least 5 characters long"),
  });

// Define TypeScript type based on the add product schema
export type AddProductType = z.infer<typeof addProductSchema>;
export type newAddProductType = z.infer<typeof newAddProductSchema>;
