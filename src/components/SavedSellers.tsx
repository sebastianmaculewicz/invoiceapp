import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export default function SavedSellers({
  sellersData,
  loadSpecificSeller,
}: {
  sellersData: any;
  loadSpecificSeller: any;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} disabled={!sellersData ? true : false}>
          Zapisani sprzedawcy
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[50vh] overflow-y-auto">
        {sellersData &&
          Object.keys(sellersData).map((seller, index) => (
            <DropdownMenuItem
              key={index}
              data-seller-id={seller}
              className="seller-item cursor-pointer"
              onClick={loadSpecificSeller}
            >
              {sellersData[seller].sellerName}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}