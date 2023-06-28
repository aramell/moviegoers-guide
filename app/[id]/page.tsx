"use client";

import {
  Card,
  Text,
  Box,
  CardBody,
  CardHeader,
  List,
  ListItem,
  Tag,
  Stack,
  Center,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import React from "react";
import { Movie } from "../page";
import Home from "../page";

export default async function movieDetail({ params }: { params: Movie }) {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );
  const movie = await data.json();

  return (
    <Home>
      <Box>
        <Card width="800px" backgroundColor="#FBEAAEC1">
          <CardHeader fontSize="3xl" alignSelf="center">
            {movie.title}
          </CardHeader>
          <CardBody>
            <Stack>
              <Image
                width={500}
                alignSelf={"center"}
                height={600}
                alt="movie poster"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              />
              <Text fontSize="lg">Overview: {movie.overview}</Text>
              <Stack spacing={4} direction="row" alignSelf="center">
                <Text fontSize="md">Runtime: {movie.runtime}</Text>
                <Text fontSize="md">Release date: {movie.release_date}</Text>
                <Tag
                  fontSize="md"
                  // maxWidth={100}
                  bgColor={movie.status === "Released" ? "green" : "red"}
                >
                  {movie.status}
                </Tag>
              </Stack>
              <List spacing={2}>
                <Text fontSize="md" fontWeight="bold">
                  Genres:
                </Text>
                {movie.genres.map((genre: { id: string; name: string }) => {
                  return (
                    <Stack
                      key={genre.id}
                      direction="row"
                      alignSelf="center"
                      spacing={4}
                      justifyContent="space-between"
                    >
                      <ListItem key={genre.id}>
                        <Tag bgColor="#DAAD86">{genre.name}</Tag>
                      </ListItem>
                    </Stack>
                  );
                })}
              </List>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </Home>
  );
}
