import { initContract } from '@ts-rest/core';
import { errorResponseSchema, queryParamsSchmea, responseSchema} from "@/schema/search.schema"

const c = initContract();


export const starshipsContract = c.router({
    getStarships: {
        method: 'GET',
        path: '/',
        query: queryParamsSchmea,
        responses: {
            200: responseSchema,
            400: errorResponseSchema,
            500: errorResponseSchema,
        },
    },
})

export type StarshipsContract = typeof starshipsContract;