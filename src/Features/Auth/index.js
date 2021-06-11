import React from "react";
import { connect } from "react-redux";
import { Switch, Redirect } from "react-router-dom";
import { CSSReset, ThemeProvider, theme } from "@chakra-ui/react";
import LoginPage from "./Screens/LoginPage";
import RouteGuard from "../../Tools/RouteGuard";

export const Auth = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <React.Fragment>
          <Switch>
            <RouteGuard path="/auth/login" component={LoginPage} />
            <Redirect to="/auth/login" />
          </Switch>
        </React.Fragment>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(Auth);
