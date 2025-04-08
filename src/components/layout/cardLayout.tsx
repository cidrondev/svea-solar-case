import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function CardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Svea solar calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                {children}
            </CardContent>
        </Card>
    );
}
