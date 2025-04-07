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
    const co2 = bill / (roofSizeNumber[roofSize]+13);


    return (
        <Card>
            <CardHeader className='flex min-w-2xs'>
                <CardTitle><h1>Svea solar calculator</h1></CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                <p>Monthly savings: {savings} sek</p>
                <p>co2 savings: {co2} g</p>
                <div className='flex justify-between'>
                    <Button asChild>
                        <Link href="/"><ChevronLeft /> Back</Link>
                    </Button>
                    <Button asChild>
                        <Link href={{
                            pathname: '/form',
                            query: { bill: bill, roofSize: roofSize, savings: savings, co2: co2 },
                        }}>Next</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
