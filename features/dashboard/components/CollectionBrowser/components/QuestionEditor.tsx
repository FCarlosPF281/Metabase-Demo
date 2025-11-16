'use client';

import { InteractiveQuestion as MetabaseInteractiveQuestion } from '@metabase/embedding-sdk-react';
import { memo } from 'react';

interface QuestionEditorProps {
  currentCollectionId: number | 'root' | 'personal' | string;
  onSave: (question: any) => void;
}

/**
 * Componente envolvente para InteractiveQuestion que evita warnings de ciclo de vida
 * Usa memo para prevenir re-renders innecesarios que causen UNSAFE_componentWillReceiveProps
 */
export const QuestionEditor = memo(
  function QuestionEditor({ currentCollectionId, onSave }: QuestionEditorProps) {
    return (
      <MetabaseInteractiveQuestion
        questionId="new"
        targetCollection={currentCollectionId}
        isSaveEnabled={true}
        onSave={onSave}
      />
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
