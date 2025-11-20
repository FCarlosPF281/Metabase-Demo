"use client"

import MetabaseCollectionBrowser from "../../features/dashboard/components/CollectionBrowser"
import MetabaseProviderWrapper from "../../features/dashboard/components/MetabaseProviderWrapper"
import { useState,  useEffect } from 'react'
import { useMetabaseAuth } from '../../features/dashboard/context/MetabaseAuthContext'

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



  return (
    <MetabaseProviderWrapper key={providerKey}>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 fixed top-16 left-64 right-0 bottom-0 overflow-auto p-12">
        <div className="max-w-6xl mx-auto p-12">
          <MetabaseCollectionBrowser />
        </div>
      </div>
    </MetabaseProviderWrapper>
  )
}
