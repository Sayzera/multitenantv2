import type { SearchParams } from 'nuqs/server'

import { getQueryClient, trpc } from '@/trpc/server'
import { loadProductFilters } from '@/modules/products/searchParams'
import { ProductListView } from '@/modules/products/view/product-list-view'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { DEFAULT_LIMIT } from '@/constants'

interface Props {
  searchParams: Promise<SearchParams>
}
const Page = async ({ searchParams }: Props) => {
  // Buradaki endpointe geldiğinde çalışır client taraflı tetiklenmez
  const filters = await loadProductFilters(searchParams)

  // Veriyi önceden çağırır ve cachler
  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_LIMIT,
    }),
  )

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductListView />
      </HydrationBoundary>
    </>
  )
}

export default Page
