import SavedInvoices from "./SavedInvoices";
import { Button } from "./ui/button";
import { InvoiceDataProps } from "@/types";
import { FilePlus2 } from "lucide-react";
import PrintSection from "./PrintSection";

export default function Header({
  savedInvoicesData,
  loadSpecificInvoice,
  resetForm,
  printMode,
  setPrintMode,
  isFormSaved,
}: InvoiceDataProps) {
  return (
    <header className="lg:flex-row flex justify-between items-center my-5 flex-col">
      <h1 className="text-3xl">Invoice App</h1>
      <div className="lg:flex lg:gap-2 lg:mt-0 lg:w-fit grid grid-cols-1 gap-2 mt-5 w-full">
        {typeof printMode != "undefined" &&
          setPrintMode &&
          typeof isFormSaved != "undefined" && (
            <PrintSection
              printMode={printMode}
              setPrintMode={setPrintMode}
              isFormSaved={isFormSaved}
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
