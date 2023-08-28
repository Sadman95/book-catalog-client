import { api } from '@/redux/api/apiSlice';

export const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (filters) => {
        return `books?searchTerm=${filters?.searchTerm}&genre=${filters?.genre}&publicationYear=${filters?.publicationYear}`;
      },
      providesTags: (result) =>
        // is result available?
        {
          if (result) {
            return [
              ...result.data.map(({ _id }: { _id: string }) => ({
                type: 'Books',
                id: _id,
              })),
              { type: 'Books', id: 'LIST' },
            ];
          } else {
            return [{ type: 'Books', id: 'LIST' }];
          }
        },
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

    deleteBook: builder.mutation<{ id: string }, string>({
      query(id) {
        return {
          url: `books/${id}`,
          method: 'DELETE',
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: 'Books', id }],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useCreateBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = booksApi;
