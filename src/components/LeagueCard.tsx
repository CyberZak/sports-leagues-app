type League = {
  idLeague: string
  strLeague: string
  strSport: string
  strLeagueAlternate?: string
}

export default function LeagueCard({ league, onClick }: { league: League; onClick: (id: string) => void }) {
  return (
    <button
      onClick={() => onClick(league.idLeague)}
      className="flex w-full flex-col items-start rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
   >
      <div className="text-base font-semibold">{league.strLeague}</div>
      <div className="mt-1 text-sm text-gray-600">{league.strSport}</div>
      {league.strLeagueAlternate ? (
        <div className="mt-1 text-sm text-gray-500">Alt: {league.strLeagueAlternate}</div>
      ) : null}
    </button>
  )
}


