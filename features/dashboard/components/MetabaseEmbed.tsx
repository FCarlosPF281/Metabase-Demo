'use client'

import { MetabaseProvider, StaticDashboard } from '@metabase/embedding-sdk-react'

interface MetabaseEmbedProps {
  dashboardId: number
}

export default function MetabaseEmbed({ dashboardId }: MetabaseEmbedProps) {
  const metabaseUrl = process.env.NEXT_PUBLIC_METABASE_SITE_URL
  
  if (!metabaseUrl) {
    return <div className="p-8 text-red-600">NEXT_PUBLIC_METABASE_SITE_URL no configurada</div>
  }
  
  return (
    <MetabaseProvider 
      authConfig={{
        metabaseInstanceUrl: metabaseUrl,
        authProviderUri: `/api/metabase/token?dashboardId=${dashboardId}`
      }}
    >
      <StaticDashboard dashboardId={dashboardId} />
    </MetabaseProvider>
  )
}