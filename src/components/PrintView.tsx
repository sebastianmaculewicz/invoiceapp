import { InvoiceData } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import InvoiceSummary from "./InvoiceSummary";

export default function PrintView({
  invoiceData,
}: {
  invoiceData: InvoiceData;
}) {
  return (
    <div className="my-10 text-left text-sm leading-6">
      <div className="mb-10">
        <p className="mb-5">
          <strong>Faktura numer: </strong>
          <span>{invoiceData.invoiceNumber}</span>
        </p>
        <p>
          <strong>Miejsce i data wystawienia: </strong>
          <span>
            {invoiceData.invoiceIssuePlace}, {invoiceData.invoiceIssueDate}
          </span>
        </p>
        <p>
          <strong>Data sprzedaży: </strong>
          <span>{invoiceData.invoiceSaleDate}</span>
        </p>
        <p>
          <strong>Sposób płatności: </strong>
          <span>{invoiceData.invoicePaymentMethod}</span>
        </p>
        <p>
          <strong>Termin płatności: </strong>
          <span>{invoiceData.invoicePaymentDate}</span>
        </p>
      </div>
      <div className="grid grid-cols-2 mb-10">
        <div>
          <strong>Sprzedawca</strong>
          <p>{invoiceData.sellerName}</p>
          <p>{invoiceData.sellerStreetWithNumber}</p>
          <p>
            {invoiceData.sellerZipcode} {invoiceData.sellerCity}
          </p>
          <p>NIP: {invoiceData.sellerNIP}</p>
          <p>Numer konta: {invoiceData.sellerBankAccountNumber}</p>
        </div>
        <div>
          <strong>Nabywca</strong>
          <p>{invoiceData.buyerName}</p>
          <p>{invoiceData.buyerStreetWithNumber}</p>
          <p>
            {invoiceData.buyerZipcode} {invoiceData.buyerCity}
          </p>
          <p>NIP: {invoiceData.buyerNIP}</p>
          <p>Numer konta: {invoiceData.buyerBankAccountNumber}</p>
        </div>
      </div>
      <div>
        <div className="mb-10">
          <Table className="-mx-4">
            <TableHeader>
              <TableRow>
                <TableHead className="text-black">LP</TableHead>
                <TableHead className="text-black">
                  Nazwa towaru / usługi
                </TableHead>
                <TableHead className="text-black">Ilość</TableHead>
                <TableHead className="text-black">Cena netto</TableHead>
                <TableHead className="text-black">Podatek</TableHead>
                <TableHead className="text-black">Wartość netto</TableHead>
                <TableHead className="text-black">Wartość brutto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceData.invoiceItems.map((invoiceItem, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{invoiceItem.serviceName}</TableCell>
                  <TableCell>{invoiceItem.serviceQuantity}</TableCell>
                  <TableCell>{invoiceItem.servicePriceNet}</TableCell>
                  <TableCell>{invoiceItem.serviceTax}</TableCell>
                  <TableCell>{invoiceItem.serviceValueNet}</TableCell>
                  <TableCell>{invoiceItem.serviceValueGross}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <InvoiceSummary
        invoiceItems={invoiceData.invoiceItems}
        printView={true}
      />
    </div>
  );
}
