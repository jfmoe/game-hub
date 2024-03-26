import { useInfiniteQuery } from '@tanstack/react-query'
import ms from 'ms'
import APIClient from '../services/api-client'
import useGameQueryStore from '../store'
import { Platform } from './usePlatforms'

export interface Game {
  id: number
  name: string
  slug: string
  background_image: string
  parent_platforms: { platform: Platform }[]
  metacritic: number
  rating_top: number
  description_raw: string
}

const apiClient = new APIClient<Game>('/games')

const useGames = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery)
  return useInfiniteQuery({
    queryKey: ['games', gameQuery],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      apiClient.getAll({
        params: {
          genres: gameQuery.genreId,
          parent_platforms: gameQuery.platformId,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
    },
    staleTime: ms('10m'),
  })
}

export default useGames
