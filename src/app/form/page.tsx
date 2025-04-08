"use client"

import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form as ShadForm,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import CardLayout from '@/components/layout/cardLayout';
import { useSearchParams } from 'next/navigation';

const formSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    postcode: z.string()
})

export default function Form() {
    const searchParams = useSearchParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            postcode: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        localStorage.setItem('formData', JSON.stringify(values));
    }

    return (
        <CardLayout>
            <ShadForm {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="postcode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Postcode</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-between'>
                        <Button asChild>
                            <Link href={{
                                pathname: '/calculation',
                                query: { bill: searchParams.get('bill'), roofSize: searchParams.get('roofSize'), savings: searchParams.get('savings'), co2: searchParams.get('co2') },
                            }}><ChevronLeft /> Back</Link>
                        </Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </ShadForm>
        </CardLayout>
    )
}