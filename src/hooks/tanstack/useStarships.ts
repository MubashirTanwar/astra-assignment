import { ResponseType, QueryParamsType } from '@/lib/types';
import { parseQuery } from '@/lib/utils';
import { tsr } from '@/lib/api-client';

export const useInfiniteStarships = (initialParams: Omit<QueryParamsType, 'page'>) => {
  return tsr.starships.getStarships.useInfiniteQuery({
    queryKey: ['starships', initialParams],
    queryData: (context) => ({
      query: {
        ...initialParams,
        page: (context.pageParam as unknown as string) || '1',
      },
    }),
    getNextPageParam: (lastPage: { body: ResponseType }) => {
      if (!lastPage.body.next) return undefined;
      const url = new URL(lastPage.body.next);
      const nextPage = url.searchParams.get('page');
      return nextPage ? parseInt(nextPage) : undefined;
    },  
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
};