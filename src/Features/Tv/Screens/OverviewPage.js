import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link as LinkRouter, Redirect } from "react-router-dom";
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
// import logo from "./logo.jpeg"; // with import
import { apiTVGet } from "../action";
import { FETCH_TV } from "../../../Actions/Types";
import MediaList from "../Components/MediaList";
import dayjs from "dayjs";

export const OverviewPage = props => {
  const { tv_show, match, history, location } = props;
  const getTVhow = async () => {
    try {
      const response = await apiTVGet(
        {
          api_key: "9fb464885aa2556a6049224563c3f671",
          append_to_response:
            "credits,keywords,reviews,recommendations,images,videos"
          // aggregate_credits,
          // external_id
        },
        match.params.id
      );
      const { data } = response;
      props.TvDataSource(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTVhow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLink = id => {
    history.push(`/people/${id}`);
  };

  const handleLinkRec = (media, id) => {
    // history.replace(`/${media}/${id}`);
    <Redirect to={`/${media}/${id}`} />;
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box borderRadius="md" pb="2">
          {props && tv_show && (
            <Box
              bgImage={
                "linear-gradient(rgba(255, 255, 255, 0.9),rgba(255, 255, 255, 0.9))" +
                ",url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" +
                tv_show.backdrop_path +
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
                    cursor="pointer"
                    width="100%"
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${tv_show.poster_path}`}
                    alt={tv_show.name}
                  />
                </Box>
                <Box m="10" border>
                  <Heading mt="4" fontWeight="normal">
                    <b>{tv_show.name}</b> ({tv_show.first_air_date.slice(0, 4)})
                  </Heading>

                  <Text>
                    {tv_show.genres.length > 0 &&
                      tv_show.genres.map(item => `${item.name}, `)}
                  </Text>
                  <Text>
                    Rate : <b>{tv_show.vote_average}</b>
                  </Text>
                  <Text my="3" fontStyle="italic" color="grey">
                    {tv_show.tagline}
                  </Text>
                  <Heading mt="3" fontSize="16px">
                    Overview
                  </Heading>
                  <Text fontSize="" maxWidth="900">
                    {tv_show.overview}
                  </Text>
                  <Heading mt="3" fontSize="16px">
                    {tv_show.created_by.length > 0 &&
                      tv_show.created_by.map(item => item.name)}
                  </Heading>
                  <Text>Creator</Text>
                </Box>
              </Flex>
            </Box>
          )}

          <Box>
            {tv_show && (
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
                      Series Cast
                    </Heading>

                    <Box overflowX="auto">
                      <Table size="sm">
                        <Tbody>
                          <Tr>
                            {props &&
                              tv_show &&
                              tv_show.credits &&
                              tv_show.credits.cast &&
                              Array.isArray(tv_show.credits.cast) &&
                              tv_show.credits.cast.length > 0 &&
                              tv_show.credits.cast.map(item => {
                                return (
                                  <Td key={item.id}>
                                    <Box
                                      onClick={() => handleLink(item.id)}
                                      cursor="pointer"
                                      w="150px"
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
                    <Box>
                      <Heading fontSize="24" my="5">
                        Last Season
                      </Heading>
                      {props &&
                        tv_show &&
                        tv_show.seasons &&
                        tv_show.seasons.length > 0 &&
                        tv_show.seasons
                          .slice(
                            tv_show.seasons.length - 2,
                            tv_show.seasons.length
                          )
                          .reverse()
                          .map(item => {
                            return (
                              <Box
                                borderRadius="lg"
                                rounded="lg"
                                boxShadow="lg"
                                bg="white"
                                border
                                key={item.id}
                              >
                                <Flex
                                  w="100%"
                                  alignItems="center"
                                  justifyContent="flex-start"
                                  my="3"
                                >
                                  <Box>
                                    <Image
                                      alt=""
                                      borderRadius="lg"
                                      rounded="lg"
                                      src={`https://www.themoviedb.org/t/p/w130_and_h195_bestv2${item.poster_path}`}
                                    />
                                  </Box>
                                  <Box ml="3" p="3">
                                    <Text
                                      fontWeight="bold"
                                      mt="2"
                                      fontSize="18px"
                                    >
                                      {item.name}
                                    </Text>
                                    <Text fontWeight="bold" mt="2">
                                      {item.air_date
                                        ? item.air_date.slice(0, 4)
                                        : "-"}{" "}
                                      | {item.episode_count} Episode
                                    </Text>

                                    <Text mt="3" maxWidth="750">
                                      {item.overview || "-"}
                                    </Text>
                                  </Box>
                                </Flex>
                              </Box>
                            );
                          })}
                    </Box>
                    <Button
                      as={LinkRouter}
                      to={`${location.pathname}/season`}
                      variant="link"
                      colorScheme="blue"
                      mt="2"
                      mb="4"
                      cursor="pointer"
                    >
                      See All Seasons
                    </Button>

                    <Divider my="4" />
                    <MediaList match={match} />
                    <Divider my="4" />

                    <Box>
                      <Heading fontSize="24" my="5">
                        Review
                      </Heading>
                      {props &&
                        tv_show &&
                        tv_show.reviews &&
                        tv_show.reviews.results &&
                        tv_show.reviews.results.length > 0 &&
                        tv_show.reviews.results.map(item => {
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
                                        on{" "}
                                        {dayjs(item.updated_at).format(
                                          "DD-MM-YYYY"
                                        )}
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
                                tv_show &&
                                tv_show.recommendations &&
                                tv_show.recommendations.results &&
                                tv_show.recommendations.results.length > 0 &&
                                tv_show.recommendations.results.map(item => {
                                  const media =
                                    item.media_type === "tv"
                                      ? "tv-show"
                                      : "movie";
                                  return (
                                    <Td
                                      onClick={() =>
                                        handleLinkRec(media, item.id)
                                      }
                                      cursor="pointer"
                                      key={item.id}
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
                                            {item.original_name || item.name}
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
                    <Text>{tv_show.status}</Text>
                    <Text fontWeight="bold" mt="2">
                      Network
                    </Text>
                    {props &&
                      tv_show &&
                      tv_show.networks &&
                      Array.isArray(tv_show.networks) &&
                      tv_show.networks.length > 0 &&
                      tv_show.networks.map(item => {
                        return (
                          <React.Fragment key={item.id}>
                            <Image
                              alt={item.name}
                              src={`https://image.tmdb.org/t/p/h30/${item.logo_path}`}
                            />
                          </React.Fragment>
                        );
                      })}
                    <Text fontWeight="bold" mt="2">
                      Type
                    </Text>
                    <Text>{tv_show.type}</Text>
                    <Text fontWeight="bold" mt="2">
                      Language
                    </Text>
                    <Text>{tv_show.original_language}</Text>
                    <Text fontWeight="bold" mt="2">
                      Keyword
                    </Text>{" "}
                    <Text>
                      {tv_show &&
                        tv_show.keywords &&
                        tv_show.keywords &&
                        tv_show.keywords.results.length > 0 &&
                        tv_show.keywords.results.map(item => (
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
  tv_show: state.tvs.tv_show
});

const mapDispatchToProps = dispatch => ({
  TvDataSource: payload =>
    dispatch({
      type: FETCH_TV,
      payload
    })
});
export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage);
