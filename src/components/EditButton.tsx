"use client";
import { type ReactElement } from "react";
import { Button } from "./ui/button";
import useAppContext from "@/hooks/useAppContext";
import { MdOutlineEdit } from "react-icons/md";

export interface EditButtonProps {
  path: string;
  endpoint: string;
}

export default function EditButton({
  path,
  endpoint,
}: EditButtonProps): ReactElement {
  const { pushRoute } = useAppContext();
  const handleEditProduct = async () => {
    pushRoute(`/admin/${endpoint}/edit?${path}`);
  };

  return (
    <Button
      onClick={handleEditProduct}
      size="sm"
      variant="ghost"
      className="bg-transparent"
    >
      <MdOutlineEdit className="text-foreground text-lg" />
    </Button>
  );
}
