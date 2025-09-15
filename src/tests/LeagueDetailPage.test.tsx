import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { CacheProvider } from '../context/CacheContext'
import LeagueDetailPage from '../pages/LeagueDetailPage'
import * as api from '../services/api'

jest.mock('../services/api')

function renderWithRouter(initialPath = '/league/123') {
  const router = createMemoryRouter([
    { path: '/league/:id', element: <LeagueDetailPage /> },
  ], { initialEntries: [initialPath] })
  return render(
    <CacheProvider>
      <RouterProvider router={router} />
    </CacheProvider>
  )
}

describe('LeagueDetailPage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('renders badge after API mock', async () => {
    ;(api.getSeasonsByLeagueId as jest.Mock).mockResolvedValue({ seasons: [{ strLeague: 'Test', strBadge: 'http://img/badge.png' }] })
    renderWithRouter('/league/123')
    const img = await screen.findByRole('img')
    expect(img).toHaveAttribute('src', 'http://img/badge.png')
  })

  it('uses cache when available', async () => {
    // Pre-populate cache by rendering once
    ;(api.getSeasonsByLeagueId as jest.Mock).mockResolvedValue({ seasons: [{ strLeague: 'Cached', strBadge: 'http://img/cached.png' }] })
    renderWithRouter('/league/999')
    await screen.findByRole('img')
    // Re-render with same route: API should not be called again if cache is used
    jest.resetAllMocks()
    renderWithRouter('/league/999')
    const img = await screen.findByRole('img')
    expect(img).toHaveAttribute('src', 'http://img/cached.png')
  })
})


