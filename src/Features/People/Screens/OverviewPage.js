import React, { useEffect } from "react";
import { connect } from "react-redux";
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
  Td
} from "@chakra-ui/react";
import { apiPeoplGet } from "../action";
import { FETCH_PEOPLE } from "../../../Actions/Types";
import ActingList from "../Components/ActingList";

export const OverviewPage = props => {
  const { people, match, history } = props;
  const getPersonShow = async () => {
    try {
      const response = await apiPeoplGet(
        {
          api_key: "9fb464885aa2556a6049224563c3f671",
          append_to_response: "combined_credits,external_ids"
        },
        match.params.id
      );
      const { data } = response;
      props.PeopleDataSource(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPersonShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLink = (media, id) => {
    history.push(`/${media}/${id}`);
  };

  const calculate_age = dob => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);

    return Math.abs(age.getUTCFullYear() - 1970);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box borderRadius="md" mx="5" py="1">
          {people && (
            <Grid templateColumns="repeat(4, 1fr)" gap={4} px={0} m="5">
              <GridItem>
                <Box
                  maxW="sm"
                  borderRadius="lg"
                  overflow="hidden"
                  rounded="lg"
                  boxShadow="lg"
                  bg="white"
                  border
                >
                  <Image
                    width="100%"
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${people.profile_path}`}
                    alt={people.profile_path}
                  />
                </Box>
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
                    Known For
                  </Text>
                  <Text>{people.known_for_department}</Text>
                  <br />
                  <Text fontWeight="bold">Gender</Text>
                  <Text>{people.gender === 2 ? "Male" : "Female"}</Text>
                  <br />
                  <Text fontWeight="bold">Birthday</Text>
                  <Text>
                    {people.birthday},( {calculate_age(people.birthday)} years
                    old)
                  </Text>
                  <br />
                  <Text fontWeight="bold">Place of Birth</Text>
                  <Text>{people.place_of_birth}</Text>
                  <br />
                  <Text fontWeight="bold">Also Known As</Text>
                  {people.also_known_as &&
                  Array.isArray(people.also_known_as) &&
                  people.also_known_as.length > 0
                    ? people.also_known_as.map(item => {
                        return <Text key={item}>{item}</Text>;
                      })
                    : []}
                  <br />
                </Box>
              </GridItem>
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
                  <Text fontWeight="bold" fontSize="36">
                    {people.name}
                  </Text>
                  <Text mt="4" fontWeight="bold">
                    Biography
                  </Text>
                  <Text mt="2">{people.biography}</Text>

                  <Text mt="4" fontWeight="bold">
                    Known For
                  </Text>

                  <Box overflowX="auto">
                    <Table size="sm">
                      <Tbody>
                        <Tr>
                          {people &&
                          people.combined_credits.cast &&
                          Array.isArray(people.combined_credits.cast) &&
                          people.combined_credits.cast.length > 0
                            ? people.combined_credits.cast
                                .slice(
                                  people.combined_credits.cast.length - 6,
                                  people.combined_credits.cast.length
                                )
                                .map((item, index) => {
                                  const media =
                                    item.media_type === "tv"
                                      ? "tv-show"
                                      : "movie";
                                  return (
                                    <React.Fragment key={index}>
                                      <Td
                                        onClick={() =>
                                          handleLink(media, item.id)
                                        }
                                        cursor="pointer"
                                      >
                                        <Box
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
                                            src={
                                              item.poster_path
                                                ? `https://image.tmdb.org/t/p/w150_and_h225_bestv2${item.poster_path}`
                                                : `${window.location.origin}/blank.jpg`
                                            }
                                            alt={
                                              item.title || item.original_name
                                            }
                                          />
                                          <Text
                                            fontSize="12px"
                                            textAlign="center"
                                          >
                                            {item.title || item.original_name}
                                          </Text>
                                        </Box>
                                      </Td>
                                    </React.Fragment>
                                  );
                                })
                            : []}
                        </Tr>
                      </Tbody>
                    </Table>
                  </Box>
                  <ActingList match={props.match} history={props.history} />
                </Box>
              </GridItem>
            </Grid>
          )}
        </Box>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({
  people: state.peoples.people
});

const mapDispatchToProps = dispatch => ({
  PeopleDataSource: payload =>
    dispatch({
      type: FETCH_PEOPLE,
      payload
    })
});
export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage);
