import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export default function SavedInvoices({
  savedInvoiceData,
  loadSpecificInvoice
}: {
  savedInvoiceData: any;
  loadSpecificInvoice: any;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} disabled={!savedInvoiceData ? true : false}>
          Zapisane faktury
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {savedInvoiceData && Object.keys(savedInvoiceData).map((invoiceNumber) => (
          <DropdownMenuItem key={invoiceNumber} data-invoice-number={invoiceNumber} className="invoice-item" onClick={loadSpecificInvoice}>
            {invoiceNumber +
              " - " +
              savedInvoiceData[invoiceNumber].invoiceIssueDate}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
