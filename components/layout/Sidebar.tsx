'use client';

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
    ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface MenuItem {
    icon: React.ReactNode;
    label: string;
    href?: string;
    blocked?: boolean; // 🔹 nuevo
    children?: MenuItem[];
    active?: boolean;
}

export function Sidebar() {
    // 🔹 Saving Opportunities YA NO inicia expandido
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const menuItems: MenuItem[] = [
        // ✔️ ÚNICO QUE NAVEGA
        { icon: <LayoutDashboard size={20} />, label: 'Fee Manager', href: '/' },

        // 🔒 Bloqueados
        { icon: <FileText size={20} />, label: 'Incontrol Panel', blocked: true },
        { icon: <BookOpen size={20} />, label: 'Fee Library', blocked: true },
        { icon: <BarChart3 size={20} />, label: 'Analytics & Reports', blocked: true },

        // 🔒 Saving Opportunities sin expandir por defecto
        {
            icon: <PiggyBank size={20} />,
            label: 'Saving Opportunities',
            blocked: true,
            children: [
                { icon: <ShieldCheck size={18} />, label: 'Data integrity', blocked: true },
                { icon: <CheckCircle size={18} />, label: 'Visa Mar', blocked: true },
                { icon: <Settings size={18} />, label: 'TPE', blocked: true },
                { icon: <Settings size={18} />, label: 'Opt Outs', blocked: true, active: true },
            ],
        },

        // 🔒 Más bloqueados
        { icon: <ShieldCheck size={20} />, label: 'Fee Validation', blocked: true },
        { icon: <Book size={20} />, label: 'Resources', blocked: true },
        { icon: <Star size={20} />, label: 'Favorites', blocked: true },
    ];

    const toggleExpand = (label: string, blocked?: boolean) => {
        if (blocked) return; // 🔒 Evita expandir si está bloqueado

        setExpandedItems((prev) =>
            prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
        );
    };

    const renderMenuItem = (item: MenuItem, level = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.includes(item.label);
        const isActive = item.active;
        const isBlocked = item.blocked;

        const Wrapper: React.ElementType = item.href && !isBlocked ? Link : 'button';
        const wrapperProps =
            item.href && !isBlocked
                ? { href: item.href }
                : { type: 'button', onClick: () => toggleExpand(item.label, isBlocked) };

        return (
            <div key={item.label} className="relative">
                {level > 0 && (
                    <>
                        <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-300" />
                        <div
                            className="absolute left-5 top-1/2 w-8 h-8 transform -translate-y-full
                                    border-l border-b rounded-bl-lg border-gray-300 bg-white"
                        />
                    </>
                )}

                <Wrapper
                    {...wrapperProps}
                    className={`
                    w-full flex items-center gap-3 py-3 text-left transition-colors relative z-10
                    ${level === 0 ? 'px-4 hover:bg-blue-50' : 'pl-12 hover:bg-blue-50'}
                    ${isActive ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-700'}
                    ${isBlocked ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                >
                    <span className={`shrink-0 ${isActive ? 'text-white' : 'text-gray-600'}`}>
                        {item.icon}
                    </span>

                    <span className="flex-1 font-medium">{item.label}</span>

                    {hasChildren && (
                        <span className={`mr-4 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </span>
                    )}
                </Wrapper>

                {hasChildren && isExpanded && (
                    <div className="bg-white">
                        {item.children?.map((child) => renderMenuItem(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <aside
            className="
              fixed top-16 left-0 w-64 h-[calc(100vh-4rem)]
              bg-incontrol border-r border-gray-200
              flex flex-col shadow-sm
            "
        >
            <div
                className="
                  flex flex-col flex-1 h-full m-2 
                  rounded-xl bg-white border border-gray-200 shadow-md
                "
            >
                <nav className="flex-1 overflow-y-auto py-4">
                    {menuItems.map((item) => renderMenuItem(item))}
                </nav>

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
        </aside>
    );
}
