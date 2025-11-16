"use client"

import React, { useMemo } from "react"
import dynamic from "next/dynamic"
import { MainLayout } from "@/components/layout/MainLayout"

// Load the MetabaseProvider only on the client to avoid server-side access to `document`.
const MetabaseProvider = dynamic(
  () => import("@metabase/embedding-sdk-react").then((mod) => mod.MetabaseProvider),
  { ssr: false }
)

interface Props {
  children: React.ReactNode
}

export default function MetabaseProviderWrapper({ children }: Props) {
  const metabaseUrl = process.env.NEXT_PUBLIC_METABASE_SITE_URL

  if (!metabaseUrl) {
    return (
      <div className="p-8 text-red-600">❌ NEXT_PUBLIC_METABASE_SITE_URL no configurada</div>
    )
  }

  const authConfig = useMemo(
    () => ({
      metabaseInstanceUrl: metabaseUrl,
      authProviderUri: `/api/metabase/token`,
      fetchOptions: { credentials: "include" },
    } as any),
    [metabaseUrl]
  )

  return (
    // MetabaseProvider is dynamically imported and will only render on client-side
    // so it's safe to reference window/document inside the SDK implementation.
    <MetabaseProvider authConfig={authConfig}>
      <MainLayout>
        {children}
      </MainLayout>
    </MetabaseProvider>
  )
}
