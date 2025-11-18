'use client'

import dynamic from 'next/dynamic'

const MetabaseEmbed = dynamic(
  () => import('./MetabaseEmbed'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-64 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <div
            role="status"
            aria-label="Loading dashboard"
            className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"
          />
          <div className="text-sm text-zinc-600 dark:text-zinc-300">Loading dashboard…</div>
        </div>
      </div>
    )
  }
)

export function MetabaseDashboard({ dashboardId,questionId, providerAlias }: { dashboardId: number, questionId: number, providerAlias?: string }) {
  return <MetabaseEmbed dashboardId={dashboardId} questionId={questionId} providerAlias={providerAlias} />
}