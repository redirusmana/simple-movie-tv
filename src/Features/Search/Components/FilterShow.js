import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  CSSReset,
  ThemeProvider,
  theme,
  Box,
  Text,
  Flex,
  Divider,
  List,
  ListItem,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react";
import {
  apiSearchMultiGet,
  apiSearchMovieGet,
  apiSearchTvGet,
  apiSearchPersonGet
} from "../action";
import { FETCH_SEARCH, FETCH_EMPTY } from "../../../Actions/Types";

export const FilterShow = props => {
  const { page } = props;
  const [searchValue, setSearchValue] = useState({
    query: ""
  });
  const [filterShow, setFilter] = useState({
    multi: true,
    movie: false,
    tv_show: false,
    people: false
  });
  const [typingTimeout, setTypingTimeout] = useState(0);

  const handleFilter = name => {
    const falseValue = {
      multi: false,
      movie: false,
      tv_show: false,
      people: false
    };
    setFilter({
      ...falseValue,
      [name]: true
    });
  };

  const onChangeSearch = async value => {
    getSearchIndex(value);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setSearchValue({ [name]: value });
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      // eslint-disable-next-line func-names
      setTimeout(function() {
        onChangeSearch(value);
      }, 800)
    );
  };

  const getSearchIndex = async value => {
    try {
      let response;
      if (filterShow.movie) {
        response = await apiSearchMovieGet({
          page,
          api_key: "9fb464885aa2556a6049224563c3f671",
          query: value || searchValue.query
        });
      } else if (filterShow.tv_show) {
        response = await apiSearchTvGet({
          page,
          api_key: "9fb464885aa2556a6049224563c3f671",
          query: value || searchValue.query
        });
      } else if (filterShow.people) {
        response = await apiSearchPersonGet({
          page,
          api_key: "9fb464885aa2556a6049224563c3f671",
          query: value || searchValue.query
        });
      } else {
        response = await apiSearchMultiGet({
          page,
          api_key: "9fb464885aa2556a6049224563c3f671",
          query: value || searchValue.query
        });
      }
      const { data } = response;
      props.fetchDataSource(data);
    } catch (e) {
      console.log(e);
      props.fetchEmpty();
    }
  };

  useEffect(() => {
    props.fetchEmpty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (page > 0) {
      getSearchIndex();
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterShow]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <React.Fragment>
          <Box
            border
            p="3"
            bg="white"
            borderRadius="lg"
            rounded="lg"
            boxShadow="lg"
            mb="3"
          >
            <FormControl>
              <FormLabel fontWeight="bold" fontSize="20">
                Search
              </FormLabel>
              <Input
                type="text"
                name="query"
                onChange={handleChange}
                size="sm"
                borderRadius="5px"
                borderWidth="1"
                borderColor="gray.400"
                bg="white"
                value={searchValue.query}
              />
            </FormControl>
          </Box>

          <Box
            border
            py="3"
            bg="white"
            borderRadius="lg"
            rounded="lg"
            boxShadow="lg"
          >
            <Text fontSize="19" fontWeight="bold" px="3">
              Search Result
            </Text>
            <Divider my="3" />
            <List>
              <Flex
                as={ListItem}
                cursor="pointer"
                _hover={{ bg: "lightGrey" }}
                onClick={() => handleFilter("multi")}
                bg={filterShow.multi ? "lightGrey" : "white"}
                w="100%"
                alignItems="center"
                justifyContent="space-between"
                rounded={false}
                py="4"
              >
                <Box ml="3" fontSize="18px">
                  All
                </Box>
                <Box mr="3" fontSize="18px" color="grey"></Box>
              </Flex>

              <Flex
                as={ListItem}
                cursor="pointer"
                _hover={{ bg: "lightGrey" }}
                onClick={() => handleFilter("movie")}
                bg={filterShow.movie ? "lightGrey" : "white"}
                w="100%"
                alignItems="center"
                justifyContent="space-between"
                rounded={false}
                py="4"
              >
                <Box ml="3" fontSize="18px">
                  Movies
                </Box>
                <Box mr="3" fontSize="18px" color="grey"></Box>
              </Flex>

              <Flex
                as={ListItem}
                cursor="pointer"
                _hover={{ bg: "lightGrey" }}
                onClick={() => handleFilter("tv_show")}
                bg={filterShow.tv_show ? "lightGrey" : "white"}
                w="100%"
                alignItems="center"
                justifyContent="space-between"
                rounded={false}
                py="4"
              >
                <Box ml="3" fontSize="18px">
                  TV Shows
                </Box>
                <Box mr="3" fontSize="18px" color="grey"></Box>
              </Flex>

              <Flex
                as={ListItem}
                cursor="pointer"
                onClick={() => handleFilter("people")}
                _hover={{ bg: "lightGrey" }}
                bg={filterShow.people ? "lightGrey" : "white"}
                w="100%"
                alignItems="center"
                justifyContent="space-between"
                rounded={false}
                py="4"
              >
                <Box ml="3" fontSize="18px">
                  Peoples
                </Box>
                <Box mr="3" fontSize="18px" color="grey"></Box>
              </Flex>
            </List>
          </Box>
        </React.Fragment>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({
  dataSource: state.searchs.dataSource,
  loading: state.searchs.loading,
  page: state.searchs.page
});
const mapDispatchToProps = dispatch => ({
  fetchDataSource: payload =>
    dispatch({
      type: FETCH_SEARCH,
      payload
    }),
  fetchEmpty: () =>
    dispatch({
      type: FETCH_EMPTY
    })
});
export default connect(mapStateToProps, mapDispatchToProps)(FilterShow);
