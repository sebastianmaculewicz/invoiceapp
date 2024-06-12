import SavedInvoices from "./SavedInvoices";
import { Button } from "./ui/button";
import { InvoiceDataProps } from "@/types";
import PrintModeSwitch from "./PrintModeSwitch";
import PrintInvoiceButton from "./PrintInvoiceButton";
import { FilePlus2 } from "lucide-react";

export default function Header({
  savedInvoicesData,
  loadSpecificInvoice,
  resetForm,
  printMode,
  setPrintMode,
  isFormSaved,
}: InvoiceDataProps) {
  return (
    <header className="flex justify-between items-center my-5">
      <h1 className="text-3xl">Invoice App</h1>
      <div className="flex gap-2">
        {typeof printMode != "undefined" && setPrintMode && (
          <PrintModeSwitch printMode={printMode} setPrintMode={setPrintMode} />
        )}
        {typeof isFormSaved != "undefined" && setPrintMode && (
          <PrintInvoiceButton
            isFormSaved={isFormSaved}
            setPrintMode={setPrintMode}
          />
        )}
        <SavedInvoices
          savedInvoicesData={savedInvoicesData}
          loadSpecificInvoice={loadSpecificInvoice}
        />
        <Button
          variant={"secondary"}
          onClick={resetForm}
          className="flex gap-2"
        >
          <FilePlus2 />
          Nowa faktura
        </Button>
      </div>
    </header>
  );
}
