import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { InvoiceDataProps } from "@/types";
import { List } from "lucide-react";

export default function SavedInvoices({
  savedInvoicesData,
  loadSpecificInvoice,
}: InvoiceDataProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          disabled={!savedInvoicesData ? true : false}
          className="flex gap-2"
        >
          <List /> Zapisane faktury
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[50vh] overflow-y-auto">
        {savedInvoicesData &&
          Object.keys(savedInvoicesData).map((invoiceNumber) => (
            <DropdownMenuItem
              key={invoiceNumber}
              data-invoice-number={invoiceNumber}
              className="invoice-item cursor-pointer"
              onClick={loadSpecificInvoice}
            >
              {invoiceNumber +
                " - " +
                savedInvoicesData[invoiceNumber].invoiceIssueDate}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
