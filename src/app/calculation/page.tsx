"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import CardLayout from '@/components/layout/cardLayout';

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
    const co2 = bill / (roofSizeNumber[roofSize] + 13);


    return (
        <CardLayout>
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
        </CardLayout>
    );
}
