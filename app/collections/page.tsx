import MetabaseCollectionBrowser from "../../features/dashboard/components/CollectionBrowser"
import MetabaseProviderWrapper from "../../features/dashboard/components/MetabaseProviderWrapper"

export const metadata = {
  title: "Collections - inControl",
}

export default function CollectionsPage() {
  return (
    <MetabaseProviderWrapper>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 fixed top-16 left-64 right-0 bottom-0 overflow-auto p-12">
        <div className="max-w-6xl mx-auto p-12">
          <MetabaseCollectionBrowser />
        </div>
      </div>
    </MetabaseProviderWrapper>
  )
}
