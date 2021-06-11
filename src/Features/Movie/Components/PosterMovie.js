import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  CSSReset,
  ThemeProvider,
  theme,
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  Flex
} from "@chakra-ui/react";
import { apiMovieGet } from "../action";
import { FETCH_MOVIE } from "../../../Actions/Types";

export const PosterMovie = props => {
  const { movie, match, history } = props;
  const getTVhow = async () => {
    try {
      const response = await apiMovieGet(
        {
          api_key: "9fb464885aa2556a6049224563c3f671",
          append_to_response: "images"
        },
        match.params.id
      );
      const { data } = response;
      props.MovieDataSource(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTVhow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLink = () => {
    history.push(`/movie/${match.params.id}`);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box>
          {props && movie && (
            <React.Fragment>
              <Box ml="10" my="5" onClick={handleLink} cursor="pointer">
                <Flex w="100%" alignItems="center" justifyContent="flex-start">
                  {" "}
                  <Box
                    borderRadius="lg"
                    rounded="lg"
                    boxShadow="lg"
                    bg="white"
                    border
                  >
                    <Image
                      borderRadius="lg"
                      rounded="lg"
                      cursor="pointer"
                      width="100%"
                      src={`https://image.tmdb.org/t/p/w58_and_h87_face/${movie.poster_path}`}
                      // alt={movie.name}
                    />
                  </Box>
                  <Box ml="3" p="3">
                    {/* <Text fontWeight="bold" mt="2" fontSize="18px">
                      Title
                    </Text>
                     */}
                    <Heading mt="4" fontWeight="normal">
                      <b>{movie.title || movie.original_title}</b> (
                      {movie.release_date && movie.release_date.slice(0, 4)})
                    </Heading>
                    <Text mt="2" colorScheme="grey">
                      Back To Main
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box bg="white" p="5">
                <Heading fontWeight="bold" fontSize="20px" pb="5">
                  {match.params.type}
                </Heading>
                <Grid
                  ml={match.params.type === "backdrops" && "5"}
                  templateColumns={
                    match.params.type === "posters"
                      ? "repeat(6,1fr)"
                      : "repeat(3,1fr)"
                  }
                  gap={3}
                >
                  {props &&
                    movie &&
                    movie.images[`${match.params.type}`] &&
                    Array.isArray(movie.images[`${match.params.type}`]) &&
                    movie.images[`${match.params.type}`].length > 0 &&
                    movie.images[`${match.params.type}`].map((li, index) => {
                      return (
                        <GridItem key={index}>
                          <Box
                            w={
                              match.params.type === "posters"
                                ? "200px"
                                : "400px"
                            }
                            borderRadius="lg"
                            rounded="lg"
                            boxShadow="lg"
                            bg="white"
                            border
                          >
                            <Image
                              borderRadius="lg"
                              rounded="lg"
                              alt=""
                              width="100%"
                              src={
                                match.params.type === "posters"
                                  ? `https://image.tmdb.org/t/p/w220_and_h330_face${li.file_path}`
                                  : `https://image.tmdb.org/t/p/w500_and_h282_face${li.file_path}`
                              }
                            />
                            <Text textAlign="center">
                              Size : {li.width} x {li.height}
                            </Text>
                          </Box>
                        </GridItem>
                      );
                    })}
                </Grid>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({
  movie: state.movies.movie
});

const mapDispatchToProps = dispatch => ({
  MovieDataSource: payload =>
    dispatch({
      type: FETCH_MOVIE,
      payload
    })
});
export default connect(mapStateToProps, mapDispatchToProps)(PosterMovie);
