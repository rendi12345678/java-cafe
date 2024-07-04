import DashboardSummary from "@/components/DashboardSummary";
import React from "react";

const page = () => {
  return (
    <section className="py-12 px-10">
      <div className="pt-[11px]">
        <h2 className="mt-0 pb-0">
          Dashboard
        </h2>
      </div>
      <DashboardSummary totalEarnings={10000000} totalOrders={30} totalSales={2000}/>
    </section>
  );
};

export default page;
