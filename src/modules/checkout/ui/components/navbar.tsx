'use client'
import { Button } from '@/components/ui/button'
import { generateTenantURL } from '@/lib/utils'
import { ShoppingCartIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

interface Props {
  slug: string
}

const CheckoutButton = dynamic(
  () =>
    import('@/modules/checkout/ui/components/checkout-button').then((mod) => mod.CheckoutButton),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="bg-white">
        <ShoppingCartIcon className="text-black" />
      </Button>
    ),
  },
)

export const Navbar = ({ slug }: Props) => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div
        className="max-w-(--breakpoint-xl)  mx-auto flex justify-between items-center
      h-full px-4 lg:px-12
      "
      >
        <p className="text-xl">Checkout</p>
        <Button variant={'elevated'} asChild>
          <Link href={generateTenantURL(slug)}>Continue Shopping</Link>
        </Button>
      </div>
    </nav>
  )
}

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div
        className="max-w-(--breakpoint-xl) max-w-screen-lg mx-auto flex justify-between items-center
        h-full px-4 lg:px-12
        "
      >
        <div />
      </div>
    </nav>
  )
}
