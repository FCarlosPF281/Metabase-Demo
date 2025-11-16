'use client';

import { useState, useCallback } from 'react';
import { CollectionBrowser } from '@metabase/embedding-sdk-react';
import { SelectedItemView } from './SelectedItemView';
import { CollectionHeader } from './CollectionHeader';
import { CreateDashboardModal, CreateQuestionModal } from './modals';
import { useCollectionNavigation, useCollectionModals } from './hooks';
import { SelectedItem } from './types';

export default function MetabaseCollectionBrowser() {
  const [selected, setSelected] = useState<SelectedItem | null>(null);

  const {
    currentCollectionId,
    currentCollectionTitle,
    historyStack,
    enterCollection,
    goBack,
  } = useCollectionNavigation();

  const {
    isCreateDashboardOpen,
    isCreateQuestionOpen,
    isModalOpen,
    openCreateDashboard,
    closeCreateDashboard,
    openCreateQuestion,
    closeCreateQuestion,
    closeAllModals,
    handleDashboardCreated,
    handleQuestionCreated,
    refreshKey,
  } = useCollectionModals();

  const handleCollectionItemClick = useCallback(
    (item: any) => {
      if (!item) return;

      if (item?.model === 'collection') {
        enterCollection(item);
        return;
      }

      if (item?.model === 'dashboard' || item?.model === 'card') {
        setSelected(item as SelectedItem);
      }
    },
    [enterCollection]
  );

  const handleBackFromSelected = useCallback(() => {
    setSelected(null);
  }, []);

  // Si hay un item seleccionado, mostrar su vista
  if (selected) {
    return <SelectedItemView item={selected} onBack={handleBackFromSelected} />;
  }

  // Vista principal de colecciones
  return (
    <>
      {/* Overlay oscuro cuando hay modal abierto */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-45" onClick={closeAllModals} />
      )}

      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-6">
        <CollectionHeader
          currentCollectionTitle={currentCollectionTitle}
          historyStackLength={historyStack.length}
          onGoBack={goBack}
          onCreateDashboard={openCreateDashboard}
          onCreateQuestion={openCreateQuestion}
        />

        <CollectionBrowser
          key={refreshKey}
          collectionId={currentCollectionId}
          pageSize={8}
          visibleEntityTypes={['dashboard', 'question', 'collection']}
          className="rounded-xl border border-gray-200 dark:border-zinc-700"
          onClick={handleCollectionItemClick}
        />

        {/* Modales */}
        <CreateDashboardModal
          isOpen={isCreateDashboardOpen}
          onClose={closeCreateDashboard}
          onCreate={handleDashboardCreated}
          initialCollectionId={currentCollectionId}
        />

        <CreateQuestionModal
          isOpen={isCreateQuestionOpen}
          onClose={closeCreateQuestion}
          onSave={handleQuestionCreated}
          currentCollectionId={currentCollectionId}
        />
      </div>
    </>
  );
}
