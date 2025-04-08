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
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

const formSchema = z.object({
    name: z.string().min(1, { message: "Please write your name" }),
    email: z.string().min(1, { message: "Please write your email" }).email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Please write your phone" }).regex(/^\d+$/, { message: "Only numbers" }),
    postcode: z.string().min(1, { message: "Please write your postcode" }).regex(/^\d+$/, { message: "Only numbers" })
})

export default function Form() {
    const searchParams = useSearchParams();
    const queryObject = { bill: searchParams.get('bill'), roofSize: searchParams.get('roofSize'), savings: searchParams.get('savings'), co2: searchParams.get('co2') }

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            postcode: ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const allValues = { ...values, ...queryObject };
        const response = await fetch("api/form", {
            method: "POST",
            body: JSON.stringify({ values: allValues })
        });
        if (response.status === 200) {
            localStorage.setItem('formData', JSON.stringify(allValues));
            setIsDialogOpen(true);
        } else {
            setIsErrorDialogOpen(true);
        }
    }

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogTitle>Successfully added your information</DialogTitle>
                    <Button asChild>
                        <Link href={{
                            pathname: '/'
                        }}>Start over</Link>
                    </Button>
                </DialogContent>
            </Dialog>
            <Dialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
                <DialogContent>
                    <DialogTitle>Something went wrong try again</DialogTitle>
                </DialogContent>
            </Dialog>
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
                                    query: queryObject,
                                }}><ChevronLeft /> Back</Link>
                            </Button>
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </ShadForm>
            </CardLayout>
        </>
    )
}