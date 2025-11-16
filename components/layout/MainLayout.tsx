import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Header />
            <Sidebar />

            <div className="flex">
                <main className="flex-1 p-6 bg-incontrol">{children}</main>
            </div>
        </>
    );
}
