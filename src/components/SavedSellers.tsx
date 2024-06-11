import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { SellerInfo } from "@/types";

interface SavedSellersProps {
  sellersData: SellerInfo[];
  loadSpecificSeller: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function SavedSellers({
  sellersData,
  loadSpecificSeller,
}: SavedSellersProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} disabled={!sellersData || sellersData.length === 0}>
          Zapisani sprzedawcy
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[50vh] overflow-y-auto">
        {sellersData &&
          sellersData.map((seller, index) => (
            <DropdownMenuItem
              key={index}
              data-seller-id={seller.sellerID}
              className="seller-item cursor-pointer"
              onClick={loadSpecificSeller}
            >
              {seller.sellerName}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
