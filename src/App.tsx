import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import InvoiceForm from "./components/InvoiceForm";
import {
  extractSellersAndBuyers,
  generateInvoiceNumber,
  invoiceDefaultData,
  invoiceDefaultItems,
} from "./lib/utils";
import { InvoiceData, InvoiceItem, SellerInfo, BuyerInfo } from "./types";
import PrintView from "./components/PrintView";
import { Toaster } from "@/components/ui/sonner"

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(invoiceDefaultData);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>(invoiceDefaultItems);
  const [sellersData, setSellersData] = useState<SellerInfo[]>([]);
  const [buyersData, setBuyersData] = useState<BuyerInfo[]>([]);
  const [savedInvoicesData, setsavedInvoicesData] = useState<Record<string, InvoiceData>>({});
  const [printMode, setPrintMode] = useState(false);
  const [isFormSaved, setIsFormSaved] = useState<boolean>(false);

  function loadSpecificInvoice(e: React.MouseEvent<HTMLDivElement>) {
    const invoiceNumber = e.currentTarget
      .closest(".invoice-item")
      ?.getAttribute("data-invoice-number");

    if (invoiceNumber) {
      const specificInvoiceData = savedInvoicesData[invoiceNumber];
      setInvoiceData(specificInvoiceData);
      setInvoiceItems(specificInvoiceData.invoiceItems);
      setIsFormSaved(true);
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

  const resetForm = () => {
    const invoiceNumber = generateInvoiceNumber(savedInvoicesData, new Date());
    
    setInvoiceData({...invoiceDefaultData, invoiceNumber});
    setInvoiceItems(invoiceDefaultItems);
    setIsFormSaved(false);
  };

  useEffect(() => {
    const savedInvoicesData = JSON.parse(
      localStorage.getItem("invoiceData") as string
    );
    const { sellers, buyers } = extractSellersAndBuyers(savedInvoicesData);
    const invoiceNumber = generateInvoiceNumber(savedInvoicesData, new Date());

    setInvoiceData({ ...invoiceData, invoiceNumber });
    setsavedInvoicesData(savedInvoicesData);
    setSellersData(Object.values(sellers));
    setBuyersData(Object.values(buyers));
  }, []);

  return (
    <>
      <Header
        savedInvoicesData={savedInvoicesData}
        loadSpecificInvoice={loadSpecificInvoice}
        resetForm={resetForm}
        printMode={printMode}
        setPrintMode={setPrintMode}
        isFormSaved={isFormSaved}
      />
      {printMode ? <PrintView invoiceData={invoiceData} /> : <InvoiceForm
        setsavedInvoicesData={setsavedInvoicesData}
        savedInvoicesData={savedInvoicesData}
        invoiceData={invoiceData}
        setInvoiceData={setInvoiceData}
        invoiceItems={invoiceItems}
        setInvoiceItems={setInvoiceItems}
        sellersData={sellersData}
        buyersData={buyersData}
        loadSpecificSeller={loadSpecificSeller}
        loadSpecificBuyer={loadSpecificBuyer}
        setIsFormSaved={setIsFormSaved}
      />}
      <Toaster />
    </>
  );
}

export default App;
