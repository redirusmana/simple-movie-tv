import { apiGet, apiPost } from "../../Tools/api";

export const apiAppIndex = "/authentication/token";
export const apiPostLoginIndex = "/validate_with_login";
export const apiGetRequestTokenIndex = "/new";

export const apiAppGet = () => {
  const url = `${apiAppIndex}`;
  return apiGet(url);
};

export const apiRequestTokenGet = params => {
  const url = `${apiAppIndex}${apiGetRequestTokenIndex}`;
  return apiGet(url, { params });
};

export const apiLoginPost = (data, params) => {
  const url = `${apiAppIndex}${apiPostLoginIndex}`;
  return apiPost(url, data, { params });
};
