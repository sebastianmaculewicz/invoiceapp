import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { InvoiceItemProps } from "@/types";
import { Trash2 } from "lucide-react";

export default function InvoiceItem({form} : InvoiceItemProps) {
  return (
    <div className="grid grid-cols-[50%_repeat(5,_1fr)_25px] gap-2 items-end">
      <FormField
        control={form.control}
        name="serviceName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Nazwa</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name="serviceQuantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Ilość</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name="servicePriceNet"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Cena netto</FormLabel>
            <FormControl>
              <Input
                placeholder=""
                {...field}
                onChange={(e) => {
                  const convertedValue = e.target.value.replace(/[^0-9.]/g, "");
                  form.setValue("servicePriceNet", convertedValue);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name="serviceTax"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">VAT %</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name="serviceValueNet"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Wartość netto</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name="serviceValueGross"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Wartość brutto</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <div className="relative -top-1 -right-2">
        <button>
          <Trash2 />
        </button>
      </div>
    </div>
  );
}
