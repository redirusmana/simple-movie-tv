import React from "react";
import { connect } from "react-redux";
import { CSSReset, ThemeProvider, theme, Box, Button } from "@chakra-ui/react";
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
        <Box my="5" spacing="8" py="1">
          {props &&
            dataSource &&
            dataSource.results &&
            dataSource.results.length > 0 &&
            dataSource.results.length < dataSource.total_results && (
              <React.Fragment>
                <Button
                  colorScheme="blue"
                  isFullWidth
                  size="sm"
                  onClick={() => handlePageChange(dataSource.page + 1)}
                >
                  Load More
                </Button>
              </React.Fragment>
            )}
        </Box>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({
  dataSource: state.tvs.dataSource
});

const mapDispatchToProps = dispatch => ({
  setPageProps: payload => dispatch({ type: FETCH_PAGES, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(PaginationPage);
