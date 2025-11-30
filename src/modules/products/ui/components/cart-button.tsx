'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCart } from '@/modules/checkout/hooks/use-cart'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Props {
  tenantSlug: string
  productId: string
  isPurchased?: boolean
}

export const CartButton = ({ tenantSlug, productId, isPurchased }: Props) => {
  const cart = useCart(tenantSlug)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Prevent hydration mismatch by showing consistent state until mounted
  const isInCart = isMounted ? cart.isProductInCart(productId) : false

  if (isPurchased) {
    return (
      <Button variant={'elevated'} asChild className="flex-1 font-medium bg-white">
        <Link prefetch href={`/library/${productId}`}>
          View in Library
        </Link>
      </Button>
    )
  }

  return (
    <Button
      variant={'elevated'}
      className={cn('flex-1 bg-pink-400', isInCart && 'bg-white')}
      onClick={() => cart.toggleProduct(productId)}
    >
      {isInCart ? 'Remove from cart' : 'Add to cart'}
    </Button>
  )
}
