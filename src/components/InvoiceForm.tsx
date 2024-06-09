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
  serviceQuantity: z.number().min(1, {
    message: "Uzupełnij ilość",
  }),
  servicePriceNet: z.number().min(1, {
    message: "Uzupełnij cenę netto",
  }),
  serviceTax: z.number().min(1, {
    message: "Uzupełnij wartość podatku",
  }),
  serviceValueNet: z.number().min(1, {
    message: "Uzupełnij wartość netto",
  }),
  serviceValueGross: z.number().min(1, {
    message: "Uzupełnij wartość brutto",
  }),
});

export default function InvoiceCreator() {
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
      servicePriceNet: undefined,
      serviceTax: 23,
      serviceValueNet: undefined,
      serviceValueGross: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                        <Input placeholder="" {...field} />
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
              <Button className="mt-2" variant={"secondary"}>+ Dodaj pozycję</Button>
            </CardContent>
          </Card>
        </section>
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
}
