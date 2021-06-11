import React from "react";
import { connect } from "react-redux";
import { Switch, Redirect } from "react-router-dom";
import { CSSReset, ThemeProvider, theme } from "@chakra-ui/react";
import OverviewPage from "./Screens/OverviewPage";
import PopularPeople from "./Screens/PopularPeople";
import RoutePrivate from "../../Tools/RoutePrivate";
import Navbar from "../Navbar";

export const People = props => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <React.Fragment>
          <Navbar {...props} />
          <Switch>
            <RoutePrivate
              exact
              path="/people/popular"
              component={PopularPeople}
            />
            <RoutePrivate path="/people/:id" component={OverviewPage} />
            <Redirect to="/people/popular" />
          </Switch>
        </React.Fragment>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(People);
