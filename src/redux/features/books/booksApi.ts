import { api } from '@/redux/api/apiSlice';

export const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (filters) => {
        return `books?searchTerm=${filters?.searchTerm}&genre=${filters?.genre}&publicationYear=${filters?.publicationYear}`;
      },
    }),

    getSingleBook: builder.query({
      query: (id) => `book/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetSingleBookQuery } = booksApi;
