import { Link } from 'react-router-dom'
type League = {
  idLeague: string
  strLeague: string
  strSport: string
  strLeagueAlternate?: string
}

export default function LeagueCard({ league }: { league: League }) {
  return (
    <Link
      to={`/league/${league.idLeague}`}
      className="group flex w-full translate-y-0 flex-col items-start rounded-xl border border-gray-200/70 bg-white p-5 text-left shadow-sm ring-1 ring-transparent transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="flex w-full items-center justify-between">
        <div className="text-base font-semibold tracking-tight">{league.strLeague}</div>
        <span className="text-xs text-gray-400 transition-opacity group-hover:opacity-0">›</span>
      </div>
      <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{league.strSport}</div>
      {league.strLeagueAlternate ? (
        <div className="mt-1 text-xs text-gray-500">Alt: {league.strLeagueAlternate}</div>
      ) : null}
      <div className="mt-3 h-1 w-0 rounded bg-blue-500 transition-all group-hover:w-full" />
    </Link>
  )
}


