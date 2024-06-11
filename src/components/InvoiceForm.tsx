import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import InvoiceFormItem from "./InvoiceFormItem";
import React from "react";
import { InvoiceFormProps } from "@/types";
import { generateInvoiceNumber } from "@/lib/utils";
import SavedSellers from "./SavedSellers";

export default function InvoiceForm({ savedInvoiceData, setInvoiceData, invoiceData, setInvoiceItems, invoiceItems }: InvoiceFormProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    console.log(name, value);

    if (name in invoiceData) {
      let updatedInvoiceData = { ...invoiceData, [name]: value };

      if(name === 'invoiceIssueDate') {
        updatedInvoiceData = { ...updatedInvoiceData, invoiceNumber: generateInvoiceNumber(savedInvoiceData, new Date(value)), invoiceSaleDate: value };
      }
      
      setInvoiceData(updatedInvoiceData);
    } else {
      const updatedInvoiceItems = invoiceItems.map((invoiceItem) => {
        if (invoiceItem.id === Number(e.currentTarget.closest(".invoice-item")?.getAttribute("data-id"))) {
          return {
            ...invoiceItem,
            [name]: value,
          };
        }
        return invoiceItem;
      });

      setInvoiceItems(updatedInvoiceItems);
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedInvoiceItems = invoiceItems.map((invoiceItem) => {
      if (invoiceItem.id === Number(e.currentTarget.closest(".invoice-item")?.getAttribute("data-id"))) {
        let { serviceName, serviceQuantity, servicePriceNet, serviceTax, serviceValueNet, serviceValueGross } = invoiceItem;
        let quantity = Number(serviceQuantity);
        let priceNet = Number(servicePriceNet.replace(',', '.'));
        let tax = Number(serviceTax);
        let valueNet = Number(serviceValueNet.replace('.', ','));
        let valueGross = Number(serviceValueGross.replace('.', ','));

        switch (name) {
          case "serviceName":
            serviceName = value.trim();
            break;
          case "serviceQuantity":
            quantity = Number(value);
            break;
          case "servicePriceNet":
            priceNet = Number(value.replace(',', '.'));
            break;
          case "serviceTax":
            tax = Number(value);
            break;
          case "serviceValueNet":
            valueNet = Number(value);
            break;
          case "serviceValueGross":
            valueGross = Number(value);
            break;
        }

        return {
          ...invoiceItem,
          serviceName,
          serviceQuantity: String(quantity),
          servicePriceNet: String(priceNet.toFixed(2)).replace('.', ','),
          serviceValueNet: String((quantity * priceNet).toFixed(2)).replace('.', ','),
          serviceValueGross: String((quantity * priceNet * (1 + tax / 100)).toFixed(2)).replace('.', ','),
        };
      }
      return invoiceItem;
    });
    setInvoiceItems(updatedInvoiceItems);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const invoiceDataToSave = {
      [invoiceData.invoiceNumber]: { ...invoiceData, invoiceItems },
    };

    localStorage.setItem("invoiceData", JSON.stringify({...savedInvoiceData, ...invoiceDataToSave }));
  };

  const addInvoiceItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setInvoiceItems([
      ...invoiceItems,
      {
        id: invoiceItems.length + 1,
        serviceName: "",
        serviceQuantity: "1",
        servicePriceNet: "",
        serviceTax: "23",
        serviceValueNet: "",
        serviceValueGross: "",
      },
    ]);
  };

  const removeInvoiceItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const itemId = Number(e.currentTarget.closest(".invoice-item")?.getAttribute("data-id"));
    setInvoiceItems(invoiceItems.filter((invoiceItem) => invoiceItem.id !== itemId));
  };

  const loadSpecificSeller = () => {
    return false;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section id="invoice_data" className="lg:flex lg:justify-center lg:gap-5 text-left">
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Dane faktury</CardTitle>
          </CardHeader>
          <CardContent className="lg:flex lg:gap-2 lg:space-y-0 items-start text-sm space-y-2">
            <div>
              <label>Numer</label>
              <Input name="invoiceNumber" type="text" value={invoiceData.invoiceNumber} onChange={handleChange} />
            </div>
            <div>
              <label>Data wystawienia</label>
              <Input name="invoiceIssueDate" type="date" value={invoiceData.invoiceIssueDate} onChange={handleChange} />
            </div>
            <div>
              <label>Miejsce wystawienia</label>
              <Input name="invoiceIssuePlace" type="text" value={invoiceData.invoiceIssuePlace} onChange={handleChange} />
            </div>
            <div>
              <label>Data sprzedaży</label>
              <Input name="invoiceSaleDate" type="date" value={invoiceData.invoiceSaleDate} onChange={handleChange} />
            </div>
          </CardContent>
        </Card>
      </section>
      <section id="address_data" className="lg:flex lg:justify-center lg:gap-5 lg:space-y-0 text-left space-y-5">
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Dane sprzedawcy</CardTitle>
            <SavedSellers savedInvoiceData={savedInvoiceData} loadSpecificSeller={loadSpecificSeller} />
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <label>Nazwa</label>
              <Input name="sellerName" type="text" value={invoiceData.sellerName} onChange={handleChange} />
            </div>
            <div>
              <label>NIP</label>
              <Input name="sellerNIP" type="text" value={invoiceData.sellerNIP} onChange={handleChange} />
            </div>
            <div>
              <label>Numer konta</label>
              <Input name="sellerBankAccountNumber" type="text" value={invoiceData.sellerBankAccountNumber} onChange={handleChange} />
            </div>
            <div>
              <label>Ulica i numer</label>
              <Input name="sellerStreetWithNumber" type="text" value={invoiceData.sellerStreetWithNumber} onChange={handleChange} />
            </div>
            <div>
              <label>Kod pocztowy</label>
              <Input name="sellerZipcode" type="text" value={invoiceData.sellerZipcode} onChange={handleChange} />
            </div>
            <div>
              <label>Miejscowość</label>
              <Input name="sellerCity" type="text" value={invoiceData.sellerCity} onChange={handleChange} />
            </div>
          </CardContent>
        </Card>
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Dane nabywcy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <label>Nazwa</label>
              <Input name="buyerName" type="text" value={invoiceData.buyerName} onChange={handleChange} />
            </div>
            <div>
              <label>NIP</label>
              <Input name="buyerNIP" type="text" value={invoiceData.buyerNIP} onChange={handleChange} />
            </div>
            <div>
              <label>Numer konta</label>
              <Input name="buyerBankAccountNumber" type="text" value={invoiceData.buyerBankAccountNumber} onChange={handleChange} />
            </div>
            <div>
              <label>Ulica i numer</label>
              <Input name="buyerStreetWithNumber" type="text" value={invoiceData.buyerStreetWithNumber} onChange={handleChange} />
            </div>
            <div>
              <label>Kod pocztowy</label>
              <Input name="buyerZipcode" type="text" value={invoiceData.buyerZipcode} onChange={handleChange} />
            </div>
            <div>
              <label>Miejscowość</label>
              <Input name="buyerCity" type="text" value={invoiceData.buyerCity} onChange={handleChange} />
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="sale_data" className="flex justify-center gap-5 text-left">
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Pozycje na fakturze</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            {invoiceItems.map((invoiceItem, index) => (
              <InvoiceFormItem
                invoiceItemData={invoiceItem}
                removeInvoiceItem={removeInvoiceItem}
                index={index}
                key={index}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            ))}
            <Button className="mt-2" variant={"secondary"} onClick={addInvoiceItem}>
              + Dodaj pozycję
            </Button>
          </CardContent>
        </Card>
      </section>
      
      <Button type="submit">Zapisz</Button>
    </form>
  );
}
