import React from 'react'

type Props = {}

function Page({}: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-green-600 mb-4">About Page</h1>
      <p className="text-lg text-gray-700 mb-6">This page should also have Tailwind CSS styles working.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-semibold mb-3">Feature 1</h2>
          <p>This is a gradient card to test Tailwind CSS.</p>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-semibold mb-3">Feature 2</h2>
          <p>Another gradient card for testing.</p>
        </div>
      </div>
    </div>
  )
}

export default Page
