import { useEffect, useMemo, useState } from 'react'
import { getAllLeagues } from '../services/api'
import { useCache } from '../context/CacheContext'
import SearchBar from '../components/SearchBar'
import DropdownFilter from '../components/DropdownFilter'
import LeagueGrid from '../components/LeagueGrid'

type League = {
  idLeague: string
  strLeague: string
  strSport: string
  strLeagueAlternate?: string
}

export default function LeaguesPage() {
  const { getCache, setCache } = useCache()
  const [leagues, setLeagues] = useState<League[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [sport, setSport] = useState<string>('')

  useEffect(() => {
    const controller = new AbortController()
    let isFetching = false
    async function load() {
      if (isFetching) return
      isFetching = true
      setLoading(true)
      setError('')
      try {
        const cached = getCache('leagues')
        if (cached) {
          setLeagues(cached)
        } else {
          const data = await getAllLeagues()
          const list: League[] = data.leagues || []
          setLeagues(list)
          setCache('leagues', list)
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load leagues')
      } finally {
        setLoading(false)
        isFetching = false
      }
    }
    load()
    return () => controller.abort()
  }, [getCache, setCache])

  const sports = useMemo(() => {
    const s = new Set<string>(leagues.map((l) => l.strSport).filter(Boolean))
    return Array.from(s).sort()
  }, [leagues])

  const filtered = useMemo(() => {
    return leagues.filter((l) => {
      const matchesQuery = l.strLeague.toLowerCase().includes(query.toLowerCase())
      const matchesSport = sport ? l.strSport === sport : true
      return matchesQuery && matchesSport
    })
  }, [leagues, query, sport])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-9 w-full max-w-md animate-pulse rounded-md bg-gray-200/70 dark:bg-gray-700/50" />
          <div className="h-9 w-40 animate-pulse rounded-md bg-gray-200/70 dark:bg-gray-700/50" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl border border-gray-200/70 bg-white dark:border-gray-800 dark:bg-gray-900" />
          ))}
        </div>
      </div>
    )
  }
  if (error) return (
    <div className="py-12 text-center">
      <div role="alert" className="mb-4 text-red-600">{error}</div>
      <button className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50" onClick={() => {
        setError('')
        setLoading(true)
        setLeagues([])
      }}>Retry</button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={query} onChange={setQuery} placeholder="Search leagues…" />
        <DropdownFilter label="Sport" options={sports} value={sport} onChange={setSport} />
      </div>
      <LeagueGrid leagues={filtered} />
    </div>
  )
}


