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
import { apiTVGet } from "../action";
import { FETCH_TV_CAST } from "../../../Actions/Types";

export const CastTv = props => {
  const { tv_cast, match, history } = props;
  const getTVhow = async () => {
    try {
      const response = await apiTVGet(
        {
          api_key: "9fb464885aa2556a6049224563c3f671",
          append_to_response: "aggregate_credits"
        },
        match.params.id
      );
      const { data } = response;
      props.TvCastDataSource(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTVhow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLink = () => {
    history.push(`/tv-show/${match.params.id}`);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box borderRadius="md" pb="2">
          {props && tv_cast && (
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
                      src={`https://image.tmdb.org/t/p/w58_and_h87_face/${tv_cast.poster_path}`}
                      alt={tv_cast.poster_path}
                    />
                  </Box>
                  <Box ml="3" p="3">
                    <Heading mt="4" fontWeight="normal">
                      <b>{tv_cast.name}</b> (
                      {tv_cast.first_air_date.slice(0, 4)})
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
                      Series Cast{" "}
                      {tv_cast.aggregate_credits.cast &&
                        `(${tv_cast.aggregate_credits.cast.length})`}
                    </Heading>
                    {props &&
                      tv_cast &&
                      tv_cast.aggregate_credits.cast &&
                      tv_cast.aggregate_credits.cast.length > 0 &&
                      tv_cast.aggregate_credits.cast.map(item => {
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
                                <Text color="grey">
                                  {item.roles.length > 0 &&
                                    item.roles.map(i => {
                                      return `${i.character} - (${i.episode_count} episode)`;
                                    })}
                                </Text>
                              </Box>
                            </Flex>
                          </Box>
                        );
                      })}
                  </GridItem>
                  <GridItem colSpan="2">
                    <Heading fontSize="22" mx="5" p="5">
                      Series Crew{" "}
                      {tv_cast.aggregate_credits.crew &&
                        `(${tv_cast.aggregate_credits.crew.length})`}
                    </Heading>
                    {props &&
                      tv_cast &&
                      tv_cast.aggregate_credits.crew &&
                      tv_cast.aggregate_credits.crew.length > 0 &&
                      tv_cast.aggregate_credits.crew.map(item => {
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
                                    {item.jobs.length > 0 &&
                                      item.jobs.map(i => {
                                        return `${i.job} - (${i.episode_count} episode)`;
                                      })}
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
  tv_cast: state.tvs.tv_cast
});

const mapDispatchToProps = dispatch => ({
  TvCastDataSource: payload =>
    dispatch({
      type: FETCH_TV_CAST,
      payload
    })
});
export default connect(mapStateToProps, mapDispatchToProps)(CastTv);
