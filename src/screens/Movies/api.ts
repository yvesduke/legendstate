import axios from 'axios';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
}

interface PopularMovies {
  page: number;
  total_pages: number;
  results: Movie[];
}

// for fun, this is fine. else, we keep this somewhere safe
const apiKey =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTk2YzRkYzdmMWM1NzlkOTM0YzFlNjQ0NGIzNjkyNCIsInN1YiI6IjY0NTAwOWRkZWVlMTg2MDMzMDg4ODQ2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RIEgWg1abnics8AMJody1viYXqo9c2uID6xyBWiDOes';

export const fetchPopularMovies = async (
  page: number,
): Promise<PopularMovies> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          accept: 'application/json',
        },
      },
    );

    return {
      page: response.data.page,
      total_pages: response.data.total_pages,
      results: response.data.results ?? [], // defaults to [] if no results
    };
  } catch (error) {
    throw error;
  }
};
