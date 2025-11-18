'use client';

import { X, BarChart3 } from 'lucide-react';
import { useMemo } from 'react';
import { QuestionEditor } from '../components';

interface CreateQuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (question: any) => void;
    currentCollectionId: number | 'root' | 'personal' | string;
}

export function CreateQuestionModal({
    isOpen,
    onClose,
    onSave,
    currentCollectionId,
}: CreateQuestionModalProps) {
    // Memoizar el callback para evitar re-renders innecesarios del QuestionEditor
    const handleSave = useMemo(() => onSave, [onSave]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 top-16 left-64 right-0 bottom-0 overflow-auto p-12 backdrop-blur-sm ">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full h-[90vh] max-w-5xl overflow-hidden flex flex-col border border-gray-200 dark:border-zinc-700">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-700 shrink-0 bg-linear-to-r from-purple-50 to-blue-50 dark:from-zinc-700 dark:to-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                                Create Question
                            </h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Build a custom question
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-600 rounded-lg transition text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-1 overflow-hidden bg-white dark:bg-zinc-900">
                    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                        <QuestionEditor
                            currentCollectionId={currentCollectionId}
                            onSave={handleSave}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
