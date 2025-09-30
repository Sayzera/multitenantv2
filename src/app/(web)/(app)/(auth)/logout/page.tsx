'use client'

import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'

export default function Page() {
  const trpc = useTRPC()
  const session = useMutation(trpc.auth.logout.mutationOptions())
  return (
    <div
      onClick={async () => {
        session.mutate()
      }}
    >
      <h1>Logout</h1>
    </div>
  )
}
