import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

//TODO: specify form type
export default function InvoiceFormItem({invoiceItemData, removeInvoiceItem, index, handleChange, handleBlur}: {invoiceItemData: any, removeInvoiceItem: any, index: number, handleChange: any, handleBlur: any}) {
  return (
    <>
    {index === 0 && <div className="invoice-items-header grid grid-cols-[25px_50%_repeat(5,_1fr)_25px] gap-2 items-end mb-2" data-id={invoiceItemData.id}>
      <div></div>
      <label>Nazwa</label>
      <label>Ilość</label>
      <label>Cena netto</label>
      <label>% VAT</label>
      <label>Wartość netto</label>
      <label>Wartość brutto</label>
      <div></div>
    </div>}
    <div className="invoice-item grid grid-cols-[25px_50%_repeat(5,_1fr)_25px] gap-2 items-center my-2" data-id={invoiceItemData.id}>
      <div>{invoiceItemData.id}.</div>
      <div>
        <Input name="serviceName" type="text" value={invoiceItemData.serviceName} onBlur={handleBlur} onChange={handleChange} />
      </div>
      <div>
        <Input name="serviceQuantity" type="text" value={invoiceItemData.serviceQuantity} onBlur={handleBlur} onChange={handleChange} />
      </div>
      <div>
        <Input name="servicePriceNet" type="text" value={invoiceItemData.servicePriceNet} onBlur={handleBlur} onChange={handleChange} />
      </div>
      <div>
        <Input name="serviceTax" type="text" value={invoiceItemData.serviceTax} onBlur={handleBlur} onChange={handleChange} />
      </div>
      <div>
        <Input name="serviceValueNet" type="text" value={invoiceItemData.serviceValueNet} onBlur={handleBlur} onChange={handleChange} />
      </div>
      <div>
        <Input name="serviceValueGross" type="text" value={invoiceItemData.serviceValueGross} onBlur={handleBlur} onChange={handleChange} />
      </div>
      <div>
        <button>
          <Trash2 onClick={removeInvoiceItem} />
        </button>
      </div>
    </div>
    </>
  );
}
