import React from "react";
import { connect } from "react-redux";
import { Switch, Redirect } from "react-router-dom";
import { CSSReset, ThemeProvider, theme } from "@chakra-ui/react";
import CastMovie from "./Components/CastMovie";
import ReviewMovie from "./Components/ReviewMovie";
import PosterMovie from "./Components/PosterMovie";
import PopularMovie from "./Screens/PopularMovie";
import NowPlayingMovie from "./Screens/NowPlayingMovie";
import UpcomingMovie from "./Screens/UpcomingMovie";
import TopRatedMovie from "./Screens/TopRatedMovie";
import OverviewPage from "./Screens/OverviewPage";
import RoutePrivate from "../../Tools/RoutePrivate";
import Navbar from "../Navbar";

export const Movie = props => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Navbar {...props} />
        <React.Fragment>
          <Switch>
            <RoutePrivate
              exact
              path="/movie/popular"
              component={PopularMovie}
            />
            <RoutePrivate
              exact
              path="/movie/now-playing"
              component={NowPlayingMovie}
            />
            <RoutePrivate
              exact
              path="/movie/upcoming"
              component={UpcomingMovie}
            />
            <RoutePrivate
              exact
              path="/movie/top-rated"
              component={TopRatedMovie}
            />
            <RoutePrivate exact path="/movie/:id" component={OverviewPage} />
            <RoutePrivate path="/movie/:id/cast" component={CastMovie} />
            <RoutePrivate path="/movie/:id/review" component={ReviewMovie} />
            <RoutePrivate path="/movie/:id/:type" component={PosterMovie} />

            <Redirect to="/movie/popular" />
          </Switch>
        </React.Fragment>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(Movie);
