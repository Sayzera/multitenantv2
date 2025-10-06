'use client'

import { HydrationBoundary, DehydratedState } from '@tanstack/react-query'
import React from 'react'

export function HydrateClient(props: { stateString: string; children: React.ReactNode }) {
  const { stateString, children } = props
  let state: DehydratedState | undefined = undefined
  try {
    // JSON.parse returns unknown; cast to DehydratedState so the HydrationBoundary accepts it
    state = JSON.parse(stateString) as DehydratedState
  } catch (err) {
    // If parsing fails, leave state undefined — hydration will be empty
    // Log during development only
    if (process.env.NODE_ENV !== 'production') console.error('Failed to parse hydration state', err)
  }

  return <HydrationBoundary state={state}>{children}</HydrationBoundary>
}

export default HydrateClient
