import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'
import Link from 'next/link'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
})

export const Footer = () => {
  return (
    <footer className={cn('border-t font-medium bg-white')}>
      <div
        className="max-w-(--breakpoint-xl) max-w-screen-lg mx-auto flex  items-center
        h-full px-4 lg:px-12 py-6 space-x-2"
      >
        <p className="text-xl">Powered by</p>
        <Link href={'/'} className={cn('text-2xl font-semibold', poppins.className)}>
          <span>funroad</span>
        </Link>
      </div>
    </footer>
  )
}
