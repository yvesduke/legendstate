import axios from 'axios';

const apiKey =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTk2YzRkYzdmMWM1NzlkOTM0YzFlNjQ0NGIzNjkyNCIsInN1YiI6IjY0NTAwOWRkZWVlMTg2MDMzMDg4ODQ2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RIEgWg1abnics8AMJody1viYXqo9c2uID6xyBWiDOes';

export const fetchPopularMovies = async (page) => {
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

    return response.data;
  } catch (error) {
    throw error;
  }
};
