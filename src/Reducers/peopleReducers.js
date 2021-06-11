import {
  FETCH_POPULAR_PEOPLE,
  FETCH_LOADING,
  FETCH_PEOPLE,
  FETCH_ACTING
} from "../Actions/Types";

const initialState = {
  dataSource: [],
  people: "",
  acting: "",
  loading: false
};

export const peopleReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_POPULAR_PEOPLE:
      return {
        ...state,
        dataSource: payload
      };
    case FETCH_PEOPLE:
      return {
        ...state,
        people: payload,
        acting: payload
      };
    case FETCH_ACTING:
      return {
        ...state,
        acting: payload
      };
    case FETCH_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
