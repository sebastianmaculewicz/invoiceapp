import { InvoiceItem } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { convertNumberToWords } from "@/lib/utils";

export default function InvoiceSummary({
  invoiceItems,
  printView,
}: {
  invoiceItems: InvoiceItem[];
  printView: boolean;
}) {
  const totalNetto = invoiceItems.reduce(
    (acc, invoiceItem) =>
      acc + Number(invoiceItem.serviceValueNet.replace(",", ".")),
    0
  );

  const totalVat = invoiceItems.reduce(
    (acc, invoiceItem) =>
      acc +
      Number(invoiceItem.serviceValueGross.replace(",", ".")) -
      Number(invoiceItem.serviceValueNet.replace(",", ".")),
    0
  );

  const totalBrutto = invoiceItems.reduce(
    (acc, invoiceItem) =>
      acc + Number(invoiceItem.serviceValueGross.replace(",", ".")),
    0
  );

  return (
    <section id="invoice_summary" className="flex justify-end gap-5">
      {printView ? (
        <div className="print-view flex justify-between items-center gap-5 w-full">
          <div>
            <p className="text-xl">
              <strong>Do zapłaty: </strong>
              <span>{totalBrutto.toFixed(2).replace(".", ",")} PLN</span>
            </p>
            <p>Słownie: {convertNumberToWords(totalBrutto)}</p>
          </div>
          <div>
            <table className="text-right">
              <tbody>
                <tr>
                  <td className="px-5">
                    <strong>Wartość netto:</strong>
                  </td>
                  <td>{totalNetto.toFixed(2).replace(".", ",")} PLN</td>
                </tr>
                <tr>
                  <td className="px-5">
                    <strong>Wartość VAT:</strong>
                  </td>
                  <td>{totalVat.toFixed(2).replace(".", ",")} PLN</td>
                </tr>
                <tr>
                  <td className="px-5">
                    <strong>Wartość brutto:</strong>
                  </td>
                  <td>{totalBrutto.toFixed(2).replace(".", ",")} PLN</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="edit-view w-fit">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black">Wartość netto</TableHead>
                <TableHead className="text-black">Wartość VAT</TableHead>
                <TableHead className="text-black">Wartość brutto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  {totalNetto.toFixed(2).replace(".", ",")} PLN
                </TableCell>
                <TableCell>
                  {totalVat.toFixed(2).replace(".", ",")} PLN
                </TableCell>
                <TableCell>
                  {totalBrutto.toFixed(2).replace(".", ",")} PLN
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}
