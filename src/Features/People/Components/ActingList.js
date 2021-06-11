import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  CSSReset,
  ThemeProvider,
  theme,
  Box,
  Text,
  Flex,
  Select,
  FormControl,
  Divider
} from "@chakra-ui/react";
import { apiPeoplGet } from "../action";
import { FETCH_ACTING } from "../../../Actions/Types";

export const ActingList = props => {
  const [filterValue, setFilterValue] = useState({ category: "" });
  const { acting, match, history } = props;

  const onSelectChange = event => {
    const { name, value } = event.target;
    setFilterValue({ [name]: value });
    if (!value) {
      setFilterValue({ ...filterValue, [name]: "combined_credits" });
    }
  };

  const handleLink = (media, id) => {
    history.push(`/${media}/${id}`);
  };

  const getPersonShow = async () => {
    try {
      const response = await apiPeoplGet(
        {
          api_key: "9fb464885aa2556a6049224563c3f671",
          append_to_response: filterValue.category
        },
        match.params.id
      );
      const { data } = response;
      props.ActingDataSource(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (filterValue.category) {
      getPersonShow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue.category]);
  let renderAct;
  if (filterValue.category === "movie_credits") {
    renderAct =
      props &&
      acting &&
      acting.movie_credits &&
      acting.movie_credits.cast &&
      Array.isArray(acting.movie_credits.cast) &&
      acting.movie_credits.cast.length > 0
        ? acting.movie_credits.cast.map((item, index) => {
            const media = item.media_type === "tv" ? "tv-show" : "movie";
            return (
              <React.Fragment key={index}>
                <Box
                  m="3"
                  cursor="pointer"
                  onClick={() => handleLink(media, item.id)}
                >
                  <Text textAlign="left">
                    {" "}
                    {item.release_date || " ////-//-// "}{" "}
                    <b>
                      {item.title || item.original_title || item.original_name}
                    </b>{" "}
                    as {item.character || " - "}
                  </Text>
                  <Divider />
                </Box>
              </React.Fragment>
            );
          })
        : [];
  } else if (filterValue.category === "tv_credits") {
    renderAct =
      props &&
      acting &&
      acting.tv_credits &&
      acting.tv_credits.cast &&
      Array.isArray(acting.tv_credits.cast) &&
      acting.tv_credits.cast.length > 0
        ? acting.tv_credits.cast.map((item, index) => {
            const media = item.media_type === "tv" ? "tv-show" : "movie";
            return (
              <React.Fragment key={index}>
                <Box
                  m="3"
                  cursor="pointer"
                  onClick={() => handleLink(media, item.id)}
                >
                  <Text textAlign="left">
                    {" "}
                    {item.release_date ||
                      item.first_air_date ||
                      " ////-//-// "}{" "}
                    <b>
                      {" "}
                      {item.title || item.original_title || item.original_name}
                    </b>{" "}
                    as {item.character || " - "}
                  </Text>
                  <Divider />
                </Box>
              </React.Fragment>
            );
          })
        : [];
  } else {
    renderAct =
      props &&
      acting &&
      acting.combined_credits &&
      acting.combined_credits.cast &&
      Array.isArray(acting.combined_credits.cast) &&
      acting.combined_credits.cast.length > 0
        ? acting.combined_credits.cast.map((item, index) => {
            const media = item.media_type === "tv" ? "tv-show" : "movie";
            return (
              <React.Fragment key={index}>
                <Box
                  m="3"
                  cursor="pointer"
                  onClick={() => handleLink(media, item.id)}
                >
                  <Text textAlign="left">
                    {item.release_date || " ////-//-// "}{" "}
                    <b>
                      {item.title || item.original_title || item.original_name}
                    </b>{" "}
                    as {item.character || " - "}
                  </Text>
                  <Divider />
                </Box>
              </React.Fragment>
            );
          })
        : [];
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box borderRadius="md" mx="5" py="1">
          <Flex w="100%" alignItems="center" justifyContent="space-between">
            <Box>
              <Text fontWeight="bold" fontSize="24">
                Acting
              </Text>
            </Box>
            <Box>
              <FormControl>
                <Select
                  bg="white"
                  id="category"
                  name="category"
                  borderWidth="1"
                  placeholder="All"
                  borderColor="gray.400"
                  value={filterValue.category}
                  onChange={onSelectChange}
                >
                  <option value="movie_credits">Movies</option>
                  <option value="tv_credits">TV</option>
                </Select>
              </FormControl>
            </Box>
          </Flex>

          <Box>{renderAct}</Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({
  acting: state.peoples.acting
});

const mapDispatchToProps = dispatch => ({
  ActingDataSource: payload =>
    dispatch({
      type: FETCH_ACTING,
      payload
    })
});
export default connect(mapStateToProps, mapDispatchToProps)(ActingList);
