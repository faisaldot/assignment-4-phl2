import { api } from "@/app/apiSlice";
import type { ApiResponse, BorrowResponse, IBorrow } from "@/app/types";

export const borrowApi = api.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation<ApiResponse<BorrowResponse>, IBorrow>({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Books", "Borrows"],
    }),
  }),
});

export const { useBorrowBookMutation } = borrowApi;
