import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'
import { ProductList } from '../components/product-list'
export const LibraryView = () => {
  return (
    <div className="min-h-screen bg-white ">
      <nav className="p-4 bg-[#f4f4f4] w-full border-b ">
        <Link prefetch href={'/'} className="flex items-center gap-2">
          <ArrowLeftIcon className="size-4" />
          <span className="text font-medium">Continue shopping</span>
        </Link>
      </nav>

      <header className="bg-[#f4f4f0] py-8 border-b">
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 flex flex-col gap-y-4">
          <h1 className="text-[40px] font-medium">Library</h1>
          <p>Your purchases and review</p>
        </div>
      </header>

      <section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-12">
        <ProductList />
      </section>
    </div>
  )
}
