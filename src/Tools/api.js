import axios from "axios";

import { CLIENT_API } from "./general";
const api = axios.create({
  baseURL: CLIENT_API,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(axios.defaults, error => {
  const { message, response } = error;
  if (error.code === "ECONNABORTED") {
    const eTimeout = new Error(
      "Request take longer than expected. Aborting process"
    );
    return Promise.reject(eTimeout);
  }

  if (axios.isCancel(error)) {
    return Promise.reject(new Error("Request is cancelled"));
  }

  let err = message;
  if (response) {
    if (response.data.errors) {
      // eslint-disable-next-line prefer-destructuring
      err = response.data.errors;
      return Promise.reject(err);
    }
    if (response.data.message) {
      err = response.data.message;
    }
  }

  return Promise.reject(new Error(err));
});

export const apiGet = (url, axiosParameters) => api.get(url, axiosParameters);
export const apiPost = (url, data, axiosParameters) =>
  api.post(url, data, axiosParameters);
