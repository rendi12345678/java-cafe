import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableCellFormattedDate from "@/components/TableCellFormattedDate";
import { Button } from "@/components/ui/button";
import PaginationControls from "@/components/PaginationControls";
import BaseContainer from "@/components/BaseContainer";
import BaseContent from "@/components/BaseContent";
import { getUserOrdersAction } from "@/actions/getUserOrdersAction";
import { MessageSquareText } from "lucide-react";
import BaseHeader from "@/components/BaseHeader";
import SelectShowing from "@/components/SelectShowing";
import SyncOrderStatusButton from "@/components/SyncOrderStatusButton";
import PayPendingOrderButton from "@/components/PayPendingOrderButton";
import { formatToRupiah } from "@/lib/formatToRupiah";
import { getPaymentStatusClass } from "@/lib/getPaymentStatusClass";
import { getShipmentStatusClass } from "@/lib/getShipmentStatusClass";
import AlertDialogProducts from "@/components/AlertDialogProducts";

export default async function Orders({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";
  const { items, totalItemsLength } = await getUserOrdersAction(
    Number(page),
    Number(per_page)
  );

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const totalPages = Math.ceil(totalItemsLength / Number(per_page));

  return (
    <BaseContainer>
      <BaseHeader title="Pesanan Anda" className="flex justify-between">
        <SelectShowing />
      </BaseHeader>
      <BaseContent className="bg-background p-6 rounded-lg">
        <Table className="overflow-y-hidden">
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead className="text-center">Detail</TableHead>
              <TableHead>Bill</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Shipment</TableHead>
              <TableHead>Ongkir</TableHead>
              <TableHead className="text-center">Resi</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map(
              ({
                orderId,
                payment,
                products,
                shippingCost,
                orderStatus,
                paymentStatus,
                resi,
                createdAt,
              }) => (
                <TableRow key={orderId}>
                  <TableCell className="">{orderId}</TableCell>
                  <TableCell className="text-center">
                    <AlertDialogProducts products={products} />
                  </TableCell>
                  <TableCell>{formatToRupiah(String(payment))}</TableCell>
                  <TableCellFormattedDate createdAt={createdAt} />
                  <TableCell>
                    <p
                      className={`${getPaymentStatusClass(
                        paymentStatus as "settlement" | "pending" | "expire"
                      )} m-0 text-center`}
                    >
                      {paymentStatus}
                    </p>
                  </TableCell>
                  <TableCell>
                    {
                      <p
                        className={`${getShipmentStatusClass(
                          orderStatus as "processing" | "delivered"
                        )} m-0 text-center`}
                      >
                        {orderStatus}
                      </p>
                    }
                  </TableCell>
                  <TableCell>{formatToRupiah(String(shippingCost))}</TableCell>
                  <TableCell className="text-center">{resi || "-"}</TableCell>
                  <TableCell className="text-right flex items-center justify-end">
                    <PayPendingOrderButton
                      disabled={paymentStatus === "settlement"}
                      orderId={orderId}
                    />
                    <SyncOrderStatusButton
                      orderId={orderId}
                      disabled={orderStatus === "delivered"}
                    />
                    <Button size="sm" variant="ghost">
                      <MessageSquareText />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
            <TableRow>
              <TableCell
                className="bg-background text-muted-foreground pb-0"
                colSpan={5}
              >
                Total Items : {totalItemsLength}
              </TableCell>
              <TableCell className="bg-background pb-0" colSpan={5}>
                <PaginationControls
                  hasNextPage={Number(page) < totalPages}
                  hasPrevPage={start > 0}
                  totalItemsLength={totalItemsLength}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </BaseContent>
    </BaseContainer>
  );
}