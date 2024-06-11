export interface InvoiceItem {
    id: number;
    serviceName: string;
    serviceQuantity: string;
    servicePriceNet: string;
    serviceTax: string;
    serviceValueNet: string;
    serviceValueGross: string;
  }
  
  export interface InvoiceData {
    invoiceNumber: string;
    invoiceIssueDate: string;
    invoiceIssuePlace: string;
    invoiceSaleDate: string;
    sellerName: string;
    sellerNIP: string;
    sellerBankAccountNumber: string;
    sellerStreetWithNumber: string;
    sellerZipcode: string;
    sellerCity: string;
    buyerName: string;
    buyerNIP: string;
    buyerBankAccountNumber: string;
    buyerStreetWithNumber: string;
    buyerZipcode: string;
    buyerCity: string;
    invoiceItems: InvoiceItem[];
  }
  
  export interface InvoiceFormProps {
    savedInvoiceData: Record<string, InvoiceData>;
    setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
    invoiceData: InvoiceData;
    setInvoiceItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
    invoiceItems: InvoiceItem[];
    loadSpecificSeller: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }
  
  export interface InvoiceFormItemProps {
    invoiceItemData: InvoiceItem;
    removeInvoiceItem: (e: React.MouseEvent<HTMLButtonElement>) => void;
    index: number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  