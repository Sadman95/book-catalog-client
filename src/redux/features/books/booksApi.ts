import { UseDecrypt } from '@/hooks/useDecrypt';
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
      providesTags: (id) => [{ type: 'Books', id }],
    }),

    createBook: builder.mutation({
      query: (book) => ({
        url: 'books',
        method: 'POST',
        body: book,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${UseDecrypt(
            localStorage.getItem('token') as string,
            '12'
          )}`,
        },
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
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${UseDecrypt(
              localStorage.getItem('token') as string,
              '12'
            )}`,
          },
        };
      },
      invalidatesTags: ({ id }) => [{ type: 'Books', id }],
    }),

    deleteBook: builder.mutation({
      query(id) {
        return {
          url: `books/${id}`,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${UseDecrypt(
              localStorage.getItem('token') as string,
              '12'
            )}`,
          },
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: ['Books'],
    }),

    postReview: builder.mutation({
      query({ id, data }) {
        return {
          url: `books/${id}/reviews`,
          method: 'PATCH',
          body: {
            comment: data,
          },
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${UseDecrypt(
              localStorage.getItem('token') as string,
              '12'
            )}`,
          },
        };
      },
      invalidatesTags: ({ id }) => [{ type: 'Books', id }],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useCreateBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
  usePostReviewMutation,
} = booksApi;
