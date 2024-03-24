import React from 'react'
import { Box, Button, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useGames from '../hooks/useGames'
import GameCard from './GameCard'
import GameCardSkeleton from './GameCardSkeleton'
import GameCardContainer from './GameCardContainer'
import { GameQuery } from '../App'

interface Props {
  gameQuery: GameQuery
}

const GameGrid = ({ gameQuery }: Props) => {
  const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useGames(gameQuery)
  const skeletons = [1, 2, 3, 4, 5, 6]

  if (error) return <Text>{error.message}</Text>

  const fetchedGames = data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0

  return (
    <InfiniteScroll
      dataLength={fetchedGames}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<Spinner />}
    >
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 3, lg: 4 }} spacing={6} padding="10px">
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}

        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map((game) => (
              <GameCardContainer key={game.id}>
                <GameCard game={game} />
              </GameCardContainer>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  )
}

export default GameGrid
