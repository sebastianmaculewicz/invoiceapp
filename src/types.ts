export interface InvoiceItem {
  id: number;
  serviceName: string;
  serviceQuantity: number;
  servicePriceNet: string;
  serviceTax: number;
  serviceValueNet: string;
  serviceValueGross: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceIssueDate: string;
  invoiceIssuePlace: string;
  invoiceSaleDate: string;
  sellerID: number;
  sellerName: string;
  sellerNIP: string;
  sellerBankAccountNumber: string;
  sellerStreetWithNumber: string;
  sellerZipcode: string;
  sellerCity: string;
  buyerID: number;
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
  sellersData: any[];
  buyersData: any[];
  loadSpecificSeller: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loadSpecificBuyer: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface InvoiceFormItemProps {
  invoiceItemData: InvoiceItem;
  removeInvoiceItem: (e: React.MouseEvent<HTMLButtonElement>) => void;
  index: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SellerInfo {
  sellerID: number;
  sellerName: string;
  sellerNIP: string;
  sellerBankAccountNumber: string;
  sellerStreetWithNumber: string;
  sellerZipcode: string;
  sellerCity: string;
}

export interface BuyerInfo {
  buyerID: number;
  buyerName: string;
  buyerNIP: string;
  buyerBankAccountNumber: string;
  buyerStreetWithNumber: string;
  buyerZipcode: string;
  buyerCity: string;
}

export interface Sellers {
  [key: number]: SellerInfo;
}

export interface Buyers {
  [key: string]: BuyerInfo;
}
