import {create} from 'apisauce';
import Config from 'react-native-config';

const api = create({
  baseURL: Config.BASE_URL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${Config.API_ACCESS_TOKEN}`,
  },
});

const fetchPopularMovie = async () => {
  try {
    const response = await api.get('/movie/popular');
    if (!response.ok) {
      const errorMessage =
        response.data?.status_message || 'An unknown error occurred';
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch popular movies');
  }
};

const fetchTrendingMovies = async () => {
  try {
    const response = await api.get('/trending/movie/day');
    if (!response.ok) {
      const errorMessage =
        response.data?.status_message || 'An unknown error occurred';
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch trending movies');
  }
};

const fetchTopRatedMovies = async () => {
  try {
    const response = await api.get('/movie/top_rated');
    if (!response.ok) {
      const errorMessage =
        response.data?.status_message || 'An unknown error occurred';
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch top rated movies');
  }
};

const fetchMovieDetails = async (id: number) => {
  try {
    const response = await api.get(`/movie/${id}?append_to_response=credits`);
    if (!response.ok) {
      const errorMessage =
        response.data?.status_message || 'An unknown error occurred';
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch trending movies');
  }
};

const fetchMovieByName = async (name: string) => {
  try {
    const response = await api.get(`/search/movie?query=${name}`);
    if (!response.ok) {
      const errorMessage =
        response.data?.status_message || 'An unknown error occurred';
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch trending movies');
  }
};

const API = {
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchMovieByName,
  fetchPopularMovie,
  fetchTopRatedMovies,
};

export default API;
