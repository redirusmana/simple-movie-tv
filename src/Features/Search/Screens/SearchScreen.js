import React from "react";
import { connect } from "react-redux";
import {
  CSSReset,
  ThemeProvider,
  theme,
  Box,
  Text,
  Grid,
  GridItem,
  Heading,
  Image,
  Flex
} from "@chakra-ui/react";
import PaginationPage from "../Components/PaginationPage";
import FilterShow from "../Components/FilterShow";

export const SearchScreen = props => {
  const { dataSource, history, loading } = props;

  const handleLink = (media, id) => {
    if (media === "movie" || media === "tv-show" || media === "people") {
      history.push(`/${media}/${id}`);
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box borderRadius="md" m="5" py="1">
          <Heading fontWeight="bold" fontSize="20px" pb="5">
            {/* Search */}
          </Heading>
          {props && props.dataSource && !loading && (
            <React.Fragment>
              <Grid templateColumns="repeat(5, 1fr)" gap={4} px={0}>
                <GridItem colSpan="1">
                  <FilterShow />
                </GridItem>
                <GridItem colSpan="4">
                  {props &&
                  dataSource &&
                  dataSource.results &&
                  Array.isArray(dataSource.results) &&
                  dataSource.results.length > 0 ? (
                    dataSource.results.map((item, index) => {
                      let media;
                      if (item.media_type === "tv") {
                        media = "tv-show";
                      } else if (item.media_type === "movie") {
                        media = "movie";
                      } else if (item.known_for_department === "Acting") {
                        media = "people";
                      } else {
                        media = "";
                      }
                      return (
                        <React.Fragment key={item.id}>
                          <Box
                            cursor={
                              (media === "movie" ||
                                media === "tv-show" ||
                                media === "people") &&
                              "pointer"
                            }
                            onClick={() => handleLink(media, item.id)}
                            border
                            mb="5"
                            mx="3"
                            bg="white"
                            p="1"
                            borderRadius="lg"
                            rounded="lg"
                            boxShadow="lg"
                          >
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
                                  src={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2/${item.poster_path ||
                                    item.profile_path}`}
                                />
                              </Box>
                              <Box ml="3" p="3">
                                <Text fontWeight="bold" mt="2" fontSize="18px">
                                  {item.name ||
                                    item.original_name ||
                                    item.title ||
                                    item.original_title ||
                                    "-"}
                                </Text>
                                <Text fontWeight="bold" mt="2">
                                  {item.air_date || item.release_date}
                                  {item.known_for_department}
                                </Text>

                                <Text mt="3" maxWidth="750">
                                  {item.overview && item.overview.length > 200
                                    ? `${item.overview.slice(0, 200)} ...`
                                    : item.overview}
                                  {item.known_for &&
                                    item.known_for.length > 0 &&
                                    item.known_for.map(i => {
                                      return `${i.original_title ||
                                        i.title ||
                                        i.original_name ||
                                        i.name},`;
                                    })}
                                </Text>
                              </Box>
                            </Flex>
                          </Box>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <React.Fragment>
                      <Text textAlign="center" fontWeight="bold">
                        Not Found
                      </Text>
                    </React.Fragment>
                  )}
                </GridItem>
              </Grid>
            </React.Fragment>
          )}
        </Box>
        <PaginationPage />
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({
  dataSource: state.searchs.dataSource,
  loading: state.searchs.loading
});
export default connect(mapStateToProps)(SearchScreen);
