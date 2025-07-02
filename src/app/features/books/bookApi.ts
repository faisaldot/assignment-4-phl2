import { api } from "@/app/apiSlice";
import type { ApiResponse, IBook } from "@/app/types";

type NewBookData = Omit<IBook, "_id" | "available">;
type UpdateBookPayload = { id: string; data: Partial<NewBookData> };

export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<ApiResponse<IBook[]>, void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    getBookById: builder.query<ApiResponse<IBook>, string>({
      query: (bookId) => `/books/${bookId}`,
      providesTags: (_result, _error, arg) => [{ type: "Books", id: arg }],
    }),
    addBook: builder.mutation<ApiResponse<IBook>, NewBookData>({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<ApiResponse<IBook>, UpdateBookPayload>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Books",
        { type: "Books", id: arg.id },
      ],
    }),
    deleteBook: builder.mutation<ApiResponse<null>, string>({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
