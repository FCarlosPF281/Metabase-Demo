"use client"

import MetabaseCollectionBrowser from "../../features/dashboard/components/CollectionBrowser"
import MetabaseProviderWrapper from "../../features/dashboard/components/MetabaseProviderWrapper"
import { useState, useCallback, useEffect } from 'react'
import { useMetabaseAuth } from '../../features/dashboard/context/MetabaseAuthContext'
import { prepareTokenForAlias, clearClientTokenCache, decodeJwtPayload } from '../../features/dashboard/services/metabase'

export default function CollectionsPage() {
  // For collections we request the metabase token using the alias '2'
  // so that users with an alternate account (e.g. raifhu2) are used when
  // embedding Metabase on the Collections page.
  const [providerKey, setProviderKey] = useState(0)
  const { dispatch } = useMetabaseAuth()

  useEffect(() => {
    // set context alias to '2' for collections
    dispatch({ type: 'SET_ALIAS', alias: '2' })
    return () => {
      // clear alias on unmount
      dispatch({ type: 'SET_ALIAS', alias: null })
    }
  }, [dispatch])

  const refreshProvider = useCallback(async () => {
    // Use central service to clear cache, prepare token and log the result
    clearClientTokenCache()

    try {
      const jwt = await prepareTokenForAlias('2', 'collections-refresh')
      // eslint-disable-next-line no-console
      console.log('[collections page] token response', { jwt })
      const decoded = decodeJwtPayload(jwt)
      // eslint-disable-next-line no-console
      console.log('[collections page] decoded token payload', decoded)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[collections page] error preparing token', err)
    } finally {
      // remount provider regardless
      setProviderKey((s) => s + 1)
    }
  }, [])

  return (
    <MetabaseProviderWrapper key={providerKey}>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 fixed top-16 left-64 right-0 bottom-0 overflow-auto p-12">
        <div className="max-w-6xl mx-auto p-12">
          <div className="flex items-center justify-end mb-4 gap-3">
            {/* <button
              onClick={refreshProvider}
              className="px-3 py-2 rounded bg-blue-600 text-white text-sm"
            >
              Forzar refresh token (alias=2)
            </button> */}
          </div>
          <MetabaseCollectionBrowser />
        </div>
      </div>
    </MetabaseProviderWrapper>
  )
}
