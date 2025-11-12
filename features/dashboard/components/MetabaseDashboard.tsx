'use client'

import dynamic from 'next/dynamic'

const MetabaseEmbed = dynamic(
  () => import('./MetabaseEmbed'),
  { 
    ssr: false,
    loading: () => <div className="p-8">Loading dashboard...</div>
  }
)

export function MetabaseDashboard({ dashboardId }: { dashboardId: number }) {
  return <MetabaseEmbed dashboardId={dashboardId} />
}