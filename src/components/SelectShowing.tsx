"use client";
import { Suspense, useEffect, type ReactElement } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";

const selectShowingItems = [
  { value: "5" },
  { value: "10" },
  { value: "20" },
  { value: "30" },
];

export default function SelectShowing(): ReactElement {
  const [totalItemsPerPage, setTotalItemsPerPage] = useLocalStorage(
    "totalItemsPerPage",
    "5",
  );
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelectOnchange = (value: string) => {
    setTotalItemsPerPage(value);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("per_page", totalItemsPerPage);

    router.push(`${pathname}?${params.toString()}`);
  }, [totalItemsPerPage]);

  return (
    <Suspense>
      <div className="flex gap-6 items-center">
        <p className="mt-0">Showing</p>
        <Select
          defaultValue={totalItemsPerPage}
          onValueChange={handleSelectOnchange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="5" />
          </SelectTrigger>
          <SelectContent>
            {selectShowingItems.map(({ value }, index) => (
              <SelectItem key={index} value={`${value}`}>
                {value + " Items"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Suspense>
  );
}
