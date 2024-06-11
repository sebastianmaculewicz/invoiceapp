import { InvoiceData } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(d: Date) {
  function pad(n: number) {
    return n < 10 ? "0" + n : n;
  }
  return (
    d.getUTCFullYear() +
    "-" +
    pad(d.getUTCMonth() + 1) +
    "-" +
    pad(d.getUTCDate())
  );
}

export function generateInvoiceNumber(savedInvoiceData: Record<string, InvoiceData>, currentDate: Date) {
  const currentDateObj = currentDate;
  const currentMonth = currentDateObj.getMonth() + 1;
  const currentYear = currentDateObj.getFullYear();

  console.log(currentMonth, currentYear);

  let invoiceCount = 0;

  if(savedInvoiceData) {
    for (let invoiceId in savedInvoiceData) {
      const invoiceDate = new Date(savedInvoiceData[invoiceId].invoiceIssueDate);
      if (invoiceDate.getMonth() + 1 === currentMonth && invoiceDate.getFullYear() === currentYear) {
        invoiceCount++;
      }
    }
  }

  const newInvoiceNumber = `${invoiceCount + 1}/${String(currentMonth).padStart(2, '0')}/${currentYear}`;
  
  return newInvoiceNumber;
}

export function extractSellersAndBuyers(data: InvoiceData) {
  const sellers = {};
  const buyers = {};
  
  for (const invoiceKey in data) {
      if (data.hasOwnProperty(invoiceKey)) {
          const invoice = data[invoiceKey];

          // Extract seller information
          const sellerInfo = {
              sellerName: invoice.sellerName,
              sellerNIP: invoice.sellerNIP,
              sellerBankAccountNumber: invoice.sellerBankAccountNumber,
              sellerStreetWithNumber: invoice.sellerStreetWithNumber,
              sellerZipcode: invoice.sellerZipcode,
              sellerCity: invoice.sellerCity
          };
          sellers[invoice.sellerName] = sellerInfo;

          // Extract buyer information
          const buyerInfo = {
              buyerName: invoice.buyerName,
              buyerNIP: invoice.buyerNIP,
              buyerBankAccountNumber: invoice.buyerBankAccountNumber,
              buyerStreetWithNumber: invoice.buyerStreetWithNumber,
              buyerZipcode: invoice.buyerZipcode,
              buyerCity: invoice.buyerCity
          };
          buyers[invoice.buyerName] = buyerInfo;
      }
  }

  return { sellers, buyers };
}