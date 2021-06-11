import { combineReducers } from "redux";
import { peopleReducers } from "./peopleReducers";
import { tvReducers } from "./tvReducers";
import { movieReducers } from "./movieReducers";
import { authReducers } from "./authReducers";
import { searchReducers } from "./searchReducers";

export default combineReducers({
  peoples: peopleReducers,
  tvs: tvReducers,
  movies: movieReducers,
  auths: authReducers,
  searchs: searchReducers
});
