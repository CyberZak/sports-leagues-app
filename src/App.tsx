import { Link, Route, Routes } from 'react-router-dom'
import LeaguesPage from './pages/LeaguesPage'
import LeagueDetailPage from './pages/LeagueDetailPage'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 dark:from-gray-900 dark:to-gray-950 dark:text-gray-100">
      <header className="sticky top-0 z-10 border-b border-gray-200/60 bg-white/70 backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-900/60">
        <nav className="container mx-auto flex items-center justify-between p-4">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            <span className="mr-2">🏟️</span> Sports Leagues
          </Link>
          <div className="flex gap-4 text-sm">
            <Link to="/" className="relative transition-colors hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50">
              <span className="after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all after:content-[''] hover:after:w-full"/>
              Home
            </Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<LeaguesPage />} />
          <Route path="/league/:id" element={<LeagueDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
