import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { InvoiceDataProps } from "@/types";

export default function SavedInvoices({
  savedInvoiceData,
  loadSpecificInvoice,
}: InvoiceDataProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} disabled={!savedInvoiceData ? true : false}>
          Zapisane faktury
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[50vh] overflow-y-auto">
        {savedInvoiceData &&
          Object.keys(savedInvoiceData).map((invoiceNumber) => (
            <DropdownMenuItem
              key={invoiceNumber}
              data-invoice-number={invoiceNumber}
              className="invoice-item cursor-pointer"
              onClick={loadSpecificInvoice}
            >
              {invoiceNumber +
                " - " +
                savedInvoiceData[invoiceNumber].invoiceIssueDate}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
