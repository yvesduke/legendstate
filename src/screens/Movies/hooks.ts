// hooks.ts
import {useInfiniteQuery} from 'react-query';
import {fetchPopularMovies} from './api';

export const usePopularMovies = () => {
  return useInfiniteQuery(
    'popularMovies',
    ({pageParam = 1}) => fetchPopularMovies(pageParam),
    {
      getNextPageParam: lastPage => {
        // Return the next page number if there are more pages
        return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : null;
      },
    },
  );
};
