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
  Divider
} from "@chakra-ui/react";
import { apiTVGet } from "../action";
import { FETCH_TV } from "../../../Actions/Types";
// import logo from "./logo.jpeg"; // with import

export const SeasonTv = props => {
  const { tv_show, match, history } = props;
  const getTVhow = async () => {
    try {
      const response = await apiTVGet(
        {
          api_key: "9fb464885aa2556a6049224563c3f671"
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
  const handleLink = () => {
    history.push(`/tv-show/${match.params.id}`);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box borderRadius="md">
          {props && tv_show && (
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
                      src={`https://image.tmdb.org/t/p/w58_and_h87_face/${tv_show.poster_path}`}
                      // alt={tv_show.name}
                    />
                  </Box>
                  <Box ml="3" p="3">
                    {/* <Text fontWeight="bold" mt="2" fontSize="18px">
                      Title
                    </Text>
                     */}
                    <Heading mt="4" fontWeight="normal">
                      <b>{tv_show.name}</b> (
                      {tv_show.first_air_date &&
                        tv_show.first_air_date.slice(0, 4)}
                      )
                    </Heading>
                    <Text mt="2" colorScheme="grey">
                      Back To Main
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box border bg="white" py="5">
                {props &&
                  tv_show &&
                  tv_show.seasons &&
                  tv_show.seasons.length > 0 &&
                  tv_show.seasons.map(item => {
                    return (
                      <Box onClick={handleLink} border key={item.id} mx="10">
                        <Flex
                          w="100%"
                          alignItems="center"
                          justifyContent="flex-start"
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
                            <Text fontWeight="bold" mt="2" fontSize="18px">
                              {item.name}
                            </Text>
                            <Text fontWeight="bold" mt="2">
                              {item.air_date ? item.air_date.slice(0, 4) : "-"}{" "}
                              | {item.episode_count} Episode
                            </Text>

                            <Text mt="3" maxWidth="750">
                              {item.overview || "-"}
                            </Text>
                          </Box>
                        </Flex>
                        <Divider my="5" />
                      </Box>
                    );
                  })}
              </Box>
            </React.Fragment>
          )}
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
export default connect(mapStateToProps, mapDispatchToProps)(SeasonTv);
