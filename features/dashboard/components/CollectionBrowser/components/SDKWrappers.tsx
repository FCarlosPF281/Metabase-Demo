'use client'

import { EditableDashboard as MetabaseEditableDashboard, InteractiveQuestion as MetabaseInteractiveQuestion } from '@metabase/embedding-sdk-react'
import { memo } from 'react'
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

      <div className="flex flex-col gap-6 p-6 border rounded-xl shadow-2xl bg-white">

        {/* 🧩 Contenedor Principal de la Pregunta de Metabase */}
        {/* Este componente (MetabaseInteractiveQuestion) debe ser el SdkQuestionProvider */}
        <MetabaseInteractiveQuestion
          questionId={questionId}
          {...rest}
        >
          {/* ---------------------------------------------------- */}
          {/* 🧭 Barra Superior: Título, Navegación y Acciones */}
          {/* ---------------------------------------------------- */}
          <div className="flex items-center justify-between p-3 border-b bg-gray-50 rounded-t-lg">
            <div className="flex items-center gap-3">
              <MetabaseInteractiveQuestion.BackButton />
              <MetabaseInteractiveQuestion.Title />
            </div>
            <div className="flex items-center gap-2">
              <MetabaseInteractiveQuestion.ResetButton />
              <MetabaseInteractiveQuestion.SaveButton />
            </div>
          </div>

          {/* ⚙️ Barra de Herramientas Principal (Filtros, Editor, etc.) */}
          <div className="flex flex-wrap gap-4 p-4 border-b">

            {/* 🔽 Filtros, Agrupación y Agregación */}
            <MetabaseInteractiveQuestion.FilterDropdown />
            <MetabaseInteractiveQuestion.BreakoutDropdown />
            <MetabaseInteractiveQuestion.SummarizeDropdown />

            {/* 📝 Botón de Editor/Notebook */}
            <MetabaseInteractiveQuestion.EditorButton />
          </div>

          {/* 🖼️ Área de Visualización (Donde se muestra la gráfica o tabla) */}
          {/* Este es el componente que renderiza el resultado de la consulta. */}
          <div className="p-4 flex-grow min-h-[300px]">
            <MetabaseInteractiveQuestion.QuestionVisualization />
          </div>

          {/* ⬇️ Pie de página: Configuración y Descarga */}
          <div className="flex items-center justify-end gap-3 p-3 border-t bg-gray-50 rounded-b-lg">

            {/* Selector de Tipo de Gráfico */}
            <MetabaseInteractiveQuestion.ChartTypeDropdown />

            {/* Configuración de la Pregunta (Ejes, Colores) */}
            <MetabaseInteractiveQuestion.QuestionSettingsDropdown />

            <MetabaseInteractiveQuestion.DownloadWidgetDropdown />
            {/* O usa el botón simple: <MetabaseInteractiveQuestion.DownloadWidget /> */}
          </div>

          {/* 📝 Contenido Adicional (como un Editor que puede ser un modal o un panel) */}
          {/* Si el editor se abre en línea, lo renderizarías aquí: */}
          {/* <MetabaseInteractiveQuestion.Editor /> */}

          {/* Formulario de Guardado (a menudo es un modal que se renderiza condicionalmente) */}
          {/* <MetabaseInteractiveQuestion.SaveQuestionForm /> */}

        </MetabaseInteractiveQuestion>

      </div>
    </ClientOnly>
  )
}, (a, b) => a.questionId === b.questionId)

EditableDashboard.displayName = 'MemoEditableDashboard'
InteractiveQuestion.displayName = 'MemoInteractiveQuestion'
