import { api } from "@/app/apiSlice";
import type { ApiResponse, IBook } from "@/app/types";

export const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<ApiResponse<IBook[]>, void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
