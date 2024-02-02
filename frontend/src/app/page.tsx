import { redirect } from 'next/navigation'

export default function Home() {
  const user = false

  if (!user) {
    return redirect('/signin')
  }

  return (
    <main className="flex min-h-screen px-8">
      <h1>HOME</h1>
    </main>
  )
}
