import { initTsrReactQuery } from '@ts-rest/react-query/v5';
import { appContracts } from '@/shared/contract';

export const tsr = initTsrReactQuery(appContracts, {
  baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000",
  baseHeaders: {
    'x-app-source': 'ts-rest',
  },
  validateResponse: true,

});