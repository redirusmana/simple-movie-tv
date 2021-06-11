import React from "react";
import { connect } from "react-redux";
import { Switch, Redirect } from "react-router-dom";
import { CSSReset, ThemeProvider, theme } from "@chakra-ui/react";
import SearchScreen from "./Screens/SearchScreen";
import RoutePrivate from "../../Tools/RoutePrivate";
import Navbar from "../Navbar";

export const Search = props => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <React.Fragment>
          <Navbar {...props} />
          <Switch>
            <RoutePrivate exact path="/search" component={SearchScreen} />
            <Redirect to="/search" />
          </Switch>
        </React.Fragment>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(Search);
