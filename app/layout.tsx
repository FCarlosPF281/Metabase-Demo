import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { MainLayout } from '@/components/layout/MainLayout';
import { MetabaseAuthProvider } from '@/features/dashboard/context/MetabaseAuthContext';
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
                    <MetabaseAuthProvider>
                        {children}
                    </MetabaseAuthProvider>
                </body>
        </html>
    );
}