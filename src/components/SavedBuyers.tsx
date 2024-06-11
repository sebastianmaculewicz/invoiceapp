import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { BuyerInfo } from "@/types";

interface SavedBuyersProps {
  buyersData: BuyerInfo[];
  loadSpecificBuyer: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function SavedBuyers({ buyersData, loadSpecificBuyer }: SavedBuyersProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} disabled={!buyersData || buyersData.length === 0}>
          Zapisani nabywcy
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[50vh] overflow-y-auto">
        {buyersData &&
          buyersData.map((buyer, index) => (
            <DropdownMenuItem
              key={index}
              data-buyer-id={buyer.buyerID}
              className="buyer-item cursor-pointer"
              onClick={loadSpecificBuyer}
            >
              {buyer.buyerName}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
