import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export default function SavedInvoices() {
  const invoiceData = JSON.parse(localStorage.getItem("invoiceData") as string);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} disabled={!invoiceData ? true : false}>
          Zapisane faktury
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.keys(invoiceData).map((invoiceNumber) => (
          <DropdownMenuItem key={invoiceNumber}>
            <DropdownMenuLabel>{invoiceNumber + ' - ' + invoiceData[invoiceNumber].invoiceIssueDate}</DropdownMenuLabel>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
