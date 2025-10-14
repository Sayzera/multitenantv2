import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ProductView } from '@/modules/products/view/product-view'
import { getQueryClient, trpc } from '@/trpc/server'

interface Props {
  params: Promise<{ productId: string; slug: string }>
}

export default async function Page({ params }: Props) {
  const { slug, productId } = await params
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    }),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductView tenantSlug={slug} productId={productId} />
    </HydrationBoundary>
  )
}
