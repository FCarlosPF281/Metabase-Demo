'use client';

import { EditableDashboard } from '@metabase/embedding-sdk-react';
import MetabaseProviderWrapper from './MetabaseProviderWrapper';
import { useState } from 'react';

interface MetabaseEmbedProps {
    dashboardId: number;
    questionId?: number;
}

export default function MetabaseEmbed({ dashboardId, questionId }: MetabaseEmbedProps) {
    // Asunción: la autenticación se realiza en la página de Login.
    // Aquí no intentamos loguear automáticamente; asumimos sesión activa.
    const [isAuthenticated] = useState(true);
    const [isLoading] = useState(false);
    const [selectedDashboardId, setSelectedDashboardId] = useState<number | null>(dashboardId);

    const metabaseUrl = process.env.NEXT_PUBLIC_METABASE_SITE_URL;

    if (!metabaseUrl) {
        return (
            <div className="p-8 text-red-600">❌ NEXT_PUBLIC_METABASE_SITE_URL no configurada</div>
        );
    }

    if (isLoading) {
        return (
            <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-zinc-600">Autenticando...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="p-8 text-center text-red-600">
                ❌ Error de autenticación. Por favor recarga la página.
            </div>
        );
    }

    return (
        <div className="space-y-8 ">
            <MetabaseProviderWrapper>
                {selectedDashboardId && (
                    <EditableDashboard
                        withTitle={false}
                        withDownloads={true}
                        dashboardId={selectedDashboardId}
                        className="rounded-2xl overflow-hidden dark:bg-zinc-800"
                    />
                )}
            </MetabaseProviderWrapper>
        </div>
    );
}
