import App from "@/App";
import AddBookPage from "@/pages/AddBookPage";
import BookDetailPage from "@/pages/BookDetailPage";
import BookListPage from "@/pages/BookListPage";
import BorrowBookPage from "@/pages/BorrowBookPage";
import BorrowSummaryPage from "@/pages/BorrowSummaryPage";
import EditBookPage from "@/pages/EditBookPage";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,

    children: [
      { path: "/books", Component: BookListPage },
      { path: "/create-book", Component: AddBookPage },
      { path: "/books/:id", Component: BookDetailPage },
      { path: "/edit-book/:id", Component: EditBookPage },
      { path: "/borrow/:bookId", Component: BorrowBookPage },
      { path: "/borrow-summary", Component: BorrowSummaryPage },
    ],
  },
]);
