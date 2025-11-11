'use client'

import {
    LayoutDashboard,
    FileText,
    BookOpen,
    BarChart3,
    PiggyBank,
    ShieldCheck,
    CheckCircle,
    Book,
    Settings,
    Star,
    ChevronDown,
    ChevronRight
} from 'lucide-react'
import { useState } from 'react'

interface MenuItem {
    icon: React.ReactNode
    label: string
    href?: string
    children?: MenuItem[]
    active?: boolean
}

export function Sidebar() {
    const [expandedItems, setExpandedItems] = useState<string[]>(['Saving Opportunities'])

    const menuItems: MenuItem[] = [
        { icon: <LayoutDashboard size={20} />, label: 'Fee Manager', href: '/fee-manager' },
        { icon: <FileText size={20} />, label: 'Incontrol Panel', href: '/panel' },
        { icon: <BookOpen size={20} />, label: 'Fee Library', href: '/library' },
        { icon: <BarChart3 size={20} />, label: 'Analytics & Reports', href: '/analytics' },
        {
            icon: <PiggyBank size={20} />,
            label: 'Saving Opportunities',
            children: [
                { icon: <ShieldCheck size={18} />, label: 'Data integrity', href: '/savings/data-integrity' },
                { icon: <CheckCircle size={18} />, label: 'Visa Mar', href: '/savings/visa-mar' },
                { icon: <Settings size={18} />, label: 'TPE', href: '/savings/tpe' },
                { icon: <Settings size={18} />, label: 'Opt Outs', href: '/savings/opt-outs', active: true },
            ],
        },
        { icon: <ShieldCheck size={20} />, label: 'Fee Validation', href: '/validation' },
        { icon: <Book size={20} />, label: 'Resources', href: '/resources' },
        { icon: <Star size={20} />, label: 'Favorites', href: '/favorites' },
    ]

    const toggleExpand = (label: string) => {
        setExpandedItems((prev) =>
            prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
        )
    }

    const renderMenuItem = (item: MenuItem, level = 0) => {
        const hasChildren = item.children && item.children.length > 0
        const isExpanded = expandedItems.includes(item.label)
        const isActive = item.active

        // Define el color de las líneas
        const activeBorderColorClass = isActive ? 'border-blue-600' : 'border-gray-300';
        const activeColorClass = isActive ? 'bg-blue-600' : 'bg-gray-300'; // Solo para la línea vertical, si es necesario

        return (
            <div key={item.label} className="relative">
                {level > 0 && (
                    <>
                        {/* 1. Línea vertical principal (continua) */}
                        <div
                            className={`
                    absolute left-[20px] top-0 bottom-0 w-px ${activeColorClass}
                  `}
                        />

                        {/* 2. Elemento de Curva (El Codo y la "Ramita") */}
                        <div
                            className={`
                    absolute left-[20px] top-1/2 w-8 h-8 
                    transform -translate-y-full
                    border-l border-b rounded-bl-lg
                    ${activeBorderColorClass}
                    bg-white // Fondo blanco para que la curva sea visible
                  `}
                        />
                    </>
                )}

                <button
                    onClick={() => hasChildren && toggleExpand(item.label)}
                    className={`
                w-full flex items-center gap-3 py-3 text-left transition-colors relative z-10
                ${level === 0 ? 'px-4 hover:bg-blue-50' : 'pl-12 hover:bg-blue-50'} // Reducí el padding para acercar el texto
                ${isActive ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-700'}
              `}
                >
                    {/* El icono está bien alineado con el texto aquí */}
                    <span className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-600'}`}>
                        {item.icon}
                    </span>
                    <span className="flex-1 font-medium">{item.label}</span>
                    {hasChildren && (
                        <span className={`mr-4 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </span>
                    )}
                </button>

                {hasChildren && isExpanded && (
                    <div className="bg-white">
                        {item.children?.map((child) => renderMenuItem(child, level + 1))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <aside
            className="
          fixed
          top-16 left-0
          w-64
          h-[calc(100vh-4rem)]
          bg-incontrol
          border-r border-gray-200
          flex flex-col
          z-40
          shadow-sm
        "
        >
            {/* 🟢 NUEVO CONTENEDOR INTERIOR PARA EL EFECTO DE BORDEADO/ROUNDED 🟢 */}
            <div
                className="
            flex flex-col flex-1 h-full
            m-2 
            rounded-xl
            bg-white 
            border border-gray-200 
            shadow-md
          "
            >
                {/* Sidebar Navigation */}
                <nav className="flex-1 overflow-y-auto py-4">
                    {menuItems.map((item) => renderMenuItem(item))}
                </nav>

                {/* Last Update Section */}
                <div className="border-t border-gray-200 p-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">Last update</p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">V</span>
                            </div>
                            <span className="text-sm text-gray-600">15 Jun 2025</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-5 bg-orange-400 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">M</span>
                            </div>
                            <span className="text-sm text-gray-600">31 May 2025</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">A</span>
                            </div>
                            <span className="text-sm text-gray-600">28 May 2025</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* 🟢 FIN DEL CONTENEDOR INTERIOR 🟢 */}
        </aside>
    )
}
