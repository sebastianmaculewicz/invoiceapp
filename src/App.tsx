import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import InvoiceForm from "./components/InvoiceForm";
import { extractSellersAndBuyers, formatDate, generateInvoiceNumber } from "./lib/utils";
import { InvoiceData, InvoiceItem } from "./types";

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: "",
    invoiceIssueDate: formatDate(new Date()),
    invoiceIssuePlace: "",
    invoiceSaleDate: formatDate(new Date()),
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

  const [sellersData, setSellersData] = useState<any[]>([]);
  const [buyersData, setBuyersData] = useState<any[]>([]);
  const [savedInvoiceData, setSavedInvoiceData] = useState<any>({});

  function loadSpecificInvoice(e: React.MouseEvent<HTMLButtonElement>) {
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

  function loadSpecificSeller(e: React.MouseEvent<HTMLButtonElement>) {    
    const sellerID = e.currentTarget.closest(".seller-item")?.getAttribute("data-seller-id");

    if(!sellerID) return;
    const sellerData = sellersData[sellerID as keyof typeof sellersData];
    
    setInvoiceData(prevData => ({
      ...prevData,
      ...sellerData
    }));
  }

  function loadSpecificBuyer(e: React.MouseEvent<HTMLButtonElement>) {
    const buyerID = e.currentTarget.closest(".buyer-item")?.getAttribute("data-buyer-id");

    if(!buyerID) return;
    const buyerData = buyersData[buyerID as keyof typeof buyersData];
    
    setInvoiceData(prevData => ({
      ...prevData,
      ...buyerData
    }));
  }
  
  useEffect(() => {
    const savedInvoiceData = JSON.parse(
      localStorage.getItem("invoiceData") as string
    );
    const {sellers, buyers} = extractSellersAndBuyers(savedInvoiceData);
    const invoiceNumber = generateInvoiceNumber(savedInvoiceData, new Date());

    setInvoiceData({ ...invoiceData, invoiceNumber });
    setSavedInvoiceData(savedInvoiceData);
    setSellersData(Object.values(sellers));
    setBuyersData(Object.values(buyers));
  }, []);


  return (
    <>
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
