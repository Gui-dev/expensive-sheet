import { Dashboard } from './components/dashboard'
import { MenuAside } from './components/menu-aside'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row">
      <MenuAside />
      <Dashboard />
    </main>
  )
}
