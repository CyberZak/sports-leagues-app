import { Link, Route, Routes } from 'react-router-dom'
import LeaguesPage from './pages/LeaguesPage'
import LeagueDetailPage from './pages/LeagueDetailPage'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <header className="border-b bg-gray-50 dark:bg-gray-800">
        <nav className="container mx-auto flex items-center justify-between p-4">
          <Link to="/" className="text-lg font-semibold">Sports Leagues</Link>
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">Home</Link>
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
