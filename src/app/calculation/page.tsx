"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';

const roofSizeNumber = {
    'small': 4,
    'medium': 3,
    'large': 2
}


export default function Home() {

    const searchParams = useSearchParams();
    const bill = Number(searchParams.get('bill'));
    const roofSize = searchParams.get('roofSize');
    const savings = bill / roofSizeNumber[roofSize];

    return (
        <Card>
            <CardHeader className='flex min-w-2xs'>
                <Button asChild size="icon">
                    <Link href="/"><ChevronLeft /></Link>
                </Button>
                <CardTitle>Svea solar calculator</CardTitle>
            </CardHeader>
            <CardContent>
                <h2>Monthly Savings</h2>
                <p>{savings} sek</p>
                <Button asChild><Link href={{
                    pathname: '/form',
                    query: { bill: bill, roofSize: roofSize, savings: savings},
                }}>Next</Link></Button>
            </CardContent>
        </Card>
    );
}
