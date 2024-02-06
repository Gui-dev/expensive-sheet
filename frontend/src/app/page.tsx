'use client'

import { redirect } from 'next/navigation'

import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { loading, user } = useAuth()

  if (loading) {
    return (
      <main className="flex min-h-screen px-8">
        <h1>Carregando...</h1>
      </main>
    )
  }

  if (!user) {
    return redirect('/signin')
  }

  return (
    <main className="flex min-h-screen px-8">
      <h1>HOME</h1>
    </main>
  )
}
