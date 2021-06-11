import { FETCH_LOGIN } from "../Actions/Types";

const initialState = {
  session: "",
  token: ""
};

export const authReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_LOGIN:
      return {
        ...state,
        session: payload,
        token: payload
      };
    default:
      return state;
  }
};
