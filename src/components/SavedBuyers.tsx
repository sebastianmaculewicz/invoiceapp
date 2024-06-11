import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export default function SavedBuyers({
  buyersData,
  loadSpecificBuyer,
}: {
  buyersData: any;
  loadSpecificBuyer: any;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} disabled={!buyersData ? true : false}>
          Zapisani nabywcy
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[50vh] overflow-y-auto">
        {buyersData &&
          Object.keys(buyersData).map((buyer, index) => (
            <DropdownMenuItem
              key={index}
              data-buyer-id={buyer}
              className="buyer-item cursor-pointer"
              onClick={loadSpecificBuyer}
            >
              {buyersData[buyer].buyerName}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}