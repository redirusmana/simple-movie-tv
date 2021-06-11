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
  Badge,
  Avatar
} from "@chakra-ui/react";
import { apiMovieGet } from "../action";
import { FETCH_MOVIE } from "../../../Actions/Types";
import dayjs from "dayjs";

export const ReviewMovie = props => {
  const { movie, match, history } = props;
  const getMovie = async () => {
    try {
      const response = await apiMovieGet(
        {
          api_key: "9fb464885aa2556a6049224563c3f671",
          append_to_response: "reviews"
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
    getMovie();
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
              <Box boxShadow="lg" bg="white" border p="5">
                <Box>
                  <Heading fontSize="24" my="2">
                    Review
                  </Heading>
                  {props &&
                    movie &&
                    movie.reviews &&
                    movie.reviews.results &&
                    movie.reviews.results.length > 0 &&
                    movie.reviews.results.map(item => {
                      return (
                        <Box
                          borderRadius="lg"
                          rounded="lg"
                          boxShadow="lg"
                          bg="white"
                          border
                          m="1"
                          p="3"
                          key={item.id}
                        >
                          <Flex
                            w="100%"
                            alignItems="center"
                            justifyContent="flex-start"
                            my="3"
                          >
                            <Box>
                              <Flex>
                                <Avatar
                                  src={
                                    item.author_details &&
                                    item.author_details.avatar_path
                                      ? item.author_details.avatar_path.length <
                                        35
                                        ? `https://secure.gravatar.com/avatar/${item.author_details.avatar_path}`
                                        : item.author_details.avatar_path.substring(
                                            1
                                          )
                                      : ""
                                  }
                                />
                                <Box ml="3">
                                  <Text fontWeight="bold">
                                    {item.author_details.username}{" "}
                                    <Badge ml="1" colorScheme="green">
                                      {item.author_details.rating}
                                    </Badge>
                                  </Text>
                                  <Text fontSize="sm">
                                    on{" "}
                                    {dayjs(item.updated_at).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </Text>
                                  <Text mt="3">
                                    {item.content ? item.content : "-"}
                                  </Text>
                                </Box>
                              </Flex>
                            </Box>
                          </Flex>
                        </Box>
                      );
                    })}
                </Box>
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
export default connect(mapStateToProps, mapDispatchToProps)(ReviewMovie);
