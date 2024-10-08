import { Suspense, type ReactElement } from "react";
import DashboardContainer from "@/components/DashboardContainer";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTitle from "@/components/DashboardTitle";
import DashboardContent from "@/components/DashboardContent";
import ProductsTable from "@/components/ProductsTable";
import SelectShowing from "@/components/SelectShowing";
import AddButton from "@/components/AddButton";

export default function Products({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): ReactElement {
  return (
    <Suspense>
      <DashboardContainer>
        <DashboardHeader className="flex justify-between">
          <DashboardTitle>Products</DashboardTitle>
          <div className="flex gap-6">
            <SelectShowing />
            <AddButton label="Add New Product" route="/admin/products/add" />
          </div>
        </DashboardHeader>
        <DashboardContent className="bg-background shadow p-6 rounded-lg">
          <ProductsTable searchParams={searchParams} />
        </DashboardContent>
      </DashboardContainer>
    </Suspense>
  );
}
