import { apiGet } from "../../Tools/api";

export const apiAppIndex = "/";
export const apiTVIndex = "/tv";
export const apiTVDiscoverIndex = "/discover";
export const apiTVPopularIndex = "/popular";
export const apiTVAiringTodayIndex = "/airing_today";
export const apiTVOnTheAirIndex = "/on_the_air";
export const apiTVTopRatedIndex = "/top_rated";

export const apiAppGet = () => {
  const url = `${apiAppIndex}`;
  return apiGet(url);
};

export const apiTVDiscoverGet = params => {
  const url = `${apiTVDiscoverIndex}${apiTVIndex}`;
  return apiGet(url, { params });
};

export const apiTVPopularGet = params => {
  const url = `${apiTVIndex}${apiTVPopularIndex}`;
  return apiGet(url, { params });
};

export const apiTVAiringTodayGet = params => {
  const url = `${apiTVIndex}${apiTVAiringTodayIndex}`;
  return apiGet(url, { params });
};

export const apiTVOnTheAirGet = params => {
  const url = `${apiTVIndex}${apiTVOnTheAirIndex}`;
  return apiGet(url, { params });
};

export const apiTVTopRatedGet = params => {
  const url = `${apiTVIndex}${apiTVTopRatedIndex}`;
  return apiGet(url, { params });
};

export const apiTVGet = (params, id) => {
  const url = `${apiTVIndex}/${id}`;
  return apiGet(url, { params });
};

export const sortDropdown = [
  {
    label: "Sort Asc by Popularity",
    value: "popularity.asc"
  },
  {
    label: "Sort Desc by Popularity",
    value: "popularity.desc"
  },
  {
    label: "Sort Asc by Release Date",
    value: "release_date.asc"
  },
  {
    label: "Sort Desc by Release Date",
    value: "release_date.desc"
  },
  {
    label: "Sort Asc by Rating",
    value: "vote_average.asc"
  },
  {
    label: "Sort Desc by Rating",
    value: "vote_average.desc"
  },
  {
    label: "A - Z",
    value: "original_title.asc"
  },
  {
    label: "Z - A",
    value: "original_title.desc"
  }
];

export const genreArr = [
  { label: "Action", value: 28, checked: false },
  { label: "Adventure", value: 12, checked: false },
  { label: "Animation", value: 16, checked: false },
  { label: "Comedy", value: 35, checked: false },
  { label: "Crime", value: 80, checked: false },
  { label: "Documentary", value: 99, checked: false },
  { label: "Drama", value: 18, checked: false },
  { label: "Family", value: 10751, checked: false },
  { label: "Fantasy", value: 14, checked: false },
  { label: "History", value: 36, checked: false },
  { label: "Horror", value: 27, checked: false },
  { label: "Music", value: 10402, checked: false },
  { label: "Mystery", value: 9648, checked: false },
  { label: "Romance", value: 10749, checked: false },
  { label: "Science", value: 878, checked: false },
  { label: "Fiction", value: 10770, checked: false },
  { label: "Thriller", value: 53, checked: false },
  { label: "War", value: 10752, checked: false },
  { label: "Western", value: 37, checked: false }
];
