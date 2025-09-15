type Props = {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <div className="w-full max-w-md">
      <label htmlFor="league-search" className="sr-only">Search leagues</label>
      <input
        id="league-search"
        aria-label="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        aria-describedby="league-search-desc"
      />
      <p id="league-search-desc" className="sr-only">Type to filter leagues by name</p>
    </div>
  )
}


