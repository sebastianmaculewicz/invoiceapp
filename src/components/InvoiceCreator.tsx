import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { serialize } from "v8";
import InvoiceItem from "./ui/InvoiceItem";
import { useState } from "react";

//move to utils
const formSchema = z.object({
  sellerName: z.string().min(1, {
    message: "Uzupełnij nazwę sprzedawcy",
  }),
  sellerAddress: z.string().min(1, {
    message: "Uzupełnij adres sprzedawcy",
  }),
  buyerName: z.string().min(1, {
    message: "Uzupełnij nazwę nabywcy",
  }),
  buyerAddress: z.string().min(1, {
    message: "Uzupełnij adres nabywcy",
  }),
  serviceName: z.string().min(1, {
    message: "Uzupełnij nazwę",
  }),
  serviceQuantity: z.coerce.number().refine((data) => data > 0, {
    message: "Ilość musi być większa od 0",
  }),
  servicePriceNet: z.string().min(1, {
    message: "Uzupełnij cenę netto",
  }),
  serviceTax: z.coerce.number().refine((data) => data > 0, {
    message: "Wartość podatku musi być większa od 0",
  }),
  serviceValueNet: z.string().min(1, {
    message: "Uzupełnij wartość netto",
  }),
  serviceValueGross: z.string().min(1, {
    message: "Uzupełnij wartość brutto",
  }),
});

export default function InvoiceCreator() {
  const [invoiceItems, setInvoiceItems] = useState({
    1: {
      serviceName: "",
      serviceQuantity: 1,
      servicePriceNet: "",
      serviceTax: 23,
      serviceValueNet: "",
      serviceValueGross: "",
    }
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      sellerName: "",
      sellerAddress: "",
      buyerName: "",
      buyerAddress: "",
      serviceName: "",
      serviceQuantity: 1,
      servicePriceNet: "",
      serviceTax: 23,
      serviceValueNet: "",
      serviceValueGross: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  function addInvoiceItem(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("add invoice item");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section
          id="address_data"
          className="flex justify-center gap-5 text-left"
        >
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Dane sprzedawcy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <FormField
                control={form.control}
                name="sellerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwa</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sellerAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adres</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Dane nabywcy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <FormField
                control={form.control}
                name="buyerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwa</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buyerAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adres</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </section>

        <section id="sale_data" className="flex justify-center gap-5 text-left">
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Pozycje na fakturze</CardTitle>
            </CardHeader>
            <CardContent>

              <InvoiceItem form={form} />
              
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
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
}
