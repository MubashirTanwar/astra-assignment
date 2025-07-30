import { useInfiniteQuery } from '@tanstack/react-query';
import { StarshipType, ResponseType, QueryParamsType } from '@/lib/types';
import { parseQuery } from '@/lib/utils';

const fetchStarships = async (
  params: QueryParamsType
): Promise<ResponseType> => {
  const searchParams =  parseQuery(params);

  const response = await fetch(`/api/starships${searchParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch starships');
  }

  const data = await response.json();
  return data;
};

export const useInfiniteStarships = (initialParams: Omit<QueryParamsType, 'page'>) => {
  return useInfiniteQuery<ResponseType, Error>({
    queryKey: ['starships', initialParams],
    queryFn: ({ pageParam }) => 
      fetchStarships({ 
        ...initialParams, 
        page: pageParam as string 
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      
      const url = new URL(lastPage.next);
      const nextPage = url.searchParams.get('page');
      return nextPage ? parseInt(nextPage) : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};