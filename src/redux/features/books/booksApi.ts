import { api } from '@/redux/api/apiSlice';

export const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (filters) => {
        return `books?searchTerm=${filters?.searchTerm}&genre=${filters?.genre}&publicationYear=${filters?.publicationYear}`;
      },
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }: any) => ({ type: 'Books', id } as const)),
              { type: 'Books', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Books', id: 'LIST' }],
    }),

    getSingleBook: builder.query({
      query: (id) => `books/${id}`,
      providesTags: (result, error, id) => [{ type: 'Books', id }],
    }),

    createBook: builder.mutation({
      query: (book) => ({
        url: 'books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: [{ type: 'Books', id: 'LIST' }],
    }),

    editBook: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `books/${id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Books', id }],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useCreateBookMutation,
  useEditBookMutation,
} = booksApi;
