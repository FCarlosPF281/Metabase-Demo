'use client'

import { EditableDashboard as MetabaseEditableDashboard, InteractiveQuestion as MetabaseInteractiveQuestion } from '@metabase/embedding-sdk-react'
import React, { memo } from 'react'
import { ClientOnly } from '../../ClientOnly'

export const EditableDashboard = memo(function EditableDashboard({ dashboardId, ...rest }: { dashboardId: number } & any) {
  return (
    <ClientOnly>
      <MetabaseEditableDashboard dashboardId={dashboardId} {...rest} />
    </ClientOnly>
  )
}, (a, b) => a.dashboardId === b.dashboardId)

export const InteractiveQuestion = memo(function InteractiveQuestion({ questionId, ...rest }: { questionId: number } & any) {
  return (
    <ClientOnly>
      <MetabaseInteractiveQuestion questionId={questionId} {...rest} />
    </ClientOnly>
  )
}, (a, b) => a.questionId === b.questionId)

EditableDashboard.displayName = 'MemoEditableDashboard'
InteractiveQuestion.displayName = 'MemoInteractiveQuestion'
