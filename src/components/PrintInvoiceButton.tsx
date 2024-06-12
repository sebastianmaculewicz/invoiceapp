import { Printer } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function PrintInvoiceButton({
  isFormSaved,
  setPrintMode,
}: {
  isFormSaved: boolean;
  setPrintMode: (printMode: boolean) => void;
}) {
    const [printModeTriggered, setPrintModeTriggered] = useState(false);
    useEffect(() => {
        if(printModeTriggered) {
            window.print();
            setPrintModeTriggered(false);
        }
    }, [printModeTriggered]);
  return (
    <Button
      variant={"outline"}
      className="flex gap-2"
      onClick={() => {
        if (isFormSaved) {
          setPrintMode(true);
          setPrintModeTriggered(true);
        } else {
          toast.error(
            "Uzupełnij i zapisz fakturę przed wydrukiem (lub wczytaj już zapisaną)"
          );
        }
      }}
    >
      <Printer /> Drukuj fakturę
    </Button>
  );
}
