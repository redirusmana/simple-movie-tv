import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  CSSReset,
  ThemeProvider,
  theme,
  Box,
  Image,
  Text,
  Flex,
  Heading,
  GridItem,
  Grid
} from "@chakra-ui/react";
import { apiMovieGet } from "../action";
import { FETCH_MOVIE_CAST } from "../../../Actions/Types";

export const CastMovie = props => {
  const { movie_cast, match, history } = props;
  const getMoviehow = async () => {
    try {
      const response = await apiMovieGet(
        {
          api_key: "9fb464885aa2556a6049224563c3f671",
          append_to_response: "credits"
        },
        match.params.id
      );
      const { data } = response;
      props.MovieCastDataSource(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMoviehow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLink = () => {
    history.push(`/movie/${match.params.id}`);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box borderRadius="md" pb="2">
          {props && movie_cast && (
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
                      src={`https://image.tmdb.org/t/p/w58_and_h87_face/${movie_cast.poster_path}`}
                      alt={movie_cast.poster_path}
                    />
                  </Box>
                  <Box ml="3" p="3">
                    <Heading mt="4" fontWeight="normal">
                      <b>{movie_cast.title || movie_cast.original_title}</b> (
                      {movie_cast.release_date &&
                        movie_cast.release_date.slice(0, 4)}
                      )
                    </Heading>
                    <Text mt="2" colorScheme="grey">
                      Back To Main
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box boxShadow="lg" bg="white" border p="5">
                <Grid templateColumns="repeat(4, 1fr)" gap={4} px={0} m="5">
                  <GridItem colSpan="2">
                    <Heading fontSize="22" mx="5" p="5">
                      Movie Cast{" "}
                      {movie_cast.credits.cast &&
                        `(${movie_cast.credits.cast.length})`}
                    </Heading>
                    {props &&
                      movie_cast &&
                      movie_cast.credits.cast &&
                      movie_cast.credits.cast.length > 0 &&
                      movie_cast.credits.cast.map(item => {
                        return (
                          <Box key={item.id}>
                            <Flex
                              alignItems="center"
                              justifyContent="flex-start"
                              mx="5"
                            >
                              <Box>
                                <Image
                                  alt=""
                                  borderRadius="lg"
                                  rounded="lg"
                                  src={`https://www.themoviedb.org/t/p/w66_and_h66_face/${item.profile_path}`}
                                />
                              </Box>
                              <Box ml="3" p="3">
                                <Text fontWeight="bold" fontSize="18px">
                                  {item.name || item.original_name}
                                </Text>
                                <Text color="grey">{item.character}</Text>
                              </Box>
                            </Flex>
                          </Box>
                        );
                      })}
                  </GridItem>
                  <GridItem colSpan="2">
                    <Heading fontSize="22" mx="5" p="5">
                      Movie Crew{" "}
                      {movie_cast.credits.crew &&
                        `(${movie_cast.credits.crew.length})`}
                    </Heading>
                    {props &&
                      movie_cast &&
                      movie_cast.credits.crew &&
                      movie_cast.credits.crew.length > 0 &&
                      movie_cast.credits.crew.map(item => {
                        return (
                          <Box key={item.id}>
                            <Flex
                              alignItems="center"
                              justifyContent="flex-start"
                              mx="5"
                            >
                              <Box>
                                <Image
                                  alt=""
                                  borderRadius="lg"
                                  rounded="lg"
                                  boxSize="66px"
                                  src={
                                    item.profile_path
                                      ? `https://www.themoviedb.org/t/p/w66_and_h66_face/${item.profile_path}`
                                      : `${window.location.origin}/blank.jpg`
                                  }
                                />
                              </Box>
                              <Box ml="3" p="3">
                                <Text fontWeight="bold" fontSize="18px">
                                  {item.name || item.original_name}
                                </Text>
                                <Text color="grey">
                                  <Text color="grey">
                                    {item.job || item.jobs}
                                  </Text>
                                </Text>
                              </Box>
                            </Flex>
                          </Box>
                        );
                      })}
                  </GridItem>
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
  movie_cast: state.movies.movie_cast
});

const mapDispatchToProps = dispatch => ({
  MovieCastDataSource: payload =>
    dispatch({
      type: FETCH_MOVIE_CAST,
      payload
    })
});
export default connect(mapStateToProps, mapDispatchToProps)(CastMovie);
