import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import InvoiceForm from "./components/InvoiceForm";
import {
  extractSellersAndBuyers,
  formatDate,
  generateInvoiceNumber,
} from "./lib/utils";
import { InvoiceData, InvoiceItem, SellerInfo, BuyerInfo } from "./types";
import PrintView from "./components/PrintView";

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
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
  });

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    {
      id: 1,
      serviceName: "",
      serviceQuantity: 1,
      servicePriceNet: "",
      serviceTax: 23,
      serviceValueNet: "",
      serviceValueGross: "",
    },
  ]);

  const [sellersData, setSellersData] = useState<SellerInfo[]>([]);
  const [buyersData, setBuyersData] = useState<BuyerInfo[]>([]);
  const [savedInvoiceData, setSavedInvoiceData] = useState<Record<string, InvoiceData>>({});

  function loadSpecificInvoice(e: React.MouseEvent<HTMLDivElement>) {
    const invoiceNumber = e.currentTarget
      .closest(".invoice-item")
      ?.getAttribute("data-invoice-number");

    if (invoiceNumber) {
      const specificInvoiceData = savedInvoiceData[invoiceNumber];
      setInvoiceData(specificInvoiceData);
      setInvoiceItems(specificInvoiceData.invoiceItems);
      console.log(specificInvoiceData);
    }
  }

  function loadSpecificSeller(e: React.MouseEvent<HTMLDivElement>) {
    const sellerID = e.currentTarget
      .closest(".seller-item")
      ?.getAttribute("data-seller-id");

    if (!sellerID) return;
    const sellerData = sellersData.find((seller) => seller.sellerID === Number(sellerID));

    if (sellerData) {
      setInvoiceData((prevData) => ({
        ...prevData,
        ...sellerData,
        invoiceIssuePlace: sellerData.sellerCity,
      }));
    }
  }

  function loadSpecificBuyer(e: React.MouseEvent<HTMLDivElement>) {
    const buyerID = e.currentTarget
      .closest(".buyer-item")
      ?.getAttribute("data-buyer-id");

    if (!buyerID) return;
    const buyerData = buyersData.find((buyer) => buyer.buyerID === Number(buyerID));

    if (buyerData) {
      setInvoiceData((prevData) => ({
        ...prevData,
        ...buyerData,
      }));
    }
  }

  useEffect(() => {
    const savedInvoiceData = JSON.parse(
      localStorage.getItem("invoiceData") as string
    );
    const { sellers, buyers } = extractSellersAndBuyers(savedInvoiceData);
    const invoiceNumber = generateInvoiceNumber(savedInvoiceData, new Date());

    setInvoiceData({ ...invoiceData, invoiceNumber });
    setSavedInvoiceData(savedInvoiceData);
    setSellersData(Object.values(sellers));
    setBuyersData(Object.values(buyers));
  }, []);

  return (
    <>
      <PrintView invoiceData={invoiceData} />
      <Header
        savedInvoiceData={savedInvoiceData}
        loadSpecificInvoice={loadSpecificInvoice}
      />
      <InvoiceForm
        savedInvoiceData={savedInvoiceData}
        invoiceData={invoiceData}
        setInvoiceData={setInvoiceData}
        invoiceItems={invoiceItems}
        setInvoiceItems={setInvoiceItems}
        sellersData={sellersData}
        buyersData={buyersData}
        loadSpecificSeller={loadSpecificSeller}
        loadSpecificBuyer={loadSpecificBuyer}
      />
    </>
  );
}

export default App;
