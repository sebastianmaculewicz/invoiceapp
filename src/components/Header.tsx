import SavedInvoices from "./SavedInvoices";
import { Button } from "./ui/button";
import { InvoiceDataProps } from "@/types";

export default function Header({ savedInvoiceData, loadSpecificInvoice, resetForm }: InvoiceDataProps) {
  return (
    <header className="flex justify-between items-center my-5">
      <h1 className="text-3xl">Invoice App</h1>
      <div className="flex gap-2">
        <Button
          variant={"outline"}
          onClick={resetForm}
        >
          Nowa faktura
        </Button>
        <SavedInvoices
          savedInvoiceData={savedInvoiceData}
          loadSpecificInvoice={loadSpecificInvoice}
        />
      </div>
    </header>
  );
}
