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
  Center,
  Spinner,
  Image
} from "@chakra-ui/react";
import PaginationPage from "../Components/PaginationPage";

export const PopularPeople = props => {
  const { dataSource, history, loading } = props;

  const handleLink = id => {
    history.push(`/people/${id}`);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box borderRadius="md" m="5" py="1">
          <Heading fontWeight="bold" fontSize="20px" pb="5">
            Popular People
          </Heading>
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
                      <GridItem key={index}>
                        <Box
                          maxW="sm"
                          borderRadius="lg"
                          overflow="hidden"
                          rounded="lg"
                          boxShadow="lg"
                          bg="white"
                          border
                          height="450"
                        >
                          <Image
                            onClick={() => handleLink(li.id)}
                            cursor="pointer"
                            width="100%"
                            src={`https://image.tmdb.org/t/p/w235_and_h235_face${li.profile_path}`}
                            alt={li.name}
                          />

                          <Box p="6">
                            <Box
                              mt="1"
                              fontWeight="semibold"
                              as="h4"
                              lineHeight="tight"
                              isTruncated
                            >
                              {li.name}
                            </Box>

                            <Box d="flex" mt="2" alignItems="center">
                              <Box
                                as="span"
                                ml="2"
                                color="gray.600"
                                fontSize="sm"
                              >
                                {li.known_for &&
                                Array.isArray(li.known_for) &&
                                li.known_for.length > 0
                                  ? li.known_for.map(item => {
                                      return `${item.original_title ||
                                        item.original_title}, `;
                                    })
                                  : []}
                              </Box>
                            </Box>
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
        </Box>
        <PaginationPage />
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({
  dataSource: state.peoples.dataSource,
  loading: state.peoples.loading
});
export default connect(mapStateToProps)(PopularPeople);
