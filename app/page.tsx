"use client"

import { MetabaseDashboard } from '@/features/dashboard/components/MetabaseDashboard';

export default function Home() {
    return (
        <div className="fixed top-2 left-64 right-0 bottom-0 overflow-auto p-12">
            {/* Force main page to use base user (alias=1) synchronously */}
            <MetabaseDashboard dashboardId={107} questionId={215} providerAlias="1" />
        </div>
    );
}
