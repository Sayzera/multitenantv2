import type { SearchParams } from 'nuqs/server'

import { getQueryClient, trpc } from '@/trpc/server'
import { loadProductFilters } from '@/modules/products/searchParams'
import { ProductListView } from '@/modules/products/view/product-list-view'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { DEFAULT_LIMIT } from '@/constants'

interface Props {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<SearchParams>
}
const Page = async ({ params, searchParams }: Props) => {
  const { slug } = await params
  const filters = await loadProductFilters(searchParams)

  console.log(searchParams, 'qweqw')

  // Veriyi önceden çağırır ve cachler
  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      tenantSlug: slug,
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
