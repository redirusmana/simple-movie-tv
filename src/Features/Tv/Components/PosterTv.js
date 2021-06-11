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
import { apiTVGet } from "../action";
import { FETCH_TV } from "../../../Actions/Types";

export const PosterTv = props => {
  const { tv_show, match, history } = props;
  const getTVhow = async () => {
    try {
      const response = await apiTVGet(
        {
          api_key: "9fb464885aa2556a6049224563c3f671",
          append_to_response: "images"
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
        <Box>
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
                      alt={tv_show.poster_path}
                    />
                  </Box>
                  <Box ml="3" p="3">
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
                    tv_show &&
                    tv_show.images[`${match.params.type}`] &&
                    Array.isArray(tv_show.images[`${match.params.type}`]) &&
                    tv_show.images[`${match.params.type}`].length > 0 &&
                    tv_show.images[`${match.params.type}`].map((li, index) => {
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
  tv_show: state.tvs.tv_show
});

const mapDispatchToProps = dispatch => ({
  TvDataSource: payload =>
    dispatch({
      type: FETCH_TV,
      payload
    })
});
export default connect(mapStateToProps, mapDispatchToProps)(PosterTv);
