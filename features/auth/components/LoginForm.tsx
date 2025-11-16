"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { X, AlertCircle } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showErrorDialog, setShowErrorDialog] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })

      if (!res.ok) {
        try {
          const jsonData = await res.json()
          setError(jsonData.error || "Credenciales inválidas")
        } catch {
          const text = await res.text()
          setError(text || "Credenciales inválidas")
        }
        setShowErrorDialog(true)
        return
      }

      // Success: backend sets cookie
      router.push('/')
      router.refresh()
    } catch (err) {
      setError("Error del servidor. Por favor, intenta más tarde.")
      setShowErrorDialog(true)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="w-full max-w-lg mx-auto bg-white dark:bg-zinc-800 p-12 rounded-3xl shadow-lg">
        <div className="flex justify-center mb-8">
          <Image src="/images/logo.png" alt="inControl logo" width={180} height={90} priority />
        </div>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-6 text-center text-zinc-900 dark:text-zinc-100">Iniciar sesión</h2>

          <label className="block mb-4">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block mb-6">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white dark:bg-zinc-700 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 transition-colors"
            disabled={loading}
          >
            {loading ? "Autenticando..." : "Entrar"}
          </button>
        </form>
      </div>

      <Dialog.Root open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl p-0 overflow-hidden">
            {/* Header con icono */}
            <div className="bg-linear-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 px-8 py-8 flex items-center justify-between border-b border-red-200 dark:border-red-800/30">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-3">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <Dialog.Title className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Error de autenticación
                </Dialog.Title>
              </div>
              <Dialog.Close asChild>
                <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </div>

            {/* Contenido */}
            <div className="px-8 py-6">
              <Dialog.Description className="text-sm text-zinc-700 dark:text-zinc-300 mb-4 font-medium">
                {error || "Ocurrió un error durante el inicio de sesión."}
              </Dialog.Description>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Por favor, verifica que tu email y contraseña sean correctos e intenta nuevamente.
              </p>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-700">
              <Dialog.Close asChild>
                <button className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Entendido
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
