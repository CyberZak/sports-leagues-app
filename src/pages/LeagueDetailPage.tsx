import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCache } from '../context/CacheContext'
import { getSeasonsByLeagueId } from '../services/api'

type Season = {
  strSeason?: string
  strBadge?: string
  strLeague?: string
}

export default function LeagueDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCache, setCache } = useCache()
  const [season, setSeason] = useState<Season | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    async function load() {
      if (!id) return
      setLoading(true)
      setError('')
      try {
        const cacheKey = `seasons:${id}`
        const cached = getCache(cacheKey)
        if (cached) {
          setSeason(cached)
        } else {
          const data = await getSeasonsByLeagueId(id)
          const seasons: Season[] = data.seasons || []
          const firstWithBadge = seasons.find((s) => s.strBadge)
          const chosen = firstWithBadge || seasons[0] || null
          setSeason(chosen)
          setCache(cacheKey, chosen)
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load seasons')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, getCache, setCache])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-40 animate-pulse rounded bg-gray-200/70 dark:bg-gray-700/50" />
        <div className="h-6 w-64 animate-pulse rounded bg-gray-200/70 dark:bg-gray-700/50" />
        <div className="h-24 w-24 animate-pulse rounded-full bg-gray-200/70 dark:bg-gray-700/50" />
      </div>
    )
  }
  if (error) return <div className="py-12 text-center text-red-600">{error}</div>
  if (!season) return (
    <div className="space-y-4 text-center">
      <div>No data</div>
      <button className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  )

  return (
    <div className="space-y-4">
      <button className="rounded-md border px-3 py-1 text-sm transition hover:-translate-y-0.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1 className="text-2xl font-bold tracking-tight">{season.strLeague || 'League'}</h1>
      {season.strBadge ? (
        <img src={season.strBadge} alt={`${season.strLeague} badge`} className="h-24 w-24 animate-[popIn_250ms_ease-out]" />
      ) : (
        <div className="text-gray-500">No badge available</div>
      )}
    </div>
  )
}


