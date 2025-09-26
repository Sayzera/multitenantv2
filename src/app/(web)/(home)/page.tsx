'use client'

import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'

const Home = () => {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.auth.session.queryOptions())

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Home</h1>
      <p className="text-lg text-gray-700 mb-6">This is a test to see if Tailwind CSS is working.</p>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Test Card</h2>
        <p className="text-gray-600">If you can see this styled properly, Tailwind CSS is working!</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Test Button
        </button>
      </div>
    </div>
  )
}

export default Home
