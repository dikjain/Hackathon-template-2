'use client'

import React from 'react'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/auth')
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleSignOut}
          variant="primary"
          size="md"
          fullWidth
          rounded="full"
        >
          Sign Out
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className='text-black'>Welcome to your dashboard!</p>
      </div>
    </div>
  )
}
