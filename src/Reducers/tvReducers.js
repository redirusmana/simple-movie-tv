import {
  FETCH_TVS,
  FETCH_TV,
  FETCH_EMPTY,
  FETCH_FILTER,
  FETCH_TVS_LOAD,
  FETCH_EMPTY_FILTERS,
  FETCH_PAGES,
  FETCH_TV_CAST
} from "../Actions/Types";

const initialState = {
  dataSource: [],
  tv_show: "",
  tv_cast: "",
  filters: {},
  pages: 1
};

export const tvReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TVS_LOAD:
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
    case FETCH_TVS:
      return {
        ...state,
        dataSource: payload
      };
    case FETCH_TV:
      return {
        ...state,
        tv_show: payload
      };
    case FETCH_TV_CAST:
      return {
        ...state,
        tv_cast: payload
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
