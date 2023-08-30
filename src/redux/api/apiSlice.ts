import { envConfig } from '@/config/env.config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.apiUrl,
  }),
  tagTypes: ['Books'],
  endpoints: () => ({}),
});
