import { DEFAULT_LIMIT } from '@/constants'
import { LibraryView } from '@/modules/library/ui/views/library-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React from 'react'
import { redirect } from 'next/navigation'
import { TRPCError } from '@trpc/server'

type Props = {}

function isTRPCError(error: unknown): error is TRPCError {
  return error instanceof TRPCError
}

async function Page({}: Props) {
  const queryClient = getQueryClient()

  try {
    // prefetchInfiniteQuery yerine fetchInfiniteQuery kullan
    await queryClient.fetchInfiniteQuery(
      trpc.library.getMany.infiniteQueryOptions({
        limit: DEFAULT_LIMIT,
      }),
    )
  } catch (error) {
    if (isTRPCError(error)) {
      switch (error.code) {
        case 'UNAUTHORIZED':
          redirect('/sign-in')
        case 'FORBIDDEN':
          redirect('/access-denied')
        case 'NOT_FOUND':
          redirect('/404')
        default:
          console.error('TRPC Error:', error.message)
      }
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LibraryView />
    </HydrationBoundary>
  )
}

export default Page
