import { InvoiceItem } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function InvoiceSummary({
  invoiceItems,
}: {
  invoiceItems: InvoiceItem[];
}) {
  return (
    <section id="invoice_summary" className="flex justify-end gap-5 text-right">
      <div className="w-fit">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black">Suma netto</TableHead>
              <TableHead className="text-black">Suma VAT</TableHead>
              <TableHead className="text-black">Suma brutto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {invoiceItems
                  .reduce(
                    (acc, invoiceItem) =>
                      acc +
                      Number(invoiceItem.serviceValueNet.replace(",", ".")),
                    0
                  )
                  .toFixed(2)
                  .replace(".", ",")}{" "}
                zł
              </TableCell>
              <TableCell>
                {invoiceItems
                  .reduce(
                    (acc, invoiceItem) =>
                      acc +
                      Number(invoiceItem.serviceValueGross.replace(",", ".")) -
                      Number(invoiceItem.serviceValueNet.replace(",", ".")),
                    0
                  )
                  .toFixed(2)
                  .replace(".", ",")}{" "}
                zł
              </TableCell>
              <TableCell>
                {invoiceItems
                  .reduce(
                    (acc, invoiceItem) =>
                      acc +
                      Number(invoiceItem.serviceValueGross.replace(",", ".")),
                    0
                  )
                  .toFixed(2)
                  .replace(".", ",")}{" "}
                zł
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
