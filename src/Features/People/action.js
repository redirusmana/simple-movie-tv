import { apiGet } from "../../Tools/api";

export const apiAppIndex = "/";
export const apiPeopleIndex = "/person";
export const apiPeoplePopularIndex = "/popular";

export const apiAppGet = () => {
  const url = `${apiAppIndex}`;
  return apiGet(url);
};

export const apiPeoplePopularGet = params => {
  const url = `${apiPeopleIndex}${apiPeoplePopularIndex}`;
  return apiGet(url, { params });
};

export const apiPeoplGet = (params, id) => {
  const url = `${apiPeopleIndex}/${id}`;
  return apiGet(url, { params });
};
