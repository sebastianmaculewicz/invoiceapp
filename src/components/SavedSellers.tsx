import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { extractSellersAndBuyers } from "@/lib/utils";

export default function SavedSellers({
  savedInvoiceData,
  loadSpecificSeller,
}: {
  savedInvoiceData: any;
  loadSpecificSeller: any;
}) {
  const savedSellers = extractSellersAndBuyers(savedInvoiceData).sellers;
  console.log('savedSellers', savedSellers);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} disabled={!savedInvoiceData ? true : false}>
          Zapisani sprzedawcy
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {savedInvoiceData &&
          Object.keys(savedSellers).map((seller, index) => (
            <DropdownMenuItem
              key={index}
              data-id={index}
              className="seller-item cursor-pointer"
              onClick={loadSpecificSeller}
            >
              {seller}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
