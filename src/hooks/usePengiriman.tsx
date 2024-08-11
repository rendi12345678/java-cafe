import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeferredValue, useEffect } from "react";
import useShippingContext from "./useShippingContext";
import {
  DetailPengirimanSchema,
  DetailPengirimanType,
} from "@/schemas/DetailPengirimanSchema";
import { createUserDetailAction } from "@/actions/createUserDetailAction";
import { toast } from "@/components/ui/use-toast";
import { getUserDetailAction } from "@/actions/getUserDetailAction";

export default function usePengiriman() {
  const { incrementStep } = useShippingContext();

  const form = useForm<DetailPengirimanType>({
    resolver: zodResolver(DetailPengirimanSchema),
    defaultValues: {
      alamatLengkap: "",
      noHandphone: "",
    },
  });

  const formData = useDeferredValue(form.watch());

  const getPrevUserDetail = async () => {
    const response = await getUserDetailAction();

    if (response.status === "success" && response.detailPengiriman) {
      form.setValue("alamatLengkap", response.detailPengiriman.alamatLengkap);
      form.setValue("noHandphone", response.detailPengiriman.noHandphone);
    }
  };

  useEffect(() => {
    getPrevUserDetail();
  }, []);

  useEffect(() => {
    const result = DetailPengirimanSchema.safeParse(formData);

    form.clearErrors();

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof DetailPengirimanType;
        form.setError(path, { message: issue.message });
      });
    }
  }, [formData.alamatLengkap, formData.noHandphone]);

  // Function to handle form action
  const handleFormAction = async () => {
    const result = DetailPengirimanSchema.safeParse(formData);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof DetailPengirimanType;
        form.setError(path, { message: issue.message });
      });
      return;
    }

    try {
      const response = await createUserDetailAction(result.data);

      if (response.issues && response.status === "error") {
        response.issues.forEach((issue) => {
          const path = issue.path[0] as keyof DetailPengirimanType;
          form.setError(path, { message: issue.message });
        });
        return;
      }

      if (response.status === "error")
        return toast({ description: response.message, variant: "destructive" });

      toast({ description: response.message });
      incrementStep();
    } catch (error) {}
  };

  return { form, handleFormAction };
}
