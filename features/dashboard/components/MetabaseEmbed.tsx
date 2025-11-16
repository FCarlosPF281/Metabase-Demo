'use client'

import { 
  MetabaseProvider, 
  EditableDashboard 
} from '@metabase/embedding-sdk-react'
import { useEffect, useState } from 'react'

interface MetabaseEmbedProps {
  dashboardId: number
  questionId?: number
}

export default function MetabaseEmbed({ dashboardId, questionId }: MetabaseEmbedProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const metabaseUrl = process.env.NEXT_PUBLIC_METABASE_SITE_URL

  useEffect(() => {
    async function login() {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "raifhu@intelica.com",
            password: "123456",
          }),
          credentials: "include", // 👈 CRÍTICO: Permite enviar/recibir cookies
        })

        if (res.ok) {
          const data = await res.json()
          console.log("✅ Sesión iniciada:", data.user)
          setIsAuthenticated(true)
        } else {
          console.error("❌ Login falló:", await res.text())
        }
      } catch (error) {
        console.error("❌ Error en login:", error)
      } finally {
        setIsLoading(false)
      }
    }

    login()
  }, [])

  if (!metabaseUrl) {
    return (
      <div className="p-8 text-red-600">
        ❌ NEXT_PUBLIC_METABASE_SITE_URL no configurada
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-zinc-600">Autenticando...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="p-8 text-center text-red-600">
        ❌ Error de autenticación. Por favor recarga la página.
      </div>
    )
  }

  return (
    <MetabaseProvider
      authConfig={{
        metabaseInstanceUrl: metabaseUrl,
        authProviderUri: `/api/metabase/token`,
        fetchOptions: {
          credentials: "include", // 👈 CRÍTICO: Envía cookies en cada request
        },
      }}
    >
      <EditableDashboard
        withTitle={false}
        withDownloads={true}
        dashboardId={dashboardId}
        className="rounded-2xl overflow-hidden dark:bg-zinc-800"
      />
    </MetabaseProvider>
  )
}