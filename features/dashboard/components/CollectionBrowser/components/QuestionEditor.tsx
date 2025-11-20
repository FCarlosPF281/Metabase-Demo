'use client';

import dynamic from 'next/dynamic';
import { memo } from 'react';
import { ClientOnly } from '../../ClientOnly';

interface QuestionEditorProps {
  currentCollectionId: number | 'root' | 'personal' | string;
  onSave: (question: any) => void;
}

// 🔹 Import dinámico de InteractiveQuestion solo en cliente
const MetabaseInteractiveQuestion = dynamic(
  async () => {
    const mod = await import('@metabase/embedding-sdk-react');
    return mod.InteractiveQuestion;
  },
  { ssr: false }
);

/**
 * Componente envolvente para InteractiveQuestion que evita warnings de ciclo de vida
 * Usa memo para prevenir re-renders innecesarios que causen UNSAFE_componentWillReceiveProps
 */
export const QuestionEditor = memo(
  function QuestionEditor({ currentCollectionId, onSave }: QuestionEditorProps) {
    return (
      <ClientOnly>
        <MetabaseInteractiveQuestion
          questionId="new"
          targetCollection={currentCollectionId}
          isSaveEnabled={true}
          onSave={onSave}
        />
      </ClientOnly>
    );
  },
  (prevProps, nextProps) => {
    // Retorna true si los props son iguales (no re-renderizar)
    return (
      prevProps.currentCollectionId === nextProps.currentCollectionId &&
      prevProps.onSave === nextProps.onSave
    );
  }
);

QuestionEditor.displayName = 'QuestionEditor';
