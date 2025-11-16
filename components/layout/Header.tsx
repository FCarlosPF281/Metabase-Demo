'use client'

import { Search, Bell, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import * as Tooltip from '@radix-ui/react-tooltip'

export function Header() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [activeTab, setActiveTab] = useState<'Products' | 'Alerts'>('Products')
  const [session, setSession] = useState<{
    authenticated: boolean
    user?: { id: number; email: string; firstName: string; lastName: string }
  } | null>(null)

  useEffect(() => {
    let mounted = true

    async function check() {
      try {
        const res = await fetch('/api/auth/status', { credentials: 'include' })
        if (!mounted) return

        if (res.ok) {
          const data = await res.json()
          setSession(data)
        } else {
          setSession({ authenticated: false })
        }
      } catch (err) {
        console.error('Error fetching auth status', err)
        setSession({ authenticated: false })
      }
    }

    check()
    return () => { mounted = false }
  }, [])

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
      setSession({ authenticated: false })
      router.refresh()
      router.push('/login')
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200 bg-gray flex items-center justify-between px-6 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-10">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
          <Image src="/images/logo.png" alt="inControl logo" width={120} height={60} priority />
        </div>

        {/* Tabs */}
        <nav className="flex items-center gap-8">
          {['Products', 'Alerts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'Products' | 'Alerts')}
              className={`
                font-medium pb-1
                ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}
              `}
            >
              {tab}
            </button>
          ))}

          {/* Reemplazado por Link */}
          <Link href="/collections" className="font-medium pb-1 text-gray-600 hover:text-gray-800">
            Collections
          </Link>
        </nav>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-lg mx-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Fees Reports & Dashboards"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 text-sm text-gray-700">
          <span>File Sharing</span>
        </button>

        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {session && session.authenticated ? (
          <>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button className="p-2 hover:bg-gray-100 rounded-full border border-gray-200">
                    <User className="w-5 h-5 text-gray-600" />
                  </button>
                </Tooltip.Trigger>

                <Tooltip.Content side="bottom" className="bg-gray-800 text-white text-sm px-3 py-2 rounded">
                  {session.user?.firstName ?? session.user?.email}
                  <Tooltip.Arrow className="fill-gray-800" />
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>

            <button onClick={handleLogout} className="ml-4 text-sm text-red-600 hover:underline">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="ml-4 text-sm text-blue-600 hover:underline">
            Login
          </Link>
        )}
      </div>
    </header>
  )
}
