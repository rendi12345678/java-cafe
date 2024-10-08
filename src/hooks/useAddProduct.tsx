"use client";
import React, { useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAppContext from "./useAppContext";
import { useState } from "react";
import { addProductSchema } from "@/schemas/AddProductSchema";

export default function useAddProduct() {
  const { pushRoute: moveRoute } = useAppContext();
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const [isLoading, startTransition] = useTransition();
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      capital: 0,
      weight: 0,
      productImage: undefined,
    },
    mode: "onChange",
  });

  const formData = form.watch();

  const handleCancel = () => {
    form.reset();
    setImageSrc("https://via.placeholder.com/400");
    moveRoute("/admin/products");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    form,
    setImageSrc,
    imageSrc,
    imageFile,
    handleImageChange,
    formData,
    handleCancel,
    isLoading,
    startTransition,
  };
}
