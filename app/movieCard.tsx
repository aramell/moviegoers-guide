import React from "react";
import { GridItem, Card, CardHeader, CardBody, Image } from "@chakra-ui/react";
import { Movie } from "./page";
import { Link } from "@chakra-ui/next-js";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div>
      <GridItem key={movie.id} w="100%">
        <Link href={`/${movie.id}`}>
          <Card
            bg="#FBEAAEC1"
            cursor="pointer"
            _hover={{ border: "5px solid #3333" }}
          >
            <CardHeader fontSize="xl">{movie.title}</CardHeader>
            <CardBody>
              <Image
                fill={"current"}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
              />
            </CardBody>
          </Card>
        </Link>
      </GridItem>
    </div>
  );
};
