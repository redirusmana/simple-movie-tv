import React from "react";
import { connect } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";
import {
  CSSReset,
  ThemeProvider,
  theme,
  Box,
  Text,
  Grid,
  GridItem,
  Heading,
  Center,
  Spinner,
  Image
} from "@chakra-ui/react";
import PaginationPage from "../Components/PaginationPage";
import FilterationPage from "../Components/FilterationPage";

export const TopRatedTv = props => {
  const { dataSource, loading, location } = props;

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box borderRadius="md" m="5" py="1">
          <Heading fontWeight="bold" fontSize="20px" pb="5">
            Top Rated TV Shows
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            <GridItem>
              <FilterationPage location={location} />
            </GridItem>
            <GridItem colSpan="3">
              {props && props.dataSource && !loading ? (
                <React.Fragment>
                  <Grid templateColumns="repeat(5, 1fr)" gap={4} px={0}>
                    {props &&
                    dataSource &&
                    dataSource.results &&
                    Array.isArray(dataSource.results) &&
                    dataSource.results.length > 0 ? (
                      dataSource.results.map((li, index) => {
                        return (
                          <GridItem
                            key={index}
                            as={LinkRouter}
                            to={`/tv-show/${li.id}`}
                          >
                            <Box
                              borderRadius="lg"
                              overflow="hidden"
                              rounded="lg"
                              boxShadow="lg"
                              bg="white"
                              border
                              height="400px"
                            >
                              <Image
                                cursor="pointer"
                                width="100%"
                                src={`https://image.tmdb.org/t/p/w220_and_h330_face${li.poster_path}`}
                                alt={li.name}
                              />

                              <Box p="5">
                                <Text>
                                  <b>{li.name || li.original_name || " - "}</b>
                                </Text>
                                <Text color="gray.600" fontSize="sm">
                                  Rate : {li.vote_average}
                                  <br />
                                  {li.first_air_date ||
                                    li.release_date ||
                                    " - "}
                                </Text>
                              </Box>
                            </Box>
                          </GridItem>
                        );
                      })
                    ) : (
                      <React.Fragment>
                        <GridItem colSpan="5">
                          <Text textAlign="center" fontWeight="bold">
                            Not Found
                          </Text>
                        </GridItem>
                      </React.Fragment>
                    )}
                  </Grid>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Box m="auto" p="auto">
                    <Center>
                      <Spinner
                        thickness="8px"
                        speed="0.65s"
                        emptyColor="gray.100"
                        color="teal.600"
                        size="xl"
                      />
                    </Center>
                  </Box>
                </React.Fragment>
              )}
              <PaginationPage location={location} />
            </GridItem>
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({
  dataSource: state.tvs.dataSource,
  loading: state.tvs.loading
});
export default connect(mapStateToProps)(TopRatedTv);
