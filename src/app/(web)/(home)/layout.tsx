import Navbar from '@/modules/home/ui/components/navbar'
import Footer from '@/modules/home/ui/components/footer'
import { SearchFilters, SearchFiltersSkeleton } from './search-filters'
import ConfigPromise from '@payload-config'
import { getPayload } from 'payload'
import { getQueryClient, HydrateClient, trpc } from '@/trpc/server'
import { Suspense } from 'react'
import '../globals.css'

interface Props {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: ConfigPromise,
  })

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions())

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrateClient>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrateClient>
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  )
}
export default Layout
