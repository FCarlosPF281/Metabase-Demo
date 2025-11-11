'use client'

import { Search, Bell, User, CalendarDays, Filter } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export function Header() {
  const [searchValue, setSearchValue] = useState('')
  const [activeTab, setActiveTab] = useState<'Products' | 'Alerts'>('Products')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200 bg-gray flex items-center justify-between px-6 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-10">
        {/* Logo */}
        <div className="flex items-center">
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

        <button className="p-2 hover:bg-gray-100 rounded-full border border-gray-200">
          <User className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </header>
  )
}
