import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import InvoiceFormItem from "./InvoiceFormItem";
import { useState } from "react";

export default function InvoiceForm() {
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [invoiceItems, setInvoiceItems] = useState([
    {
      id: invoiceCount,
      serviceName: "",
      serviceQuantity: "1",
      servicePriceNet: "",
      serviceTax: "23",
      serviceValueNet: "",
      serviceValueGross: "",
    },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedInvoiceItems = invoiceItems.map((invoiceItem) => {
      if (invoiceItem.id === Number(e.currentTarget.closest(".invoice-item")?.getAttribute("data-id"))) {
        let serviceName = invoiceItem.serviceName;
        let quantity = Number(invoiceItem.serviceQuantity);
        let priceNet = Number(invoiceItem.servicePriceNet.replace(',', '.'));
        let tax = Number(invoiceItem.serviceTax);
        let valueNet = Number(invoiceItem.serviceValueNet.replace('.', ','));
        let valueGross = Number(invoiceItem.serviceValueGross.replace('.', ','));

        switch (name) {
          case "serviceName":
            serviceName = value.trim();
            break;
          case "serviceQuantity":
            quantity = Number(value);
            break;
          case "servicePriceNet":
            console.log('value', value);
            priceNet = Number(value.replace(',', '.'));
            console.log(priceNet);
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

        console.log(name, quantity, priceNet, tax, valueNet, valueGross);

        return {
          ...invoiceItem,
          serviceQuantity: String(quantity),
          servicePriceNet: String(priceNet.toFixed(2)).replace('.', ','),
          serviceValueNet: String((quantity * priceNet).toFixed(2)).replace('.', ','),
          serviceValueGross: String((quantity * priceNet * (1 + tax / 100)).toFixed(2)).replace('.', ','),
        };
      }
      return invoiceItem;
    });
    setInvoiceItems(updatedInvoiceItems);
    console.log(updatedInvoiceItems);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("submit");
    return false;
  }

  const addInvoiceItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setInvoiceItems([...invoiceItems, {
      id: invoiceCount + 1,
      serviceName: "",
      serviceQuantity: "1",
      servicePriceNet: "",
      serviceTax: "23",
      serviceValueNet: "",
      serviceValueGross: "",
    }]);

    setInvoiceCount(invoiceCount + 1);
  }

  function removeInvoiceItem(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const itemId = Number(e.currentTarget.closest(".invoice-item")?.getAttribute("data-id"));
    setInvoiceItems(invoiceItems.filter((invoiceItem, index) => invoiceItem.id !== itemId));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section
        id="address_data"
        className="flex justify-center gap-5 text-left"
      >
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Dane sprzedawcy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <label>Nazwa</label>
              <Input name="buyerName" type="text" />
            </div>
            <div>
              <label>Adres</label>
              <Input name="buyerAddress" type="text" />
            </div>
          </CardContent>
        </Card>
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Dane nabywcy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <label>Nazwa</label>
              <Input name="sellerName" type="text" />
            </div>
            <div>
              <label>Adres</label>
              <Input name="sellerAddress" type="text" />
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="sale_data" className="flex justify-center gap-5 text-left">
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Pozycje na fakturze</CardTitle>
          </CardHeader>
          <CardContent>
            
            {invoiceItems.map((invoiceItem, index) => (
              <InvoiceFormItem invoiceItemData={invoiceItem} removeInvoiceItem={removeInvoiceItem} index={index} key={index} handleChange={handleChange} handleBlur={handleBlur} />
            ))}

            <Button
              className="mt-2"
              variant={"secondary"}
              onClick={addInvoiceItem}
            >
              + Dodaj pozycję
            </Button>
          </CardContent>
        </Card>
      </section>
      
      <Button type="submit">Zapisz</Button>
    </form>
  );
}
