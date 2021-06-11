import { apiGet } from "../../Tools/api";

export const apiAppIndex = "/";
export const apiMovieIndex = "/movie";
export const apiMovieDiscoverIndex = "/discover";
export const apiMoviePopularIndex = "/popular";
export const apiMovieNowPlayingIndex = "/now_playing";
export const apiMovieUpcomingIndex = "/upcoming";
export const apiMovieTopRatedIndex = "/top_rated";

export const apiAppGet = () => {
  const url = `${apiAppIndex}`;
  return apiGet(url);
};

export const apiMovieDiscoverGet = params => {
  const url = `${apiMovieDiscoverIndex}${apiMovieIndex}`;
  return apiGet(url, { params });
};

export const apiMoviePopularGet = params => {
  const url = `${apiMovieIndex}${apiMoviePopularIndex}`;
  return apiGet(url, { params });
};

export const apiMovieNowPlayingGet = params => {
  const url = `${apiMovieIndex}${apiMovieNowPlayingIndex}`;
  return apiGet(url, { params });
};

export const apiMovieUpcomingGet = params => {
  const url = `${apiMovieIndex}${apiMovieUpcomingIndex}`;
  return apiGet(url, { params });
};

export const apiMovieTopRatedGet = params => {
  const url = `${apiMovieIndex}${apiMovieTopRatedIndex}`;
  return apiGet(url, { params });
};

export const apiMovieGet = (params, id) => {
  const url = `${apiMovieIndex}/${id}`;
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
