'use client';

import { Plus, ChevronDown, LayoutDashboard, BarChart3 } from 'lucide-react';
import { useState } from 'react';

interface CreateMenuProps {
  onCreateDashboard: () => void;
  onCreateQuestion: () => void;
}

export function CreateMenu({ onCreateDashboard, onCreateQuestion }: CreateMenuProps) {
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowCreateMenu(!showCreateMenu)}
        className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-semibold transition shadow-md hover:shadow-lg"
        aria-label="Crear elemento"
      >
        <Plus className="w-4 h-4" />
        Create
        <ChevronDown className="w-3 h-3" />
      </button>

      {showCreateMenu && (
        <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-zinc-700 rounded-xl shadow-xl border border-gray-200 dark:border-zinc-600 z-10 overflow-hidden">
          <button
            onClick={() => {
              onCreateDashboard();
              setShowCreateMenu(false);
            }}
            className="w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition flex items-center gap-3 group"
          >
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition">
              <LayoutDashboard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="font-semibold text-zinc-900 dark:text-white text-sm">
                Dashboard
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                Create a dashboard
              </div>
            </div>
          </button>
          <button
            onClick={() => {
              onCreateQuestion();
              setShowCreateMenu(false);
            }}
            className="w-full text-left px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition flex items-center gap-3 group border-t border-gray-200 dark:border-zinc-600"
          >
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition">
              <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="font-semibold text-zinc-900 dark:text-white text-sm">
                Question
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                Create a question
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
