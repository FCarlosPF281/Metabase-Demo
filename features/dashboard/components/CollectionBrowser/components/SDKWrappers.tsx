'use client'

import { memo } from 'react'
import { ClientOnly } from '../../ClientOnly'
import dynamic from 'next/dynamic'


const MetabaseEditableDashboard = dynamic(
  () => import('@metabase/embedding-sdk-react').then(mod => mod.EditableDashboard),
  { ssr: false }
)

const MetabaseInteractiveQuestion = dynamic(
  () => import('@metabase/embedding-sdk-react').then(mod => mod.InteractiveQuestion),
  { ssr: false }
)
export const EditableDashboard = memo(function EditableDashboard({ dashboardId, ...rest }: { dashboardId: number } & any) {
  return (
    <ClientOnly>
      <MetabaseEditableDashboard dashboardId={dashboardId} {...rest} />
    </ClientOnly>
  )
}, (a, b) => a.dashboardId === b.dashboardId)

const BackButton = dynamic(
  () => import('@metabase/embedding-sdk-react').then(mod => mod.InteractiveQuestion.BackButton),
  { ssr: false }
)

const Title = dynamic(
  () => import('@metabase/embedding-sdk-react').then(mod => mod.InteractiveQuestion.Title),
  { ssr: false }
)

const ResetButton = dynamic(
  () => import('@metabase/embedding-sdk-react').then(mod => mod.InteractiveQuestion.ResetButton),
  { ssr: false }
)

const SaveButton = dynamic(
  () => import('@metabase/embedding-sdk-react').then(mod => mod.InteractiveQuestion.SaveButton),
  { ssr: false }
)

const FilterDropdown = dynamic(
  () => import('@metabase/embedding-sdk-react').then(mod => mod.InteractiveQuestion.FilterDropdown),
  { ssr: false }
)

const BreakoutDropdown = dynamic(
  () => import('@metabase/embedding-sdk-react').then(mod => mod.InteractiveQuestion.BreakoutDropdown),
  { ssr: false }
)

const SummarizeDropdown = dynamic(
  () => import('@metabase/embedding-sdk-react').then(mod => mod.InteractiveQuestion.SummarizeDropdown),
  { ssr: false }
)

const EditorButton = dynamic(
  () => import('@metabase/embedding-sdk-react').then(mod => mod.InteractiveQuestion.EditorButton),
  { ssr: false }
)

const QuestionVisualization = dynamic(
  () => import('@metabase/embedding-sdk-react').then(mod => mod.InteractiveQuestion.QuestionVisualization),
  { ssr: false }
)

const ChartTypeDropdown = dynamic(
  () => import('@metabase/embedding-sdk-react').then(mod => mod.InteractiveQuestion.ChartTypeDropdown),
  { ssr: false }
)

const QuestionSettingsDropdown = dynamic(
  () => import('@metabase/embedding-sdk-react').then(mod => mod.InteractiveQuestion.QuestionSettingsDropdown),
  { ssr: false }
)

const DownloadWidgetDropdown = dynamic(
  () => import('@metabase/embedding-sdk-react').then(mod => mod.InteractiveQuestion.DownloadWidgetDropdown),
  { ssr: false }
)


export const InteractiveQuestion = memo(function InteractiveQuestion({ questionId, ...rest }: { questionId: number } & any) {
  return (
    <ClientOnly>
      <div className="flex flex-col gap-6 p-6 border rounded-xl shadow-2xl bg-white">
        <MetabaseInteractiveQuestion questionId={questionId} {...rest}>

          <div className="flex items-center justify-between p-3 border-b bg-gray-50 rounded-t-lg">
            <div className="flex items-center gap-3">
              <BackButton />
              <Title />
            </div>
            <div className="flex items-center gap-2">
              <ResetButton />
              <SaveButton />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 p-4 border-b">
            <FilterDropdown />
            <BreakoutDropdown />
            <SummarizeDropdown />
            <EditorButton />
          </div>

          <div className="p-4 flex-grow min-h-[300px]">
            <QuestionVisualization />
          </div>

          <div className="flex items-center justify-end gap-3 p-3 border-t bg-gray-50 rounded-b-lg">
            <ChartTypeDropdown />
            <QuestionSettingsDropdown />
            <DownloadWidgetDropdown />
          </div>

        </MetabaseInteractiveQuestion>
      </div>
    </ClientOnly>
  )
}, (a, b) => a.questionId === b.questionId)

EditableDashboard.displayName = 'MemoEditableDashboard'
InteractiveQuestion.displayName = 'MemoInteractiveQuestion'
