import { MetabaseDashboard } from '@/features/dashboard/components/MetabaseDashboard'

export default function Home() {

  

    return (
      <div className="fixed top-16 left-64 right-0 bottom-0 overflow-auto p-12">
        <MetabaseDashboard dashboardId={107} questionId={215}/> {/* Cambia 123 por tu dashboard ID real */}

      </div>
    )
  }
  