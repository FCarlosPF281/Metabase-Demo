import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { MainLayout } from '@/components/layout/MainLayout';
import './globals.css';


export const metadata: Metadata = {
    title: 'Incontrol Metabase Demo',
    description: 'Incontrol Metabase Demo',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body >
                <MainLayout>{children}</MainLayout>
            </body>
        </html>
    );
}