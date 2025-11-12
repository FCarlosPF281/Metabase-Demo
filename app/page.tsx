import { MetabaseDashboard } from '@/features/dashboard/components/MetabaseDashboard'

export default function Home() {
    return (
      <div className="p-6 ml-64 y mt-16 ">
        <h1 className="text-2xl font-semibold text-gray-800 ">Hola 👋</h1>
        <MetabaseDashboard dashboardId={74} /> {/* Cambia 123 por tu dashboard ID real */}

      </div>
    )
  }
  