import axios from 'axios'

const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export async function getAllLeagues() {
  try {
    const { data } = await apiClient.get('/all_leagues.php')
    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to fetch leagues: ${message}`)
  }
}

export async function getSeasonsByLeagueId(id: string) {
  try {
    const { data } = await apiClient.get(`/search_all_seasons.php`, { params: { badge: 1, id } })
    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to fetch seasons for league ${id}: ${message}`)
  }
}

export default apiClient


