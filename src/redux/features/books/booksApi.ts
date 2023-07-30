import { api } from '@/redux/api/apiSlice';

export const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => `books`,
    }),

    getSingleBook: builder.query({
      query: (id) => `book/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetSingleBookQuery } = booksApi;
