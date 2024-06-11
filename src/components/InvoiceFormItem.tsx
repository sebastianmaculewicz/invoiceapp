import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { InvoiceFormItemProps } from "@/types";

export default function InvoiceFormItem({ invoiceItemData, removeInvoiceItem, handleChange, handleBlur }: InvoiceFormItemProps) {
  return (
    <>
      <div className="invoice-item lg:grid lg:grid-cols-[25px_50%_repeat(5,_1fr)_25px] lg:gap-2 lg:items-end lg:space-y-0 lg:mb-0 my-2 relative space-y-2 mb-5" data-id={invoiceItemData.id}>
        <div className="lg:relative lg:-top-2 lg:text-sm text-xl">{invoiceItemData.id}.</div>
        <div>
          <label>Nazwa</label>
          <Input name="serviceName" type="text" value={invoiceItemData.serviceName} onBlur={handleBlur} onChange={handleChange} />
        </div>
        <div>
          <label>Ilość</label>
          <Input name="serviceQuantity" type="text" value={invoiceItemData.serviceQuantity} onBlur={handleBlur} onChange={handleChange} />
        </div>
        <div>
          <label>Cena netto</label>
          <Input name="servicePriceNet" type="text" value={invoiceItemData.servicePriceNet} onBlur={handleBlur} onChange={handleChange} />
        </div>
        <div>
          <label>% VAT</label>
          <Input name="serviceTax" type="text" value={invoiceItemData.serviceTax} onBlur={handleBlur} onChange={handleChange} />
        </div>
        <div>
          <label>Wartość netto</label>
          <Input name="serviceValueNet" type="text" value={invoiceItemData.serviceValueNet} onBlur={handleBlur} onChange={handleChange} />
        </div>
        <div>
          <label>Wartość brutto</label>
          <Input name="serviceValueGross" type="text" value={invoiceItemData.serviceValueGross} onBlur={handleBlur} onChange={handleChange} />
        </div>
        <div className="lg:top-auto lg:bottom-1.5 lg:-right-2 absolute right-0 -top-1">
          <button onClick={removeInvoiceItem}>
            <Trash2 color="#666" />
          </button>
        </div>
      </div>
    </>
  );
}
