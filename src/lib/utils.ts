import { BuyerInfo, Buyers, InvoiceData, InvoiceItem, SellerInfo, Sellers } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const invoiceDefaultData: InvoiceData = {
  invoiceNumber: "",
  invoiceIssueDate: formatDate(new Date()),
  invoiceIssuePlace: "",
  invoiceSaleDate: formatDate(new Date()),
  invoicePaymentMethod: "Przelew",
  invoicePaymentDate: "14 dni",
  sellerID: -1,
  sellerName: "",
  sellerNIP: "",
  sellerBankAccountNumber: "",
  sellerStreetWithNumber: "",
  sellerZipcode: "",
  sellerCity: "",
  buyerID: -1,
  buyerName: "",
  buyerNIP: "",
  buyerBankAccountNumber: "",
  buyerStreetWithNumber: "",
  buyerZipcode: "",
  buyerCity: "",
  invoiceItems: [],
}

export const invoiceDefaultItems: InvoiceItem[] = [
  {
    id: 1,
    serviceName: "",
    serviceQuantity: 1,
    servicePriceNet: "",
    serviceTax: 23,
    serviceValueNet: "",
    serviceValueGross: "",
  },
];

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

export function generateInvoiceNumber(savedInvoicesData: Record<string, InvoiceData>, currentDate: Date) {
  const currentDateObj = currentDate;
  const currentMonth = currentDateObj.getMonth() + 1;
  const currentYear = currentDateObj.getFullYear();

  let invoiceCount = 0;

  if(savedInvoicesData) {
    for (let invoiceId in savedInvoicesData) {
      const invoiceDate = new Date(savedInvoicesData[invoiceId].invoiceIssueDate);
      if (invoiceDate.getMonth() + 1 === currentMonth && invoiceDate.getFullYear() === currentYear) {
        invoiceCount++;
      }
    }
  }

  const newInvoiceNumber = `${invoiceCount + 1}/${String(currentMonth).padStart(2, '0')}/${currentYear}`;
  
  return newInvoiceNumber;
}

export function extractSellersAndBuyers(data: Record<string, InvoiceData>) {
  const sellers: Sellers = {};
  const buyers: Buyers = {};

  for (const invoiceKey in data) {
    if (data.hasOwnProperty(invoiceKey)) {
      const invoice = data[invoiceKey];

      const sellerInfo: SellerInfo = {
        sellerID: invoice.sellerID,
        sellerName: invoice.sellerName,
        sellerNIP: invoice.sellerNIP,
        sellerBankAccountNumber: invoice.sellerBankAccountNumber,
        sellerStreetWithNumber: invoice.sellerStreetWithNumber,
        sellerZipcode: invoice.sellerZipcode,
        sellerCity: invoice.sellerCity,
      };
      sellers[invoice.sellerID] = sellerInfo;

      const buyerInfo: BuyerInfo = {
        buyerID: invoice.buyerID,
        buyerName: invoice.buyerName,
        buyerNIP: invoice.buyerNIP,
        buyerBankAccountNumber: invoice.buyerBankAccountNumber,
        buyerStreetWithNumber: invoice.buyerStreetWithNumber,
        buyerZipcode: invoice.buyerZipcode,
        buyerCity: invoice.buyerCity,
      };
      buyers[invoice.buyerName] = buyerInfo;
    }
  }

  return { sellers, buyers };
}

export function convertNumberToWords(num: number) {
  const units = ["", "jeden", "dwa", "trzy", "cztery", "pięć", "sześć", "siedem", "osiem", "dziewięć"];
  const teens = ["dziesięć", "jedenaście", "dwanaście", "trzynaście", "czternaście", "piętnaście", "szesnaście", "siedemnaście", "osiemnaście", "dziewiętnaście"];
  const tens = ["", "dziesięć", "dwadzieścia", "trzydzieści", "czterdzieści", "pięćdziesiąt", "sześćdziesiąt", "siedemdziesiąt", "osiemdziesiąt", "dziewięćdziesiąt"];
  const hundreds = ["", "sto", "dwieście", "trzysta", "czterysta", "pięćset", "sześćset", "siedemset", "osiemset", "dziewięćset"];

    if (num === 0) return "zero";

    function getUnits(n: number) {
        return units[n];
    }

    function getTeens(n: number) {
        return teens[n - 10];
    }

    function getTens(n: number) {
        if (n < 10) return getUnits(n);
        if (n < 20) return getTeens(n);
        const unit = n % 10;
        const ten = Math.floor(n / 10);
        return tens[ten] + (unit ? " " + getUnits(unit) : "");
    }

    function getHundreds(n: number) {
        const hundred = Math.floor(n / 100);
        const rest = n % 100;
        return hundreds[hundred] + (rest ? " " + getTens(rest) : "");
    }

    function getThousands(n: number) {
        const thousand = Math.floor(n / 1000);
        const rest = n % 1000;
        let thousandWord = "";

        if (thousand === 1) {
            thousandWord = "tysiąc";
        } else if (thousand >= 2 && thousand <= 4) {
            thousandWord = getUnits(thousand) + " tysiące";
        } else {
            thousandWord = getTens(thousand) + " tysięcy";
        }

        return thousandWord + (rest ? " " + getHundreds(rest) : "");
    }

    function convertToWords(n: number) {
        if (n < 100) {
            return getTens(n);
        } else if (n < 1000) {
            return getHundreds(n);
        } else {
            return getThousands(n);
        }
    }

    function parseNumber(num: number) {
        const [zloty, grosz] = num.toFixed(2).split('.').map(Number);
        const zlotyWords = convertToWords(zloty) + " PLN";
        const groszWords = grosz ? convertToWords(grosz) + " gr" : "";
        return zlotyWords + (groszWords ? " " + groszWords : "");
    }

    return parseNumber(num);
}

export function validateZipCode(zipCode: string) {
  const zipCodePattern = /^\d{2}-\d{3}$/;

  return zipCodePattern.test(zipCode);
}

export function validateNIP(nip: string) {
  const cleanedNIP = nip.replace(/\D/g, '');

  if (cleanedNIP.length !== 10) {
      return false;
  }

  const digits = cleanedNIP.split('').map(Number);
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];

  let checksum = 0;
  for (let i = 0; i < weights.length; i++) {
      checksum += digits[i] * weights[i];
  }

  const controlNumber = checksum % 11;


  return controlNumber === digits[9];
}

export function validateStreetAddress(address: string) {
  const addressPattern = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+\s+\d+.*$/;

  return addressPattern.test(address);
}