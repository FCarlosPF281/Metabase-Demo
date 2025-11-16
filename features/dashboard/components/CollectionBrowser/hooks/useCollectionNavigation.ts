'use client';

import { useState, useCallback } from 'react';
import { CollectionHistoryItem, MetabaseItem } from '../types';

interface UseCollectionNavigationReturn {
    currentCollectionId: number | 'root' | 'personal';
    currentCollectionTitle: string;
    historyStack: CollectionHistoryItem[];
    enterCollection: (item: MetabaseItem) => void;
    goBack: () => void;
}

export function useCollectionNavigation(): UseCollectionNavigationReturn {
    const [currentCollectionId, setCurrentCollectionId] = useState<number | 'root' | 'personal'>(
        'root'
    );
    const [currentCollectionTitle, setCurrentCollectionTitle] = useState<string>('Root');
    const [historyStack, setHistoryStack] = useState<CollectionHistoryItem[]>([]);

    const enterCollection = useCallback(
        (item: MetabaseItem) => {
            setHistoryStack((prev) => [
                ...prev,
                { id: currentCollectionId, title: currentCollectionTitle },
            ]);
            setCurrentCollectionId(
                typeof item.id === 'number' || item.id === 'root' || item.id === 'personal'
                    ? item.id
                    : 'root'
            );
            setCurrentCollectionTitle(
                item.name || item.title || item.display_name || `#${item.id}`
            );
        },
        [currentCollectionId, currentCollectionTitle]
    );

    const goBack = useCallback(() => {
        setHistoryStack((prev) => {
            const copy = [...prev];
            const last = copy.pop();
            if (last) {
                if (typeof last.id === 'number' || last.id === 'root' || last.id === 'personal') {
                    setCurrentCollectionId(last.id);
                }
                setCurrentCollectionTitle(last.title);
            } else {
                setCurrentCollectionId('root');
                setCurrentCollectionTitle('Root');
            }
            return copy;
        });
    }, []);

    return {
        currentCollectionId,
        currentCollectionTitle,
        historyStack,
        enterCollection,
        goBack,
    };
}
