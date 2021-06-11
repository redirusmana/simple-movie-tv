import { apiGet } from "../../Tools/api";

export const apiAppIndex = "/";
export const apiPeopleIndex = "/person";
export const apiPeoplePopularIndex = "/popular";

export const apiSearchIndex = "/search";
export const apiSearchMultiIndex = "/multi";
export const apiSearchMovieIndex = "/movie";
export const apiSearchTvIndex = "/tv";
export const apiSearchPersonIndex = "/person";

export const apiAppGet = () => {
  const url = `${apiAppIndex}`;
  return apiGet(url);
};

export const apiSearchMultiGet = params => {
  const url = `${apiSearchIndex}${apiSearchMultiIndex}`;
  return apiGet(url, { params });
};
export const apiSearchMovieGet = params => {
  const url = `${apiSearchIndex}${apiSearchMovieIndex}`;
  return apiGet(url, { params });
};
export const apiSearchTvGet = params => {
  const url = `${apiSearchIndex}${apiSearchTvIndex}`;
  return apiGet(url, { params });
};
export const apiSearchPersonGet = params => {
  const url = `${apiSearchIndex}${apiSearchPersonIndex}`;
  return apiGet(url, { params });
};

export const apiPeoplePopularGet = params => {
  const url = `${apiPeopleIndex}${apiPeoplePopularIndex}`;
  return apiGet(url, { params });
};
export const apiPeoplGet = (params, id) => {
  const url = `${apiPeopleIndex}/${id}`;
  return apiGet(url, { params });
};
