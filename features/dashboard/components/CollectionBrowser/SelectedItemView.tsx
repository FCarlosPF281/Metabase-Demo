'use client';

import { EditableDashboard, InteractiveQuestion } from './components/SDKWrappers';
import { ChevronLeft } from 'lucide-react';
import { SelectedItem } from './types';

interface SelectedItemViewProps {
  item: SelectedItem;
  onBack: () => void;
}

export function SelectedItemView({ item, onBack }: SelectedItemViewProps) {
  const title = item.name || item.title || item.display_name || `#${item.id}`;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-4 ">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white"
          aria-label="Volver a colecciones"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>
        <h3 className="text-lg font-semibold flex-1 text-center">{title}</h3>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-zinc-700 overflow-hidden">
        {item.model === 'dashboard' && <EditableDashboard dashboardId={item.id} />}

        {item.model === 'card' && <InteractiveQuestion questionId={item.id} />}
      </div>
    </div>
  );
}
