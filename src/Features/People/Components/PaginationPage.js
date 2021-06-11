import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  CSSReset,
  ThemeProvider,
  theme,
  Box,
  Flex,
  Button,
  Text
} from "@chakra-ui/react";
import { FETCH_POPULAR_PEOPLE } from "../../../Actions/Types";
import { apiPeoplePopularGet } from "../action";

export const PaginationPage = props => {
  const [pages, setPages] = useState({
    page: 1,
    api_key: "9fb464885aa2556a6049224563c3f671"
  });

  const handlePageChange = page => {
    setPages({
      ...pages,
      page
    });
  };

  const getPopularPeopleIndex = async () => {
    try {
      const response = await apiPeoplePopularGet(pages);
      const { data } = response;
      props.fetchDataSource(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPopularPeopleIndex();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages]);

  const { dataSource } = props;

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box m="5" spacing="8" p="1">
          {dataSource && (
            <React.Fragment>
              <Flex w="100%" justifyContent="center" alignItems="center">
                {dataSource.page - 6 > 0 && (
                  <Button variant="link" onClick={() => handlePageChange(1)}>
                    First
                  </Button>
                )}
                {dataSource.page !== 1 && (
                  <Button
                    variant="link"
                    onClick={() => handlePageChange(dataSource.page - 1)}
                  >
                    Previous
                  </Button>
                )}

                {dataSource.page - 2 > 0 && (
                  <Button
                    variant="link"
                    onClick={() => handlePageChange(dataSource.page - 2)}
                  >
                    {dataSource.page - 2}
                  </Button>
                )}
                {dataSource.page - 1 > 0 && (
                  <Button
                    variant="link"
                    onClick={() => handlePageChange(dataSource.page - 1)}
                  >
                    {dataSource.page - 1}
                  </Button>
                )}

                {dataSource.page && (
                  <Button variant="link">
                    <Text as="u">{dataSource.page}</Text>
                  </Button>
                )}

                {dataSource.page + 1 < dataSource.total_pages && (
                  <Button
                    variant="link"
                    onClick={() => handlePageChange(dataSource.page + 1)}
                  >
                    {dataSource.page + 1}
                  </Button>
                )}
                {dataSource.page + 2 < dataSource.total_pages && (
                  <Button
                    variant="link"
                    onClick={() => handlePageChange(dataSource.page + 2)}
                  >
                    {dataSource.page + 2}
                  </Button>
                )}

                {dataSource.page !== dataSource.total_pages && (
                  <Button
                    variant="link"
                    onClick={() => handlePageChange(dataSource.page + 1)}
                  >
                    Next
                  </Button>
                )}
                {dataSource.page + 6 < dataSource.total_pages && (
                  <Button
                    variant="link"
                    onClick={() => handlePageChange(dataSource.total_pages)}
                  >
                    Last
                  </Button>
                )}
              </Flex>
            </React.Fragment>
          )}
        </Box>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({
  dataSource: state.peoples.dataSource
});

const mapDispatchToProps = dispatch => ({
  fetchDataSource: payload =>
    dispatch({
      type: FETCH_POPULAR_PEOPLE,
      payload
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(PaginationPage);
