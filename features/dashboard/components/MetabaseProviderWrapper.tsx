"use client"

import React, { useMemo, useEffect, useState } from "react"
import { useMetabaseAuth } from '../context/MetabaseAuthContext'
import { prepareTokenForAlias, clearClientTokenCache } from '../services/metabase'
import dynamic from "next/dynamic"
import { MainLayout } from "@/components/layout/MainLayout"

// Load the MetabaseProvider only on the client to avoid server-side access to `document`.
const MetabaseProvider = dynamic(
  () => import("@metabase/embedding-sdk-react").then((mod) => mod.MetabaseProvider),
  { ssr: false }
)

function ProviderMountLogger({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('[MetabaseProviderWrapper] MetabaseProvider mounted')
    return () => {
      // eslint-disable-next-line no-console
      console.log('[MetabaseProviderWrapper] MetabaseProvider unmounted')
    }
  }, [])

  return <>{children}</>
}

interface Props {
  children: React.ReactNode
  /** optional alias string appended to token request e.g. '2' */
  alias?: string
}

export default function MetabaseProviderWrapper({ children, alias: propAlias }: Props) {
  const metabaseUrl = process.env.NEXT_PUBLIC_METABASE_SITE_URL
  const { state, dispatch } = useMetabaseAuth()
  // prefer prop if given (backwards compat), otherwise use context alias
  const alias = propAlias ?? state.alias ?? undefined

  if (!metabaseUrl) {
    return (
      <div className="p-8 text-red-600">❌ NEXT_PUBLIC_METABASE_SITE_URL no configurada</div>
    )
  }

  const [providerReady, setProviderReady] = useState(!alias);
  const [fetchedJwt, setFetchedJwt] = useState<string | null>(null);
  const prevAliasRef = React.useRef<string | undefined | null>(undefined)

  // Build authConfig; we may fetch token and write it into localStorage before mounting provider
  const authConfig = useMemo(() => {
    const base = `/api/metabase/token`;
    const authProviderUri = alias ? `${base}?as=${encodeURIComponent(alias)}` : base;

    return {
      metabaseInstanceUrl: metabaseUrl,
      authProviderUri,
      fetchOptions: { credentials: "include" },
    } as any;
  }, [metabaseUrl, alias]);

  const providerInstanceKey = `${alias ?? 'anon'}-${state.providerKey}`

  useEffect(() => {
    // Debug log to verify which authProviderUri is being used
    // eslint-disable-next-line no-console
    console.log('[MetabaseProviderWrapper] authConfig:', { authConfig, alias, providerKey: state.providerKey });
  }, [authConfig, alias]);

  // When alias changes, reset provider readiness and handle clear/cleanup on alias removal
  useEffect(() => {
    const prev = prevAliasRef.current
    // if alias was present and now is cleared -> clear cache and bump provider key so SDK re-inits
    if (prev && !alias) {
      clearClientTokenCache()
      // bump context providerKey so any consumers remount the provider
      dispatch({ type: 'BUMP_KEY' })
    }

    // reset readiness: if we now have an alias we need to fetch+prepare before mounting
    setProviderReady(!alias)

    prevAliasRef.current = alias
  }, [alias, dispatch])

  useEffect(() => {
    // If an alias is supplied, fetch+prepare token via centralized service
    if (!alias) return

    let cancelled = false

    async function fetchAndPrepare() {
      // eslint-disable-next-line no-console
      console.log('[MetabaseProviderWrapper] starting prepareTokenForAlias for', alias)
      try {
        const jwt = await prepareTokenForAlias(String(alias))
        // eslint-disable-next-line no-console
        console.log('[MetabaseProviderWrapper] prepareTokenForAlias finished', { jwt })
        if (cancelled) return

        setFetchedJwt(jwt)

        // small delay to allow storage/cookie to settle
        setTimeout(() => {
          if (!cancelled) setProviderReady(true)
          // eslint-disable-next-line no-console
          console.log('[MetabaseProviderWrapper] providerReady set true')
        }, 50)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[MetabaseProviderWrapper] failed to prepare alias token', err)
        if (!cancelled) setProviderReady(true)
      }
    }

    fetchAndPrepare()

    return () => {
      cancelled = true
    }
  }, [alias]);

  if (!providerReady) {
    return (
      <div className="p-6">
        <div>Preparing Metabase session...</div>
        {fetchedJwt && (
          <div className="mt-2 text-xs text-gray-600">token preview: {String(fetchedJwt).slice(0, 20)}...</div>
        )}
      </div>
    );
  }

  return (
    // MetabaseProvider is dynamically imported and will only render on client-side
    // so it's safe to reference window/document inside the SDK implementation.
    <ProviderMountLogger>
      <MetabaseProvider key={providerInstanceKey} authConfig={authConfig}>
        <MainLayout>
          {children}
        </MainLayout>
      </MetabaseProvider>
    </ProviderMountLogger>
  )
}
