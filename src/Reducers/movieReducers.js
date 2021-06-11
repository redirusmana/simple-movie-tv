import {
  FETCH_MOVIES,
  FETCH_MOVIE,
  FETCH_EMPTY,
  FETCH_FILTER,
  FETCH_MOVIES_LOAD,
  FETCH_EMPTY_FILTERS,
  FETCH_MOVIE_CAST,
  FETCH_PAGES
} from "../Actions/Types";

const initialState = {
  dataSource: [],
  movie: "",
  movie_cast: "",
  filters: {},
  pages: 1
};

export const movieReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_MOVIES_LOAD:
      return {
        ...state,
        dataSource:
          state.dataSource &&
          state.dataSource.results &&
          state.dataSource.results.length > 0
            ? {
                ...payload,
                results: [...state.dataSource.results, ...payload.results]
              }
            : payload
      };
    case FETCH_MOVIES:
      return {
        ...state,
        dataSource: payload
      };
    case FETCH_MOVIE:
      return {
        ...state,
        movie: payload
      };
    case FETCH_MOVIE_CAST:
      return {
        ...state,
        movie_cast: payload
      };
    case FETCH_FILTER:
      return {
        ...state,
        filters: { ...state.filters, ...payload }
      };
    case FETCH_PAGES:
      return {
        ...state,
        pages: payload
      };
    case FETCH_EMPTY:
      return {
        ...state,
        dataSource: []
      };
    case FETCH_EMPTY_FILTERS:
      return {
        ...state,
        filters: {},
        pages: 1
      };
    default:
      return state;
  }
};
