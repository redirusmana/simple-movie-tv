import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  CSSReset,
  ThemeProvider,
  theme,
  Box,
  Button,
  Heading,
  Divider,
  FormControl,
  Select,
  Input,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Checkbox
} from "@chakra-ui/react";
import {
  FETCH_TVS,
  FETCH_FILTER,
  FETCH_EMPTY_FILTERS,
  FETCH_TVS_LOAD,
  FETCH_EMPTY
} from "../../../Actions/Types";
import {
  sortDropdown,
  apiTVDiscoverGet,
  genreArr,
  apiTVPopularGet,
  apiTVAiringTodayGet,
  apiTVOnTheAirGet,
  apiTVTopRatedGet
} from "../action";

export const FilterationPage = props => {
  const [listGenres, setListGenres] = useState(genreArr);
  const [filterState, setFilterState] = useState({
    api_key: "9fb464885aa2556a6049224563c3f671",
    page: 1
    // language: "en-US",
    // certification_country: "ID",
    // ott_region: "ID",
    // with_watch_monetization_types: "flatrate",
    // dayjs()
    //   .locale("id")
    //   .format("YYYY-MM-DD"),
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setFilterState({ ...filterState, [name]: value });
  };

  const handleSlider = (name, value) => {
    setFilterState({ ...filterState, [name]: value });
  };

  const handleChangeBox = (event, index) => {
    const { checked } = event.target;
    let temp = [...listGenres];
    temp[index].checked = checked;
    setListGenres([...temp]);
  };

  const getMovieLoad = async pathname => {
    try {
      let response;
      if (pathname === "/tv-show/popular") {
        if (props.filters && Object.keys(props.filters).length > 0) {
          response = await apiTVDiscoverGet({
            ...props.filters,
            page: props.pages
          });
        } else {
          response = await apiTVPopularGet({
            page: props.pages,
            api_key: filterState.api_key
          });
        }
      } else if (pathname === "/tv-show/airing-today") {
        if (props.filters && Object.keys(props.filters).length > 0) {
          response = await apiTVDiscoverGet({
            ...props.filters,
            page: props.pages
          });
        } else {
          response = await apiTVAiringTodayGet({
            page: props.pages,
            api_key: filterState.api_key
          });
        }
      } else if (pathname === "/tv-show/on-the-air") {
        if (props.filters && Object.keys(props.filters).length > 0) {
          response = await apiTVDiscoverGet({
            ...props.filters,
            page: props.pages
          });
        } else {
          response = await apiTVOnTheAirGet({
            page: props.pages,
            api_key: filterState.api_key
          });
        }
      } else if (pathname === "/tv-show/top-rated") {
        if (props.filters && Object.keys(props.filters).length > 0) {
          response = await apiTVDiscoverGet({
            ...props.filters,
            page: props.pages
          });
        } else {
          response = await apiTVTopRatedGet({
            page: props.pages,
            api_key: filterState.api_key
          });
        }
      }
      props.fetchDataLoad(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getMovieDiscoverIndex = async pathname => {
    try {
      let response;
      if (pathname === "/tv-show/popular") {
        if (props.filters && Object.keys(props.filters).length > 0) {
          response = await apiTVDiscoverGet(props.filters);
        } else {
          response = await apiTVPopularGet({
            api_key: filterState.api_key,
            page: 1
          });
        }
      } else if (pathname === "/tv-show/airing-today") {
        if (props.filters && Object.keys(props.filters).length > 0) {
          response = await apiTVDiscoverGet(props.filters);
        } else {
          response = await apiTVAiringTodayGet({
            api_key: filterState.api_key,
            page: 1
          });
        }
      } else if (pathname === "/tv-show/on-the-air") {
        if (props.filters && Object.keys(props.filters).length > 0) {
          response = await apiTVDiscoverGet(props.filters);
        } else {
          response = await apiTVOnTheAirGet({
            api_key: filterState.api_key,
            page: 1
          });
        }
      } else if (pathname === "/tv-show/top-rated") {
        if (props.filters && Object.keys(props.filters).length > 0) {
          response = await apiTVDiscoverGet(props.filters);
        } else {
          response = await apiTVTopRatedGet({
            api_key: filterState.api_key,
            page: 1
          });
        }
      }
      props.fetchDataSource(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = () => {
    let genreTemp = "";
    Object.keys(listGenres).forEach(item => {
      if (listGenres[item].checked) {
        genreTemp += `${listGenres[item].value},`;
      }
    });
    props.setFilterProps({
      ...filterState,
      with_genres: genreTemp || undefined
    });
  };

  const handleRemove = () => {
    setFilterState({
      api_key: "9fb464885aa2556a6049224563c3f671",
      page: 1
    });
    let temp = [...listGenres];
    Object.keys(listGenres).forEach(item => {
      if (listGenres[item].checked) {
        temp[item].checked = false;
      }
    });
    setListGenres([...temp]);
    props.fetchEmptyFilter();
  };

  useEffect(() => {
    props.fetchEmpty();
    handleRemove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getMovieDiscoverIndex(props.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.filters]);
  useEffect(() => {
    if (props.pages > 1) {
      getMovieLoad(props.location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pages]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box
          p="5"
          pb="0"
          maxW="sm"
          borderRadius="lg"
          overflow="hidden"
          rounded="lg"
          boxShadow="lg"
          bg="white"
          border
        >
          <Heading fontSize="20px">Sort</Heading>
          <Divider mt="2" />
          <Box my="3">
            <FormControl>
              <Select
                bg="white"
                id="sort_by"
                name="sort_by"
                borderWidth="1"
                placeholder="Sort By"
                borderColor="gray.400"
                onChange={handleChange}
                value={filterState.sort_by || ""}
              >
                {sortDropdown.map(item => {
                  return (
                    <option
                      key={`${item.value} - ${item.label}`}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <br />
        </Box>

        <Box
          my="3"
          p="5"
          pb="0"
          maxW="sm"
          borderRadius="lg"
          overflow="hidden"
          rounded="lg"
          boxShadow="lg"
          bg="white"
          border
        >
          <Heading fontSize="20px">Filter</Heading>
          <Divider mt="2" />
          <Box my="3">
            <FormControl my="2">
              <FormLabel>From :</FormLabel>
              <Input
                type="date"
                name="release_date.gte"
                onChange={handleChange}
                size="sm"
                borderRadius="5px"
                borderWidth="1"
                borderColor="gray.400"
                bg="white"
                value={filterState["release_date.gte"] || ""}
              />
            </FormControl>
            <FormControl my="2">
              <FormLabel>To : </FormLabel>
              <Input
                type="date"
                name="release_date.lte"
                onChange={handleChange}
                size="sm"
                borderRadius="5px"
                borderWidth="1"
                borderColor="gray.400"
                bg="white"
                value={filterState["release_date.lte"] || ""}
              />
            </FormControl>
          </Box>

          <Divider my="4" />

          <Box>
            <FormControl>
              <FormLabel>Genres</FormLabel>
              {listGenres.length > 0 &&
                listGenres.map((item, index) => {
                  return (
                    <Checkbox
                      key={`${item.label} - ${item.value} - ${index}`}
                      name={item.value}
                      colorScheme="blue"
                      borderWidth="1"
                      borderColor="grey"
                      m="1"
                      p="1"
                      onChange={event => handleChangeBox(event, index)}
                      isChecked={item.checked}
                    >
                      {item.label}
                    </Checkbox>
                  );
                })}
            </FormControl>
          </Box>

          <Divider my="4" />

          <Box>
            <FormControl>
              <FormLabel>User Score</FormLabel>
              {filterState["vote_average.lte"] && (
                <React.Fragment>
                  <Slider
                    aria-label="slider-ex-5"
                    name="vote_average.gte"
                    min={0}
                    max={filterState["vote_average.lte"]}
                    onChangeEnd={v => handleSlider("vote_average.gte", v)}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb style={{ background: "#1a365d" }} />
                  </Slider>
                </React.Fragment>
              )}

              <React.Fragment>
                <Slider
                  aria-label="slider-ex-5"
                  name="vote_average.lte"
                  min={filterState["vote_average.gte"]}
                  max={10}
                  onChangeEnd={v => handleSlider("vote_average.lte", v)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb style={{ background: "#1a365d" }} />
                </Slider>
                <FormLabel textAlign="center">
                  {filterState["vote_average.gte"]} -{" "}
                  {filterState["vote_average.lte"]}
                </FormLabel>
              </React.Fragment>
            </FormControl>
          </Box>

          <Divider my="4" />

          <Box>
            <FormControl>
              <FormLabel>Minimum User Vote</FormLabel>
              <Slider
                step={50}
                aria-label="slider-ex-5"
                name="vote_count.gte"
                min={0}
                max={500}
                onChangeEnd={v => handleSlider("vote_count.gte", v)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb style={{ background: "#1a365d" }} />
              </Slider>
              <FormLabel textAlign="center">
                {filterState["vote_count.gte"]}
              </FormLabel>
            </FormControl>
          </Box>

          <Divider my="4" />

          <Box>
            <FormControl>
              <FormLabel>Runtime</FormLabel>
              {filterState["with_runtime.lte"] && (
                <React.Fragment>
                  <Slider
                    aria-label="slider-ex-5"
                    name="with_runtime.gte"
                    step={5}
                    min={0}
                    max={filterState["with_runtime.lte"]}
                    onChangeEnd={v => handleSlider("with_runtime.gte", v)}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb style={{ background: "#1a365d" }} />
                  </Slider>
                </React.Fragment>
              )}

              <React.Fragment>
                <Slider
                  aria-label="slider-ex-5"
                  name="with_runtime.lte"
                  step={5}
                  min={filterState["with_runtime.gte"]}
                  max={400}
                  onChangeEnd={v => handleSlider("with_runtime.lte", v)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb style={{ background: "#1a365d" }} />
                </Slider>
                <FormLabel textAlign="center">
                  {filterState["with_runtime.gte"]} -{" "}
                  {filterState["with_runtime.lte"]}
                </FormLabel>
              </React.Fragment>
            </FormControl>
          </Box>
          <br />
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
          <Button
            colorScheme="blue"
            isFullWidth
            size="sm"
            onClick={handleSearch}
            mb="2"
          >
            Search
          </Button>

          {props.filters && Object.keys(props.filters).length > 0 && (
            <Button
              colorScheme="red"
              isFullWidth
              size="sm"
              onClick={handleRemove}
            >
              Remove All Filters
            </Button>
          )}
        </Box>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({
  dataSource: state.tvs.dataSource,
  filters: state.tvs.filters,
  pages: state.tvs.pages
});

const mapDispatchToProps = dispatch => ({
  setFilterProps: payload => dispatch({ type: FETCH_FILTER, payload }),
  fetchDataLoad: payload =>
    dispatch({
      type: FETCH_TVS_LOAD,
      payload
    }),
  fetchDataSource: payload =>
    dispatch({
      type: FETCH_TVS,
      payload
    }),
  fetchEmpty: () =>
    dispatch({
      type: FETCH_EMPTY
    }),
  fetchEmptyFilter: () =>
    dispatch({
      type: FETCH_EMPTY_FILTERS
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterationPage);
