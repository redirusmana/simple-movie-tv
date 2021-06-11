import { FETCH_SEARCH, FETCH_PAGES, FETCH_EMPTY } from "../Actions/Types";

const initialState = {
  dataSource: [],
  page: 1
};

export const searchReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SEARCH:
      return {
        ...state,
        dataSource: payload
      };
    case FETCH_PAGES:
      return {
        ...state,
        page: payload
      };
    case FETCH_EMPTY:
      return {
        ...state,
        dataSource: [],
        page: 1
      };
    default:
      return state;
  }
};
