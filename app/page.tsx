"use client";

import React from "react";
import {
  Button,
  Heading,
  Stack,
  Input,
  HStack,
  Grid,
  InputRightElement,
  InputLeftElement,
  InputGroup,
  Text,
  Box,
  Flex,
  Center,
  ButtonGroup,
  TabList,
  Tab,
  Tabs,
} from "@chakra-ui/react";
import { MovieCard } from "./movieCard";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
};

export default function Home({ children }: { children: React.ReactNode }) {
  const [movieData, setMovieData] = React.useState<Movie[] | []>([]);
  const [search, setSearch] = React.useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getMovies = async (e: any, type: string) => {
    e.preventDefault();
    await router.push("/", { shallow: true });
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    );
    const response = await res.json();
    setMovieData(response.results);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`
    );
    const response = await res.json();
    setSearch("");
    setMovieData(response.results);
  };

  const handleClear = () => {
    setSearch("");
    setMovieData([]);
  };

  return (
    <main>
      <>
        <Stack
          direction="row"
          spacing={4}
          justifyContent="space-between"
          mx={10}
          my={3}
        >
          <Heading>Ultimate Moviegoers Guide!</Heading>
          <Stack direction="row" spacing={4} alignItems="center">
            <Tabs variant="line" size="sm">
              <TabList>
                <Tab p={6} onClick={(e) => getMovies(e, "now_playing")}>
                  Now Playing
                </Tab>
                <Tab p={6} onClick={(e) => getMovies(e, "popular")}>
                  Popular
                </Tab>
                <Tab p={6} onClick={(e) => getMovies(e, "top_rated")}>
                  Top Rated
                </Tab>
              </TabList>
            </Tabs>
            <InputGroup>
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
              <Input
                placeholder="Search For a Movie"
                value={search}
                onChange={handleChange}
              />
              <InputRightElement>
                <CloseIcon onClick={handleClear} />
              </InputRightElement>
            </InputGroup>
            <Button onClick={() => handleSearch()}>Search</Button>
          </Stack>
        </Stack>
        <Grid
          gap={5}
          gridAutoRows="1fr"
          gridTemplateColumns="repeat(4, 1fr)"
          mx={10}
        >
          {movieData.length > 1
            ? movieData.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />;
              })
            : movieData.length === 0 &&
              !children && (
                <Box>
                  <Text fontSize="2xl">Search for a movie!</Text>
                </Box>
              )}
        </Grid>
        <Flex justifyContent="center">{children}</Flex>
      </>
    </main>
  );
}
