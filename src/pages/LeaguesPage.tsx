import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const { getCache, setCache } = useCache()
  const [leagues, setLeagues] = useState<League[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [sport, setSport] = useState<string>('')

  useEffect(() => {
    async function load() {
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
      }
    }
    load()
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

  const onClickCard = (id: string) => navigate(`/league/${id}`)

  if (loading) return <div className="py-12 text-center">Loading…</div>
  if (error) return <div className="py-12 text-center text-red-600">{error}</div>

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={query} onChange={setQuery} placeholder="Search leagues…" />
        <DropdownFilter label="Sport" options={sports} value={sport} onChange={setSport} />
      </div>
      <LeagueGrid leagues={filtered} onClickCard={onClickCard} />
    </div>
  )
}


