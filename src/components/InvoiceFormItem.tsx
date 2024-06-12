import ValidatedInput from "./ValidatedInput";
import { X } from "lucide-react";
import { InvoiceFormItemProps } from "@/types";

export default function InvoiceFormItem({ invoiceItemData, removeInvoiceItem, handleChange, handleBlur, formSubmitted }: InvoiceFormItemProps) {
  return (
    <>
      <div className="invoice-item lg:grid lg:grid-cols-[25px_50%_repeat(5,_1fr)_25px] lg:gap-2 lg:items-end lg:space-y-0 lg:mb-0 my-2 relative space-y-2 mb-5" data-id={invoiceItemData.id}>
        <div className="lg:relative lg:-top-2 lg:text-sm text-xl">{invoiceItemData.id}.</div>
        <div>
          <label>Nazwa</label>
          <ValidatedInput name="serviceName" type="text" value={invoiceItemData.serviceName} onBlur={handleBlur} onChange={handleChange} formSubmitted={formSubmitted} />
        </div>
        <div>
          <label>Ilość</label>
          <ValidatedInput name="serviceQuantity" type="text" value={invoiceItemData.serviceQuantity} onBlur={handleBlur} onChange={handleChange} formSubmitted={formSubmitted} />
        </div>
        <div>
          <label>Cena netto</label>
          <ValidatedInput name="servicePriceNet" type="text" value={invoiceItemData.servicePriceNet} onBlur={handleBlur} onChange={handleChange} formSubmitted={formSubmitted} />
        </div>
        <div>
          <label>% VAT</label>
          <ValidatedInput name="serviceTax" type="text" value={invoiceItemData.serviceTax} onBlur={handleBlur} onChange={handleChange} formSubmitted={formSubmitted} />
        </div>
        <div>
          <label>Wartość netto</label>
          <ValidatedInput name="serviceValueNet" type="text" value={invoiceItemData.serviceValueNet} onBlur={handleBlur} onChange={handleChange} formSubmitted={formSubmitted} />
        </div>
        <div>
          <label>Wartość brutto</label>
          <ValidatedInput name="serviceValueGross" type="text" value={invoiceItemData.serviceValueGross} onBlur={handleBlur} onChange={handleChange} formSubmitted={formSubmitted} />
        </div>
        <div className="lg:top-auto lg:bottom-1.5 absolute right-0 -top-1">
          <button onClick={removeInvoiceItem}>
            <X color="#666" size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
