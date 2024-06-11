import { useEffect, useState } from 'react';
import './App.css'
import Header from './components/Header'
import InvoiceForm from './components/InvoiceForm'
import { formatDate, generateInvoiceNumber } from './lib/utils';
import { InvoiceData, InvoiceItem } from './types';

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: "",
    invoiceIssueDate: formatDate(new Date()),
    invoiceIssuePlace: "",
    invoiceSaleDate: formatDate(new Date()),
    sellerName: "",
    sellerNIP: "",
    sellerBankAccountNumber: "",
    sellerStreetWithNumber: "",
    sellerZipcode: "",
    sellerCity: "",
    buyerName: "",
    buyerNIP: "",
    buyerBankAccountNumber: "",
    buyerStreetWithNumber: "",
    buyerZipcode: "",
    buyerCity: "",
    invoiceItems: [],
  })

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    {
      id: 1,
      serviceName: "",
      serviceQuantity: "1",
      servicePriceNet: "",
      serviceTax: "23",
      serviceValueNet: "",
      serviceValueGross: "",
    },
  ]);

  const savedInvoiceData = JSON.parse(localStorage.getItem("invoiceData") as string);

  function loadSpecificInvoice(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const invoiceNumber = e.currentTarget.closest(".invoice-item")?.getAttribute("data-invoice-number");
    
    if(invoiceNumber) {
      const invoiceData = savedInvoiceData[invoiceNumber];
      setInvoiceData(invoiceData);
      setInvoiceItems(invoiceData.invoiceItems);
    }
  }

  useEffect(() => {
    const invoiceNumber = generateInvoiceNumber(savedInvoiceData, new Date());
    setInvoiceData({ ...invoiceData, invoiceNumber });
  }, []);

  return (
    <>
      <Header savedInvoiceData={savedInvoiceData} loadSpecificInvoice={loadSpecificInvoice} />
      <InvoiceForm savedInvoiceData={savedInvoiceData} invoiceData={invoiceData} setInvoiceData={setInvoiceData} invoiceItems={invoiceItems} setInvoiceItems={setInvoiceItems} />
    </>
  )
}

export default App