import { type ReactElement } from "react";
import { TableCell } from "./ui/table";

export interface TableCellFormattedDateProps {
  createdAt: Date;
}

export default function TableCellFormattedDate({
  createdAt,
}: TableCellFormattedDateProps): ReactElement {
  function formatDate(date: Date): string {
    const formattedDate = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format
    });

    return `${formattedDate} ${formattedTime}`;
  }

  return <TableCell>{formatDate(createdAt)}</TableCell>;
}
