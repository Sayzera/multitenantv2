import { SearchParams } from 'nuqs/server'

import { DEFAULT_LIMIT } from '@/constants'
import { getQueryClient, HydrateClient, trpc } from '@/trpc/server'

import { ProductListView } from '@/modules/products/view/product-list-view'
import { loadProductFilters } from '@/modules/products/searchParams'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

interface Props {
  searchParams: Promise<SearchParams>
  params: Promise<{ slug: string }>
}

export default async function Page({ searchParams, params }: Props) {
  const { slug } = await params
  const filters = loadProductFilters(searchParams)

  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      tenantSlug: slug,
      limit: DEFAULT_LIMIT,
    }),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView tenantSlug={slug} />
    </HydrationBoundary>
  )
}
