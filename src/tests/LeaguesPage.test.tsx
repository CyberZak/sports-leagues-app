import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CacheProvider } from '../context/CacheContext'
import LeaguesPage from '../pages/LeaguesPage'
import * as api from '../services/api'

jest.mock('../services/api')
const mockedNavigate = jest.fn()
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom')
  return { ...actual, useNavigate: () => mockedNavigate }
})

const leaguesMock = {
  leagues: [
    { idLeague: '1', strLeague: 'Premier League', strSport: 'Soccer', strLeagueAlternate: 'EPL' },
    { idLeague: '2', strLeague: 'NBA', strSport: 'Basketball', strLeagueAlternate: 'National Basketball Association' },
  ],
}

function renderPage() {
  return render(
    <CacheProvider>
      <MemoryRouter initialEntries={["/"]}>
        <LeaguesPage />
      </MemoryRouter>
    </CacheProvider>
  )
}

describe('LeaguesPage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('renders leagues after API mock', async () => {
    ;(api.getAllLeagues as jest.Mock).mockResolvedValue(leaguesMock)
    renderPage()
    expect(await screen.findByText('Premier League')).toBeInTheDocument()
    expect(screen.getByText('NBA')).toBeInTheDocument()
  })

  it('filters with search and dropdown', async () => {
    ;(api.getAllLeagues as jest.Mock).mockResolvedValue(leaguesMock)
    renderPage()
    await screen.findByText('Premier League')

    const search = screen.getByLabelText('Search') as HTMLInputElement
    fireEvent.change(search, { target: { value: 'premier' } })
    expect(screen.getByText('Premier League')).toBeInTheDocument()
    expect(screen.queryByText('NBA')).not.toBeInTheDocument()

    const select = screen.getByDisplayValue('All') as HTMLSelectElement
    // Clear search before applying sport filter so NBA can appear
    fireEvent.change(search, { target: { value: '' } })
    fireEvent.change(select, { target: { value: 'Basketball' } })
    expect(screen.getByText('NBA')).toBeInTheDocument()
    expect(screen.queryByText('Premier League')).not.toBeInTheDocument()
  })

  it('navigates to detail page on click', async () => {
    ;(api.getAllLeagues as jest.Mock).mockResolvedValue(leaguesMock)
    renderPage()
    const button = await screen.findByText('Premier League')
    fireEvent.click(button)
    expect(mockedNavigate).toHaveBeenCalledWith('/league/1')
  })
})


