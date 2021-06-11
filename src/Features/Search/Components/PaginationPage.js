import React from "react";
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
import { FETCH_PAGES } from "../../../Actions/Types";

export const PaginationPage = props => {
  const handlePageChange = page => {
    props.setPageProps(page);
  };

  const { dataSource } = props;

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box m="5" spacing="8" p="1">
          {dataSource && dataSource.total_results > 10 && (
            <React.Fragment>
              <Flex w="100%" justifyContent="center" alignItems="center">
                {dataSource.page - 4 > 0 && (
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
                {dataSource.page + 4 < dataSource.total_pages && (
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
  dataSource: state.searchs.dataSource,
  page: state.searchs.page
});

const mapDispatchToProps = dispatch => ({
  setPageProps: payload => dispatch({ type: FETCH_PAGES, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(PaginationPage);
