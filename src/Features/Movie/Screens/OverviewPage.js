import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";
import {
  CSSReset,
  ThemeProvider,
  theme,
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  Flex,
  Heading,
  Badge,
  Button,
  Divider,
  Avatar
} from "@chakra-ui/react";
import { apiMovieGet } from "../action";
import { FETCH_MOVIE } from "../../../Actions/Types";
import MediaList from "../Components/MediaList";

export const OverviewPage = props => {
  const { movie, match, history, location } = props;
  const getMovieShow = async () => {
    try {
      const response = await apiMovieGet(
        {
          api_key: "9fb464885aa2556a6049224563c3f671",
          append_to_response:
            "credits,keywords,reviews,recommendations,images,videos"
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
    getMovieShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLink = id => {
    history.push(`/people/${id}`);
  };

  const handleLinkRec = (media, id) => {
    history.push(`/${media}/${id}`);
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box borderRadius="md" pb="2">
          {props && movie && (
            <Box
              color="white"
              bgImage={
                "linear-gradient(rgba(25, 25, 25, 0.8),rgba(25, 25, 25, 0.8))" +
                ",url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" +
                movie.backdrop_path +
                ")"
              }
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              py="10"
            >
              <Flex
                w="100%"
                alignItems="center"
                justifyContent="center"
                my="10"
              >
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
                    boxShadow="lg"
                    cursor="pointer"
                    width="100%"
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                    alt={movie.title || movie.original_title}
                  />
                </Box>
                <Box m="10" border>
                  <Heading mt="4" fontWeight="normal">
                    <b>{movie.title || movie.original_title}</b> (
                    {movie.release_date ? movie.release_date.slice(0, 4) : "-"})
                  </Heading>

                  <Text>
                    {movie.release_date} *{" "}
                    {movie.genres.length > 0 &&
                      movie.genres.map(item => `${item.name}, `)}{" "}
                    *{" "}
                    {movie.runtime
                      ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime %
                          60}m`
                      : "-"}
                  </Text>
                  <Text>
                    Rate : <b>{movie.vote_average}</b>
                  </Text>
                  <Text
                    my="3"
                    fontStyle="italic"
                    color="grey"
                    fontWeight="bold"
                  >
                    {movie.tagline}
                  </Text>
                  <Heading mt="3" fontSize="18px">
                    Overview
                  </Heading>
                  <Text fontSize="" maxWidth="900">
                    {movie.overview}
                  </Text>
                  {/* <Heading mt="3" fontSize="16px">
                    {movie.created_by.length > 0 &&
                      movie.created_by.map(item => item.name)}
                  </Heading>
                  <Text>Creator</Text> */}
                </Box>
              </Flex>
            </Box>
          )}

          <Box>
            {movie && (
              <Grid templateColumns="repeat(4, 1fr)" gap={4} px={0} m="5">
                <GridItem colSpan="3">
                  <Box
                    my="3"
                    p="5"
                    borderRadius="lg"
                    overflow="hidden"
                    rounded="lg"
                    boxShadow="lg"
                    bg="white"
                    border
                  >
                    <Heading mt="4" fontSize="24">
                      Movie Cast
                    </Heading>

                    <Box overflowX="auto">
                      <Table size="sm">
                        <Tbody>
                          <Tr>
                            {props &&
                              movie &&
                              movie.credits &&
                              movie.credits.cast &&
                              Array.isArray(movie.credits.cast) &&
                              movie.credits.cast.length > 0 &&
                              movie.credits.cast.slice(0, 7).map(item => {
                                return (
                                  <Td key={item.id}>
                                    <Box
                                      w="150px"
                                      onClick={() => handleLink(item.id)}
                                      m="1"
                                      p="3"
                                      borderRadius="lg"
                                      rounded="lg"
                                      boxShadow="lg"
                                      bg="white"
                                      border
                                    >
                                      <Image
                                        w="150px"
                                        alt=""
                                        src={`https://image.tmdb.org/t/p/w138_and_h175_face${item.profile_path}`}
                                      />
                                      <Box m="2">
                                        <Text fontWeight="bold" fontSize="14px">
                                          {item.name}
                                        </Text>
                                        <Text fontSize="14px">
                                          {item.character}
                                        </Text>
                                        <Text
                                          fontSize="14px"
                                          color="grey"
                                        ></Text>
                                      </Box>
                                    </Box>
                                  </Td>
                                );
                              })}
                          </Tr>
                        </Tbody>
                      </Table>
                    </Box>
                    <Button
                      as={LinkRouter}
                      to={`${location.pathname}/cast`}
                      variant="link"
                      colorScheme="blue"
                      mt="2"
                      mb="4"
                      cursor="pointer"
                    >
                      See Full as Cast & Crew
                    </Button>

                    <Divider my="4" />
                    <MediaList match={match} />
                    <Divider my="4" />

                    <Box>
                      <Heading fontSize="24" my="5">
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
                                          ? item.author_details.avatar_path
                                              .length < 35
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
                                        on {item.updated_at}
                                      </Text>
                                      <Text mt="3" maxWidth="750">
                                        {item.content
                                          ? `${item.content.slice(0, 300)} ...`
                                          : "-"}
                                      </Text>
                                    </Box>
                                  </Flex>
                                </Box>
                              </Flex>
                            </Box>
                          );
                        })}
                    </Box>
                    <Button
                      as={LinkRouter}
                      to={`${location.pathname}/review`}
                      variant="link"
                      colorScheme="blue"
                      mt="2"
                      mb="4"
                      cursor="pointer"
                    >
                      See All Review
                    </Button>
                    <Divider my="4" />

                    <Box>
                      <Heading fontSize="24" my="5">
                        Recommendations
                      </Heading>
                      <Box overflowX="auto">
                        <Table size="sm">
                          <Tbody>
                            <Tr>
                              {props &&
                                movie &&
                                movie.recommendations &&
                                movie.recommendations.results &&
                                movie.recommendations.results.length > 0 &&
                                movie.recommendations.results.map(item => {
                                  const media =
                                    item.media_type === "tv"
                                      ? "tv-show"
                                      : "movie";
                                  return (
                                    <Td
                                      key={item.id}
                                      onClick={() =>
                                        handleLinkRec(media, item.id)
                                      }
                                      cursor="pointer"
                                    >
                                      <Box
                                        w="250px"
                                        m="1"
                                        p="3"
                                        borderRadius="lg"
                                        rounded="lg"
                                        boxShadow="lg"
                                        bg="white"
                                        border
                                      >
                                        <Image
                                          alt=""
                                          src={`https://image.tmdb.org/t/p/w250_and_h141_face${item.backdrop_path}`}
                                        />
                                        <Box m="2">
                                          <Text fontWeight="bold">
                                            {item.original_title || item.title}
                                          </Text>
                                        </Box>
                                      </Box>
                                    </Td>
                                  );
                                })}
                            </Tr>
                          </Tbody>
                        </Table>
                      </Box>
                    </Box>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box
                    my="3"
                    p="5"
                    maxW="sm"
                    borderRadius="lg"
                    overflow="hidden"
                    rounded="lg"
                    boxShadow="lg"
                    bg="white"
                    border
                  >
                    {/* <Text>Facebook : {people.external_ids ? people.external_ids.facebook_id : " - "}</Text> */}
                    {/* <Text>Instagram : {people.external_ids ? people.external_ids.instagram_id : " - "}</Text> */}
                    {/* <Text>Twiter : {people.external_ids ? people.external_ids.twitter_id : " - "}</Text> */}
                    <Text fontWeight="bold" mt="2">
                      Status
                    </Text>
                    <Text>{movie.status}</Text>
                    <Text fontWeight="bold" mt="2">
                      Budget
                    </Text>
                    <Text>{movie.budget}</Text>
                    <Text fontWeight="bold" mt="2">
                      Revenue
                    </Text>
                    <Text>{movie.revenue}</Text>
                    <Text fontWeight="bold" mt="2">
                      Language
                    </Text>
                    <Text>{movie.original_language}</Text>
                    <Text fontWeight="bold" mt="2">
                      Keyword
                    </Text>{" "}
                    <Text>
                      {movie &&
                        movie.keywords &&
                        movie.keywords.keywords.length > 0 &&
                        movie.keywords.keywords.map(item => (
                          <Badge key={item.id} m="1" p="2">
                            {item.name}
                          </Badge>
                        ))}
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
            )}
          </Box>
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
export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage);
