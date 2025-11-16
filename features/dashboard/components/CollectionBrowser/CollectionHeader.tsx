'use client';

import { ChevronLeft } from 'lucide-react';
import { CreateMenu } from './CreateMenu';

interface CollectionHeaderProps {
  currentCollectionTitle: string;
  historyStackLength: number;
  onGoBack: () => void;
  onCreateDashboard: () => void;
  onCreateQuestion: () => void;
}

export function CollectionHeader({
  currentCollectionTitle,
  historyStackLength,
  onGoBack,
  onCreateDashboard,
  onCreateQuestion,
}: CollectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
        Explorar colecciones
      </h3>
      <div className="flex items-center gap-3">
        {historyStackLength > 0 && (
          <button
            onClick={onGoBack}
            className="text-sm text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Volver</span>
          </button>
        )}
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-gray-100 dark:bg-zinc-700 px-3 py-1 rounded-full">
          {currentCollectionTitle}
        </span>

        <CreateMenu
          onCreateDashboard={onCreateDashboard}
          onCreateQuestion={onCreateQuestion}
        />
      </div>
    </div>
  );
}
