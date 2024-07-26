"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import useAppContext from "./useAppContext";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  addProductSchema,
  AddProductType,
  newAddProductType,
} from "@/schemas/AddProductSchema";
import { getFile, uploadFile } from "@/lib/storage";

// Type for the error response data
interface ErrorResponse {
  message?: string;
  path?: string;
}

export default function useAddProduct() {
  // const { moveRoute } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      productImage: undefined,
    },
  });

  const formData = form.watch();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (file: File) => {
    const folder = "products/";
    const imagePath = await uploadFile(file, folder);
    const imageUrl = await getFile(imagePath);
    console.log("Uploaded successfully");

    return imageUrl;
  };

  async function onSubmit(formData: AddProductType) {
    setIsLoading(true);

    try {
      // Check if product already exists
      const checkResponse = await axios.post("/api/products/check-product", {
        title: formData.title, // Assuming 'title' is the unique identifier
      });

      console.log(checkResponse.data);

      if (checkResponse.data.exists) {
        toast({
          description: "Product already exists",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const imgUrl = await handleUpload(imageFile as File);

      const { productImage, ...payload } = formData;

      (payload as newAddProductType).imgUrl = imgUrl;

      form.clearErrors();

      const { data } = await axios.post("/api/products/add-product", payload);

      toast({ description: data.message, variant: "success" });
    } catch (error) {
      const axiosError = error as AxiosError;

      // Handle 401 (Unauthorized) errors specifically
      if (axiosError.response?.status === 401) {
        // Type assertion to ensure `axiosError.response.data` is of type `ErrorResponse`
        const errorData = axiosError.response?.data as ErrorResponse;

        // Default error message if not provided
        const errorMessage = errorData.message || "Unauthorized";

        // Use optional chaining to safely get the path
        const path = errorData.path || ""; // Default to empty string if path is undefined

        type ErrorPath =
          | "title"
          | "description"
          | "stock"
          | "price"
          | "category"
          | "productImage"
          | "root"
          | `root.${string}`;

        const errorPaths: ErrorPath[] = [
          "title",
          "category",
          "stock",
          "productImage",
          "description",
          "price",
        ];

        // Set form error if path is provided
        errorPaths.forEach((errorPath) => {
          if (path === errorPath) {
            form.setError(path, {
              message: errorMessage,
            });
          }
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
    form,
    setImageSrc,
    imageSrc,
    onSubmit,
    isLoading,
    handleImageChange,
    formData,
  };
}
