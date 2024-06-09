import SavedInvoices from "./SavedInvoices";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="flex justify-between items-center my-5">
      <h1 className="text-3xl">Invoice App</h1>
      <SavedInvoices />
    </header>
  )
}