'use client';

import { useState, useCallback } from 'react';

interface UseCollectionModalsReturn {
  isCreateDashboardOpen: boolean;
  isCreateQuestionOpen: boolean;
  isModalOpen: boolean;
  openCreateDashboard: () => void;
  closeCreateDashboard: () => void;
  openCreateQuestion: () => void;
  closeCreateQuestion: () => void;
  closeAllModals: () => void;
  handleDashboardCreated: (dashboard: any) => void;
  handleQuestionCreated: (question: any) => void;
  refreshKey: number;
}

export function useCollectionModals(): UseCollectionModalsReturn {
  const [isCreateDashboardOpen, setIsCreateDashboardOpen] = useState(false);
  const [isCreateQuestionOpen, setIsCreateQuestionOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const isModalOpen = isCreateDashboardOpen || isCreateQuestionOpen;

  const openCreateDashboard = useCallback(() => {
    setIsCreateDashboardOpen(true);
  }, []);

  const closeCreateDashboard = useCallback(() => {
    setIsCreateDashboardOpen(false);
  }, []);

  const openCreateQuestion = useCallback(() => {
    setIsCreateQuestionOpen(true);
  }, []);

  const closeCreateQuestion = useCallback(() => {
    setIsCreateQuestionOpen(false);
  }, []);

  const closeAllModals = useCallback(() => {
    setIsCreateDashboardOpen(false);
    setIsCreateQuestionOpen(false);
  }, []);

  const handleDashboardCreated = useCallback((dashboard: any) => {
    setRefreshKey((prev) => prev + 1);
    setIsCreateDashboardOpen(false);
  }, []);

  const handleQuestionCreated = useCallback((question: any) => {
    setRefreshKey((prev) => prev + 1);
    setIsCreateQuestionOpen(false);
  }, []);

  return {
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
  };
}
