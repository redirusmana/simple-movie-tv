import React from "react";
import { connect } from "react-redux";
import { Switch, Redirect } from "react-router-dom";
import { CSSReset, ThemeProvider, theme } from "@chakra-ui/react";
import PopularTv from "./Screens/PopularTv";
import TopRatedTv from "./Screens/TopRatedTv";
import OnTheAirTv from "./Screens/OnTheAirTV";
import AiringTodayTv from "./Screens/AiringTodayTv";
import OverviewPage from "./Screens/OverviewPage";
import CastTv from "./Components/CastTv";
import SeasonTv from "./Components/SeasonTv";
import ReviewTv from "./Components/ReviewTv";
import PosterTv from "./Components/PosterTv";
import RoutePrivate from "../../Tools/RoutePrivate";
import Navbar from "../Navbar";

export const Tv = props => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <React.Fragment>
          <Navbar {...props} />
          <Switch>
            <RoutePrivate
              exact
              path="/tv-show/airing-today"
              component={AiringTodayTv}
            />
            <RoutePrivate
              exact
              path="/tv-show/on-the-air"
              component={OnTheAirTv}
            />
            <RoutePrivate
              exact
              path="/tv-show/top-rated"
              component={TopRatedTv}
            />
            <RoutePrivate exact path="/tv-show/popular" component={PopularTv} />
            <RoutePrivate exact path="/tv-show/:id" component={OverviewPage} />
            <RoutePrivate path="/tv-show/:id/cast" component={CastTv} />
            <RoutePrivate path="/tv-show/:id/season" component={SeasonTv} />
            <RoutePrivate path="/tv-show/:id/review" component={ReviewTv} />
            <RoutePrivate path="/tv-show/:id/:type" component={PosterTv} />

            <Redirect to="/tv-show/popular" />
          </Switch>
        </React.Fragment>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(Tv);
