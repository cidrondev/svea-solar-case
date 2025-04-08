"use client";


import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form as ShadForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from "react";
import CardLayout from "@/components/layout/cardLayout";

const formSchema = z.object({
  averageBill: z.string().min(1, { message: "Please write your monthly average bill" }),
  roofSize: z.string({
    required_error: "Please select a a roof size."
  }),
})


const roofSizes = [
  {
    value: "small",
    label: "Small",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "large",
    label: "Large",
  },
]


export default function Home() {

  const [open, setOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      averageBill: searchParams.get('bill') ?? "",
      roofSize: searchParams.get('roofSize') ?? ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("bill", values.averageBill);
    params.set("roofSize", values.roofSize);
    router.push(`/calculation?${params.toString()}`);
  }

  return (
    <CardLayout>
      <ShadForm {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="averageBill"
            render={({ field }) => (
              <FormItem className="w-[320px]">
                <FormLabel>Monthly bill</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roofSize"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Roof size</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[320px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? roofSizes.find(
                            (roofSize) => roofSize.value === field.value
                          )?.label
                          : "Select roof size"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[320px] p-0">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          {roofSizes.map((roofSize) => (
                            <CommandItem
                              value={roofSize.label}
                              key={roofSize.value}
                              onSelect={() => {
                                form.setValue("roofSize", roofSize.value)
                                setOpen(false)
                              }}
                            >
                              {roofSize.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </ShadForm>
    </CardLayout>
  );
}
