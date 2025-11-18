'use client';

import { CreateDashboardModal as MetabaseCreateDashboardModal } from '@metabase/embedding-sdk-react';
import { ClientOnly } from '../../ClientOnly'

interface CreateDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (dashboard: any) => void;
  initialCollectionId: number | 'root' | 'personal';
}

export function CreateDashboardModal({
  isOpen,
  onClose,
  onCreate,
  initialCollectionId,
}: CreateDashboardModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm ">
      <ClientOnly>
        <MetabaseCreateDashboardModal
          isOpen={isOpen}
          onClose={onClose}
          onCreate={onCreate}
          initialCollectionId={initialCollectionId}
        />
      </ClientOnly>
    </div>
  );
}
