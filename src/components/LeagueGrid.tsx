import LeagueCard from './LeagueCard'

type League = {
  idLeague: string
  strLeague: string
  strSport: string
  strLeagueAlternate?: string
}

export default function LeagueGrid({ leagues }: { leagues: League[] }) {
  if (!leagues.length) return <div className="py-12 text-center text-gray-500">No results</div>

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {leagues.map((l) => (
        <div key={l.idLeague} className="animate-[fadeIn_300ms_ease-out]">
          <LeagueCard league={l} />
        </div>
      ))}
    </div>
  )
}


