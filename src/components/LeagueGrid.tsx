import LeagueCard from './LeagueCard'

type League = {
  idLeague: string
  strLeague: string
  strSport: string
  strLeagueAlternate?: string
}

export default function LeagueGrid({ leagues, onClickCard }: { leagues: League[]; onClickCard: (id: string) => void }) {
  if (!leagues.length) return <div className="py-12 text-center text-gray-500">No results</div>

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {leagues.map((l) => (
        <LeagueCard key={l.idLeague} league={l} onClick={onClickCard} />
      ))}
    </div>
  )
}


